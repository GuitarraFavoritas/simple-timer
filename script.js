// Variables
let initialTime = 3 * 60; // 25 minutes in seconds
let seconds = initialTime;
let isRunning = false;
let isPaused = false;
let timerInterval;

// Get the timer display element
const timerDisplay = document.getElementById('timer-display');

// Get the start and stop buttons
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('reset-button');
const resetButton = document.getElementById('reset-button');

// Update the timer display
function updateTimerDisplay() {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timerDisplay.value = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Start the timer
function startTimer() {
    isRunning = true;
    isPaused = false;
    timerInterval = setInterval(() => {
        seconds--;
        updateTimerDisplay();
        if (seconds === 0) {
            stopTimer();
            bellSound.play().catch((error) => console.error('Error playing bell sound:', error));
            startButton.innerText = 'Iniciar';
            updateTimerDisplay();
            toastr.success('Finished!');
        }
    }, 1000);
}

// Pause the timer
function pauseTimer() {
    isRunning = false;
    isPaused = true;
    clearInterval(timerInterval);
    startButton.innerText = 'Continuar';
}

// Resume the timer
function resumeTimer() {
    isRunning = true;
    isPaused = false;
    timerInterval = setInterval(() => {
        seconds--;
        updateTimerDisplay();
        if (seconds === 0) {
            stopTimer();
            bellSound.play().catch((error) => console.error('Error playing bell sound:', error));
            startButton.innerText = 'Iniciar';
            updateTimerDisplay();
            toastr.success('Finished!');
        }
    }, 1000);
    startButton.innerText = 'Pausar';
}

// Stop the timer
function stopTimer() {
    isRunning = false;
    clearInterval(timerInterval);
}

// Reset the timer
function resetTimer() {
    stopTimer();
    seconds = initialTime;
    updateTimerDisplay();
    startButton.innerText = 'Iniciar';
}

// Event listeners for buttons
startButton.addEventListener('click', () => {
    if (!isRunning) {
        if (timerDisplay.value !== '') {
            const timerValue = timerDisplay.value.split(':');
            seconds = parseInt(timerValue[0]) * 60 + parseInt(timerValue[1]);
        }
        startTimer();
        startButton.innerText = 'Pausar';
    } else if (isRunning && !isPaused) {
        pauseTimer();
    } else if (isRunning && isPaused) {
        resumeTimer();
    }
});

stopButton.addEventListener('click', () => {
    stopTimer();
    startButton.innerText = 'Iniciar';
});

resetButton.addEventListener('click', () => {
    resetTimer();
});

// Initialize the timer display
updateTimerDisplay();
