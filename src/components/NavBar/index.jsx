import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import {
  NavContainer, Logo, NavLinks, NavLink, UserInfo, UserName, LogoutButton,
  HamburgerButton
} from './styles';
import { FaSignOutAlt, FaBars } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';

export const NavBar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

      <HamburgerButton onClick={() => setIsMenuOpen(prev => !prev)}>
        <FaBars />
      </HamburgerButton>

      <NavLinks>
        <NavLink to="/">Minhas Salas</NavLink>
        <NavLink to="/characters">Meus Personagens</NavLink>
      </NavLinks>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '100%',
              backgroundColor: 'var(--color-surface)',
              padding: '1rem 2rem',
              borderBottom: '1px solid var(--color-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              zIndex: 999
            }}
          >
            <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Minhas Salas</NavLink>
            <NavLink to="/characters" onClick={() => setIsMenuOpen(false)}>Meus Personagens</NavLink>

            {currentUser && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Olá, <UserName>{currentUser.nickname || currentUser.displayName}</UserName></span>
                <LogoutButton onClick={handleLogout} title="Sair">
                  <FaSignOutAlt />
                </LogoutButton>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Esconde UserInfo no mobile */}
      <UserInfo className="desktop-only">
        {currentUser && (
          <>
            <span>Olá, <UserName>{currentUser.nickname || currentUser.displayName}</UserName></span>
            <LogoutButton onClick={handleLogout} title="Sair">
              <FaSignOutAlt />
            </LogoutButton>
          </>
        )}
      </UserInfo>
    </NavContainer>
  );
};
