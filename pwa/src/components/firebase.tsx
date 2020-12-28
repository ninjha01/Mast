import { v4 as uuid } from "uuid";
import * as firebase from "firebase/app";

// Required for side-effects
require("firebase/auth");
require("firebase/firestore");

const config = {
  apiKey: "FIXME",
  authDomain: "mast-b0959.firebaseapp.com",
  databaseURL: "https://mast-b0959.firebaseio.com",
  projectId: "mast-b0959",
  storageBucket: "mast-b0959.appspot.com",
  messagingSenderId: "318389768634",
  appId: "1:318389768634:web:dd148c8466f591dd0a4d83",
};

export class Firebase {
  db: firebase.firestore.Firestore;
  constructor() {
    if (firebase.apps.length < 1) {
      firebase.initializeApp(config);
      firebase.firestore().enablePersistence();
    }
    firebase
      .auth()
      .signInAnonymously()
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    this.db = firebase.firestore();
  }
}
