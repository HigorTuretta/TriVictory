import styled from 'styled-components';

export const TrackerContainer = styled.div`
    background-color: ${({ theme }) => theme.surface};
    padding: 1.5rem;
    border-radius: 12px;
    margin-top: 2rem;
    border: 1px solid ${({ theme }) => theme.border};
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.border};

    h3 {
        font-size: 1.2rem;
        color: ${({ theme }) => theme.primary};
        margin: 0;
    }
`;

export const AddNpcForm = styled.form`
    display: flex;
    gap: 0.5rem;
`;

export const AddNpcInput = styled.input`
    padding: 8px 12px;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.border};
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.textPrimary};
    font-size: 0.9rem;
    transition: all 0.2s ease;

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.primary};
        box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}33;
    }
`;

export const AddNpcButton = styled.button`
    background-color: ${({ theme }) => theme.primary};
    color: white;
    width: 38px;
    height: 38px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: ${({ theme }) => theme.primary}cc;
    }
`;

export const TurnList = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-height: 300px;
    overflow-y: auto;
    padding-right: 0.5rem; // Espaço para a barra de rolagem
`;

export const TurnItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    background-color: ${({ theme }) => theme.background};
    border-radius: 6px;
    border-left: 4px solid ${({ theme, $isActive, $variant }) => {
        if ($isActive) return theme.success;
        if ($variant === 'add') return theme.secondary;
        return theme.border;
    }};
    transition: all 0.2s ease;
    cursor: ${({ $variant }) => $variant === 'add' ? 'pointer' : 'default'};
    opacity: ${({ disabled }) => disabled ? 0.5 : 1};

    &:hover {
        background-color: ${({ theme, disabled }) => !disabled && theme.surface};
    }

    button {
        background: none;
        border: none;
        color: ${({ theme }) => theme.textSecondary};
        font-size: 0.8rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;

        &:disabled {
            cursor: not-allowed;
            color: ${({ theme }) => theme.border};
        }
    }
`;

export const TurnItemName = styled.span`
    font-weight: 500;
`;

export const TurnItemControls = styled.div`
    display: flex;
    gap: 0.75rem;
    
    button {
        padding: 0.25rem;
        font-size: 0.8rem;
        line-height: 0;
        transition: color 0.2s ease;

        &:hover:not(:disabled) {
            color: ${({ theme }) => theme.primary};
        }
        
        &[title="Remover"]:hover:not(:disabled) {
            color: ${({ theme }) => theme.error};
        }
    }
`;

export const DmControls = styled.div`
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid ${({ theme }) => theme.border};
    display: flex;
    justify-content: space-between;
    gap: 1rem;

    button {
        flex-grow: 1;
        padding: 10px;
        font-weight: bold;
        border-radius: 6px;
        transition: filter 0.2s ease;
        
        &:first-child {
            background-color: ${({ theme }) => theme.border};
            color: ${({ theme }) => theme.textPrimary};
        }
        
        &:last-child {
            background-color: ${({ theme }) => theme.primary};
            color: white;
        }

        &:hover:not(:disabled) {
            filter: brightness(1.15);
        }

        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            filter: none;
        }
    }
`;