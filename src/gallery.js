async function autoLoadProjectImages() {
  const container = document.getElementById('image-probe-container');
  const extensions = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'mp4'];
  let fileNumber = 1;
  let searching = true;

  while (searching) {
    let fileName = fileNumber.toString().padStart(3, '0');
    let fileFound = false;

    for (const ext of extensions) {
      const testPath = `${fileName}.${ext}`;
      
      // Use fetch instead of 'new Image' to check if file exists
      const response = await fetch(testPath, { method: 'HEAD' }).catch(() => ({ ok: false }));

      if (response.ok) {
        let element;

        if (ext === 'mp4') {
          // Create Video Element
          element = document.createElement('video');
          element.src = testPath;
          element.autoplay = true;
          element.loop = true;
          element.muted = true;
          element.playsInline = true; // Essential for mobile
          element.className = 'img-fluid w-100 d-block'; 
        } else {
          // Create Image Element
          element = document.createElement('img');
          element.src = testPath;
          element.className = 'img-fluid w-100 d-block';
          element.alt = `Project Image ${fileName}`;
        }

        container.appendChild(element);
        fileFound = true;
        break; 
      }
    }

    if (!fileFound) {
      searching = false;
    } else {
      fileNumber++;
    }

    if (fileNumber > 50) break; 
  }
}

// Start looking for files
autoLoadProjectImages();