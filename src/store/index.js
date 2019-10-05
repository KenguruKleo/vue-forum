import Vue from 'vue';
import Vuex from 'vuex';

import sourceData from '@/data.json';
import { countObjectProperties } from '@/utils';

Vue.use(Vuex);

const makeAppendChildToParentMutation = ({ parent, child }) => (state, { parentId, childId }) => {
  const resource = state[parent][parentId];
  if (!resource[child]) {
    Vue.set(resource, child, {});
  }
  Vue.set(resource[child], childId, childId);
};

export default new Vuex.Store({
  state: {
    ...sourceData,
    authId: 'NnooaWj4KHVxbhKwO1pEdfaQDsD2',
  },

  getters: {
    authUser(state) {
      return state.users[state.authId];
    },

    userThreadsCount: state => id => countObjectProperties(state.users[id].threads),
    userPostCount: state => id => countObjectProperties(state.users[id].posts),
    threadRepliesCount: state => id => countObjectProperties(state.threads[id].posts) - 1,
  },

  actions: {
    createPost({ commit, state }, postData) {
      const post = { ...postData };
      const postId = `post${Math.random()}`;
      post['.key'] = postId;
      post.userId = state.authId;
      post.publishedAt = Math.floor(Date.now() / 1000);

      commit('setPost', { postId, post });
      commit('appendPostToThread', { parentId: post.threadId, childId: postId });
      commit('appendPostToUser', { parentId: post.userId, childId: postId });

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
        commit('appendThreadToForum', { parentId: forumId, childId: threadId });
        commit('appendThreadToUser', { parentId: userId, childId: threadId });

        dispatch('createPost', { text, threadId })
          .then((post) => {
            commit('setThread', { threadId, thread: { ...thread, firstPostId: post['.key'] } });
          });

        resolve(state.threads[threadId]);
      });
    },

    updatePost({ commit, state }, { id, text }) {
      return new Promise((resolve) => {
        const post = {
          ...state.posts[id],
          text,
          edited: {
            at: Math.floor(Date.now() / 1000),
            by: state.authId,
          },
        };
        commit('setPost', { postId: id, post });
        resolve(post);
      });
    },

    updateThread({ commit, state, dispatch }, { id, title, text }) {
      return new Promise((resolve) => {
        const thread = {
          ...state.threads[id],
          title,
        };

        commit('setThread', { threadId: id, thread });

        dispatch('updatePost', { id: thread.firstPostId, text })
          .then(() => {
            resolve(thread);
          });
      });
    },
  },

  mutations: {
    setPost(state, { postId, post }) {
      Vue.set(state.posts, postId, post);
    },

    appendPostToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'posts' }),

    appendPostToUser: makeAppendChildToParentMutation({ parent: 'users', child: 'posts' }),

    appendThreadToForum: makeAppendChildToParentMutation({ parent: 'forums', child: 'threads' }),

    appendThreadToUser: makeAppendChildToParentMutation({ parent: 'users', child: 'threads' }),

    setUser(state, { userId, user }) {
      Vue.set(state.users, userId, user);
    },

    setThread(state, { threadId, thread }) {
      Vue.set(state.threads, threadId, thread);
    },
  },
});
