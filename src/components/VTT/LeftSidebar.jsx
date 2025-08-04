// src/components/VTT/LeftSidebar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoom } from '../../contexts/RoomContext';
import { useAuth } from '../../contexts/AuthContext';
import { useUserCharacters } from '../../hooks/useUserCharacters';
import { getTokenImageUrl } from '../../services/cloudinaryService';
// NOVO: Importa funções do firestore para atualizar a ficha
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { SidebarContainer, CollapseButton, ToolSection, PlayerList, PlayerCard, PlayerAvatar, PlayerInfo, PlayerName, CharacterName, LinkButton, ToolButton } from './styles';
import { FaMap, FaEye, FaUsers, FaSkull, FaSignOutAlt, FaCopy, FaLink, FaUnlink, FaScroll, FaCog, FaChevronLeft, FaChevronRight, FaMusic } from 'react-icons/fa';

import { Modal } from '../Modal';

const LinkCharacterModal = ({ isOpen, onClose, onLink }) => {
    const { characters, loading } = useUserCharacters();

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h3>Vincular Personagem à Sala</h3>
            {loading ? <p>Carregando seus personagens...</p> :
                characters.length === 0 ? <p>Você ainda não criou nenhum personagem.</p> :
                    <PlayerList>
                        {characters.map(char => (
                            <PlayerCard key={char.id} onClick={() => onLink(char)} style={{ cursor: 'pointer' }}>
                                <PlayerAvatar src={getTokenImageUrl(char.tokenImage) || `https://api.dicebear.com/8.x/adventurer/svg?seed=${char.name}`} />
                                <PlayerInfo>
                                    <PlayerName>{char.name}</PlayerName>
                                    <CharacterName>Nível {char.level || 0}</CharacterName>
                                </PlayerInfo>
                            </PlayerCard>
                        ))}
                    </PlayerList>
            }
        </Modal>
    );
};

export const LeftSidebar = ({ onToolSelect, onToggleCollapse }) => {
    const { room, roomId, updateRoom } = useRoom();
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const isMaster = room.masterId === currentUser.uid;
    const members = room.members || [];

    const copyInviteLink = () => {
        const inviteLink = `${window.location.origin}/invite/${roomId}`;
        navigator.clipboard.writeText(inviteLink);
        toast.success('Link de convite copiado!');
    };

    const handleToggleCollapse = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        onToggleCollapse(newState); // Informa o componente pai da mudança
    };

    // CORREÇÃO: Agora, ao vincular, também adicionamos o mestre aos 'viewers' da ficha.
    const handleLinkCharacter = async (character) => {
        const newLink = {
            userId: currentUser.uid,
            characterId: character.id,
            characterName: character.name,
            tokenImage: character.tokenImage
        };
        const otherLinks = (room.characters || []).filter(c => c.userId !== currentUser.uid);

        // Atualiza a ficha do personagem para dar permissão ao mestre
        const charRef = doc(db, 'characters', character.id);
        await updateDoc(charRef, {
            viewers: arrayUnion(room.masterId)
        });

        // Atualiza a sala
        updateRoom({ characters: [...otherLinks, newLink] });
        setIsLinkModalOpen(false);
        toast.success(`Personagem ${character.name} vinculado!`);
    };

    // CORREÇÃO: Ao desvincular, removemos a permissão do mestre da ficha.
    const handleUnlinkCharacter = async () => {
        const myLink = room.characters?.find(c => c.userId === currentUser.uid);
        if (myLink) {
            // Remove a permissão do mestre da ficha
            const charRef = doc(db, 'characters', myLink.characterId);
            await updateDoc(charRef, {
                viewers: arrayRemove(room.masterId)
            });
        }

        const otherLinks = (room.characters || []).filter(c => c.userId !== currentUser.uid);
        const tokensWithoutPlayer = (room.tokens || []).filter(t => t.userId !== currentUser.uid);
        updateRoom({ characters: otherLinks, tokens: tokensWithoutPlayer });
        toast.error("Personagem desvinculado.");
    };

    const handleDragPlayer = (e, charLink) => {
        e.dataTransfer.setData('application/vtt-player-character', JSON.stringify(charLink));
        toast(`Arrastando ${charLink.characterName}...`);
    };

    const myCharacterLink = room.characters?.find(c => c.userId === currentUser.uid);

    return (
        <>
            <SidebarContainer>
                <CollapseButton onClick={handleToggleCollapse} title={isCollapsed ? "Expandir Barra Lateral" : "Recolher Barra Lateral"}>
                    {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
                </CollapseButton>
                <ToolSection $isCollapsed={isCollapsed}>
                    <h4>Jogadores</h4>
                    {members.length > 0 ? (
                        <PlayerList>
                            {members.map(member => {
                                const charLink = room.characters?.find(c => c.userId === member.uid);
                                const isSelf = member.uid === currentUser.uid;
                                const isDraggable = charLink && (isMaster || isSelf);
                                return (
                                    <PlayerCard key={member.uid} $isCollapsed={isCollapsed} draggable={isDraggable} onDragStart={isDraggable ? (e) => handleDragPlayer(e, charLink) : undefined} style={{ cursor: isDraggable ? 'grab' : 'default' }} title={isDraggable ? `Arraste ${charLink.characterName}` : ''}>
                                        <PlayerAvatar src={getTokenImageUrl(charLink?.tokenImage) || `https://api.dicebear.com/8.x/adventurer/svg?seed=${member.nickname}`} />
                                        <PlayerInfo $isCollapsed={isCollapsed}>
                                            <PlayerName>{member.nickname} {room.masterId === member.uid && ' (Mestre)'}</PlayerName>
                                            <CharacterName>{charLink?.characterName || 'Sem personagem'}</CharacterName>
                                        </PlayerInfo>
                                    </PlayerCard>
                                )
                            })}
                        </PlayerList>
                    ) : (!isCollapsed && <p>Nenhum jogador na sala.</p>)}

                    {!isMaster && (
                        myCharacterLink ?
                            <LinkButton onClick={handleUnlinkCharacter} $isCollapsed={isCollapsed}><FaUnlink /> <span>Desvincular Personagem</span></LinkButton> :
                            <LinkButton onClick={() => setIsLinkModalOpen(true)} $isCollapsed={isCollapsed}><FaLink /> <span>Vincular Personagem</span></LinkButton>
                    )}
                </ToolSection>

                {isMaster && (
                    <ToolSection $isCollapsed={isCollapsed}>
                        <h4>Ferramentas do Mestre</h4>
                        <ToolButton onClick={() => onToolSelect('sceneManager')} $isCollapsed={isCollapsed}><FaMap /> <span>Gerenciar Cenas</span></ToolButton>
                        <ToolButton onClick={() => onToolSelect('fogOfWar')} $isCollapsed={isCollapsed}><FaEye /> <span>Fog of War</span></ToolButton>
                        <ToolButton onClick={() => onToolSelect('enemyGrimoire')} $isCollapsed={isCollapsed}><FaSkull /> <span>Grimório</span></ToolButton>
                        <ToolButton onClick={() => onToolSelect('jukebox')} $isCollapsed={isCollapsed}><FaMusic /> <span>Jukebox</span></ToolButton>
                        <ToolButton onClick={() => onToolSelect('roomSettings')} $isCollapsed={isCollapsed}><FaCog /> <span>Configurações</span></ToolButton>
                    </ToolSection>
                )}

                <ToolSection $isCollapsed={isCollapsed}>
                    <h4>Ferramentas Gerais</h4>
                    <ToolButton onClick={() => onToolSelect('initiativeTracker')} $isCollapsed={isCollapsed}><FaUsers /> <span>Iniciativa</span></ToolButton>
                    <ToolButton onClick={() => onToolSelect('gameLog')} $isCollapsed={isCollapsed}><FaScroll /> <span>Log de Rolagens</span></ToolButton>
                </ToolSection>

                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <ToolButton onClick={copyInviteLink} $isCollapsed={isCollapsed}><FaCopy /> <span>Copiar Convite</span></ToolButton>
                    <ToolButton onClick={() => navigate('/rooms')} $isCollapsed={isCollapsed}><FaSignOutAlt /> <span>Sair da Sala</span></ToolButton>
                </div>
            </SidebarContainer>
            <LinkCharacterModal isOpen={isLinkModalOpen} onClose={() => setIsLinkModalOpen(false)} onLink={handleLinkCharacter} />
        </>
    );
};