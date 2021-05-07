import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  onActionUpdateAnswer: (listener: (questionId: number) => void) => {
    ipcRenderer.on('action-update-answer', (event, { questionId }: { questionId: number }) => {
      listener(questionId);
    });
  },
});
