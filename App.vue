<template>
  <div id="app">
    <BeerList />
    <!-- {{store.state.selectedBeer}} -->
  </div>
</template>

<script>

import BeerList from './components/BeerList.vue'
// import BeerDetails from './components/BeerDetails.vue'

export default {
  name: 'App',
  components: {
    BeerList,
    // BeerDetails
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

img {
  width: 50px;
}
</style>
