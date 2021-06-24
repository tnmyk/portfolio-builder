import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyDEi9yxsDuzZ_FTGipbNNEHxfVKOvi5qfc",
  authDomain: "portfolio-builder-3dc59.firebaseapp.com",
  projectId: "portfolio-builder-3dc59",
  storageBucket: "portfolio-builder-3dc59.appspot.com",
  messagingSenderId: "1064984824115",
  appId: "1:1064984824115:web:aaa78ab9e33e66bf5ad646",
  measurementId: "G-G03KZCZE8S",
};

const app = firebase.initializeApp(firebaseConfig);

export const db = app.firestore()
export const auth = app.auth()

export const provider = new firebase.auth.GoogleAuthProvider();


