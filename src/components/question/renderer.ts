import { Question } from '../../models/question';
import { getAll } from '../../services/question-and-answer.service';
import { to } from '../../utils/to';

async function getQuestionAndCreateQuestionButton(){
    const container = document.getElementById('question-list') as HTMLElement;

    const [err, qnaList] = await to(getAll());
    if (err) {
      return;
    }
  
    const questionBtn = (qnaList as Question[]).map((qna) => {
      const button = document.createElement('button');
      button.innerHTML = qna.question;
      button.setAttribute('data-question-id', `${qna.id}`);
      return button;
    });
  
    container.append(...questionBtn);
  
    container.addEventListener(
      'click',
      (event) => {
        const element = event.target as HTMLButtonElement;
        const questionId = +(element.dataset.questionId as string);
        window.electron.requestUpdateAnswer(questionId);
      },
      { capture: true },
    );
}

getQuestionAndCreateQuestionButton();