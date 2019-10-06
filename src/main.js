import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// This import loads the firebase namespace along with all its type information.
import * as firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import 'firebase/analytics';
import 'firebase/database';

import AppDate from '@/components/AppDate.vue';

Vue.component('AppDate', AppDate);

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: 'AIzaSyBpLJyAWwYvUrWfDbc30zVgWgvvOV3EzEY',
  authDomain: 'kengurukleo-forum.firebaseapp.com',
  databaseURL: 'https://kengurukleo-forum.firebaseio.com',
  projectId: 'kengurukleo-forum',
  storageBucket: '',
  messagingSenderId: '57615295320',
  appId: '1:57615295320:web:5ad4bf1047e427a093fb2d',
  measurementId: 'G-MBB6NJ3G2R',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
