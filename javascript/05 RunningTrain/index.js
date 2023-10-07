/* 相关dom */
let bgmSelectDom = null
let bgmAudioDom = null

function init() {
    bgmSelectDom = document.querySelector("#playBGM")
    bgmAudioDom = document.querySelector("#bgm")

    addBgmSelectListener()
}

/**
 * 播放歌曲监听器
 */
function addBgmSelectListener() {
    bgmSelectDom.addEventListener('change', function (event) {
        if (event.target.value === 'on') {
            bgmAudioDom.play()
        } else {
            /* 停止播放 */
            bgmAudioDom.pause()
            bgmAudioDom.currentTime = 0
        }
    })
}


init()