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

    img.style.opacity = "0";
    await animateMenuToTimer(() => {
      const id = eggButton.getAttribute("data-id");
      startTimer(id);
    });
    // reset
    img.style.opacity = "1";
  });

  eggButton.addEventListener("pointerenter", () => {
    playSound("hover");
  });
}

async function wait(timeMs) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeMs);
  });
}

function applyStyles(el, styles) {
  for (const key in styles) {
    el.style[key] = styles[key];
  }
}

async function animateMenuToTimer(setupFunc) {
  // generate steps
  const preStyles = {
    background: {
      opacity: 1,
    },
    egg: {
      opacity: 1,
    },
  };

  const transitionStyles = {
    background: {
      transition: "all 400ms",
      pointerEvents: "auto",
      opacity: 1,
    },
    egg: {
      transition: "all 400ms",
      pointerEvents: "auto",
      opacity: 1,
    },
  };

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

  const resetStyles = {
    background: {
      transition: "none",
      transform: "none",
      opacity: 0,
      pointerEvents: "none",
    },
    egg: {
      transition: "none",
      transform: "none",
      opacity: 0,
      pointerEvents: "none",
    },
  };

  // start timing
  applyStyles(animatedEgg, preStyles.egg);

  await wait(10);

  applyStyles(animatedBackground, transitionStyles.background);
  applyStyles(animatedEgg, transitionStyles.egg);

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

  await wait(400);

  applyStyles(animatedBackground, resetStyles.background);
  applyStyles(animatedEgg, resetStyles.egg);
}

async function animateTimerToMenu(setupFunc) {
  const duration = 800;
  const delay = 400;

  // generate steps
  const preStyles = {
    background: {
      left: 0,
      top: 0,
      opacity: 1,
      transform: "translate(0, -100vh)",
      width: "100%",
      height: "100%",
    },
    egg: {
      top: "50%",
      left: "50%",
      width: "140px",
      height: "140px",
      transform: "translate(-50%, calc(-100vh - 50%)) rotateY(180deg)",
    },
  };

  const transitionStyles = {
    background: {
      transition: `all ${duration}ms`,
      pointerEvents: "auto",
      opacity: 1,
    },
    egg: {
      transition: `all ${duration}ms`,
      pointerEvents: "auto",
      opacity: 1,
    },
  };

  const step1Styles = {
    background: {
      transform: "translate(0, 0)",
    },
    egg: {
      transform: "translate(-50%, -50%) rotateY(0deg)",
    },
  };

  // step 2.
  // - background fill screen
  // - egg center
  // - egg flip
  const step2Styles = {
    background: {},
    egg: {
      transform: "translate(-50%, -50%) rotateY(180deg) scale(1.6)",
    },
  };

  // step 1.
  // - background go down
  // - egg go down
  const step3Styles = {
    background: {
      transform: "translate(0, 100vh)",
    },
    egg: {
      transform: "translate(-50%, calc(100vh - 50%)) rotateY(0deg) scale(0)",
    },
  };

  const resetStyles = {
    background: {
      transition: "none",
      transform: "none",
      opacity: 0,
      pointerEvents: "none",
    },
    egg: {
      transition: "none",
      transform: "none",
      opacity: 0,
      pointerEvents: "none",
    },
  };

  // start timing
  applyStyles(animatedBackground, preStyles.background);
  applyStyles(animatedEgg, preStyles.egg);

  await wait(10);

  applyStyles(animatedBackground, transitionStyles.background);
  applyStyles(animatedEgg, transitionStyles.egg);

  await wait(10);

  applyStyles(animatedBackground, step1Styles.background);
  applyStyles(animatedEgg, step1Styles.egg);

  // return;

  await wait(duration);
  await wait(delay);

  applyStyles(animatedBackground, step2Styles.background);
  applyStyles(animatedEgg, step2Styles.egg);

  await wait(duration);

  switchPage(1);
  setupFunc();

  await wait(delay);

  // animatedBackground.style.animationDuration("")
  applyStyles(animatedBackground, step3Styles.background);
  applyStyles(animatedEgg, step3Styles.egg);

  await wait(duration);

  applyStyles(animatedBackground, resetStyles.background);
  applyStyles(animatedEgg, resetStyles.egg);
}

/** timer stuff */
const specs = {
  "soft-boiled": {
    time: 20,
    img: "images/boiling.gif",
    finish: "images/boiled_eggs.png",
    cookingSound: "boiling",
  },
  "medium-boiled": {
    time: 5,
    img: "images/boiling.gif",
    finish: "images/boiled_eggs.png",
    cookingSound: "boiling",
  },
  "hard-boiled": {
    time: 5,
    img: "images/boiling.gif",
    finish: "images/boiled_eggs.png",
    cookingSound: "boiling",
  },
  "sunny-side-up": {
    time: 5,
    img: "images/pan_frying.gif",
    finish: "images/plated_egg.png",
    cookingSound: "sizzling",
  },
  "over-easy": {
    time: 5,
    img: "images/pan_frying.gif",
    finish: "images/plated_egg.png",
    cookingSound: "sizzling",
  },
  "over-medium": {
    time: 5,
    img: "images/pan_frying.gif",
    finish: "images/plated_egg.png",
    cookingSound: "sizzling",
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

let controller;
async function startTimer(id) {
  let timer;
  let looper;
  controller = new AbortController();
  const signal = controller.signal;
  signal.addEventListener("abort", () => {
    if (timer) {
      clearInterval(timer);
    }

    if (looper) {
      looper.stop();
    }
  });

  const { time, img, finish, cookingSound } = specs[id];
  let remainingTime = time;

  timerMessage.style.display = "block";
  cookingEggImg.src = img;

  timeMessage.textContent = formatTime(remainingTime);
  timerHeader.textContent = `You're egg is cooking!`;
  timerMessage.textContent = "Hang tight and listen to the alarm";

  const finishPromise = new Promise((resolve) => {
    timer = setInterval(() => {
      remainingTime--;
      if (remainingTime === 0) {
        clearInterval(timer);
        resolve();
      }

      console.log("remaining time", remainingTime);
      timeMessage.textContent = formatTime(remainingTime);
    }, 1000);
  });
  looper = new SoundLooper(cookingSound);
  looper.start();

  await finishPromise;

  looper.stop();
  doConfetti();
  playSound("ding");

  cookingEggImg.src = finish;
  timerHeader.textContent = `You're egg is ready!`;
  timeMessage.textContent = "Enjoy :P";
  timerMessage.style.display = "none";
}

const backButton = document.getElementById("back-button");
const backButtonImg = backButton.querySelector("img");
backButton.addEventListener("click", async () => {
  if (controller) {
    controller.abort();
  }

  animateTimerToMenu(() => {
    switchPage(0);
  });
});
