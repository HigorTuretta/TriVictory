import styled from "styled-components";

export const ConfirmWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
`;

export const ConfirmButton = styled.button`
    padding: 10px 20px;
    font-weight: bold;
    border-radius: 6px;

    &.confirm {
        background-color: var(--color-error);
        color: white;
    }
    
    &.resurrect {
        background-color: var(--color-success);
        color: white;
    }

    &.cancel {
        background-color: var(--color-border);
        color: var(--color-text-primary);
    }
`;