<template>
    <div class="shopping-cart">Shopping Cart</div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  //   import TodoUsers from '../components/TodoUsers.vue';

  @Component({
    components: {
      //   TodoUsers
    },
    metaInfo: {
      title: 'Shopping Cart',
    },
  })
  export default class ShoppingCart extends Vue {}
</script>
