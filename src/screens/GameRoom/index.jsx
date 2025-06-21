import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, onSnapshot, getDocs, collection, query, where, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import { FaCopy, FaCrown, FaUnlink } from 'react-icons/fa';

import { Modal } from '../../components/Modal';
import { PlayerStatusCard } from '../../components/PlayerStatusCard';
import { 
    GameRoomContainer, Header, RoomInfo, RoomTitle, MasterInfo, InviteSection, 
    InviteLink, CopyButton, MainContent, PlayersPanel, PanelTitle, PlayerList,
    PlayerCard, PlayerInfo, PlayerName, CharacterName, LinkCharacterButton, GameArea,
    MasterDashboard, DashboardGrid
} from './styles';
import { TurnTracker } from '../../components/TurnTracker';
import _ from 'lodash';

export const GameRoom = () => {
    const { roomId } = useParams();
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const [room, setRoom] = useState(null);
    const [players, setPlayers] = useState([]);
    const [myCharacters, setMyCharacters] = useState([]);
    const [linkedCharactersData, setLinkedCharactersData] = useState({});
    const [loading, setLoading] = useState(true);
    const [myCharactersLoading, setMyCharactersLoading] = useState(true);
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
    const [isLinking, setIsLinking] = useState(false);

    const inviteLink = `${window.location.origin}/invite/${roomId}`;

    // Função de atualização para o TurnTracker
    const handleRoomUpdate = useCallback(_.debounce((update) => {
        const roomRef = doc(db, "rooms", roomId);
        updateDoc(roomRef, update);
    }, 500), [roomId]);

    // Busca os dados da sala e dos jogadores
    useEffect(() => {
        setLoading(true);
        const roomRef = doc(db, "rooms", roomId);
        const unsubscribe = onSnapshot(roomRef, async (doc) => {
            if (doc.exists()) {
                const roomData = doc.data();
                if (roomData.masterId === currentUser.uid || roomData.playerIds.includes(currentUser.uid)) {
                    setRoom({ id: doc.id, ...roomData });

                    const playerIds = [roomData.masterId, ...roomData.playerIds].filter(Boolean);
                    if (playerIds.length > 0) {
                        const playersQuery = query(collection(db, "users"), where("uid", "in", playerIds));
                        const playersSnapshot = await getDocs(playersQuery);
                        setPlayers(playersSnapshot.docs.map(playerDoc => playerDoc.data()));
                    }
                } else {
                    toast.error("Você não tem permissão para entrar nesta sala.");
                    navigate('/');
                }
            } else {
                toast.error("Sala não encontrada.");
                navigate('/');
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [roomId, currentUser.uid, navigate]);

    // Busca os dados das fichas vinculadas APENAS SE FOR O MESTRE
    useEffect(() => {
        if (!room || room.masterId !== currentUser.uid || !room.characters || room.characters.length === 0) {
            setLinkedCharactersData({});
            return;
        };
        const characterIds = room.characters.map(c => c.characterId).filter(Boolean);
        if (characterIds.length === 0) return;
        
        const charactersQuery = query(collection(db, "characters"), where("__name__", "in", characterIds));
        const unsubscribe = onSnapshot(charactersQuery, (snapshot) => {
            const charactersData = {};
            snapshot.forEach(doc => {
                const charData = doc.data();
                const owner = players.find(p => p.uid === charData.ownerId);
                charactersData[doc.id] = { id: doc.id, ...charData, ownerNickname: owner?.nickname || '???' };
            });
            setLinkedCharactersData(charactersData);
        }, (error) => {
            console.error("Erro ao buscar fichas da sala (Mestre):", error);
        });
        return () => unsubscribe();
    }, [room, players, currentUser.uid]);

    // Busca as fichas do jogador atual para o modal de seleção
    useEffect(() => {
        if (!currentUser?.uid) return;
        setMyCharactersLoading(true);
        // CORREÇÃO: A consulta agora filtra pelo array 'viewers', alinhando-se à regra de segurança.
        const q = query(collection(db, "characters"), where("viewers", "array-contains", currentUser.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMyCharacters(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setMyCharactersLoading(false);
        });
        return () => unsubscribe();
    }, [currentUser.uid]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(inviteLink).then(() => toast.success("Link de convite copiado!"));
    };

    const handleLinkCharacter = async (character) => {
        setIsLinking(true);
        const roomRef = doc(db, "rooms", roomId);
        const charRef = doc(db, "characters", character.id);
        const currentCharacterLink = room.characters.find(c => c.userId === currentUser.uid);

        try {
            if (currentCharacterLink?.characterId) {
                const oldCharRef = doc(db, "characters", currentCharacterLink.characterId);
                await updateDoc(oldCharRef, { viewers: arrayRemove(room.masterId) });
            }
            
            let updatedCharacters = room.characters.filter(c => c.userId !== currentUser.uid);
            updatedCharacters.push({ userId: currentUser.uid, characterId: character.id, characterName: character.name });

            await updateDoc(charRef, { viewers: arrayUnion(room.masterId) });
            await updateDoc(roomRef, { characters: updatedCharacters });
            
            toast.success("Personagem vinculado com sucesso!");
            setIsLinkModalOpen(false);
        } catch (error) { 
            toast.error("Erro ao vincular personagem.");
            console.error("Erro ao vincular: ", error);
        } finally {
            setIsLinking(false);
        }
    };

    const handleUnlinkCharacter = async () => {
        const currentCharacterLink = room.characters.find(c => c.userId === currentUser.uid);
        if(!currentCharacterLink) return;

        const roomRef = doc(db, "rooms", roomId);
        const charRef = doc(db, "characters", currentCharacterLink.characterId);
        const updatedCharacters = room.characters.filter(c => c.userId !== currentUser.uid);

        try {
            await updateDoc(charRef, { viewers: arrayRemove(room.masterId) });
            await updateDoc(roomRef, { characters: updatedCharacters });
            toast.success("Personagem desvinculado com sucesso!");
        } catch (error) { 
            toast.error("Erro ao desvincular personagem.");
            console.error("Erro ao desvincular: ", error);
        }
    }
    
    if (loading || !room) {
        return <GameRoomContainer><Header><RoomTitle>Carregando sala...</RoomTitle></Header></GameRoomContainer>;
    }

    const isMaster = room.masterId === currentUser.uid;

    return (
        <>
            <Modal isOpen={isLinkModalOpen} onClose={() => setIsLinkModalOpen(false)}>
                <PanelTitle>Vincular Personagem</PanelTitle>
                <PlayerList>
                    {myCharactersLoading && <p>Carregando suas fichas...</p>}
                    {!myCharactersLoading && myCharacters.length === 0 && <p>Você não tem nenhuma ficha para vincular.</p>}
                    {!myCharactersLoading && myCharacters.map(char => (<PlayerCard key={char.id} style={{cursor: 'pointer'}} onClick={() => handleLinkCharacter(char)}><PlayerName>{char.name}</PlayerName><CharacterName>Nível {char.level || 0}</CharacterName></PlayerCard>))}
                </PlayerList>
            </Modal>

            <GameRoomContainer>
                <Header>
                    <RoomInfo><RoomTitle>{room.roomName}</RoomTitle><MasterInfo><FaCrown /> Mestrado por: {room.masterNickname}</MasterInfo></RoomInfo>
                    {isMaster && (<InviteSection><p>Convide seus jogadores:</p><InviteLink readOnly value={inviteLink} /><CopyButton onClick={copyToClipboard} title="Copiar Link"><FaCopy /></CopyButton></InviteSection>)}
                </Header>

                <MainContent>
                    <PlayersPanel>
                        <PanelTitle>Aventureiros na Sala</PanelTitle>
                        <PlayerList>
                            {players.map(player => {
                                const linkedCharInfo = room.characters.find(c => c.userId === player.uid);

                                return (
                                    <PlayerCard key={player.uid}>
                                        <PlayerInfo><PlayerName>{player.nickname}</PlayerName>{player.uid === room.masterId && <FaCrown title="Mestre da Sala" />}</PlayerInfo>
                                        
                                        {player.uid !== room.masterId && (
                                            linkedCharInfo ? (
                                                <CharacterName>
                                                    Jogando com: <Link to={`/sheet/${linkedCharInfo.characterId}`}>{linkedCharInfo.characterName || '...'}</Link>
                                                    {currentUser.uid === player.uid && <button onClick={handleUnlinkCharacter} title="Desvincular"><FaUnlink size={10}/></button>}
                                                </CharacterName>
                                            ) : (
                                                currentUser.uid === player.uid ? (
                                                    <LinkCharacterButton onClick={() => setIsLinkModalOpen(true)} disabled={isLinking || myCharactersLoading}>
                                                        {myCharactersLoading ? 'Carregando fichas...' : 'Vincular Personagem'}
                                                    </LinkCharacterButton>
                                                ) : ( <CharacterName>Aguardando personagem...</CharacterName> )
                                            )
                                        )}
                                    </PlayerCard>
                                )
                            })}
                        </PlayerList>
                    </PlayersPanel>

                    <GameArea>
                        {isMaster && (
                            <MasterDashboard>
                                <PanelTitle>Painel do Mestre</PanelTitle>
                                {Object.keys(linkedCharactersData).length > 0 ? (
                                    <DashboardGrid>
                                        {Object.values(linkedCharactersData).map(char => (
                                            <PlayerStatusCard key={char.id} character={char} />
                                        ))}
                                    </DashboardGrid>
                                ) : (
                                    <p style={{color: 'var(--color-text-secondary)', textAlign: 'center'}}>Aguardando jogadores vincularem suas fichas...</p>
                                )}
                            </MasterDashboard>
                        )}
                        <TurnTracker 
                            room={room} 
                            linkedCharactersData={linkedCharactersData}
                            onUpdate={handleRoomUpdate}
                        />
                        <div style={{ marginTop: '2rem', padding: '2rem', border: '1px dashed var(--color-text-secondary)', borderRadius: '8px', textAlign: 'center', color: 'var(--color-text-secondary)'}}>
                            <h2>Mesa de Jogo</h2>
                            <p>(Em breve: Controle de Turnos, Rolador de Dados e mais!)</p>
                        </div>
                    </GameArea>
                </MainContent>
            </GameRoomContainer>
        </>
    );
};
