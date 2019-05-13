<template>
  <span :title="timestamp | humanFriendlyDate">{{ timestamp | humanFromNow }}</span>
</template>

<script>

import moment from 'moment';

export default {
  props: {
    timestamp: {
      required: true,
      type: Number,
    },
  },
  filters: {
    humanFriendlyDate(date) {
      return moment.unix(date).format('MMMM Do YYYY, h:mm:ss a');
    },
    humanFromNow(date) {
      return moment.unix(date).fromNow();
    },
  },
};
</script>
