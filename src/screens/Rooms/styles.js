// src/screens/Rooms/styles.js
import styled from "styled-components";
import { Form as AuthForm, Input as AuthInput, Button as AuthButton } from "../../styles/Auth";

export const RoomsContainer = styled.div`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
`;

export const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
    flex-wrap: wrap;
    gap: 1rem;
`;

export const Title = styled.h2`
    font-size: 2.2rem;
    font-weight: 900;
    color: ${({ theme }) => theme.primary};
`;

export const CreateRoomButton = styled.button`
    background-color: ${({ theme }) => theme.success};
    color: white;
    font-weight: bold;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 12px 20px;
    border-radius: 6px;
    transition: background-color 0.2s;

    &:hover {
        background-color: #279644;
    }
`;

export const SectionHeader = styled.h3`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.textPrimary};
    padding-bottom: 0.75rem;
    border-bottom: 1px solid ${({ theme }) => theme.border};
`;

export const RoomGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
`;

// --- MODIFICADO: RoomCard agora usa flexbox para alinhar os botões ---
export const RoomCard = styled.div`
    background-color: ${({ theme }) => theme.surface};
    padding: 1rem 1.5rem;
    border-radius: 8px;
    border-left: 5px solid ${({ theme }) => theme.primary};
    transition: all 0.2s ease-in-out;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        border-left-color: ${({ theme }) => theme.secondary};
    }
`;

// NOVO: Wrapper para a parte clicável do card
export const RoomInfo = styled.div`
    flex-grow: 1;
    cursor: pointer;
`;

export const RoomName = styled.h4`
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
`;

export const RoomRole = styled.span`
    font-size: 0.9rem;
    color: ${({ theme }) => theme.textSecondary};
    font-weight: 500;
`;

// NOVO: Botões de ação para os cards
export const ActionButton = styled.button`
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.textSecondary};
    padding: 0.5rem;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    
    &:hover {
        color: ${({ theme, $variant }) => $variant === 'delete' ? theme.error : theme.primary};
        background-color: ${({ theme, $variant }) => $variant === 'delete' ? theme.error : theme.primary}20;
    }
`;


export const Form = styled(AuthForm)``;
export const Input = styled(AuthInput)``;
export const Button = styled(AuthButton)``;