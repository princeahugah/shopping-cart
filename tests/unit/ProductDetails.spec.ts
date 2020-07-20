import Vue from 'vue';
import { Wrapper } from '@vue/test-utils';
import mountFunction from './helpers/mountComponent';
import { expect } from 'chai';
import ProductDetails from '@/views/ProductDetails.vue';
import { ProductState } from '@/services/interfaces/ProductState';
import { ProductModule } from '@/store/modules/product';
import { CartModule } from '@/store/modules/cart';
import sinon from 'sinon';

describe('ProductDetails.vue', () => {
  describe('When the component is rendered', () => {
    const product: ProductState = {
      id: '1',
      title: 'Fullstack Hoodie',
      description: 'Some product description',
      price: 19.99,
      currency: '$',
      founded: '2017',
      tag: 'hoodies/jackets',
      imageUrl: 'https://hoodiescorner.com/img/hoodie.jpg'
    };

    describe('-', () => {
      it('display progress loader until the product has been fetched', () => {
        sinon.stub(ProductModule, 'GetProductById');
        const wrapper = mountFunction(ProductDetails, {});

        const progressLoader = wrapper.find('.product-details .progress-loader');
        expect(progressLoader.exists()).to.be.true;
      });
    });

    describe('-', () => {
      let wrapper: Wrapper<Vue>;
      beforeEach(() => {
        ProductModule.GetProductById = function (productId) {
          (this as any).SET_PRODUCT(product);
        };
        wrapper = mountFunction(ProductDetails, {
          propsData: {
            productId: product.id
          }
        });
      });

      after(() => {
        sinon.restore();
      });

      it('should remove progress loader and render the fetched product', () => {
        const progressLoader = wrapper.find('.product-details .progress-loader');
        expect(progressLoader.exists()).to.be.false;
      });

      it('should display a back icon', () => {
        const backIcon = wrapper.find('.product-details .back-icon');
        expect(backIcon.exists()).to.be.true;
      });

      it('should navigate to the products page when the back icon is clicked', async () => {
        const methodSpy = sinon.spy(wrapper.vm as any, 'backToProducts');
        const routerSpy = sinon.stub(wrapper.vm.$router, 'push');

        wrapper.find('.product-details .back-icon').trigger('click');
        await wrapper.vm.$nextTick();

        expect(methodSpy.calledOnce).to.be.true;
        expect(routerSpy.calledOnce).to.be.true;
        expect(routerSpy.calledOnceWith(`/`)).to.be.true;
      });

      it('should display the product title', () => {
        const productTitle = wrapper.find('.product-details .title');
        expect(productTitle.exists()).to.be.true;
        expect(productTitle.text()).to.equal(product.title);
      });

      it('should display the product tag', () => {
        const productTag = wrapper.find('.product-details .tag');
        expect(productTag.exists()).to.be.true;
        expect(productTag.text()).to.equal(product.tag);
      });

      it('should display the product description', () => {
        const productDesc = wrapper.find('.product-details .description');
        expect(productDesc.exists()).to.be.true;
        expect(productDesc.text()).to.equal(product.description);
      });

      it('should display the founded year of the product', () => {
        const productFounded = wrapper.find('.product-details .founded');
        expect(productFounded.exists()).to.be.true;
        expect(productFounded.text()).to.equal(`Founded: ${product.founded}`);
      });

      it('should display the addToCart button and add product to cart when clicked', async () => {
        const addToCartButton = wrapper.find('.product-details .addToCart');
        expect(addToCartButton.exists()).to.be.true;

        const methodSpy = sinon.spy(wrapper.vm as any, 'addToCart');
        const cartSpy = sinon.spy(CartModule, 'AddProductToCart');
        wrapper.find('.product-details .addToCart').trigger('click');
        await wrapper.vm.$nextTick();

        expect(methodSpy.calledOnce).to.be.true;
        expect(cartSpy.calledOnce).to.be.true;
        expect(
          cartSpy.calledOnceWith({
            id: product.id,
            title: product.title,
            description: product.description,
            currency: product.currency,
            price: product.price
          })
        ).to.be.true;
        expect(CartModule.cartItems.length).to.equal(1);
      });
    });
  });
});
