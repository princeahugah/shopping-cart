import Vue from 'vue';
import Vuetify from 'vuetify';
import { mount, createLocalVue, Wrapper } from '@vue/test-utils';
import { expect } from 'chai';
import Product from '@/components/atoms/Product.vue';
import { ProductState } from '@/services/interfaces/ProductState';

Vue.use(Vuetify);
const localVue = createLocalVue();
const vuetify = new Vuetify();

describe('Product.vue', () => {
  describe('When the component is rendered', () => {
    const mountFunction = (options: any) => {
      return mount(Product, {
        localVue,
        vuetify,
        ...options
      });
    };

    const product: ProductState = {
      id: '1',
      title: 'Fullstack Hoodie',
      description: 'Some product description',
      price: 19.99,
      currency: '$'
    };

    let wrapper: Wrapper<Vue>;
    beforeEach(() => {
      wrapper = mountFunction({
        propsData: {
          product
        }
      });
    });

    it('should display the product title', () => {
      const title = wrapper.find('.product .title');
      expect(title.text()).to.equal(product.title);
    });

    it('should emit navigateToProductDetails event when the product title is clicked', async () => {
      wrapper.find('.product .title').trigger('click');
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted().navigateToProductDetails![0]).to.be.an('array');
      expect(wrapper.emitted().navigateToProductDetails![0][0]).to.equal(product.id);
      expect(wrapper.emitted().navigateToProductDetails![0].length).to.equal(1);
    });

    it('should display the product description', () => {
      const description = wrapper.find('.product .description');
      expect(description.text()).to.equal(product.description);
    });

    it('should display the price of the product', () => {
      const price = wrapper.find('.product .price');
      expect(price.text()).to.equal(product.currency + product.price);
    });

    it('should emit addToCart event when the "Add to Cart" button is clicked', async () => {
      wrapper.find('.product .add-to-cart').trigger('click');
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted().addToCart![0]).to.be.an('array');
      expect(wrapper.emitted().addToCart![0][0]).to.equal(product);
      expect(wrapper.emitted().addToCart![0].length).to.equal(1);
    });
  });
});
