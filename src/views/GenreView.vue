<template>
  <div class="home">
    <movies-grid
        :section-title="genre?.name"
        :movies="movies"
        @onOpenModal="getMovieData"
    />
    <movie-modal
        :id="movieId"
        :show-modal="showModal"
        @closeModal="cleanModalData"
    />
  </div>
  <AppFooter />
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref} from 'vue';
import {getMoviesByGenre} from "@/service/MoviesService";
import MoviesGrid from "@/components/MoviesGrid.vue";
import MovieModal from "@/components/MovieModal.vue";
import AppFooter from "@/components/AppFooter.vue";
import {GET_GENRE_BY_ID} from "@/store/movies_actions";

import { useStore } from 'vuex';

export default defineComponent({
  name: 'GenreView',
  components: {
    AppFooter,
    MovieModal,
    MoviesGrid
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  watch: {
    id(newId) {
      this.getData(newId)
      this.getGenreData(newId)
    }
  },
  setup(props) {
    const store = useStore();
    const movies = ref();
    const movieId = ref();
    const showModal = ref(false);
    const genre = ref()

    store.dispatch(GET_GENRE_BY_ID, props.id);
    genre.value = computed(() => store.state.genre);

    onMounted(() => {
      getData(props.id)
    })

    const getGenreData = (id: number) => {
      store.dispatch(GET_GENRE_BY_ID, id);
      genre.value = computed(() => store.state.genre);
    }

    const getMovieData = (id: number) => {
      movieId.value = id;
      showModal.value = true
    }

    const getData = (id: string) => {
      getMoviesByGenre(id)
        .then(response => {
        movies.value = response.data.results
      })
    }

    const cleanModalData = () => {
      movieId.value = null;
      showModal.value = false;
    }

    return {
      cleanModalData,
      genre: genre.value,
      getGenreData,
      movies,
      movieId,
      getMovieData,
      getData,
      showModal
    }
  }
});
</script>
<style scoped lang="scss">
.home {
  margin-top: 3rem;
  padding: 0 1rem;
}
</style>
