import styled from 'styled-components';

export const TrackerContainer = styled.div`
  background-color: var(--color-background);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-align: right;
  border: 1px solid var(--color-border);
  min-width: 250px;
`;

export const PointsText = styled.p`
  margin: 0.25rem 0;
  font-size: 1rem;
  color: var(--color-text-secondary);
  span {
    font-weight: 700;
    margin-left: 0.5rem;
    color: var(--color-text-primary);
  }
`;

export const RemainingPoints = styled(PointsText)`
    color: ${props => props.$isInvalid ? 'var(--color-error)' : 'var(--color-success)'};
    font-size: 1.2rem;
    font-weight: 700;
    margin-top: 0.5rem;

    span {
        color: ${props => props.$isInvalid ? 'var(--color-error)' : 'var(--color-success)'};
    }
`;