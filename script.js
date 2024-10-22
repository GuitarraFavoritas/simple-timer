let seconds = 5; // initial timer value
let timerInterval = null;
let isRunning = false;
let isPaused = false;

// Get the timer display element
const timerDisplay = document.getElementById('timer-display');

// Get the start button element
const startButton = document.getElementById('start-button');

// Get the stop button element
const stopButton = document.getElementById('stop-button');

// Get the bell sound element
const bellSound = document.getElementById('bell-sound');

// Function to update the timer display
function updateTimerDisplay() {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  timerDisplay.value = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Function to start the timer
function startTimer() {
  isRunning = true;
  isPaused = false;
  timerInterval = setInterval(() => {
    console.log('Timer interval fired');
    seconds--;
    updateTimerDisplay();
    if (seconds === 0) {
      stopTimer();
      bellSound.play().catch((error) => {
        console.error('Error playing bell sound:', error);
      });
      startButton.innerText = 'Iniciar'; // Reset the pause button to Start
      seconds = 5; // Reset the timer value
      updateTimerDisplay(); // Update the timer display with the new value
      toastr.success('Finished!'); // Show a toast notification with the message "Finished!"
    }
  }, 1000);
}

// Function to stop the timer
function stopTimer() {
  console.log('Timer stopped');
  clearInterval(timerInterval);
  isRunning = false;
  isPaused = false;
}

// Function to pause the timer
function pauseTimer() {
  isPaused = true;
  clearInterval(timerInterval);
}

// Function to resume the timer
function resumeTimer() {
  isPaused = false;
  timerInterval = setInterval(() => {
    console.log('Timer interval fired');
    seconds--;
    updateTimerDisplay();
    if (seconds === 0) {
      stopTimer();
      bellSound.play().catch((error) => {
        console.error('Error playing bell sound:', error);
      });
      startButton.innerText = 'Iniciar'; // Reset the pause button to Start
      seconds = 5; // Reset the timer value
      updateTimerDisplay(); // Update the timer display with the new value
      toastr.success('Finished!'); // Show a toast notification with the message "Finished!"
    }
  }, 1000);
}

// Add event listeners to the start and stop buttons
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
  seconds = 5; // reset the timer value
  updateTimerDisplay();
  startButton.innerText = 'Iniciar';
});