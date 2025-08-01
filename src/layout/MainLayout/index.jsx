// src/layout/MainLayout/index.jsx
import React from 'react';
import { Outlet } from 'react-router-dom'; // IMPORTANTE: Importar o Outlet
import { NavBar } from '../../components/NavBar';
import { Footer } from '../../components/Footer';
import { LayoutContainer, Content } from './styles'; 

export const MainLayout = () => {
  return (
    <LayoutContainer>
      <NavBar />
      {/* CORREÇÃO: Usa <Outlet /> para renderizar as rotas filhas aninhadas */}
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </LayoutContainer>
  );
};