<template>
  <div>
    <div>
      <div
          v-bind:key="thread['.key']"
          class="col-large push-top"
      >
        <h2>{{ thread.title }}</h2>

        <div v-for="postId in thread.posts" v-bind:key="postId" class="post-list">
          <div class="post">
            <div class="user-info">
              <a href="#" class="user-name">
                {{ users[posts[postId].userId].name }}
              </a>

              <a href="#">
                <img
                    class="avatar-large"
                    :src="users[posts[postId].userId].avatar"
                    alt=""
                />
              </a>

              <p class="desktop-only text-small">107 posts</p>
            </div>

            <div class="post-content">
              <div>
                {{ posts[postId].text }}
              </div>
            </div>

            <div class="post-date text-faded">
              {{ posts[postId].publishedAt }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { threads, posts, users } from '@/data.json';

export default {
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      thread: threads[this.id],
      posts,
      users,
    };
  },
};
</script>

<style scoped>

</style>
