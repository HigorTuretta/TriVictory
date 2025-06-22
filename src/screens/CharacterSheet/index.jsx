/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../contexts/AuthContext';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { FaHeartbeat, FaPencilAlt, FaSave, FaSkull } from 'react-icons/fa';
import Lottie from 'lottie-react';

// Componentes Filhos
import { CharacterSheetHeader } from '../../components/CharacterSheetHeader';
import { SheetLeftColumn } from '../../components/SheetLeftColumn';
import { SheetRightColumn } from '../../components/SheetRightColumn';
import { SheetFooter } from '../../components/SheetFooter';
import { AttributeDisplay } from '../../components/AttributeDisplay';
import { ConfirmModal } from '../../components/ConfirmModal';
import { Modal } from '../../components/Modal';

// Dados e Estilos
import deathAnimation from '../../assets/lotties/deathAnimation.json';
import * as gameData from '../../data/gameData';
import {
  SheetContainer,
  Section,
  SectionTitle,
  BackButton,
  HeaderPanel,
  SheetLayoutGrid,
  DeathButton,
  DeathAnimationOverlay,
  FloatingActionButton,
  ChoiceButton
} from './styles';

// Helpers
const hasItem = (list = [], name) => list.some((i) => i.nome === name);
const findAdv = (n) => gameData.vantagens.find((a) => a.nome === n);
const itemMatches = (item, reqName) => {
  if (item.nome === reqName) return true;
  if (item.subOption) {
    const full = `${item.nome} ${item.subOption}`.replace(/\s+/g, ' ').trim();
    return full === reqName;
  }
  return false;
};
const hasReqItem = (arr, reqName) => arr.some((i) => itemMatches(i, reqName));
const checkReq = (char, req) => {
  switch (req.tipo) {
    case 'pericia': return hasReqItem(char.skills, req.nome);
    case 'vantagem': return hasReqItem(char.advantages, req.nome);
    case 'desvantagem': return hasReqItem(char.disadvantages, req.nome);
    case 'ou': return req.opcoes.some((r) => checkReq(char, r));
    default: return true;
  }
};
const unmetReqsForClass = (char, kit) => {
  const list = [];
  const walk = (req) => {
    if (checkReq(char, req)) return;
    if (req.tipo === 'ou') req.opcoes.forEach(walk);
    else list.push(req);
  };
  kit?.exigencias?.forEach(walk);
  return list;
};

// Componente Principal
const noop = () => { };

export const CharacterSheet = ({
  goToArchetypeCreator = noop,
  goToClassCreator = noop,
  onAddCustomItem = noop,
  onUpdateCustomItem = noop,
  onDeleteCustomItem = noop
}) => {
  const { characterId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(location.state?.isNew || false);
  const [isBackstoryVisible, setIsBackstoryVisible] = useState(false);
  const [points, setPoints] = useState({ total: 10, used: 0, remaining: 10 });
  const [unmetClassReqs, setUnmetClassReqs] = useState([]);
  const [confirmDeathModal, setConfirmDeathModal] = useState(false);
  const [confirmResModal, setConfirmResModal] = useState(false);
  const [choiceModal, setChoiceModal] = useState(null);

  const debouncedUpdate = useCallback(_.debounce((id, data) => { if (id) updateDoc(doc(db, 'characters', id), data); }, 800), []);

  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(doc(db, 'characters', characterId), (snap) => {
      if (!snap.exists()) { toast.error('Ficha não encontrada.'); navigate('/'); return; }
      const data = snap.data();
      if (!data.viewers?.includes(currentUser.uid)) { toast.error('Sem permissão para ver esta ficha.'); navigate('/'); return; }
      setCharacter({ id: snap.id, ...data });
      setLoading(false);
    });
    return () => unsub();
  }, [characterId, currentUser.uid, navigate]);

  useEffect(() => {
    if (!character) return;
    const { attributes = {}, skills = [], advantages = [], disadvantages = [], archetype, kits = [], basePoints = 12 } = character;
    const attrCost = Object.values(attributes).reduce((s, v) => s + v, 0);
    const skillCost = skills.reduce((s, p) => s + p.custo, 0);
    const advCost = advantages.filter((v) => !v.fromArchetype && !v.fromClass).reduce((s, v) => s + v.custo, 0);
    const disBonus = disadvantages.filter((d) => !d.fromArchetype && !d.fromClass).reduce((s, d) => s + d.custo, 0);
    const kitCost = kits.reduce((total, kit, index) => total + (index + 1), 0);
    const used = attrCost + skillCost + advCost + (archetype?.custo || 0) + kitCost;
    const total = basePoints - disBonus;
    setPoints({ total, used, remaining: total - used });
  }, [character]);

  const resources = useMemo(() => {
    if (!character) return { pv: 1, pm: 1, pa: 1 };
    const { poder = 0, habilidade = 0, resistencia = 0 } = character.attributes || {};
    return {
      pa: poder || 1,
      pm: habilidade > 0 ? habilidade * 5 : 1,
      pv: resistencia > 0 ? resistencia * 5 : 1
    };
  }, [character]);

  const disabledItems = useMemo(() => {
    if (!character) return [];
    const kitReqs = character.kits?.flatMap(k => k.exigencias || []) || [];
    const kitFreebies = character.kits?.flatMap(k => k.vantagensGratuitas || []) || [];
    return [
      ...(character.archetype?.vantagensGratuitas || []),
      ...kitFreebies,
      ...kitReqs.filter((r) => ['vantagem', 'pericia', 'desvantagem'].includes(r.tipo)).map((r) => r.nome)
    ];
  }, [character]);

  const handleUpdate = (patch) => {
    setCharacter((prev) => {
      const next = { ...prev, ...patch };
      debouncedUpdate(prev.id, patch);
      return next;
    });
  };

  const handleConsume = (itemName) => {
    const inventory = [...(character.inventory || [])];
    const itemIndex = inventory.findIndex(i => i.name === itemName && i.quantity > 0);

    if (itemIndex === -1) {
      toast.error(`Você não tem mais "${itemName}".`);
      return;
    }

    const updates = {};
    let toastMessage = `"${itemName}" consumido.`;

    // 1. APLICA O EFEITO NO OBJETO DE ATUALIZAÇÃO
    switch (itemName) {
      case 'Cura menor':
        updates.pv_current = Math.min(resources.pv, (character.pv_current || 0) + 5);
        toastMessage += " +5 PV recuperados.";
        break;
      case 'Cura maior':
        updates.pv_current = Math.min(resources.pv, (character.pv_current || 0) + 10);
        toastMessage += " +10 PV recuperados.";
        break;
      case 'Energia menor':
        updates.pm_current = Math.min(resources.pm, (character.pm_current || 0) + 5);
        toastMessage += " +5 PM recuperados.";
        break;
      case 'Energia maior':
        updates.pm_current = Math.min(resources.pm, (character.pm_current || 0) + 10);
        toastMessage += " +10 PM recuperados.";
        break;
      case 'Adrenalina menor':
        updates.pa_current = Math.min(resources.pa, (character.pa_current || 0) + 1);
        toastMessage += " +1 PA recuperado.";
        break;
    }

    // 2. ATUALIZA O INVENTÁRIO NO MESMO OBJETO DE ATUALIZAÇÃO
    inventory[itemIndex].quantity -= 1;
    updates.inventory = inventory.filter(i => i.quantity > 0);

    // 3. CHAMA handleUpdate APENAS UMA VEZ COM TODAS AS MUDANÇAS
    handleUpdate(updates);
    toast.success(toastMessage);
  };

  const handleAttributeChange = (attr, val) => { handleUpdate({ attributes: { ...character.attributes, [attr]: Math.max(0, Math.min(5, val)) } }); };
  const handleResourceChange = (key, val) => handleUpdate({ [key]: val });
  const addItem = (list, item, sub = null) => { if (character[list]?.some((i) => i.nome === item.nome && !item.repetivel)) { toast.error(`${item.nome} já foi adicionado(a).`); return; } handleUpdate({ [list]: [...(character[list] || []), { ...item, id: uuidv4(), subOption: sub }] }); onAddCustomItem(item); };
  const removeItem = (list, id) => { const tgt = character[list].find((i) => i.id === id); if (!tgt) return; const isRequiredByKit = character.kits?.some(k => k.exigencias?.some(r => itemMatches(tgt, r.nome))); if (tgt.fromArchetype || tgt.fromClass || isRequiredByKit) { toast.error('Item obrigatório pelo Arquétipo/Kit.'); return; } handleUpdate({ [list]: character[list].filter((i) => i.id !== id) }); onDeleteCustomItem(tgt); };
  const handleArchetypeChange = (e) => { const nome = e.target.value; const novo = gameData.arquetipos.find((a) => a.nome === nome) || null; const adv = (character.advantages || []).filter((v) => !v.fromArchetype); novo?.vantagensGratuitas?.forEach((vNome) => { if (!hasItem(adv, vNome)) { const v = findAdv(vNome); if (v) adv.push({ ...v, id: uuidv4(), fromArchetype: true }); } }); handleUpdate({ archetype: novo, archetypeChoices: {}, advantages: adv }); if (!novo?.escolhas) setChoiceModal(null); };
  useEffect(() => { if (!character) return; const archetype = character.archetype; if (isEditing && archetype && archetype.escolhas) { const hasPendingChoices = archetype.escolhas.some(choice => !(character.archetypeChoices && character.archetypeChoices[choice.id])); if (hasPendingChoices && !choiceModal) { const nextChoice = archetype.escolhas.find(choice => !(character.archetypeChoices && character.archetypeChoices[choice.id])); if (nextChoice) setChoiceModal(nextChoice); } } }, [character, isEditing, choiceModal]);
  const handleMakeChoice = (choice, chosenItem, subOption = null) => { const newItem = { ...chosenItem, id: uuidv4(), subOption: subOption, fromArchetype: true }; const listToUpdate = choice.tipo === 'vantagem' ? 'advantages' : 'disadvantages'; const updates = { archetypeChoices: { ...character.archetypeChoices, [choice.id]: newItem }, [listToUpdate]: [...(character[listToUpdate] || []), newItem] }; handleUpdate(updates); toast.success(`${newItem.nome}${subOption ? ` (${subOption})` : ''} definido como escolha de arquétipo!`); setChoiceModal(null); };
  const handleAddKit = (kitName) => { if (!kitName) return; const kit = gameData.classes.find((c) => c.nome === kitName); if (!kit) return; const unmet = unmetReqsForClass(character, kit); if (unmet.length > 0) { setUnmetClassReqs(unmet); toast.error('Kit indisponível — veja os requisitos pendentes.'); return; } const newAdvantages = [...(character.advantages || [])]; kit.vantagensGratuitas?.forEach((vNome) => { if (!hasItem(newAdvantages, vNome)) { const v = findAdv(vNome); if (v) newAdvantages.push({ ...v, id: uuidv4(), fromClass: true, fromKit: kit.nome }); } }); setUnmetClassReqs([]); handleUpdate({ kits: [...(character.kits || []), kit], advantages: newAdvantages }); toast.success(`Kit "${kit.nome}" adicionado!`); };
  const handleRemoveKit = (kitName) => { const newKits = (character.kits || []).filter(k => k.nome !== kitName); const newAdvantages = (character.advantages || []).filter(adv => !(adv.fromKit === kitName)); handleUpdate({ kits: newKits, advantages: newAdvantages }); toast.success(`Kit "${kitName}" removido.`); };

  if (loading || !character) { return (<div style={{ textAlign: 'center', marginTop: '5rem' }}>Carregando ficha…</div>); }
  const isOwner = currentUser.uid === character.ownerId;

  return (
    <SheetContainer $isDead={character.isDead}>
      <ConfirmModal isOpen={confirmDeathModal} onClose={() => setConfirmDeathModal(false)} onConfirm={() => { handleUpdate({ isDead: true, pv_current: 0 }); toast('Que seus feitos sejam lembrados.', { icon: '💀' }); setConfirmDeathModal(false); }} title='Confirmar Morte' message='Isso marcará o personagem como morto. Continuar?' />
      <ConfirmModal isOpen={confirmResModal} onClose={() => setConfirmResModal(false)} onConfirm={() => { handleUpdate({ isDead: false, pv_current: resources.pv }); toast.success('Milagre! Personagem ressuscitado.'); setConfirmResModal(false); }} title='Ressuscitar Personagem' message='Deseja trazer o personagem de volta à vida?' confirmButtonClass='resurrect' />
      {character.isDead && (<DeathAnimationOverlay><Lottie animationData={deathAnimation} loop /></DeathAnimationOverlay>)}
      <BackButton onClick={() => navigate(-1)}>← Voltar</BackButton>
      <CharacterSheetHeader isEditing={isEditing} isOwner={isOwner} characterName={character.name} onNameChange={(e) => handleUpdate({ name: e.target.value })} points={points} basePoints={character.basePoints || 12} isDead={character.isDead} />
      <HeaderPanel>
        <Section>
          <SectionTitle>Atributos e Recursos</SectionTitle>
          <AttributeDisplay attributes={character.attributes} resources={resources} currentResources={{ pv_current: character.pv_current, pm_current: character.pm_current, pa_current: character.pa_current }} onAttributeChange={handleAttributeChange} onResourceChange={handleResourceChange} isEditing={isEditing} isDead={character.isDead} />
        </Section>
      </HeaderPanel>
      <SheetLayoutGrid>
        <SheetLeftColumn
          character={character}
          isEditing={isEditing}
          handleUpdate={handleUpdate}
          handleArchetypeChange={handleArchetypeChange}
          goToArchetypeCreator={goToArchetypeCreator}
          onAddKit={handleAddKit}
          onRemoveKit={handleRemoveKit}
          goToClassCreator={goToClassCreator}
          unmetClassReqs={unmetClassReqs}
        />
        <SheetRightColumn
          character={character}
          isEditing={isEditing}
          handleUpdate={handleUpdate}
          onConsume={handleConsume} 
        />
      </SheetLayoutGrid>
      <SheetFooter
        isEditing={isEditing}
        character={character}
        disabledItems={disabledItems}
        gameData={gameData}
        addItem={addItem}
        removeItem={removeItem}
        isBackstoryVisible={isBackstoryVisible}
        setIsBackstoryVisible={setIsBackstoryVisible}
        handleUpdate={handleUpdate}
      />
      {isOwner && (<> <FloatingActionButton title={isEditing ? 'Salvar' : 'Editar'} onClick={() => setIsEditing((e) => !e)} disabled={character.isDead}> {isEditing ? <FaSave /> : <FaPencilAlt />} </FloatingActionButton> {!isEditing && (character.isDead ? (<DeathButton className='resurrect' onClick={() => setConfirmResModal(true)}> <FaHeartbeat /> Ressuscitar </DeathButton>) : (<DeathButton onClick={() => setConfirmDeathModal(true)}> <FaSkull /> Declarar Morte </DeathButton>))} </>)}
      {choiceModal && (<Modal isOpen={!!choiceModal} onClose={() => setChoiceModal(null)}><h3>{choiceModal.mensagem}</h3><div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>{(() => { const sourceList = choiceModal.tipo === 'desvantagem' ? gameData.desvantagens : gameData.vantagens; const itemsToShow = sourceList.filter(item => (choiceModal.listaFiltro && choiceModal.listaFiltro.includes(item.nome)) || (choiceModal.nomeFiltro && choiceModal.nomeFiltro === item.nome)); return itemsToShow.map(item => { if (item.opcoes) { return item.opcoes.map(opt => (<ChoiceButton key={opt} onClick={() => handleMakeChoice(choiceModal, item, opt)}>{item.nome}: {opt}</ChoiceButton>)); } return (<ChoiceButton key={item.nome} onClick={() => handleMakeChoice(choiceModal, item)}>Escolher {item.nome}</ChoiceButton>); }); })()}</div></Modal>)}
    </SheetContainer>
  );
};