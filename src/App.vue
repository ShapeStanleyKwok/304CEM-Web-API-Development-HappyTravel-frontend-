<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  /**
   * fetch urls and auto login
   */
  mounted() {
    this.$store.dispatch("getServerUrls");

    const _id = this.$cookies.get("_id");
    if (_id) {
      this.$store.dispatch("getUserInfo", { _id });
    }
  }
};
</script>


<style>
#app {
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
