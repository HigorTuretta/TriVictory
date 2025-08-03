// src/components/VTT/LeftSidebar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoom } from '../../contexts/RoomContext';
import { useAuth } from '../../contexts/AuthContext';
import { useUserCharacters } from '../../hooks/useUserCharacters';
import { getTokenImageUrl } from '../../services/cloudinaryService';
import { SidebarContainer, ToolSection, PlayerList, PlayerCard, PlayerAvatar, PlayerInfo, PlayerName, CharacterName, LinkButton, ToolButton } from './styles';
import { FaMap, FaEye, FaUsers, FaSkull, FaSignOutAlt, FaCopy, FaLink, FaUnlink, FaScroll, FaCog } from 'react-icons/fa';
import toast from 'react-hot-toast';
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
                        <PlayerCard key={char.id} onClick={() => onLink(char)} style={{cursor: 'pointer'}}>
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

export const LeftSidebar = ({ onToolSelect }) => {
    const { room, roomId, updateRoom } = useRoom();
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
    
    const isMaster = room.masterId === currentUser.uid;
    const members = room.members || [];

    const copyInviteLink = () => {
        const inviteLink = `${window.location.origin}/invite/${roomId}`;
        navigator.clipboard.writeText(inviteLink);
        toast.success('Link de convite copiado!');
    };

    const handleLinkCharacter = (character) => {
        // CORREÇÃO: A vinculação agora apenas adiciona a referência do personagem à sala.
        // Ela não adiciona mais o token diretamente ao mapa.
        const newLink = { 
            userId: currentUser.uid, 
            characterId: character.id, 
            characterName: character.name, 
            tokenImage: character.tokenImage
        };
        const otherLinks = (room.characters || []).filter(c => c.userId !== currentUser.uid);
        updateRoom({ characters: [...otherLinks, newLink] });
        setIsLinkModalOpen(false);
        toast.success(`Personagem ${character.name} vinculado! Arraste-o para o mapa para entrar em cena.`);
    };
    
    const handleUnlinkCharacter = () => {
        // CORREÇÃO: Ao desvincular, removemos tanto a referência do personagem
        // quanto seu token do mapa, se ele existir.
        const otherLinks = (room.characters || []).filter(c => c.userId !== currentUser.uid);
        const tokensWithoutPlayer = (room.tokens || []).filter(t => t.userId !== currentUser.uid);
        updateRoom({ characters: otherLinks, tokens: tokensWithoutPlayer });
        toast.error("Personagem desvinculado.");
    };
    
    // NOVO: Função para iniciar o arraste de um token de jogador.
    const handleDragPlayer = (e, charLink) => {
        e.dataTransfer.setData('application/vtt-player-character', JSON.stringify(charLink));
        toast.info(`Arrastando ${charLink.characterName}...`);
    };

    const myCharacterLink = room.characters?.find(c => c.userId === currentUser.uid);

    return (
        <>
            <SidebarContainer>
                <ToolSection>
                    <h4>Jogadores</h4>
                    {members.length > 0 ? (
                        <PlayerList>
                            {members.map(member => {
                                const charLink = room.characters?.find(c => c.userId === member.uid);
                                const isSelf = member.uid === currentUser.uid;
                                
                                // O card só é arrastável se for um personagem vinculado e for o mestre ou o próprio jogador.
                                const isDraggable = charLink && (isMaster || isSelf);
                                
                                return (
                                    <PlayerCard 
                                        key={member.uid} 
                                        draggable={isDraggable}
                                        onDragStart={isDraggable ? (e) => handleDragPlayer(e, charLink) : undefined}
                                        style={{ cursor: isDraggable ? 'grab' : 'default' }}
                                        title={isDraggable ? `Arraste para adicionar ${charLink.characterName} ao mapa` : ''}
                                    >
                                        <PlayerAvatar src={getTokenImageUrl(charLink?.tokenImage) || `https://api.dicebear.com/8.x/adventurer/svg?seed=${member.nickname}`} />
                                        <PlayerInfo>
                                            <PlayerName>{member.nickname} {room.masterId === member.uid && ' (Mestre)'}</PlayerName>
                                            <CharacterName>{charLink?.characterName || 'Sem personagem'}</CharacterName>
                                        </PlayerInfo>
                                    </PlayerCard>
                                )
                            })}
                        </PlayerList>
                    ) : <p>Nenhum jogador na sala.</p>}

                    {!isMaster && (
                        myCharacterLink ? 
                        <LinkButton onClick={handleUnlinkCharacter}><FaUnlink /> Desvincular Personagem</LinkButton> :
                        <LinkButton onClick={() => setIsLinkModalOpen(true)}><FaLink /> Vincular Personagem</LinkButton>
                    )}
                </ToolSection>

                {isMaster && (
                    <ToolSection>
                        <h4>Ferramentas do Mestre</h4>
                        <ToolButton onClick={() => onToolSelect('sceneManager')}><FaMap /> Gerenciar Cenas</ToolButton>
                        <ToolButton onClick={() => onToolSelect('fogOfWar')}><FaEye /> Fog of War</ToolButton>
                        <ToolButton onClick={() => onToolSelect('enemyGrimoire')}><FaSkull /> Grimório</ToolButton>
                        <ToolButton onClick={() => onToolSelect('roomSettings')}><FaCog /> Configurações da Sala</ToolButton>                        
                    </ToolSection>
                )}
                
                <ToolSection>
                    <h4>Ferramentas Gerais</h4>
                    <ToolButton onClick={() => onToolSelect('initiativeTracker')}><FaUsers /> Iniciativa</ToolButton>
                    <ToolButton onClick={() => onToolSelect('gameLog')}><FaScroll /> Log de Rolagens</ToolButton>
                </ToolSection>

                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <ToolButton onClick={copyInviteLink}><FaCopy /> Copiar Convite</ToolButton>
                    <ToolButton onClick={() => navigate('/rooms')}><FaSignOutAlt /> Sair da Sala</ToolButton>
                </div>
            </SidebarContainer>

            <LinkCharacterModal isOpen={isLinkModalOpen} onClose={() => setIsLinkModalOpen(false)} onLink={handleLinkCharacter} />
        </>
    );
};