<template>
  <div id="app">

    <TheNavbar />

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>

import TheNavbar from '@/components/TheNavbar.vue';

export default {
  components: {
    TheNavbar,
  },
};
</script>

<style lang="scss">
  @import './styles/style.scss';
  @import '../node_modules/font-awesome/css/font-awesome.min.css';
</style>
