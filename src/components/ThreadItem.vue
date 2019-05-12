<template>
  <div>
    <div>
      <div
          v-bind:key="thread['.key']"
          class="col-large push-top"
      >
        <h2>{{ thread.title }}</h2>

        <PostList :posts="posts" />

        <PostEditor
          @save="addPost"
          :threadId="id"
        />

      </div>
    </div>
  </div>
</template>

<script>

import { threads, posts as sourcePosts, users } from '@/data.json';
import PostList from '@/components/PostList.vue';
import PostEditor from '@/components/PostEditor.vue';

export default {
  components: {
    PostList,
    PostEditor,
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
  methods: {
    addPost({ post }) {
      const postId = post['.key'];

      this.$set(sourcePosts, postId, post);
      this.$set(this.thread.posts, postId, postId);
      this.$set(users[post.userId].posts, postId, postId);
    },
  },
};
</script>

<style scoped>

</style>
