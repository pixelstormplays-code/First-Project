let time = 25 * 60; // 25 minutes in seconds
let timerInterval = null;
let isRunning = false;

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");

// Format seconds into MM:SS
function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

// Update the timer display
function updateDisplay() {
    timerDisplay.textContent = formatTime(time);
}

// Start the timer
startBtn.addEventListener("click", () => {
    if (isRunning) return;

    isRunning = true;
    timerInterval = setInterval(() => {
        if (time > 0) {
            time--;
            updateDisplay();
        } else {
            clearInterval(timerInterval);
            isRunning = false;
        }
    }, 1000);
});

// Pause the timer
pauseBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    isRunning = false;
});

// Reset the timer
resetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    time = 25 * 60;
    isRunning = false;
    updateDisplay();
});

// Initial display
updateDisplay();
