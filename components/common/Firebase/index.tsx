import firebase from "@react-native-firebase/app";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import "@react-native-firebase/storage";

const config = {
  // apiKey: FIREBASE_API_KEY,
  // authDomain: 
  // databaseURL:
  // projectId:
  // storageBucket:
  // messagingSenderId:
  // appId:
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
  }
}

export default Firebase;
