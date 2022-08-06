<template>
  <h1>{{ sectionTitle }}</h1>
  <section v-if="movies">
    <carousel :settings="carouselSettings" :breakpoints="carouselBreakpoints">
      <slide v-for="movie in movies" :key="movie.id">
        <movie-grid-item
            class="carousel__item"
            :key="movie.id"
            :movie="movie"
            @click="openModal(movie.id)"
        />
      </slide>
      <template #addons>
        <navigation/>
      </template>
    </carousel>
  </section>
  <div class="loading" v-else>
    <i class="fa-solid fa-ticket fa-fade"></i>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import MovieGridItem from "@/components/MovieGridItem.vue";
import iMovie from "@/interfaces/iMovie";

import 'vue3-carousel/dist/carousel.css';
// eslint-disable-next-line
// @ts-ignore
import {Carousel, Slide, Navigation} from 'vue3-carousel';


export default defineComponent({
  name: "MoviesCarousel",
  components: {MovieGridItem, Carousel, Slide, Navigation},
  emits: ['onOpenModal'],
  props: {
    sectionTitle: {
      type: String,
      required: true,
      default: ''
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

    const carouselSettings = {
      itemsToShow: 1,
      snapAlign: 'center',
      wrapAround: true
    }

    const carouselBreakpoints = {
      768: {
        itemsToShow: 3,
        snapAlign: 'center',
      },
      992: {
        itemsToShow: 3.5,
        snapAlign: 'start',
      },
      1600: {
        itemsToShow: 5.5,
        snapAlign: 'start',
      }
    }
    return {
      openModal,
      carouselSettings,
      carouselBreakpoints
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
  width: 100%;

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

  &.carousel__pagination-button--active {
    background-color: $emphasis;
  }
}

.carousel__prev, .carousel__next {
  background-color: transparent;
}

.carousel__pagination {
  display: none;
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
  .carousel__pagination {
    display: flex;
  }
}
</style>
