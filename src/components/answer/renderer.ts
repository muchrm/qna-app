import { getAnswerByQuestion } from "../../services/question-and-answer.service";
import { to } from "../../utils/to";

window.electron.onActionUpdateAnswer(async (questionId)=>{
  const [err, answer] = await to(getAnswerByQuestion(questionId));
  if (err) {
    return;
  }
  const label = document.getElementById('answer') as HTMLSpanElement;

  label.innerHTML = answer as string;
});