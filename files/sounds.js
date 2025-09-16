const sounds = {
  hover: {
    src: "sounds/hover.wav",
    volume: 0.2,
  },
  // click: new Audio("sounds/click.mp3"),
  // hover: new Audio("sounds/hover.mp3"),
  // tick: new Audio("sounds/tick.mp3"),
  sizzling: {
    src: "sounds/sizzling.mp3",
    volume: 0.4,
  },
  boiling: {
    src: "sounds/boiling.mp3",
    volume: 0.6,
  },
  ding: {
    src: "sounds/ding.mp3",
    volume: 1,
  },
  bellascream: {
    src: "sounds/bellascream.mp3",
    volume: 1,
  },
  bellaegg: {
    src: "sounds/bellaegg.mp3",
    volume: 1,
  },
  samscream: {
    src: "sounds/samscream.mp3",
    volume: 1,
  },
  samegg: {
    src: "sounds/samegg.mp3",
    volume: 1,
  },
};

function playSound(audioName) {
  const sound = sounds[audioName];

  if (!sound) return;

  const audio = new Audio(sound.src);
  audio.volume = sound.volume;
  audio.play();
}

class SoundLooper {
  constructor(audioName) {
    const sound = sounds[audioName];
    if (!sound) throw new Error("No such sound: " + audioName);
    this.sound = sound;
  }

  start() {
    this.audio = new Audio(this.sound.src);
    this.audio.volume = this.sound.volume;
    this.audio.loop = true;
    this.audio.play();
  }

  stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
  }
}
