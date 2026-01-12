let focusTime = 25 * 60;
let breakTime = 5 * 60;

let time = focusTime;
let timerInterval = null;
let isRunning = false;
let isBreak = false;

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const modeLabel = document.getElementById("mode-label");
const darkToggle = document.getElementById("toggle-dark");

const fgCircle = document.getElementById("fg-circle");
const circleLength = 565;

// Format seconds into MM:SS
function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

// Update timer display
function updateDisplay() {
    timerDisplay.textContent = formatTime(time);
}

// Update progress circle
function updateProgress() {
    const total = isBreak ? breakTime : focusTime;
    const percent = 1 - (time / total);
    fgCircle.style.strokeDashoffset = circleLength * percent;
}

// Start timer
startBtn.addEventListener("click", () => {
    if (isRunning) return;

    isRunning = true;

    timerInterval = setInterval(() => {
        if (time > 0) {
            time--;
            updateDisplay();
            updateProgress();
        } else {
            clearInterval(timerInterval);
            isRunning = false;

            // Switch modes
            isBreak = !isBreak;
            time = isBreak ? breakTime : focusTime;

            modeLabel.textContent = isBreak ? "Break Time" : "Focus Mode";

            updateDisplay();
            updateProgress();
        }
    }, 1000);
});

// Pause timer
pauseBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    isRunning = false;
});

// Reset timer
resetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    isRunning = false;
    isBreak = false;
    time = focusTime;

    modeLabel.textContent = "Focus Mode";

    updateDisplay();
    updateProgress();
});

// Dark mode toggle
darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

// Initial display
updateDisplay();
updateProgress();
