// src/components/ArchetypeSection/index.jsx
import React, { useState, useEffect } from 'react';
import { useCharacter } from '../../contexts/CharacterContext';
import * as gameData from '../../data/gameData';
import {
  Section, SectionTitle, ArchetypeSelect, AddArchetypeButton,
  ArchetypeInfo, ArchetypePower, ArchetypeChoiceInfo,
  ModalContent, ChoiceList, ChoiceButton, ChoiceDescription
} from './styles';
import { Modal } from '../Modal';

// --- Subcomponente: Modal para Escolhas de Arquétipo ---
const ArchetypeChoiceModal = ({ isOpen, onClose, choice, onMakeChoice }) => {
    if (!choice) return null;

    // Filtra as opções disponíveis com base na configuração da 'escolha'
    const availableOptions = gameData[choice.tipo === 'vantagem' ? 'vantagens' : 'desvantagens']
        .filter(item => {
            if (choice.listaFiltro) return choice.listaFiltro.includes(item.nome);
            if (choice.nomeFiltro) return item.nome === choice.nomeFiltro;
            return false;
        });

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <h3>Escolha de Arquétipo</h3>
                <p>{choice.mensagem}</p>
                <ChoiceList>
                    {availableOptions.map(option => (
                        <li key={option.nome}>
                            <ChoiceButton onClick={() => onMakeChoice(choice, option)}>
                                {option.nome}
                            </ChoiceButton>
                            <ChoiceDescription>{option.descricao}</ChoiceDescription>
                        </li>
                    ))}
                </ChoiceList>
            </ModalContent>
        </Modal>
    );
};


export const ArchetypeSection = ({ goToArchetypeCreator }) => {
    // Consome o contexto para obter dados e ações
    const { character, isEditing, handleArchetypeChange, handleMakeChoice } = useCharacter();
    const [choiceModal, setChoiceModal] = useState(null); // Estado local para controlar o modal de escolha

    // Efeito para detectar e apresentar escolhas de arquétipo pendentes
    useEffect(() => {
        if (!character?.archetype?.escolhas) {
            setChoiceModal(null);
            return;
        }
        
        // Encontra a primeira escolha requerida que ainda não foi feita
        const pendingChoice = character.archetype.escolhas.find(
            choice => !character.archetypeChoices?.[choice.id]
        );
        
        setChoiceModal(pendingChoice || null);

    }, [character?.archetype, character?.archetypeChoices]);

    const handleSelectAndClose = (choice, item) => {
        handleMakeChoice(choice, item);
        setChoiceModal(null);
    };

    return (
        <>
            <Section>
                <SectionTitle>Arquétipo</SectionTitle>
                {isEditing ? (
                    <>
                        <ArchetypeSelect
                            value={character.archetype?.nome || ''}
                            onChange={handleArchetypeChange}
                            disabled={character.isDead}
                        >
                            <option value=''>Nenhum (Humano)</option>
                            {gameData.arquetipos.map((a) => (
                                <option key={a.nome} value={a.nome}>
                                    {a.nome} ({a.custo} pt)
                                </option>
                            ))}
                        </ArchetypeSelect>
                        <AddArchetypeButton
                            onClick={goToArchetypeCreator}
                            disabled={character.isDead}
                        >
                            + Criar Arquétipo Customizado
                        </AddArchetypeButton>
                    </>
                ) : (
                    <p style={{ fontSize: '1.2rem', fontWeight: 500 }}>
                        {character.archetype?.nome || 'Humano'}
                    </p>
                )}

                {character.archetype && (
                    <ArchetypeInfo>
                        {character.archetype.poderes.map((p, i) => (
                            <ArchetypePower key={i}>{p}</ArchetypePower>
                        ))}
                    </ArchetypeInfo>
                )}

                {character.archetypeChoices && Object.keys(character.archetypeChoices).length > 0 && (
                    <ArchetypeChoiceInfo>
                        <strong>Escolhas de Arquétipo:</strong>
                        {Object.values(character.archetypeChoices).map((c) => (
                            <span key={c.id}>
                                {c.nome} {c.subOption && `(${c.subOption})`}
                            </span>
                        ))}
                    </ArchetypeChoiceInfo>
                )}
            </Section>

            <ArchetypeChoiceModal
                isOpen={!!choiceModal}
                onClose={() => setChoiceModal(null)}
                choice={choiceModal}
                onMakeChoice={handleSelectAndClose}
            />
        </>
    );
};