function editorCtrl ($scope) {
  console.log("editorCtrl");
  var snap = Snap("#svg");
  var ft = [];
  $scope.svgWidth = 640;
  $scope.svgHeight = 640;
  $scope.zoomPercent = 100;
  $scope.imageZoom = 100;
  var imageWidth = 100, imageHeight = 100;
  $scope.inputText = 'hello world';
  $scope.showUploadbtn = true;
  $scope.showStartOver = false;
  $scope.showStickerTitleError = false;
  $scope.showFileError = false;
  //library of images
  $scope.previewImgs = [
    {"id":"bgimage", "src":"imgs/bg-imgs/1.jpg"},
    {"id":"bgimage", "src":"imgs/bg-imgs/2.jpg"},
    {"id":"bgimage", "src":"imgs/bg-imgs/3.jpg"},
    {"id":"bgimage", "src":"imgs/bg-imgs/4.jpg"},
    {"id":"bgimage", "src":"imgs/bg-imgs/5.jpg"},
    {"id":"bgimage", "src":"imgs/bg-imgs/6.jpg"},
    {"id":"bgimage", "src":"imgs/bg-imgs/7.jpg"},
    {"id":"bgimage", "src":"imgs/bg-imgs/8.jpg"},
    {"id":"bgimage", "src":"imgs/bg-imgs/9.jpg"}
  ];

  //library of stickers
  $scope.stickers = [
    "Ticket",
    "postagestamp",
    "vintagevectorlabels",
    "RetroOvalGlass",
    "VintageGlass",
    "ClassicpoirotMoustache",
    "MexicanMoustache",
    "BatmanHat",
    "HornHat",
    "SantaClausHat",
    "MonkeyHat"
  ];

  //array to store customStickers
  $scope.customStickers = [];
  function getSavedData () {

    var prevSvg = localStorage.getItem("prevSvg");
    //console.log(prevSvg);
    if(prevSvg != null){

      var svg = angular.element("#svg");
      svg.empty()
      var s = Snap.parse(prevSvg);
      snap.append(s);
    }

  }

  getSavedData();

  //function to convert img to Base64
  function convertImgToBase64(url, callback, outputFormat){
	var img = new Image();
	img.crossOrigin = 'Anonymous';
	img.onload = function(){
	    var canvas = document.createElement('CANVAS');
	    var ctx = canvas.getContext('2d');
		  canvas.height = this.height;
      canvas.width = this.width;
      imageWidth = this.width;
      imageHeight = this.height;
	  	ctx.drawImage(this,0,0);
	  	var dataURL = canvas.toDataURL(outputFormat || 'image/png');
	  	callback(dataURL);
	  	canvas = null;
	};
	img.src = url;
}

//handle image upload
   $scope.imageUpload = function (){
     console.log("reading file");
     var file = document.getElementById('uploadImage').files[0];
     var reader = new FileReader();
     var preview = document.getElementById('img-preview');
     if(file){
       reader.readAsDataURL(file);
     }
     reader.onloadend = function () {
       $scope.$apply(function(){
         $scope.previewImgs.push({"id":"bgimg", "src":reader.result});
       });
       angular.element('#svg').find('image').remove();
       var c = snap.image(reader.result, 0,0);
       c.attr('id', 'bgimg');

       c.drag();
       setTimeout(function(){
         imageWidth = angular.element('#svg').find('image').attr('width');
         imageHeight = angular.element('#svg').find('image').attr('height');
         console.log(imageWidth, imageHeight);
       }, 500);
       $scope.$apply(function () {
         $scope.showUploadbtn = false;
         $scope.showStartOver = true;
       });

     }
   }
//counter variable to assign a unique id to elements being added
   var i = 0;

   //sticker upload
   $scope.stickerUpload = function () {

     if($scope.stickerTitle == undefined){
       console.log("invalid");
       $scope.showStickerTitleError = true;
       setTimeout(function () {
         $scope.$apply(function () {
           $scope.showStickerTitleError = false;
         });
       }, 3000);
       return;
     }
     if(document.getElementById('stickerUpload').files.length == 0){
       console.log("invalide")
       $scope.showFileError = true;
       setTimeout(function () {
         $scope.$apply(function () {
           $scope.showFileError = false;
         });
       }, 3000);
       return;
     }
     i++;
     var file = document.getElementById('stickerUpload').files[0];
     var reader = new FileReader();
     var preview = document.getElementById('img-preview');
     if(file){
       reader.readAsDataURL(file);
     }
     reader.onloadend = function () {
       $scope.$apply(function(){
         $scope.customStickers.push({"id":"stickers", "src":reader.result, "title":$scope.stickerTitle});
       });
       var c = snap.image(reader.result, 0,0);
       c.attr("id", i)
       c.drag();
     }
      angular.element("#sticker-modal").modal('hide');
   }

   $scope.allowDrop = function (ev) {
       ev.preventDefault();
   }

   $scope.drag = function (ev) {
     if(ev.target.id == "title" || ev.target.id == "subtitle" || ev.target.id == "body"){
       ev.dataTransfer.setData("svg" , ev.target.id);
       ev.dataTransfer.setData("type" , "text");
     } else if (ev.target.tagName == "IMG" && ev.target.id != "stickers") {
       console.log("trigger img drag");
       ev.dataTransfer.setData("svg", ev.target.src);
       ev.dataTransfer.setData("type" , "img");
     } else if(ev.target.id == "stickers") {
       console.log("trigger sticker drag");
       var sId = ev.target.id;
       //var src = angular.element('#'+sId).children().children('img').attr('src');
       ev.dataTransfer.setData("svg", ev.target.src);
       ev.dataTransfer.setData("type", "sticker");
     } else {
       ev.dataTransfer.setData("svg", "svgs/"+ev.target.id+".svg");
       ev.dataTransfer.setData("type" , "svg");
       }
     }

   $scope.drop = function (ev) {
       ev.preventDefault();
       var data = ev.dataTransfer.getData("svg");
       var type = ev.dataTransfer.getData("type");

   if(type == "text"){
     i++;
           var pX = ev.offsetX;//- ev.target.offsetLeft;
           var pY = ev.offsetY;// - ev.target.offsetTop;
           console.log(pX, pY, data);
            var text = snap.text(pX, pY, data);
            text.attr({"font-size":"55px", "id" : i});
            text.drag();
   } else if(type == "svg") {
     i++;
     var group = snap.g();
           var pX = ev.offsetX - 100;//- ev.target.offsetLeft;
           var pY = ev.offsetY - 100;// - ev.target.offsetTop;
           console.log(pX, pY, data);
           Snap.load(data, function (f) {
             console.log(f);
             g = f.select('g');
             g.attr("transform", "translate("+pX+","+pY+")");
             //g.attr("transform", "scale(0.5)");
             group.append(g);
             group.attr("id", i);
             ft[i] = Snap.freeTransform(group, {
               draw: ['bbox'],
               drag: ['self'],
               keepRatio: ['bboxCorners'],
               rotate: ['axisX'],
               scale: ['bboxCorners'],
               distance: '1.2'
             }, cb);
             ft[i].hideHandles();
     });
   } else if(type == "img"){
         //console.log("image dropped::"+data);
         angular.element('image#bgimg').remove();
         convertImgToBase64(data, function(url){
           console.log(url);
           var c = snap.image(url, 0,0);
           c.attr('id', "bgimg");
            c.drag();
         }, 'image/jpeg');
  } else if(type == "sticker"){
    i++;
    var sticker = snap.image(data, ev.offsetX, ev.offsetY);
    sticker.attr('id', i);
    sticker.drag();
  }
}
   var selectedGroupId;
   //handle click on the canvas-container
   snap.click(function(e){
     console.log(e.target.tagName, e.target.id);
     if(e.target.tagName == "text"){
       var id = e.target.id;
       selectedGroupId = id;
       $scope.$apply(function() {
         $scope.inputText = e.target.textContent;
       });

       angular.element(".text-menu").show();
       angular.element(".image-menu").hide();
       angular.element(".context-menu").hide();
      //  angular.element(".canvas-container").attr("contenteditable", "true");

     } else if(e.target.id == "svg"){
       ft[selectedGroupId].hideHandles();
     } else if(e.target.tagName == "image"){

      angular.element(".context-menu").hide();
      angular.element(".text-menu").hide();
      angular.element(".image-menu").show();
      if(ft[selectedGroupId]){
        ft[selectedGroupId].hideHandles();
      }
      selectedGroupId = e.target.id;


    } else {
       angular.element(".context-menu").show();
       angular.element(".text-menu").hide();
       angular.element(".image-menu").hide();
       var elemG = e.target.parentElement.parentElement;
       var id = elemG.id;
       selectedGroupId = id;
       console.log("svg selected::"+selectedGroupId)
      //  var height = Snap.path.getBBox(e.target.getAttribute("d"));
      //  console.log(height);
       ft[id].showHandles();
     }

   });
   function cb(e, evs){
     //console.log(evs);
     if(evs == "scale end"){
       console.log(e.attrs.scale.x, e.attrs.scale.y);
     }
     if(evs == "apply"){

     }
     //console.log(e, evs);
   }

   $scope.deleteItem = function (){
     console.log("delete item");
     ft[selectedGroupId].unplug();
     $("#"+selectedGroupId).remove();
   }
   $scope.removeImage = function () {
     angular.element("image#"+selectedGroupId).remove();
   }
   $scope.pushImgBack = function () {
     console.log("clicked")
     var img = angular.element('image#bgimg');
     angular.element('#svg').prepend(img);
   }
   var scale = 1;
   $scope.zoom = function (factor) {
     if(factor == "plus"){
       scale += 0.2;
      angular.element('#svg').css("transform", "scale("+scale+")");
       $scope.zoomPercent += 20;
     } else if(factor == "minus"){
       scale -= 0.2;
       $scope.zoomPercent -= 20;
       angular.element('#svg').css("transform", "scale("+scale+")");
     }
   }
   var imgScale = 1;
   $scope.imageZoomPercent = 100;
   $scope.imageZoom = function (factor) {
     //debugger;
     var image = document.getElementById(selectedGroupId);
     console.log(image.getAttribute("width"));
     var oWith, oHeight;
     if(selectedGroupId == "bgimg"){
       oWidth = imageWidth;
       oHeight = imageHeight;
     } else {
       oWidth = image.getAttribute("width");
       oHeight = image.getAttribute("height");
     }
       var width = 20 * oWidth / 100;
       var height = 20 * oHeight / 100;
     if(factor == 'plus'){
       oWidth = parseInt(oWidth) + width;
       oHeight = parseInt(oHeight) + height;
       image.setAttribute('height', oHeight);
       image.setAttribute('width', oWidth);
       if(selectedGroupId == "bgimg"){
         imageWidth = oWidth;
         imageHeight = oHeight;
       }
       $scope.imageZoomPercent += 20;
     } else if(factor == 'minus'){
       oWidth = parseInt(oWidth) - width;
       oHeight = parseInt(oHeight) - height;
       image.setAttribute('height', oHeight);
       image.setAttribute('width', oWidth);
       if(selectedGroupId == "bgimg"){
         imageWidth = oWidth;
         imageHeight = oHeight;
       }
       $scope.imageZoomPercent -= 20;
     }
   }
   $scope.addFilter = function(filter){
     if(filter == 'blur'){
       angular.element('#svg').css('-webkit-filter', 'blur(5px)');
     }
     if(filter == 'grey'){
       angular.element('#svg').css('-webkit-filter', 'grayscale(1)');
     }
     if(filter == 'sep'){
       angular.element('#svg').css('-webkit-filter', 'sepia(1)');
     }
     if(filter == 'none'){
       angular.element('#svg').css('-webkit-filter', 'none');
     }
   }
   $scope.editText = function () {
     angular.element("#"+selectedGroupId).text($scope.inputText);
   }
   $scope.textSize = function (factor) {
     var text = angular.element("#"+selectedGroupId);
     var fontSize = parseInt(text.css('font-size'));

      if(factor == "plus"){
        fontSize = fontSize + 2 + 'px';
        //console.log(fontSize);
        angular.element("#"+selectedGroupId).css("font-size", fontSize);
      } else if(factor == "minus"){
        fontSize = fontSize - 2 + 'px';
        angular.element("#"+selectedGroupId).css("font-size", fontSize);
      }
   }
   $scope.removeText = function () {
     angular.element("#"+selectedGroupId).remove();
   }
   $scope.facebookLayout = function () {
     $scope.svgWidth = 940;
     $scope.svgHeight = 788;
   }
   $scope.coverLayout = function () {
     $scope.svgWidth = 851;
     $scope.svgHeight = 315;
     //$scope.zoomPercent = 100;
   }
   $scope.instagramLayout = function () {
     $scope.svgWidth = 640;
     $scope.svgHeight = 640;
   }
   angular.element(".color-selected").colorpicker().on('changeColor.colorpicker', function(event){
       angular.element(this).css("background-color", event.color.toHex());
       var c = event.color.toRGB();
       angular.element("#"+selectedGroupId).children("g").children("#bg").attr("fill", "rgba("+c.r+","+c.g+","+c.b+","+c.a+")");
       console.log($("#"+selectedGroupId).children("g").children("#bg"));
       });
       angular.element(".text-color").colorpicker().on('changeColor.colorpicker', function(event){
           angular.element(this).css("background-color", event.color.toHex());
           var c = event.color.toRGB();
          angular.element("#"+selectedGroupId).attr("fill", "rgba("+c.r+","+c.g+","+c.b+","+c.a+")");
           //console.log(event.color.toRGB());
           });
  $scope.startOver = function () {
    angular.element("#svg").empty();
      i = 0;
      $scope.showUploadbtn = true;
      $scope.showStartOver = false;
      localStorage.clear();
      alert("LocalStorage Data Cleared");
  }
}
