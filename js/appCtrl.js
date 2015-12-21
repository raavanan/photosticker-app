function appCtrl ($scope){

//download the canvas as Image
$scope.downloadImage = function () {
  angular.element("#svg").css("transform", "scale(1)");
  var width = angular.element("#svg").attr('width');
  var height = angular.element("#svg").attr('height');
  console.log('svg width::'+width);

  var canvas = document.getElementById('canvas');
  canvas.setAttribute("width", width);
  canvas.setAttribute("height", height);
  var ctx = canvas.getContext('2d');
  var data = angular.element("#svg")[0].outerHTML;

  //console.log(angular.element("#svg")[0].outerHTML);
  var DOMURL = window.URL || window.webkitURL || window;

var img = new Image();
var svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
var url = DOMURL.createObjectURL(svg);

img.onload = function () {
  ctx.drawImage(img, 0, 0);
  DOMURL.revokeObjectURL(url);
  console.log("loaded");
  canvas.toBlob(function(blob) {
    saveAs(blob, "pretty-image.png");
});
}
img.src = url;
}
//attempt at localStorage but could not complete it.
$scope.save = function () {
  angular.element("#save-modal").modal("hide");
  //console.log(angular.element("#svg")[0].innerHTML);
  if(typeof(Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
    var data = angular.element("#svg")[0].innerHTML;
    if(data.length < 2000000){
      localStorage.setItem("prevSvg", data);
      console.log("saved"+data.length);
    } else {
      alert("Storage space exceeded");
    }
} else {
    // Sorry! No Web Storage support..
    alert("Sorry! can't save, Web storage not supported..");
}
}



}
