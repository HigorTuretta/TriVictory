import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import toast from 'react-hot-toast';
import {
  AuthContainer, LeftPane, RightPane, Title, Subtitle,
  Form, Input, Button, LinkText, AuthLink
} from '../../../styles/Auth';
import Logo from '../../../assets/LogoColor.png';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPassword(email);
      toast.success("Pombo-correio enviado! Verifique seu email.");
    } catch (error) {
      toast.error("Erro ao enviar email de recuperação.");
    }
    setLoading(false);
  };

  return (
    <AuthContainer>
      <LeftPane>
        <img src={Logo} alt="Logo TriVictory" />
        <h1>TriVictory</h1>
        <p>Até os maiores heróis esquecem senhas. Recupere seu acesso com um simples feitiço.</p>
      </LeftPane>
      <RightPane
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>Esqueceu sua senha?</Title>
        <Subtitle>Informe seu email para recuperar o acesso.</Subtitle>
        <Form onSubmit={handleSubmit}>
          <Input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Enviar Link de Recuperação'}</Button>
        </Form>
        <LinkText>Lembrou? <AuthLink to="/login">Voltar para a Taverna</AuthLink></LinkText>
      </RightPane>
    </AuthContainer>
  );
};
