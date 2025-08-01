// src/App.jsx
import React from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, Outlet } from 'react-router-dom';

// Contexto e Rota Protegida
import { AuthProvider } from './contexts/AuthContext';
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

// Hook para gerenciar dados customizados
import { useUserCustomData } from './hooks/useUserCustomData';

// Componente Interno para gerenciar as rotas
const AppRoutes = () => {
    const navigate = useNavigate();
    const { allData, addCustomItem, updateCustomItem, deleteCustomItem } = useUserCustomData();

    return (
        <Routes>
            {/* === ROTAS SEM LAYOUT (TELA CHEIA) === */}
            <Route path="/room/:roomId" element={<ProtectedRoute><GameRoom /></ProtectedRoute>} />
            <Route path="/sheet/:characterId" element={
                <ProtectedRoute>
                    <CharacterSheet
                        gameData={allData} // Passa os dados combinados
                        onAddCustomItem={addCustomItem}
                        onUpdateCustomItem={updateCustomItem}
                        onDeleteCustomItem={deleteCustomItem}
                        goToArchetypeCreator={() => navigate('/creator/archetype')}
                    />
                </ProtectedRoute>
            } />

            {/* === ROTAS COM LAYOUT PADRÃO === */}
            {/* O componente MainLayout agora atua como um invólucro para as rotas aninhadas */}
            <Route element={<MainLayout />}>
                <Route path="/" element={<Navigate to="/rooms" replace />} />
                <Route path="/rooms" element={<ProtectedRoute><Rooms /></ProtectedRoute>} />
                <Route path="/characters" element={<ProtectedRoute><CharacterSelect /></ProtectedRoute>} />
                <Route path="/invite/:roomId" element={<ProtectedRoute><Invite /></ProtectedRoute>} />
                <Route path="/creator/archetype" element={
                    <ProtectedRoute>
                        <ArchetypeCreator
                            gameData={allData}
                            onSave={(newItem) => {
                                addCustomItem('arquetipos', newItem);
                                navigate(-1);
                            }}
                        />
                    </ProtectedRoute>
                } />
            </Route>

            {/* === ROTAS DE AUTENTICAÇÃO === */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

function App() {
    const [theme, setTheme] = useLocalStorage('3det_theme', 'dark');
    const currentTheme = theme === 'light' ? lightTheme : darkTheme;

    // A prop 'toggleTheme' pode ser passada para um ThemeContext se o Footer precisar dela.
    // Para esta correção, focamos na estrutura de rotas.
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