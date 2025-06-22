import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import toast from 'react-hot-toast';
import {
  AuthContainer, LeftPane, RightPane, Title, Subtitle,
  Form, Input, Button, GoogleButton, LinkText, AuthLink
} from '../../../styles/Auth';
import { FaGoogle } from 'react-icons/fa';
import Logo from '../../../assets/LogoColor.png';

export const Register = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, signInWithGoogle, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate('/');
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(nickname, email, password);
      toast.success("Cadastro concluído!");
    } catch (error) {
      toast.error("Erro ao registrar. Verifique os dados.");
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("Cadastro via Google concluído!");
    } catch (error) {
      toast.error("Erro ao registrar com Google.");
    }
  };

  return (
    <AuthContainer>
      <LeftPane>
        <img src={Logo} alt="Logo TriVictory" />
        <h1>TriVictory</h1>
        <p>Prepare sua ficha, aventureiro! Crie sua identidade para entrar na jornada.</p>
      </LeftPane>
      <RightPane
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>Criação de Conta</Title>
        <Subtitle>Forje sua identidade para entrar na aventura.</Subtitle>
        <Form onSubmit={handleSubmit}>
          <Input type="text" placeholder="Apelido" required value={nickname} onChange={(e) => setNickname(e.target.value)} />
          <Input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" placeholder="Senha" required value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" disabled={loading}>{loading ? 'Registrando...' : 'Registrar'}</Button>
        </Form>
        <GoogleButton type="button" onClick={handleGoogleSignIn}>
          <FaGoogle /> Registrar com Google
        </GoogleButton>
        <LinkText>Já possui uma conta? <AuthLink to="/login">Entrar na Taverna</AuthLink></LinkText>
      </RightPane>
    </AuthContainer>
  );
};
