<template>
  <div class="forum-wrapper">
    <div class="col-full push-top">
      <div class="forum-header">
        <div class="forum-details">
          <h1>{{forum.name}}</h1>
          <p class="text-lead">{{forum.description}}</p>
        </div>
        <router-link
          :to="{ name: 'ThreadCreate', params: { forumId: this.forum['.key'] } }"
          class="btn-green btn-small"
        >
          Start a thread
        </router-link>
      </div>
    </div>

    <div class="col-full">

      <ThreadList :threads="threads" />

    </div>
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
    forum() {
      return this.$store.state.forums[this.id];
    },
    threads() {
      const forum = this.$store.state.forums[this.id];
      return Object
        .values(forum.threads)
        .map(threadId => this.$store.state.threads[threadId]);
    },
  },
};

</script>
