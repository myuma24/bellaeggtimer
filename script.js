const buttons = document.querySelectorAll("button");
const message = document.getElementById("message");
const display = document.getElementById("timerDisplay");

let countdown; // global interval ID

function startTimer(seconds) {
    clearInterval(countdown); // clear existing timer
    const endTime = Date.now() + seconds * 1000;

    updateDisplay(seconds);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((endTime - Date.now()) / 1000);

        if (secondsLeft <= 0) {
            clearInterval(countdown);
            display.textContent = "⏰ Time's up! Enjoy your egg!";
            return;
        }

        updateDisplay(secondsLeft);
    }, 1000);
}

function updateDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    display.textContent = `⏳ ${minutes}:${remainderSeconds.toString().padStart(2, "0")}`;
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const time = parseInt(button.dataset.time);
        message.textContent = `🍳 Cooking: ${button.textContent}`;
        startTimer(time);
    });
});
