import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VueMeta from 'vue-meta';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

Vue.use(VueMeta);
Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: 'AIzaSyDWAMsA2L2sFHofNrPJHfYCfmfWcmE_tSM',
  authDomain: 'shopping-cart-af2dc.firebaseapp.com',
  databaseURL: 'https://shopping-cart-af2dc.firebaseio.com',
  projectId: 'shopping-cart-af2dc',
  storageBucket: 'shopping-cart-af2dc.appspot.com',
  messagingSenderId: '796626809357',
  appId: '1:796626809357:web:618b43efebe1e195f9db44'
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app');
