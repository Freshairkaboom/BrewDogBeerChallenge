// Child component of BeerDetails
<template>
  <div>
    <h2>Methods</h2>
    <ul>
      <li>
        <button class="idleButton" v-on:click="mashBeer()" ref="buttonMash">
          Idle
        </button>
        Mashing - Duration: {{ this.mashCounter }} seconds left. ({{currentMashIndex+1}}/{{this.selectedBeer.method.mash_temp.length}})
      </li>
      <li>
        <button class="idleButton" v-on:click="fermentBeer()" ref="buttonFerment">Idle</button> Fermentation
      </li>
      <li>
        <button class="idleButton" v-on:click="addTwist()" ref="buttonTwist">Idle</button> Twist
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

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
        clearInterval(this.startInterval);
        this.currentMashIndex = 0;
        this.isRunning = false;

      this.mashCounter =
        this.selectedBeer.method.mash_temp[this.currentMashIndex].duration*60;

      var buttonList = document.getElementsByClassName("idleButton");

      for (var i = 0; i < buttonList.length; i++) {
        buttonList[i].innerHTML = "Idle";
      }
    },
  },

  data() {
    return {
      currentMashIndex: 0,
      mashCounter: 0,
      startInterval: null,
      isRunning: false,
    };
  },

  methods: {
    mashBeer() {
      this.isRunning = !this.isRunning;

      if (this.isRunning) {
        this.$refs.buttonMash.innerHTML = "Running";
        this.startInterval = setInterval(this.mashTimer, 1000);
      }
      if (!this.isRunning) {
        clearInterval(this.startInterval);
        this.$refs.buttonMash.innerHTML = "Paused";
      }
    },

    mashTimer() {
      if (this.mashCounter <= 0) {
        clearInterval(this.mashCounter);

        if (this.selectedBeer.method.mash_temp.length == 1) {
            this.$refs.buttonMash.innerHTML = "Done"
            this.isRunning = false;
        }
        else if (
            this.selectedBeer.method.mash_temp.length > 1 &&
            this.currentMashIndex != this.selectedBeer.method.mash_temp.length - 1
        ) {
            this.currentMashIndex++;
            this.mashCounter =
            this.selectedBeer.method.mash_temp[this.currentMashIndex].duration*60;
        } else if (
            this.currentMashIndex >= this.selectedBeer.method.mash_temp.length - 1
        ) {
             this.$refs.buttonMash.innerHTML = "Done";
             this.isRunning = false;
        }
        } else this.mashCounter--;
    },

    fermentBeer() {
      this.$refs.buttonFerment.innerHTML = "Done";
    },

    addTwist() {
      this.$refs.buttonTwist.innerHTML = "Done";
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
