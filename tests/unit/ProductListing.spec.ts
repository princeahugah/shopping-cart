import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import { mount, createLocalVue, Wrapper } from '@vue/test-utils';
import { expect } from 'chai';
import ProductListing from '@/components/ProductListing.vue';
import Product from '@/components/atoms/Product.vue';
import { ProductState } from '@/services/interfaces/ProductState';
import { CartModule } from '@/store/modules/cart';
import sinon from 'sinon';

Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(VueRouter);

const router = new VueRouter();
const vuetify = new Vuetify();

describe('ProductListing.vue', () => {
  describe('When the component is rendered', () => {
    const mountFunction = (options: any) => {
      return mount(ProductListing, {
        localVue,
        router,
        vuetify,
        ...options
      });
    };

    const products: ProductState[] = [
      {
        id: '1',
        title: 'Fullstack Hoodie',
        description: 'Some product description',
        price: 19.99,
        currency: '$'
      },
      {
        id: '2',
        title: 'Fullstack Tee',
        description: 'Some t-shirt description',
        price: 12.99,
        currency: '$'
      },
      {
        id: '3',
        title: 'Fullstack Cap',
        description: 'Some fullstack cap description',
        price: 15.99,
        currency: '$'
      }
    ];

    let wrapper: Wrapper<Vue>;
    beforeEach(() => {
      wrapper = mountFunction({
        propsData: {
          products
        }
      });
    });

    it('should display 3 product components', () => {
      const listedProducts = wrapper.findAllComponents(Product);
      expect(listedProducts.length).to.equal(3);
    });

    it('should display the the total number of products', () => {
      const totalProducts = wrapper.find('.product-listing .total-products');
      expect(totalProducts.text()).to.equal(`# of products: ${products.length}`);
    });

    it('should add product to cart when addProductToCart method is called', () => {
      const spy = sinon.spy(CartModule, 'AddProductToCart');
      const product = products[1];
      (wrapper.vm as any).addProductToCart(product);

      expect(spy.calledOnce).to.be.true;
      expect(spy.calledOnceWith(product)).to.be.true;
    });

    it('should navigate to product details page when navigateToProductDetails method is called', () => {
      const spy = sinon.spy(wrapper.vm.$router, 'push');
      const product = products[1];
      (wrapper.vm as any).navigateToProductDetails(product.id);

      expect(spy.calledOnce).to.be.true;
      expect(spy.calledOnceWith(`/products/${product.id}`)).to.be.true;
    });
  });
});
