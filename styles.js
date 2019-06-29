document.addEventListener("DOMContentLoaded", load);

window.onload = function(){ 
  var body = document.querySelector(".container");
  setTimeout(function(){
   
   var spinner= document.querySelector(".spinner");
    spinner.style.display = "none";
    document.body.removeChild(spinner);
    body.classList.add("fade-in");
    body.style.visibility = "visible";}, 500);
};

function load(){
  var userAgent = navigator.userAgent.toLowerCase();
  var iosmobile=navigator.userAgent.match(/(iPhone)|(iPod)/i);
  var iostab=navigator.userAgent.match(/(iPad)/i);
  if(iosmobile)
  {
    var link = document.createElement('link');
    link.type="text/css";
    link.rel="stylesheet";
    link.href="ios_style.css";
    document.head.appendChild(link);    
  }
  if(iostab)
  {
    var link2 = document.createElement('link');
    link2.type="text/css";
    link2.rel="stylesheet";
    link2.href="ios_tab_style.css";
    document.head.appendChild(link2);    
  }
  
}//load()