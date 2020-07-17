import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import goTo from 'vuetify/es5/services/goto';
import AppLayout from '../views/layouts/AppLayout.vue';
import AuthLayout from '../views/layouts/AuthLayout.vue';
import Signin from '../views/auth/Signin.vue';
import Signup from '../views/auth/Signup.vue';
import ShoppingCart from '../views/ShoppingCart.vue';
import ProductDetails from '../views/ProductDetails.vue';
import { auth } from '../services/firebase';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: AppLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/',
        name: 'ShoppingCart',
        component: ShoppingCart
      },
      {
        path: '/products/:productId',
        name: 'ProductDetails',
        component: ProductDetails,
        props: true
      }
    ]
  },
  {
    path: '/',
    component: AuthLayout,
    children: [
      {
        path: '/signin',
        name: 'Signin',
        component: Signin
      },
      {
        path: '/signup',
        name: 'Signup',
        component: Signup
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    let scrollTo = 0;

    if (savedPosition) {
      scrollTo = savedPosition.y;
    }

    //@ts-ignore
    return goTo(scrollTo);
  }
});

router.beforeEach((to, from, next) => {
  if (to.path === '/signout') {
    auth.signOut().then(() => {
      window.location.href = '/';
    });
  } else {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

    if (requiresAuth && !auth.currentUser) {
      return next(`/signin/?redirect=${to.fullPath}`);
    }
    if (!requiresAuth && auth.currentUser) {
      if (to.query.redirect) {
        return next(to.query.redirect as string);
      }
      return next('/');
    }

    return next();
  }
});

export default router;
