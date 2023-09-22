$(document).ready(function () {
  // Initialize the Cropper.js instance
  var cropper;

  document.getElementById('croppedCanvas').style.display='none'

  // Function to reset Cropper.js
  function resetCropper() {
    if (cropper) {
      cropper.destroy();
    }
    cropper = null;
  }

  // Function to handle file selection and opening the modal
  $("#imageInput").change(function () {
    // Reset the Cropper.js instance
    resetCropper();

    var input = this;
    var reader = new FileReader();

    reader.onload = function (e) {
      // Set the image source and open the modal
      $("#imageToCrop").attr("src", e.target.result);

      // Initialize Cropper.js with the image
      cropper = new Cropper($("#imageToCrop")[0], {
        aspectRatio: 1, // You can adjust the aspect ratio as needed
      });

      $("#cropModal").modal("show");
    };

    reader.readAsDataURL(input.files[0]);
  });

  // Function to handle image cropping and displaying on canvas with a custom size
  $("#cropButton").click(function () {
    if (cropper) {
      // Get the cropped image data as a data URL
      var croppedImageDataUrl = cropper.getCroppedCanvas().toDataURL();

      // Create an image object for the cropped image
      var croppedImage = new Image();
      croppedImage.src = croppedImageDataUrl;

      // Set the desired width and height for the displayed image
      var desiredWidth = 100; // Adjust this to your preferred width
      var desiredHeight = 100; // Adjust this to your preferred height

      // Create a canvas to draw the final composition
      var canvas = document.getElementById("croppedCanvas");
      canvas.style.display = "block";
      canvas.width = desiredWidth;
      canvas.height = desiredHeight;
      canvas.classList.add('col-12');
      canvas.classList.add('col-md-6');

      var ctx = canvas.getContext("2d");

      // Load the template image
      var templateImage = new Image();
      templateImage.src = "./statics/frame.png"; // Replace with the actual path to your template image

      // Once the template image is loaded, set canvas dimensions to match the template
      templateImage.onload = function () {
        // Set the canvas size to match the template image
        var desiredWidth = templateImage.width / 2;
        var desiredHeight = templateImage.height / 2;

        var canvas = document.getElementById("croppedCanvas");
        canvas.style.display = "block";
        canvas.width = desiredWidth;
        canvas.height = desiredHeight;
        var ctx = canvas.getContext("2d");

        // Calculate the dimensions for the cropped image (30% of canvas size)
        var croppedWidth = canvas.width * 0.5;
        var croppedHeight = canvas.height * 0.5;

        // Calculate the position to center the cropped image
        var x = (canvas.width - croppedWidth) / 1.85;
        var y = (canvas.height - croppedHeight) / 2;

        // Draw the cropped image at the calculated position and size
        ctx.drawImage(croppedImage, x, y, croppedWidth, croppedHeight);

        // Overlay the template image
        ctx.drawImage(templateImage, 0, 0, desiredWidth, desiredHeight);

        // Close the modal
        $("#cropModal").modal("hide");
      };
    }
  });

  // Function to handle clicking the download button
  $("#downloadButton").click(function () {
    if (cropper) {
      // Get the canvas element
      var canvas = document.getElementById("croppedCanvas");

      // Create a data URL from the canvas
      var imageDataUrl = canvas.toDataURL("image/png"); // You can specify the image format

      // Create a temporary anchor element to trigger the download
      var downloadLink = document.createElement("a");
      downloadLink.href = imageDataUrl;
      downloadLink.download = "cropped_image.png"; // Specify the file name

      // Trigger the download
      downloadLink.click();
    }
  });
});






// --------------------------   places ------------------------------------------

mandalams={
  // 'district': [ list of mandalam in district ]
  'KASARGOD':["KASARAGOD", "MANJESWARAM", "TRIKKARPUR", "KANHANGAD"],
  'KANNUR':["KANNUR", "THALASSERY", "VALAPPATTANAM", "IRIKKOOR", "PAYYANNUR", "PAYANGADI", "KOOTHPARAMBA", "KADAVATHUR", "PANOOR", "TALIPARAMBA"],
}


units={
  // 'mandalam':[ list of units in mandalam ]
  'KASARAGOD':["Mooliyar", "Kasaragod Town", "Kollampadi", "Badira", "Vidyanagar", "Narampadi", "Anankur", "Kalanad", "Berkka", "Cherkalam", "Puthiya Bus Stand", "Paraya Nadakkam", "Thalankara", "Badiyadukka"],
  'MANJESWARAM':["Pandiyil", "Vorkadi", "Hosangadi", "Uppala", "Miya padavu", "Kunjathur", "Machampadi"],
  'TRIKKARPUR': ["Elambichi", "Padanna Mooshaji Mukku", "Padanna Kalikkadavu", "Peelikkode - Kalikkadavu", "Kadumeni", "Padanna Thekkumpuram", "Padanna Kadappuram", "Trikkarippur"],
  'KANHANGAD': ["Pallikkara", "Neelrshwaram", "Kanhangad"]
}



function topalert(txt){
  ele = document.getElementById(txt)
  if (ele.selectedIndex == 0){
    alertify.set('notifier','position', 'top-right');
    alertify.error('Select ' + txt + ' first!'); 
  }
  
}

function fillmandalam(){
  var selectedValue = $("#district").val();
  var selectElement = document.getElementById("mandalam");

  mdlms = mandalams[selectedValue]

  for (i=0; i < mdlms.length; i++){
    var option = document.createElement("option");
    option.value = mdlms[i]; 
    option.textContent = mdlms[i];
    selectElement.appendChild(option);

  }

  
}

function fillunit(){
  var selectedValue = $("#mandalam").val();
  var selectElement = document.getElementById("unit");

  unts = units[selectedValue]

  for (i=0; i < unts.length; i++){
    var option = document.createElement("option");
    option.value = unts[i]; 
    option.textContent = unts[i];
    selectElement.appendChild(option);

  }

  
}
