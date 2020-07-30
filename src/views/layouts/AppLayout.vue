<template>
    <transition name="fade"
                mode="out-in">
        <v-main class="d-flex justify-center align-center">
            <div class="toolbar pl-5 pt-1 pr-2">
                <router-link to="/signout"
                             class="text-primary">
                    Logout
                </router-link>
                <div class="userbox">
                    <div class="user py-1 px-3 mr-2">
                        <v-icon light
                                size="24">{{ mdiAccountCircle }}</v-icon>
                        <span class="ml-1">{{ displayName }}</span>
                    </div>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <div v-on="on"
                                 class="cart-quantity bg-primary border-primary">
                                <v-icon dark
                                        size="18"
                                        left>{{ mdiCart }}</v-icon>
                                <span class="total">{{ cart.cartItems.length }}</span>
                            </div>
                        </template>
                        <span>{{ productsInCart }}</span>
                    </v-tooltip>
                </div>
            </div>
            <router-view />
        </v-main>
    </transition>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { mdiAccountCircle, mdiCart } from '@mdi/js';
  import { CartModule } from '../../store/modules/cart';
  import fb from '../../services/firebase';

  @Component
  export default class AppLayout extends Vue {
    cart = CartModule;
    mdiAccountCircle = mdiAccountCircle;
    mdiCart = mdiCart;

    get productsInCart(): string {
      if (this.cart.cartItems.length > 1) {
        return `${this.cart.cartItems.length} items in cart`;
      }
      if (this.cart.cartItems.length === 1) {
        return `${this.cart.cartItems.length} item in cart`;
      }
      return 'Empty cart';
    }

    get displayName(): string {
      return fb.auth.currentUser!.displayName as string;
    }
  }
</script>

<style lang="scss" scoped>
  .v-main {
    background-color: #f1f5f9;
    .toolbar {
      position: fixed;
      height: 50px;
      z-index: 3;
      top: 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .userbox {
        display: inline-flex;
        align-items: center;

        .user {
          border: 0.0938rem solid #dadcde;
          border-radius: 4px;
          background-color: #fff;
          display: inline-flex;
          align-items: center;
          cursor: default;
        }
        .cart-quantity {
          color: white;
          font-weight: 600;
          align-items: center;
          border-radius: 4px;
          display: inline-flex;
          justify-content: center;
          padding: 5px 12px;
          cursor: default;
        }
      }
    }
  }
</style>
