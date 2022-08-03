<template>
  <header>
    <router-link class="app-name" to="/">NOW PLAYING</router-link>
    <nav>
      <div class="menu-item toggle-menu">
        <span class="menu-title" @click="toggleMenu">Gêneros</span>
        <i class="fa-solid fa-caret-down icon-desktop"></i>
        <i class="fa-solid fa-bars icon-mobile" @click="toggleMenu"></i>
        <div class="menu-overlay" v-if="showMenu" @click="toggleMenu">
          <ul>
            <li v-for="genre in genres" :key="genre.id">
              <router-link :to="`/genre/${genre.id}`">{{genre.name}}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from "vue";
import {useStore} from "vuex";
import {LIST_GENRES_FROM_API} from "@/store/movies_actions";

export default defineComponent({
  name: "AppHeader",
  setup() {
    const store = useStore();
    store.dispatch(LIST_GENRES_FROM_API);
    const genres = computed(() => store.state.genres);
    const showMenu = ref(false);

    const toggleMenu = () => showMenu.value = !showMenu.value;

    return {
      genres,
      showMenu,
      toggleMenu
    }
  }
}
)
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables.scss";
.desktop-menu {
  display: none;
}
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.7);
}
.app-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: $emphasis;
  margin-right: 1rem;
  text-decoration: none;
  display: inline-block;
  order: 2;
}
header {
  display: flex;
  align-items: center;
  padding: 0.25rem;
}
nav {
  display: inline-block;
  padding: 0;
  order: 1;
}
.toggle-menu {
  position: relative;
  display: inline-block;
  margin: 0 0.5rem;
  cursor: pointer;
  font-weight: bold;
  .menu-title {
    display: none;
  }
  .icon-desktop {
    display: none;
  }
  .icon-mobile {
    display: block;
  }
  ul {
    position: absolute;
    min-width: 50vw;
    height: 100vh;
    z-index: 1;
    line-height: 1.5rem;
    background-color: $dark-gray;
    list-style: none;
    margin-top: 0;
    padding: 0;
    display: block;
    left: 0;
    li {
      width: 100%;
      &:hover {
        background-color: $emphasis;
      }
      a {
        text-decoration: none;
        margin-left: 0;
        padding: 6px;
        display: inline-block;
      }
    }
  }
}
@media screen and (min-width: 992px){
  .desktop-menu {
    display: inline-block;
    list-style: none;
    padding-inline-start: 0;
    li {
      display: inline-block;
      margin-left: 0;
      a {
        text-decoration: none;
        margin: 0 0.25rem;
        &:hover {
          color: $emphasis;
        }
      }
    }
  }
  .menu-overlay {
    position: static;
    background-color: transparent;
    overflow: auto;
  }
  header {
    background-color: $black;
    padding: 0.5rem 1rem;
  }
  .app-name {
    order: 1;
  }
  nav {
    display: inline-block;
    padding: 0;
    order: 2;
    .toggle-menu {
      .menu-title {
        display: inline-block;
      }
      .icon-desktop {
        display: inline-block;
        margin: 0 0.25rem;
      }
      .icon-mobile {
        display: none;
      }
      ul {
        min-width: 150px;
        height: auto;
        margin-top: 0;
      }
    }
  }
}
</style>
