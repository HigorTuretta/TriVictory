import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import {
  NavContainer, NavLinks, NavLink, UserInfo, UserName, LogoutButton,
  HamburgerButton, Logo, MobileMenuContainer, MobileUserInfo
} from './styles';
import { AnimatePresence, motion } from 'framer-motion';
import logoImg from '../../assets/LogoColor.png';
import { FaSignOutAlt } from 'react-icons/fa';

// --- Ícone animado do botão hambúrguer ---
const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="#666"
    strokeLinecap="round"
    {...props}
  />
);

const HamburgerIcon = ({ isOpen }) => (
  <motion.svg width="24" height="24" viewBox="0 0 24 24">
    <Path
      animate={isOpen ? { d: 'M 4 4 L 20 20' } : { d: 'M 3 6h18' }}
      transition={{ duration: 0.2 }}
    />
    <Path
      d="M 3 12h18"
      animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.1 }}
    />
    <Path
      animate={isOpen ? { d: 'M 4 20 L 20 4' } : { d: 'M 3 18h18' }}
      transition={{ duration: 0.2 }}
    />
  </motion.svg>
);

// --- Subcomponente para o Menu Mobile ---
const MobileMenu = ({ onLinkClick, currentUser, handleLogout }) => (
  <MobileMenuContainer
    key="mobileMenu"
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: 'auto' }}
    exit={{ opacity: 0, height: 0 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
  >
    <NavLink to="/" onClick={onLinkClick}>Minhas Salas</NavLink>
    <NavLink to="/characters" onClick={onLinkClick}>Meus Personagens</NavLink>

    {currentUser && (
      <MobileUserInfo>
        <span>Olá, <UserName>{currentUser.nickname || currentUser.displayName}</UserName></span>
        <LogoutButton onClick={handleLogout} title="Sair">
          <FaSignOutAlt />
        </LogoutButton>
      </MobileUserInfo>
    )}
  </MobileMenuContainer>
);

// --- Componente Principal da Barra de Navegação ---
export const NavBar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

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
      <Logo href="/" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
        <motion.img
          src={logoImg}
          alt="Logotipo"
          animate={{ rotate: [-3, 3, -3], y: [0, -1, 0] }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
        />
        <span>TriVictory</span>
      </Logo>

      {/* Links para Desktop */}
      <NavLinks>
        <NavLink to="/">Minhas Salas</NavLink>
        <NavLink to="/characters">Meus Personagens</NavLink>
      </NavLinks>

      {/* Info do Usuário para Desktop */}
      <UserInfo>
        {currentUser && (
          <>
            <span>Olá, <UserName>{currentUser.nickname || currentUser.displayName}</UserName></span>
            <LogoutButton onClick={handleLogout} title="Sair">
              <FaSignOutAlt />
            </LogoutButton>
          </>
        )}
      </UserInfo>

      {/* Botão de Menu para Mobile */}
      <HamburgerButton onClick={() => setIsMenuOpen(prev => !prev)}>
        <HamburgerIcon isOpen={isMenuOpen} />
      </HamburgerButton>

      {/* Menu Mobile Renderizado Condicionalmente */}
      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenu
            onLinkClick={closeMenu}
            currentUser={currentUser}
            handleLogout={handleLogout}
          />
        )}
      </AnimatePresence>
    </NavContainer>
  );
};