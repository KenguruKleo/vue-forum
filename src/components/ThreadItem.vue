<template>
  <div
      v-bind:key="thread['.key']"
      class="col-large push-top"
  >
    <h2>{{ thread.title }}</h2>

    <p>
      By <a href="#" class="link-unstyled">Robin</a>,
      <AppDate :timestamp="thread.publishedAt" />.

      <span style="float:right; margin-top: 2px;" class="hide-mobile text-faded text-small">
        3 replies by 3 contributors
      </span>
    </p>

    <PostList :posts="posts" />

    <PostEditor
      @save="addPost"
      :threadId="id"
    />

  </div>
</template>

<script>

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
  computed: {
    posts() {
      return Object
        .values(this.thread.posts)
        .map(postId => this.$store.state.posts[postId]);
    },
    thread() {
      return this.$store.state.threads[this.id];
    },
  },
  methods: {
    addPost({ post }) {
      const postId = post['.key'];

      // TODO - update to action
      this.$set(this.$store.state.posts, postId, post);
      this.$set(this.thread.posts, postId, postId);
      this.$set(this.$store.state.users[post.userId].posts, postId, postId);
    },
  },
};
</script>

<style scoped>

</style>
