let startTime = 0;
let updatedTime = 0;
let difference = 0;
let tInterval;
let running = false;
let lapCount = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function startStop() {
    if (!running) {
        startTime = Date.now() - difference;
        tInterval = setInterval(updateTime, 10);
        startStopBtn.innerHTML = 'Stop';
        running = true;
        lapBtn.disabled = false;
    } else {
        clearInterval(tInterval);
        startStopBtn.innerHTML = 'Start';
        running = false;
        lapBtn.disabled = true;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    startStopBtn.innerHTML = 'Start';
    difference = 0;
    display.innerHTML = '00:00:00.00';
    laps.innerHTML = '';
    lapCount = 0;
    lapBtn.disabled = true;
}

function lap() {
    if (running) {
        lapCount++;
        const lapTime = display.innerHTML;
        const lapElement = document.createElement('li');
        lapElement.textContent = `Lap ${lapCount}: ${lapTime}`;
        laps.appendChild(lapElement);
    }
}

function updateTime() {
    updatedTime = Date.now() - startTime;
    difference = updatedTime;

    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    const formattedTime = 
        (minutes < 10 ? '0' + minutes : minutes) + ':' +
        (seconds < 10 ? '0' + seconds : seconds) + '.' +
        (milliseconds < 10 ? '0' + milliseconds : milliseconds);
    
    display.innerHTML = formattedTime;
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
lapBtn.disabled = true; // Disable lap button initially
