import React from 'react';
import { FaHeart, FaBolt, FaStar } from 'react-icons/fa';
import {
    CardContainer, CardHeader, CharacterName, PlayerNickname,
    ResourceGrid, Resource, ResourceIcon, ResourceBar, ResourceProgress,
    ResourceValues
} from './styles';

export const PlayerStatusCard = ({ character }) => {
    if (!character) {
        return null; // Não renderiza nada se os dados do personagem ainda não chegaram
    }

    // Desestrutura os dados do personagem para um acesso mais limpo
    const {
        id,
        name,
        ownerNickname,
        attributes,
        pv_current,
        pm_current,
        pa_current,
    } = character;

    // --- Preparação dos Dados dos Recursos ---
    // Centraliza a lógica de cálculo e os dados de cada barra de recurso.
    const maxPv = (attributes.resistencia || 0) * 5 || 1;
    const maxPm = (attributes.habilidade || 0) * 5 || 1;
    const maxPa = attributes.poder || 1;

    const resourceData = [
        {
            key: 'pv',
            Icon: FaHeart,
            color: '#F44336',
            currentValue: Math.min(pv_current, maxPv),
            maxValue: maxPv,
        },
        {
            key: 'pm',
            Icon: FaBolt,
            color: '#00BCD4',
            currentValue: Math.min(pm_current, maxPm),
            maxValue: maxPm,
        },
        {
            key: 'pa',
            Icon: FaStar,
            color: '#FFC107',
            currentValue: Math.min(pa_current, maxPa),
            maxValue: maxPa,
        },
    ];

    return (
        <CardContainer>
            <CardHeader>
                <CharacterName to={`/sheet/${id}`} target="_blank" rel="noopener noreferrer">
                    {name}
                </CharacterName>
                <PlayerNickname>({ownerNickname})</PlayerNickname>
            </CardHeader>
            <ResourceGrid>
                {/* O JSX agora mapeia o array de dados, eliminando a repetição. */}
                {resourceData.map(res => (
                    <Resource key={res.key}>
                        <ResourceIcon title={res.key.toUpperCase()}>
                            <res.Icon color={res.color} />
                        </ResourceIcon>
                        <ResourceBar>
                            <ResourceProgress
                                $progress={(res.currentValue / res.maxValue) * 100}
                                $color={res.color}
                            />
                        </ResourceBar>
                        <ResourceValues>{res.currentValue}/{res.maxValue}</ResourceValues>
                    </Resource>
                ))}
            </ResourceGrid>
        </CardContainer>
    );
};