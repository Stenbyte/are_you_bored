site.nyt = (() => {
	const {
		BASE_NEWS_URL,
		BASE_BOOKS_URL,
		NYT_APIKEY,
		NEWS_CATEGORIES,
		BOOKS_CATEGORIES
	} = site.constants;

	BOOKS_CATEGORIES.forEach(category => {
		const categoryBtn = document.getElementById(category);
		categoryBtn.addEventListener('click', () => {
			site.modal.open();
			site.utils.fetchBooks(`${BASE_BOOKS_URL}/${category}.json?api-key=${NYT_APIKEY}`);
		})
	})

	NEWS_CATEGORIES.forEach(category => {
		const categoryBtn = document.getElementById(category);
		categoryBtn.addEventListener('click', () => {
			site.modal.open();
			site.utils.fetchNews(`${BASE_NEWS_URL}/${category}.json?api-key=${NYT_APIKEY}`);
		})
	})
})();