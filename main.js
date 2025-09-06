// main.js

const { app, BrowserWindow, ipcMain } = require("electron");
const jalur = require("path");
const { runEarl } = require("../earl-lang/pemroses.js");

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

ipcMain.handle("run-earl", async (event, code) => {
  let buffer = [];
  const originalLog = console.log;

  console.log = (...args) => buffer.push(args.join(" "));

  try {
    await runEarl(code);
  } catch (err) {
    buffer.push("Kesalahan: " + err.message);
  }

  console.log = originalLog;
  return buffer.join("\n");
});
