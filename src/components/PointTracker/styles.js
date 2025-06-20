import styled from 'styled-components';

export const TrackerContainer = styled.div`
  background-color: ${({ theme }) => theme.background};
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-align: right;
  border: 1px solid ${({ theme }) => theme.border};
  min-width: 250px;
`;

export const PointsText = styled.p`
  margin: 0.25rem 0;
  font-size: 1rem;
  color: ${({ theme }) => theme.secondary};

  span {
    font-weight: 700;
    margin-left: 0.5rem;
    color: ${({ theme }) => theme.textPrimary};
  }
`;

export const RemainingPoints = styled(PointsText)`
  color: ${({ $isInvalid, theme }) =>
    $isInvalid ? theme.error : theme.success};
  font-size: 1.2rem;
  font-weight: 700;
  margin-top: 0.5rem;

  span {
    color: ${({ $isInvalid, theme }) =>
      $isInvalid ? theme.error : theme.success};
  }
`;
