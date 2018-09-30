const notifier = require("node-notifier");
const path = require("path");
const logUpdate = require("log-update");

const totalTime = 25 * 60 * 1000;

init();

function init() {
    let startTime = Date.now();
    const frames = ['--', '/', '|', '\\'];
    let frameIndex = 0;

    let timer = setInterval(tick, 200);
    tick();

    function tick() {
        const frame = frames[frameIndex];
        frameIndex++;
        frameIndex %= frames.length;

        const remained = getRemainedTime();
        logUpdate(`A pomodoro 🍅 is running... ${frame} \nTime to rest ${formatTime(remained)}`);

        if (remained <= 0) {
            logUpdate("Time is up!");
            clearInterval(timer);
            showAlert();
        }
    }

    function getRemainedTime() {
        return totalTime - (Date.now() - startTime);
    }   
}

function formatTime(ms) {
    const s = Math.floor(ms / 1000) % 60;
    const m = Math.floor(ms / 1000 / 60);
    return [m, s].map(item => item<10?('0'+item):(item+'')).join(':');
}

function showAlert() {
    notifier.notify({
        title: "Time is up",
        message: "Stand up and have a good rest for 5 minutes.",
        icon: path.join(__dirname, "assets/tomato.jpg")
    });
}