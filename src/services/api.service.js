export default class ApiService {
  init = {
    method: 'GET',
    headers: new Headers({
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNmRlMTk0ODYyNmQzNzNkZjFhYzkyN2I1ZGZhZGEyYSIsInN1YiI6IjYyOTRjZGYyZjU0ODM2MDA2NjA5YThlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PYD0EbtJZwDUg1ZsB_HjK9eTdNP6Z-FMGsPITKLnCO4'
    })
  }

  getMovies (page) {
    return fetch(`https://api.themoviedb.org/3/discover/movie?language=fr-FR&page=${page}`, this.init)
  }

  getSeries (page) {
    return fetch(`https://api.themoviedb.org/3/discover/tv?language=fr-FR&page=${page}`, this.init)
  }

  getMovie (id) {
    return fetch(`https://api.themoviedb.org/3/movie/${id}?language=fr-FR`, this.init)
  }

  getSerie (id) {
    return fetch(`https://api.themoviedb.org/3/tv/${id}?language=fr-FR`, this.init)
  }

  getSearch (search) {
    return fetch(`https://api.themoviedb.org/3/search/movie?language=fr-FR&query=${search}&include_adult=false`, this.init)
  }

  getGenres () {
    return fetch('https://api.themoviedb.org/3/genre/movie/list?language=fr-FR', this.init)
  }

  getGenresforSeries () {
    return fetch('https://api.themoviedb.org/3/genre/tv/list?language=fr-FR', this.init)
  }

  getMoviesGenre (page, genre) {
    return fetch(`https://api.themoviedb.org/3/discover/movie?language=fr-FR&page=${page}&with_genres=${genre}`, this.init)
  }

  getSeriesGenre (page, genre) {
    return fetch(`https://api.themoviedb.org/3/discover/tv?language=fr-FR&page=${page}&with_genres=${genre}`, this.init)
  }
}
