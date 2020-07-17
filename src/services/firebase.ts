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

firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection('users');
const productsCollection = db.collection('products');

// export utils/refs
export { db, auth, usersCollection, productsCollection };
