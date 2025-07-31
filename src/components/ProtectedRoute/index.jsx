import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LoadingContainer } from './styles';
import { RPGLoader } from '../RPGLoader'; // Importa o componente RPGLoader

export const ProtectedRoute = ({ children }) => {
  const { currentUser, isLoading } = useAuth(); // Agora também consome o estado de 'isLoading'
  const location = useLocation();

  // 1. Estado de Carregamento:
  // Enquanto o status de autenticação está sendo verificado, exibe um indicador de loading.
  // Isso previne o "piscar" da tela e o redirecionamento prematuro para o login.
  if (isLoading) {
    return (
      <LoadingContainer>
        <RPGLoader/>
      </LoadingContainer>
    );
  }

  // 2. Estado Não Autenticado:
  // Se o carregamento terminou e não há usuário, redireciona para a página de login.
  // 'state={{ from: location }}' guarda a página que o usuário tentou acessar,
  // permitindo o redirecionamento de volta para lá após o login bem-sucedido.
  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // 3. Estado Autenticado:
  // Se o usuário está logado, renderiza o conteúdo da rota protegida.
  return children;
};