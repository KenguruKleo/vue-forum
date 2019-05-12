<template>
  <div class="post-list">
    <PostListItem
      v-for="post in posts"
      :post="post"
      :key="post['.key']"
    />
  </div>

</template>

<script>

import PostListItem from './PostListItem.vue';

export default {
  props: {
    posts: {
      required: true,
      type: Array,
    },
  },
  components: {
    PostListItem,
  },
};
</script>

<style scoped>
</style>
