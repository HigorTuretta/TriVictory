import React, { createContext, useState, useEffect, useContext } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
    updateProfile,
    sendPasswordResetEmail,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

// --- Função Auxiliar Privada ---
// Centraliza a lógica de buscar o documento do Firestore e mesclar com o usuário da autenticação.
const _getMergedUser = async (authUser) => {
    if (!authUser) return null;

    const userDocRef = doc(db, "users", authUser.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
        return { ...authUser, ...userDoc.data() }; // Mescla dados do Auth e Firestore
    }
    return authUser; // Retorna apenas dados do Auth se o documento não existir
};


export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const register = async (nickname, email, password) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: nickname });

        const userDocRef = doc(db, "users", userCredential.user.uid);
        await setDoc(userDocRef, {
            uid: userCredential.user.uid,
            nickname: nickname,
            email: email,
        });

        const mergedUser = await _getMergedUser(userCredential.user);
        setCurrentUser(mergedUser);
        return userCredential;
    };

    const login = async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const mergedUser = await _getMergedUser(userCredential.user);
        setCurrentUser(mergedUser);
        return userCredential;
    };

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
        
        const mergedUser = await _getMergedUser(user);
        setCurrentUser(mergedUser);
    };

    const forgotPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    const logout = () => {
        setCurrentUser(null);
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            const mergedUser = await _getMergedUser(user);
            setCurrentUser(mergedUser);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        isLoading: loading, // Exporta o estado de loading
        register,
        login,
        signInWithGoogle,
        logout,
        forgotPassword
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};