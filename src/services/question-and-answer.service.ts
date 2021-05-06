import { Question } from '../models/question';

const URI = 'http://localhost:3000';

export function getAll(): Promise<Question[]> {
  return fetch(URI)
    .then((resp) => resp.json())
    .then((data) => data.qnaList);
}

export function getAnswerByQuestion(id: number): Promise<string> {
  return fetch(`${URI}/${id}`)
    .then((resp) => resp.json())
    .then((data) => data.answer);
}
