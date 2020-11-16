const apiKey = '0IPPJhFAzYcNZJWN3eVDbeNJXmmP3zYS';

// /home.json?api-key=YaFIj8104OC2N7BdGaUDXSwJGterA7KQ';

// /hardcover-fiction.json?api-key=YaFIj8104OC2N7BdGaUDXSwJGterA7KQ';
const BASE_NEWS_URL = 'https://api.nytimes.com/svc/topstories/v2';
const BASE_BOOKS_URL = 'https://api.nytimes.com/svc/books/v3/lists/current';

const newsCategories = ['home', 'technology', 'business', 'health'];
const booksCategories = ['manga', 'young-adult', 'travel', 'sports'];

//MODAL
const closeBtn = document.getElementById('close-btn');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');

// BOOKS
const manga = document.getElementById('manga');
const youngAdult = document.getElementById('young-adult');
const travel = document.getElementById('travel');
const fitness = document.getElementById('fitness');

// NEWS
const topNews = document.getElementById('top-news');
const techNews = document.getElementById('technology');
const businessNews = document.getElementById('business');
const healthNews = document.getElementById('health');

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

const fetchNews = (url) => {
	return fetch(url)
		.then((res) => res.json())
		.then((data) => {
			const articles = getRandomObj(data.results, 10);
			console.log(articles);
			let renderedArticle = articles.map((article) => {
				const { title, url } = article;
				const img = article.multimedia
					? article.multimedia[0].url
					: 'https://via.placeholder.com/150';

				return `
        <div  class="news-article">
        <img src=${img} alt="" class="img-thumbnail">
        <h4>
        <a href=${url} target="_blank" class="title-link">${title}</a>
        </h4>
        </div>`;
			});
			renderedArticle = renderedArticle.join('');
			console.log(renderedArticle);
			return (modalBody.innerHTML = renderedArticle);
		});
};

const fetchBooks = (url) => {
	return fetch(url)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			const books = getRandomObj(data.results.books, 10);
			let renderedBook = books.map((book) => {
				const { title, book_image: img, amazon_product_url: url } = book;
				console.log(title, img, url);
				return `
			  <div  class="news-article">
			  <img src=${img} alt="" class="img-thumbnail">
			  <h4>
			  <a href=${url} target="_blank" class="title-link">${title}</a>
			  </h4>
			  </div>`;
			});

			renderedBook = renderedBook.join('');
			console.log(renderedBook);
			return (modalBody.innerHTML = renderedBook);
		});
};

function openModal() {
	modal.classList.add('show-modal');
}

function closeModal() {
	modal.classList.remove('show-modal');
}

closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', (e) => {
	if (e.target == modal) {
		modal.classList.remove('show-modal');
	}
});

manga.addEventListener('click', () => {
	openModal();
	fetchBooks(`${BASE_BOOKS_URL}/${booksCategories[0]}.json?api-key=${apiKey}`);
});

youngAdult.addEventListener('click', () => {
	openModal();
	fetchBooks(`${BASE_BOOKS_URL}/${booksCategories[1]}.json?api-key=${apiKey}`);
});
travel.addEventListener('click', () => {
	openModal();
	fetchBooks(`${BASE_BOOKS_URL}/${booksCategories[2]}.json?api-key=${apiKey}`);
});
fitness.addEventListener('click', () => {
	openModal();
	fetchBooks(`${BASE_BOOKS_URL}/${booksCategories[3]}.json?api-key=${apiKey}`);
});
topNews.addEventListener('click', () => {
	openModal();
	fetchNews(`${BASE_NEWS_URL}/${newsCategories[0]}.json?api-key=${apiKey}`);
});
techNews.addEventListener('click', () => {
	openModal();
	fetchNews(`${BASE_NEWS_URL}/${newsCategories[1]}.json?api-key=${apiKey}`);
});
businessNews.addEventListener('click', () => {
	openModal();
	fetchNews(`${BASE_NEWS_URL}/${newsCategories[2]}.json?api-key=${apiKey}`);
});
healthNews.addEventListener('click', () => {
	openModal();
	fetchNews(`${BASE_NEWS_URL}/${newsCategories[3]}.json?api-key=${apiKey}`);
});
