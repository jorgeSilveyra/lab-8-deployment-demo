// Timer Variables
const inputText = document.getElementById('string-input');
const timerStartBtn = document.getElementById('start-button');
const timerFinishBtn = document.getElementById('finish');
const resetBtn = document.getElementById('reset');
const timerText = document.getElementById('timer-text');
const timerPopUp = document.getElementById('timer-popup');
const targetTextDisplay = document.getElementById('target-text');


// Button Events
timerStartBtn.addEventListener('click', startTimer);
timerFinishBtn.addEventListener('click', finishGame);
resetBtn.addEventListener('click', resetGame);


// Vars
let timerInterval = null;
let time = 0;
let targetText = "abcdefghijklmnopqrstuvwxyz!?$%";
targetTextDisplay.textContent = targetText;
inputText.disabled = true;

function startTimer() {
    if (timerInterval) return; // Prevent multiple intervals from being set
    time = 0;
    show();
    timerPopUp.textContent = ""; // make sure popup doesn't show

    // Enable typing
    inputText.disabled = false;
    inputText.value = "";
    inputText.focus();

    // Disable start button
    timerStartBtn.disabled = true;

    timerInterval = setInterval(() => {
        time++;
        show();
    }, 1000);
}

function stopTimer() {
    if (timerInterval !== null) {
        clearInterval(timerInterval); // stop the timer
        timerInterval = null; // set back to null
    }
    inputText.disabled = true;
    timerStartBtn.disabled = false;
    show();
}

function finishGame(){
    if (!timerInterval) return; // prevent clicking when not running
    const userString = inputText.value;

    if (userString === targetText) {
        stopTimer();
        const finalTime = formatTime(time);
        const score = calculateScore(time);

        fetch("/submit_score", {
            method: "POST",
            body: JSON.stringify({
                score: score,
                game_id: 5
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        timerPopUp.textContent = "Finished in " + finalTime + " | Score: " + score;

    } else {
        timerPopUp.textContent = "Not Correct Yet, Keep Trying!";
    }
}

function resetGame() {
    stopTimer();
    time = 0; 
    show();

    inputText.value = "";
    inputText.disabled = true;

    timerPopUp.textContent = "";
    timerStartBtn.disabled = false; // turn on start button again
}

// Helper Functions
function show() {
    timerText.textContent = formatTime(time);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function calculateScore(time){
    let score = 1000 - time*10;
    if (score < 0) {
        score = 0;
    }

    return score;
}