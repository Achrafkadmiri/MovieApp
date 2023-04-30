const API_TOKEN = "4ba0ac4ac5568ac5bb86d17146ef60f1";
export function getFilmsFromApiWithSearchedText (text, page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + "&page=" + page
    return fetch(url)
      .then((response) => response.json())
      .catch((error) => console.error(error))

  }
  // Get Details
  export function getDetailsFilm(movie_id) {
    const url = 'https://api.themoviedb.org/3/movie/'+movie_id+'?api_key=' + API_TOKEN + '&language=fr'
    return fetch(url)
      .then((response) => response.json())
      .catch((error) => console.error(error))

  }

  // API/TMDBApi.js

export function getImageFromApi (name) {
    return 'https://image.tmdb.org/t/p/w300' + name
  }