import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDWAMsA2L2sFHofNrPJHfYCfmfWcmE_tSM',
  authDomain: 'shopping-cart-af2dc.firebaseapp.com',
  databaseURL: 'https://shopping-cart-af2dc.firebaseio.com',
  projectId: 'shopping-cart-af2dc',
  storageBucket: 'shopping-cart-af2dc.appspot.com',
  messagingSenderId: '796626809357',
  appId: '1:796626809357:web:618b43efebe1e195f9db44'
};

let firebaseService: any = { db: {}, auth: {}, usersCollection: {}, productsCollection: {}, ordersCollection: {} };
// initializeApp and firestore are only available within the context of a browser
// this means we would be unable to run tests for components importing this module
if (firebase.initializeApp && firebase.firestore) {
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const auth = firebase.auth();
  const usersCollection = db.collection('users');
  const productsCollection = db.collection('products');
  const ordersCollection = db.collection('orders');

  firebaseService = { db, auth, usersCollection, productsCollection, ordersCollection };
}

export default firebaseService;
