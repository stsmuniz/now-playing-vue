<template>
  <div class="home">
    <movies-carousel
        section-title="Mais populares"
        :movies="popularMovies"
        @onOpenModal="getMovieData"
    />
    <movies-carousel
        section-title="Lançamentos"
        :movies="upcomingMovies"
        @onOpenModal="getMovieData"
    />
    <movies-carousel
        section-title="Melhores Filmes"
        :movies="topMovies"
        @onOpenModal="getMovieData"
    />
    <movies-carousel
        section-title="Nos cinemas"
        :movies="nowPlaying"
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
import {getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies} from "@/service/MoviesService";
import MovieModal from "@/components/MovieModal.vue";
import MoviesCarousel from "@/components/MoviesCarousel.vue";
import AppFooter from "@/components/AppFooter.vue";

export default defineComponent({
  name: 'HomeView',
  components: {
    AppFooter,
    MoviesCarousel,
    MovieModal,
  },
  setup() {
    const popularMovies = ref();
    const upcomingMovies = ref();
    const topMovies = ref();
    const nowPlaying = ref();
    const movieId = ref();
    const showModal = ref(false)

    onMounted(() => {
      getPopularMovies()
          .then(response => popularMovies.value = response.data.results)
      getUpcomingMovies()
          .then(response => upcomingMovies.value = response.data.results)
      getTopRatedMovies()
          .then(response => topMovies.value = response.data.results)
      getNowPlayingMovies()
          .then(response => nowPlaying.value = response.data.results)
    })

    const getMovieData = (id: number) => {
      movieId.value = id;
      showModal.value = true;
    }

    const cleanModalData = () => {
      movieId.value = null;
      showModal.value = false;
    }

    return {
      cleanModalData,
      popularMovies,
      nowPlaying,
      topMovies,
      upcomingMovies,
      movieId,
      getMovieData,
      showModal
    }
  }
});
</script>

<style scoped lang="scss">
.home {
  padding: 0 1rem;
}
</style>
