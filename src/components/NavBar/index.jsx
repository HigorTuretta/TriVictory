import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import {
  NavContainer, NavLinks, NavLink, UserInfo, UserName, LogoutButton, HamburgerButton
} from './styles';
import { AnimatePresence, motion } from 'framer-motion';
import logoImg from '../../assets/LogoColor.png';
import { FaSignOutAlt } from 'react-icons/fa';

// Ícone animado do botão hambúrguer
const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    strokeLinecap="round"
    {...props}
  />
);

const HamburgerIcon = ({ isOpen }) => (
  <motion.svg width="24" height="24" viewBox="0 0 24 24">
    <Path
      animate={isOpen ? { d: 'M 4 4 L 20 20' } : { d: 'M 3 6h18' }}
      stroke="#666"
    />
    <Path
      animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
      d="M 3 12h18"
      stroke="#666"
    />
    <Path
      animate={isOpen ? { d: 'M 4 20 L 20 4' } : { d: 'M 3 18h18' }}
      stroke="#666"
    />
  </motion.svg>
);

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
      <motion.a
        href="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          color: 'inherit',
          gap: '0.3rem',
          marginRight: '1rem',
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
      >
        <motion.img
          src={logoImg}
          alt="Logotipo"
          style={{ width: 64, height: 64 }}
          animate={{
            rotate: [-3, 3, -3],
            y: [0, -1, 0],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
        <span style={{ fontSize: '1.8rem', fontWeight: 900 }}>TriVictory</span>
      </motion.a>

      <HamburgerButton onClick={() => setIsMenuOpen(prev => !prev)}>
        <HamburgerIcon isOpen={isMenuOpen} />
      </HamburgerButton>

      <NavLinks>
        <NavLink to="/">Minhas Salas</NavLink>
        <NavLink to="/characters">Meus Personagens</NavLink>
      </NavLinks>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              overflow: 'hidden',
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
              zIndex: 999,
            }}
          >
            <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Minhas Salas</NavLink>
            <NavLink to="/characters" onClick={() => setIsMenuOpen(false)}>Meus Personagens</NavLink>

            {currentUser && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Olá, <UserName>{currentUser.nickname || currentUser.displayName}</UserName></span>
                <LogoutButton onClick={handleLogout} title="Sair">
                  <motion.span whileTap={{ scale: 0.9 }}>
                    <FaSignOutAlt />
                  </motion.span>
                </LogoutButton>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

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
