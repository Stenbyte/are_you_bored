const UIController = (function () {
    const musicCategories = {
        musicRock: "#music_rock",
        musicPop: "#music_pop",
        musicEDM: "music_edm",
        musicJazz: "music_jazz",
        musicMetal: "music_metal",
        musicClassiscal: "music_rnb",
    }

    const categoryList = document.getElementById('category-list');

    return {
        categories() {
            return {
                musicRock: document.querySelector(musicCategories.musicRock),
                categoryList: categoryList
            }
        }

    }
})();



const spotifyController = (function (genreId) {
    //============== SPOTIFY API ==============
    const clientId = '139751bc115f43329c1ed10b37f49eef';
    const clientSecret = '3a241c55178d456ca803c1b8a8ae11d6';

    // private methods
    const _getToken = async () => {

        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });
        console.log('here')

        const data = await result.json();
        const token = data.access_token;

        console.log(token);

        //gets a list of all 20 genres
        const _getGenres = async (token) => {

            const result = await fetch('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + token }
            });

            const data = await result.json();
            console.log(data.categories.items)
        }
        //
        const _getPlaylistByGenre = async (token, genreId) => {

            const limit = 10;

            const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + token }
            });

            const data = await result.json();
            console.log(data.playlists.items)
            return data.playlists.items;
        }
        const _getTracks = async (token, tracksEndPoint) => {
            const limit = 10;
            const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + token }
            });

            const data = await result.json()
            console.log(data.items);
            const spotifyURIs = [];
            data.items.forEach(track => {
                spotifyURIs.push(track.track.uri);
            });
            console.log(spotifyURIs);
            let i= -1;
            const html = data.items.map(item => {
                i++
                return `<li><a href=${spotifyURIs[i]}>${item.track.name}</a></li>`
            })
            document.getElementById('category-list').innerHTML = html;
            return data.items;

        }

        _getGenres(token);
        _getPlaylistByGenre(token, genreId);
        _getTracks(token, "https://api.spotify.com/v1/playlists/37i9dQZF1DWXRqgorJj26U/tracks");

    }
    return _getToken;

})();

document.getElementById('music_rock').addEventListener('click', (e)=>{
    console.log(e.target.innerText)
    spotifyController(e.target.innerText);
})

document.getElementById('music_pop').addEventListener('click', (e)=>{
    console.log(e.target.innerText)
    spotifyController(e.target.innerText);
})






// const AppController = (function(UIController, APIController){
//     const categories = UIController.categories();
//     console.log(categories);

// })();

// (function () {
//     const clientId = '139751bc115f43329c1ed10b37f49eef';
//     const clientSecret = '3a241c55178d456ca803c1b8a8ae11d6';

//     // private methods
//     const _getToken = async () => {

//         const result = await fetch('https://accounts.spotify.com/api/token', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 'Authorization': 'Basic' + btoa(clientId + ':' + clientSecret)
//             },
//             body: 'grant_type=client_credentials'
//         });
//         console.log('here')

//         const data = await result.json();
//         return data.access_token;
//     }

//     const _getGenres = async (token) => {

//         const result = await fetch('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
//             method: 'GET',
//             headers: { 'Authorization': 'Bearer ' + token }
//         });

//         const data = await result.json();
//         console.log(data.categories.items)
//         return data.categories.items;
//     }

//     const _getPlaylistByGenre = async (token, genreId) => {

//         const limit = 10;

//         const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
//             method: 'GET',
//             headers: { 'Authorization': 'Bearer' + token }
//         });

//         const data = await result.json();
//         return data.playlists.items;
//     }

//     const _getTracks = async (token, tracksEndPoint) => {

//         const limit = 10;

//         const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
//             method: 'GET',
//             headers: { 'Authorization': 'Bearer ' + token }
//         });

//         const data = result.json();
//         return data.items;
//     }

//     const _getTrack = async (token, trackEndPoint) => {

//         const result = await fetch(`${trackEndPoint}`, {
//             method: 'GET',
//             headers: { 'Authorization': 'Bearer ' + token }
//         });

//         const data = await result.json();
//         return data;
//     }

//     return {
//         getToken() {
//             return _getToken();
//         },
//         getGenres(token) {
//             return _getGenres(token);
//         },
//         getPlaylistByGenre(token, genreId) {
//             return _getPlaylistByGenre(token, genreId);
//         },
//         getTracks(token, tracksEndPoint) {
//             return _getTracks(token, tracksEndPoint)
//         },
//         getTrack(token, trackEndPoint) {
//             return _getTrack(token, trackEndPoint);
//         }
//     }

// })();

