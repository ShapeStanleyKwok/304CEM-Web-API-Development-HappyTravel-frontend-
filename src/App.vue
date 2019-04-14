<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  /**
   * fetch urls
   */
  mounted() {
    this.$store.dispatch("getServerUrls");
  }
};
</script>


<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
