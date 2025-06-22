import React from 'react';
import { NavBar } from '../../components/NavBar';
import { Footer } from '../../components/Footer';
import { LayoutContainer, Content } from './styles'; 

export const MainLayout = ({ children, theme, toggleTheme }) => {
  return (
    <LayoutContainer>
      <NavBar />
      <Content>{children}</Content>
      <Footer theme={theme} toggleTheme={toggleTheme} />
    </LayoutContainer>
  );
};
