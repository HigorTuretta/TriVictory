import styled from 'styled-components';

export const TrackerContainer = styled.div`
  background-color: ${({ theme }) => theme.surface};
  padding: 1rem 1.5rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  display: flex;
  flex-direction: column;
  gap: 0.5rem; /* Espaçamento consistente entre as linhas */
`;

// Estilo base para cada linha de pontos
export const PointRow = styled.p`
  margin: 0;
  padding: 0.25rem 0;
  font-size: 0.9rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  /* Estilo para o rótulo (ex: "Pontos Base") */
  span:first-of-type {
    color: ${({ theme }) => theme.textSecondary};
  }

  /* Estilo para o valor (ex: "12") */
  span:last-of-type {
    font-weight: 700;
    font-family: monospace;
    font-size: 1rem;
    color: ${({ theme }) => theme.textPrimary};
  }
`;

// Estilo especializado para a linha de "Restantes", que herda de PointRow
export const RemainingPointsRow = styled(PointRow)`
  font-size: 1.1rem;
  font-weight: 700;
  margin-top: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid ${({ theme }) => theme.border};

  /* Cor do rótulo e do valor muda com base na validade dos pontos */
  span {
    color: ${({ $isInvalid, theme }) =>
      $isInvalid ? theme.error : theme.success};
  }

  span:last-of-type {
    font-size: 1.2rem;
  }
`;