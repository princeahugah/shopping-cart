<template>
    <v-app id="online-shopping">
        <router-view />
    </v-app>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class App extends Vue {}
</script>

<style src="./assets/scss/main.scss" lang="scss"></style>