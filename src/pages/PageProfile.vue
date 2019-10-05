<template>
  <div class="flex-grid">

    <UserProfileCard
      v-if="!edit"
      :user="user"
    />
    <UserProfileCardEditor
      v-else
      :user="user"
    />

    <div class="col-7 push-top">

      <div class="profile-header">
        <span class="text-lead">
            {{user.username}}'s recent activity
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
import UserProfileCard from '@/components/UserProfileCard.vue';
import UserProfileCardEditor from '@/components/UserProfileCardEditor.vue';

export default {
  components: { UserProfileCard, UserProfileCardEditor, PostList }, // eslint-disable-line
  computed: {
    ...mapGetters({
      user: 'authUser',
    }),
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
