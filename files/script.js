const buttons = document.querySelectorAll("button");
const message = document.getElementById("message");
const display = document.getElementById("timerDisplay");
const main = document.getElementById("main");
const timer = document.getElementById("timer");

const homePage = document.getElementById("home-page");
const timerPage = document.getElementById("timer-page");
function switchPage(pageIndex) {
  if (pageIndex === 0) {
    homePage.setAttribute("data-visible", "true");
    timerPage.setAttribute("data-visible", "false");
  } else {
    homePage.setAttribute("data-visible", "false");
    timerPage.setAttribute("data-visible", "true");
  }
}

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
  display.textContent = `⏳ ${minutes}:${remainderSeconds
    .toString()
    .padStart(2, "0")}`;
}

const eggButtons = document.querySelectorAll("button.egg-button");
const animatedBackground = document.getElementById("animated-background");
const animatedEgg = document.getElementById("animated-egg");

for (const eggButton of eggButtons) {
  const img = eggButton.querySelector("img");
  const imgSrc = img.src;

  eggButton.addEventListener("click", async () => {
    const rect = eggButton.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();

    const eggButtonWidth = rect.width;
    const eggButtonHeight = rect.height;

    // alert(`eggButton ${rect.top} ${rect.left}`);

    animatedEgg.src = imgSrc;

    animatedBackground.style.top = rect.top + eggButtonHeight / 2 + "px";
    animatedBackground.style.left = rect.left + eggButtonWidth / 2 + "px";
    animatedBackground.style.width = 0 + "px";
    animatedBackground.style.height = 0 + "px";

    animatedEgg.style.top = imgRect.top + "px";
    animatedEgg.style.left = imgRect.left + "px";
    animatedEgg.style.width = imgRect.width + "px";
    animatedEgg.style.height = imgRect.height + "px";

    eggButton.style.opacity = "0";
    await animateEgg(() => {
      const id = eggButton.getAttribute("data-id");
      startTimer(id);
    });
    // reset
    eggButton.style.opacity = "1";
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

async function animateEgg(setupFunc) {
  // generate steps

  const step1Styles = {
    background: {
      transform: "rotateY(180deg)",
    },
    egg: {
      transform: "rotateY(180deg)",
    },
  };

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
      transform: "rotateY(360deg) scale(1.2)",
    },
  };

  // step 1.
  // - background go down
  // - egg go down
  const step3Styles = {
    background: {
      transform: "translateY(100vh) rotateY(180deg)",
    },
    egg: {
      transform: "translateY(100vh) scale(1.2) rotateY(360deg)",
    },
  };

  // start timing
  await wait(10);
  applyStyles(animatedBackground, step1Styles.background);
  applyStyles(animatedEgg, step1Styles.egg);

  await wait(400);
  await wait(200);

  applyStyles(animatedBackground, step2Styles.background);
  applyStyles(animatedEgg, step2Styles.egg);

  await wait(400);

  switchPage(1);
  setupFunc();

  await wait(200);

  // animatedBackground.style.animationDuration("")
  applyStyles(animatedBackground, step3Styles.background);
  applyStyles(animatedEgg, step3Styles.egg);
}

/** timer stuff */
const specs = {
  "soft-boiled": {
    time: 5,
    img: "images/boiling.gif",
    finish: "images/boiled_eggs.png",
  },
  "medium-boiled": {
    time: 5,
    img: "images/boiling.gif",
    finish: "images/boiled_eggs.png",
  },
  "hard-boiled": {
    time: 5,
    img: "images/boiling.gif",
    finish: "images/boiled_eggs.png",
  },
  "sunny-side-up": {
    time: 5,
    img: "images/pan_frying.gif",
    finish: "images/plated_egg.png",
  },
  "over-easy": {
    time: 5,
    img: "images/pan_frying.gif",
    finish: "images/plated_egg.png",
  },
  "over-medium": {
    time: 5,
    img: "images/pan_frying.gif",
    finish: "images/plated_egg.png",
  },
};

const timerHeader = document.getElementById("timer-header");
const timerMessage = document.getElementById("timer-message");
const cookingEggImg = document.getElementById("cooking-egg");
const timeMessage = document.getElementById("time-message");

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  return `${minutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`;
}

async function startTimer(id) {
  const { time, img, finish } = specs[id];
  let remainingTime = time;

  timerMessage.style.display = "block";
  cookingEggImg.src = img;

  timeMessage.textContent = formatTime(remainingTime);
  timerHeader.textContent = `You're egg is cooking!`;
  timerMessage.textContent = "Hang tight and listen to the alarm";

  let timer;
  const finishPromise = new Promise((resolve) => {
    timer = setInterval(() => {
      if (remainingTime === 0) {
        clearInterval(timer);
        resolve();
      }

      console.log("remaining time", remainingTime);
      timeMessage.textContent = formatTime(remainingTime);
      remainingTime--;
    }, 1000);
  });

  await finishPromise;

  cookingEggImg.src = finish;
  timeMessage.textContent = "Enjoy :P";
  timerMessage.style.display = "none";
}
