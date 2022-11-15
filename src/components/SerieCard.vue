<template>
  <div class="serie-view">
    <h1>{{data.name}}</h1>
    <h2>{{formatDate(data.first_air_date)}}</h2>
    <div class="genre-poster">
      <div class="genre-overview">
        <p>Genres :</p>
        <ul v-for="item in data.genres" :key="item.id">
          <li>{{item.name}}</li>
        </ul>
        <p class="resume">{{data.overview}}</p>
        <p>nombre d'épisodes : {{data.number_of_episodes}}</p>
        <p>nombre de saisons : {{data.number_of_seasons}}</p>
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
  name: 'SerieCard',
  data () {
    return {
      data: null,
      id: this.$route.params.id
    }
  },
  created () {
    this.SerieCard(this.id)
  },
  methods: {
    async SerieCard (id) {
      const res = await apiService.getSerie(id)
      const serie = await res.json()
      this.data = serie
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
