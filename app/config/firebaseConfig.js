// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import unOffuscate from "./unOffuscate";

// Your web app's Firebase configuration
const extra = Constants.expoConfig?.extra ?? {};

const firebaseConfig = {
	apiKey: extra.firebaseApiKey,
	authDomain: extra.firebaseAuthDomain,
	projectId: extra.firebaseProjectId,
	storageBucket: extra.firebaseStorageBucket,
	messagingSenderId: extra.firebaseMessagingSenderId,
	appId: extra.firebaseAppId,
};

const app = initializeApp(firebaseConfig);

// Officiellement recommandé pour React Native sur Firebase 10+
const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage)
});

export const autoSignIn = async () => {
	try {
		const email = extra.firebaseDefaultUserEmail;
		const password = extra.firebaseObfuscatedDefaultUserPassword;
		await signInWithEmailAndPassword(auth, email, unOffuscate(password));
		console.log("Utilisateur connecté avec succès !");
	} catch (error) {
		console.log("Erreur lors de la connexion :", error);
	}
};

// Initialize Firestore
export const db = getFirestore(app);


