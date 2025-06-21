import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  doc,
  onSnapshot,
  getDocs,
  collection,
  query,
  where,
  updateDoc,
  arrayUnion,
  arrayRemove,
  addDoc,
  serverTimestamp,
  deleteDoc
} from 'firebase/firestore';

import { db } from '../../firebase/config';
import { useAuth } from '../../contexts/AuthContext';
import _ from 'lodash';
import toast from 'react-hot-toast';
import { FaCopy, FaCrown, FaUnlink } from 'react-icons/fa';

import { Modal } from '../../components/Modal';
import { PlayerStatusCard } from '../../components/PlayerStatusCard';
import { TurnTracker } from '../../components/TurnTracker';
import { DiceRoller } from '../../components/DiceRoller';
import { GameLog } from '../../components/GameLog';
import { rollActions } from '../../gameLogic/rollActions';

import {
  GameRoomContainer,
  Header,
  RoomInfo,
  RoomTitle,
  MasterInfo,
  InviteSection,
  InviteLink,
  CopyButton,
  MainContent,
  PlayersPanel,
  PanelTitle,
  PlayerList,
  PlayerCard,
  PlayerInfo,
  PlayerName,
  CharacterName,
  LinkCharacterButton,
  GameArea,
  MasterDashboard,
  DashboardGrid,
  ActionPanel,
  ActionButton,
  RollOptions,
  OptionCheckbox,
  ActionGrid
} from './styles';

export const GameRoom = () => {
  const { roomId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [players, setPlayers] = useState([]);
  const [myCharacters, setMyCharacters] = useState([]);
  const [linkedCharactersData, setLinkedCharactersData] = useState({});
  const [myActiveCharacter, setMyActiveCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [myCharactersLoading, setMyCharactersLoading] = useState(true);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isLinking, setIsLinking] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [currentRoll, setCurrentRoll] = useState(null);
  const [rollCooldown, setRollCooldown] = useState(false);

  const [rollOptions, setRollOptions] = useState({
    usePA: false,
    isHidden: false
  });

  const inviteLink = `${window.location.origin}/invite/${roomId}`;

  const handleRoomUpdate = useCallback(
    _.debounce((update) => {
      updateDoc(doc(db, 'rooms', roomId), update);
    }, 500),
    [roomId]
  );

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink).then(() =>
      toast.success('Link de convite copiado!')
    );
  };

  const isMyTurn = () => {
    if (!room?.turnOrder?.length) return true;
    const currentItem = room.turnOrder[room.currentTurnIndex];
    if (!currentItem) return true;
    if (currentItem.type === 'npc') return false;
    const myCharacterId =
      room.characters?.find((c) => c.userId === currentUser.uid)?.characterId ||
      null;
    return currentItem.id === myCharacterId;
  };

  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(doc(db, 'rooms', roomId), async (snap) => {
      if (!snap.exists()) {
        toast.error('Sala não encontrada.');
        return navigate('/');
      }
      const data = snap.data();
      if (
        data.masterId !== currentUser.uid &&
        !data.playerIds.includes(currentUser.uid)
      ) {
        toast.error('Você não faz parte desta sala.');
        return navigate('/');
      }
      setRoom({ id: snap.id, ...data });
      const ids = [data.masterId, ...data.playerIds];
      if (ids.length) {
        const qs = query(collection(db, 'users'), where('uid', 'in', ids));
        const ps = await getDocs(qs);
        setPlayers(ps.docs.map((d) => d.data()));
      }
      setLoading(false);
    });
    return () => unsub();
  }, [roomId, currentUser.uid, navigate]);

  useEffect(() => {
    if (!currentUser.uid) return;
    setMyCharactersLoading(true);
    const qs = query(
      collection(db, 'characters'),
      where('viewers', 'array-contains', currentUser.uid)
    );
    const unsub = onSnapshot(qs, (snap) => {
      setMyCharacters(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setMyCharactersLoading(false);
    });
    return () => unsub();
  }, [currentUser.uid]);

  useEffect(() => {
    if (!room?.characters?.length) {
      setLinkedCharactersData({});
      return;
    }
    const charIds = room.characters.map((c) => c.characterId).filter(Boolean);
    if (!charIds.length) return;
    const qs = query(
      collection(db, 'characters'),
      where('__name__', 'in', charIds)
    );
    const unsub = onSnapshot(qs, (snap) => {
      const map = {};
      snap.forEach((d) => {
        map[d.id] = { id: d.id, ...d.data() };
      });
      setLinkedCharactersData(map);
    });
    return () => unsub();
  }, [room]);

  useEffect(() => {
    if (!room || !currentUser) return;
    const myLink = room.characters.find((c) => c.userId === currentUser.uid);
    if (myLink?.characterId) {
      const charRef = doc(db, 'characters', myLink.characterId);
      const unsub = onSnapshot(charRef, (d) => {
        if (d.exists()) setMyActiveCharacter({ id: d.id, ...d.data() });
      });
      return () => unsub();
    }
    setMyActiveCharacter(null);
  }, [room, currentUser]);

  const handleLinkCharacter = async (character) => {
    setIsLinking(true);
    const roomRef = doc(db, 'rooms', roomId);
    const charRef = doc(db, 'characters', character.id);
    const currentCharacterLink = room.characters.find(
      (c) => c.userId === currentUser.uid
    );
    try {
      if (currentCharacterLink?.characterId) {
        const oldCharRef = doc(
          db,
          'characters',
          currentCharacterLink.characterId
        );
        await updateDoc(oldCharRef, { viewers: arrayRemove(room.masterId) });
      }
      const updatedCharacters = room.characters
        .filter((c) => c.userId !== currentUser.uid)
        .concat({
          userId: currentUser.uid,
          characterId: character.id,
          characterName: character.name
        });
      await updateDoc(charRef, { viewers: arrayUnion(room.masterId) });
      await updateDoc(roomRef, { characters: updatedCharacters });
      toast.success('Personagem vinculado com sucesso!');
      setIsLinkModalOpen(false);
    } catch {
      toast.error('Erro ao vincular personagem.');
    } finally {
      setIsLinking(false);
    }
  };

  const handleUnlinkCharacter = async () => {
    const currentLink = room.characters.find(
      (c) => c.userId === currentUser.uid
    );
    if (!currentLink) return;
    const roomRef = doc(db, 'rooms', roomId);
    const charRef = doc(db, 'characters', currentLink.characterId);
    try {
      await updateDoc(charRef, { viewers: arrayRemove(room.masterId) });
      await updateDoc(roomRef, {
        characters: room.characters.filter(
          (c) => c.userId !== currentUser.uid
        )
      });
      toast.success('Personagem desvinculado com sucesso!');
    } catch {
      toast.error('Erro ao desvincular personagem.');
    }
  };

  const executeRoll = useCallback(
    async (actionKey) => {
      const isMaster = room?.masterId === currentUser.uid;
      if (!isMaster && !isMyTurn()) {
        toast.error('Não é o seu turno para rolar.');
        return;
      }
      if (rollCooldown || isRolling) {
        toast.error('Aguarde a rolagem terminar.');
        return;
      }
      const action = rollActions[actionKey];
      const characterForRoll = myActiveCharacter;
      if (action.attribute && !isMaster && !characterForRoll) {
        toast.error('Você precisa vincular um personagem para realizar esta ação!');
        return;
      }
      if (rollOptions.usePA && (characterForRoll?.pa_current || 0) < 1) {
        toast.error('Você não tem Pontos de Ação suficientes!');
        return;
      }
      setRollCooldown(true);
      setTimeout(() => setRollCooldown(false), 4500);

      let dicePool = action.attribute ? 1 : action.diceCount;
      const modifiers = [];
      const effectiveChar = isMaster
        ? characterForRoll || { attributes: {}, skills: [] }
        : characterForRoll;

      if (action.attribute) {
        const attrVal = effectiveChar?.attributes?.[action.attribute] || 0;
        modifiers.push({ label: action.attribute.toUpperCase(), value: attrVal });
        if (effectiveChar?.skills?.some((s) => s.nome === action.skill)) {
          dicePool += 1;
          modifiers.push({ label: action.skill, value: '+1D' });
        }
        if (rollOptions.usePA) {
          dicePool += 1;
          modifiers.push({ label: 'Ponto de Ação', value: '+1D' });
        }
      }
      dicePool = Math.max(1, Math.min(3, dicePool));
      const results = Array.from({ length: dicePool }, () => Math.floor(Math.random() * 6) + 1);
      const diceSum = results.reduce((a, b) => a + b, 0);
      let total = diceSum;
      if (modifiers[0]?.value && typeof modifiers[0].value === 'number') {
        total += modifiers[0].value;
      }
      const crits = results.filter((r) => r === 6).length;
      if (crits && modifiers[0]?.value) {
        const bonus = crits * modifiers[0].value;
        total += bonus;
        modifiers.push({ label: `Crítico! (x${crits})`, value: bonus });
      }
      if (rollOptions.usePA && myActiveCharacter) {
        const charRef = doc(db, 'characters', myActiveCharacter.id);
        await updateDoc(charRef, { pa_current: myActiveCharacter.pa_current - 1 });
        toast('Você gastou 1 PA para obter um Ganho!');
      }

      const charName = myActiveCharacter?.name;
      const displayName = charName
        ? `${currentUser.nickname} (${charName})`
        : currentUser.nickname;

      const newRoll = {
        roomId,
        userId: currentUser.uid,
        userName: displayName,
        action: action.label,
        individualResults: results,
        modifiers,
        total,
        timestamp: serverTimestamp(),
        hidden: isMaster ? rollOptions.isHidden : false
      };

      setCurrentRoll(newRoll);
      setIsRolling(true);
      try {
        await addDoc(collection(db, 'rooms', roomId, 'rolls'), newRoll);
      } catch (e) {
        toast.error('Erro ao salvar rolagem.');
        console.error(e);
      }
      setRollOptions((p) => ({ ...p, usePA: false }));
    },
    [
      currentUser,
      roomId,
      room,
      rollCooldown,
      isRolling,
      myActiveCharacter,
      rollOptions.usePA,
      rollOptions.isHidden
    ]
  );

  const handleDeleteLog = async (logId) =>
    deleteDoc(doc(db, 'rooms', roomId, 'rolls', logId));

  const handleToggleLogVisibility = async (logId, hidden) =>
    updateDoc(doc(db, 'rooms', roomId, 'rolls', logId), { hidden });

  if (loading || !room) {
    return (
      <GameRoomContainer>
        <Header>
          <RoomTitle>Carregando sala…</RoomTitle>
        </Header>
      </GameRoomContainer>
    );
  }

  const isMaster = room.masterId === currentUser.uid;

  return (
    <>
      <DiceRoller
        isVisible={isRolling}
        rollData={currentRoll}
        onAnimationComplete={() => setIsRolling(false)}
      />

      <Modal isOpen={isLinkModalOpen} onClose={() => setIsLinkModalOpen(false)}>
        <PanelTitle>Vincular Personagem</PanelTitle>
        <PlayerList>
          {myCharactersLoading && <p>Carregando suas fichas…</p>}
          {!myCharactersLoading && myCharacters.length === 0 && (
            <p>Você não tem nenhuma ficha para vincular.</p>
          )}
          {!myCharactersLoading &&
            myCharacters.map((char) => (
              <PlayerCard
                key={char.id}
                style={{ cursor: 'pointer' }}
                onClick={() => handleLinkCharacter(char)}
              >
                <PlayerName>{char.name}</PlayerName>
                <CharacterName>Nível {char.level ?? 0}</CharacterName>
              </PlayerCard>
            ))}
        </PlayerList>
      </Modal>

      <GameRoomContainer>
        <Header>
          <RoomInfo>
            <RoomTitle>{room.roomName}</RoomTitle>
            <MasterInfo>
              <FaCrown />
              Mestrado por: {room.masterNickname}
            </MasterInfo>
          </RoomInfo>

          {isMaster && (
            <InviteSection>
              <p>Convide seus jogadores:</p>
              <InviteLink readOnly value={inviteLink} />
              <CopyButton onClick={copyToClipboard} title="Copiar Link">
                <FaCopy />
              </CopyButton>
            </InviteSection>
          )}
        </Header>

        <MainContent>
          <PlayersPanel>
            <PanelTitle>Aventureiros na Sala</PanelTitle>
            <PlayerList>
              {players.map((player) => {
                const link = room.characters.find((c) => c.userId === player.uid);
                return (
                  <PlayerCard key={player.uid}>
                    <PlayerInfo>
                      <PlayerName>{player.nickname}</PlayerName>
                      {player.uid === room.masterId && <FaCrown title="Mestre da Sala" />}
                    </PlayerInfo>

                    {player.uid !== room.masterId &&
                      (link ? (
                        <CharacterName>
                          Jogando com:{' '}
                          <Link to={`/sheet/${link.characterId}`}>
                            {link.characterName || '…'}
                          </Link>
                          {currentUser.uid === player.uid && (
                            <button onClick={handleUnlinkCharacter} title="Desvincular">
                              <FaUnlink size={10} />
                            </button>
                          )}
                        </CharacterName>
                      ) : currentUser.uid === player.uid ? (
                        <LinkCharacterButton
                          onClick={() => setIsLinkModalOpen(true)}
                          disabled={isLinking || myCharactersLoading}
                        >
                          {myCharactersLoading ? 'Carregando…' : 'Vincular Personagem'}
                        </LinkCharacterButton>
                      ) : (
                        <CharacterName>Aguardando personagem…</CharacterName>
                      ))}
                  </PlayerCard>
                );
              })}
            </PlayerList>
          </PlayersPanel>

          <GameArea>
            {isMaster && (
              <MasterDashboard>
                <PanelTitle>Painel do Mestre</PanelTitle>
                {Object.keys(linkedCharactersData).length ? (
                  <DashboardGrid>
                    {Object.values(linkedCharactersData).map((c) => (
                      <PlayerStatusCard key={c.id} character={c} />
                    ))}
                  </DashboardGrid>
                ) : (
                  <p
                    style={{ color: 'var(--color-text-secondary)', textAlign: 'center' }}
                  >
                    Aguardando jogadores vincularem suas fichas.
                  </p>
                )}
              </MasterDashboard>
            )}

            <TurnTracker
              room={room}
              linkedCharactersData={linkedCharactersData}
              onUpdate={handleRoomUpdate}
            />

            <ActionPanel>
              <PanelTitle>Ações de Personagem</PanelTitle>
              <ActionGrid>
                {Object.keys(rollActions)
                  .filter((k) => !k.startsWith('D'))
                  .map((k) => (
                    <ActionButton
                      key={k}
                      onClick={() => executeRoll(k)}
                      disabled={isRolling}
                    >
                      {rollActions[k].label}
                    </ActionButton>
                  ))}
              </ActionGrid>

              <RollOptions>
                <OptionCheckbox>
                  <input
                    type="checkbox"
                    id="usePA"
                    checked={rollOptions.usePA}
                    onChange={(e) =>
                      setRollOptions((p) => ({ ...p, usePA: e.target.checked }))
                    }
                    disabled={isRolling || (myActiveCharacter?.pa_current || 0) < 1}
                  />
                  <label htmlFor="usePA">Gastar 1 PA (Ganho)?</label>
                </OptionCheckbox>

                {isMaster && (
                  <OptionCheckbox>
                    <input
                      type="checkbox"
                      id="isHidden"
                      checked={rollOptions.isHidden}
                      onChange={(e) =>
                        setRollOptions((p) => ({ ...p, isHidden: e.target.checked }))
                      }
                      disabled={isRolling}
                    />
                    <label htmlFor="isHidden">Ocultar dos Jogadores?</label>
                  </OptionCheckbox>
                )}
              </RollOptions>

              <PanelTitle style={{ marginTop: '2rem' }}>Rolagens Simples</PanelTitle>
              <ActionGrid style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(100px,1fr))' }}>
                {['D1', 'D2', 'D3'].map((k) => (
                  <ActionButton key={k} onClick={() => executeRoll(k)} disabled={isRolling}>
                    {rollActions[k].label}
                  </ActionButton>
                ))}
              </ActionGrid>
            </ActionPanel>

            <GameLog
              roomId={roomId}
              isMaster={isMaster}
              onDelete={handleDeleteLog}
              onToggleVisibility={handleToggleLogVisibility}
            />
          </GameArea>
        </MainContent>
      </GameRoomContainer>
    </>
  );
};
