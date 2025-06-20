import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1.5rem;
`;

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const Label = styled.label`
    font-weight: 500;
    color: var(--color-text-secondary);
`;

export const Input = styled.input``;
export const Textarea = styled.textarea``;

export const SaveButton = styled.button`
    background-color: var(--color-success);
    color: white;
    font-weight: bold;
    margin-top: 1rem;
    padding: 12px;
`;