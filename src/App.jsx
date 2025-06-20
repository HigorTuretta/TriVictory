import React, { useState, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import toast, { Toaster } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

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
import { Rooms } from './screens/Rooms';
import { GameRoom } from './screens/GameRoom';
import { Invite } from './screens/Invite';

// Estilos e Tema
import { lightTheme, darkTheme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';

// Dados Padrão do Jogo
import { pericias, vantagens, desvantagens, arquetipos } from './data/gameData';

// Componente Interno para gerenciar as rotas e os dados globais do usuário logado
const AppRoutes = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    // A lógica de dados agora vive aqui, dentro do escopo de um usuário logado
    // Usamos o UID do usuário na chave do localStorage para separar os dados de cada um
    const [customSkills, setCustomSkills] = useLocalStorage(`3det_custom_skills_${currentUser?.uid}`, []);
    const [customAdvantages, setCustomAdvantages] = useLocalStorage(`3det_custom_advantages_${currentUser?.uid}`, []);
    const [customDisadvantages, setCustomDisadvantages] = useLocalStorage(`3det_custom_disadvantages_${currentUser?.uid}`, []);
    const [customArchetypes, setCustomArchetypes] = useLocalStorage(`3det_custom_archetypes_${currentUser?.uid}`, []);

    // Funções para manipular os itens customizados
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
        if (type === 'arquetipos') setCustomArchetypes(updater);
    }, [setCustomSkills, setCustomAdvantages, setCustomDisadvantages, setCustomArchetypes]);

    const deleteCustomItem = useCallback((type, itemId) => {
        const updater = (prev) => prev.filter(item => item.id !== itemId);
        if (type === 'pericias') setCustomSkills(updater);
        if (type === 'vantagens') setCustomAdvantages(updater);
        if (type === 'desvantagens') setCustomDisadvantages(updater);
        if (type === 'arquetipos') setCustomArchetypes(updater);
    }, [setCustomSkills, setCustomAdvantages, setCustomDisadvantages, setCustomArchetypes]);

    // Combina os dados padrão com os customizados do usuário logado
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
            <Route path="/invite/:roomId" element={<ProtectedRoute><Invite /></ProtectedRoute>} />

            {/* Rotas Protegidas que exigem Login */}
            <Route path="/" element={<ProtectedRoute><MainLayout><Rooms /></MainLayout></ProtectedRoute>} />
            <Route path="/characters" element={<ProtectedRoute><MainLayout><CharacterSelect /></MainLayout></ProtectedRoute>} />
            <Route path="/room/:roomId" element={<ProtectedRoute><MainLayout><GameRoom /></MainLayout></ProtectedRoute>} />
            
            <Route path="/sheet/:characterId" element={
                <ProtectedRoute>
                    <CharacterSheet
                        gameData={allData}
                        onAddCustomItem={addCustomItem}
                        onUpdateCustomItem={updateCustomItem}
                        onDeleteCustomItem={deleteCustomItem}
                        goToArchetypeCreator={() => navigate('/creator/archetype')}
                    />
                </ProtectedRoute>
            } />

            <Route path="/creator/archetype" element={
                <ProtectedRoute>
                    <MainLayout>
                        <ArchetypeCreator
                            gameData={allData}
                            onSave={(newItem) => {
                                addCustomItem('arquetipos', newItem);
                                // A navegação de volta pode ser gerenciada dentro do componente ou aqui
                                navigate(-1); // Volta para a página anterior (a ficha)
                            }}
                        />
                    </MainLayout>
                </ProtectedRoute>
            } />
            
            {/* Rota para redirecionar qualquer caminho não encontrado */}
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
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: currentTheme.surface,
                        color: currentTheme.textPrimary,
                        border: `1px solid ${currentTheme.border}`,
                    },
                }}
            />
            <BrowserRouter>
                <AuthProvider>
                    <AppRoutes />
                </AuthProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
