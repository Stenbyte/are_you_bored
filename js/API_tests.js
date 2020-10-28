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

    _getGenres(token);
    _getPlaylistByGenre(token, 'rock');

}

_getToken();



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

