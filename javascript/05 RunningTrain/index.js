// 键盘上下左右按键Keycode和方向的对应关系
const KeyDirections = {
    37: 'left', 38: 'up', 39: 'right', 40: 'down',
};

const DirectionCodeKey = [37, 38, 39, 40];

const gameMapSize = {
    width: 1100, height: 770
};


/* 相关dom */
let bgmSelectDom = null
let bgmAudioDom = null


/* 火车信息 */
// 火车车厢长度
const TrainNodeLength = 22;
// 车头默认向右
let trainHeadDirection = 'right';
// 火车的节点位置数据（动态）
let trainList = [{
    top: 0, left: 0, direction: 'right',
}, {
    top: 0, left: 22, direction: 'right',
}, {
    top: 0, left: 44, direction: 'right',
},];


function init() {
    bgmSelectDom = document.querySelector("#playBGM")
    bgmAudioDom = document.querySelector("#bgm")

    addBgmSelectListener()
    addKeyListener()
    renderTrain()
    trainStart()
}

/**
 * 播放歌曲监听器
 */
function addBgmSelectListener() {
    bgmSelectDom.addEventListener('change', function (event) {
        if (event.target.value === 'on') {
            bgmAudioDom.play()
        } else {
            /* 停止播放，重置进度 */
            bgmAudioDom.pause()
            bgmAudioDom.currentTime = 0
        }
    })
}

/**
 * 添加四个方向按钮
 */
function addKeyListener() {
    window.addEventListener('keydown', function (event) {
        const keyCode = event.keyCode
        const direction = KeyDirections[keyCode]
        if (DirectionCodeKey.includes(keyCode)) {
            // 按键与车头反向无效判定
            if ((trainHeadDirection === 'right' && direction === 'left')
                || trainHeadDirection === 'down' && direction === 'up'
                || trainHeadDirection === 'left' && direction === 'right'
                || trainHeadDirection === 'up' && direction === 'down') {
                return;
            }
            changeTrainDirection(direction);
        }
    })
}

function renderTrain() {
    let TrainNodeListDom = document.querySelectorAll('.train-node')
    for (let i = 0; i < trainList.length; i++) {
        const trainNodeData = trainList[i];
        const trainNodeDom = TrainNodeListDom[i];
        // 设置每个车厢节点的位置
        trainNodeDom.style.left = `${trainNodeData.left}px`;
        trainNodeDom.style.top = `${trainNodeData.top}px`;
        // 删除每个节点的方向再设置对应方向
        trainNodeDom.classList.remove('car-left', 'car-up', 'car-right', 'car-down');
        if (trainNodeData.direction === 'up') {
            trainNodeDom.classList.add('car-up');
        } else if (trainNodeData.direction === 'right') {
            trainNodeDom.classList.add('car-right');
        } else if (trainNodeData.direction === 'down') {
            trainNodeDom.classList.add('car-down');
        } else if (trainNodeData.direction === 'left') {
            trainNodeDom.classList.add('car-left');
        } else {
            // do nothing
        }
    }
}


function trainStart() {
    // 移动车头和车身
    function _move(direction) {
        for (let i = 0; i < trainList.length; ++i) {
            const trainNodeData = trainList[i]
            if (direction === 'left') {
                if (i === trainList.length - 1) {
                    trainNodeData.left -= TrainNodeLength;
                } else {
                    trainNodeData.top = trainList[i + 1].top;
                    trainNodeData.left = trainList[i + 1].left;
                    trainNodeData.direction = trainList[i + 1].direction;
                }
            } else if (direction === 'right') {
                if (i === trainList.length - 1) {
                    trainNodeData.left += TrainNodeLength;
                } else {
                    trainNodeData.top = trainList[i + 1].top;
                    trainNodeData.left = trainList[i + 1].left;
                    trainNodeData.direction = trainList[i + 1].direction;
                }
            } else if (direction === 'up') {
                if (i === trainList.length - 1) {
                    trainNodeData.top -= TrainNodeLength;
                } else {
                    trainNodeData.top = trainList[i + 1].top;
                    trainNodeData.left = trainList[i + 1].left;
                    trainNodeData.direction = trainList[i + 1].direction;
                }
            } else {
                // trainList数组的最后一个数据是车头，需要特殊处理
                if (i === trainList.length - 1) {
                    trainNodeData.top += TrainNodeLength;
                } else {
                    trainNodeData.top = trainList[i + 1].top;
                    trainNodeData.left = trainList[i + 1].left;
                    trainNodeData.direction = trainList[i + 1].direction;
                }
            }

        }
        renderTrain()
    }

    setInterval(() => _move(trainHeadDirection), 500)
}


/**
 * 转换火车方向
 * @param direction 方向
 * 火车头变化方向，并将火车头朝向
 */
function changeTrainDirection(direction) {
    trainHeadDirection = direction
    trainList[trainList.length - 1].direction = direction
}

/* todo:吃奖励相关 */

init()