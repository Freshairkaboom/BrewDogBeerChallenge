<template>
  <div id="app">
  <h1>Brewdog Beer List</h1>
    <div class="beerContainer">

      <div class="listcontainer">
        <BeerList />
      </div>
      <div v-if="this.$store.state.selectedBeer" class="detailscontainer">
        <BeerDetails />
      </div>

    </div>
  </div>
</template>

<script>

import BeerList from './components/BeerList.vue'
import BeerDetails from './components/BeerDetails.vue'

export default {
  name: 'App',
  components: {
    BeerList,
    BeerDetails
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}

img {
  width: 50px;
}

.detailscontainer {
  width:50%;
  border-width: 2px;
  border-color: red;
  overflow-y: auto;
  margin-left: 10px;
}

.listcontainer {
  width:50%;
  border-width: 5cm;
  overflow-y: auto;
  margin-left: -40px;
}

.beerContainer {
  display: flex;
  border: 2px solid #2c3e50;
  height: 80vh;
  text-align: center;

}
</style>
