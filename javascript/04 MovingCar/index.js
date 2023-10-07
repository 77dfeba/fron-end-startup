// 按钮常量和车存储位置
const moveKeyCodes = {
    left: 37,
    right: 39,
    up: 38,
    down: 40,
}
const carTypeImgPath = {
    tractors: './images/car1.webp',
    truck: './images/car2.webp',
    motor: './images/car3.webp',
    roadster: './images/car4.webp',
    electricMotor: './images/car5.webp',
    bike: './images/car6.webp'
}

// 全局相关DOM和变量
let speedSelectDom = null
let carTypeSelectDom = null
let gameMapDom = null
let carDom = null


// 控制参数
let speed = 1
let carType = ''
let carDirection = 'right'

// 存储车状态key
const gameStorageKey = '77dfeba_demo4_key'


/* 游戏初始化 */
function init() {
    // 获取dom元素
    speedSelectDom = document.querySelector('#speed')
    carTypeSelectDom = document.querySelector('#carType')
    gameMapDom = document.querySelector('.game-map')
    carDom = document.querySelector('.car')
    // 初始化监听
    carSpeedChangeListener()
    carTypeChangeListener()
    moveKeyListener()
    // 处理存储游戏状态
    const saveData = JSON.parse(localStorage.getItem(gameStorageKey))
    if (saveData) {
        speedSelectDom.value = saveData.speed
        speed = saveData.speed
        carTypeSelectDom.value = saveData.carType
        carType = saveData.carType
        carDom.style.left = saveData.position.left
        carDom.style.top = saveData.position.top
        carDirection = saveData.headDirection
        renderCarChange()
        renderCarHeadChange()
    }
}


/* 变化监听 */
function carSpeedChangeListener() {
    speedSelectDom.addEventListener('change', function (event) {
        speed = speedSelectDom.value
        saveGame()
    })
}

function carTypeChangeListener() {
    carTypeSelectDom.addEventListener('change', function (event) {
        carType = carTypeSelectDom.value
        renderCarChange()
        saveGame()
    })
}

/* 车辆控制 */
function moveKeyListener() {
    window.addEventListener('keydown', function (event) {
        // 让选择器失焦
        speedSelectDom.blur()
        carTypeSelectDom.blur()
        const keyCode = event.keyCode
        // 移动车
        if (Object.values(moveKeyCodes).includes(keyCode)) {
            moveCar(keyCode)
        }
        // 阻止事件冒泡变更选择器
        event.preventDefault()
        saveGame()
    })
}

/* 按键响应 */
function moveCar(keyCode) {
    // console.log('小车移动' + keyCode)
    if (!checkInRange(keyCode)) {
        alertOutOfRange()
    }
    // 判断按键方向，移动车头
    switch (keyCode) {
        case moveKeyCodes.left:
            carDirection = 'left'
            break
        case moveKeyCodes.right:
            carDirection = 'right'
            break
        case moveKeyCodes.up:
            carDirection = 'up'
            break
        case moveKeyCodes.down:
            carDirection = 'down'
            break
        default:
            // carDirection = undefined
            break;
    }
    renderCarHeadChange()
    renderCarMove(carDirection)
}

/* 使用css样式修改车头移动 */
function renderCarHeadChange() {
    // 每次清空后只添加一个class样式
    carDom.classList.remove('car-left', 'car-right', 'car-up', 'car-down',)
    switch (carDirection) {
        case 'up':
            carDom.classList.add('car-up');
            break;
        case 'right':
            carDom.classList.add('car-right');
            break;
        case 'down':
            carDom.classList.add('car-down');
            break;
        case 'left':
            carDom.classList.add('car-left');
            break;
        default:
            break;
    }
}

/* 渲染车移动，修改对应的移动计算属性
*   左增加left，右减少left
*   下增加top，上减少top
* */
function renderCarMove(direction) {
    const computedStyle = window.getComputedStyle(carDom)
    let newLeft = 0, newTop = 0
    let valPx, valNumber
    if (direction === 'left' || direction === 'right') {
        valPx = computedStyle.left
        // console.log('左右情况')
        // console.log(valPx)
        // 读取具体属性px前面的数值
        valNumber = parseInt(valPx.slice(0, valPx.length - 2))
        if (direction === 'left') {
            newLeft = valNumber - parseInt(speed)
        } else {
            newLeft = valNumber + parseInt(speed)
        }
        // 修改移动属性
        carDom.style.left = `${newLeft}px`
    }
    // 上下移动
    else {
        valPx = computedStyle.top
        // console.log('上下情况')
        // console.log(valPx)
        valNumber = parseInt(valPx.slice(0, valPx.length - 2))
        if (direction === 'up') {
            newTop = valNumber - parseInt(speed)
        } else {
            newTop = valNumber + parseInt(speed)
        }
        carDom.style.top = `${newTop}px`
    }
}

function renderCarChange() {
    carDom.src = carTypeImgPath[carType]
}

/* 检查车辆越界和提醒 */
function checkInRange(keyCode) {
    return true
}

function alertOutOfRange() {
    alert('您的小车越界了，请返回！')
}

/* 存储游戏数据 */
function saveGame() {
    const curSpeed = speedSelectDom.value;
    const curCarType = carTypeSelectDom.value;
    const carPositionLeft = carDom.style.left;
    const carPositionTop = carDom.style.top;

    const objToSave = {
        speed: curSpeed,
        carType: curCarType,
        position: {
            left: carPositionLeft,
            top: carPositionTop
        },
        headDirection: carDirection,
    }

    localStorage.setItem(gameStorageKey, JSON.stringify(objToSave));
}

init()