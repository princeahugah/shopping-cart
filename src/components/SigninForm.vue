<template>
    <v-container class="sign-in-form">
        <img class="bg-svg"
             src="@img/50277.svg" />
        <v-row class="row-block"
               dense>
            <v-col cols="10"
                   sm="8"
                   md="7"
                   lg="6"
                   xl="4">
                <logo />
                <v-card>
                    <v-snackbar v-if="errorMessage"
                                absolute
                                class="mb-4"
                                color="error"
                                elevation="0"
                                @input="errorMessage = ''"
                                :timeout="10000"
                                top
                                :value="true">
                        {{ errorMessage }}
                    </v-snackbar>
                    <h2 class="mb-5"
                        :class="{'has-error': !!errorMessage}">Sign in</h2>
                    <v-form @submit.prevent="submitForm">
                        <v-text-field autocomplete="off"
                                      background-color=""
                                      class="mb-3"
                                      clearable
                                      :error-messages="emailErrors"
                                      label="Email"
                                      outlined
                                      rounded
                                      v-model="form.emailAddress"
                                      @input="$v.form.emailAddress.$touch()"
                                      @blur="$v.form.emailAddress.$touch()" />
                        <v-text-field :append-icon="showPassword ? mdiEye : mdiEyeOff"
                                      autocomplete="off"
                                      class="mb-2"
                                      @click:append="showPassword = !showPassword"
                                      :error-messages="passwordErrors"
                                      label="Password"
                                      outlined
                                      rounded
                                      :type="showPassword ? 'text' : 'password'"
                                      v-model="form.password"
                                      @input="$v.form.password.$touch()"
                                      @blur="$v.form.password.$touch()" />
                        <div class="sign-up-link mb-3">
                            No account?
                            <router-link to="/signup">Create one</router-link>
                        </div>
                        <v-btn class="mt-4"
                               color="primary"
                               :disabled="loading"
                               large
                               width="100%"
                               :loading="loading"
                               type="submit">
                            Sign in
                        </v-btn>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { getModule } from 'vuex-module-decorators';
  import Auth from '../store/modules/auth';
  import { validationMixin } from 'vuelidate';
  import { required, email } from 'vuelidate/lib/validators';
  import { mdiEye, mdiEyeOff } from '@mdi/js';
  import Logo from './atoms/Logo.vue';

  @Component({
    components: { Logo },
    mixins: [validationMixin],
    validations: {
      form: {
        emailAddress: { required, email },
        password: { required }
      }
    },
    metaInfo: {
      title: 'Sign in | Online Shopping'
    }
  })
  export default class SigninForm extends Vue {
    private mdiEye = mdiEye;
    private mdiEyeOff = mdiEyeOff;
    private showPassword = false;
    private form = {
      emailAddress: '',
      password: ''
    };
    private requiredFieldMessage = 'This field is required';
    private authStore = getModule(Auth);
    private loading = false;
    private errorMessage = '';

    get emailErrors(): string[] {
      const errors: string[] = [];
      if (!this.$v.form.emailAddress!.$dirty) return errors;
      if (!this.$v.form.emailAddress!.required) errors.push(this.requiredFieldMessage);
      else if (!this.$v.form.emailAddress!.email) errors.push('Invalid email address');

      return errors;
    }

    get passwordErrors(): string[] {
      const errors: string[] = [];
      if (!this.$v.form.password!.$dirty) return errors;
      if (!this.$v.form.password!.required) errors.push(this.requiredFieldMessage);

      return errors;
    }

    submitForm(): void {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.loading = true;
        this.authStore
          .authenticate(this.form)
          .then(() => {
            this.$router.push('/');
          })
          .catch(() => {
            this.errorMessage = this.authStore.errorMessage as string;
          })
          .finally(() => {
            this.loading = false;
          });
      }
    }
  }
</script>