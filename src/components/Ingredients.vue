// Child component of BeerDetails
<template>
  <div>
    <h2>{{ ingredientHeader ? ingredientHeader : "" }}</h2>
    <ul>
      <li
        v-for="(ingredient, index) in ingredientList"
        :key="index + ingredient"
      >
        <button v-on:click="addIngredient(ingredientList, hopCounter, index, doneIngredients, checkIfCorrectOrder, incrementHopValues, isHops)">
          {{ doneIngredients.includes(index) ? "Done" : "Idle" }}
        </button>
        {{ ingredient.name }} {{ ingredient.add ? "- " + ingredient.add : "" }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Ingredients",
  props: {
    ingredientHeader: String,
    ingredientList: Array,
    isHops: Boolean,
  },

  mounted() {
    console.log(this);
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
    addIngredient(ingredientList, hopCounter, index, doneIngredients, checkIfCorrectOrder, incrementHopValues, isHops) {
      var isCorrectOrder;
      var ingredientOrder;

      if (ingredientList[index]) {
        ingredientOrder = ingredientList[index].add;
        isCorrectOrder = checkIfCorrectOrder(ingredientOrder, hopCounter);
      }
      else isCorrectOrder = false;
      if(!isHops) isCorrectOrder = true;

      if (isCorrectOrder) {
        incrementHopValues(ingredientOrder, hopCounter);
        doneIngredients.push(index);
      }
    },

    checkIfCorrectOrder(ingredientOrder, hopCounter) {
      if (ingredientOrder == "start") return true;
      else if (ingredientOrder == "middle") {
        if (hopCounter.startHops.added == hopCounter.startHops.total)
          return true;
      } else if (ingredientOrder == "end") {
        if (
          hopCounter.startHops.added == hopCounter.startHops.total &&
          hopCounter.middleHops.added == hopCounter.middleHops.total
        )
          return true;
      }
      else if(ingredientOrder == "dry hop") return true;
      return false;
    },

    incrementHopValues(ingredientOrder, hopCounter) {
      if (
        ingredientOrder == "start" &&
        hopCounter.startHops.added < hopCounter.startHops.total
      )
        hopCounter.startHops.added++;
      else if (
        ingredientOrder == "middle" &&
        hopCounter.middleHops.added < hopCounter.middleHops.total
      )
        hopCounter.middleHops.added++;
      else if (
        ingredientOrder == "end" &&
        hopCounter.endHops.added < hopCounter.endHops.total
      )
        hopCounter.endHops.added++;
    },

    getHopsAddTotals() {
      this.hopCounter.startHops = { added: 0, total: 0 };
      this.hopCounter.middleHops = { added: 0, total: 0 };
      this.hopCounter.endHops = { added: 0, total: 0 };

      for (var i = 0; i < this.ingredientList.length; i++) {
        if (this.ingredientList[i].add == "start")
          this.hopCounter.startHops.total++;
        else if (this.ingredientList[i].add == "middle")
          this.hopCounter.middleHops.total++;
        else if (this.ingredientList[i].add == "end")
          this.hopCounter.endHops.total++;
      }
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
