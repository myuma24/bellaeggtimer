const buttons = document.querySelectorAll("button");
const message = document.getElementById("message");
const timerMessage = document.getElementById("timer-message");
const display = document.getElementById("timerDisplay");
const main = document.getElementById("main");
const timer = document.getElementById("timer");

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
        // first, we make sure timer is completely hidden and removed from "document flow"
        timer.style.display = "none";

        const time = parseInt(button.dataset.time);
        timerMessage.textContent = `🍳 Cooking: ${button.textContent}`;
        startTimer(time);

        /* begin section transition animation */

        // first, fade out to opacity: 0
        const animationTime = 400;
        main.style.transition = `opacity ${animationTime}ms, transform ${animationTime}ms`;

        setTimeout(() => {
            main.style.transform = "scale(0.9) translateY(-24px)";
            main.style.opacity = "0";
        }, 1000 / 30);

        setTimeout(() => {
            main.style.display = "none";

            // follow up code to fade in egg timer
            timer.style.opacity = "0";
            timer.style.transform = "scale(0.7) translateY(-18px)";
            timer.style.transition = `opacity ${animationTime}ms, transform ${animationTime}ms`;

            timer.style.display = "block";
            setTimeout(() => {
                timer.style.opacity = "1";
                timer.style.transform = "scale(1) translateY(0px)";
            }, 1000 / 30);
        }, animationTime);
    });
});


