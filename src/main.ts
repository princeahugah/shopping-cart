import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VueMeta from 'vue-meta';
import { auth } from './services/firebase';

Vue.use(VueMeta);
Vue.config.productionTip = false;

let app: Vue | null = null;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App)
    }).$mount('#app');
  }
});
