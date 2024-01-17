document.addEventListener('DOMContentLoaded', (event) => {
    const alarmSound = new Audio('https://33ruletimer.keyq.cloud/alarm.mp3');

    document.getElementById('startButton').addEventListener('click', () => {
        const selectedTime = document.getElementById('timeSelect').value;
        const workTime = selectedTime * 60 * 1000; // convert minutes to milliseconds
        const recoveryTime = workTime * 0.3; // 30% of work time

        updateLabel('Work Period');
        startTimer(workTime, recoveryTime);
    });

    function startTimer(workDuration, recoveryDuration) {
        let remainingTime = workDuration;
        const interval = setInterval(() => {
            if (remainingTime <= 0) {
                clearInterval(interval);
                playSoundForDuration(5);
                alert('Work period complete. Start recovery.');
                updateLabel('Recovery Period');
                startRecoveryTimer(recoveryDuration);
                return;
            }
            updateDisplay(remainingTime);
            remainingTime -= 1000;
        }, 1000);
    }

    function startRecoveryTimer(duration) {
        let remainingTime = duration;
        const interval = setInterval(() => {
            if (remainingTime <= 0) {
                clearInterval(interval);
                playSoundForDuration(5);
                alert('Recovery period complete. Ready for next session.');
                updateDisplay(0);
                updateLabel('');
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
    }

    function playSoundForDuration(durationInSeconds) {
        alarmSound.play();
        setTimeout(() => {
            alarmSound.pause();
            alarmSound.currentTime = 0;
        }, durationInSeconds * 1000);
    }
});
