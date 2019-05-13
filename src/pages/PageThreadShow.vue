<template>
  <ThreadItem :id="id"/>
</template>

<script>

import ThreadItem from '@/components/ThreadItem.vue';

export default {
  components: {
    ThreadItem,
  },
  props: {
    id: {
      required: true,
      type: String,
    },
  },
};

</script>

<style scoped>

</style>
