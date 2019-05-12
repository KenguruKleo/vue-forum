<template>
  <div class="col-full">
    <h1 :class="$style['heading-large']">Not Found</h1>
    <p :class="$style['text-large']">
      Ooops, we couldn't find what are you looking for... Why don't you
    </p>
    <router-link :to="{ name: 'Home' }">go Home</router-link>
  </div>
</template>

<script>

export default {
  name: 'NotFound',
};

</script>

<style module>
  .heading-large {
    font-size: 100px;
  }

  .text-large {
    font-size: 50px;
  }
</style>
