import React, { useState } from 'react';
import { ViewContainer, Item, ItemName, ItemSubOption, HintText } from './styles';
import { Modal } from '../Modal';

export const FinalizedView = ({ items }) => {
    const [modalContent, setModalContent] = useState(null);

    if (!items || items.length === 0) {
        return <p style={{ color: 'var(--color-text-secondary)' }}>Nenhum item.</p>;
    }

    const handleRightClick = (e, item) => {
        e.preventDefault();
        setModalContent(item);
    };

    return (
        <>
            <ViewContainer>
                {items.map(item => (
                    <Item
                        key={item.id}
                        onContextMenu={(e) => handleRightClick(e, item)}
                    >
                        <ItemName>
                            {/* --- LÓGICA ATUALIZADA --- */}
                            {item.isSpecialization
                                ? `${item.nome} (Especialização)`
                                : item.nome
                            }
                        </ItemName>

                        {/* Se for especialização, o subOption é o nome dela */}
                        {item.subOption &&
                            <ItemSubOption>
                                : {item.subOption}
                            </ItemSubOption>
                        }
                    </Item>
                ))}
            </ViewContainer>

            <HintText>
                Clique com o botão direito em um item para ver os detalhes.
            </HintText>

            {modalContent && (
                <Modal isOpen={!!modalContent} onClose={() => setModalContent(null)}>
                    <h3>{modalContent.nome}</h3>
                    {modalContent.isSpecialization && <p><strong>Tipo:</strong> Especialização de Perícia</p>}
                    {modalContent.subOption && <p><strong>{modalContent.isSpecialization ? 'Foco' : 'Opção'}:</strong> {modalContent.subOption}</p>}
                    <p><strong>Custo:</strong> {modalContent.custo > 0 ? `+${modalContent.custo}` : modalContent.custo}pt</p>
                    <p style={{ marginTop: '1rem' }}>{modalContent.descricao}</p>
                </Modal>
            )}
        </>
    );
};