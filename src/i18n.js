(function initSiteLanguageSwitcher() {
  const STORAGE_KEY = 'ahmedsoliman.site-language';
  const SUPPORTED_LANGUAGES = ['en', 'nl'];
  const DEFAULT_LANGUAGE = 'en';

  document.documentElement.setAttribute('data-i18n-ready', 'false');

  const translations = {
    en: {
      work: 'Work',
      research: 'Research',
      news: 'News',
      teaching: 'Teaching',
      about: 'About',
      heroTitle: 'Hi, this is Ahmed Soliman',
      heroSubtitle: 'Architectural Engineer & Researcher',
      heroCredentials: 'Ir. Architect | M.Sc. | PhD Candidate',
      heroLearnMore: 'A staircase? why?',
      scrollToGallery: 'Scroll to gallery',
      publications: 'Publications',
      supervised: 'Supervised Work',
      outreach: 'Outreach',
      supervisedPlaceholder: 'Supervised work details will be added here.',
      outreachPlaceholder: 'Outreach details will be added here.',
      courses: 'Courses',
      all: 'All',
      professional: 'Professional',
      design: 'Design',
      computational: 'Computational',
      graphic: 'Graphic',
      allTeaching: 'All teaching',
      brusselsBelgium: 'Brussels, Belgium',
      cairoEgypt: 'Cairo, Egypt',
      studentWorkSamples: 'Student Work Samples',
      connect: 'Connect',
      backToTop: 'Back to Top',
      footerRole: 'Architectural Engineer & Researcher',
      footerTagline: 'Exploring the intersection of architecture, computation, and structural design.',
      comingSoon: 'This page is coming soon.',
      sampleOfStudentWork: 'Sample of Students Work',
      goBack: 'Go Back',
      contact: 'CONTACT',
      experience: 'Experience',
      intentionalTagline: 'In a digital age where everything is instant, this is intentional.',
      requestPhysicalCopy: 'Request a Physical Copy of the Portfolio',
      contactInformation: 'Contact Information',
      requestPortfolioCopy: 'Request Physical Portfolio Copy',
      yourEmail: 'Your Email',
      detailedAddress: 'Detailed Address',
      emailPlaceholder: 'you@example.com',
      addressPlaceholder: 'Street, building number, city, postal code, country',
      openEmailRequest: 'Open Email Request',
      close: 'Close',
      previous: 'Previous',
      next: 'Next',
      lectures: 'Lectures',
      conferences: 'Conferences',
      degrees: 'Degrees',
      awards: 'Awards',
      workshops: 'Workshops',
      other: 'Other'
    },
    nl: {
      work: 'Werk',
      research: 'Onderzoek',
      news: 'Nieuws',
      teaching: 'Onderwijs',
      about: 'Over',
      heroTitle: 'Hallo, ik ben Ahmed Soliman',
      heroSubtitle: 'Architectuuringenieur & onderzoeker',
      heroCredentials: 'Ir. Architect | M.Sc. | PhD-kandidaat',
      heroLearnMore: 'Een trap? waarom?',
      scrollToGallery: 'Scroll naar galerij',
      publications: 'Publicaties',
      supervised: 'Begeleide werken',
      outreach: 'Publieke activiteiten',
      supervisedPlaceholder: 'Details over begeleide werken worden hier toegevoegd.',
      outreachPlaceholder: 'Details over publieke activiteiten worden hier toegevoegd.',
      courses: 'Vakken',
      all: 'Alles',
      professional: 'Professioneel',
      design: 'Ontwerp',
      computational: 'Computationeel',
      graphic: 'Grafisch',
      allTeaching: 'Alle onderwijsactiviteiten',
      brusselsBelgium: 'Brussel, België',
      cairoEgypt: 'Caïro, Egypte',
      studentWorkSamples: 'Voorbeelden studentenwerk',
      connect: 'Contact',
      backToTop: 'Terug naar boven',
      footerRole: 'Architectuuringenieur & onderzoeker',
      footerTagline: 'Op het snijvlak van architectuur, computation en structureel ontwerp.',
      comingSoon: 'Deze pagina komt binnenkort.',
      sampleOfStudentWork: 'Voorbeelden van studentenwerk',
      goBack: 'Ga terug',
      contact: 'CONTACT',
      experience: 'Ervaring',
      intentionalTagline: 'In een digitaal tijdperk waarin alles direct is, is dit bewust gekozen.',
      requestPhysicalCopy: 'Vraag een fysieke kopie van het portfolio aan',
      contactInformation: 'Contactgegevens',
      requestPortfolioCopy: 'Fysieke portfolio aanvragen',
      yourEmail: 'Jouw e-mailadres',
      detailedAddress: 'Volledig adres',
      emailPlaceholder: 'jij@voorbeeld.com',
      addressPlaceholder: 'Straat, nummer, stad, postcode, land',
      openEmailRequest: 'E-mailaanvraag openen',
      close: 'Sluiten',
      previous: 'Vorige',
      next: 'Volgende',
      lectures: 'Lezingen',
      conferences: 'Conferenties',
      degrees: 'Diploma\'s',
      awards: 'Prijzen',
      workshops: 'Workshops',
      other: 'Overig'
    }
  };

  const pageMeta = {
    home: {
      en: {
        title: 'Ahmed Soliman | Architectural Engineer and Researcher',
        description: 'Ahmed Soliman is an architectural engineer and researcher exploring architecture, computation, and structural design, based in Brussels, Belgium.'
      },
      nl: {
        title: 'Ahmed Soliman | Architectuuringenieur en onderzoeker',
        description: 'Ahmed Soliman is een architectuuringenieur en onderzoeker in Brussel, met focus op architectuur, computation en structureel ontwerp.'
      }
    },
    about: {
      en: {
        title: 'About Ahmed Soliman | Architectural Engineer and Researcher',
        description: 'Learn more about Ahmed Soliman, an architectural engineer and researcher based in Brussels, with work across computation, structural design, and academia.'
      },
      nl: {
        title: 'Over Ahmed Soliman | Architectuuringenieur en onderzoeker',
        description: 'Lees meer over Ahmed Soliman, een architectuuringenieur en onderzoeker in Brussel, met werk in computation, structureel ontwerp en academie.'
      }
    },
    research: {
      en: {
        title: 'Research | Ahmed Soliman',
        description: 'Explore Ahmed Soliman\'s research, publications, supervised work, and outreach in architecture, computation, and structural design.'
      },
      nl: {
        title: 'Onderzoek | Ahmed Soliman',
        description: 'Ontdek het onderzoek, de publicaties, begeleide werken en publieke activiteiten van Ahmed Soliman in architectuur, computation en structureel ontwerp.'
      }
    },
    teaching: {
      en: {
        title: 'Teaching | Ahmed Soliman',
        description: 'View Ahmed Soliman\'s teaching in architecture, design studios, and computational design across universities in Brussels and beyond.'
      },
      nl: {
        title: 'Onderwijs | Ahmed Soliman',
        description: 'Bekijk het onderwijs van Ahmed Soliman in architectuur, ontwerpstudio\'s en computationeel ontwerp aan universiteiten in Brussel en daarbuiten.'
      }
    },
    news: {
      en: {
        title: 'News | Ahmed Soliman',
        description: 'Follow Ahmed Soliman\'s latest news, lectures, conferences, workshops, and academic activities in architecture and research.'
      },
      nl: {
        title: 'Nieuws | Ahmed Soliman',
        description: 'Volg het laatste nieuws, lezingen, conferenties, workshops en academische activiteiten van Ahmed Soliman in architectuur en onderzoek.'
      }
    },
    samples: {
      en: {
        title: 'Student Work Samples | Ahmed Soliman',
        description: 'Browse selected student work and teaching outcomes from Ahmed Soliman\'s architecture and design studio courses.'
      },
      nl: {
        title: 'Voorbeelden studentenwerk | Ahmed Soliman',
        description: 'Bekijk een selectie van studentenwerk en onderwijsresultaten uit de architectuur- en ontwerpstudio\'s van Ahmed Soliman.'
      }
    }
  };

  let currentLanguage = getSavedLanguage();
  let isApplying = false;
  let mutationTimeout = null;

  function getSavedLanguage() {
    try {
      const storedLanguage = (localStorage.getItem(STORAGE_KEY) || '').toLowerCase();
      if (SUPPORTED_LANGUAGES.includes(storedLanguage)) {
        return storedLanguage;
      }
    } catch (error) {
      // Ignore localStorage issues.
    }

    const pageLanguage = (document.documentElement.lang || DEFAULT_LANGUAGE).toLowerCase();
    return SUPPORTED_LANGUAGES.includes(pageLanguage) ? pageLanguage : DEFAULT_LANGUAGE;
  }

  function t(key) {
    return (translations[currentLanguage] && translations[currentLanguage][key]) || key;
  }

  function inferPageKey() {
    const rawPath = (window.location.pathname || '').toLowerCase();
    const path = rawPath.replace(/\/index\.html$/, '/').replace(/\/+$/, '') || '/';

    if (path === '/') {
      return 'home';
    }
    if (path === '/about' || rawPath.endsWith('/about.html')) {
      return 'about';
    }
    if (path === '/research' || rawPath.endsWith('/research.html')) {
      return 'research';
    }
    if (path === '/teaching' || rawPath.endsWith('/teaching.html')) {
      return 'teaching';
    }
    if (path === '/news' || rawPath.endsWith('/news.html')) {
      return 'news';
    }
    if (path === '/st_samples' || rawPath.endsWith('/st_samples.html')) {
      return 'samples';
    }

    return 'home';
  }

  function updateMetaForPage() {
    const pageKey = inferPageKey();
    const content = pageMeta[pageKey] && pageMeta[pageKey][currentLanguage];

    if (!content) {
      return;
    }

    document.title = content.title;

    const metaUpdates = [
      ['meta[name="description"]', 'content', content.description],
      ['meta[property="og:title"]', 'content', content.title],
      ['meta[property="og:description"]', 'content', content.description],
      ['meta[name="twitter:title"]', 'content', content.title],
      ['meta[name="twitter:description"]', 'content', content.description]
    ];

    metaUpdates.forEach(function(update) {
      const element = document.querySelector(update[0]);
      if (element) {
        element.setAttribute(update[1], update[2]);
      }
    });
  }

  function resolveNavKey(href) {
    const rawHref = String(href || '').trim();

    if (!rawHref || rawHref === '#') {
      return '';
    }

    let pathname = rawHref.toLowerCase();
    try {
      pathname = new URL(rawHref, window.location.origin).pathname.toLowerCase();
    } catch (error) {
      pathname = rawHref.toLowerCase();
    }

    const normalizedPath = pathname.replace(/\/index\.html$/, '/').replace(/\/+$/, '') || '/';

    if (normalizedPath === '/') {
      return 'work';
    }
    if (normalizedPath === '/research' || pathname.includes('research.html')) {
      return 'research';
    }
    if (normalizedPath === '/news' || pathname.includes('news.html')) {
      return 'news';
    }
    if (normalizedPath === '/teaching' || pathname.includes('teaching.html')) {
      return 'teaching';
    }
    if (normalizedPath === '/about' || pathname.includes('about.html')) {
      return 'about';
    }

    return '';
  }

  function setText(selector, value) {
    if (!value) {
      return;
    }

    document.querySelectorAll(selector).forEach(function(element) {
      element.textContent = value;
    });
  }

  function setAttribute(selector, attributeName, value) {
    if (!value) {
      return;
    }

    document.querySelectorAll(selector).forEach(function(element) {
      element.setAttribute(attributeName, value);
    });
  }

  function applyOptionalDataTranslations() {
    document.querySelectorAll('[data-en][data-nl]').forEach(function(element) {
      const translatedValue = currentLanguage === 'nl'
        ? element.getAttribute('data-nl')
        : element.getAttribute('data-en');

      const targetAttribute = element.getAttribute('data-i18n-attr');

      if (targetAttribute) {
        element.setAttribute(targetAttribute, translatedValue);
      } else if (element.hasAttribute('data-i18n-html')) {
        element.innerHTML = translatedValue;
      } else {
        element.textContent = translatedValue;
      }
    });
  }

  function applyNavigationTranslations() {
    document.querySelectorAll('.navbar-nav .nav-link, .footer-nav a').forEach(function(link) {
      const key = resolveNavKey(link.getAttribute('href'));
      if (key) {
        link.textContent = t(key);
      }
    });
  }

  function applyPageTranslations() {
    setText('.hero-title', t('heroTitle'));
    setText('.hero-subtitle', t('heroSubtitle'));
    setText('.hero-text div[style*="italic"]', t('heroCredentials'));
    setText('.learn-more-btn', t('heroLearnMore'));
    setAttribute('#scrollArrow', 'title', t('scrollToGallery'));

    setText('#publications-title', t('publications'));
    setText('#supervised-title', t('supervised'));
    setText('#outreach-title', t('outreach'));

    const supervisedPlaceholder = document.querySelector('#supervised-content > p');
    if (supervisedPlaceholder && /added here|worden hier toegevoegd/i.test(supervisedPlaceholder.textContent)) {
      supervisedPlaceholder.textContent = t('supervisedPlaceholder');
    }

    const outreachPlaceholder = document.querySelector('#outreach-content > p');
    if (outreachPlaceholder && /added here|worden hier toegevoegd/i.test(outreachPlaceholder.textContent)) {
      outreachPlaceholder.textContent = t('outreachPlaceholder');
    }

    setText('#courses-title', t('courses'));
    setText('.teaching-logo-filter-all .institution-name', t('all'));
    setText('.teaching-logo-filter-all .institution-location', t('allTeaching'));
    setText('.teaching-logo-filter[data-university="vub"] .institution-location', t('brusselsBelgium'));
    setText('.teaching-logo-filter[data-university="fue"] .institution-location', t('cairoEgypt'));
    setText('.teaching-logo-filter[data-university="ain"] .institution-location', t('cairoEgypt'));
    setText('.teaching-logo-filter[data-university="auc"] .institution-location', t('cairoEgypt'));
    setText('.teaching-action-text', t('studentWorkSamples'));

    document.querySelectorAll('#filter-buttons [data-filter]').forEach(function(button) {
      const filterKey = String(button.getAttribute('data-filter') || '').toLowerCase();
      if (filterKey && translations[currentLanguage][filterKey]) {
        button.textContent = t(filterKey);
      }
    });

    document.querySelectorAll('.gallery-filter-key[data-filter-key]').forEach(function(button) {
      const filterKey = String(button.getAttribute('data-filter-key') || '').toLowerCase();
      if (filterKey && translations[currentLanguage][filterKey]) {
        button.textContent = t(filterKey);
      }
    });

    setText('#contactBtn', t('contact'));
    setText('.about-section-title', t('experience'));
    setText('.physical-tagline', t('intentionalTagline'));
    setText('#requestPhysicalCopyBtn', t('requestPhysicalCopy'));
    setText('#contactModal .modal-title', t('contactInformation'));
    setText('#physicalCopyModal .modal-title', t('requestPortfolioCopy'));
    setText('label[for="requesterEmail"]', t('yourEmail'));
    setText('label[for="requesterAddress"]', t('detailedAddress'));
    setAttribute('#requesterEmail', 'placeholder', t('emailPlaceholder'));
    setAttribute('#requesterAddress', 'placeholder', t('addressPlaceholder'));
    setText('#portfolioRequestForm button[type="submit"]', t('openEmailRequest'));

    setText('.samples-intro h2', t('sampleOfStudentWork'));
    setText('.samples-intro p', t('comingSoon'));
    setText('.samples-intro .btn', t('goBack'));

    setText('.footer-brand p:first-of-type', t('footerRole'));
    setText('.footer-brand p[style*="font-size: 0.85rem"]', t('footerTagline'));
    setText('.footer-connect h4', t('connect'));
    setText('.back-to-top span', t('backToTop'));
    setText('.news-modal-close', t('close'));
    setText('.carousel-control-prev .visually-hidden', t('previous'));
    setText('.carousel-control-next .visually-hidden', t('next'));
  }

  function updateToggleState() {
    document.querySelectorAll('.lang-btn').forEach(function(button) {
      const isActive = button.getAttribute('data-lang') === currentLanguage;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  function ensureSwitcher() {
    if (document.getElementById('site-language-switcher')) {
      return;
    }

    const target = document.querySelector('.header-right-section > .d-flex.align-items-center.gap-3.ms-xl-5')
      || document.querySelector('.header-right-section');

    if (!target) {
      return;
    }

    const switcher = document.createElement('div');
    switcher.id = 'site-language-switcher';
    switcher.className = 'language-switcher';
    switcher.setAttribute('role', 'group');
    switcher.setAttribute('aria-label', 'Language switcher');
    switcher.innerHTML = [
      '<button type="button" class="lang-btn" data-lang="en" aria-pressed="false">EN</button>',
      '<button type="button" class="lang-btn" data-lang="nl" aria-pressed="false">NL</button>'
    ].join('');

    switcher.addEventListener('click', function(event) {
      const button = event.target.closest('.lang-btn');
      if (!button) {
        return;
      }

      setLanguage(button.getAttribute('data-lang'));
    });

    const toggler = target.querySelector('.navbar-toggler');
    if (toggler) {
      target.insertBefore(switcher, toggler);
    } else {
      target.appendChild(switcher);
    }
  }

  function applyLanguage(language, shouldPersist, options) {
    const nextLanguage = SUPPORTED_LANGUAGES.includes(language) ? language : DEFAULT_LANGUAGE;
    const previousLanguage = currentLanguage;
    const shouldNotify = !options || options.notify !== false;

    currentLanguage = nextLanguage;

    if (shouldPersist !== false) {
      try {
        localStorage.setItem(STORAGE_KEY, currentLanguage);
      } catch (error) {
        // Ignore localStorage issues.
      }
    }

    ensureSwitcher();

    isApplying = true;
    try {
      document.documentElement.lang = currentLanguage;
      document.documentElement.setAttribute('data-site-language', currentLanguage);
      applyOptionalDataTranslations();
      applyNavigationTranslations();
      applyPageTranslations();
      updateMetaForPage();
      updateToggleState();
    } finally {
      isApplying = false;
    }

    document.documentElement.setAttribute('data-i18n-ready', 'true');

    if (shouldNotify && previousLanguage !== currentLanguage) {
      document.dispatchEvent(new CustomEvent('site-language-changed', {
        detail: { language: currentLanguage }
      }));
    }
  }

  function setLanguage(language) {
    applyLanguage(language, true, { notify: true });
  }

  function hasTranslatableContent(node) {
    if (!node || node.nodeType !== 1) {
      return false;
    }

    if (node.matches && node.matches('[data-en][data-nl]')) {
      return true;
    }

    return !!(node.querySelector && node.querySelector('[data-en][data-nl]'));
  }

  function refreshDynamicTranslations() {
    ensureSwitcher();
    applyOptionalDataTranslations();
    applyPageTranslations();
    updateToggleState();
  }

  function observeDynamicChanges() {
    if (!window.MutationObserver || !document.body) {
      return;
    }

    const observer = new MutationObserver(function(mutations) {
      if (isApplying) {
        return;
      }

      const shouldRefresh = mutations.some(function(mutation) {
        return Array.from(mutation.addedNodes || []).some(hasTranslatableContent);
      });

      if (!shouldRefresh) {
        return;
      }

      window.clearTimeout(mutationTimeout);
      mutationTimeout = window.setTimeout(function() {
        refreshDynamicTranslations();
      }, 50);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  function initialize() {
    applyLanguage(currentLanguage, false, { notify: false });
    observeDynamicChanges();

    window.siteLanguage = {
      getCurrentLanguage: function() {
        return currentLanguage;
      },
      setLanguage: setLanguage,
      translatePage: function() {
        applyLanguage(currentLanguage, false, { notify: false });
      }
    };

    document.addEventListener('site-language-changed', function() {
      if (document.body && document.body.classList.contains('project-page')) {
        window.location.reload();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();