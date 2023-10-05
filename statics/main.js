$(document).ready(function () {
  // Initialize the Cropper.js instance
  var cropper;

  document.getElementById("croppedCanvas").style.display = "none";

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
    document.getElementById('cropButton').removeAttribute('disabled');//////////////////////////////////////////////////////////////////////////////////////////////////
    document.getElementById('cropButton').innerHTML = "Crop";//////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
    document.getElementById('cropButton').setAttribute('disabled', 'true');//////////////////////////////////////////////////////////////////////////////////////////////////////
    document.getElementById('cropButton').innerHTML="Loading...";/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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
      canvas.classList.add("col-12");
      canvas.classList.add("col-md-6");

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
        var croppedWidth = canvas.width * 0.429;
        var croppedHeight = canvas.height * 0.429;

        // Calculate the position to center the cropped image
        var x = (canvas.width - croppedWidth) / 2.01;
        var y = (canvas.height - croppedHeight)/ 1.799;

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



// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// --------------------------   places ------------------------------------------

mandalams = {
  // 'district': [ list of mandalam in district ]
  KASARGOD: ["KASARAGOD", "MANJESWARAM", "TRIKKARPUR", "KANHANGAD"],
  KANNUR: ["KANNUR","THALASSERY","VALAPPATTANAM","IRIKKOOR","PAYYANNUR","PAYANGADI","KOOTHUPARAMBA","KADAVATHUR","PANOOR","TALIPARAMBA",],
  WAYANAD:["MEPPADI", "KALPETTA", "MEENANGADI", "MANANTHAVADI", "GUDALLUR"],
  KOZHIKODE_NORTH : ['BALUSSERY', 'PERAMBRA', 'KUTTYADI', 'NADAPURAM', 'VATAKARA', 'PAYYOLI', 'MEPPAYUR', 'KOYILANDI', 'POONOOR'],
  KOZHIKODE_SOUTH : ['ATHOLI', 'CITYWEST', 'KARAPPARAMBU', 'MANKAVU', 'CITYEAST', 'MEDICALCOLLEGE', 'BEYPORE', 'NARIKKUNIWEST','MUKKOM','KALLAYI', 'NARIKKUNIEAST', 'THAMARASSERY', 'KARAKKUNNATH', 'KODIYATHUR', 'FEROKE', 'PUTHUR'],
  MALAPPURAM_EAST : ['CHERUKAVU', 'VAZHAKKAD', 'CHEEKKODE', 'AREEKKODE', 'URANGATTIRI', 'KEEZHUPARAMPA', 'OTHAYI', 'EDAVANNA', 'MAMPAD', 'PULPATTA', 'KAVANOOR', 'PULIKKAL', 'KONDOTTY', 'MONGAM', 'MALAPPURAM', 'PERINTHALMANNA', 'MANKADA', 'MANJERI', 'THRIKKALANGODU', 'WANDOOR', 'PANDIKKAD', 'NILAMBUR', 'CHUNGATHARA', 'EDAKKARA', 'KALIKAVU', 'MOOTHEDAM', 'AMARAMBALAM'],
  MALAPPURAM_WEST : ['UNIVERSITY', 'TIRUR', 'KOTTAKKAL', 'VALAVANNUR', 'KUMARANALLUR', 'CHANGARAMKULAM', 'PONNANI', 'MARANCHERY', 'KUTTIPPURAM', 'RANDATHANI', 'TANALUR', 'VARANAKKARA', 'TIRURANGADI', 'VENGARA'],
  PALAKKAD : ['PALAKKAD', 'EDATHANATTUKARASOUTH', 'EDATHANATTUKARANORTH', 'MANNARKKAD', 'OTTAPPALAM', 'PATTAMBI', 'ALATHUR'],
  THRISSUR : ['THRISSUR', 'KODUNGALLUR', 'KAIPAMANGALAM', 'CHAVAKKAD'],
  ERNAKULAM : ['ERNAKULAM', 'KOCHI', 'KAKKANAD', 'VYTTILA', 'VYPPIN', 'PALLURUTHI', 'ALUVA', 'MUVATTUPUZHA', 'PERUMBAVOOR', 'PARAVOOR', 'KOTHAMANGALAM'],
  ALAPPUZHA : ['ALAPPUZHA', 'KAYAMKULAM', 'NADVATH_NAGAR', 'KUTHIYATHODU'],
  IDUKKI : ['PEERUMEDU', 'THODUPUZHA'],
  PATHANAMTHITTA : ['PATHANAMTHITTA',],
  KOTTAYAM : ['ERATTUPETTA', 'KOTTAYAM'],
  KOLLAM : ['KOLLAM', 'CHADAYAMANGALAM', 'PUNALUR', 'KARUNAGAPPALLY'],
  THIRUVANANTHAPURAM : ['THIRUVANANTHAPURAM', 'NEDUMANGAD', 'ATTINGAL'],




},




units = {
  // 'mandalam':[ list of units in mandalam ]
  KASARAGOD: ["MOOLIYAR", "KASARAGOD TOWN", "KOLLAMPADI", "BADIRA", "VIDYANAGAR", "NARAMPADI", "ANANKUR", "KALANAD", "BERKKA", "CHERKALAM", "PUTHIYA BUS STAND", "PARAYA NADAKKAM", "THALANKARA", "BADIYADUKKA"],
  MANJESWARAM: ["PANDIYIL", "VORKADI", "HOSANGADI", "UPPALA", "MIYA PADAVU", "KUNJATHUR", "MACHAMPADI"],
  TRIKKARPUR: ["ELAMBICHI", "PADANNA MOOSHANJI MUKKU", "PADANNA KALIKKADAVU", "PEELIKKODE - KALIKKADAVU", "KADUMENI", "PADANNA THEKKUMPURAM", "PADANNA KADAPPURAM", "TRIKKARIPPURAM"],
  KANHANGAD: ["PALLIKKARA", "NEELRSHWARAM", "KANHANGAD"],
  
  KANNUR: ["CHALAD", "CHAKKARAKKAL", "KANNUR TOWN", "THANA", "KANCHIRODE", "KANICHERI", "MUNDERI", "PALLIPRAM", "KAKKAD", "PURATHIL", "CHALA", "KANNUR CITY", "VARAM"],
  THALASSERY: ["MUZHUPPILANGADI", "EDAKKAD", "SAIDARPALLI", "CHIRAKKARA", "THALASSERY", "EDAYILPEEDIKA", "NEWM AHI", "MOOZHIKKARA", "DAYANAGAR", "PERINGADI", "PARAL"],
  VALAPPATTANAM: ["VALAPATTANAM", "PAPPINISSERY", "KATTAMPALLY", "KAMBIL"],
  IRIKKOOR: ["ULIYIL", "ULIKKAL", "IRKKOOR", "IRITTY", "MATTANNUR"],
  PAYYANNUR: ["MANIMANGALAM", "RAILWAYGATE", "CHERUPUZHA", "RAMANTAHALI", "EDATTU", "PARIYARAM", "KAYYAYI", "VELLUR", "KAREMAL", "PILATHARA", "PAYYANNUR", "PERUMBA"],
  PAYANGADI: ["PAYANGADI", "EZHOM", "MTTOOLSOUTH", "MATTOOLNORTH", "MADAKKARA", "MUTTAM", "PUTHIYANGAD"],
  KOOTHUPARAMBA: ["KOOTHPARAMBA", "KAITHERI", "MALOOR", "MOORIYAD"],
  KADAVATHUR: ["ERINHIL-KEEZHIL", "KADAVATHURTOWN", "KURUNGAD", "KALLIKKANDY", "KALLIKKANDYSOUTH", "PARADE", "CHERUPARAMBA", "THUVVAKKUND"],
  PANOOR: ["PULLUKARA", "MENAPRAM", "ANIYARAM", "PERINGATAHUR", "KARIYAD", "ELANGODE", "PANOOR", "CHAMPADE", "KAIVELIKKA"],
  TALIPARAMBA: ["NADUVIL", "KURUMATHUR", "PERUMBADAVU", "CHUZHALI", "SREEKANTAPURAM", "PUSHPAGIRI", "TALIPARAMBA", "TALIPARAMAMANNA"],
  
  
  MEPPADI : ["Meppadi", "Rippon", "Vaduvanchal"],
  KALPETTA : ["Klpetta", "Pinangode", "Achoor6thMile", "Vengalappalli"],
  MEENANGADI : ["Meenangadi", "Kambalakkattu", "Muttil", "Kuttamangalam","Kaniyampatta", "SulthanBatheray", "Kallur"],
  MANANTHAVADI : ["Vellamunda", "Karakuni", "Mananthavady", "Thondernadu","Tharuvana", "Vellamunda10thMile", "Panamaram"],
  GUDALLUR : ["Pandallur", "Devala", "Gudallur","Mefield"],


  BALUSSERY : [
    "Balussery", "Shivapuram", "VattoliBazar", "KinalurNorth",
    "KinalurSouth", "BalusseryTown", "Panayi", "Arappeedika"
],

PERAMBRA : [
    "Kakkad", "Cheruvannur", "Ulliyeri", "Kadaingadpayam", "Muliyangal",
    "Nochad", "Avala", "Chalikkara", "Pantheerakkara", "Naduvannur",
    "Vakayad", "Perambra", "Kavumthara", "Mooyippothu", "Kayanna",
    "Theruvathukadavu", "Manthamkavu", "Valur"
],

KUTTYADI : [
    "VelamShanthiNagar", "Nambyathankundu", "Cherapuram", "Parakkadavu",
    "Cheekkonnu", "Valayannur", "Adukkath", "Devarkovil", "ParappilMukku",
    "Paikkalangadi", "Kayakkodi", "Kuttyadi"
],

NADAPURAM : [
    "Chelamukku", "Chiyyur", "Kallachi", "Nadapuram", "Thooneri",
    "ThanneerPanthal", "Vanimel", "Parakkadavu", "BhoomiVathukkal"
],

VATAKARA : [
    "Kannukkara", "NutStreet", "Puthuppanam", "KorothRoad", "Thodannur",
    "Moorad", "Kottakkal", "Palayad", "Thiruvallur", "Tharopoyil",
    "Ayancheri", "Vatakara", "Kalleri", "Villyappaly", "Elambilad"
],

PAYYOLI : [
    "Nandi", "Thikkodi", "ThikkodiKodikkal", "ThikkodiPanchayat", "ThikkodiAngadi",
    "PeraumalpuramPalliikara", "Payyoli", "Kizhur", "Thurasserykkadavu", "Thachankunnu"
],

MEPPAYUR : [
    "Nidumpoyil", "Palachuvadu", "Keezhariyoor", "NarakkoduCentral",
    "Iringathu", "Manjakkulam", "Kurudimukku", "Thurayur", "Meppayur",
    "NarakkoduWest"
],

KOYILANDI : [
    "Chengottukavu", "ManamalKuravangad", "Muthambi", "Namrathukara",
    "HillBazar", "Moodadi", "Koyilandi", "Kollam", "Kappad"
],

POONOOR : [
    "Umminikkunnu", "Thalayad", "Kolikkal", "Kanthapuram", "Neroth",
    "Ekarool", "Poonoor", "Kedavoor", "Eyyad", "Valliyoth"
],

ATHOLI : [
  "TheruvathBazar", "Puthiyangadi", "PuthiyaNirathu", "Elathur",
  "Kandamkulangara", "Eranhikkal", "Purakkattiri", "Thalakulathur",
  "Andikkode", "Kongannur", "Atholi", "Kulathur"
],

CITYWEST : [
  "Puthiyakadavu", "Vellayuil", "Khaleefa", "Kuttichira",
  "Idiyangara", "Mukhadhar", "Pallikkandi", "Kundungal", "SafaNagar"
],

KARAPPARAMBU : [
  "CivilStation", "Vellimadukunnu", "Moozhikkal", "Cheruvatta",
  "Kuruvattur", "PrfambilKadavu", "Kannadikkal", "Thadambattuthazham",
  "Engeri", "Kakkodi", "Malikkadavu", "KaraparambuEast", "KaraparambuWest"
],

MANKAVU : [
  "Azhchavattom", "WestMankavu", "Mankavu", "Pattelthazham", "Kommeri",
  "Kinassery", "Pokkunnu", "Mathara", "MGNagar", "PantheerankavuTown",
  "Puthurmadom", "Perumanna", "Manakkadavu", "PantheerankavuPoolenkara",
  "SalafiCentre,Olavanna", "OlavannaKambiliparammba"
],

MUKKOM:["Mukkom","Karamoola","Kakkad","Nellikkaparambu","Mavoor","Poolappoyil","Koolimadu","Pottassery","Koodaranji","Chennamangallur"
],

CITYEAST : [
  "Puthiiyara", "Chalappuram", "Asokapuram", "Nadakkavu", "Town", "Palayam"
],

MEDICALCOLLEGE : [
  "Palazhi", "Kayalam", "Cherooppa", "Kattukulangara", "Anakuzhikkara",
  "Kovoor", "Chevayur", "Mayanad", "Kunnamangalam", "Chevarambalam",
  "Poovattuparambu"
],

BEYPORE : [
  "Beypore", "Naduvattom", "Arakkinar", "Mathottom", "Marad",
  "Areekad", "Nallalam", "Modern", "Kundayithode", "Palattippadam","Cheruvannur"
],

NARIKKUNIWEST : [
  "Punnasseri", "PalathTown", "PCPalam", "Parannur", "NarikkuniTown",
  "Pallipoyil", "PalathTown"
],

KALLAYI : [
  "KallayiRahma", "Kappakkal", "Masjidulsalam", "KallayiDSR", "Anamadu",
  "Islahiya", "Kannanchery", "Meenchantha", "Payyanakkal", "Thiruvannur"
],

NARIKKUNIEAST : [
  "Madavoor", "Kacherimukku", "Arambram", "Muttancherry", "Katharammal",
  "Elettil", "Pannur", "Padanilam", "Pullorammal"
],

THAMARASSERY : [
  "Erpona", "Adivaram", "Thamarassery"
],

KARAKKUNNATH : [
  "NanmindaCentre", "Kuttambur", "Arenapoyil", "NanmindaNorth",
  "Karakkunnathu", "NanmindaSouth", "Cheekkilodu", "Ezhukulam", "Ramallur"
],

KODIYATHUR : [
  "Mukkom", "Karamoola", "Kakkad", "Nellikkaparambu", "Mavoor",
  "Poolappoyil", "Koolimadu", "Pottassery", "Koodaranji", "Chennamangallur"
],

FEROKE : [
  "Kadalundi", "Chaliyam", "Thiruthiyad", "FerokeChungam", "Kallampara",
  "Athanikkal", "Karuvanthiruthy", "FerokeTown", "Ramanattukra",
  "FerokeCollege", "Vazhayur", "Karad", "Kunnthupadi", "Kodampuzha"
],

PUTHUR : [
  "Thiruvampady", "Kallurutti", "Omassery", "Puthurmadom", "Kruvampoyil",
  "Pravil", "Koduvally", "Mannilkadav"
],


  
CHERUKAVU : [
  "Siyamkandam", "Periyambalam", "Ayikkarappadi", "KuvailMoola", "Kakkove",
  "Ottupara", "Chelakkadu", "Peringavu", "Paravoor"
],

VAZHAKKAD : [
  "Vazhakkad", "Elamaram", "Valillapuzha", "Mapram", "Edavannappara"
],

CHEEKKODE : [
  "Cheekkode", "Parappur", "Omanoor"
],


AREEKKODE : [
  "Vilayil", "KozhakkotturSouth", "KozhakkotturNorth", "Perumparampu", "Alukkal",
  "Kariparampu", "Areekkode", "Puthalam"
],

URANGATTIRI : [
  "Kinaradappan", "Vadakkummuri", "Therattammal", "Moorkkanad", "Kallrettikkal",
  "Thekkummuri", "Poovathikkal", "Thachanna"
],

KEEZHUPARAMPA : [
  "Pathanapuram", "AnwarNagar", "WestPathanapuram", "Kuttooli", "Keezhuparamba",
  "Trikkalayur", "KuniyilWadinoor", "KuniyilNewBazar"
],

OTHAYI : [
  "OthayiWest", "OthayiEast", "ChathallurWest", "ChathallurEast", "Pavanna"
],

EDAVANNA : [
  "Edavanna", "Pathappiriyam", "Kallidumbu", "Aryanthodika", "Palappatta",
  "Pannippara", "VKPadi", "Munengara", "Kunduthodu", "Chembakkuthu",
  "Aynthur"
],

MAMPAD : [
  "Panthalingal", "Kothanchery", "Palapparamba", "Kattumunda", "Pullippadam",
  "KariyathulKhair", "Mampad"
],

PULPATTA : [
  "Karaparambu", "Pulpatta", "Muthannur", "Trippanah"
],

KAVANOOR : [
  "Elayur", "Kavannur", "IrivettySouth", "Chengara", "Irivetty","Eliyaparampu"
],

PULIKKAL : [
  "Kottappuram", "Pulikkal", "Aroor", "Anthiyurkunnu", "Valiyaparampu",
  "Alungal", "Olavattur", "Alakkaparampu",
],

KONDOTTY : [
  "Nediyiruppu", "Muthuvallur", "Chemmalapparampu", "Tharayittal", "Kolathur",
  "ChirayilChungam", "Kuruppath", "Musliyarangadi", "Melangadi", "Airport-Karippur",
  "Kizhissery", "Kondotty", "Karuvankallu", "Thurakka"
],

MONGAM : [
  "Mongam", "Morayur", "AravangaraPookkottur", "Arimbra", "Olamathil",
  "AHNagar", "Athanikkal", "Valluvambram", "SalafiJabal"
],

MALAPPURAM : [
  "Paravakkal", "Karijapadi", "Vattallu", "Koottilangadi", "Kunnummal",
  "Malappuram", "Kodoor", "Pang"
],

PERINTHALMANNA : [
  "Thirunarayanapuram", "Odomala", "Thezhekode", "Paral", "Valambur",
  "Elamkulam", "Angadippuram", "Kolathur", "Kappu", "Pulamanthol", "Perinthalmanna"
],

MANKADA : [
  "Tirurkkadu", "PadinjareKulambu", "Aripra", "Mankada", "Koottilangadi",
  "PulikkalParampu", "Cheriyam", "MukkilCheriyam", "Kadannamanna", "Karimbanakkunnu",
  "Vellila"
],

MANJERI : [
  "Pattarkulam", "Payyanadu", "Pappinippara", "Parimbalam", "Anakkayam",
  "ManjeriTown", "Melakkam", "Pullur", "Mangalassery", "Kuttasseri",
  "Mullampara", "Muttipalam", "Irumboozhi"
],

THRIKKALANGODU : [
  "Pathiriyal", "Vadakkethiruvali", "Kottala", "Shappinkunnu", "Thachunni",
  "Pulath", "Karakkunnu-34", "KarakkunnuWest", "Amayur", "Pulingottupuram",
  "Anakkottupuram", "Trikkalangode"],

WANDOOR : [
  "Poolakkal", "Kottakkunnu", "Shanthinagar", "Koolikkattupadi", "Eriyadu",
  "Emangadu", "Kooliparampu", "Vaniyambalam", "Kappil", "Karimbanthodika",
  "Naduvath", "Karunalayappadi", "ThodikappulamPallikkunnu", "Wandoor",
  "Thaliyamkundu", "ThodikappulamSalafi", "Kokkadankunnu", "Thekkumpuram"
],

PANDIKKAD : [
  "Kodassery", "Cherukodu", "Arppinikkunnu", "Chathangottupuram",
  "AyanikkodeTown", "Odombatta", "AyanikkodeNiravil"
],

NILAMBUR : [
  "Erumamunda", "Muttiyel", "MeleManalody", "Karulayi", "Karimbuzha",
  "Mukkatta", "Nilambur", "NilamburRailway", "Manchanthani", "Chandakkunnu",
  "Vallappuzha", "Namboorpetti", "Elambilakode", "Eranjimangadu"
],

CHUNGATHARA : [
  "Chungathara", "Chathamunda", "Munderi", "Pothukallu", "Thampurattikkallu",
  "Uppada", "Kaippini", "Velumbiyampadam", "Poolappadam", "Kurumbalangodu", "Kolompadam"
],

EDAKKARA : [
  "Edakkara", "Karunechi", "Palemad", "Narokkavu", "Mundappotty",
  "Thannikkadavu", "Marutha", "Mamankara", "Kambalakkallu", "Manalpadam",
  "Vazhikkadavu", "Poovathipoyil", "Manimooli", "PalatMunda"
],

KALIKAVU : [
  "Adakkakundu", "Kalikavu", "Pallissery", "Pulvetta", "Chokkad", "Pullankodu",
  "Udirampoyil", "Karuvarakkundu", "KeralaEstate", "Mambattumoola", "Manjappetti",
  "Poongodu", "Anchachavidi"
],

MOOTHEDAM : [
  "Thalippadam", "Perumbiliyadam", "Palankara", "Karappuram", "Moothedam"
],

AMARAMBALAM : [
  "Pookkottumpadam", "Pottikkallu", "Kavalamukkatta", "Koottampara"
],


UNIVERSITY : [
  "PuthoorPallikkal", "Idimoozhikkal", "Kadappadi", "AnkaParamba",
  "Koonoolmadu", "Kohinoor", "SuperBazar", "Neerolpalam", "KolakkattuChali",
  "Chenakkalangadi", "ParambilPeedika", "Padikkal", "Chelaari",
  "Perunthodippadam", "VelimukkuAlungal", "Karumarakkad", "Kakkancheri",
  "PallikkalBazar"
],

TIRUR : [
  "Purathur", "Chembra", "Muthur", "Vettam", "Unniyal", "Tirur", "Perinthallur",
  "EdakkanadMaravantha", "Koottayi", "Chennara", "Alinchuvadu", "Naduvilangadi",
  "Meenadathur", "Pariyapuram", "Karathur", "Thalakkadathur", "BPAngadi",
  "Paravanna", "Mangattiri", "Vanniyur", "Alathiyoor"
],

KOTTAKKAL : [
  "Kooriyad", "Kottakkal", "Iringallur", "Munambath", "Klari-Moochikkal",
  "Kozhichena", "Edarikkode", "Kuzhippuram", "Cherussola", "Kottoor",
  "Puthupparambu", "Aatteeri", "Othukkungal","Changuvetty",
],

VALAVANNUR : [
  "Paravannur", "Varambanala", "Parakkall", "Panthavoor", "ParavannurWest",
  "Kadungathukundu", "Kavappura", "Mayyerichira", "ValavannurSiraj", "Cheravannur",
  "Kalpakanchery", "Kurukkol"
],

KUMARANALLUR : [
  "Islahiya", "Kumaranallur", "Mannarapparamba", "Koottanadu", "Edappal",
  "Pattithara", "Kaaladi", "Kottappadam", "Vattamkulam"
],

CHANGARAMKULAM : [
  "Mookkuthala", "Kokkur", "Pallikkara", "Chalisseri", "Valayamkulam",
  "Peringodu", "Pavittapuram", "Changaramkulam", "Othalur", "Naranippuzha",
  "Eravaramkunnu"
],

PONNANI : [
  "PonnaniTown", "CVJunction", "PonnaniSouth", "VeliyamkoduNorth",
  "Velyamkodu", "PullonathuAthani", "Beeyyam", "Thavanoor"
],

MARANCHERY : [
  "Purang", "Parithakam", "Vadamukku", "Maranchery", "Eramangalam",
  "Kanjiramukku", "Ayiroor", "Vadakkoot"
],

KUTTIPPURAM : [
  "Ieumbiliym", "Valancherry", "Kavumpuram", "Kolakkad", "Kuttippuram",
  "Chellur", "Edakkulam", "Valiyakunnu", "Thirunnavaya"
],

RANDATHANI : [
  "Randathani", "Puthanathani", "Vettichira", "WadiManar", "Kadampuzha",
  "Kanjippura", "Pathayakkal", "Kurukathani"
],

TANALUR : [
  "PuthiyaKadappuram", "Tanalur", "Olappeedika", "Niramaruthoor", "TanurEast",
  "Vellachal", "Theyyala", "Pandiyattu", "Ittilakkal", "Pakara", "TanurEast",
  "Vailathoor", "Mangadu"
],

VARANAKKARA : [
  "Varanakkara", "ThekkanKuttoor", "Allur", "Pullur", "Anappadi"
],

TIRURANGADI : [
  "Tirurangadi", "Kodakkall", "Venniyoor", "Chettippadi", "AlungalBeach",
  "Chemmad", "Kunnathuparamba", "Parappanangadi", "Chapappadi", "Kaliyattumukku",
  "Kariparambu", "Karimbil", "Kodinji", "Chiramangalam", "Kodakkat",
  "Kakkad", "Kottanthala", "Mooniyur", "Kanjithodu", "Palathingal",
  "Cherumukku", "Ariyallur", "Ottummal"
],

VENGARA : [
  "Cheroor", "Kuttur", "Kunnumpuram", "Methulad", "Edakkaparamba",
  "Kurukathani", "Achanambalam", "Vengara"
],






PALAKKAD : [
  "Kodunthirappalli", "Vennakkara", "Parli", "Parakkunnam", "Pirivushala",
  "Panniyampadam", "Valayar", "CivilStation", "Irppakkad", "Kurishankulam",
  "Puthupariyaram", "Kottayi", "Kallepulli", "Mannur", "Muttikulangara",
  "Kallikkad", "Kanjikkode", "Omayampallam", "Kalmandapam", "Pattanitheruvu",
  "PuthuppallyTheruvu", "Olavakkod", "Podippara", "Edathara", "Jainimedu", "Meparamba", "Kinavallur"
],

EDATHANATTUKARASOUTH : [
  "Alanallur", "Palakkazhi", "Unniyal", "Chirattakkulam", "PookadamCheri",
  "Kodiyamkunnu", "Muriyakkanni", "Thirivazhamkunnu", "Thadiyanparambu", "Kalamadam"
],

EDATHANATTUKARANORTH : [
  "Veliyamcheri", "Aniyamkode", "Ambalappara", "Mundakkunnu", "Karuvaratta",
  "Darussalam", "Padikkappadam", "Uppukulam", "Kappuparambu"
],


MANNARKKAD : [
  "Naattukal", "Kodakkad", "Mannarkkad", "Changaleri", "Elambulasseri",
  "Karakurushi", "Vazhampuram", "Kallatikkode", "Thachampara", "Chooriyod",
  "Chirakkalpadi"
],

OTTAPPALAM : [
  "Thrikkattiri", "Choonangad", "Chakkalakkund", "PazhayaLakkdi",
  "Paalappuram", "Chalavara", "Kadambazhippuram", "Cherpulasseri", "Ottappalam"
],

PATTAMBI : [
  "Aamayur", "Koppam", "Natyamangalam", "Kaippuram", "Vilathur",
  "Pallippuram", "Karuvanpadi", "Pattambi", "Vallappuzha", "Karinganad"
],

ALATHUR : [
  "Mudappallur", "Puthunagaram", "Thathamangalam", "Puliyamparambu", "Vadakkanchery"
],

THRISSUR : [
  "Poonthol", "Anthikkad", "Ottupara", "Peringottukara", "Karuvannur", "Kallur"
],

KODUNGALLUR : [
  "Tripekulam", "Edamukku", "Eriyad", "Annamanada", "Kochukadavu", "Edavilangad",
  "Kaathikkode", "Puthiyakavu", "Mathilakam", "PEBazar", "Azhikode", "Kodungallur",
  "Karupadanna", "Shanthipuram", "Vezhavana"
],

KAIPAMANGALAM : [
  "Kaipamangalam", "Chenthrappinni", "Koorikkuzhi(Panampalli)", "FarookNagar",
  "Koprakkalam", "Vatanappalli", "Kaalamuri", "Moonnupeedika", "Chenthrappinni-Centre",
  "KaipamangalamBoard", "Koolimuttom", "ChenthappinniEast", "Padiyoor", "Edamuttom"
],

CHAVAKKAD : [
  "Chavakkad", "Chettuva", "Edakkazhiyur", "Venkitangu", "Thiruvatta",
  "AdiThiruthuVadakkekad", "Thirunellur", "Kadappuram", "Punnayur", "Mandalamkunnu","Kochannoor"
],

ERNAKULAM : [
  "Kaloor", "Mulavukad", "Kombara", "SRMRoad", "Elamakkara", "Pulleppadi", "Kathrikkadavu"
],

KOCHI : [
  "Kochi", "Pattalam", "CPThodu", "Mattanchery", "Thuruthi", "Kalavathi", "CheralayiKadavu", "Kunnumpuram"
],

KAKKANAD : [
  "Cheranallur", "Edappalli", "Kangarappadi", "Padamugal", "Mattakkad", "Kakkanad", "Athani", "Kalamassery"
],

VYTTILA : [
  "Chakkaraparambu", "Nettoor", "Vyttila", "Kanjiramattom", "Kulasekharamangalam", "Thalayolapparambu", "Kumbalam"
],

VYPPIN : [
  "Edavanakkad SOUTH", "Edavanakkad North", "Malippuram", "Puthivaipu"
],

PALLURUTHI : [
  "East Shakha", "Kacherppadi", "Nambyapuram", "Parmpadappu", "Thoppumpadi"
],

ALUVA : [
  "Elukkara", "Thottakkattukara", "Purayaar", "Sreemoolanagaram", "Sreebhoothapuram",
  "Kuttamasseri", "Edayapuram", "Nalam Mile", "Kuzhivelippadi", "Nochima", "Kunnatheri",
  "Thayikkattukara", "Mottom", "Veliyannur", "Kadungallur", "Aluva"
],

MUVATTUPUZHA : [
  "Punnamattam", "Payipra", "Muvattupuzha Town", "Perumattom", "Kizhakkekara", "Mulavur"
],

PERUMBAVOOR : [
  "West Vengola", "Chelakkulam", "Perumbavoor", "Pallikkara", "Parakkod", "Marampalli", "Arakkappadi", "Pallikkavala"
],

PARAVOOR : [
  "Mnjali", "Veliyathunadu", "Panaayikkulam", "Aalamhuruthu", "Chethamangalam", "Kunnukara", "Theerikode"
],

KOTHAMANGALAM : [
  "Paimattam", "Nellikuzhi", "Irumalappadi", "Kothamangalam", "Manikkinar", "Pallari mangalam", "Adivaad"
],



ALAPPUZHA : [
  "Salafi", "Punnapra", "Ashramam", "Chungam", "Sea View Canal", "Iravukad", "Ambalappuzha", "Kunnumpuram", "Mannancherry", "Panoor Pallana"
],

KAYAMKULAM : [
  "Charummood", "Mannar", "Aikya Junction", "Kottukulangara", "Kayamkulam Town"
],

NADVATH_NAGAR : [
  "Nadvath Nagar (South)", "Nadvath Nagar (South)", "Arookkutty", "Perumbalam", "Nadvath Nagar (North)", "Panavalli", "Vatuthala Jetty"
],

KUTHIYATHODU : [
  "Aroor", "Vayalar", "Kuthiyathodu", "Maanakodam"
],


PEERUMEDU : [
  "Thookkupalam", "Elappara", "Nedumkandam", "Perumthavanam", "Kattappana", "Ramakkalmed"
],

THODUPUZHA : [
  "Irumbupalam", "Kumbamkallu","Thodupuzha"
],


PATHANAMTHITTA : [
  "Mele Vettippuram", "Thaikkavu", "Kulasekhara Pathi", "Vaypur", "Petta", "Kattoor", "Panthalam","Poonthala"
],

KOTTAYAM : [
  "Kottayam", "Kummanam", "Ettumanoor", "Changanassery"
],

ERATTUPETTA : [
  "Nadakkal", "Salaf_Nagar", "Kollamkantam", "Karakkad", "Mattakkad", "Thekkekara", "Vadakkekara", "Town_Erattupetta"
],

KOLLAM : [
  "Chathinamkulam", "Pattathanam", "Kollam Town (NORTH)", "Cantonment", "Firdous College", "Kadappakkada",
  "Pattarumukku", "Niravil", "Pallimukku", "Mailappura", "Pandakashala", "Asarimukku", "Kollam Town (NORTH)",
  "Ayathil", "Jonakappuram", "Thattamala", "Perayam", "Vadakkevila", "Chandanathoppu", "Kuttikkada",
  "Anjalummoodu", "Salafi Majid", "Barkathumukku", "Kannanallur", "Karikkod", "Mailakodu", "Madan Nada",
  "Vazhappalli", "Mekon", "Ilamballur"
],

CHADAYAMANGALAM : [
  "Nilamel", "Thevankoda", "Kadakkal", "Ayur", "Kaithodu"
],

PUNALUR : [
  "Thadikkad", "Venchemp", "Punalur", "Pathanapuram", "Kunnikkodu"
],

KARUNAGAPPALLY : [
  "Ochira", "Puthantheruvu", "Kadathur", "Karunagappally (EAST)", "Karunagappally", 
  "Edappallikkotta", "Panmana", "Kottukkad", "Thevalakkara", "Koyivila", "Mullikala", 
  "Sasthamkotta", "Shooranadu", "Vavvakkavu", "Chittumoola", "Veluthamanal", 
  "Karunagappally Town", "Vadakkumthala", "Manappally"
],


THIRUVANANTHAPURAM : [
  "Bemapalli", "Paruthikuzhi", "Pallitheruvu", "Vallakkadavu", "Karamana", 
  "Balaramapuram", "Karakka Mandapam"
],

NEDUMANGAD : [
  "Nedumangad", "Pangodu", "Vembayam", "Tholikkodu", "Poovachal"
],

ATTINGAL : [
  "Attingal", "Odayam", "Kaniyapuram", "Kallambalam", "Vadasserikkonam"
],

}















// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function isage(){
  var ageInput = document.getElementById("age");
  var ageValue = parseInt(ageInput.value, 10); // Parse the input value as an integer

  if (!isNaN(ageValue) && ageValue >= 1 && ageValue <= 99) {
    ageInput.style.background = "";
  } else {
    ageInput.style.background = "rgba(255, 0, 0, 0.2)";
  }
 
}


function topalert(txt) {
  var selectedValue = $("#" + txt).val();
  if (selectedValue == null) {
    alertify.set("notifier", "position", "top-right");
    alertify.error("Select " + txt + " first!");
  }
  
}

function fillmandalam() {
  var selectedValue = $("#district").val();
  var selectElement = document.getElementById("mandalam");

  mdlms = mandalams[selectedValue];

  selectElement.innerHTML = "";
  var option = document.createElement("option");
  option.value = null;
  option.textContent = "Select mandalam";
  option.disabled = true;
  (option.selected = true), selectElement.appendChild(option);

  for (i = 0; i < mdlms.length; i++) {
    var option = document.createElement("option");
    option.value = mdlms[i];
    option.textContent = mdlms[i];
    selectElement.appendChild(option);
  }
}

function fillunit() {
  var selectedValue = $("#mandalam").val();
  var selectElement = document.getElementById("unit");

  unts = units[selectedValue];

  selectElement.innerHTML = "";
  var option = document.createElement("option");
  option.value = null;
  option.textContent = "Select unit";
  option.disabled = true;
  (option.selected = true), selectElement.appendChild(option);

  for (i = 0; i < unts.length; i++) {
    var option = document.createElement("option");
    option.value = unts[i];
    option.textContent = unts[i];
    selectElement.appendChild(option);
  }
}


function wtsapp(){
  var num = $("#phone").val();
  if ( /^(\+\d*|\d+)$/.test(num)){
    document.getElementById('whatspp').value=num
    document.getElementById("phone").style.background='';
  }else if(num.length == 0){
    document.getElementById("phone").style.background='';
  }
  else{
    document.getElementById("phone").style.background='rgba(255, 0, 0, 0.2)';
  }
  
}



function validatenum(id){
  var pattern =  /^(\+\d*|\d+)$/; // Anchored pattern for exactly 10 digits
  var num = $("#" + id).val();
  if (pattern.test(num) || num.length === 0) {
    document.getElementById(id).style.background = '';
  } else {
    document.getElementById(id).style.background = 'rgba(255, 0, 0, 0.2)';
  }
} 


function isnum(id){
var num = $('#'+id).val();
if ( /^(\+\d*|\d+)$/.test(num)){
  document.getElementById(id).style.background='';
}else{
  document.getElementById(id).style.background='rgba(255, 0, 0, 0.2)';
}
  
}




const scriptURL = 'https://script.google.com/macros/s/AKfycby-YqGsETTMD3cRVS7kKQjuGVhfIba6yFbA9vHS6O2xSmZ1y7AuCgeKpVMXRTh4wTH1/exec';
const form = document.forms['ismform'];

form.addEventListener('submit', e => {
  e.preventDefault();


  const fieldIds = [ 'name','age','phone','whatspp','genter','profession','district','mandalam','unit','imageInput'];

  for (const id of fieldIds) {
    const value = $('#' + id).val().trim();
    if (value === '') {
      Swal.fire('All fields required');
      return false; 
    }
  }



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

  // Submit the form to your server as you were doing before
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => {
      // Handle the response from your server
      // You can show an additional success message here if needed
      Swal.fire('Thanks for Registering! Downloading Completed.').then((result) => {
        if (result.isConfirmed) {
          // Refresh the page
          window.location.reload();
        }
      });
    })
    .catch(error => {
      console.error('Error!', error.message);
      Swal.fire('Submission failed');
    });
});





//  ////////////////////////////////  to download image from page 2////////////////////////////////////////
function downloadCanvasImage() {
  const canvas = document.getElementById('croppedCanvas');
  const canvasDataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = canvasDataURL;
  link.download = 'downloaded_image.png';
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  
}


// document.getElementById('myForm').addEventListener('submit', function (e) {
//   e.preventDefault(); // Prevent the default form submission
//   downloadCanvasImage();
// });
