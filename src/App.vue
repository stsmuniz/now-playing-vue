<template>
  <app-header/>
  <router-view/>
  <app-footer/>
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
import AppFooter from "@/components/AppFooter";
console.log(process.env)
export default {
  components: {AppFooter, AppHeader}
}
</script>
