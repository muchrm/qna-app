/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

declare global {
  interface Window {
    electron: {
      requestUpdateAnswer: (questionId: number) => void,
      onActionUpdateAnswer: (listener: (questionId: number) => void) => void
    };
  }
}
