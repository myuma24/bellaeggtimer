"use strict";

const { app, BrowserWindow } = require("electron");

const electronReload = require("electron-reload");
electronReload(__dirname);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 900,
    height: 820,
  });

  win.loadFile("files/index.html");
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
