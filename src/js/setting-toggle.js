const $settingBar = document.getElementById("setting-bar");
const $infoBar = document.getElementById("info-bar");
const $settingBtn = document.getElementById("setting-btn");
const $infoBtn = document.getElementById("info-btn");
const $settingCloseBtn = document.getElementById("setting-close-btn");
const $infoCloseBtn = document.getElementById("info-close-btn");

let isSettingBarOpen = false;
let isInfoBarOpen = false;


const settingBarToggle = () => {  
    if (isSettingBarOpen) {
        $settingBar.style.display = "none";
        $settingBtn.style.display = "inline-block";
        $settingCloseBtn.style.display = "none";
    } else {
        $settingBar.style.display = "block";
        $settingBtn.style.display = "none";
        $settingCloseBtn.style.display = "inline-block";
    }
    isSettingBarOpen = !isSettingBarOpen;
};

const infoBarToggle = () => {  
    if (isInfoBarOpen) {
        $infoBar.style.display = "none";
        $infoBtn.style.display = "inline-block";
        $infoCloseBtn.style.display = "none";
    } else {
        $infoBar.style.display = "block";
        $infoBtn.style.display = "none";
        $infoCloseBtn.style.display = "inline-block";
    }
    isInfoBarOpen = !isInfoBarOpen;
};

$settingBtn.addEventListener("click", settingBarToggle);
$infoBtn.addEventListener("click", infoBarToggle);
$settingCloseBtn.addEventListener("click", settingBarToggle);
$infoCloseBtn.addEventListener("click", infoBarToggle);