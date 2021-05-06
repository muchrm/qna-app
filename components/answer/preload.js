const { ipcRenderer } = require("electron");
const qnaService = require("../../services/question-and-answer.service");
const { to } = require("../../utils/to")
window.addEventListener("DOMContentLoaded", () => {
  ipcRenderer.on("action-update-answer", async (event, {questionId}) => {
    const [err, answer] = await to(qnaService.getAnswerByQuestion(questionId))
    if(err){
      return;
    }
    let label = document.getElementById("answer");

    label.innerHTML = answer;
  });
});
