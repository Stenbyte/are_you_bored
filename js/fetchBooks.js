// API WF5A0kWv0tDAQGgOGIIgz4SUY9BirEWA

// https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=yourkey
// young adult
// manga
// sports
// travel

const apiKey = 'WF5A0kWv0tDAQGgOGIIgz4SUY9BirEWA';

const BASE_URL = `https://api.nytimes.com/svc/books/v3/lists/current`;

const categories = ['young-adult', 'manga', 'travel', 'sports'];

const manga = document.getElementById('manga');
const youngAdult = document.getElementById('young-adult');
const travel = document.getElementById('travel');
const fitness = document.getElementById('fitness');

const booksCloseBtn = document.getElementById('books-close-btn');
const booksModal = document.getElementById('books-modal');
const booksModalBody = document.getElementById('books-modal-body');

function openModal() {
	booksModal.classList.add('show-modal');
}

function closeModal() {
	booksModal.classList.remove('show-modal');
}

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
			return (booksModalBody.innerHTML = renderedBook);
		});
};

manga.addEventListener('click', () => {
	openModal();
	fetchBooks(`${BASE_URL}/${categories[0]}.json?api-key=${apiKey}`);
});

youngAdult.addEventListener('click', () => {
	openModal();
	fetchBooks(`${BASE_URL}/${categories[1]}.json?api-key=${apiKey}`);
});

travel.addEventListener('click', () => {
	openModal();
	fetchBooks(`${BASE_URL}/${categories[2]}.json?api-key=${apiKey}`);
});

fitness.addEventListener('click', () => {
	openModal();
	fetchBooks(`${BASE_URL}/${categories[3]}.json?api-key=${apiKey}`);
});

booksCloseBtn.addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
	if (e.target == booksModal) {
		booksModal.classList.remove('show-modal');
	}
});
