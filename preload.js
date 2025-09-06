// preload.js

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  runEarl: (code) => ipcRenderer.invoke("run-earl", code),
});
