const { ipcRenderer } = require("electron");

ipcRenderer.on("action-update-answer", (event, args) => {
  let label = document.getElementById("answer");

  label.innerHTML = args.answer;
});

// ipcRenderer.invoke("request-load-answer");