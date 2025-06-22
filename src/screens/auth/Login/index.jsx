import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import toast from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';

import {
  AuthContainer, LeftPane, RightPane, Title, Subtitle,
  Form, Input, Button, GoogleButton, LinkText, AuthLink
} from '../../../styles/Auth';

import Logo from '../../../assets/LogoColor.png';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signInWithGoogle, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate('/');
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Bem-vindo de volta!");
    } catch (error) {
      toast.error("Falha ao entrar. Verifique suas credenciais.");
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("Login com Google bem-sucedido!");
    } catch (error) {
      toast.error("Falha ao entrar com Google.");
    }
  };

  return (
    <AuthContainer>
      <LeftPane>
        <img src={Logo} alt="Logo TriVictory" />
        <h1>TriVictory</h1>
        <p>Entre na taverna dos aventureiros e gerencie sua jornada com estilo e poder!</p>
      </LeftPane>
      <RightPane
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>Bem-vindo de volta</Title>
        <Subtitle>Insira suas credenciais para continuar a aventura.</Subtitle>
        <Form onSubmit={handleSubmit}>
          <Input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" placeholder="Senha" required value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</Button>
        </Form>
        <GoogleButton type="button" onClick={handleGoogleSignIn}>
          <FaGoogle /> Entrar com Google
        </GoogleButton>
        <LinkText><AuthLink to="/forgot-password">Esqueceu sua palavra secreta?</AuthLink></LinkText>
        <LinkText>Primeira vez? <AuthLink to="/register">Forje sua identidade!</AuthLink></LinkText>
      </RightPane>
    </AuthContainer>
  );
};
