<template>
<div id="beerlist">
  <header><h1>Beer List</h1></header>

  <div id="listcontainer">
    <ul>
      <li v-for="beer in beerList.slice(0,4)" :key="beer.name">
        <img class="beerIcon" v-bind:src=beer.image_url alt="hei" v-on:click="selectBeer(beer.id)">
        <div>{{beer.name}}</div>
        <div>ABV: {{beer.abv}}</div>
        <div>{{beer.description}}</div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: 'BeerList',

  mounted() {
    this.getBeerListFromAPI()
  },

  data: function () {
      return {
        beerList: [],
        selectedBeer: this.$store.state.selectedBeer
      }
    },

  methods: {
    async getBeerListFromAPI() {
      console.log(this.$store.state.selectedBeer)

      fetch("https://api.punkapi.com/v2/beers")
      .then(response => response.json())
      .then((data) => {
        data.forEach((result) => {
          this.beerList.push(result)
        });
      });
    },

    selectBeer(id) {
      this.beerList.forEach(beer => {
        if(beer.id == id) {
          this.$store.state.selectedBeer = beer;
          console.log(this.$store.state.selectedBeer);
        }
      })
    }
  }
}

</script>
