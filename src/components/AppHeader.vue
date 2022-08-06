<template>
  <header>
    <div class="nav-items">
      <router-link class="app-name" to="/">NOW PLAYING</router-link>
      <nav>
        <div class="menu-item toggle-menu">
          <span @click="toggleMenu">
            <span class="menu-title">Gêneros</span>
            <i class="fa-solid fa-caret-down icon-desktop"></i>
            <i class="fa-solid fa-bars icon-mobile"></i>
          </span>
          <div class="menu-overlay" v-if="showMenu" @click.self="toggleMenu">
            <ul>
              <li class="search-container">
                <form v-on:submit.prevent="search" class="search-form-mobile">
                  <input type="search" v-model.trim="searchTerm">
                  <button type="submit"><i class="fa fa-search"></i> </button>
                </form>
              </li>
              <li v-for="genre in genres" :key="genre.id" @click="toggleMenu">
                <router-link :to="`/genre/${genre.id}`">{{genre.name}}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <form v-on:submit.prevent="search" class="search-form">
      <input type="search" v-model.trim="searchTerm">
      <button type="submit"><i class="fa fa-search"></i> </button>
    </form>
  </header>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from "vue";
import {useStore} from "vuex";
import {LIST_GENRES_FROM_API} from "@/store/movies_actions";
import router from "@/router";

export default defineComponent({
  name: "AppHeader",
  setup() {
    const store = useStore();
    store.dispatch(LIST_GENRES_FROM_API);
    const genres = computed(() => store.state.genres);
    const showMenu = ref(false);
    const searchTerm = ref()

    const toggleMenu = () => showMenu.value = !showMenu.value;

    const search = () => {
      if (searchTerm.value) {
        toggleMenu()
      }
      return searchTerm.value
          ? router.push({name: 'search', params: {term: searchTerm.value}})
          : null;
    };

    return {
      genres,
      showMenu,
      search,
      searchTerm,
      toggleMenu
    }
  }
}
)
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables.scss";
.search-form, .search-form-mobile {
  order: 3;
  display: none;
  input[type=search] {
    border-radius: 100px;
    padding: 5px;
    color: $gray;
    background-color: $dark-gray;
    border: 1px solid $gray;
    margin-right: 0.5rem;
  }
  button[type=submit] {
    border-radius: 100px;
    padding: 5px 7px;
    color: $gray;
    background-color: $black;
    border: 1px solid $gray;
  }
}
.search-form-mobile {
  display: block;
  padding: 4px;
  input[type=search] {
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    padding-right: 0;
    margin-right: 0;
  }
  button[type=submit] {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    border-left: 0;
    background-color: $dark-gray;
    margin-left: 0;

  }
}
.nav-items {
  display: flex;
  align-items: center;
}
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
  background-image: linear-gradient(to bottom, rgba(23,23,23,0.9) 0%, rgba(23,23,23,0.7) 60%, rgba(23,23,23,0));
  position: absolute;
  top: 0;
  width: 100vw;
  z-index: 1;
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
    li:not(.search-container) {
      width: 100%;
      &:hover {
        background-color: $emphasis;
        color: $gray;
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
@media screen and (min-width: 768px) {
  header {
    justify-content: space-between;
    position: static;
    top: inherit;
    width: initial;
  }
  .search-form {
    display: block;
  }
  .search-form-mobile {
    display: none;
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
