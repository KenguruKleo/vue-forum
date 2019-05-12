<template>
  <div>
    <div>
      <div
          v-bind:key="thread['.key']"
          class="col-large push-top"
      >
        <h2>{{ thread.title }}</h2>

        <PostList
          :posts="posts"
        />

      </div>
    </div>
  </div>
</template>

<script>

import { threads, posts as sourcePosts } from '@/data.json';
import PostList from './PostList.vue';

export default {
  components: {
    PostList,
  },
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      thread: threads[this.id],
    };
  },
  computed: {
    posts() {
      return Object
        .values(this.thread.posts)
        .map(postId => sourcePosts[postId]);
    },
  },
};
</script>

<style scoped>

</style>
