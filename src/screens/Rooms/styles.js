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
`;

export const RoomGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
`;

export const RoomCard = styled.div`
    background-color: ${({ theme }) => theme.surface};
    padding: 1.5rem;
    border-radius: 8px;
    border-left: 5px solid ${({ theme }) => theme.primary};
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        border-left-color: ${({ theme }) => theme.secondary};
    }
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

// Estilos para o formulário no modal (reutilizando e adaptando)
export const Form = styled(AuthForm)``;
export const Input = styled(AuthInput)``;
export const Button = styled(AuthButton)``;
