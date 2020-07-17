<template>
    <div class="logo mb-4">
        <img src="@img/logo.svg" />
        <h1 class="ml-3">Amazing Online Store</h1>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class Logo extends Vue {}
</script>

<style lang="scss" scoped>
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 48px;
    }
    @media screen and (max-width: 768px) {
      h1 {
        font-size: 1.8rem;
      }
    }
  }
</style>