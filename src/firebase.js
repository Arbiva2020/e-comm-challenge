import firebase from "firebase";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCih6pqejFObRkVJd7zmoI95JzNos-LEro",
    authDomain: "e-comm-challenge.firebaseapp.com",
    projectId: "e-comm-challenge",
    storageBucket: "e-comm-challenge.appspot.com",
    messagingSenderId: "513296460262",
    appId: "1:513296460262:web:ffec5ec5a92aabf0e98e27",
    measurementId: "G-BMWD4E69Z2"
  };

  //initializing the app:
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  // initiallizing the data base:
const db = firebaseApp.firestore();

  //a variable that can help us sign in etc.:
const auth = firebase.auth();

//to use these things outside the file:
export { db, auth };


//Firebase Remote Config is a cloud service that lets you change 
//the behavior and appearance of your app without requiring users to 
//download an app update. When using Remote Config, you create in-app 
//default values that control the behavior and appearance of your app