const API_KEY = `&apiKey=bbdaee4b911644a796017954f3f1362a`;
const URL = `http://newsapi.org/v2/everything?q=`;

const searchArticles = search => {
  let req = `${URL}${search}${API_KEY}`;
  if (search) {
    return fetch(req).then(response => {
      return response.json();
    });
  }
};

export { searchArticles };