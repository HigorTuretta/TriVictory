import React from 'react';
import { NavBar } from '../../components/NavBar';
import { Footer } from '../../components/Footer';
import { LayoutContainer, Content } from './styles'; 

/**
 * MainLayout agora é um componente puramente estrutural.
 * Ele não recebe mais as props 'theme' e 'toggleTheme', pois o componente Footer
 * agora obtém esses dados diretamente de um contexto de tema.
 * Isso remove o "prop drilling" e torna o layout mais limpo e reutilizável.
 */
export const MainLayout = ({ children }) => {
  return (
    <LayoutContainer>
      <NavBar />
      <Content>{children}</Content>
      {/* O Footer agora é chamado sem props, pois ele é autossuficiente. */}
      <Footer />
    </LayoutContainer>
  );
};