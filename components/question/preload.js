const { ipcRenderer } = require("electron");
const qnaService = require("../../services/question-and-answer.service");
const { to } = require("../../utils/to")

window.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("question-list");

  const [err,qnaList] = await to(qnaService.getAll());
  if(err){
    return;
  }

  questionBtn = qnaList.map((qna) => {
    const button = document.createElement("button");
    button.innerHTML = qna.question;
    button.setAttribute("data-question-id", qna.id);
    return button;
  });

  container.append(...questionBtn);

  container.addEventListener(
    "click",
    (event) => {
      const questionId = event.target.dataset.questionId
      ipcRenderer.invoke("request-update-answer", {
        questionId,
      });
    },
    { capture: true }
  );
});
