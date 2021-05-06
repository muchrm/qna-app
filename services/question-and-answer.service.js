const URI = 'http://localhost:3000';

function getAll() {
  return fetch(URI).then(resp => resp.json()).then(data => data.qnaList)
}

function getAnswerByQuestion(id) {
  return fetch(`${URI}/${id}`).then(resp => resp.json()).then(data => data.answer)
}

module.exports = {
  getAll,
  getAnswerByQuestion,
};
