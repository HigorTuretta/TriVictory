import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import { NavContainer, Logo, UserInfo, UserName, LogoutButton } from './styles';
import { FaSignOutAlt } from 'react-icons/fa';

export const NavBar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      toast.success("Você saiu da sua conta. Até a próxima aventura!");
    } catch (error) {
      toast.error("Houve um erro ao sair da conta.");
    }
  };

  return (
    <NavContainer>
        <Logo to="/">TriVictory</Logo>
        {currentUser && (
            <UserInfo>
                <span>Olá, <UserName>{currentUser.nickname || currentUser.displayName}</UserName></span>
                <LogoutButton onClick={handleLogout} title="Sair">
                    <FaSignOutAlt />
                </LogoutButton>
            </UserInfo>
        )}
    </NavContainer>
  )
}
