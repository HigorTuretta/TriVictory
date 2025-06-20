import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    // Se não há usuário logado, redireciona para a página de login.
    // 'replace' impede que o usuário volte para a página anterior no histórico do navegador.
    // 'state' guarda a página que ele tentou acessar para redirecioná-lo de volta após o login.
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Se o usuário está logado, renderiza o conteúdo da rota.
  return children;
};
