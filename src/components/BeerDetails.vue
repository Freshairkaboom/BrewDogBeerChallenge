<template>
<div id="beer-info">

</div>
</template>

<script>
export default {
  name: 'BeerDetails',
  components: {
  },
  data() {
      return {
          selectedBeer: this.$store.state.selectedBeer
      }
  }
}
</script>
