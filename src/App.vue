<template>
  <img alt="Vue logo" src="./assets/pngegg.png">
  <h1 class="title">THE MOVIAP</h1>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/search/">Search</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.title{
  font-size: clamp(50px, 15vw, 150px);
  font-weight: 900;
  background-clip: text;
  background-position: fixed;
  -webkit-background-clip: text;
  background-image: url(./assets/rows-red-seats-theater.jpeg);
  color: transparent;
  background-attachment: fixed;
  background-size: contain;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 10px;
}

nav a.router-link-exact-active {
  color: #42b983;
  text-decoration: none;
}
</style>
