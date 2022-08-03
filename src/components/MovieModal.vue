<template>
  <Transition>
    <div class="overlay" v-if="show" @click.self="overlayClicked">
      <div class="movie-modal" v-if="movie">
        <img :src="imgUrl(movie.backdrop_path)" :alt="movie.title">
        <i class="fa-regular fa-circle-xmark" @click="overlayClicked"></i>
        <div class="trailer-container" v-if="movie.videos?.results.length > 0">
          <div class="video-container">
            <iframe
                v-if="showTrailer"
                frameborder="0"
                allowfullscreen
                allow="autoplay; modestbranding; encrypted-media"
                :src="youtubeUrl(movie.videos.results[0].key)">
            </iframe>
          </div>
          <i
              class="fa-regular fa-circle-play"
              @click="openTrailer"
              v-if="!showTrailer">
          </i>
        </div>
        <div class="movie-info">
          <h2>{{ movie.title }}</h2>
          <p>{{ movie.tagline }}</p>
          <movie-rating :rating="movie.vote_average"></movie-rating>
          <div class="content">
            <p class="overview">{{ movie.overview }}</p>
            <div class="info">
              <ul class="info-list">
                <li>
                <span v-for="genre in movie.genres" :key="genre.id">
                  <router-link :to="{path: '/genre/' + genre.id}" @click="overlayClicked">
                    <span class="badge">{{ genre.name }}</span>
                  </router-link>
                </span>
                </li>
                <li><b>Data de Lançamento: </b>{{ dateFormat(movie.release_date) }}</li>
              </ul>
              <a
                  v-if="movie.imdb_id"
                  :href="imdbUrl(movie.imdb_id)"
                  class="external-site-logo"
                  target="_blank"
              >
                <i class="fab fa-imdb"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="loading" v-else>
        <i class="fa-solid fa-cog fa-spin"></i>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import MovieRating from "@/components/MovieRating.vue";
import {getMovieDetails, imgUrl, youtubeUrl} from "@/service/MoviesService";

export default defineComponent({
  name: "MovieModal",
  components: {MovieRating},
  emits: ['closeModal'],
  props: {
    id: {
      type: Number,
      required: false,
      default: null
    },
    showModal: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    id(newId) {
      this.getMovieData(newId);
    },
    showModal(newValue) {
      this.changeModalVisibility(newValue)
    }
  },
  setup(props, {emit}) {
    const movie = ref();
    const show = ref(props.showModal)
    const showTrailer = ref(false);
    const movieId = ref(props.id)

    const dateFormat = (date: string) => {
      const newDate = new Date(date);
      return `${newDate.getDay()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
    }

    const openTrailer = () => {
      showTrailer.value = true;
    }

    const getMovieData = (id: number) => {
      const response = getMovieDetails(id);
      response.then(response => {
        movie.value = response.data;
        show.value = true;
      })
    }

    const imdbUrl = (id: string) => `https://www.imdb.com/title/${id}/`;

    const changeModalVisibility = (visibility: boolean) => show.value = visibility

    const overlayClicked = () => {
      emit('closeModal')
      showTrailer.value = false;
      changeModalVisibility(false);
      movie.value = false
    }

    return {
      movieId,
      movie,
      show,
      changeModalVisibility,
      overlayClicked,
      imdbUrl,
      showTrailer,
      openTrailer,
      dateFormat,
      imgUrl,
      youtubeUrl,
      getMovieData
    }
  }
})
</script>


<style scoped lang="scss">
@import "@/assets/styles/variables.scss";

.v-enter-active, .v-leave-active {
  transition: opacity 200ms ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  width: 100vw;
  height: 100%;
  top: 0;
  left: 0;

  .loading i {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 5rem;
    margin-left: -2.5rem;
    margin-top: -2.5rem;
  }

  .movie-modal {
    border-radius: 1rem;
    width: 90%;
    min-height: 50%;
    background-color: $black;
    position: relative;
    top: 2rem;
    margin: 0 auto;

    img {
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;
      width: 100%;
      height: 56.25%;
    }

    .fa-circle-xmark {
      position: absolute;
      top: 1rem;
      right: 1rem;
      font-size: 1.5rem;
      cursor: pointer;
      z-index: 1;

      &:hover {
        color: $emphasis;
        transition: 300ms;
      }
    }

    .trailer-container {
      position: absolute;
      width: 100%;
      top: 0;
      height: 56.25vw;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.3);

      .video-container {
        position: relative;
        padding-bottom: 56.25%;
        width: 100%;

        iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }

      .fa-circle-play {
        position: relative;
        font-size: 3rem;
        top: -50%;
        transform: translate(0, -50%);
        cursor: pointer;

        &:hover {
          color: $emphasis;
          transition: 300ms;
        }
      }
    }

    .movie-info {
      position: relative;
      margin-top: -6rem;
      padding: 1rem;
      border-bottom-left-radius: 1rem;
      border-bottom-right-radius: 1rem;
      background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(68, 68, 68, 1) 25%);

      .content {
        .overview {
          line-height: 1.25rem;
        }

        .info {
          .info-list {
            list-style: none;
            padding-inline-start: 0;

            li {
              line-height: 1.5rem;

              .badge {
                background-color: $emphasis;
                padding: 1px 2px;
                border-radius: 5px;
                margin: 2px;
                display: inline-block;
                font-size: 0.9rem;
                color: $gray;
              }
            }
          }

          .external-site-logo {
            font-size: 2rem;
            color: $gray;
          }
        }
      }
    }
  }
}

@media screen and (min-width: 992px) {
  .overlay {
    .movie-modal {
      width: 780px;
      top: 10rem;

      .trailer-container {
        height: 480px;
      }

      .movie-info {
        .content {
          display: grid;
          grid-template-columns: 60% 40%;

          .info {
            padding-left: 1.5rem;
          }
        }
      }

      .fa-circle-play {
        font-size: 7rem;
      }
    }
  }
}

@media screen and (min-width: 1200px) {
  .overlay {
    .movie-modal {
      width: 992px;
      top: 6rem;
      .trailer-container {
        height: 600px;
      }
    }
  }
}
</style>
