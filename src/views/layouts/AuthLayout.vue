<template>
    <transition name="fade"
                mode="out-in">
        <v-main>
            <transition name="slideInLeft">
                <div class="bg-svg"
                     v-if="animate">
                    <img src="@img/50277.svg" />
                </div>
            </transition>
            <v-container>
                <router-view />
            </v-container>
        </v-main>
    </transition>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class AuthLayout extends Vue {
    private animate = false;

    mounted(): void {
      this.animate = true;
    }
  }
</script>

<style lang="scss" scoped>
  .v-main {
    background-image: url('../../assets/img/bg.svg') !important;
  }
</style>

<style lang="scss">
  .sign-in-form {
    transform: translateY(25%);
  }
  .sign-up-form {
    transform: translateY(17%);
  }
  .sign-up-form,
  .sign-in-form {
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
