// Shared media loader for project pages.
(function initProjectMediaLoader() {
  const cachedFetchResults = new Map();
  let manifestPromise;
  let projectMetadataPromise;

  function toEncodedPath(path) {
    return encodeURI(path);
  }

  async function fetchOk(path) {
    const encodedPath = toEncodedPath(path);

    if (cachedFetchResults.has(encodedPath)) {
      return cachedFetchResults.get(encodedPath);
    }

    const request = fetch(encodedPath, { method: 'HEAD' })
      .then(function(resp) {
        return !!resp.ok;
      })
      .catch(function() {
        return false;
      });

    cachedFetchResults.set(encodedPath, request);
    return request;
  }

  async function getManifest() {
    if (!manifestPromise) {
      manifestPromise = fetch('media-manifest.json', { cache: 'no-cache' })
        .then(function(resp) {
          if (!resp.ok) {
            return null;
          }
          return resp.json().catch(function() {
            return null;
          });
        })
        .catch(function() {
          return null;
        });
    }

    return manifestPromise;
  }

  async function getProjectMetadata() {
    if (!projectMetadataPromise) {
      projectMetadataPromise = fetch('../../projects/projects_data.json', { cache: 'no-cache' })
        .then(function(resp) {
          if (!resp.ok) {
            return [];
          }
          return resp.json().catch(function() {
            return [];
          });
        })
        .then(function(data) {
          return Array.isArray(data) ? data : [];
        })
        .catch(function() {
          return [];
        });
    }

    return projectMetadataPromise;
  }

  function parseGalleryOrder(value) {
    const numericValue = Number(value);
    return Number.isFinite(numericValue) ? numericValue : null;
  }

  function getProjectNumber(projectId) {
    const idMatch = typeof projectId === 'string' ? projectId.match(/(\d+)/) : null;
    return idMatch ? idMatch[1] : '';
  }

  function normalizePath(path) {
    return (path || '').replace(/\/$/, '').toLowerCase();
  }

  function createProjectHref(projectId) {
    const projectNumber = getProjectNumber(projectId);
    if (!projectNumber) {
      return null;
    }

    const pathname = window.location.pathname || '';
    const lowerPath = pathname.toLowerCase();
    const projectsSegment = '/projects/';
    const projectsIndex = lowerPath.indexOf(projectsSegment);
    const projectsRoot = projectsIndex >= 0
      ? pathname.slice(0, projectsIndex + projectsSegment.length)
      : projectsSegment;

    return projectsRoot + projectId + '/project_' + projectNumber + '.html';
  }

  function buildOrderedGalleryProjects(data) {
    return data
      .map(function(project, index) {
        if (!project || typeof project.id !== 'string') {
          return null;
        }

        const projectId = project.id.trim();
        const href = createProjectHref(projectId);

        if (!projectId || !href) {
          return null;
        }

        return {
          id: projectId,
          title: typeof project.title === 'string' && project.title.trim() ? project.title.trim() : projectId,
          href: href,
          showInGallery: project.showInGallery !== false,
          galleryOrder: parseGalleryOrder(project.galleryOrder),
          index: index
        };
      })
      .filter(function(project) {
        return project && project.showInGallery;
      })
      .sort(function(a, b) {
        const aHasOrder = a.galleryOrder !== null;
        const bHasOrder = b.galleryOrder !== null;

        if (aHasOrder && bHasOrder) {
          return a.galleryOrder - b.galleryOrder;
        }

        if (aHasOrder) {
          return -1;
        }

        if (bHasOrder) {
          return 1;
        }

        return a.index - b.index;
      });
  }

  function createPreviousLink(project) {
    const anchor = document.createElement('a');
    anchor.href = project.href;
    anchor.className = 'project-pager-link project-pager-link-prev text-decoration-none d-inline-flex align-items-center gap-2';
    anchor.setAttribute('aria-label', 'Previous project: ' + project.title);

    const arrow = document.createElement('span');
    arrow.className = 'project-pager-arrow';
    arrow.textContent = '\u2039';

    const label = document.createElement('span');
    label.className = 'project-pager-label';
    label.textContent = 'Previous Project';

    anchor.appendChild(arrow);
    anchor.appendChild(label);

    return anchor;
  }

  function createNextLink(project) {
    const anchor = document.createElement('a');
    anchor.href = project.href;
    anchor.className = 'project-pager-link project-pager-link-next text-decoration-none d-inline-flex align-items-center gap-2';
    anchor.setAttribute('aria-label', 'Next project: ' + project.title);

    const label = document.createElement('span');
    label.className = 'project-pager-label';
    label.textContent = 'Next Project';

    const arrow = document.createElement('span');
    arrow.className = 'project-pager-arrow';
    arrow.textContent = '\u203A';

    anchor.appendChild(label);
    anchor.appendChild(arrow);
    return anchor;
  }

  async function injectProjectPager() {
    if (!document.body || !document.body.classList.contains('project-page')) {
      return;
    }

    if (document.getElementById('project-pager-nav')) {
      return;
    }

    const pagePath = normalizePath(window.location.pathname);
    const main = document.querySelector('main');

    if (!pagePath || !main) {
      return;
    }

    const metadata = await getProjectMetadata();
    const orderedProjects = buildOrderedGalleryProjects(metadata);

    if (!orderedProjects.length) {
      return;
    }

    const currentIndex = orderedProjects.findIndex(function(project) {
      return normalizePath(project.href) === pagePath;
    });

    if (currentIndex === -1) {
      return;
    }

    const previousProject = currentIndex > 0 ? orderedProjects[currentIndex - 1] : null;
    const nextProject = currentIndex < orderedProjects.length - 1 ? orderedProjects[currentIndex + 1] : null;

    if (!previousProject && !nextProject) {
      return;
    }

    const section = document.createElement('section');
    section.id = 'project-pager-nav';
    section.className = 'pt-0 pb-0 mt-0';

    const row = document.createElement('div');
    row.className = 'd-flex flex-column flex-md-row justify-content-between gap-3 pt-0';

    const previousSlot = document.createElement('div');
    previousSlot.className = 'text-start';
    if (previousProject) {
      previousSlot.appendChild(createPreviousLink(previousProject));
    }

    const nextSlot = document.createElement('div');
    nextSlot.className = 'text-start text-md-end';
    if (nextProject) {
      nextSlot.appendChild(createNextLink(nextProject));
    }

    row.appendChild(previousSlot);
    row.appendChild(nextSlot);
    section.appendChild(row);
    main.appendChild(section);
  }

  async function discoverGalleryMedia(options) {
    const settings = options || {};
    const maxFiles = settings.maxFiles || 50;
    const extensions = settings.extensions || ['jpg', 'jpeg', 'png', 'webp', 'gif', 'mp4'];
    const discovered = [];
    const seen = new Set();

    function pushIfNew(path) {
      const encodedPath = toEncodedPath(path);
      if (!seen.has(encodedPath)) {
        seen.add(encodedPath);
        discovered.push(encodedPath);
      }
    }

    const manifest = await getManifest();
    if (manifest && Array.isArray(manifest.gallery) && manifest.gallery.length) {
      manifest.gallery.forEach(function(path) {
        if (typeof path === 'string' && path.trim()) {
          pushIfNew(path.trim());
        }
      });

      return discovered;
    }

    for (let fileNumber = 1; fileNumber <= maxFiles; fileNumber += 1) {
      const fileName = fileNumber.toString().padStart(3, '0');
      let fileFound = false;

      for (const ext of extensions) {
        const testPath = fileName + '.' + ext;
        const exists = await fetchOk(testPath);

        if (exists) {
          pushIfNew(testPath);
          fileFound = true;
          break;
        }
      }

      if (!fileFound) {
        break;
      }
    }

    return discovered;
  }

  async function discoverSlideshowSlides(options) {
    const settings = options || {};
    const slides = [];
    const seen = new Set();
    const exts = settings.exts || ['jpg', 'webp', 'jpeg', 'png'];
    const maxIndex = settings.maxIndex || 250;
    const maxMisses = settings.maxMisses || 12;
    const startIndex = settings.startIndex || 1;

    function pushIfNew(path) {
      const encodedPath = toEncodedPath(path);
      if (!seen.has(encodedPath)) {
        seen.add(encodedPath);
        slides.push(encodedPath);
      }
    }

    const manifest = await getManifest();
    if (manifest && Array.isArray(manifest.slideshow) && manifest.slideshow.length) {
      manifest.slideshow.forEach(function(path) {
        if (typeof path === 'string' && path.trim()) {
          pushIfNew(path.trim());
        }
      });

      return slides;
    }

    let missesInRow = 0;
    for (let i = startIndex; i <= maxIndex; i += 1) {
      let foundThisIndex = false;

      for (const ext of exts) {
        const candidatePath = 'slideshow/001 (' + i + ').' + ext;
        const exists = await fetchOk(candidatePath);
        if (exists) {
          pushIfNew(candidatePath);
          foundThisIndex = true;
        }
      }

      if (foundThisIndex) {
        missesInRow = 0;
      } else {
        missesInRow += 1;
        if (missesInRow >= maxMisses && slides.length) {
          break;
        }
      }
    }

    if (!slides.length) {
      for (const ext of exts) {
        const candidatePath = 'slideshow/001.' + ext;
        const exists = await fetchOk(candidatePath);
        if (exists) {
          pushIfNew(candidatePath);
        }
      }
    }

    return slides;
  }

  function createMediaElement(path) {
    const lower = path.toLowerCase();

    if (lower.endsWith('.mp4')) {
      const video = document.createElement('video');
      video.src = path;
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.controls = true;
      video.controlsList = 'nodownload noplaybackrate';
      video.disablePictureInPicture = true;
      video.preload = 'metadata';
      video.className = 'img-fluid w-100 d-block';
      return video;
    }

    const image = document.createElement('img');
    image.src = path;
    image.className = 'img-fluid w-100 d-block';
    image.alt = 'Project media';
    image.loading = 'lazy';
    return image;
  }

  async function autoLoadProjectImages() {
    const container = document.getElementById('image-probe-container');
    if (!container) {
      return;
    }

    const mediaFiles = await discoverGalleryMedia();
    mediaFiles.forEach(function(path) {
      container.appendChild(createMediaElement(path));
    });
  }

  window.projectMediaLoader = {
    discoverGalleryMedia: discoverGalleryMedia,
    discoverSlideshowSlides: discoverSlideshowSlides,
    autoLoadProjectImages: autoLoadProjectImages,
    injectProjectPager: injectProjectPager
  };

  autoLoadProjectImages();
  injectProjectPager();
})();