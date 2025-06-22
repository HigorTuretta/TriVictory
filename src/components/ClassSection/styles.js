import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
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

export const ClassSelect = styled.select`
  width: 100%;
  padding: 10px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textPrimary};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

export const AddClassButton = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.success};
  color: white;
  font-weight: 500;
  padding: 8px;
  font-size: 0.9rem;
`;

export const ClassInfo = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.background};
  border-radius: 6px;
  border-left: 3px solid ${({ theme }) => theme.primary};
  animation: ${css`${fadeIn} 0.4s ease-out`};

  strong {
    display: block;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.primary};
  }
`;

export const ClassPower = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textSecondary};
  & + & { margin-top: 0.5rem; }
`;

export const HintBox = styled.div`
  padding: 0.75rem 1rem;
  margin-top: 1rem;
  background-color: #ff3b3020;
  border-left: 4px solid ${({ theme }) => theme.error};
  color: ${({ theme }) => theme.error};
  font-size: 0.9em;
  border-radius: 4px;
`;

export const ReqList = styled.ul`
  animation: ${css`${fadeIn} 0.5s ease-out`};
  list-style: none;
  padding-left: 0;
  margin: 0.5rem 0 0;
  color: ${({ theme }) => theme.error};
  font-size: 0.9rem;
`;

export const ReqItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0;
`;

// --- NOVOS ESTILOS PARA A LISTA DE KITS ---
export const SelectedKitList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

export const SelectedKit = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  padding: 6px 12px;
  border-radius: 16px;
  font-weight: 500;

  button {
    background: rgba(255,255,255,0.2);
    border: none;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
    
    &:hover {
      background: rgba(255,255,255,0.4);
    }
  }
`;