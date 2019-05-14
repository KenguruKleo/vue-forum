import Vue from 'vue';
import Vuex from 'vuex';

import sourceData from '@/data.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ...sourceData,
  },
  actions: {
    createPost({ commit }, post) {
      const postId = `post${Math.random()}`;

      commit('setPost', { postId, post });
      commit('appendPostToThread', { postId, threadId: post.threadId });
      commit('appendPostToUser', { postId, userId: post.userId });
    },
  },
  mutations: {
    setPost(state, { postId, post }) {
      Vue.set(post, '.key', postId);
      Vue.set(state.posts, postId, post);
    },
    appendPostToThread(state, { threadId, postId }) {
      const thread = state.threads[threadId];
      Vue.set(thread.posts, postId, postId);
    },
    appendPostToUser(state, { userId, postId }) {
      const user = state.users[userId];
      Vue.set(user.posts, postId, postId);
    },
  },
});
