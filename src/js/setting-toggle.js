const $settingBar = document.getElementById("setting-bar");
const $settingBtn = document.getElementById("setting-btn");
const $closeBtn = document.getElementById("close-btn");

let isSettingBarOpen = false;

const settingBarToggle = () => {  
    if (isSettingBarOpen) {
        $settingBar.style.display = "none";
        $settingBtn.style.display = "inline";
        $closeBtn.style.display = "none";
    } else {
        $settingBar.style.display = "block";
        $settingBtn.style.display = "none";
        $closeBtn.style.display = "inline";
    }
    isSettingBarOpen = !isSettingBarOpen;
};

$settingBtn.addEventListener("click", settingBarToggle);
$closeBtn.addEventListener("click", settingBarToggle);