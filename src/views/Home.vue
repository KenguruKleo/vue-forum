<template>
  <div class="col-full">

    <ThreadList :threads="threads" />

  </div>
</template>

<script>

import ThreadList from '@/components/ThreadList.vue';

import { threads } from '@/data.json';

export default {
  name: 'home',
  components: {
    ThreadList,
  },
  data() {
    return {
      threads: Object.values(threads),
    };
  },
};

</script>
