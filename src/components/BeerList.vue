<template>
<div>
  <header><h1>Beer List</h1></header>

  <div id="listcontainer">
    <ul style="list-style: none">
      <li style="border:1px solid black" v-for="(beer, index) in beerList" :key="beer.name + index" v-on:click="selectBeer(beer)">
        <img class="beerIcon" v-bind:src=beer.image_url alt="hei">
        <div>{{beer.name}}</div>
        <div>ABV: {{beer.abv}}</div>
        <hr>
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

  data() {
    return {
      beerList: [],
    }
  },

  methods: {
    async getBeerListFromAPI() {
      try {
        let response = await fetch("https://api.punkapi.com/v2/beers");
        let data = await response.json();

      data.forEach((result) => {
        this.beerList.push(result)
      });
      }
      catch (err) {
        console.log(err);
      }

    },

    selectBeer(beer) {
      this.$store.dispatch("mutateSelectedBeer", beer);
    }
  }
}

</script>
