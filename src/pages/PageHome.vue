<template>
  <div class="col-full">

    <h1>Welcome to the Forum</h1>

    <CategoryList :categories="categories" />

  </div>
</template>

<script>

import CategoryList from '@/components/CategoryList.vue';
import { categories } from '@/data.json';

export default {
  components: {
    CategoryList,
  },
  data() {
    return {
      categories: Object.values(categories),
    };
  },
};

</script>
