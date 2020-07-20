import Vue from 'vue';
import { shallowMount, mount, createLocalVue, Wrapper, VueClass } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

const localVue = createLocalVue();
const vuetify = new Vuetify();
const router = new VueRouter();

localVue.use(VueRouter);

export default function (component: VueClass<Vue>, options: any): Wrapper<Vue> {
  const mountStrategy = options?.useMount ? mount : shallowMount;
  const _options = { localVue, router, vuetify };

  if (options) {
    Object.assign(_options, { ...options });
    if (Object.prototype.hasOwnProperty.call(options, 'includeRouter') && options.includeRouter === false) {
      delete _options.router;
    }
  }

  return mountStrategy(component, { ..._options });
}
