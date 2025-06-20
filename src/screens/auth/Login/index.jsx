import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import toast from 'react-hot-toast';
import { AuthContainer, AuthBox, Title, Form, Input, Button, LinkText, AuthLink, Subtitle } from '../../../styles/Auth';
import { FaGoogle } from 'react-icons/fa';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, signInWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
            toast.success("Bem-vindo de volta!");
            navigate('/'); // Redireciona para o dashboard
        } catch (error) {
            toast.error("Falha ao entrar. Verifique suas credenciais.");
            console.error("Erro de login:", error);
        }
        setLoading(false);
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            toast.success("Login com Google bem-sucedido!");
            navigate('/');
        } catch (error) {
            toast.error("Falha ao entrar com Google.");
            console.error("Erro de login com Google:", error);
        }
    };

    return (
        <AuthContainer>
            <AuthBox>
                <Title>Entrada da Taverna</Title>
                <Subtitle>Apresente suas credenciais para entrar.</Subtitle>
                <Form onSubmit={handleSubmit}>
                    <Input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input type="password" placeholder="Senha" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button type="submit" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</Button>
                </Form>
                <Button onClick={handleGoogleSignIn} style={{backgroundColor: '#4285F4', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
                    <FaGoogle /> Entrar com Google
                </Button>
                <LinkText><AuthLink to="/forgot-password">Esqueceu sua palavra secreta?</AuthLink></LinkText>
                <LinkText>É sua primeira aventura? <AuthLink to="/register">Forje sua identidade aqui!</AuthLink></LinkText>
            </AuthBox>
        </AuthContainer>
    );
};
