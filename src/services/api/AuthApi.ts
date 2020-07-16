import * as firebase from 'firebase/app';

export default class AuthApi {
  static createUserAccount(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  static updateUserProfile(
    payload: firebase.auth.UserCredential,
    name: string,
    callback: (user: firebase.User | null) => void
  ): void {
    firebase.auth().onAuthStateChanged(callback);
    payload.user?.updateProfile({
      displayName: name
    });
  }

  static authenticate(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  static signOut(): Promise<void> {
    return firebase.auth().signOut();
  }
}
