import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.apiKey as string,
  authDomain: process.env.authDomain as string,
  databaseURL: process.env.databaseURL as string,
  projectId: process.env.projectId as string,
  storageBucket: process.env.storageBucket as string,
  messagingSenderId: process.env.messagingSenderId as string,
  appId: process.env.appId as string
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
