<template>
  <div class="movie-poster" @click="movieClicked">
        <img
        class="poster"
        :src="imgUrl(movie.backdrop_path)"
        :alt="movie.title" />
    <div class="movie-info">
      <p class="title">{{movie.title}}</p>
      <movie-rating :rating="movie.vote_average" />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, ref} from "vue";
import MovieRating from "@/components/MovieRating.vue";
import iMovie from "@/interfaces/iMovie";
import {imgUrl} from "@/service/MoviesService";

export default defineComponent({
  name: 'MovieGridItem',
  components: {MovieRating},
  emits: ['onMovieClicked'],
  props: {
    movie: {
      type: Object as PropType<iMovie>,
      required: true
    },
  },
  setup (props, {emit}) {
    const movie = ref(props.movie);

    const movieClicked = (): void => {
      emit('onMovieClicked', movie.value.id)
    }

    return {
      imgUrl,
      movieClicked,
    }
  }
})
</script>

<style lang="scss">
@import "@/assets/styles/variables.scss";
  .movie-poster {
    position: relative;
    transform: scale(0.9);
    cursor: pointer;
    background-color: $gray;
    padding-bottom: 56.25%;
    .poster {
      width: 100%;
      position: absolute;
    }
    &:hover, &.active {
      transform: scale(1);
      transition: 200ms;
    }
    .movie-info {
      position: absolute;
      width: 90%;
      bottom: 0;
      padding: 5%;
      background-image: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.9));
      .title {
        font-size: 1.5rem;
        font-weight: bold;
      }
    }
  }
</style>
