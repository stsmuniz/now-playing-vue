<template>
  <app-header/>
  <router-view/>
</template>

<style lang="scss">
@import "assets/styles/variables";
body {
  color: $gray;
  background-color: $black;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: $gray;

    &.router-link-exact-active {
      color: $emphasis;
    }
  }
}
</style>

<script>
import AppHeader from "@/components/AppHeader";
export default {
  components: {AppHeader}
}
</script>
