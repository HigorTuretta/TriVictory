import styled from "styled-components";

export const LayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

export const Content = styled.main`
    flex-grow: 1; /* Faz o conteúdo principal crescer e empurrar o rodapé */
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
`;
