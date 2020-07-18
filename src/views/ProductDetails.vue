<template>
    <v-container class="product-details"
                 :class="{loading: !product.id}">
        <v-progress-circular v-if="!product.id"
                             :size="70"
                             value="60"
                             color="primary"
                             indeterminate />
        <v-row v-else
               dense
               class="d-flex align-center justify-center">
            <v-col cols="10"
                   sm="8"
                   md="9"
                   lg="8"
                   xl="6">
                <v-card elevation="1">
                    <v-icon light
                            size="30"
                            color="primary"
                            @click="backToProducts">{{ mdiArrowLeftThick }}</v-icon>
                    <v-row>
                        <v-col cols="12"
                               sm="12"
                               md="6"
                               lg="7"
                               xl="7">
                            <div class="product-details--content">
                                <h1 class="title">{{ product.title }}</h1>
                                <span class="tag mt-3"
                                      v-if="product.tag">{{ product.tag }}</span>
                                <div class="pt-8 description">
                                    {{ product.description }}
                                </div>
                                <div class="founded mt-3"
                                     v-if="product.founded">
                                    Founded: <span>{{ product.founded }}</span>
                                </div>
                                <v-btn color="primary"
                                       class="mt-4 mb-5"
                                       depressed
                                       large
                                       @click="addToCart">
                                    Add to Cart
                                </v-btn>
                            </div>
                        </v-col>
                        <v-col v-if="product.imageUrl"
                               cols="12"
                               sm="12"
                               md="6"
                               lg="5"
                               xl="5">
                            <v-img :src="product.imageUrl" />
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { ProductModule } from '../store/modules/product';
  import { CartModule } from '../store/modules/cart';
  import { mdiArrowLeftThick } from '@mdi/js';

  @Component({
    components: {},
    metaInfo: {
      title: 'Product Details'
    }
  })
  export default class ProductDetails extends Vue {
    @Prop() productId!: string;
    product = ProductModule;
    mdiArrowLeftThick = mdiArrowLeftThick;

    created(): void {
      ProductModule.GetProductById(this.productId);
    }

    beforeDestroy(): void {
      ProductModule.ResetProduct();
    }

    private backToProducts(): void {
      this.$router.push('/');
    }

    private addToCart() {
      CartModule.AddProductToCart({
        id: this.product.id,
        title: this.product.title,
        description: this.product.description,
        currency: this.product.currency,
        price: this.product.price
      });
    }
  }
</script>


<style lang="scss" scoped>
  .product-details {
    &.loading {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .v-icon {
      position: absolute;
      top: 10px;
      left: 10px;
    }
    .v-card {
      border: 1px solid #dee1e5;
    }
    .product-details--content {
      padding-top: 30px;
      padding-left: 50px;
      h1 {
        font-weight: 600;
        font-size: 1.8rem !important;
      }
      .tag {
        background-color: #f3f3f3;
        border-radius: 5px;
        padding: 6px 12px;
        font-size: 1rem;
        font-weight: 600;
        display: inline-block;
      }
      .founded {
        font-size: 0.9rem;
        span {
          font-weight: 700;
        }
      }
      .v-btn {
        font-weight: 700;
        padding: 15px 30px;
      }
    }
    .v-image {
      margin: 20px;
      width: 80%;
    }
    @media screen and (max-width: 60em) {
      position: relative;
      z-index: 2;
      margin-top: 60px;
      max-height: calc(100vh - 60px);
      overflow: scroll;
      .v-image {
        width: 60%;
        left: 15%;
      }
      .product-details--content {
        padding: 30px;
        .v-btn {
          width: 100%;
        }
      }
    }
  }
</style>