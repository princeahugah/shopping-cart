import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '../index';
import { UserState } from '../../services/interfaces/UserState';
import { IError } from '../../services/interfaces/Error';
import fb from '../../services/firebase';
import * as firebase from 'firebase/app';

@Module({ name: 'user', store, dynamic: true })
class User extends VuexModule implements UserState {
  public error: IError | null = null;
  public id = '';
  public name = '';
  public email = '';

  @Mutation
  private SET_ERROR(error: IError | null): void {
    this.error = error;
  }

  @Mutation
  private SET_USER_PROFILE(userData: firebase.firestore.DocumentData | undefined): void {
    if (userData) {
      this.id = userData.id;
      this.name = userData.name;
      this.email = userData.email;
    }
  }

  @Action
  public async GetUserProfile(id: string): Promise<firebase.firestore.DocumentData | undefined | void> {
    return fb.usersCollection
      .doc(id)
      .get()
      .then((userProfile: any) => {
        this.SET_USER_PROFILE(Object.assign({}, { id: userProfile.id }, userProfile.data()));
      })
      .catch((error: IError) => {
        this.SET_ERROR(error);
      });
  }

  @Action
  public async CreateUser(payload: { name: string; emailAddress: string; password: string }): Promise<void> {
    try {
      const { user } = await fb.auth.createUserWithEmailAndPassword(payload.emailAddress, payload.password);
      await user!.updateProfile({ displayName: payload.name });
      await fb.usersCollection.doc(user!.uid).set({ name: payload.name, email: payload.emailAddress });
      await this.GetUserProfile(user!.uid);
    } catch (error) {
      this.SET_ERROR(error);
    }
  }

  @Action
  public async AuthenticateUser(payload: { emailAddress: string; password: string }): Promise<void> {
    try {
      const { user } = await fb.auth.signInWithEmailAndPassword(payload.emailAddress, payload.password);
      await this.GetUserProfile(user!.uid);
    } catch (error) {
      this.SET_ERROR(error);
    }
  }

  @Action({ commit: 'SET_ERROR' })
  public ClearError() {
    this.SET_ERROR(null);
  }
}

export const UserModule = getModule(User);
