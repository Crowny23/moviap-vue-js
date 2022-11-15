<template>
  <div id="home">
    <p class="genre">genres</p>
    <div class="allgenres">
      <AllGenres v-for="item in dataG" :key="item.id" :id="item.id" :name="item.name" :type="type"></AllGenres>
    </div>
    <div class="container-switch">
      <p>Movies</p>
      <label class="switch">
        <input class="checked" type="checkbox" v-on:click="coucou">
        <span class="slider"></span>
      </label>
      <p>Series</p>
    </div>
    <div class="allmovies">
      <AllMovies v-for="item in data" :key="item.id" :id="item.id" :title="item.title" :name="item.name" :poster="item.poster_path"></AllMovies>
    </div>
    <div id="observer"><div class="watcher" ><div class="loading">Chargement</div><div v-on:click="up" class="btn-up">Up</div></div></div>
  </div>
</template>

<script>
// @ is an alias to /src
import AllMovies from '@/components/AllMovies.vue'
import AllGenres from '@/components/AllGenres.vue'
import ApiService from '@/services/api.service.js'

const apiService = new ApiService()
let totalpages = 1

export default {
  name: 'HomeView',
  el: '#home',
  components: {
    AllMovies,
    AllGenres
  },
  data () {
    return {
      data: [],
      page: 0,
      dataG: null,
      type: 'movie'
    }
  },
  mounted () {
    const handleIntersect = entries => {
      if (entries[0].isIntersecting) {
        if (totalpages > this.page) {
          this.page++
          if (this.$el.querySelector('.checked').checked === true) {
            this.allGenresForSeries()
            this.allSeries(this.page)
            this.type = 'serie'
          } else {
            this.allGenres()
            this.allMovies(this.page)
            this.type = 'movie'
          }
        }
      }
    }
    const newObserver = new IntersectionObserver(handleIntersect)
    newObserver.observe(this.$el.querySelector('.watcher'))
  },
  methods: {
    async allMovies (page) {
      const res = await apiService.getMovies(page)
      const movies = await res.json()
      totalpages = movies.total_pages
      this.data = this.data.concat(movies.results)
    },
    async allSeries (page) {
      const res = await apiService.getSeries(page)
      const series = await res.json()
      totalpages = series.total_pages
      this.data = this.data.concat(series.results)
    },
    async allGenres () {
      const res = await apiService.getGenres()
      const genres = await res.json()
      this.dataG = genres.genres
    },
    async allGenresForSeries () {
      const res = await apiService.getGenresforSeries()
      const genresSe = await res.json()
      this.dataG = genresSe.genres
    },
    up: function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    coucou: function () {
      this.data = []
      this.page = 0
      this.dataG = null
    }
  }

}
</script>

<style>
.allgenres{
  flex-wrap: wrap;
  justify-content: space-around;
  display: flex;
}
.genre{
  font-weight: 800;
}
img{
  max-width: 500px;
}
.allmovies{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.watcher {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.watcher > .loading {
  width: 100px;
  height: 100px;
  position: relative;
  text-align: center;
  line-height: 100px;
}

.watcher > .loading::after {
  content: "";
  position: absolute;
  width: 100px;
  height: 100px;
  background: transparent;
  border: #212121 solid 4px;
  border-radius: 50%;
  border-bottom: none;
  border-right: none;
  border-left: none;
  -webkit-animation: loading-rotate 2s ease infinite;
          animation: loading-rotate 2s ease infinite;
  left: 50%;
  top: 0;
  -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
}

.watcher > .loading::before {
  content: "";
  position: absolute;
  width: 100px;
  height: 100px;
  background: transparent;
  border: #212121 solid 4px;
  border-radius: 50%;
  border-top: none;
  border-left: none;
  border-right: none;
  -webkit-animation: loading-rotate 1s ease infinite;
          animation: loading-rotate 1s ease infinite;
  left: 50%;
  top: 0;
  -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
}
.btn-up {
  position: fixed;
  right: 20px;
  bottom: 70px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  background: rgba(123, 123, 123, 0.5);
}

.container-switch {
  display: flex;
  align-items: center;
  justify-content: center;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin: 5px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #2196F3;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

@-webkit-keyframes loading-rotate {
  to {
    -webkit-transform: translateX(-50%) rotateZ(360deg);
            transform: translateX(-50%) rotateZ(360deg);
  }
}

@keyframes loading-rotate {
  to {
    -webkit-transform: translateX(-50%) rotateZ(360deg);
            transform: translateX(-50%) rotateZ(360deg);
  }
}
</style>
