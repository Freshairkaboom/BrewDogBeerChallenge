<template>
<div>
    <header><h1>Details</h1></header>

    <img class="beerIcon" v-bind:src=selectedBeer.image_url alt="hei">
    <div>{{selectedBeer.name}}</div>
    <div>ABV: {{selectedBeer.abv}}</div>
    <hr>
    <div>{{selectedBeer.description}}</div>
    <hr>

    <Ingredients ingredientHeader = "Hops Ingredients" :ingredientList = hopIngredientList :isHops='true'></Ingredients>

    <Ingredients ingredientHeader = "Malts Ingredients" :ingredientList = maltsIngredientList :isHops='false'></Ingredients>

    <Methods/>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Ingredients from './Ingredients.vue'
import Methods from './Methods.vue'

export default
  {
  components: {
    Ingredients,
    Methods,
  },
  name: 'BeerDetails',

  computed: {
      ...mapState(['selectedBeer']),
      ...mapGetters(['getSelectedBeer']),

      hopIngredientList: function() {
          return this.selectedBeer.ingredients.hops;

      },
      maltsIngredientList: function() {
          return this.selectedBeer.ingredients.malt;
      },
  },
}
</script>

<style scoped>
    li {
        text-align: left;
    }
</style>
