const form = document.forms['ismform2'];

form.addEventListener('submit', e => {
  e.preventDefault();


 


  // Get the canvas element by its id
  const canvas = document.getElementById('croppedCanvas');

  // Convert the canvas content to a data URL
  const canvasDataURL = canvas.toDataURL('image/png'); // Change 'image/png' to the desired image format

  // Create a link element to download the canvas image
  const link = document.createElement('a');
  link.href = canvasDataURL;
  link.download = 'downloaded_image.png'; // You can set the desired file name here
  link.style.display = 'none';

  // Add the link to the document and trigger a click event to download the image
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // After the download, show a success message
//  here

  
});