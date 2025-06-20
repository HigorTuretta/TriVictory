import React, { createContext, useState, useEffect, useContext } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
    updateProfile,
    sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config'; // Importa a configuração do Firebase

// 1. Cria o Contexto
const AuthContext = createContext();

// 2. Cria um hook customizado para facilitar o uso do contexto
export const useAuth = () => {
    return useContext(AuthContext);
};

// 3. Cria o Provedor do Contexto
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Função de Cadastro com Email/Senha
    const register = async (nickname, email, password) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: nickname });
        
        const userDocRef = doc(db, "users", userCredential.user.uid);
        await setDoc(userDocRef, {
            uid: userCredential.user.uid,
            nickname: nickname,
            email: email,
        });

        // Atualiza o currentUser localmente para refletir o nickname imediatamente
        const userDoc = await getDoc(userDocRef);
        setCurrentUser({ ...userCredential.user, ...userDoc.data() });

        return userCredential;
    };

    // Função de Login com Email/Senha
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Função de Login com Google
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            await setDoc(userDocRef, {
                uid: user.uid,
                nickname: user.displayName,
                email: user.email,
            });
        }
    };
    
    // Função para recuperar senha
    const forgotPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    }

    // Função de Logout
    const logout = () => {
        return signOut(auth);
    };

    // Efeito que observa o estado de autenticação do usuário
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setCurrentUser({ ...user, ...userDoc.data() });
                } else {
                    setCurrentUser(user);
                }
            } else {
                setCurrentUser(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        register,
        login,
        signInWithGoogle,
        logout,
        forgotPassword
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
