let popupOpen = false;
const popupModal = document.getElementById('category-popup');
const musicBoxes = document.querySelectorAll('.music');

//============== SPOTIFY API ==============
const clientId = '139751bc115f43329c1ed10b37f49eef';
const clientSecret = '3a241c55178d456ca803c1b8a8ae11d6';
let token;
let genreId;
let tracksEndPoint;
let spotifylistTitle;

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

        const limit = 10;
    
        const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });
    
        const data = await result.json();
        spotifylistTitle = data.playlists.items[0].description;
        console.log(spotifylistTitle)
        tracksEndPoint = data.playlists.items[0].tracks.href;
    }

    //get the tracks from the playlist gotten from getplaylistByGenre
    const getTracks = async (token, tracksEndPoint) => {
        const limit = 10;
        const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });

        const data = await result.json()

        //store the spotify links needed to be able to link to the songs on spotify
        const spotifyURIs = [];
        data.items.forEach(track => {
            spotifyURIs.push(track.track.uri);
        });

        //map over the tracks and return them as html
        let i = -1; //needed to keep track of the arrays of spotify URIs stored in the spotifyURI array
        let html = `<h2>${spotifylistTitle}</h2>`
        html += data.items.map(item => {
            i++
            return `<li><a href=${spotifyURIs[i]}>${item.track.name}</a></li>`
        })
        document.getElementById('category-list').innerHTML = html;

        // return data.items;

    }
    getPlaylistByGenre(token, genreId)
    getTracks(token, tracksEndPoint);
}

//add eventlisteners to all music category boxes
musicBoxes.forEach(box => box.addEventListener('click', (e) => {
    popupModal.classList.remove('hide');
    popupOpen = true;
    genreId = e.target.innerText.toLowerCase();
    spotifySearch();
}))

// =========== TMDB API ==============
const movieGenres = {
    drama: 18,
    action: 28,
    adventure: 12,
    comedy: 35,
    fantasy: 14,
    horror: 27
}

//Genre ids in TMBD
// 0: {id: 28, name: "Action"}
// 1: {id: 12, name: "Adventure"}
// 2: {id: 16, name: "Animation"}
// 3: {id: 35, name: "Comedy"}
// 4: {id: 80, name: "Crime"}
// 5: {id: 99, name: "Documentary"}
// 6: {id: 18, name: "Drama"}
// 7: {id: 10751, name: "Family"}
// 8: {id: 14, name: "Fantasy"}
// 9: {id: 36, name: "History"}
// 10: {id: 27, name: "Horror"}
// 11: {id: 10402, name: "Music"}
// 12: {id: 9648, name: "Mystery"}
// 13: {id: 10749, name: "Romance"}
// 14: {id: 878, name: "Science Fiction"}
// 15: {id: 10770, name: "TV Movie"}
// 16: {id: 53, name: "Thriller"}
// 17: {id: 10752, name: "War"}
// 18: {id: 37, name: "Western"}
// `https://api.themoviedb.org/3/discover/movie?with_genres=${movieGenres[drama]}&sort_by=revenue.desc&api_key=0a77033036d0112b03d5fb8d85f886b1&query=furious`

const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${movieGenres['drama']}&sort_by=revenue.desc&api_key=0a77033036d0112b03d5fb8d85f886b1`;

fetch(url)
.then(res => res.json())
.then((data)=>console.log(data))
.catch(err=>console.log(err))



// let input = 'star wars'

// const omdbSearch = async () => {
//     const result = await fetch(`http://www.omdbapi.com/?t=${input}&apikey=2fe1037f`)
//     const data = await result.json();
//     console.log(data);
// }

// omdbSearch();

const closePopup = () => {
    popupModal.classList.add('hide');
    popupopen = false;
}