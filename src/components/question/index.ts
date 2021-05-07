import { App, BrowserWindow } from 'electron';
import { join } from 'path';
export function createMainWindow(app:App): BrowserWindow {
  // Create the browser window.
  const window = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: join(app.getAppPath(),'question/preload.js'),
    },
  });
  // and load the index.html of the app.
  window.loadFile('question/question.html');

  return window;
}
