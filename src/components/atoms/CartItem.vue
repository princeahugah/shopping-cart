<template>
    <div class="cart-item">
        <div class="cart-item--title-actions">
            <div class="title">{{ cartItem.productTitle }}</div>
            <div class="qty-icons">
                <v-icon light
                        size="24"
                        @click="increaseQuantity">{{ mdiArrowUpCircle }}</v-icon>
                <v-icon light
                        size="24"
                        @click="decreaseQuantity">{{ mdiArrowDownCircle }}</v-icon>
            </div>
        </div>
        <div class="cart-item--price-quantity d-flex justify-space-between">
            <div class="price text-theme-primary">
                {{ cartItem.price }}<span class="pr-1">{{ cartItem.currency }}</span> each
            </div>
            <div class="quantity">Quantity: <span>{{ cartItem.quantity }}</span></div>
        </div>
    </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { CartItemState } from '../../services/interfaces/CartItemState';
  import { mdiArrowUpCircle, mdiArrowDownCircle } from '@mdi/js';

  @Component
  export default class CartItem extends Vue {
    @Prop({ required: true }) cartItem!: CartItemState;
    mdiArrowUpCircle = mdiArrowUpCircle;
    mdiArrowDownCircle = mdiArrowDownCircle;

    private increaseQuantity(): void {
      this.$emit('increaseProductQuantity', this.cartItem);
    }

    private decreaseQuantity(): void {
      this.$emit('decreaseProductQuantity', this.cartItem);
    }
  }
</script>

<style lang="scss" scoped>
  .cart-item {
    .cart-item--title-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        font-size: 1.2rem;
        font-weight: 400;
      }
      .qty-icons {
        margin-right: -1px;
      }
    }
    .price {
      font-weight: 700;
      letter-spacing: 1.2px;
      span {
        font-family: Poppins;
        font-weight: 500;
      }
    }
    .quantity {
      color: #717171;
    }
  }
</style>