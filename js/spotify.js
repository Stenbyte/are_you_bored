site.spotify = (() => {
    const musicBoxes = document.querySelectorAll('.music');

    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + site.utils.getEncodedAuthenticationString()
        },
        body: 'grant_type=client_credentials'
    };

    const getTracks = async (token, { description, tracks }) => {
        const spotifyListTitle = description ? description : '';
        const tracksEndPoint = tracks.href;
        const limit = 30;

        const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });

        const data = await result.json()

        // store the spotify links needed to be able to link to the songs to spotify
        const spotifyURIs = [];

        data.items.forEach(track => {
            if (!track.track) return;
            spotifyURIs.push(track.track.uri ? track.track.uri : '');
        });

        //map over the tracks and return them as html
        let counter = -1; //needed to keep track of the arrays of spotify URIs stored in the spotifyURI array

        let html = site.utils.generatePopup(spotifyListTitle)
            + data.items.map(item => {
                counter++;
                return site.utils.generateMusicCard(item.track.id)
            }).join('')
            + site.utils.generateModalFooter();

        document.getElementById('category-list-music').innerHTML = html;
    }

    //get first playlist based on what category has been picked
    const getPlaylistByGenre = async (token, genreId) => {
        // choose from limit nr of playlists of a genre
        const limit = 8;

        const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });

        const data = await result.json();
        const randomNumber = Math.floor(Math.random() * limit);

        getTracks(token, data.playlists.items[randomNumber]);
    }

    const spotifySearch = async (genreId) => {
        const result = await fetch('https://accounts.spotify.com/api/token', params);
        const data = await result.json();
        const token = data.access_token;

        //get the tracks from the playlist gotten from getplaylistByGenre
        getPlaylistByGenre(token, genreId)
    }

    //add eventlisteners to all music category boxes
    musicBoxes.forEach(box => site.utils.handleOnBox(box, spotifySearch));
})();
