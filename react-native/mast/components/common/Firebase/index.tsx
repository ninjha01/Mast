import firebase from "@react-native-firebase/app";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import "@react-native-firebase/storage";

import { FIREBASE_API_KEY } from "react-native-dotenv";

const config = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "mast-b0959.firebaseapp.com",
  databaseURL: "https://mast-b0959.firebaseio.com",
  projectId: "mast-b0959",
  storageBucket: "mast-b0959.appspot.com",
  messagingSenderId: "318389768634",
  appId: "1:318389768634:web:dd148c8466f591dd0a4d83",
  cacheSizeBytes: firestore.CACHE_SIZE_UNLIMITED // unlimited cache size
};

class Firebase {
  constructor() {
    if (firebase.apps.length < 1) {
      firebase.initializeApp(config);
    }

    if (!auth().currentUser) {
      auth()
        .signInAnonymously()
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }

    this.getAllergenCollection();
  }

  getAllergenCollection(query?: string, query_type?: string) {
    query = typeof query === "undefined" ? "" : query;
    query_type = typeof query_type === "undefined" ? "" : query_type;
    if (query_type === "category") {
      return firebase
        .firestore()
        .collection("allergens")
        .where("category", "==", query);
    }
    if (query_type === "name") {
      const start = query;
      const end = start + "\uf8ff";
      return firebase
        .firestore()
        .collection("allergens")
        .orderBy("name")
        .startAt(start)
        .endAt(end);
    }
    return firebase
      .firestore()
      .collection("allergens")
      .get();
  }

  //TODO: replace dummy url
  getURLByName(filename) {
    const storage = firebase.storage();
    const gsUrl = "gs://mast-b0959.appspot.com/movies/" + filename;
    const videoRef = storage.refFromURL(gsUrl);
    return videoRef.getDownloadURL();
  }
}

export default Firebase;
