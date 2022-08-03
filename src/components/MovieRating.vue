<template>
  <i
      class="fa-solid fa-star"
      v-for="index in ratingValue" :key="index"
  >
  </i>
  <i class="fa-solid fa-star-half-stroke" v-if="!isFullNumber"></i>
  <i
      class="fa-regular fa-star"
      v-for="index in missingRating" :key="index"
  >
  </i>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
export default defineComponent({
  name: 'MovieRating',
  props: {
    rating: {
      type: Number,
      required: true,
      default: 0
    }
  },
  setup (props) {
    const isFullNumber = Number.isInteger(props.rating);
    const rating = isFullNumber ? ref(props.rating) : ref(Math.floor(props.rating));
    const missingRating = isFullNumber ? 10 - rating.value : 10 - (rating.value + 1);
    return {
      ratingValue: rating.value,
      isFullNumber,
      missingRating
    }
  }
})
</script>

<style lang="scss">
  @import "@/assets/styles/variables.scss";
  .fa-star , .fa-star-half-stroke{
    color: $emphasis;
  }
</style>
