import styled from "styled-components";

export const MoneyContainer = styled.div`
    background-color: var(--color-background);
    padding: 1rem;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
`;

export const MoneyDisplay = styled.div`
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    flex-grow: 1;
`;

export const Amount = styled.span`
    font-size: 2rem;
    font-weight: 700;
    color: #ffd700;
    line-height: 1;
`;

export const CurrencyType = styled.span`
    font-size: 1rem;
    font-weight: 500;
    color: var(--color-text-secondary);
`;


export const AmountInput = styled.input`
    width: 100%;
    text-align: center;
    padding: 6px;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 0.95rem;
    transition: border-color 0.2s ease;
    appearance: textfield;

    &:focus {
        border-color: var(--color-primary);
        outline: none;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    [type=number] {
        -moz-appearance: textfield;
    }
`;

export const ActionButton = styled.button`
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: none;
    color: white;
    font-size: 1.1rem;
    margin-left: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.1s ease, background 0.2s ease;

    &.add {
        background-color: var(--color-success);
    }

    &.remove {
        background-color: var(--color-error);
    }

    &:hover {
        transform: scale(1.05);
    }

    &:disabled {
        background-color: #aaa;
        cursor: not-allowed;
        opacity: 0.6;
    }
`;

// Modo Edição
export const EditContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const EditRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label {
        font-size: 0.9rem;
        color: var(--color-text-secondary);
    }

    input, select {
        padding: 6px 8px;
        font-size: 1rem;
        border-radius: 6px;
        border: 1px solid #ccc;
        transition: border-color 0.2s ease;

        &:focus {
            border-color: var(--color-primary);
            outline: none;
        }
    }
`;
export const ActionForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;

    .input-row {
        width: 100%;
    }

    .button-row {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        justify-content: end;
        width: 100%;
        button {
            padding: 8px 12px;
            border: none;
            border-radius: 6px;
            font-weight: 600;
            background-color: var(--color-primary);
            color: white;
            cursor: pointer;
            transition: background 0.2s ease;

            &:hover {
                background-color: var(--color-primary-dark);
            }

            &:last-child {
                background-color: transparent;
                color: var(--color-text-secondary);
            }

            &:last-child:hover {
                color: var(--color-danger);
            }
        }
    }
`;
