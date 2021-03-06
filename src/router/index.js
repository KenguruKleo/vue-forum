import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/PageHome.vue';
import Category from '@/pages/PageCategory.vue';
import Forum from '@/pages/PageForum.vue';
import ThreadCreate from '@/pages/PageThreadCreate.vue';
import ThreadShow from '@/pages/PageThreadShow.vue';
import ThreadEdit from '@/pages/PageThreadEdit.vue';
import Profile from '@/pages/PageProfile.vue';
import NotFound from '@/pages/PageNotFound.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/thread/create/:forumId',
      name: 'ThreadCreate',
      component: ThreadCreate,
      props: true,
    },

    {
      path: '/thread/:id/edit',
      name: 'ThreadEdit',
      component: ThreadEdit,
      props: true,
    },
    {
      path: '/thread/:id',
      name: 'ThreadShow',
      component: ThreadShow,
      props: true,
    },
    {
      path: '/category/:id',
      name: 'Category',
      component: Category,
      props: true,
    },
    {
      path: '/forum/:id',
      name: 'Forum',
      component: Forum,
      props: true,
    },
    {
      path: '/me',
      name: 'Profile',
      component: Profile,
    },
    {
      path: '/me/edit',
      name: 'ProfileEdit',
      component: Profile,
      props: { edit: true },
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/pages/PageAbout.vue'),
    },
    {
      path: '*',
      name: 'HotFound',
      component: NotFound,
    },
  ],
});
