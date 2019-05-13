<template>
  <div class="col-full">

    <ThreadList :threads="threads" />

  </div>
</template>

<script>

import ThreadList from '@/components/ThreadList.vue';

import { forums, threads } from '@/data.json';

export default {
  components: {
    ThreadList,
  },
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  computed: {
    threads() {
      const forum = forums[this.id];
      return Object
        .values(forum.threads)
        .map(threadId => threads[threadId]);
    },
  },
};

</script>
