// src/components/Artifacts/ArtifactList.jsx
import React from 'react';
import { FaPlus, FaPen, FaTrash } from 'react-icons/fa';
import { ListContainer, ArtifactCard, CardHeader, ArtifactName, ArtifactActions, QualityList, QualityItem, QualityDescription } from './styles';

export const ArtifactList = ({ artifacts = [], onEdit, onDelete, onCreate, canCreate, isEditing }) => {
    return (
        <ListContainer>
            {artifacts.map(artifact => (
                <ArtifactCard key={artifact.id}>
                    <CardHeader>
                        <ArtifactName>{artifact.name}</ArtifactName>
                        {isEditing && (
                            <ArtifactActions>
                                <button onClick={() => onEdit(artifact)} title="Editar Artefato"><FaPen /></button>
                                <button onClick={() => onDelete(artifact.id)} title="Deletar Artefato"><FaTrash /></button>
                            </ArtifactActions>
                        )}
                    </CardHeader>
                    <QualityList>
                        {artifact.qualities.map((q, index) => (
                            <QualityItem key={q.id || `${artifact.id}-${index}`}>
                                {/* CORREÇÃO: Exibe o subOption se ele existir */}
                                <span>
                                    {q.nome}{q.subOption ? `: ${q.subOption}` : ''} ({q.custo > 0 ? `+${q.custo}`: q.custo}XP)
                                </span>
                                <QualityDescription>{q.descricao}</QualityDescription>
                            </QualityItem>
                        ))}
                    </QualityList>
                </ArtifactCard>
            ))}
            {isEditing && (
                <button onClick={onCreate} disabled={!canCreate} title={canCreate ? "Criar novo artefato" : "Você precisa da vantagem 'Artefato' para criar um"}>
                    <FaPlus /> {artifacts.length > 0 ? 'Criar Outro Artefato' : 'Criar Artefato'}
                </button>
            )}
        </ListContainer>
    );
};