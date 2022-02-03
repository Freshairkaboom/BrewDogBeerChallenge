// Child component of BeerDetails
<template>
  <div>
    <h2>Methods</h2>
    <ul>
      <li>
        <button class="idleButton" v-on:click="mashBeer()">
          {{mashButtonMsg}}
        </button>
        Mashing - Duration: {{ mashCounter }} seconds left. ({{currentMashIndex+1}}/{{selectedBeer.method.mash_temp.length}})
      </li>
      <li>
        <button class="idleButton" v-on:click="fermentBeer()">
          {{fermentButtonMsg}}
        </button> Fermentation
      </li>
      <li>
        <button class="idleButton" v-on:click="addTwist()">
          {{twistButtonMsg}}
        </button> Twist
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import mashBeerImpl from '@/logic/MethodsLogic.js';

export default {
  name: "Methods",

  computed: {
    ...mapState(["selectedBeer"]),
    ...mapGetters(["getSelectedBeer"]),
  },

  mounted() {
    this.mashCounter =
      this.selectedBeer.method.mash_temp[this.currentMashIndex].duration*60;
  },

  watch: {
    selectedBeer: function () {
      var interval;

      clearInterval(interval);
      this.currentMashIndex = 0;
      this.isRunning = false;

      this.mashCounter =
      this.selectedBeer.method.mash_temp[this.currentMashIndex].duration*60;
    },
  },

  data() {
    return {
      currentMashIndex: 0,
      mashCounter: 0,
      mashButtonMsg: "Idle",
      fermentButtonMsg: "Idle",
      twistButtonMsg: "Idle",
      isRunning: false,
    };
  },

  methods: {
    mashBeer() {
      mashBeerImpl(this)
    },

    fermentBeer() {
      this.fermentButtonMsg = "Done";
    },

    addTwist() {
      this.twistButtonMsg = "Done";
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
