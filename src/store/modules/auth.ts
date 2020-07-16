import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from '../index';
import { User } from '../../services/interfaces/User';
import { AuthError } from '../../services/interfaces/Error';
import AuthApi from '../../services/api/AuthApi';

@Module({
  name: 'Auth',
  dynamic: true,
  store: store
})
export default class AuthStore extends VuexModule {
  private userData: firebase.User | null = null;
  private error: AuthError | null = null;

  get user(): firebase.User | null {
    return this.userData;
  }

  get errorMessage(): string | null {
    return this.error?.message ?? null;
  }

  @Mutation
  public setError(error: AuthError): void {
    this.error = error;
  }

  @Mutation
  public setUser(user: firebase.User | null): void {
    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      this.userData = user;
    }
  }

  @Action
  public createUser(payload: User): Promise<void> {
    return AuthApi.createUserAccount(payload.emailAddress, payload.password!)
      .then((userCredential) => {
        return AuthApi.updateUserProfile(userCredential, payload.name as string, (user) => {
          this.context.commit('setUser', user?.toJSON());
        });
      })
      .catch((error) => {
        this.context.commit('setError', error);
        return Promise.reject(error);
      });
  }

  @Action
  public authenticate(payload: User): Promise<void> {
    return AuthApi.authenticate(payload.emailAddress, payload.password!)
      .then((userCredential) => {
        this.context.commit('setUser', userCredential.user?.toJSON());
      })
      .catch((error) => {
        this.context.commit('setError', error);
        return Promise.reject(error);
      });
  }
}
