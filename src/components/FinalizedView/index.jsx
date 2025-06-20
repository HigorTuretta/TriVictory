import React, { useState } from 'react';
import { ViewContainer, Item, ItemName, ItemSubOption, HintText } from './styles';
import { Modal } from '../Modal'; // Importamos o Modal para ser usado aqui

export const FinalizedView = ({ items }) => {
    // Estado local para controlar qual item está sendo exibido no modal
    const [modalContent, setModalContent] = useState(null);

    if (!items || items.length === 0) {
        return <p style={{ color: 'var(--color-text-secondary)' }}>Nenhum item.</p>;
    }

    const handleRightClick = (e, item) => {
        e.preventDefault(); // Impede o menu de contexto padrão do navegador
        setModalContent(item); // Define o conteúdo do modal a ser aberto
    };

    return (
        <>
            <ViewContainer>
                {items.map(item => (
                    <Item 
                      key={item.id}
                      onContextMenu={(e) => handleRightClick(e, item)}
                    >
                        <ItemName>{item.nome}</ItemName>
                        {item.subOption && <ItemSubOption>: {item.subOption}</ItemSubOption>}
                    </Item>
                ))}
            </ViewContainer>

            <HintText>
                Clique com o botão direito em um item para ver os detalhes.
            </HintText>

            {/* Renderiza o modal apenas quando há um item selecionado */}
            {modalContent && (
                <Modal isOpen={!!modalContent} onClose={() => setModalContent(null)}>
                    <h3>{modalContent.nome}</h3>
                    {modalContent.subOption && <p><strong>Opção:</strong> {modalContent.subOption}</p>}
                    <p><strong>Custo:</strong> {modalContent.custo > 0 ? `+${modalContent.custo}` : modalContent.custo}pt</p>
                    <p style={{marginTop: '1rem'}}>{modalContent.descricao}</p>
                </Modal>
            )}
        </>
    );
};