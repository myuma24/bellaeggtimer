const dismiss = document.getElementById("dismiss");
dismiss.addEventListener("click", () => {
  window.electronAPI.minimize();
});

const maximize = document.getElementById("maximize");
const maximizeImg = maximize.querySelector("img");
maximize.addEventListener("click", () => {
  window.electronAPI.maximize();
});

const close = document.getElementById("close");
close.addEventListener("click", () => {
  window.electronAPI.close();
});

window.electronAPI.onWindowStateChanged((_, state) => {
  updateButtonState(state === "maximized");
});

function updateButtonState(maximized) {
  if (maximized) {
    maximizeImg.src = "images/unmaximize.svg";
  } else {
    maximizeImg.src = "images/maximize.svg";
  }
}
