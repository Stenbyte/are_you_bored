site.chuck = (() => {
    const jokeBtn = document.getElementById('jokeBtn');
    const jokeText = document.getElementById('jokeText');
        
    jokeBtn.addEventListener('click', () => {
        fetch(site.constants.CHUCK_API)
            .then(res => res.json())
            .then(data => jokeText.innerHTML=data.value);
    });
})();