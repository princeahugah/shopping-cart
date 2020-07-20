import Vue from 'vue';
import { Wrapper } from '@vue/test-utils';
import mountFunction from './helpers/mountComponent';
import { expect } from 'chai';
import ShoppingCartSummary from '@/components/ShoppingCartSummary.vue';
import CartItem from '@/components/atoms/CartItem.vue';
import { ProductState } from '@/services/interfaces/ProductState';
import { CartModule } from '@/store/modules/cart';
import sinon from 'sinon';

describe('ShoppingCartSummary.vue', () => {
  describe('When the component is rendered', () => {
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

    describe('-', () => {
      before(() => {
        wrapper = mountFunction(ShoppingCartSummary, {});
        CartModule.RemoveAllCartItems();
        products.forEach((p) => CartModule.AddProductToCart(p));
      });
      it('should display 3 CartItem components', () => {
        const listedCartItems = wrapper.findAllComponents(CartItem);
        expect(listedCartItems.length).to.equal(CartModule.cartItems.length);
      });

      it('should display the total quantity of products ordered', () => {
        const totalQuantity = wrapper.find('.shopping-cart-summary .total-quantity');
        expect(totalQuantity.text()).to.equal(`Total Quantity: ${products.length}`);
      });

      it('should display the checkout button with the total cost of the order', () => {
        const checkoutButton = wrapper.find('.shopping-cart-summary .checkout-button');
        expect(checkoutButton.exists()).to.be.true;
        expect(checkoutButton.text()).to.equal(`Checkout ( $${CartModule.totalCartAmount} )`);
      });

      it('should remove all items from the cart when "Remove all" is clicked', async () => {
        wrapper.find('.shopping-cart-summary .remove-all').trigger('click');
        await wrapper.vm.$nextTick();
        expect(CartModule.cartItems.length).to.equal(0);
      });

      it('should not display the checkout button when the cart is empty', () => {
        const checkoutButton = wrapper.find('.shopping-cart-summary .checkout-button');
        expect(checkoutButton.exists()).to.be.false;
      });
    });

    describe('-', () => {
      beforeEach(() => {
        wrapper = mountFunction(ShoppingCartSummary, {});
        products.forEach((p) => CartModule.AddProductToCart(p));
      });

      after(() => {
        sinon.restore();
      });

      it('should call removeAllItems method when "Remove all" is clicked', async () => {
        const methodSpy = sinon.spy(wrapper.vm as any, 'removeAllItems');
        const moduleStub = sinon.stub();
        wrapper.setData({
          cart: {
            RemoveAllCartItems: moduleStub
          }
        });
        wrapper.find('.shopping-cart-summary .remove-all').trigger('click');
        await wrapper.vm.$nextTick();

        expect(methodSpy.calledOnce).to.be.true;
        expect(moduleStub.calledOnce).to.be.true;
      });

      it('should return an order id when an order is successfully made', async () => {
        const orderId = 'vvVUZmUYZ0qoEuF5tF8w';
        const methodSpy = sinon.spy(wrapper.vm as any, 'checkout');
        const moduleStub = sinon.stub().resolves(orderId);
        wrapper.setData({
          cart: {
            Checkout: moduleStub
          }
        });

        wrapper.find('.shopping-cart-summary .checkout-button').trigger('click');
        await wrapper.vm.$nextTick();

        expect(methodSpy.calledOnce).to.be.true;
        expect(moduleStub.calledOnce).to.be.true;
        expect((wrapper.vm as any).orderStatus.color).to.equal('success');
        expect((wrapper.vm as any).orderStatus.message).to.equal(
          `You have successfully ordered 8 items. Your order code is ${orderId}`
        );
      });
    });
  });
});
