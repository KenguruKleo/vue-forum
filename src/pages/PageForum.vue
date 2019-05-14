<template>
  <div class="col-full">

    <ThreadList :threads="threads" />

  </div>
</template>

<script>

import ThreadList from '@/components/ThreadList.vue';

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
      const forum = this.$store.state.forums[this.id];
      return Object
        .values(forum.threads)
        .map(threadId => this.$store.state.threads[threadId]);
    },
  },
};

</script>
