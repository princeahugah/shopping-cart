<template>
    <div class="sign-up-form">
        <v-row class="align-center justify-center"
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
                                class="mb-4 error-message"
                                color="error"
                                elevation="0"
                                @input="errorMessage = null"
                                :timeout="10000"
                                top
                                :value="true">
                        {{ errorMessage }}
                    </v-snackbar>
                    <h2 class="mb-5"
                        :class="{'has-error': !!errorMessage}">Create account</h2>
                    <v-form @submit.prevent="submitForm">
                        <v-text-field autocomplete="off"
                                      autofocus
                                      background-color=""
                                      class="mb-3 fullname"
                                      clearable
                                      :error-messages="nameErrors"
                                      label="Full name"
                                      outlined
                                      rounded
                                      v-model="form.name"
                                      @input="$v.form.name.$touch()"
                                      @blur="$v.form.name.$touch()" />
                        <v-text-field autocomplete="off"
                                      background-color=""
                                      class="mb-3 email"
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
                                      class="mb-3 password"
                                      @click:append="showPassword = !showPassword"
                                      :error-messages="passwordErrors"
                                      label="Password"
                                      outlined
                                      rounded
                                      :type="showPassword ? 'text' : 'password'"
                                      v-model="form.password"
                                      @input="$v.form.password.$touch()"
                                      @blur="$v.form.password.$touch()" />
                        <div class="sign-in-link mb-3">
                            Already have an account?
                            <router-link to="/signin">Sign in here</router-link>
                        </div>
                        <v-btn class="mt-4"
                               color="primary"
                               :disabled="loading"
                               large
                               width="100%"
                               :loading="loading"
                               type="submit">
                            Create Account
                        </v-btn>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { UserModule } from '../store/modules/user';
  import { validationMixin } from 'vuelidate';
  import { required, email } from 'vuelidate/lib/validators';
  import { mdiEye, mdiEyeOff } from '@mdi/js';
  import Logo from './atoms/Logo.vue';
  import { IError } from '../services/interfaces/Error';

  @Component({
    components: { Logo },
    mixins: [validationMixin],
    validations: {
      form: {
        name: { required },
        emailAddress: { required, email },
        password: { required }
      }
    }
  })
  export default class SignupForm extends Vue {
    private mdiEye = mdiEye;
    private mdiEyeOff = mdiEyeOff;
    private showPassword = false;
    private form = {
      name: '',
      emailAddress: '',
      password: ''
    };
    private requiredFieldMessage = 'This field is required';
    private loading = false;
    private error: IError | null = null;
    private animate = false;

    get errorMessage(): string | null {
      return UserModule.error?.message ?? null;
    }

    set errorMessage(value: string | null) {
      UserModule.ClearError();
    }

    get nameErrors(): string[] {
      const errors: string[] = [];
      if (!this.$v.form.name!.$dirty) return errors;
      if (!this.$v.form.name!.required) errors.push(this.requiredFieldMessage);

      return errors;
    }

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

    mounted(): void {
      this.animate = true;
    }

    private submitForm(): void {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.loading = true;
        UserModule.CreateUser(this.form)
          .then(() => {
            this.loading = false;
            if (!UserModule.error) {
              if (this.$route.query.redirect) {
                this.$router.push(this.$route.query.redirect as string);
              } else {
                this.$router.push('/');
              }
            }
          })
          .catch(() => {
            //do nothing
          });
      }
    }
  }
</script>
