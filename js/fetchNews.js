const URL =
  'https://api.nytimes.com/svc/topstories/v2/world.json?api-key=YaFIj8104OC2N7BdGaUDXSwJGterA7KQ';

const topNews = document.getElementById('top-news');
const closeBtn = document.getElementById('news-close-btn');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
function openModal() {
  modal.classList.add('show-modal');
}

function closeModal() {
  modal.classList.remove('show-modal');
}

// get random item in arrays
function getRandomObj(arr, size) {
  let result = [];
  while (result.length < size) {
    random = Math.floor(Math.random() * arr.length);
    if (result.indexOf(arr[random]) == -1) {
      result.push(arr[random]);
    }
  }
  return result;
}

const getNews = () => {
  // Fetch news from api
  fetchNews(URL);
};

const fetchNews = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // work with resolved data
      // data.results;
      const articles = getRandomObj(data.results, 10);
      let renderedArticle = articles.map((article) => {
        const { title, url } = article;
        const img = article.multimedia[0].url;
        return `
        <div  class="news-article">
        <img src=${img} alt="" class="img-thumbnail">
        <h4>
        <a href=${url} target="_blank" class="title-link">${title}</a>
        </h4>
        </div>`;
      });
      renderedArticle = renderedArticle.join('');
      return (modalBody.innerHTML = renderedArticle);
    });
};

topNews.addEventListener('click', () => {
  openModal();
  getNews();
});

closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', (e) => {
  if (e.target == modal) {
    modal.classList.remove('show-modal');
  }
});
