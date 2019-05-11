<template>
  <ThreadItem :id="this.$attrs.id"/>
</template>

<script>

import ThreadItem from '@/components/ThreadItem.vue';

export default {
  components: {
    ThreadItem,
  },
};

</script>

<style scoped>

</style>
