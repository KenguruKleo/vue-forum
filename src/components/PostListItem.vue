<template>
  <div class="post">
    <div class="user-info">
      <a href="#" class="user-name">
        {{ user.name }}
      </a>

      <a href="#">
        <img
          class="avatar-large"
          :src="user.avatar"
          alt=""
        />
      </a>

      <p class="desktop-only text-small">{{ userThreadsCount }} threads</p>
      <p class="desktop-only text-small">{{ userPostCount }} posts</p>
    </div>

    <div class="post-content">
      <div v-if="editing" >
        <PostEditor
          :post="post"
          @save="editing = false"
          @cancel="editing = false"
        />
      </div>
      <template v-else >
        <div>
          {{ post.text }}
        </div>
        <a
          @click.prevent="editing = true"
          href="#"
          style="margin-left: auto; padding-left: 5px;"
          class="link-unstyled"
          title="Make a change"
        >
          <i class="fa fa-pencil"></i>
        </a>
      </template>
    </div>

    <div class="post-date text-faded">
      <div v-if="post.edited" class="edition-info">edited</div>
      <AppDate :timestamp="post.publishedAt" />
    </div>
  </div>
</template>

<script>
import PostEditor from '@/components/PostEditor.vue';

export default {
  components: {
    PostEditor,
  },
  props: {
    post: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      editing: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.users[this.post.userId];
    },
    userPostCount() {
      return this.$store.getters.userPostCount(this.post.userId);
    },

    userThreadsCount() {
      return this.$store.getters.userThreadsCount(this.post.userId);
    },
  },
};

</script>

<style scoped>

</style>
