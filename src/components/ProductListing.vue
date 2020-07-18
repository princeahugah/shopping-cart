<template>
    <div class="product-listing">
        <div class="products">
            <product v-for="product in products"
                     :key="product.id"
                     :product="product"
                     @addToCart="addProductToCart"
                     @navigateToProductDetails="navigateToProductDetails"
                     class="pt-5" />
        </div>
        <div class="total-products pt-4"># of products: {{ products.length }}</div>
    </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import Product from './atoms/Product.vue';
  import { ProductState } from '../services/interfaces/ProductState';
  import { CartModule } from '../store/modules/cart';

  @Component({
    components: { Product }
  })
  export default class ProductListing extends Vue {
    @Prop() products!: ProductState[];

    private addProductToCart(product: ProductState): void {
      CartModule.AddProductToCart(product);
    }

    private navigateToProductDetails(productId: string) {
      this.$router.push(`/products/${productId}`);
    }
  }
</script>

<style lang="scss" scoped>
  .product-listing {
    display: flex;
    flex-direction: column;
    .total-products {
      display: flex;
      justify-content: flex-end;
      font-weight: 700;
      font-size: 1.2rem;
    }
  }
</style>
