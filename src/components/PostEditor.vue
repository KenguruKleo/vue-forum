<template>
  <form @submit.prevent="save">
    <div class="form-group">
      <textarea
        v-model="text"
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
</template>

<script>

export default {
  data() {
    return {
      text: '',
    };
  },
  props: {
    threadId: {
      required: true,
      type: String,
    },
  },
  methods: {
    save() {
      const post = {
        text: this.text,

        threadId: this.threadId,
      };

      this.text = '';

      this.$store.dispatch('createPost', post);
      this.$emit('save', { post });
    },
  },
};

</script>

<style scoped>

</style>
