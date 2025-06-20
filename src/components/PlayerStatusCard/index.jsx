import React from 'react';
import { FaHeart, FaBolt, FaStar } from 'react-icons/fa';
import {
    CardContainer,
    CardHeader,
    CharacterName,
    PlayerNickname,
    ResourceGrid,
    Resource,
    ResourceIcon,
    ResourceBar,
    ResourceProgress
} from './styles';

export const PlayerStatusCard = ({ character }) => {
    if (!character) {
        return null; // Não renderiza nada se os dados do personagem ainda não chegaram
    }

    // Calcula os valores máximos com base nos atributos
    const maxPv = (character.attributes.resistencia || 0) * 5 || 1;
    const maxPm = (character.attributes.habilidade || 0) * 5 || 1;
    const maxPa = character.attributes.poder || 1;

    // Garante que os valores atuais não excedam o máximo
    const currentPv = Math.min(character.pv_current, maxPv);
    const currentPm = Math.min(character.pm_current, maxPm);
    const currentPa = Math.min(character.pa_current, maxPa);

    return (
        <CardContainer>
            <CardHeader>
                <CharacterName to={`/sheet/${character.id}`} target="_blank">{character.name}</CharacterName>
                <PlayerNickname>({character.ownerNickname})</PlayerNickname>
            </CardHeader>
            <ResourceGrid>
                {/* Pontos de Vida */}
                <Resource>
                    <ResourceIcon><FaHeart color="#F44336" /></ResourceIcon>
                    <ResourceBar>
                        <ResourceProgress $progress={(currentPv / maxPv) * 100} $color="#F44336" />
                    </ResourceBar>
                    <span>{currentPv}/{maxPv}</span>
                </Resource>
                {/* Pontos de Mana */}
                <Resource>
                    <ResourceIcon><FaBolt color="#00BCD4" /></ResourceIcon>
                    <ResourceBar>
                        <ResourceProgress $progress={(currentPm / maxPm) * 100} $color="#00BCD4" />
                    </ResourceBar>
                    <span>{currentPm}/{maxPm}</span>
                </Resource>
                {/* Pontos de Ação */}
                <Resource>
                    <ResourceIcon><FaStar color="#FFC107" /></ResourceIcon>
                    <ResourceBar>
                        <ResourceProgress $progress={(currentPa / maxPa) * 100} $color="#FFC107" />
                    </ResourceBar>
                    <span>{currentPa}/{maxPa}</span>
                </Resource>
            </ResourceGrid>
        </CardContainer>
    );
};
