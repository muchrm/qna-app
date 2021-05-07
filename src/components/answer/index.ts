import { BrowserWindow } from 'electron';
import { join } from 'path';

let window: BrowserWindow | null;

export function getOrCreateChildWindow(parent: BrowserWindow): Promise<BrowserWindow> {
  return new Promise((resolve) => {
    if (window) {
      return resolve(window);
    }
    // Create the browser window.
    window = new BrowserWindow({
      width: 800,
      height: 600,
      parent,
      webPreferences: {
        preload: join(__dirname, 'preload.js'),
      },
    });
    // and load the index.html of the app.
    window.loadFile(join(__dirname, 'answer.html'));

    window.webContents.on('destroyed', () => {
      window = null;
    });

    window.webContents.on('did-finish-load', () => {
      resolve(window as BrowserWindow);
    });
  });
}
