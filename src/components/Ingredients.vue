// Child component of BeerDetails
<template>
  <div>
    <h2>{{ ingredientHeader ? ingredientHeader : "" }}</h2>
    <ul>
      <li v-for="(ingredient, index) in ingredientList" :key="index + ingredient">
        <button class="idleButton" v-on:click="addIngredient(index)">
          {{doneIngredients.includes(index) ? "Done" : "Idle"}}
          </button>
        {{ ingredient.name }} {{ ingredient.add ? "- " + ingredient.add : "" }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import addIngredientImpl from '@/logic.js';

export default {
  name: "Ingredients",
  props: {
    ingredientHeader: String,
    ingredientList: Array,
    isHops: Boolean,
  },

  mounted() {
    if(this.isHops) this.getHopsAddTotals();
  },

  computed: {
    ...mapState(["selectedBeer"]),
    ...mapGetters(["getSelectedBeer"]),
  },

  watch: {
    selectedBeer: function () {
        if(this.isHops) this.getHopsAddTotals();
        // this.resetButtonsToIdle();
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
      doneIngredients: []
    };
  },

  methods: {
    addIngredient(index) {
      console.log("doneIngredients: " + this.doneIngredients)
      addIngredientImpl(this.ingredientList, this.hopCounter, index, this.doneIngredients);
    },

    getHopsAddTotals() {
      this.hopCounter.startHops = { added: 0, total: 0 };
      this.hopCounter.middleHops = { added: 0, total: 0 };
      this.hopCounter.endHops = { added: 0, total: 0 };

      for (var i = 0; i < this.ingredientList.length; i++) {
        if (this.ingredientList[i].add == "start") this.hopCounter.startHops.total++;
        else if (this.ingredientList[i].add == "middle")
          this.hopCounter.middleHops.total++;
        else if (this.ingredientList[i].add == "end") this.hopCounter.endHops.total++;
      }

      // console.log("Start: " + this.hopCounter.startHops.total)
      // console.log("Middle: " + this.hopCounter.middleHops.total)
      // console.log("End: " + this.hopCounter.endHops.total)
    },

    // resetButtonsToIdle() {
    //   var buttonList = document.getElementsByClassName("idleButton");

    //   for (var j = 0; j < buttonList.length; j++) {
    //     buttonList[j].innerHTML = "Idle";
    //   }
    // },
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
