<template>
  <div id="genre-search">
    <h1>{{ dataG }}</h1>
    <div class="allmovies">
      <AllMovies v-for="item in data" :key="item.id" :id="item.id" :title="item.title" :poster="item.poster_path" :name="item.name">
      </AllMovies>
    </div>
    <div id="observer">
      <div class="watcher">
        <div class="loading">Chargement</div>
        <div v-on:click="up" class="btn-up">Up</div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AllMovies from '@/components/AllMovies.vue'
import ApiService from '@/services/api.service.js'

const apiService = new ApiService()
let totalpages = 1

export default {
  name: 'GenreView',
  el: '#genre-search',
  components: {
    AllMovies
  },
  data () {
    return {
      data: [],
      page: 0,
      dataG: null,
      genreid: this.$route.params.id
    }
  },
  mounted () {
    this.allGenres()
    const handleIntersect = entries => {
      if (entries[0].isIntersecting) {
        if (totalpages > this.page) {
          this.page++
          if (this.$route.params.movorser === 'movie') {
            this.allMoviesGenres(this.page, this.genreid)
          } else {
            this.allSeriesGenres(this.page, this.genreid)
          }
        }
      }
    }
    const newObserver = new IntersectionObserver(handleIntersect)
    newObserver.observe(this.$el.querySelector('.watcher'))
  },
  methods: {
    async allMoviesGenres (page, genre) {
      const res = await apiService.getMoviesGenre(page, genre)
      const movies = await res.json()
      totalpages = movies.total_pages
      this.data = this.data.concat(movies.results)
    },
    async allSeriesGenres (page, genre) {
      const res = await apiService.getSeriesGenre(page, genre)
      const series = await res.json()
      totalpages = series.total_pages
      this.data = this.data.concat(series.results)
    },
    async allGenres () {
      const res = await apiService.getGenres()
      const genres = await res.json()
      for (const item of genres.genres) {
        if (item.id.toString() === this.genreid) {
          this.dataG = item.name
        }
      }
    },
    up: function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

}
</script>

<style scoped>
.allgenres {
  flex-wrap: wrap;
  justify-content: space-around;
  display: flex;
}

.genre {
  font-weight: 800;
}

img {
  max-width: 500px;
}

.allmovies {
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

.watcher>.loading {
  width: 100px;
  height: 100px;
  position: relative;
  text-align: center;
  line-height: 100px;
}

.watcher>.loading::after {
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

.watcher>.loading::before {
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
