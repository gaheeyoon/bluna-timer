const $time = document.getElementById("time");      // 타이머

const $hourInput = document.getElementById("hour");     // 시
const $minuteInput = document.getElementById("minute"); // 분
const $secondInput = document.getElementById("second"); // 초

const $settingForm = document.getElementById("setting-item-input-form"); // 시분초 설정 창

let remainTime = 3600;
let interval;

const modifyNumber = (number) => {
    if(number < 10) {
        return "0" + number;
    } else if(number <= 0) {
        return "00";
    } else {
        return number;
    }
};

const setRemainTime = () => {
    let hour = $hourInput.value;
    let minute = $minuteInput.value;
    let second = $secondInput.value;

    remainTime = (hour * 3600) + (minute * 60) + (second * 1);
    updateRemainTimeText(getRemainTimetoText());
};

const updateRemainTime = () => {
    remainTime--;

    if(remainTime == 0) {
        end();
    }
    updateRemainTimeText(getRemainTimetoText());
};

const updateRemainTimeText = (time) => {
    $time.textContent = time;
};

const getRemainTimetoText = () => {
    let hour = Math.floor(remainTime / 3600);
    let min = Math.floor((remainTime - (hour * 3600)) / 60);
    let sec = Math.floor(remainTime - (hour * 3600) - (min * 60));

    return `${modifyNumber(hour)}:${modifyNumber(min)}:${modifyNumber(sec)}`;
};

const resetInput = () => {
    $hourInput.value = "";
    $minuteInput.value = "";
    $secondInput.value = "";
};

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

const reset = () => {
    if(validate()) {
        pause();
        setRemainTime();
        shuffle(videoUrlList);
    }
}

$hourInput.addEventListener("change", reset);
$minuteInput.addEventListener("change", reset);
$secondInput.addEventListener("change", reset);