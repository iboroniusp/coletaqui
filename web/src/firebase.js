import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC3txONm6-4Gk3avG_BqGcfXhfXxlLc4WY",
    authDomain: "coleta-aqui.firebaseapp.com",
    databaseURL: "https://coleta-aqui.firebaseio.com",
    projectId: "coleta-aqui",
    storageBucket: "coleta-aqui.appspot.com",
    messagingSenderId: "883554167578",
    appId: "1:883554167578:web:b9d8fc06b538f77f455aa3"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
