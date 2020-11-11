const jokeBtn = document.getElementById('jokeBtn');
const jokeText = document.getElementById('jokeText');

jokeBtn.addEventListener('click', () => {
    // console.log('YES')
    const url = 'https://api.chucknorris.io/jokes/random';
    fetch(url)
        .then( res => {
            return res.json()
        }).then((data) => {
            console.log(data.value);
            jokeText.innerHTML= data.value;
        });
});