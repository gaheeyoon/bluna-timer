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

let videoUrlList = ['yRTnfhynaRc', 'igXk6QiM7k0', 'oGortIMXvR4', 'exJILuVWKqY', 'JyvUjMbT-Qc',
    'UEDunnBrmOg', 'wJsifVTzQuc', 'u-p1umePZ-o', 'Wxc7XqUQBNQ', 'r8kVtq1dAik',
    '0_hO0sp5Gxc', 'hmBBZUd-eDk', 'OVR5SO0DvxE', '15wrFG1Gz84', 'dYUiGU3v8ew',
    'J37gHwn9904', '-cFpgpv4G0Y', '38opfjfWlgY', 'aWDpwkKktaU', 'A1leiL8wknU',
    'yhewMcvCyTU', 'RjzSPIdPXl0', '9aZmlntPYk4', '9MPjcB4n-Vc', '1AFW54NnDtQ',
    'FHdmgF7h8Wk', 'GLxYjLkR1ts', '5zsYEfujI24', 'P0q29xLexXc', 'pxCDtROfuFs',
    '8HZ698TcLtU', 'LlRX9FdUonI', '8BirxRSxOHk', 'xzCw7lM4Cls', 'TiURA4Ch1oU',
    'DSI6GXpkru0', '110JyIgQvOI', 'Anyo9iUBjRk', 'Y7BS3wZTVvM', 'fxAYwvRjrjs',
    '6d65eRnhrAw', 'AKfU9hnhck4', 'Dqf36LmjQHw', 'SABakcXwFik', 'nZlfIGiwPZ8',
    'mt9VSxZ1PKY', 'lHXJRx9Dq4Y', 'SWQlsfE6OpQ', '0cwmFM0dEgw', 'QB-sCoQkhfQ',
    'FmZsX1f1esc'
]
let videoNameList = ['April', 'Falling petals', 'Swimming', 'Shape', 'Zero gravity',
    'Someone', 'With cactus', 'Oasis', 'In your time that flows differently than I do', 'Indigo blossom',
    'A long day', 'Deep nap', 'Coming to you', 'Day after day', 'In my dreams',
    'How are you', 'Hope', 'Crossroads', 'Return', 'Name of life',
    'When the morning comes', 'Flowing flower petal', 'Spring night', 'Cherry blossom dance', 'Magnolia',
    'Spring in winter', 'Snow and stars', 'Mini bell', 'Deep blue of dawn', 'Patting',
    'A moment with you', 'Small room and old piano', 'Whispering', 'Hug in the moonlight', 'Approach',
    'May 26, Memories', 'May 29, Love in me', 'Moon', 'Wind', 'A letter from the moon',
    'Firefly', 'Violet', 'Death on life', 'Snow Blossom', 'The deep blue night',
    'Silhouette of sunlight', 'Evening primrose', 'Butterfly dance', 'Silent tremor', 'Wavy',
    'Winter blue'
]

const videoNum = videoUrlList.length;
let currentVideoNum = 0;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: 'yRTnfhynaRc',
        events: {
            'onStateChange': onPlayerStateChange    // 플레이어 상태 변화 시 이벤트를 실행한다.
        }
    });
}

function onPlayerStateChange(event) {
    if (event.data == 0) {
        currentVideoNum = Number(currentVideoNum) + 1;
        if(currentVideoNum == 50) {
            currentVideoNum = 0;
        }

        player.loadVideoById(videoUrlList[currentVideoNum]);
        $title.textContent = videoNameList[currentVideoNum] + " by 청월령";
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
    let videoSource = "./src/res/mov/" + Math.floor((Math.random() * 12) + 1) + ".mp4";

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
    }
}

changeVideo();
$play.addEventListener("click", play);
$pause.addEventListener("click", pause);
$hourInput.addEventListener("change", reset);
$minuteInput.addEventListener("change", reset);
$secondInput.addEventListener("change", reset);