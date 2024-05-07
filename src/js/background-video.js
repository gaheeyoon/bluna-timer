let $video = document.getElementById("backgroundVideo");    // 비디오

const changeVideo = () => {
    let videoSource = "./src/res/mov/" + Math.floor((Math.random() * 10) + 1) + ".mp4";

    let source = document.createElement("source");
    source.setAttribute('src', videoSource);
    source.setAttribute('type', 'video/mp4');
    
    $video.appendChild(source);
    $video.muted = true;
    $video.play();
}

changeVideo();
