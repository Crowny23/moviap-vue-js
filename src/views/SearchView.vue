<template>
  <div class="searchhome">
    <input placeholder="Rechercher votre film" type="text" @input="search = $event.target.value" />
    <div class="allmovies" v-if="data !== null">
      <AllMovies v-for="item in data" :key="item.id" :id="item.id" :title="item.title" :overview="item.overview" :poster="item.poster_path"></AllMovies>
    </div>
    <div v-else><h1>Il y a rien 🥺 …</h1></div>
  </div>
</template>

<script>
// @ is an alias to /src
import AllMovies from '@/components/AllMovies.vue'
import ApiService from '@/services/api.service.js'

const apiService = new ApiService()

export default {
  name: 'SearchView',
  components: {
    AllMovies
  },
  data () {
    return {
      data: null,
      search: ''
    }
  },
  BeforeMount () {
    this.searchMovies(this.search)
  },
  watch: {
    search () {
      this.searchMovies(this.search)
    }
  },
  methods: {
    async searchMovies (search) {
      const res = await apiService.getSearch(search)
      const movies = await res.json()
      this.data = movies.results
    }
  }

}
</script>

<style>
img{
  max-width: 500px;
}

.allmovies{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.searchhome{
    display: flex;
    flex-direction: column;
    align-items: center;
}
input{
    width: 50%;
    height: 30px;
    margin: 10px;
    font-size: 26px;
}
</style>
