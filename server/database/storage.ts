import firebase from "firebase/app";
import "firebase/storage";
import env from "./env";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: env.API_KEY,
    authDomain: env.AUTH_DOMAIN,
    projectId: env.PROJECT_ID,
    storageBucket: env.STORAGE_BUCKET,
    messagingSenderId: env.MESSAGING_SENDERID,
    appId: env.APP_ID,
    measurementId: env.MEASUREMENT_ID,
  });
}

var storage = firebase.storage();

export default storage;
