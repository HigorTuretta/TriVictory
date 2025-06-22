import styled from 'styled-components';

export const SettingsContainer = styled.div`
    background-color: var(--color-background);
    padding: 1rem;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
    h4 {
        color: var(--color-secondary);
        margin-bottom: 0.5rem;
    }
`;

export const FormRow = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

export const RadioGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    input {
        width: auto;
    }
`;