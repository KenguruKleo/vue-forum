<template>

  <div class="col-full">
    <CategoryListItem :category="category" />
  </div>

</template>

<script>

import CategoryListItem from '@/components/CategoryListItem.vue';

export default {
  name: 'PageCategory',
  components: { CategoryListItem },
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  computed: {
    category() {
      return this.$store.state.categories[this.id];
    },
  },
};

</script>
