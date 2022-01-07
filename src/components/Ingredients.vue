// Child component of BeerDetails
<template>
  <div>
    <h2>{{ ingredientHeader ? ingredientHeader : "" }}</h2>
    <ul>
      <li v-for="(ingredient, index) in ingredientList" :key="index + ingredient">
        <button class="idleButton" :id="`${ingredient.name} ${index}`" v-on:click="addIngredient(ingredient.add, $event)">Idle</button>
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
    if(this.isHops) this.getHopsAddTotals();
  },

  computed: {
    ...mapState(["selectedBeer"]),
    ...mapGetters(["getSelectedBeer"]),
  },

  watch: {
    selectedBeer: function () {
        if(this.isHops) this.getHopsAddTotals();
        this.resetButtonsToIdle();
    },
  },

  data() {
    return {
      startHops: { added: 0, total: 0 },
      middleHops: { added: 0, total: 0 },
      endHops: { added: 0, total: 0 },
      hopValues(ingredientOrder) {
          alert("hei")
          this.incrementHopValues(ingredientOrder);
      }
    };
  },

  methods: {
    addIngredient(ingredientOrder, event) {
        var isCorrectOrder;

        if(this.ingredientList[0].add) isCorrectOrder = this.checkIfCorrectOrder(ingredientOrder);
        else isCorrectOrder = true;

        if (isCorrectOrder) {
            this.incrementHopValues(ingredientOrder);
            event.target.innerHTML = "Done";
        }
    },

    incrementHopValues(ingredientOrder) {
      if (
        ingredientOrder == "start" &&
        this.startHops.added < this.startHops.total
      )
        this.startHops.added++;
      else if (
        ingredientOrder == "middle" &&
        this.middleHops.added < this.middleHops.total
      )
        this.middleHops.added++;
      else if (
        ingredientOrder == "end" &&
        this.endHops.added < this.endHops.total
      )
        this.endHops.added++;
    },

    checkIfCorrectOrder(ingredientOrder) {
      if (ingredientOrder == "start") return true;
      else if (ingredientOrder == "middle") {
          if(this.startHops.added == this.startHops.total) return true;
      }
      else if (ingredientOrder == "end") {
          if(this.startHops.added == this.startHops.total && this.middleHops.added == this.middleHops.total) return true;
      }
      return false;
    },

    getHopsAddTotals() {
      this.startHops = { added: 0, total: 0 };
      this.middleHops = { added: 0, total: 0 };
      this.endHops = { added: 0, total: 0 };

      for (var i = 0; i < this.ingredientList.length; i++) {
        if (this.ingredientList[i].add == "start") this.startHops.total++;
        else if (this.ingredientList[i].add == "middle")
          this.middleHops.total++;
        else if (this.ingredientList[i].add == "end") this.endHops.total++;
      }
    },

    resetButtonsToIdle() {
      var buttonList = document.getElementsByClassName("idleButton");

      for (var j = 0; j < buttonList.length; j++) {
        buttonList[j].innerHTML = "Idle";
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
