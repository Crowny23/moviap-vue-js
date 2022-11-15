<template>
  <div class="movie-view">
    <h1>{{data.title}}</h1>
    <h2>{{formatDate(data.release_date)}}</h2>
    <div class="genre-poster">
      <div class="genre-overview">
        <ul v-for="item in data.genres" :key="item.id">
          <li>{{item.name}}</li>
        </ul>
        <p class="resume">{{data.overview}}</p>
        <p>note : {{data.vote_average}}</p>
      </div>
      <img :src="'https://image.tmdb.org/t/p/w500' + data.poster_path" :alt="data.title">
    </div>
  </div>
</template>

<script>
import ApiService from '@/services/api.service.js'

const apiService = new ApiService()

export default {
  name: 'MovieCard',
  data () {
    return {
      data: null,
      id: this.$route.params.id
    }
  },
  created () {
    this.MovieCard(this.id)
  },
  methods: {
    async MovieCard (id) {
      const res = await apiService.getMovie(id)
      const movie = await res.json()
      this.data = movie
    },
    formatDate (value) {
      const date = new Date(value)
      return date.toLocaleDateString('fr')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.genre-poster {
  display: flex;
  justify-content: center;
}
.genre-overview {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 50px;
}
.resume {
  max-width: 500px;
}
</style>
