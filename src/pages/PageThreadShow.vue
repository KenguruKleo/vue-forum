<template>
  <div
    v-bind:key="thread['.key']"
    class="col-large push-top"
  >
    <h2>
      {{ thread.title }}
      <router-link
        :to="{ name: 'ThreadEdit', id: this.id }"
        class="btn-green btn-small"
        tag="button"
      >
        Edit Thread
      </router-link>
    </h2>

    <p>
      By <a href="#" class="link-unstyled">{{user.name}}</a>,
      <AppDate :timestamp="thread.publishedAt" />.

      <span style="float:right; margin-top: 2px;" class="hide-mobile text-faded text-small">
        {{repliesCount}} replies by {{contributorsCount}} contributors
      </span>
    </p>

    <PostList :posts="posts" />

    <PostEditor
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
    user() {
      return this.$store.state.users[this.thread.userId];
    },
    posts() {
      return Object
        .values(this.thread.posts)
        .map(postId => this.$store.state.posts[postId]);
    },
    thread() {
      return this.$store.state.threads[this.id];
    },
    repliesCount() {
      return this.$store.getters.threadRepliesCount(this.thread['.key']);
    },
    contributorsCount() {
      const userReplies = Object.keys(this.thread.posts)
        .filter(postId => postId !== this.thread.firstPostId)
        .map(postId => this.$store.state.posts[postId])
        .map(post => post.userId);
      return [...new Set(userReplies)].length;
    },
  },
};

</script>
