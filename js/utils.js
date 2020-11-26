site.utils = (() => {
    /**
     * getRandomObj will iterate through the array of object of interest
     * and return a new array with specific number of object 
     * 
     * @param {Array} arr array of object to be iterated through
     * @param {Number} size number of object to be picked out from the array
     * @return {Array} result 
     */
    const getRandomObj = (arr, size) => {
        let result = [];

        while (result.length < size) {
            random = Math.floor(Math.random() * arr.length);
            if (result.indexOf(arr[random]) == -1) {
                result.push(arr[random]);
            }
        }

        return result;
    }

    // return image placeholder if multimedia is undefined
    const _getFormattedImageUrl = multimedia => multimedia ? multimedia[0].url : 'https://via.placeholder.com/200';

    // construct news-article element to be populated to the DOM
    const _getNewsArticle = ({ url, multimedia, title }) => {
        return `
            <div class="news-article">
                <a href="${url}">
                <img src=${_getFormattedImageUrl(multimedia)} alt="" class="news-img"></a>
                <h4>
                <a href=${url} target="_blank" class="title-link">${title}</a>
                </h4>
            </div>`;
    }

    /**
     * perform API call to the mentioned URL 
     * and populate modalBody with the constructed content
     * 
     * @param {string} url constructed URL for fetching news
     * @param {HTMLElement} modalBody popup body to populate news content
     */
    const fetchNews = (url, modalBody) => {
        site.modal.clear();

        return fetch(url)
            .then(res => res.json())
            .then(data => {
                const articles = getRandomObj(data.results, 10);
                let renderedArticle = articles.map((article) => _getNewsArticle(article)).join('');;
                site.modal.update(renderedArticle);
            });
    };

    // construct article--books element to populate modalBody
    const _getBookArticle = ({ amazon_product_url, book_image, title, description }) => `
        <div class="article article--books">
            <a href="${amazon_product_url}"><img src=${book_image} alt="" class="book-img"></a>
            <h4>
                <a href=${amazon_product_url} target="_blank" class="title-link">${title}</a>
            </h4>
            <p class="book-desc">${description}</p>
        </div>`;

    /**
     * 
     * @param {string} url constructed API Url for fetching book content
     * @param {HTMLElement} modalBody popup body to populate content
     */
    const fetchBooks = (url, modalBody) => {
        site.modal.clear();

        return fetch(url)
            .then(res => res.json())
            .then(data => {
                const books = getRandomObj(data.results.books, 10);
                let renderedBook = books.map(book => _getBookArticle(book)).join('');
                site.modal.update(renderedBook);
            });
    };

    /**
     * Clear category listing, display popup
     * perform fetch function depends on what triggers it
     * 
     * @param {HTMLElement} box 
     * @param {Function} searchFn either fetchBooks or fetchNews 
     */
    const handleOnBox = (box, searchFn) => box.addEventListener('click', (e) => {
        document.getElementById('category-list-music').innerHTML = '';
        document.getElementById('category-list-movies').innerHTML = '';
        site.popup.open();
        genreId = e.target.innerText.toLowerCase();
        searchFn(genreId);
    });

    /**
     * returns encoded authentication string for Spotify API in base-64 
     */
    const getEncodedAuthenticationString = () => {
        return btoa(site.constants.SPOTIFY_CLIENTID + ':' + site.constants.SPOTIFY_CLIENT_SECRET);
    }

    const generatePopup = title => `
        <h2>
            ${title}
            <button onClick="site.popup.close()" class="upper-close-btn">
                Close
            </button>
        </h2><div class="music-content">
        `;

    const generateMusicCard = id => `
        <li>
            <div class="music-card">
                <iframe src="https://open.spotify.com/embed/track/${id}" width="300" height="100" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            </div>
        </li>`;

    const generateModalFooter = () => `
        </div>
            <div class="modal-footer">
            <input onclick="site.popup.close()" type="button" class="close-btn" value="Close">
        </div>`;

    return {
        getRandomObj,
        fetchNews,
        fetchBooks,
        handleOnBox,
        getEncodedAuthenticationString,
        generatePopup,
        generateMusicCard,
        generateModalFooter
    }
})();