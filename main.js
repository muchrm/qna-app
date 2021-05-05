// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const answer = require("./components/answer");
const question = require("./components/question");
const qnaService = require("./services/question-and-answer.service");
const { ipcMain } = require("electron");

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  const mainWindow = question.createMainWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) question.createMainWindow();
  });

  let answerWindow;

  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.
  ipcMain.handle("request-update-answer", (event, args) => {
    const answerId = args.id;
    const result = qnaService.getAnswer(answerId);
    if (!answerWindow) {
      answerWindow = answer.createChildWindow(mainWindow);
      answerWindow.show();
      answerWindow.webContents.on("destroyed", () => {
        answerWindow = null;
      });
      answerWindow.webContents.on("did-finish-load", () => {
        answerWindow.webContents.send("action-update-answer", { answer: result });
      });
    }else{
      answerWindow.webContents.send("action-update-answer", { answer: result });
    }
  });

  

  ipcMain.handle("request-load-question", (event, args) => {
    const qnaList = qnaService.getQuestion();
    event.sender.send("action-set-question", {
      qnaList: qnaList,
    });
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
