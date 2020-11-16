const controller = {
    popupOpen: false,
    popupModal: document.getElementById('category-popup')
};

//============== SPOTIFY API ==============

(function () {
    const musicBoxes = document.querySelectorAll('.music');
    const clientId = '139751bc115f43329c1ed10b37f49eef';
    const clientSecret = '3a241c55178d456ca803c1b8a8ae11d6';
    let token;
    let genreId;
    let tracksEndPoint;
    let spotifyListTitle;

    //Holds all the spotify fetch logic
    const spotifySearch = async () => {

        //get token neede to access Spotify api endpoints
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        token = data.access_token;

        //get first playlist based on what category has been picked
        const getPlaylistByGenre = async (token, genreId) => {

            const limit = 8;

            const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + token }
            });

            const data = await result.json();
            const randomNumber = Math.floor(Math.random()*limit) + 1;

            if(!data.playlists.items[randomNumber].description){
                spotifyListTitle = '';
            } else {
                spotifyListTitle = data.playlists.items[randomNumber].description;
            }
            
            tracksEndPoint = data.playlists.items[randomNumber].tracks.href;

            const getTracks = async (token, tracksEndPoint) => {
                const limit = 30;
                const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
                    method: 'GET',
                    headers: { 'Authorization': 'Bearer ' + token }
                });

                const data = await result.json()

                //store the spotify links needed to be able to link to the songs to spotify
                const spotifyURIs = [];
                data.items.forEach(track => {
                    if(!track.track.uri){
                        spotifyURIs.push('');
                    } else {
                        spotifyURIs.push(track.track.uri);
                    }
                });

                //map over the tracks and return them as html
                let i = -1; //needed to keep track of the arrays of spotify URIs stored in the spotifyURI array
                let html = `<h2>${spotifyListTitle}<button onClick="closePopup()" class="upper-close-btn">Close</button></h2><div class="music-content">`
                html += data.items.map(item => {
                    i++
                    return `<li>
                                <div class="music-card">
                                    <iframe src="https://open.spotify.com/embed/track/${item.track.id}" width="300" height="100" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                                </div>
                            </li>`
                }).join('');
                html += `</div>
                <div class="modal-footer">
                        <input onclick="closePopup()" type="button" class="close-btn" value="Close">
                        </div>`;
                document.getElementById('category-list-music').innerHTML = html;
            }
            getTracks(token, tracksEndPoint);
        }
        //get the tracks from the playlist gotten from getplaylistByGenre
        getPlaylistByGenre(token, genreId)
    }

    //add eventlisteners to all music category boxes
    musicBoxes.forEach(box => box.addEventListener('click', (e) => {
        document.getElementById('category-list-music').innerHTML = '';
        document.getElementById('category-list-movies').innerHTML = '';
        controller.popupModal.classList.remove('hide');
        controller.popupOpen = true;
        genreId = e.target.innerText.toLowerCase();
        spotifySearch();
    }))
})();

// =========== TMDB API ==============

(function () {
    //get all movie boxes
    const movieBoxes = document.querySelectorAll('.movies');

    //genre id in TMDB api
    const movieGenres = {
        drama: 18,
        action: 28,
        adventure: 12,
        comedy: 35,
        fantasy: 14,
        horror: 27
    }

    const movieSearch = (genreId) => {
        const randomNumber = Math.floor(Math.random()*50 + 1); //randomize which page (1-50) will ba shown results from
        //fetch movies from a specified genre based on the movie revenue
        const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${movieGenres[genreId]}&sort_by=revenue.desc&page=${randomNumber}&api_key=0a77033036d0112b03d5fb8d85f886b1`;

        fetch(url)
            .then(res => res.json())
            .then((movies) => {
                console.log(movies);
                //only map over the first 10 movies in the array
                let limit = 20;
                //create html string to be injected
                let html = `<h2>Recommended ${genreId} movies<button onClick="closePopup()" class="upper-close-btn">Close</button></h2><div class="movies-content">`
                html += movies.results.slice(0, limit).map(movie => {
                    if(movie.poster_path || movie.backdrop_path){
                        return `<li>
                                    <div class="movie-card">
                                        <h4 class="movie-title">${movie.title}<span class="movie-score"> ${movie.vote_average}</span></h4>
                                        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path || movie.backdrop_path}" alt="picture of ${movie.title}" />
                                        <p class="movie-overview">${movie.overview}</p>
                                    <div>
                                </li>
                        `
                    } else {
                        return `<li>
                                    <div class="movie-card">
                                        <h4 class="movie-title">${movie.title} <span class="movie-score"> ${movie.vote_average}</span></h4>
                                        <span><i class="far fa-eye-slash"></i></span>
                                    </div>
                                </li>`
                    }
                    
                }).join(''); //join() to get rid of , (comma) in html
                html += `</div>
                        <div class="modal-footer">
                        <input onclick="closePopup()" type="button" class="close-btn" value="Close">
                        </div>`
                document.getElementById('category-list-movies').innerHTML = html;
            })
            .catch(err => console.log(err));
    }


    movieBoxes.forEach(box => box.addEventListener('click', (e) => {
        document.getElementById('category-list-movies').innerHTML = '';
        document.getElementById('category-list-music').innerHTML = '';
        controller.popupModal.classList.remove('hide');
        controller.popupOpen = true;
        genreId = e.target.innerText.toLowerCase();
        movieSearch(genreId);
    }))

})();

const closePopup = () => {
    controller.popupModal.classList.add('hide');
    controller.popupopen = false;
}