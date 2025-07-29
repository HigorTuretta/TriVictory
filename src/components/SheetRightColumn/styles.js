import styled from 'styled-components';

export const RightColumn = styled.div`
  height: 100%;
  
  @media (max-width: 1024px) {
    position: static;
  }
`;

export const Section = styled.section``;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;