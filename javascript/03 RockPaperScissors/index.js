const startRoundBtn = document.querySelector("#start-this-round-btn")
const gestureDialog = document.querySelector("#select-dialog")
const selectForm = document.querySelector("#select-form")
const submitSelectBtn = document.querySelector("#submit-select")
const gestureSelect = document.querySelector("#gesture-select")
const resultOfThisRound = document.querySelector(".result-of-this-round")

const GestureImg = {
    rock: "./images/rock.png", scissor: "./images/scissor.png", paper: "./images/paper.png",
}

const GesturesNames = ["rock", "scissor", "paper"];

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
        gestureDialog.showModal();
    })
    selectForm.addEventListener("submit", () => {
        const myGesture = gestureSelect.value
        const computerGesture = randomGesture()
        renderMyGesture()
        renderComputerGesture()
        gestureDialog.close()
        judgeRound(myGesture, computerGesture)
    })
}


function randomGesture() {
    return GesturesNames[Math.random() * 3]
}

function renderMyGesture(gesture) {
    const gestureImg = GestureImg[gesture]
    const wrapper = document.querySelector(".my .gesture")
    wrapper.innerHTML = `<img class="my-img" src=${gestureImg}  alt="我的手势"/>`
}

function renderComputerGesture() {
    const gestureName = randomGesture()
    const gestureImg = GestureImg[gestureName]
    const wrapper = document.querySelector(".computer .gesture")
    wrapper.innerHTML = `<img class="computer-img" src=${gestureImg} alt=机器人手势""/>`
    return gestureName
}

function renderScore() {
    const computerScore = document.querySelector(".computer .score");
    const myScore = document.querySelector(".my .score");
    computerScore.innerHTML = `胜：${computerScore.win} | 负：${computerScore.lose}`;
    myScore.innerHTML = `胜：${myScore.win} | 负：${myScore.lose}`;
}

function renderRoundInfo(roundNum) {
    const roundDom = document.querySelector(".round");
    roundDom.innerHTML = `第${roundNum}回合`;
}

function judgeRound(my, computer) {
    let roundResult = ''
    if (my === computer) {
        roundResult = '平局'
    } else {
        let isMyWin = true
        if (computer === "rock") {
            isMyWin = my !== "scissor";
        } else if (computer === "scissor") {
            isMyWin = my === "rock";
        } else {
            isMyWin = my !== "rock";
        }

        if (isMyWin) {
            roundResult = "本回合你赢";
            myScore.win++;
            robotScore.lose++;
        } else {
            roundResult = "本回合机器人赢";
            myScore.lose++;
            robotScore.win++;
        }
    }

    /* 渲染结果 */
    resultOfThisRound.innerHTML = roundResult
    renderScore()
    renderRoundInfo()

    /* 处理游戏结果 */
    roundNum++;
    if (robotScore.win >= maxEndRoundNum || myScore.win >= maxEndRoundNum) {
        if (robotScore.win > myScore.win) {
            endGame("computer");
        } else if (myScore.win > robotScore.win) {
            endGame("my");
        } else {
            endGame()
        }
    }
}


function endGame(winner) {
    gestureDialog.close()
    startRoundBtn.style.display = 'none'
    const resultOfTotalRound = document.querySelector(".result-of-total-round");

    if (!winner) {
        resultOfTotalRound.innerHTML = "不错嘛，平局了";
    } else {
        resultOfTotalRound.innerHTML = `(≧v≦)o~~好棒，恭喜${Name[winner]}获得胜利！`;
    }
}

initGame()