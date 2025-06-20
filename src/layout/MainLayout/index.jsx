import React from 'react';
import { NavBar } from '../../components/NavBar';
import { Footer } from '../../components/Footer';
import { LayoutContainer, Content } from './styles';

export const MainLayout = ({ children }) => {
  return (
    <LayoutContainer>
        <NavBar />
        <Content>
            {children}
        </Content>
        <Footer />
    </LayoutContainer>
  )
}
