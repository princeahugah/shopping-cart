<template>
    <div class="shopping-cart-summary">
        <div class="cart-icon d-flex justify-center pb-6">
            <img src="@img/shopping-cart.svg"
                 alt="shopping cart" />
        </div>
        <div class="summary-content pt-4">
            <transition-group name="cart"
                              tag="div">
                <cart-item v-for="cartItem in cart.cartItems"
                           :key="cartItem.productId"
                           :cart-item="cartItem"
                           class="pb-3"
                           @increaseProductQuantity="increaseProductQuantity"
                           @decreaseProductQuantity="decreaseProductQuantity" />
            </transition-group>
        </div>
        <div class="summary-footer pt-5">
            <div class="total-quantity">Total Quantity: <span class="text-primary">{{ cart.totalCartQuantity }}</span></div>
            <div class="remove-all"
                 @click.prevent="removeAllItems">
                <v-icon light
                        class="text-primary"
                        size="18">{{ mdiTrashCanOutline }}</v-icon>
                Remove all
            </div>
        </div>
        <v-btn v-if="cart.hasProducts"
               class="mt-5 checkout-button"
               color="primary"
               depressed
               large
               @click.native.prevent="checkout"
               width="100%">
            Checkout (
            <transition name="fade"
                        mode="out-in">
                <span :key="cart.totalCartAmount"
                      class="amount"><span class="currency">{{ cart.cartItemCurrency }}</span>{{ cart.totalCartAmount }}</span>
            </transition>
            )
        </v-btn>
        <v-snackbar v-if="orderStatus.message"
                    class="mb-4 error-message"
                    :color="orderStatus.color"
                    :timeout="10000"
                    top
                    :value="true">
            {{ orderStatus.message }}
        </v-snackbar>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import CartItem from './atoms/CartItem.vue';
  import { CartModule } from '../store/modules/cart';
  import { CartItemState } from '../services/interfaces/CartItemState';
  import { mdiTrashCanOutline } from '@mdi/js';

  @Component({
    components: { CartItem }
  })
  export default class ShoppingCartSummary extends Vue {
    mdiTrashCanOutline = mdiTrashCanOutline;
    cart = CartModule;
    orderStatus: { color: 'success' | 'error'; message: string } = { color: 'success', message: '' };

    private increaseProductQuantity(cartItem: CartItemState): void {
      CartModule.IncreaseProductQuantity(cartItem.productId);
    }

    private decreaseProductQuantity(cartItem: CartItemState): void {
      CartModule.DecreaseProductQuantity(cartItem.productId);
    }

    private removeAllItems(): void {
      this.cart.RemoveAllCartItems();
    }

    private checkout(): void {
      const orderQuantity = CartModule.totalCartQuantity;
      CartModule.Checkout()
        .then((orderId: string) => {
          this.orderStatus.color = 'success';
          this.orderStatus.message = `You have successfully ordered ${orderQuantity} items. Your order code is ${orderId}`;
          CartModule.RemoveAllCartItems();
        })
        .catch(() => {
          this.orderStatus.color = 'error';
          this.orderStatus.message = `Sorry, your order was not successful.`;
        });
    }
  }
</script>

<style lang="scss" scoped>
  .shopping-cart-summary {
    padding: 20px;
    flex-basis: 100%;
    .cart-icon {
      border-bottom: 2px solid #ececec;
      img {
        width: 40px;
        height: 40px;
      }
    }
    .summary-footer {
      display: flex;
      justify-content: space-around;
      font-size: 0.9rem;
      font-weight: 600;
      color: #717171;
      .total-quantity {
        span {
          font-weight: 700;
        }
      }
      .remove-all {
        cursor: pointer;
        .v-icon {
          margin-top: -2px;
          font-weight: 700;
        }
      }
    }
    .v-btn {
      text-transform: none;
      font-weight: 600;
      font-size: 1.2rem;
      .amount {
        font-weight: 700;
        font-size: 1.3rem;
        margin-left: -2px;
        margin-right: -2px;
      }
      .currency {
        font-family: Poppins;
        font-weight: 500;
        margin-right: -3px;
      }
    }
    .cart-enter-active,
    .cart-leave-active {
      transition: all 1s;
    }
    .cart-enter,
    .cart-leave-to {
      opacity: 0;
      transform: translateY(30px);
    }
    @media screen and (max-width: 1264px) {
      padding: 0;
    }
  }
</style>