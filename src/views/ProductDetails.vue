<template>
    <div class="product-details">Product Details</div>
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
  export default class ProductDetails extends Vue {}
</script>
