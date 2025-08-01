import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoom } from '../../contexts/RoomContext';
import { useAuth } from '../../contexts/AuthContext';
import { useRoomMembers } from '../../hooks/useRoomMembers';
import { useUserCharacters } from '../../hooks/useUserCharacters';
import { SidebarContainer, ToolSection, PlayerList, PlayerCard, PlayerAvatar, PlayerInfo, PlayerName, CharacterName, LinkButton } from './styles';
import { FaMap, FaEye, FaUsers, FaSkull, FaSignOutAlt, FaCopy } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { Modal } from '../Modal';

const ToolButton = ({ icon, label, onClick }) => (
    <button onClick={onClick} style={{ width: '100%', display: 'flex', gap: '0.75rem', alignItems: 'center', padding: '0.75rem', fontSize: '0.9rem' }}>{icon}{label}</button>
);

const LinkCharacterModal = ({ isOpen, onClose, onLink }) => {
    const { characters, loading } = useUserCharacters();

    if (loading) return <p>Carregando personagens...</p>;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h3>Vincular Personagem</h3>
            {characters.length === 0 ? <p>Você não possui personagens.</p> :
                <PlayerList>
                    {characters.map(char => (
                        <PlayerCard key={char.id} onClick={() => onLink(char)} style={{cursor: 'pointer'}}>
                            <PlayerAvatar src={char.tokenImage} />
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
    const { members } = useRoomMembers();
    const navigate = useNavigate();
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
    
    const isMaster = room.masterId === currentUser.uid;

    const copyInviteLink = () => {
        const inviteLink = `${window.location.origin}/invite/${roomId}`;
        navigator.clipboard.writeText(inviteLink);
        toast.success('Link de convite copiado!');
    };

    const handleLinkCharacter = (character) => {
        const newLink = { userId: currentUser.uid, characterId: character.id, characterName: character.name, tokenImage: character.tokenImage };
        const otherLinks = room.characters.filter(c => c.userId !== currentUser.uid);
        updateRoom({ characters: [...otherLinks, newLink] });
        setIsLinkModalOpen(false);
        toast.success(`Personagem ${character.name} vinculado!`);
    };

    const myCharacterLink = room.characters.find(c => c.userId === currentUser.uid);

    return (
        <>
            <SidebarContainer>
                <ToolSection>
                    <h4>Jogadores</h4>
                    <PlayerList>
                        {members.map(member => {
                            const charLink = room.characters.find(c => c.userId === member.uid);
                            return (
                                <PlayerCard key={member.uid}>
                                    <PlayerAvatar src={charLink?.tokenImage || `https://api.dicebear.com/8.x/adventurer/svg?seed=${member.nickname}`} />
                                    <PlayerInfo>
                                        <PlayerName>{member.nickname} {room.masterId === member.uid && ' (Mestre)'}</PlayerName>
                                        <CharacterName>{charLink?.characterName || 'Sem personagem'}</CharacterName>
                                    </PlayerInfo>
                                </PlayerCard>
                            )
                        })}
                    </PlayerList>
                    {!isMaster && !myCharacterLink && <LinkButton onClick={() => setIsLinkModalOpen(true)}>Vincular Personagem</LinkButton>}
                </ToolSection>

                {isMaster && (
                    <ToolSection><h4>Ferramentas do Mestre</h4>
                        <ToolButton icon={<FaMap />} label="Gerenciar Cenas" onClick={() => onToolSelect('sceneManager')} />
                        {/* Outros botões... */}
                    </ToolSection>
                )}

                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <ToolButton icon={<FaCopy />} label="Copiar Convite" onClick={copyInviteLink} />
                    <ToolButton icon={<FaSignOutAlt />} label="Sair da Sala" onClick={() => navigate('/rooms')} />
                </div>
            </SidebarContainer>

            <LinkCharacterModal isOpen={isLinkModalOpen} onClose={() => setIsLinkModalOpen(false)} onLink={handleLinkCharacter} />
        </>
    );
};