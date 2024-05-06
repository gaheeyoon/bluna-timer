const $time = document.getElementById("time");      // 현재 시각

const $hourInput = document.getElementById("hour"); // 시
const $minuteInput = document.getElementById("minute"); // 분
const $secondInput = document.getElementById("second"); // 초

const $settingForm = document.getElementById("setting-item-input-form"); // 시분초 설정 창
const $audio = document.getElementById("audio");    // 오디오

const $play = document.getElementById("play-btn"); // 시작 버튼
const $pause = document.getElementById("pause-btn"); // 일시 정지 버튼

let $video = document.getElementById("backgroundVideo");    // 비디오
let $title = document.getElementById("title");    // 제목

let tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
let player;
let done = false;

let remainTime = 3600;
let isStart = false;
let isFirstStart = true;
let interval;

let videoUrlList = [ {title: 'April', url: 'yRTnfhynaRc'}, {title: 'Falling petals', url: 'igXk6QiM7k0'}, {title: 'Swimming', url: 'oGortIMXvR4'}, 
    {title: 'Shape', url: 'exJILuVWKqY'}, {title: 'Zero gravity', url: 'JyvUjMbT-Qc'}, {title: 'Someone', url: 'UEDunnBrmOg'}, 
    {title: 'With cactus', url: 'wJsifVTzQuc'}, {title: 'Oasis', url: 'u-p1umePZ-o'}, {title: 'In your time that flows differently than I do', url: 'Wxc7XqUQBNQ'}, 
    {title: 'Indigo blossom', url: 'r8kVtq1dAik'}, {title: 'A long day', url: '0_hO0sp5Gxc'}, {title: 'Deep nap', url: 'hmBBZUd-eDk'}, 
    {title: 'Coming to you', url: 'OVR5SO0DvxE'}, {title: 'Day after day', url: '15wrFG1Gz84'}, {title: 'In my dreams', url: 'dYUiGU3v8ew'}, 
    {title: 'How are you', url: 'J37gHwn9904'}, {title: 'Hope', url: '-cFpgpv4G0Y'}, {title: 'Crossroads', url: '38opfjfWlgY'}, 
    {title: 'Return', url: 'aWDpwkKktaU'}, {title: 'Name of life', url: 'A1leiL8wknU'}, {title: 'When the morning comes', url: 'yhewMcvCyTU'}, 
    {title: 'Flowing flower petal', url: 'RjzSPIdPXl0'}, {title: 'Spring night', url: '9aZmlntPYk4'}, {title: 'Cherry blossom dance', url: '9MPjcB4n-Vc'}, 
    {title: 'Magnolia', url: '1AFW54NnDtQ'}, {title: 'Spring in winter', url: 'FHdmgF7h8Wk'}, {title: 'Snow and stars', url: 'GLxYjLkR1ts'}, 
    {title: 'Mini bell', url: '5zsYEfujI24'}, {title: 'Deep blue of dawn', url: 'P0q29xLexXc'}, {title: 'Patting', url: 'pxCDtROfuFs'}, 
    {title: 'A moment with you', url: '8HZ698TcLtU'}, {title: 'Small room and old piano', url: 'LlRX9FdUonI'}, {title: 'Whispering', url: '8BirxRSxOHk'}, 
    {title: 'Hug in the moonlight', url: 'xzCw7lM4Cls'}, {title: 'Approach', url: 'TiURA4Ch1oU'}, {title: 'May 26, Memories', url: 'DSI6GXpkru0'}, 
    {title: 'May 29, Love in me', url: '110JyIgQvOI'}, {title: 'Moon', url: 'Anyo9iUBjRk'}, {title: 'Wind', url: 'Y7BS3wZTVvM'}, 
    {title: 'A letter from the moon', url: 'fxAYwvRjrjs'}, {title: 'Firefly', url: '6d65eRnhrAw'}, {title: 'Violet', url: 'AKfU9hnhck4'}, 
    {title: 'Death on life', url: 'Dqf36LmjQHw'}, {title: 'Snow Blossom', url: 'SABakcXwFik'}, {title: 'The deep blue night', url: 'nZlfIGiwPZ8'}, 
    {title: 'Silhouette of sunlight', url: 'mt9VSxZ1PKY'}, {title: 'Evening primrose', url: 'lHXJRx9Dq4Y'}, {title: 'Butterfly dance', url: 'SWQlsfE6OpQ'}, 
    {title: 'Silent tremor', url: '0cwmFM0dEgw'}, {title: 'Wavy', url: 'QB-sCoQkhfQ'}, {title: 'Winter blue', url: 'FmZsX1f1esc'} ]

const videoNum = videoUrlList.length;
let currentVideoNum = 0;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: videoUrlList[0].url,
        events: {
            'onStateChange': onPlayerStateChange    // 플레이어 상태 변화 시 이벤트를 실행한다.
        }
    });
    $title.textContent = videoUrlList[0].title + " by bluna";
}

function onPlayerStateChange(event) {
    if (event.data == 0) {
        currentVideoNum = Number(currentVideoNum) + 1;
        if(currentVideoNum == 50) {
            currentVideoNum = 0;
        }

        player.loadVideoById(videoUrlList[currentVideoNum]);
        $title.textContent = videoNameList[currentVideoNum] + " by bluna";
    }
}

const modifyNumber = (number) => {
    if(number < 10) {
        return "0" + number;
    } else if(number <= 0) {
        return "00";
    } else {
        return number;
    }
};

const getRemainTimetoText = () => {
    let hour = Math.floor(remainTime / 3600);
    let min = Math.floor((remainTime - (hour * 3600)) / 60);
    let sec = Math.floor(remainTime - (hour * 3600) - (min * 60));

    return `${modifyNumber(hour)}:${modifyNumber(min)}:${modifyNumber(sec)}`;
};

const setRemainTime = () => {
    let hour = $hourInput.value;
    let minute = $minuteInput.value;
    let second = $secondInput.value;

    remainTime = (hour * 3600) + (minute * 60) + (second * 1);
    updateRemainTimeText(getRemainTimetoText());
};

const updateRemainTimeText = (time) => {
    $time.textContent = time;
};

const updateRemainTime = () => {
    remainTime--;

    if(remainTime == 0) {
        end();
    }
    updateRemainTimeText(getRemainTimetoText());
};

const resetInput = () => {
    $hourInput.value = "";
    $minuteInput.value = "";
    $secondInput.value = "";
};


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

const validate = () => {
    let hour = $hourInput.value;
    let minute = $minuteInput.value;
    let second = $secondInput.value;

    if(hour < 0 || minute < 0 || second < 0) {
        alert("0보다 큰 값을 입력해주세요.")
        return false;
    }
    
    if(hour > 24) {
        alert("25보다 작은 값을 입력해주세요.")
        return false;
    }

    if(minute > 59 || second > 59) {
        alert("60보다 작은 값을 입력해주세요.")
        return false;
    }

    return true;
}

const changeVideo = () => {
    let videoSource = "./src/res/mov/" + Math.floor((Math.random() * 11) + 1) + ".mp4";

    let source = document.createElement("source");
    source.setAttribute('src', videoSource);
    source.setAttribute('type', 'video/mp4');
    
    $video.appendChild(source);
    $video.muted = true;
    $video.play();
}

const reset = () => {
    if(validate()) {
        pause();
        setRemainTime();
        shuffle(videoUrlList);
    }
}

function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
}  

changeVideo();
shuffle(videoUrlList);
$play.addEventListener("click", play);
$pause.addEventListener("click", pause);
$hourInput.addEventListener("change", reset);
$minuteInput.addEventListener("change", reset);
$secondInput.addEventListener("change", reset);