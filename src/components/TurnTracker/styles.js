import styled from 'styled-components';

export const TrackerContainer = styled.div`
    background-color: ${({ theme }) => theme.surface};
    padding: 1.5rem;
    border-radius: 8px;
    margin-top: 2rem;
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
    }
`;

export const AddNpcForm = styled.form`
    display: flex;
    gap: 0.5rem;

    input {
        padding: 8px;
        font-size: 0.9rem;
    }
    button {
        background-color: ${({ theme }) => theme.primary};
        color: white;
        width: 38px;
        height: 38px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
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
`;

export const TurnItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    background-color: ${({ theme }) => theme.background};
    border-radius: 6px;
    border-left: 4px solid ${({ theme, $isActive }) => $isActive ? theme.success : theme.border};
    transition: all 0.2s ease;

    &.add-player {
        cursor: pointer;
        border-left-color: ${({ theme }) => theme.secondary};
        
        &:hover {
            background-color: ${({ theme }) => theme.surface};
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
        }
    }
`;

export const TurnItemName = styled.span`
    font-weight: 500;
`;

export const TurnItemControls = styled.div`
    display: flex;
    gap: 0.5rem;
    
    button {
        background: none;
        border: none;
        color: ${({ theme }) => theme.textSecondary};
        padding: 0.25rem;
        font-size: 0.8rem;
        line-height: 0;

        &:hover {
            color: ${({ theme }) => theme.primary};
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
        background-color: ${({ theme }) => theme.border};
        color: ${({ theme }) => theme.textPrimary};
        &:last-child {
            background-color: ${({ theme }) => theme.primary};
            color: white
        }

        &:hover{
            filter: brightness(.8);
        }
    }
`;
