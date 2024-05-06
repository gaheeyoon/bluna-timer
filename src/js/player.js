const $play = document.getElementById("play-btn"); // 시작 버튼
const $pause = document.getElementById("pause-btn"); // 일시 정지 버튼

const play = () => {
    if(remainTime <= 0) {
        alert("시간을 설정해주세요.");
        return;
    }

    player.playVideo();
    interval = setInterval(updateRemainTime, 1000);
    $play.style.display = "none";
    $pause.style.display = "inline";
}

const pause = () => {
    player.pauseVideo();
    clearInterval(interval);
    $play.style.display = "inline";
    $pause.style.display = "none";
}

const end = () => {
    player.pauseVideo();
    clearInterval(interval);
    resetInput();
    $play.style.display = "inline";
    $pause.style.display = "none";
    updateRemainTimeText("00:00:00");
}

$play.addEventListener("click", play);
$pause.addEventListener("click", pause);