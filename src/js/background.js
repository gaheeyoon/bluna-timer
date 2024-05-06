let video = document.getElementById("backgroundVideo");
let source = document.createElement("source");

let videoSource = "./src/res/mov/" + Math.floor((Math.random() * 17) + 1) + ".mp4";

source.setAttribute('src', videoSource);
source.setAttribute('type', 'video/mp4');

video.appendChild(source);
video.play();
