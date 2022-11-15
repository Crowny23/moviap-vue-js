<template>
  <div class="sub-genre">
    <router-link :to="{ name: 'genre', params: {movorser: type, id: id } } ">
      <p>{{ name }}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'AllGenres',
  props: ['id', 'name', 'type']
}
</script>

<style scoped>
.sub-genre{
  margin: 5px;
}
</style>
