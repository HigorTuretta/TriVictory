import styled from "styled-components";
import { Link, NavLink as RouterNavLink } from "react-router-dom";

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

export const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 900;
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: .3rem;
    margin-right: 1rem;
  >img{
    width: 64px;
    height: 64px;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavLink = styled(RouterNavLink)`
  font-weight: 500;
  color: ${({ theme }) => theme.textSecondary};
  text-decoration: none;
  transition: color 0.2s;

  &.active {
    color: ${({ theme }) => theme.primary};
  }

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

export const UserName = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
`;

export const LogoutButton = styled.button`
  background: none;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1.2rem;
  padding: 0.5rem;

  &:hover {
    color: ${({ theme }) => theme.error};
  }
`;


export const MobileMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${({ $open }) => ($open ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: ${({ theme }) => theme.surface};
    padding: 1rem 2rem;
    gap: 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.border};
    z-index: 999;
  }
`;
export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 500;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.textSecondary};
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;