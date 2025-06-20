import React, { useState, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import toast, { Toaster } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Contexto e Rota Protegida
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Layouts e Telas
import { MainLayout } from './layout/MainLayout';
import { Login } from './screens/auth/Login';
import { Register } from './screens/auth/Register';
import { ForgotPassword } from './screens/auth/ForgotPassword';
import { CharacterSelect } from './screens/CharacterSelect';
import { CharacterSheet } from './screens/CharacterSheet';
import { ArchetypeCreator } from './screens/ArchetypeCreator';

// Estilos e Tema
import { lightTheme, darkTheme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';

// Dados Padrão do Jogo
import { pericias, vantagens, desvantagens, arquetipos, moedas } from './data/gameData';

// Componente Interno para gerenciar os dados e as rotas logadas
const AppRoutes = () => {
    const { currentUser } = useAuth();

    // A lógica de dados agora vive aqui, dentro do escopo de um usuário logado
    const [customSkills, setCustomSkills] = useLocalStorage(`3det_custom_skills_${currentUser?.uid}`, []);
    const [customAdvantages, setCustomAdvantages] = useLocalStorage(`3det_custom_advantages_${currentUser?.uid}`, []);
    const [customDisadvantages, setCustomDisadvantages] = useLocalStorage(`3det_custom_disadvantages_${currentUser?.uid}`, []);
    const [customArchetypes, setCustomArchetypes] = useLocalStorage(`3det_custom_archetypes_${currentUser?.uid}`, []);

    const addCustomItem = useCallback((type, item) => {
        const newItem = { ...item, id: uuidv4(), custom: true };
        if (type === 'pericias') setCustomSkills(prev => [...prev, newItem]);
        if (type === 'vantagens') setCustomAdvantages(prev => [...prev, newItem]);
        if (type === 'desvantagens') setCustomDisadvantages(prev => [...prev, newItem]);
        if (type === 'arquetipos') setCustomArchetypes(prev => [...prev, newItem]);
    }, [setCustomSkills, setCustomAdvantages, setCustomDisadvantages, setCustomArchetypes]);

    const updateCustomItem = useCallback((type, updatedItem) => {
        const updater = (prev) => prev.map(item => item.id === updatedItem.id ? updatedItem : item);
        if (type === 'pericias') setCustomSkills(updater);
        if (type === 'vantagens') setCustomAdvantages(updater);
        if (type === 'desvantagens') setCustomDisadvantages(updater);
    }, [setCustomSkills, setCustomAdvantages, setCustomDisadvantages]);

    const deleteCustomItem = useCallback((type, itemId) => {
        const updater = (prev) => prev.filter(item => item.id !== itemId);
        if (type === 'pericias') setCustomSkills(updater);
        if (type === 'vantagens') setCustomAdvantages(updater);
        if (type === 'desvantagens') setCustomDisadvantages(updater);
    }, [setCustomSkills, setCustomAdvantages, setCustomDisadvantages]);

    const allData = {
        pericias: [...pericias, ...customSkills],
        vantagens: [...vantagens, ...customAdvantages],
        desvantagens: [...desvantagens, ...customDisadvantages],
        arquetipos: [...arquetipos, ...customArchetypes],
    };

    return (
        <Routes>
            {/* Rotas Públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Rotas Protegidas */}
            <Route path="/" element={<ProtectedRoute><MainLayout><CharacterSelect /></MainLayout></ProtectedRoute>} />
            <Route path="/sheet/:characterId" element={<ProtectedRoute><CharacterSheet gameData={allData} onAddCustomItem={addCustomItem} onUpdateCustomItem={updateCustomItem} onDeleteCustomItem={deleteCustomItem} /></ProtectedRoute>} />
            <Route path="/creator/archetype" element={<ProtectedRoute><MainLayout><ArchetypeCreator gameData={allData} onSave={(newItem) => addCustomItem('arquetipos', newItem)} /></MainLayout></ProtectedRoute>} />
            
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

function App() {
    const [theme, setTheme] = useState('dark');
    const currentTheme = theme === 'light' ? lightTheme : darkTheme;

    return (
        <ThemeProvider theme={currentTheme}>
            <GlobalStyle />
            <Toaster position="top-right" toastOptions={{ style: { background: currentTheme.surface, color: currentTheme.textPrimary, border: `1px solid ${currentTheme.border}` } }} />
            <BrowserRouter>
                <AuthProvider>
                    <AppRoutes />
                </AuthProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
