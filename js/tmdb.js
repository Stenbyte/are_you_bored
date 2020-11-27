site.tmdb = (() => {
    const movieBoxes = document.querySelectorAll('.movies'); //get all movie boxes
    const categoryListMovies = document.getElementById('category-list-movies');

    const getRecommendation = genreId => `<h2>Recommended ${genreId} movies<button onClick="site.popup.close()" class="upper-close-btn">Close</button></h2><div class="movies-content">`

    const getMovieCard = ({ poster_path, backdrop_path, title, overview, vote_average }) => {
        return (poster_path || backdrop_path) ?
            `<li>
            <div class="movie-card">
            <a target=”_blank” href="https://www.amazon.com/s?k=${title}&i=shop-instant-video&ref=nb_sb_noss_2"><h4 class="movie-title">${title}<span class="movie-score"> ${vote_average}</span></h4></a>
                <a target=”_blank” href="https://www.amazon.com/s?k=${title}&i=shop-instant-video&ref=nb_sb_noss_2"> <img src="https://image.tmdb.org/t/p/w500/${poster_path || backdrop_path}" alt="picture of ${title}" /></a>
                <p class="movie-overview">${overview}</p>
            <div>
        </li>
        `:
            `<li>
            <div class="movie-card">
                <h4 class="movie-title">${title} <span class="movie-score"> ${vote_average}</span></h4>
                <span><i class="far fa-eye-slash"></i></span>
            </div>
        </li>`
    };

    const _getMovieUrl = genreId => {
        const randomNumber = Math.floor(Math.random() * 50 + 1); //randomize which page (1-50) will ba shown results from
        return `https://api.themoviedb.org/3/discover/movie?with_genres=${site.constants.MOVIE_GENRES[genreId]}&sort_by=revenue.desc&page=${randomNumber}&api_key=${site.constants.TMDB_APIKEY}`;
    }

    const movieSearch = (genreId) => {
        const randomNumber = Math.floor(Math.random() * 50 + 1);
        const url = _getMovieUrl(genreId);

        //fetch movies from a specified genre based on the movie revenue
        return fetch(url)
            .then(res => res.json())
            .then(movies => {
                //only map over the first 10 movies in the array
                const limit = 20;

                //create html string to be injected
                const html = getRecommendation(genreId)
                    + movies.results.slice(0, limit).map(movie => getMovieCard(movie)).join('') //join() to get rid of , (comma) in html
                    + site.utils.generateModalFooter()

                categoryListMovies.innerHTML = html;
            })
            .catch(err => console.log(err));
    }

    movieBoxes.forEach(box => site.utils.handleOnBox(box, movieSearch));
})();