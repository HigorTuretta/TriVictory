// src/layout/MainLayout/index.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../../components/NavBar';
import { Footer } from '../../components/Footer';
import { LayoutContainer, Content } from './styles';


export const MainLayout = ({ toggleTheme, theme }) => {
  return (
    <LayoutContainer>
      <NavBar />
      <Content>
        <Outlet />
      </Content>
      <Footer toggleTheme={toggleTheme} theme={theme} />
    </LayoutContainer>
  );
};