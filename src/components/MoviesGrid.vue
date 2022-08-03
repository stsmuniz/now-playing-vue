<template>
  <h1>{{ sectionTitle }}</h1>
  <section class="movie-grid" v-if="movies">
    <movie-grid-item
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        @click="openModal(movie.id)"
    />
  </section>
  <div class="loading" v-else>
    <i class="fa-solid fa-ticket fa-fade"></i>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import MovieGridItem from "@/components/MovieGridItem.vue";
import iMovie from "@/interfaces/iMovie";


export default defineComponent({
  name: "MoviesGrid",
  components: {MovieGridItem},
  emits: ['onOpenModal'],
  props: {
    sectionTitle: {
      type: String,
      required: true
    },
    movies: {
      type: Object as PropType<iMovie>,
      required: false
    }
  },
  setup(props, {emit}) {
    const openModal = (movieId: number): void => {
      emit('onOpenModal', movieId);
    }
    return {
      openModal
    }
  }
})
</script>

<style lang="scss">
.movie-grid {
  display: flex;
  flex-direction: column;
}

.loading i {
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: 5rem;
  margin-left: -2.5rem;
  margin-top: -2.5rem;
}

@media screen and (min-width: 768px) {
  .movie-grid {
    display: grid;
    grid-template-columns: repeat(4, auto);
  }
}
</style>
