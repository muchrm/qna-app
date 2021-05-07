import { BrowserWindow } from 'electron';
import { join } from 'path';

export function createMainWindow(): BrowserWindow {
  // Create the browser window.
  const window = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      // preload: join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  window.loadFile(join(__dirname, 'question.html'));

  return window;
}
