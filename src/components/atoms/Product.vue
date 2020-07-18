<template>
    <div class="product">
        <div class="product-header">
            <div class="title"
                 @click="gotoProductDetails">{{ product.title }}</div>
            <v-btn color="primary"
                   depressed
                   small
                   class="add-to-cart"
                   @click="handleClick">
                Add to Cart
            </v-btn>
        </div>
        <div class="description">{{ product.description }}</div>
        <div class="price text-theme-primary">
            <span class="pr-1">{{ product.currency }}</span>{{ product.price }}
        </div>
    </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { ProductState } from '../../services/interfaces/ProductState';

  @Component
  export default class Product extends Vue {
    @Prop({ required: true }) product!: ProductState;

    private handleClick(): void {
      this.$emit('addToCart', this.product);
    }

    private gotoProductDetails(): void {
      this.$emit('navigateToProductDetails', this.product.id);
    }
  }
</script>

<style lang="scss" scoped>
  .product {
    .product-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        font-size: 1.2rem;
        font-weight: 700;
        font-family: Nunito, serif !important;
        cursor: pointer;
      }
      .v-btn {
        text-transform: none;
        font-weight: 700;
        font-size: 1rem;
        letter-spacing: normal;
      }
    }
    .price {
      font-weight: 700;
      letter-spacing: 1.2px;
    }
  }
</style>