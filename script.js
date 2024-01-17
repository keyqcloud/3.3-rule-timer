let isPaused = false;
let timerInterval;
let remainingTime;
let isInWorkSession = true; // Tracks if the current session is work or recovery


document.addEventListener('DOMContentLoaded', (event) => {
    const alarmSound = new Audio('https://33ruletimer.keyq.cloud/alarm.mp3');
    const startButton = document.getElementById('startButton');
    const pauseButton = document.getElementById('pauseButton');

    startButton.addEventListener('click', () => {
        const selectedTime = document.getElementById('timeSelect').value;
        const workTime = selectedTime * 60 * 1000; // convert minutes to milliseconds
        const recoveryTime = workTime * 0.3; // 30% of work time

        isPaused = false;
        isInWorkSession = true;
        remainingTime = workTime;

        startButton.textContent = 'Restart Timer';
        pauseButton.textContent = 'Pause Timer';

        updateLabel('Work Period');
        startTimer(workTime, recoveryTime);
    });

    pauseButton.addEventListener('click', () => {
        isPaused = !isPaused;
        pauseButton.textContent = isPaused ? 'Resume Timer' : 'Pause Timer';
        if (isPaused) {
            clearInterval(timerInterval);
        } else {
            // Resume the timer from where it was paused
            startTimer(remainingTime, isInWorkSession ? remainingTime * 0.3 : remainingTime);
        }
    });

    function startTimer(duration, recoveryDuration) {
        remainingTime = duration;
        timerInterval = setInterval(() => {
            if (isPaused) {
                clearInterval(timerInterval);
                return;
            }
            if (remainingTime <= 0) {
                playSoundForDuration(5);
                clearInterval(timerInterval);
                if (isInWorkSession) {
                    alert('Work period complete. Start recovery.');
                    isInWorkSession = false;
                    remainingTime = recoveryDuration;
                    startTimer(recoveryDuration, recoveryDuration);
                    updateLabel('Recovery Period');
                } else {
                    alert('Recovery period complete. Ready for next session.');
                    isInWorkSession = true; // Reset for next session
                }
                return;
            }
            updateDisplay(remainingTime);
            remainingTime -= 1000;
        }, 1000);
    }

    function updateDisplay(time) {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        document.getElementById('countdownDisplay').textContent = 
            `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function updateLabel(text) {
        const label = document.getElementById('timerLabel');
        if (label) {
            label.textContent = text;
        }
        if (text === 'Work Period') {
            startButton.textContent = 'Restart Timer';
        } else {
            startButton.textContent = 'Start Timer';
        }
    }

    function playSoundForDuration(durationInSeconds) {
        alarmSound.play();
        setTimeout(() => {
            alarmSound.pause();
            alarmSound.currentTime = 0;
        }, durationInSeconds * 1000);
    }
});
