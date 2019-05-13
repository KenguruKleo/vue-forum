<template>
  <div class="col-full">

    <ForumList :forums="forums" />

  </div>
</template>

<script>

import ForumList from '@/components/ForumList.vue';

import { forums } from '@/data.json';

export default {
  components: {
    ForumList,
  },
  data() {
    return {
      forums: Object.values(forums),
    };
  },
};

</script>
