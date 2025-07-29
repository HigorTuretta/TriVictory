import styled, { css } from "styled-components";

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
  border: none;
  cursor: pointer;
  transition: filter 0.2s ease-in-out;

  &:hover {
    filter: brightness(1.15);
  }

  /* A lógica de estilização que antes usava classes agora é controlada pela prop $variant.
     Isso centraliza a responsabilidade de estilo no próprio componente estilizado. */
  ${({ $variant, theme }) => {
    switch ($variant) {
      case "confirm":
        return css`
          background-color: ${theme?.error || 'var(--color-error)'};
          color: white;
        `;
      case "resurrect":
        return css`
          background-color: ${theme?.success || 'var(--color-success)'};
          color: white;
        `;
      case "cancel":
      default:
        return css`
          background-color: ${theme?.border || 'var(--color-border)'};
          color: ${theme?.textPrimary || 'var(--color-text-primary)'};
        `;
    }
  }}
`;