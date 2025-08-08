// src/components/VTT/ChatWindow/styles.js
import styled from 'styled-components';

export const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    /* Altura máxima para caber bem na janela flutuante */
    max-height: 50vh; 
`;

export const MessageList = styled.div`
    flex-grow: 1;
    overflow-y: auto;
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    background-color: transparent;
    border-radius: 6px;
`;

export const MessageItem = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.6rem 0.9rem;
    border-radius: 12px;
    max-width: 80%;
    word-wrap: break-word;
    
    /* Cores e alinhamento */
    background-color: ${({ theme, $isSender }) => $isSender ? theme.primary : theme.surfaceVariant};
    color: ${({ theme, $isSender }) => $isSender ? theme.onPrimary : theme.textPrimary};
    align-self: ${({ $isSender }) => $isSender ? 'flex-end' : 'flex-start'};
    
    /* Borda para indicar mensagem privada */
    border: 2px solid ${({ theme, $isPrivate }) => $isPrivate ? theme.secondary : 'transparent'};
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const Sender = styled.strong`
    font-size: 0.8rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
    color: ${({ theme, $isSender }) => $isSender ? theme.onPrimary : theme.textPrimary};

    span {
        font-style: italic;
        font-weight: 400;
        opacity: 0.8;
    }
`;

export const Text = styled.p`
    margin: 0;
    line-height: 1.5;
    font-size: 0.95rem;
    white-space: pre-wrap;
`;

export const Timestamp = styled.time`
    font-size: 0.7rem;
    align-self: flex-end;
    margin-top: 0.3rem;
    opacity: 0.8;
    color: inherit; /* Herda a cor do texto do pai */
`;

export const ChatForm = styled.form`
    padding-top: 0.5rem;
`;

export const ChatInputWrapper = styled.div`
    background-color: ${({ theme }) => theme.surface};
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.border};
    margin-top: 0.5rem;
`;

export const ChatInput = styled.textarea`
    width: 100%;
    padding: 0.75rem;
    border-radius: 6px;
    resize: none;
    min-height: 60px;
    border: 1px solid ${({ theme }) => theme.border};
    background-color: ${({ theme }) => theme.background};
`;

export const FormControls = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 0.75rem;
`;

export const RecipientSelect = styled.select`
    padding: 6px 10px;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 500;
    border: 1px solid ${({ theme }) => theme.border};
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.textPrimary};
    min-width: 150px;
`;

// --- NOVO: Estilos para o Toggle Switch ---
export const SenderToggleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const SenderToggleLabel = styled.span`
    font-size: 0.8rem;
    font-weight: 500;
    color: ${({ theme }) => theme.textSecondary};
`;

export const ToggleSwitch = styled.label`
    position: relative;
    display: inline-block;
    width: 44px;
    height: 24px;

    input {
        opacity: 0;
        width: 0;
        height: 0;
    }
`;

export const Slider = styled.span`
    position: absolute;
    cursor: pointer;
    inset: 0;
    background-color: ${({ theme }) => theme.border};
    border-radius: 24px;
    transition: 0.3s;

    &::before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        border-radius: 50%;
        transition: 0.3s;
    }

    input:checked + & {
        background-color: ${({ theme }) => theme.primary};
    }

    input:checked + &::before {
        transform: translateX(20px);
    }
`;


export const SendButton = styled.button`
    background-color: ${({ theme }) => theme.primary};
    color: white;
    font-weight: bold;
    padding: 8px 16px;
    border-radius: 6px;

    &:hover {
        filter: brightness(1.1);
    }
`;