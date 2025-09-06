// main.js

const { app, BrowserWindow, ipcMain } = require("electron");
const jalur = require("path");

function membuatJendela() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: jalur.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("src/index.html");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
