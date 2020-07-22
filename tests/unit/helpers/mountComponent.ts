import Vue from 'vue';
import { shallowMount, mount, createLocalVue, Wrapper, VueClass } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import { ProductState } from '../../../src/services/interfaces/ProductState';
import { CartItemState } from '../../../src/services/interfaces/CartItemState';

Vue.use(Vuetify);

const localVue = createLocalVue();
const vuetify = new Vuetify();
const router = new VueRouter();

localVue.use(VueRouter);

interface Options {
  useMount?: boolean;
  includeRouter?: boolean;
  stubs?: string[];
  propsData?: {
    productId?: string;
    products?: ProductState[];
    product?: ProductState;
    cartItem?: CartItemState;
  };
}
export default function (component: VueClass<Vue>, options: Options): Wrapper<Vue> {
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
