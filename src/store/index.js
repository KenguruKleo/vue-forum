import Vue from 'vue';
import Vuex from 'vuex';

import sourceData from '@/data.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ...sourceData,
    authId: 'NnooaWj4KHVxbhKwO1pEdfaQDsD2',
  },

  getters: {
    authUser(state) {
      return state.users[state.authId];
    },
  },

  actions: {
    createPost({ commit, state }, postData) {
      const post = { ...postData };
      const postId = `post${Math.random()}`;
      post['.key'] = postId;
      post.userId = state.authId;
      post.publishedAt = Math.floor(Date.now() / 1000);

      commit('setPost', { postId, post });
      commit('appendPostToThread', { postId, threadId: post.threadId });
      commit('appendPostToUser', { postId, userId: post.userId });

      return Promise.resolve(state.posts[postId]);
    },

    updateUser({ commit }, user) {
      commit('setUser', { userId: user['.key'], user });
    },

    createThread({ commit, state, dispatch }, { forumId, title, text }) {
      return new Promise((resolve) => {
        const userId = state.authId;
        const publishedAt = Math.floor(Date.now() / 1000);
        const threadId = `thread${Math.random()}`;
        const thread = {
          '.key': threadId,
          forumId,
          userId,
          publishedAt,
          title,
        };
        commit('setThread', { threadId, thread });
        commit('appendThreadToForum', { threadId, forumId });
        commit('appendThreadToUser', { threadId, userId });

        dispatch('createPost', { text, threadId })
          .then((post) => {
            commit('setThread', { threadId, thread: { ...thread, firstPostId: post['.key'] } });
          });

        resolve(state.threads[threadId]);
      });
    },

    updateThread({ commit, state }, { id, title, text }) {
      return new Promise((resolve) => {
        const thread = {
          ...state.threads[id],
          title,
        };
        const post = {
          ...state.posts[thread.firstPostId],
          text,
        };
        commit('setThread', { threadId: id, thread });
        commit('setPost', { postId: thread.firstPostId, post });

        resolve(thread);
      });
    },
  },

  mutations: {
    setPost(state, { postId, post }) {
      Vue.set(state.posts, postId, post);
    },

    appendPostToThread(state, { threadId, postId }) {
      const thread = state.threads[threadId];
      if (!thread.posts) {
        Vue.set(thread, 'posts', {});
      }
      Vue.set(thread.posts, postId, postId);
    },

    appendPostToUser(state, { userId, postId }) {
      const user = state.users[userId];
      if (!user.posts) {
        Vue.set(user, 'posts', {});
      }
      Vue.set(user.posts, postId, postId);
    },

    setUser(state, { userId, user }) {
      Vue.set(state.users, userId, user);
    },

    setThread(state, { threadId, thread }) {
      Vue.set(state.threads, threadId, thread);
    },

    appendThreadToForum(state, { threadId, forumId }) {
      const forum = state.forums[forumId];
      if (!forum.threads) {
        Vue.set(forum, 'threads', {});
      }
      Vue.set(forum.threads, threadId, threadId);
    },

    appendThreadToUser(state, { threadId, userId }) {
      const user = state.users[userId];
      if (!user.threads) {
        Vue.set(user, 'threads', {});
      }
      Vue.set(user.threads, threadId, threadId);
    },
  },
});
