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

        <form @submit.prevent="addPost">
          <div class="form-group">
            <textarea
              v-model="newPostText"
              name=""
              id=""
              cols="30"
              rows="10"
              class="form-input"
            ></textarea>
          </div>
          <div class="form-actions">
            <button class="btn-blue">Submit post</button>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script>

import { threads, posts as sourcePosts, users } from '@/data.json';
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
      newPostText: '',
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
    addPost() {
      const postId = `post${Math.random()}`;
      const post = {
        text: this.newPostText,
        publishedAt: Math.floor(Date.now() / 1000),
        threadId: this.id,
        userId: 'ALXhxjwgY9PinwNGHpfai6OWyDu2',
        '.key': postId,
      };

      this.$set(sourcePosts, postId, post);
      this.$set(this.thread.posts, postId, postId);
      this.$set(users[post.userId].posts, postId, postId);

      this.newPostText = '';
    },
  },
};
</script>

<style scoped>

</style>
