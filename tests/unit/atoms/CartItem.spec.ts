import Vue from 'vue';
import { Wrapper } from '@vue/test-utils';
import mountFunction from '../helpers/mountComponent';
import { expect } from 'chai';
import CartItem from '@/components/atoms/CartItem.vue';
import { CartItemState } from '@/services/interfaces/CartItemState';

describe('CartItem.vue', () => {
  describe('When the component is rendered', () => {
    const cartItem: CartItemState = {
      productId: '1',
      productTitle: 'Fullstack Hoodie',
      price: 19.99,
      currency: '$',
      quantity: 1
    };

    let wrapper: Wrapper<Vue>;
    beforeEach(() => {
      wrapper = mountFunction(CartItem, {
        useMount: true,
        propsData: {
          cartItem
        }
      });
    });

    it('should display the product title', () => {
      const title = wrapper.find('.cart-item .title');
      expect(title.text()).to.equal(cartItem.productTitle);
    });

    it('should display the product quantity', () => {
      const quantity = wrapper.find('.cart-item .quantity');
      expect(quantity.text()).to.equal(`Quantity: ${cartItem.quantity}`);
    });

    it('should display the price of the product', () => {
      const price = wrapper.find('.cart-item .price');
      expect(price.text()).to.equal(`${cartItem.price}$ each`);
    });

    it('should emit increaseProductQuantity event when the up arrow button is clicked', async () => {
      wrapper.find('.cart-item .increase-quantity').trigger('click');
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted().increaseProductQuantity![0]).to.be.an('array');
      expect(wrapper.emitted().increaseProductQuantity![0][0]).to.equal(cartItem);
      expect(wrapper.emitted().increaseProductQuantity![0].length).to.equal(1);
    });

    it('should emit decreaseProductQuantity event when the down arrow button is clicked', async () => {
      wrapper.find('.cart-item .decrease-quantity').trigger('click');
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted().decreaseProductQuantity![0]).to.be.an('array');
      expect(wrapper.emitted().decreaseProductQuantity![0][0]).to.equal(cartItem);
      expect(wrapper.emitted().decreaseProductQuantity![0].length).to.equal(1);
    });
  });
});
