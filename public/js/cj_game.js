// Timer Variables
const inputText = document.getElementById('string-input');
const timerStartBtn = document.getElementById('start-button');
const timerFinishBtn = document.getElementById('finish');

// Button Events
timerStartBtn.addEventListener('click', startTimer);
timerFinishBtn.addEventListener('click', inputScore);

// Pop Up Messages
const timerPopUp = document.getElementById('timer-popup');


// Timer Functions
let timerInterval = null; //prevent speed up when start button is clicked multiple times
let timerDurSaved = 25*60; // default duration in seconds, used for automating
let timerDurationSec = timerDurSaved; // default duration in seconds

function startTimer() {
    if (timerInterval) return; // Prevent multiple intervals from being set
    timerPopUp.textContent = ""; // make sure popup doesn't show
    timerInterval = setInterval(() => {
        timerDurationSec++;

        if (timerInterval) {
            timerPopUp.textContent = "Nice Job!"
            timerDurationSec = 0;
            stopTimer();
        }
        show();
    }, 1000);
}

function stopTimer() {
    if (timerInterval !== null) {
        clearInterval(timerInterval); // stop the timer
        timerInterval = null; // set back to null
    }
    show();
}

function resetTimer() {
    stopTimer();
    timerPopUp.textContent = ""; // make sure popup doesn't show
    timerDurationSec = 0; // reset to 0 minutes
    show();
}

function inputScore() {
    if (timerInterval !== null) return; // make sure timer isn't running
    const input = String(inputText.value);
    if (minutes < 1) return; // prevent invalid input
    timerDurSaved = minutes * 60; // save the duration for resetting
    timerDurationSec = timerDurSaved; // set the timer to the new duration
    show();
}

// Helper Functions
function show() {
    timerText.textContent = formatTime(timerDurationSec);
    cdText.textContent = formatTime(cdDurationSec);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}