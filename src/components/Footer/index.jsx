import React from 'react';
import { FooterContainer, FooterContent, FooterText, ThemeToggle } from './styles';
import { FaSun, FaMoon } from 'react-icons/fa';

export const Footer = ({ theme, toggleTheme }) => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>Powered by <strong>Turetta</strong></FooterText>
        <ThemeToggle onClick={toggleTheme} aria-label="Alternar tema" $isLight={theme === 'light'}>
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </ThemeToggle>
      </FooterContent>
    </FooterContainer>
  );
};
