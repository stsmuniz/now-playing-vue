<template>
  <section v-if="movies">
    <carousel :settings="carouselSettings">
      <slide v-for="movie in movies" :key="movie.id">
        <div
            class="carousel__item movie-banner"
            :style="{backgroundImage: 'url(' + imgUrl(movie.backdrop_path, 'w1280') + ')'}"
            @click="openModal(movie.id)"
        >
          <div class="movie-info">
            <p class="movie-title">{{movie.title}}</p>
            <movie-rating :rating="movie.vote_average"/>
          </div>
        </div>
      </slide>
      <template #addons>
        <pagination/>
      </template>
    </carousel>
  </section>
  <div class="loading" v-else>
    <i class="fa-solid fa-ticket fa-fade"></i>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import iMovie from "@/interfaces/iMovie";
import {imgUrl} from "@/service/MoviesService";

import 'vue3-carousel/dist/carousel.css';
// eslint-disable-next-line
// @ts-ignore
import {Carousel, Slide, Pagination} from 'vue3-carousel';
import MovieRating from "@/components/MovieRating.vue";


export default defineComponent({
  name: "MoviesBanner",
  components: {MovieRating, Carousel, Slide, Pagination},
  emits: ['onOpenModal'],
  props: {
    movies: {
      type: Object as PropType<iMovie>,
      required: false
    }
  },
  setup(props, {emit}) {
    const openModal = (movieId: number): void => {
      emit('onOpenModal', movieId);
    }

    const carouselSettings = {
      itemsToShow: 1,
      snapAlign: 'center',
      wrapAround: true,
      autoplay: 4000,
      pauseAutoplayOnHover: true
    }
    return {
      openModal,
      carouselSettings,
      imgUrl
    }
  }
})
</script>

<style lang="scss">
@import "@/assets/styles/variables.scss";

.movie-grid {
  display: flex;
  flex-direction: column;
}

.carousel__item {
  &.movie-banner {
    width: 100%;
    height: 50vw;

    background-position: center 30%;
    background-size: cover;
    text-align: left;
    cursor: pointer;
    .movie-info {
      position: absolute;
      padding: 1.5rem;
      bottom: 0;
      background-image: linear-gradient(to bottom, rgba(23, 23, 23, 0), rgba(23, 23, 23,1));
      .movie-title {
        font-size: 1.5rem;
        font-weight: bold;
      }
    }
  }
  .poster {
    left: 0;
  }

  .movie-info {
    width: 100%;
    text-align: left;
  }
}

.carousel__pagination-button {
  background-color: $gray;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }

  &.carousel__pagination-button--active {
    background-color: $emphasis;
  }
}

.carousel__prev, .carousel__next {
  background-color: transparent;
}

.carousel__pagination {
  position: absolute;
  width: 100%;
  padding: 0;
  bottom: 0;
  z-index: 1;
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
  .carousel__item {
    &.movie-banner {
      height: 35vw;
      background-position: center 10%;
    }
  }
}
</style>
