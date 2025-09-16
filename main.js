"use strict";

const { app, BrowserWindow, ipcMain } = require("electron");

// console.log(process.env.ELECTRON_IS_DEV);
// const electronReload = require("electron-reload");
// electronReload(__dirname);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 900,
    height: 720,
    minWidth: 750,
    minHeight: 700,
    frame: false,
    transparent: true,
    webPreferences: {
      preload: __dirname + "/files/preload.js",
    },
  });

  win.loadFile("files/index.html");

  ipcMain.on("minimize-window", () => {
    if (win) {
      win.minimize();
    }
  });

  ipcMain.on("maximize-window", () => {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  });

  ipcMain.on("close-window", () => {
    if (win) {
      win.close();
    }
  });

  // Listen for the 'maximize' event
  win.on("maximize", () => {
    // Send a message to the renderer with the new state
    win.webContents.send("window-state-changed", "maximized");
  });

  // Listen for the 'unmaximize' event
  win.on("unmaximize", () => {
    // Send a message to the renderer with the new state
    win.webContents.send("window-state-changed", "unmaximized");
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
