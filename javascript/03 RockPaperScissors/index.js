const startRoundBtn = document.querySelector("#start-this-round-btn")
const gestureDialog = document.querySelector("#select-dialog")
const selectForm = document.querySelector("#select-form")
const submitSelectBtn = document.querySelector("#submit-select")
const gestureSelect = document.querySelector("#gesture-select")
const resultOfThisRound = document.querySelector(".result-of-this-round")

const GestureImg = {
    rock: "./images/rock.png",
    scissor: "./images/scissor.png",
    paper: "./images/paper.png",
}

const GesturesNames = ["rock", "scissor", "paper"];

const Name = {
    computer: "机器人",
    my: "你"
}

const myScore = {
    win: 0,
    lose: 0
}

const computeScore = {
    win: 0,
    lose: 0
}
/* 3局胜利后结束 */
const maxEndRoundNum = 3
let round = 1


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

function gesture() {

}

function randomGesture() {
    return GesturesNames[Math.random() * 3]
}

function renderMyGesture() {

}

function renderComputerGesture() {
    const computerGesture = randomGesture()
}

function judgeRound(my, computer) {

}

function endGame(winner) {

}

initGame()