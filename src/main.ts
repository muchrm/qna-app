// Modules to control application life and create native browser window
import { app, BrowserWindow } from 'electron';
import { getOrCreateChildWindow } from './components/answer';
import { createMainWindow } from './components/question';
import { ipcMain } from 'electron';

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  const mainWindow = createMainWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });

  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.
  ipcMain.handle('request-update-answer', async (event, args) => {
    const answerWindow = await getOrCreateChildWindow(mainWindow);
    answerWindow.webContents.send('action-update-answer', args);
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
