import firebase from "firebase"

export const firebaseConfig =  {
    apiKey: "AIzaSyCsOHuugeqca_ooYQUs7w19hAZgk7LcfFg",
    authDomain: "platziblog-31c7e.firebaseapp.com",
    databaseURL: "https://platziblog-31c7e.firebaseio.com",
    projectId: "platziblog-31c7e",
    storageBucket: "platziblog-31c7e.appspot.com",
    messagingSenderId: "1093272134999",
    appId: "1:1093272134999:web:2aa7684edc6c9291234a12",
    measurementId: "G-HXPKMHDBXT"
}

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase
