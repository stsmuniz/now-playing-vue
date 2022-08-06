<template>
  <div class="home">
    <movies-grid
        :section-title="`Resultados para sua busca por: ${decodeURI(decodeURIComponent(searchTerm))}`"
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
import {defineComponent, onMounted, ref} from 'vue';
import {searchMovies} from "@/service/MoviesService";
import MoviesGrid from "@/components/MoviesGrid.vue";
import MovieModal from "@/components/MovieModal.vue";
import AppFooter from "@/components/AppFooter.vue";

export default defineComponent({
  name: 'SearchView',
  components: {
    AppFooter,
    MovieModal,
    MoviesGrid
  },
  props: {
    term: {
      type: String,
      required: true
    }
  },
  watch: {
    term(newTerm) {
      this.getData(newTerm)
      this.searchTerm = newTerm
    }
  },
  setup(props) {
    const movies = ref();
    const movieId = ref();
    const showModal = ref(false);
    const searchTerm = ref(props.term);

    onMounted(() => {
      getData(props.term)
    })

    const getMovieData = (id: number) => {
      movieId.value = id;
      showModal.value = true
    }

    const getData = (term: string) => {
      searchMovies(term)
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
      movies,
      movieId,
      getMovieData,
      getData,
      searchTerm,
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
