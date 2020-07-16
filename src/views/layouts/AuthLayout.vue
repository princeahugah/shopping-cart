<template>
    <transition name="fade"
                mode="out-in">
        <v-main>
            <router-view />
        </v-main>
    </transition>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    components: {}
  })
  export default class AuthLayout extends Vue {}
</script>

<style lang="scss">
  .sign-up-form,
  .sign-in-form {
    height: 100%;
    .sign-up-link,
    .sign-in-link {
      font-size: 1.1rem;
      a {
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .row-block {
      display: flex;
      justify-content: center;
      align-items: center;
      height: inherit;
      & > div {
        transform: translateY(-20%);
      }
    }
    .v-card {
      padding: 30px 60px;
      .v-btn {
        font-size: 1.025rem;
      }
    }
    h2.has-error {
      margin-top: 50px;
    }
  }
</style>
