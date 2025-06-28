import styled, { css } from 'styled-components';

// O Wrapper agora é o container principal do cabeçalho.
// Ele terá a imagem de fundo e um gradiente.
export const Wrapper = styled.div`
  position: relative;
  height: 350px; // Altura do nosso banner
  width: 100%;
  border-radius: 18px;
  overflow: hidden; // Garante que a imagem não vaze
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
  background-color: ${({ theme }) => theme.surfaceVariant};
  color: ${({ theme }) => theme.onPrimary}; // Cor padrão do texto sobre a imagem

  ${({ $dead }) =>
    $dead &&
    css`
      filter: grayscale(100%) opacity(0.6);
    `}
`;

// Novo componente para a imagem de fundo do banner
export const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 25%; // Foca um pouco mais para cima da imagem
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
`;

// Gradiente para garantir a legibilidade do texto sobre a imagem
export const BannerOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  background: linear-gradient(
    to top,
    rgba(30, 30, 38, 0.9) 0%, // Cor base do tema dark.surface
    rgba(30, 30, 38, 0.6) 30%,
    transparent 80%
  );
  
  // ✅ Adicionado cursor para indicar que é clicável
  cursor: pointer;

  // Efeito de hover
  &:hover + ${BannerImage} {
      transform: scale(1.05);
  }
`;


// Container para o conteúdo (nome, pontos, token) que ficará sobre a imagem
export const Content = styled.div`
  position: relative;
  z-index: 3;
  height: 100%;
  padding: 1.8rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end; // Alinha tudo na parte de baixo
  // Impede que o conteúdo capture o clique do banner
  pointer-events: none; 
`;

// Reposicionando o token
export const TokenWrap = styled.div`
  position: absolute;
  bottom: -20px; // Metade para fora do banner
  left: 2rem;
  width: 84px;
  height: 84px;
  padding: 4px; // Espaço para a borda
  border-radius: 50%;
  background: ${({ $border }) => $border};
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
  z-index: 4;
  pointer-events: auto; // Permite cliques no token
`;

export const Token = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

// Ajustando o botão de upload
export const UploadBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.onPrimary};
  cursor: pointer;
  z-index: 5; // Fica acima de tudo
  opacity: 0.8;
  transition: all 0.2s;
  pointer-events: auto; // Permite cliques no botão

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
`;

// A área de informações (nome e pontos) agora fica dentro do Content
export const Info = styled.div`
  padding-left: calc(84px + 1.5rem); // Espaço para não ficar atrás do token
  margin-top: auto; // Garante que fique na parte de baixo do flex container
  pointer-events: auto; // Permite cliques e seleção de texto
`;

export const NameInput = styled.input`
  width: 100%;
  font-size: 2.5rem; // Nome maior e mais destacado
  font-weight: 900;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
  background: transparent;
  color: #FFFFFF; // Forçar branco para contraste
  border: none;
  outline: none;
  border-bottom: 2px solid transparent;
  transition: border-color 0.2s;
  padding-bottom: 0.5rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }

  &:disabled {
    opacity: 0.7;
    -webkit-text-fill-color: #FFFFFF; // Mantém a cor no Safari
  }
`;

export const PointsRow = styled.div`
  display: flex;
  gap: 0.65rem;
  margin-top: 0.8rem;
`;

export const Pill = styled.span`
  padding: 0.4rem 1rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
  backdrop-filter: blur(5px); // Efeito de vidro fosco para modernidade
  background: ${({ theme, $variant }) =>
    $variant === 'base'
      ? 'rgba(255, 255, 255, 0.15)'
      : $variant === 'remain'
      ? theme.success
      : theme.primary};
  color: #FFFFFF; // Sempre branco para contraste
  border: 1px solid rgba(255, 255, 255, 0.2);
`;
