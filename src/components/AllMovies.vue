<template>
  <div class="movie" v-if="title">
    <router-link :to="{ name: 'movie', params: {id: id } }">
      <h1>{{ title }}</h1>
      <img :src="'https://image.tmdb.org/t/p/w500' + poster" alt="{{title}}">
      </router-link>
  </div>
  <div class="serie" v-if="name">
    <router-link :to="{ name: 'serie', params: {id: id } }">
      <h1>{{ name }}</h1>
      <img :src="'https://image.tmdb.org/t/p/w500' + poster" alt="{{name}}">
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'AllMovies',
  props: ['id', 'title', 'name', 'poster']
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
.movie , .serie{
    width: 550px;
    margin: 10px;
    border: 2px solid #212121;
    border-radius: 5px;
}
a {
  text-decoration: none;
  color: #212121;
}
</style>
