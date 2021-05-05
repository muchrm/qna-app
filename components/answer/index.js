const { BrowserWindow } = require("electron");
const path = require("path");

function createChildWindow(parent) {
  // Create the browser window.
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    parent,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  // and load the index.html of the app.
  window.loadFile(path.join(__dirname, "index.html") );
  // window.webContents.on('did-finish-load', () => {
  //   const input = 100
  //   window.webContents.send('compute-factorial', input, windowID)
  // })

  return window;
}

module.exports = {
  createChildWindow,
};
