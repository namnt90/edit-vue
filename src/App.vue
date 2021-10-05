<template>
  <div id="app">
    <Home></Home>
  </div>
</template>

<script>
import Home from "./pages/home/index";
export default {
  name: "App",
  components: {
    Home
  }
};
</script>

<style lang="scss" scoped>
#app {
  text-align: auto;
}
</style>
