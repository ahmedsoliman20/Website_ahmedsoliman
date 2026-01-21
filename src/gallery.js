async function autoLoadProjectImages() {
  const container = document.getElementById('image-probe-container');
  const extensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
  let fileNumber = 1;
  let searching = true;

  while (searching) {
    // Format number to 3 digits (e.g., 1 becomes "001")
    let fileName = fileNumber.toString().padStart(3, '0');
    let imageFound = false;

    // Try each extension for the current number
    for (const ext of extensions) {
      const testPath = `${fileName}.${ext}`;
      
      try {
        const found = await checkImageExists(testPath);
        if (found) {
          const imgElement = document.createElement('img');
          imgElement.src = testPath;
          imgElement.className = 'img-fluid w-100';
          imgElement.alt = `Project Image ${fileName}`;
          container.appendChild(imgElement);
          
          imageFound = true;
          break; // Stop looking for other extensions for this number
        }
      } catch (e) { /* Extension not found, move to next */ }
    }

    if (!imageFound) {
      searching = false; // Stop the loop if 00X isn't found in any format
    } else {
      fileNumber++; // Increment and look for the next number
    }
    
    // Safety break to prevent infinite loops during testing
    if (fileNumber > 50) break; 
  }
}

// Helper function to see if an image exists without throwing a console error
function checkImageExists(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

// Start looking for images
autoLoadProjectImages();