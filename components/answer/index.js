const { BrowserWindow } = require("electron");
const path = require("path");

let window;

function getOrCreateChildWindow(parent) {
  return new Promise((resolve, reject) => {
    if (window) {
      return resolve(window);
    }
    // Create the browser window.
    window = new BrowserWindow({
      width: 800,
      height: 600,
      parent,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
      },
    });
    // and load the index.html of the app.
    window.loadFile(path.join(__dirname, "index.html"));

    window.webContents.on("destroyed", () => {
      window = null;
    });

    window.webContents.on("did-finish-load", () => {
      resolve(window);
    });
  });
}

module.exports = {
  getOrCreateChildWindow,
};
