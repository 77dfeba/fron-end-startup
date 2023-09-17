const startRoundBtn = document.querySelector("#start-this-round-btn")
const gestureDialog = document.querySelector("#select-dialog")
const selectForm = document.querySelector("#select-form")
const gestureSelect = document.querySelector("#gesture-select")
const resultOfThisRound = document.querySelector(".result-of-this-round")

const GestureImg = {
    rock: "./images/rock.png", scissor: "./images/scissor.png", paper: "./images/paper.png",
}

const GesturesNames = ["rock", "scissor", "paper"]

const Name = {
    computer: "机器人", my: "你"
}

const myScore = {
    win: 0, lose: 0
}

const robotScore = {
    win: 0, lose: 0
}

/* 3局胜利后结束 */
const maxEndRoundNum = 3
let roundNum = 1


function initGame() {
    startRoundBtn.addEventListener("click", () => {
        gestureDialog.showModal()
    })
    selectForm.addEventListener("submit", (event) => {
        /* 防止submit重新跳转 */
        event.preventDefault()
        const myGesture = gestureSelect.value
        renderMyGesture(myGesture)
        const computerGesture = renderComputerGesture()
        console.log(computerGesture + " " + myGesture)
        gestureDialog.close()
        judgeRound(myGesture, computerGesture)
    })
}


function randomGesture() {
    return GesturesNames[Math.floor(Math.random() * 3)]
}

function renderMyGesture(gesture) {
    const gestureImg = GestureImg[gesture]
    const wrapper = document.querySelector(".my .gesture")
    wrapper.innerHTML = `<img class="my-img" src=${gestureImg}  alt="我的手势"/>`
}

function renderComputerGesture() {
    const gestureName = randomGesture()
    console.log("机器人" + gestureName)
    const gestureImg = GestureImg[gestureName]
    const wrapper = document.querySelector(".computer .gesture")
    wrapper.innerHTML = `<img class="computer-img" src=${gestureImg} alt=机器人手势""/>`
    return gestureName
}

function renderScore() {
    const computerScoreDom = document.querySelector(".computer .score")
    const myScoreDom = document.querySelector(".my .score")
    computerScoreDom.innerHTML = `胜：${robotScore.win} | 负：${robotScore.lose}`
    myScoreDom.innerHTML = `胜：${myScore.win} | 负：${myScore.lose}`
}

function renderRoundInfo(roundNum) {
    const roundDom = document.querySelector(".round")
    roundDom.innerHTML = `第${roundNum}回合`
}

// 对局判断
function judgeRound(my, computer) {
    let roundResult = ''
    if (my === computer) {
        roundResult = '平局'
    } else {
        let isMyWin = true
        if (computer === "rock") {
            isMyWin = my === "paper"
        } else if (computer === "scissor") {
            isMyWin = my === "rock"
        } else {
            isMyWin = my === "scissor"
        }

        if (isMyWin) {
            roundResult = "本回合你赢"
            myScore.win++
            robotScore.lose++
        } else {
            roundResult = "本回合机器人赢"
            myScore.lose++
            robotScore.win++
        }
    }

    /* 渲染结果 */
    resultOfThisRound.innerHTML = roundResult
    renderScore()
    renderRoundInfo(roundNum)

    /* 处理游戏结果 */
    roundNum++
    if (robotScore.win >= maxEndRoundNum || myScore.win >= maxEndRoundNum) {
        if (robotScore.win > myScore.win) {
            endGame("computer")
        } else if (myScore.win > robotScore.win) {
            endGame("my")
        } else {
            endGame()
        }
    }
}


function endGame(winner) {
    gestureDialog.close()
    startRoundBtn.style.display = 'none'
    const resultOfTotalRound = document.querySelector(".result-of-total-round")

    if (!winner) {
        resultOfTotalRound.innerHTML = "平局啦"
    } else {
        resultOfTotalRound.innerHTML = `恭喜${Name[winner]}胜利`
    }
}

initGame()
// todo：完成结束后重开，