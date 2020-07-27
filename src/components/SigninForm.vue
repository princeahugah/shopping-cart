<template>
    <div class="sign-in-form">
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
                                :timeout="5000"
                                top
                                :value="true">
                        {{ errorMessage }}
                    </v-snackbar>
                    <h2 class="mb-5"
                        :class="{'has-error': !!errorMessage}">Sign in</h2>
                    <v-form @submit.prevent="submitForm">
                        <v-text-field autocomplete="off"
                                      autofocus
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
                                      class="mb-2 password"
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
        emailAddress: { required, email },
        password: { required }
      }
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
    private loading = false;
    private error: IError | null = null;

    get errorMessage(): string | null {
      return UserModule.error?.message ?? null;
    }

    set errorMessage(value: string | null) {
      UserModule.ClearError();
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

    private submitForm(): void {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.loading = true;
        UserModule.AuthenticateUser(this.form).then(() => {
          this.loading = false;
          if (!UserModule.error) {
            if (this.$route.query.redirect) {
              this.$router.push(this.$route.query.redirect as string);
            } else {
              this.$router.push('/');
            }
          }
        });
      }
    }
  }
</script>