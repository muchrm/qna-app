const { ipcRenderer } = require("electron");

ipcRenderer.on("action-set-question", (event, args) => {
  const qnaList = args.qnaList;
  const container = document.getElementById("question-list");

  qnaList.forEach((qna) => {
    const button = document.createElement("button");
    button.innerHTML = qna.question;
    button.setAttribute("data-question-id", qna.id);
    container.append(button);
  });
  container.addEventListener(
    "click",
    (event) => {
      console.log("event = ", event);
      ipcRenderer.invoke("request-update-answer", {
        id: event.target.dataset.questionId,
      });
    },
    { capture: true }
  );
});

ipcRenderer.invoke("request-load-question");
