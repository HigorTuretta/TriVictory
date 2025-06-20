import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../../contexts/AuthContext';
import { AuthContainer, AuthBox, Title, Form, Input, Button, LinkText, AuthLink, Subtitle } from '../../../styles/Auth';

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const { forgotPassword } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await forgotPassword(email);
            toast.success('Pombo-correio enviado! Verifique seu email para as instruções.');
        } catch (error) {
            toast.error('Falha ao enviar email de recuperação.');
        }
        setLoading(false);
    };

    return (
        <AuthContainer>
            <AuthBox>
                <Title>Amnésia?</Title>
                <Subtitle>Enviaremos um pombo-correio para recuperar sua palavra secreta.</Subtitle>
                <Form onSubmit={handleSubmit}>
                    <Input type="email" placeholder="Seu pergaminho eletrônico (email)" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Button type="submit" disabled={loading}>{loading ? 'Invocando...' : 'Enviar Link de Recuperação'}</Button>
                </Form>
                <LinkText>Lembrou-se do caminho? <AuthLink to="/login">Voltar para a taverna.</AuthLink></LinkText>
            </AuthBox>
        </AuthContainer>
    );
};
