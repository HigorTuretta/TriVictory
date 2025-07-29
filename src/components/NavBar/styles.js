import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";
import { motion } from 'framer-motion';

export const NavContainer = styled.nav`
  width: 100%;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.surface};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

export const Logo = styled(motion.a)`
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 0.5rem;
  
  img {
    width: 64px;
    height: 64px;
  }

  span {
    font-size: 1.8rem;
    font-weight: 900;
    color: ${({ theme }) => theme.textPrimary};

    @media (max-width: 900px) {
      display: none; // Oculta o texto em telas menores para dar espaço
    }
  }
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  margin-left: auto;
  margin-right: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavLink = styled(RouterNavLink)`
  font-weight: 500;
  color: ${({ theme }) => theme.textSecondary};
  text-decoration: none;
  transition: color 0.2s;
  padding: 0.5rem 0;

  &.active {
    color: ${({ theme }) => theme.primary};
    font-weight: 700;
  }

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.textSecondary};

  @media (max-width: 768px) {
    display: none;
  }
`;

export const UserName = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
`;

export const LogoutButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1.2rem;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.error};
    background-color: ${({ theme }) => theme.error}20;
  }
`;

export const HamburgerButton = styled.button`
  display: none; // Oculto por padrão
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1001; // Garante que fique acima do menu desktop
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: block; // Visível apenas em mobile
  }
`;

export const MobileMenuContainer = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.surface};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  z-index: 999;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 2rem;
  gap: 1.5rem;
  overflow: hidden;
`;

export const MobileUserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.textSecondary};
`;