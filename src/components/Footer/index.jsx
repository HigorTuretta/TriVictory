import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FooterContainer, FooterContent, FooterText, ThemeToggle } from './styles';
import { FaSun, FaMoon } from 'react-icons/fa';
import v from '../../../package.json'
// Configurações da animação para os ícones
const iconVariants = {
  hidden: { opacity: 0, rotate: -90, scale: 0.5 },
  visible: { opacity: 1, rotate: 0, scale: 1 },
  exit: { opacity: 0, rotate: 90, scale: 0.5 },
};

export const Footer = ({ theme, toggleTheme }) => {
  const isLight = theme === 'light';

  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>
          <p>Powered by <strong>Turetta</strong></p>
          <span>Versão {v.version}</span>
        </FooterText>

        <ThemeToggle
          onClick={toggleTheme}
          aria-label="Alternar tema"
          $isLight={isLight}
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9, rotate: -15 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={isLight ? 'moon' : 'sun'}
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              {isLight ? <FaMoon /> : <FaSun />}
            </motion.div>
          </AnimatePresence>
        </ThemeToggle>
      </FooterContent>
    </FooterContainer>
  );
};