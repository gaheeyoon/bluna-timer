let $title = document.getElementById("title");    // 제목
let tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;

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

function shuffle(array) {
    let currentIndex = array.length;
  
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
  
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}  

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

        player.loadVideoById(videoUrlList[currentVideoNum].url);
        $title.textContent = videoUrlList[currentVideoNum].title + " by bluna";
    }
}

shuffle(videoUrlList);