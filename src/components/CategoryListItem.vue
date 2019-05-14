<template>
  <div class="forum-list">

    <h2 class="list-title">
      <router-link :to="{ name: 'Category', params: { id: category['.key'] } }">
        {{ category.name }}
      </router-link>
    </h2>

    <ForumList :forums="forums" />

  </div>
</template>

<script>

import ForumList from '@/components/ForumList.vue';

export default {
  components: { ForumList },
  props: {
    category: {
      required: true,
      type: Object,
    },
  },
  computed: {
    forums() {
      return Object
        .values(this.category.forums)
        .map(forumId => this.$store.state.forums[forumId]);
    },
  },
};
</script>

<style scoped>

</style>
