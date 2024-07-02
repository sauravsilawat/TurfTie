import { initializeApp } from "firebase/app";
import { API_KEY, API_AUTHDOMAIN, API_PROJECTID, API_STORAGEBUCKET, API_SENDERID, API_APPID, API_MEASUREMENTID } from '@env';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: API_AUTHDOMAIN,
    projectId: API_PROJECTID,
    storageBucket: API_STORAGEBUCKET,
    messagingSenderId: API_SENDERID,
    appId: API_APPID,
    measurementId: API_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);

export const usersRef = collection(db, 'users');
export const turfsRef = collection(db, 'listing');