/* 

JS Final Project:

1. Search using API returning 6 results on 1 page

2. Include a loading state

3. Include a sorting feature with several options


API:

Send all data requests to:
http://www.omdbapi.com/?apikey=aea30197&

Poster API requests:
http://img.omdbapi.com/?apikey=aea30197&

Here is your key: aea30197

http://www.omdbapi.com/?i=tt3896198&apikey=aea30197
 */




let movies


async function getMovies(searchTerm) {
    const moviesWrapper = document.querySelector('.movies')

    let moviesHtml

    const moviesData = await fetch(`https://www.omdbapi.com/?apikey=aea30197&s=${encodeURIComponent(searchTerm)}`)
    movies = await moviesData.json()
    console.log(movies)

    if (!searchTerm || movies.Response === "False") {
        moviesHtml = ''
        for (let i = 0; i < 6; i++) {
            moviesHtml += `<div class="movie">
                <img src="./assets/movie_poster.png" alt="Movie Poster">
                <i class="fas fa-spinner"></i>
                <p class="movie__title">Movie Title <span class="movie__info">(Year)</span></p>
            </div>`
        }
        moviesWrapper.innerHTML = moviesHtml
        return
    }

    else {
        const selectedSortOption = document.getElementById('sort-menu').value;
        sortMovies(selectedSortOption)
    }
}

function sortMovies(sortOption) {
    let sortedMovies;
    const originalMoviesList = movies.Search
    switch (sortOption) {
        case 'a-z':
            sortedMovies = movies.Search.sort((a, b) => a.Title.localeCompare(b.Title));
            break;
        case 'z-a':
            sortedMovies = movies.Search.sort((a, b) => b.Title.localeCompare(a.Title));
            break;
        case 'newest':
            sortedMovies = movies.Search.sort((a, b) => b.Year - a.Year);
            break;
        case 'oldest':
            sortedMovies = movies.Search.sort((a, b) => a.Year - b.Year);
            break;
        case 'NO_SORT':
            sortedMovies = originalMoviesList;
    }
    displayMovies(sortedMovies);
}

function displayMovies(moviesToDisplay) {
    const moviesWrapper = document.querySelector('.movies');
    const moviesHtml = moviesToDisplay.slice(0, 6).map(movie => {
        return `<div class="movie">
                <img src="${movie.Poster}" alt="Movie Poster">
                <p class="movie__title">${movie.Title} <span class="movie__info">(${movie.Year})</span></p>
            </div>`}).join('')
    moviesWrapper.innerHTML = moviesHtml
}


getMovies()

document.getElementById('search-bar').addEventListener('input', function() {
    getMovies(this.value);
});

document.getElementById('sort-menu').addEventListener('change', function() {
    sortMovies(this.value);
});





