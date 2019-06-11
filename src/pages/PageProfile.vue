<template>
  <div class="flex-grid">

    <UserProfileCard
      v-if="!edit"
      :user="user"
      :userThreadsCount="userThreadsCount"
      :userPostsCount="userPostsCount"
    />
    <UserProfileCardEditor
      v-else
      :user="user"
      :userThreadsCount="userThreadsCount"
      :userPostsCount="userPostsCount"
    />

    <div class="col-7 push-top">

      <div class="profile-header">
                  <span class="text-lead">
                      Joker's recent activity
                  </span>
        <a href="#">See only started threads?</a>
      </div>

      <hr>

      <PostList :posts="userPosts"/>
    </div>
  </div>
</template>

<script>
import PostList from '@/components/PostList.vue';
import { mapGetters } from 'vuex';
import { countObjectProperties } from '@/utils';
import UserProfileCard from '@/components/UserProfileCard.vue';
import UserProfileCardEditor from '@/components/UserProfileCardEditor.vue';

export default {
  components: { UserProfileCard, UserProfileCardEditor, PostList }, // eslint-disable-line
  computed: {
    ...mapGetters({
      user: 'authUser',
    }),
    userThreadsCount() {
      return countObjectProperties(this.user.threads);
    },
    userPostsCount() {
      return countObjectProperties(this.user.posts);
    },
    userPosts() {
      return (Object.values(this.user.posts || {}))
        .map(postId => this.$store.state.posts[postId]);
    },
  },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
