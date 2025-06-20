import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import toast from 'react-hot-toast';
import { AuthContainer, AuthBox, Title, Form, Input, Button, LinkText, AuthLink, Subtitle } from '../../../styles/Auth';

export const Register = () => {
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return toast.error("As senhas não coincidem!");
        }
        setLoading(true);
        try {
            await register(nickname, email, password);
            toast.success("Identidade forjada com sucesso!");
            navigate('/'); // Redireciona para o dashboard
        } catch (error) {
            toast.error("Falha ao criar conta. O email já pode estar em uso.");
            console.error("Erro de registro:", error);
        }
        setLoading(false);
    };

    return (
        <AuthContainer>
            <AuthBox>
                <Title>Forjar Nova Identidade</Title>
                <Subtitle>Junte-se à aliança e comece sua jornada!</Subtitle>
                <Form onSubmit={handleSubmit}>
                    <Input type="text" placeholder="Seu apelido de Herói (Ex: Tork)" required value={nickname} onChange={(e) => setNickname(e.target.value)} />
                    <Input type="email" placeholder="Seu pergaminho eletrônico (email)" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input type="password" placeholder="Sua palavra secreta (senha)" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Input type="password" placeholder="Repita a palavra secreta" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <Button type="submit" disabled={loading}>{loading ? 'Forjando...' : 'Criar Conta'}</Button>
                </Form>
                <LinkText>Já possui um grimório? <AuthLink to="/login">Voltar para a taverna.</AuthLink></LinkText>
            </AuthBox>
        </AuthContainer>
    );
};
