import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  requestUpdateAnswer: (questionId: number) =>
    ipcRenderer.invoke('request-update-answer', {
      questionId,
    }),
});
