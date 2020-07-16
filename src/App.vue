<template>
    <v-app id="online-shopping">
        <router-view />
    </v-app>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    components: {}
  })
  export default class App extends Vue {}
</script>

<style src="./assets/scss/main.scss" lang="scss"></style>
<style lang="scss" scoped>
  .v-application {
    background-image: url('./assets/img/bg.svg') !important;
  }
</style>