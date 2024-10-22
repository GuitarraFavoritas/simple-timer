// Get the URL parameters
const urlParams = new URLSearchParams(window.location.search);

// Get the initial time from the 'time' query parameter (in seconds)
const initialTime = urlParams.get('time') ? parseInt(urlParams.get('time')) : 5;

let seconds = initialTime; // Use the value from the query or default to 5 seconds
let timerInterval = null;
let isRunning = false;
let isPaused = false;

// Get the DOM elements
const timerDisplay = document.getElementById('timer-display');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const bellSound = document.getElementById('bell-sound');

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
            seconds = initialTime; // Reset to the initial time
            updateTimerDisplay();
            toastr.success('Finished!');
        }
    }, 1000);
}

// Stop the timer
function stopTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    isPaused = false;
}

// Pause the timer
function pauseTimer() {
    isPaused = true;
    clearInterval(timerInterval);
}

// Resume the timer
function resumeTimer() {
    isPaused = false;
    startTimer();
}

// Event listeners for buttons
startButton.addEventListener('click', () => {
    if (!isRunning) {
        startTimer();
        startButton.innerText = 'Pausar';
    } else if (isRunning && !isPaused) {
        pauseTimer();
        startButton.innerText = 'Continuar';
    } else if (isRunning && isPaused) {
        resumeTimer();
        startButton.innerText = 'Pausar';
    }
});

stopButton.addEventListener('click', () => {
    stopTimer();
    seconds = initialTime; // Reset the timer to initial time
    updateTimerDisplay();
    startButton.innerText = 'Iniciar';
});

// Initialize the display with the correct time
updateTimerDisplay();
