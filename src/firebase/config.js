// src/firebase/config.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// A configuração do Firebase é lida das variáveis de ambiente
const firebaseConfig = {
  apiKey:           import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:       import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:        import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:            import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId:    import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Inicializa o app do Firebase
const app = initializeApp(firebaseConfig);

// Exporta os serviços que vamos usar no resto da aplicação
export const auth = getAuth(app);
export const db = getFirestore(app);