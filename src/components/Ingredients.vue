// Child component of BeerDetails
<template>
  <div>
    <h2>{{ ingredientHeader ? ingredientHeader : "" }}</h2>
    <ul>
      <li
        v-for="(ingredient, index) in ingredientList"
        :key="index + ingredient"
      >
        <button v-on:click="addIngredient(index)">
          {{ doneIngredients.includes(index) ? "Done" : "Idle" }}
        </button>
        {{ ingredient.name }} {{ ingredient.add ? "- " + ingredient.add : "" }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import addIngredientImpl from '@/logic/IngredientsLogic.js'
import getHopsAddTotalsImpl from '@/logic/IngredientsLogic.js'

export default {
  name: "Ingredients",
  props: {
    ingredientHeader: String,
    ingredientList: Array,
    isHops: Boolean,
  },

  mounted() {
    if (this.isHops) this.getHopsAddTotals();
  },

  computed: {
    ...mapState(["selectedBeer"]),
    ...mapGetters(["getSelectedBeer"]),
  },

  watch: {
    selectedBeer: function () {
      if (this.isHops) this.getHopsAddTotals();
      this.doneIngredients.length = 0;
    },
  },

  data() {
    return {
      hopCounter: {
        startHops: { added: 0, total: 0 },
        middleHops: { added: 0, total: 0 },
        endHops: { added: 0, total: 0 },
      },
      doneIngredients: [],
    };
  },

  methods: {
    addIngredient(index) {
      addIngredientImpl(this, index);
    },

    getHopsAddTotals() {
      getHopsAddTotalsImpl(this);
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
}

li {
  text-align: left;
}
</style>
