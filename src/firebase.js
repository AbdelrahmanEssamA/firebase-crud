import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";
var firebaseConfig = {
   apiKey: "AIzaSyAUN_69oERxJB_s1ZBCeKCD8pUPFiN9h_Y",
   authDomain: "crud-firebase-ae.firebaseapp.com",
   projectId: "crud-firebase-ae",
   storageBucket: "crud-firebase-ae.appspot.com",
   messagingSenderId: "615771571293",
   appId: "1:615771571293:web:9e1677a0619b3ebabdf9b4",
};
// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);

const firestore = app.firestore();
export const firebaseStore = {
   contacts: firestore.collection("contacts"),
   formatDoc: (doc) => {
      return { id: doc.id, ...doc.data() };
   },
};

export default app.database().ref();
