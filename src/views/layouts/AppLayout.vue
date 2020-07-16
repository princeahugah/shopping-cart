<template>
    <transition name="fade"
                mode="out-in">
        <v-main>
            <router-view class="main-view" />
            <v-footer class="py-5">
                <span class="mr-3">version GIT_COMMIT_ID</span>
            </v-footer>
        </v-main>
    </transition>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class App extends Vue {}
</script>

<style lang="scss" scoped>
  .v-main {
    .main-view {
      height: calc(100vh - 60px);
    }
  }
  .v-footer {
    justify-content: center;
    background-color: transparent !important;
    span {
      font-size: 0.8rem;
    }
  }
</style>
