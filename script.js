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

// buttons.forEach(button => {
//     button.addEventListener("click", () => {
//         // first, we make sure timer is completely hidden and removed from "document flow"
//         timer.style.display = "none";

//         const time = parseInt(button.dataset.time);
//         timerMessage.textContent = `🍳 Cooking: ${button.textContent}`;
//         startTimer(time);

//         /* begin section transition animation */

//         // first, fade out to opacity: 0
//         const animationTime = 400;
//         main.style.transition = `opacity ${animationTime}ms, transform ${animationTime}ms`;

//         setTimeout(() => {
//             main.style.transform = "scale(0.9) translateY(-24px)";
//             main.style.opacity = "0";
//         }, 1000 / 30);

//         setTimeout(() => {
//             main.style.display = "none";

//             // follow up code to fade in egg timer
//             timer.style.opacity = "0";
//             timer.style.transform = "scale(0.7) translateY(-18px)";
//             timer.style.transition = `opacity ${animationTime}ms, transform ${animationTime}ms`;

//             timer.style.display = "block";
//             setTimeout(() => {
//                 timer.style.opacity = "1";
//                 timer.style.transform = "scale(1) translateY(0px)";
//             }, 1000 / 30);
//         }, animationTime);
//     });
// });

const eggButtons = document.querySelectorAll("button.egg-button");
const animatedBackground = document.getElementById("animated-background");
const animatedEgg = document.getElementById("animated-egg");

for (const eggButton of eggButtons) {
    const img = eggButton.querySelector("img");
    const imgSrc = img.src;

    eggButton.addEventListener("click", () => {
        const rect = eggButton.getBoundingClientRect();
        const imgRect = img.getBoundingClientRect();
        
        const eggButtonWidth = rect.width;
        const eggButtonHeight = rect.height;

        // alert(`eggButton ${rect.top} ${rect.left}`);

        animatedEgg.src = imgSrc;
        
        animatedBackground.style.top = rect.top + "px";
        animatedBackground.style.left = rect.left + "px";
        animatedBackground.style.width = eggButtonWidth + "px";
        animatedBackground.style.height = eggButtonHeight + "px";

        animatedEgg.style.top = imgRect.top + "px";
        animatedEgg.style.left = imgRect.left + "px";
        animatedEgg.style.width = imgRect.width + "px";
        animatedEgg.style.height = imgRect.height + "px";

        eggButton.style.opacity = "0";
        animateEgg();
    });
}

async function wait(timeMs) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, timeMs);
    });
}

async function applyStyles(el, styles) {
    for (const key in styles) {
        el.style[key] = styles[key];
    }
}

async function animateEgg() {
    // generate steps

    const step1Styles = {
        background: {
            transform: "rotateY(180deg)"
        },
        egg: {
            transform: "rotateY(180deg)",
        }
    }

    // step 2.
    // - background fill screen
    // - egg center
    // - egg flip
    const step2Styles = {
        background: {
            width: "100vw",
            height: "100vh",
            top: "0px",
            left: "0px",
            borderRadius: "0px",
        },
        egg: {
            transform: "rotateY(360deg) scale(1.2)"
        }
    }

    // step 1.
    // - background go down
    // - egg go down
    const step3Styles = {
        background: {
            transform: "translateY(100vh) rotateY(180deg)"
        },
        egg: {
            transform: "translateY(100vh) scale(1.2) rotateY(360deg)"
        }
    }

    // start timing
    await wait(10);
    applyStyles(animatedBackground, step1Styles.background);
    applyStyles(animatedEgg, step1Styles.egg);

    await wait(400);
    await wait(200);

    applyStyles(animatedBackground, step2Styles.background);
    applyStyles(animatedEgg, step2Styles.egg);

    await wait(400);

    await wait(200);

    // animatedBackground.style.animationDuration("")
    applyStyles(animatedBackground, step3Styles.background);
    applyStyles(animatedEgg, step3Styles.egg);
}