var input = document.querySelector('#user_profile');
input.addEventListener('change', uploadImage);

function openModal(){
  var modal = document.getElementsByClassName("modal")[0];
  modal.style.display = "block";
  modal.style.animation = "fadeIn .7s";
}
function closeModal(){
  var modal = document.getElementsByClassName("modal")[0];
  modal.style.animation = "fadeOut .6s";
  setTimeout(function(){
    modal.style.display = "none";
  }, 500);
}
window.onclick = function(event) {
  if (event.target.className == "modal") {
    closeModal();
  }
};

function uploadImage(){
  //get uploaded file
  var placeholder = document.querySelector('#placeholder');
  var curFiles = input.files;
  
  //validate file
  if(curFiles.length>0 && validFileType(curFiles[0]))
  {
    var text = document.querySelector("#placeholder-text");
    if(text){ 
      placeholder.removeChild(text);
    }
    
    var url = window.URL || window.webkitURL;
    
    //create and append image to placeholder
    var imgUpload = document.createElement('img');
    imgUpload.src = ""+url.createObjectURL(curFiles[0]);
    imgUpload.id = "uploadedImage";
    imgUpload.style.height = "100%";
    imgUpload.style.width = "100%";
    imgUpload.style.maxWidth = "100%";
    //imgUpload.style.position = "absolute";
    imgUpload.style.objectFit = "cover";
    imgUpload.style.borderRadius = "0px";
    var children = placeholder.children; 
    var i;
    for(i=0; i<children.length; i++) {
        if (children[i].tagName == "IMG") {
            placeholder.removeChild(children[i]);
        }
    }
    placeholder.appendChild(imgUpload);
    addControl();
  }//if
}//uploadImage

function addControl(){
  var slider = document.createElement('input');
  slider.type = "range";
  slider.min = 0;
  slider.max = 360;
  slider.value = 0;
  slider.step = 1;
  slider.id = "imgControl";
  slider.style.marginTop = "10px";
  
  slider.addEventListener("change", rotateImage);
  slider.addEventListener("input", rotateImage);
  
  var tip = document.querySelector("#tooltip");
  var control = document.querySelector("#control");
  var children = control.children; 
  var i;
  for(i=0; i<children.length; i++)
    if(children[i].tagName=="INPUT")
    {
      return;
    }
  slider.classList.add("fade-in");
  control.insertBefore(slider, tip);
  tip.classList.add("fade-in");
  tip.style.display = "block";
}

function rotateImage()
{
  var deg = this.value;
  var img = document.querySelector("#uploadedImage");
  img.style.transform = "rotate("+(deg-360)+"deg)";
}

var tmp;
function createCanvas(elem){
  var scaleFactor = 3;
  var w = 520;
  var h = 480;
  var canvas = document.createElement('canvas');
  canvas.width = w*scaleFactor;
  canvas.height = h*scaleFactor;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  var context = canvas.getContext('2d');
  context.scale(scaleFactor,scaleFactor);
  context.imageSmoothingEnabled = false;
  context.webkitImageSmoothingEnabled = false;
  
  document.querySelector('#attendee-name').style.borderBottom = "2px solid transparent";
  document.querySelector('#control').style.display= "none";
  
  tmp = html2canvas(elem, {scale:scaleFactor, 
                           backgroundColor: null, 
                           canvas:canvas,
                           logging: false}).then(function(canvas) {
    canvas.style.alignSelf = "center";
    
    var badge =  document.querySelector('#my-badge');
    var btn = document.querySelector('#download-btn');
    while(badge.firstChild !== btn){
      badge.removeChild(badge.firstChild);
    }
    badge.insertBefore(canvas, btn);
    setTimeout(function(){
      document.querySelector('#attendee-name').style.borderBottom = "2px solid #eb7713"; 
      document.querySelector('#control').style.display = "block";  
    }, 2000);
    return canvas;
  });//html2canvas-promise
}//createCanvas

function downloadBadge(){
  //auto dowload the image
  tmp.then(function(canvas){
    canvas.toBlob(function(blob){
      saveAs(blob, "druplay-image-lifecamp.png");
    });
  });
}//downloadBadge

function createBadge(){  
  var div = document.querySelector('#badge');
  createCanvas(div);
  openModal();
}//saveBadge

var fileTypes = [
  'image/jpeg',
  'image/pjpeg',
  'image/png'
];

function validFileType(file) {
  for(var i = 0; i < fileTypes.length; i++) {
    if(file.type === fileTypes[i]) {
      return true;
    }
  }
  return false;
}//validFileType