<template>
    <v-container class="shopping-cart"
                 :class="{ loading: !products.length }">
        <v-progress-circular v-if="!products.length"
                             :size="70"
                             value="60"
                             color="primary"
                             indeterminate />
        <v-row v-else
               class="d-flex justify-center align-center">
            <v-col cols="11"
                   sm="10"
                   md="4"
                   lg="4"
                   xl="4">
                <shopping-cart-summary />
            </v-col>
            <v-col cols="11"
                   sm="10"
                   md="8"
                   lg="8"
                   xl="8">
                <v-card elevation="1"
                        class="px-6 pb-6">
                    <div class="account py-4">
                        <v-icon light
                                size="48">{{ mdiAccountCircle }}</v-icon>
                    </div>

                    <product-listing :products="products" />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import ProductListing from '../components/ProductListing.vue';
  import { ProductModule } from '../store/modules/product';
  import { ProductState } from '../services/interfaces/ProductState';
  import { mdiAccountCircle } from '@mdi/js';
  import ShoppingCartSummary from '../components/ShoppingCartSummary.vue';

  @Component({
    components: { ProductListing, ShoppingCartSummary },
    metaInfo: { title: 'Project Four: Shopping Cart' }
  })
  export default class ShoppingCart extends Vue {
    mdiAccountCircle = mdiAccountCircle;

    get products(): ProductState[] {
      return ProductModule.products;
    }

    created(): void {
      ProductModule.GetProducts();
    }
  }
</script>

<style lang="scss" scoped>
  .shopping-cart {
    display: flex;
    &.loading {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .v-card {
      border: 1px solid #d4d7dd;
      .account {
        display: flex;
        justify-content: center;
        border-bottom: 2px solid #ececec;
      }
    }
    @media screen and (min-width: 1520px) {
      max-width: 1408px;
    }
    @media (min-width: 1820px) {
      max-width: 1785px;
    }
  }
</style>
