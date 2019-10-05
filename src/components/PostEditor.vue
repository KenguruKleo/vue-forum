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
      <button v-if="isUpdate" @click.prevent="cancel" class="btn btn-ghost">Cancel</button>
      <button class="btn-blue">{{isUpdate ? 'Update' : 'Submit post'}}</button>
    </div>
  </form>
</template>

<script>

export default {
  data() {
    return {
      text: this.post ? this.post.text : '',
    };
  },

  props: {
    threadId: {
      required: false,
      type: String,
    },
    post: {
      type: Object,
      validator(value) {
        return (
          typeof value['.key'] === 'string'
          && typeof value.text === 'string'
        );
      },
    },
  },

  computed: {
    isUpdate() {
      return !!this.post;
    },
  },

  methods: {
    save() {
      this.persist()
        .then((post) => {
          this.$emit('save', { post });
        });
    },

    persist() {
      return this.isUpdate
        ? this.update()
        : this.create();
    },

    create() {
      const payload = {
        text: this.text,

        threadId: this.threadId,
      };

      this.text = '';

      return this.$store.dispatch('createPost', payload);
    },

    update() {
      const payload = {
        id: this.post['.key'],
        text: this.text,
      };

      return this.$store.dispatch('updatePost', payload);
    },

    cancel() {
      this.$emit('cancel');
    },
  },
};

</script>

<style scoped>

</style>
