import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import * as gameData from '../data/gameData';

const CharacterContext = createContext();

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
const hasReqItem = (arr, reqName) => (arr || []).some((i) => itemMatches(i, reqName));

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

export const CharacterProvider = ({ children, characterId }) => {
  const { currentUser } = useAuth();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [points, setPoints] = useState({ total: 12, used: 0, remaining: 12 });
  const [unmetClassReqs, setUnmetClassReqs] = useState([]);

  const debouncedUpdate = useCallback(_.debounce((id, data) => { 
    if (id) updateDoc(doc(db, 'characters', id), data); 
  }, 800), []);

  // Carregamento do personagem
  useEffect(() => {
    if (!characterId) return;
    
    setLoading(true);
    const unsub = onSnapshot(doc(db, 'characters', characterId), (snap) => {
      if (!snap.exists()) { 
        toast.error('Ficha não encontrada.'); 
        return; 
      }
      const data = snap.data();
      if (!data.viewers?.includes(currentUser.uid)) { 
        toast.error('Sem permissão para ver esta ficha.'); 
        return; 
      }
      setCharacter({ id: snap.id, ...data });
      setLoading(false);
    });
    return () => unsub();
  }, [characterId, currentUser.uid]);

  // Cálculo de pontos
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

  // Recursos calculados
  const resources = useMemo(() => {
    if (!character) return { pv: 1, pm: 1, pa: 1 };
    const { poder = 0, habilidade = 0, resistencia = 0 } = character.attributes || {};
    return {
      pa: poder || 1,
      pm: habilidade > 0 ? habilidade * 5 : 1,
      pv: resistencia > 0 ? resistencia * 5 : 1
    };
  }, [character]);

  // Itens bloqueados
  const lockedItems = useMemo(() => {
    if (!character) return new Set();
    const locked = new Set();
    (character.archetype?.vantagensGratuitas || []).forEach(name => locked.add(name));
    (character.kits || []).forEach(kit => {
      (kit.vantagensGratuitas || []).forEach(name => locked.add(name));
      (kit.exigencias || []).forEach(req => {
        if (['vantagem', 'pericia', 'desvantagem'].includes(req.tipo)) {
          locked.add(req.nome);
        } else if (req.tipo === 'ou') {
          const foundOption = req.opcoes.find(opt => hasReqItem(character[opt.tipo === 'pericia' ? 'skills' : (opt.tipo === 'vantagem' ? 'advantages' : 'disadvantages')], opt.nome));
          if (foundOption) {
            locked.add(foundOption.nome);
          }
        }
      });
    });
    return locked;
  }, [character]);

  // Contagem de itens
  const itemCounts = useMemo(() => {
    if (!character) return {};
    const counts = {};
    const allItems = [
      ...(character.skills || []),
      ...(character.advantages || []),
      ...(character.disadvantages || [])
    ];
    allItems.forEach(item => {
      counts[item.nome] = (counts[item.nome] || 0) + 1;
    });
    return counts;
  }, [character]);

  // Função principal de atualização
  const updateCharacter = (patch) => {
    setCharacter((prev) => {
      const next = { ...prev, ...patch };
      debouncedUpdate(prev.id, patch);
      return next;
    });
  };

  // Mudança de atributos
  const handleAttributeChange = (attr, val) => {
    updateCharacter({ 
      attributes: { 
        ...character.attributes, 
        [attr]: Math.max(0, Math.min(5, val)) 
      } 
    });
  };

  // Mudança de recursos
  const handleResourceChange = (key, val) => {
    updateCharacter({ [key]: val });
  };

  // Adicionar item
  const addItem = (list, item, sub = null) => {
    if (character[list]?.some((i) => i.nome === item.nome && !item.repetivel)) {
      toast.error(`${item.nome} já foi adicionado(a).`);
      return;
    }
    updateCharacter({
      [list]: [...(character[list] || []), { ...item, id: uuidv4(), subOption: sub }]
    });
  };

  // Remover item
  const removeItem = (list, id) => {
    const tgt = character[list].find((i) => i.id === id);
    if (!tgt) return;

    if (tgt.fromArchetype) {
      toast.error('Escolha obrigatória do Arquétipo não pode ser removida.');
      return;
    }

    if (lockedItems.has(tgt.nome)) {
      toast.error('Item obrigatório por um Kit não pode ser removido.');
      return;
    }

    updateCharacter({ 
      [list]: character[list].filter((i) => i.id !== id) 
    });
  };

  // Mudança de arquétipo
  const handleArchetypeChange = (e) => {
    const nome = e.target.value;
    const novo = gameData.arquetipos.find((a) => a.nome === nome) || null;
    const adv = (character.advantages || []).filter((v) => !v.fromArchetype);
    
    novo?.vantagensGratuitas?.forEach((vNome) => {
      if (!hasItem(adv, vNome)) {
        const v = findAdv(vNome);
        if (v) adv.push({ ...v, id: uuidv4(), fromArchetype: true });
      }
    });
    
    updateCharacter({
      archetype: novo,
      archetypeChoices: {},
      advantages: adv
    });
  };

  // Fazer escolha de arquétipo
  const handleMakeChoice = (choice, chosenItem, subOption = null) => {
    const newItem = { ...chosenItem, id: uuidv4(), subOption: subOption, fromArchetype: true };
    const listToUpdate = choice.tipo === 'vantagem' ? 'advantages' : 'disadvantages';
    const updates = {
      archetypeChoices: { ...character.archetypeChoices, [choice.id]: newItem },
      [listToUpdate]: [...(character[listToUpdate] || []), newItem]
    };
    updateCharacter(updates);
    toast.success(`${newItem.nome}${subOption ? ` (${subOption})` : ''} definido como escolha de arquétipo!`);
  };

  // Adicionar kit
  const handleAddKit = (kitName) => {
    if (!kitName) return;
    const kit = gameData.classes.find((c) => c.nome === kitName);
    if (!kit) return;
    
    const unmet = unmetReqsForClass(character, kit);
    if (unmet.length > 0) {
      setUnmetClassReqs(unmet);
      toast.error('Kit indisponível — veja os requisitos pendentes.');
      return;
    }
    
    const newAdvantages = [...(character.advantages || [])];
    kit.vantagensGratuitas?.forEach((vNome) => {
      if (!hasItem(newAdvantages, vNome)) {
        const v = findAdv(vNome);
        if (v) newAdvantages.push({ ...v, id: uuidv4(), fromClass: true, fromKit: kit.nome });
      }
    });
    
    setUnmetClassReqs([]);
    updateCharacter({
      kits: [...(character.kits || []), kit],
      advantages: newAdvantages
    });
    toast.success(`Kit "${kit.nome}" adicionado!`);
  };

  // Remover kit
  const handleRemoveKit = (kitName) => {
    const newKits = (character.kits || []).filter(k => k.nome !== kitName);
    const newAdvantages = (character.advantages || []).filter(adv => !(adv.fromKit === kitName));
    updateCharacter({
      kits: newKits,
      advantages: newAdvantages
    });
    toast.success(`Kit "${kitName}" removido.`);
  };

  // Verificar requisitos de técnica
  const checkTechniqueRequirements = useCallback((technique) => {
    if (!technique.requisito) return { meets: true, unmet: [] };

    const requirements = technique.requisito.split(/, | e /);
    const allCharItems = [
      ...(character.skills || []),
      ...(character.advantages || []),
      ...(character.techniques || [])
    ];

    const unmetReqs = [];

    requirements.forEach(req => {
      const reqLower = req.toLowerCase();

      const attrMatch = reqLower.match(/(poder|habilidade|resistencia) (\d+)/);
      if (attrMatch) {
        const [, attr, value] = attrMatch;
        if ((character.attributes[attr] || 0) < parseInt(value, 10)) {
          unmetReqs.push(req);
        }
        return;
      }

      if (!allCharItems.some(item => item.nome.toLowerCase() === reqLower)) {
        unmetReqs.push(req);
      }
    });

    return { meets: unmetReqs.length === 0, unmet: unmetReqs };
  }, [character]);

  // Adicionar técnica
  const handleAddTechnique = (technique, variation) => {
    const currentTechniques = character.techniques || [];
    const variationName = variation ? variation.nome : null;

    const isDuplicate = currentTechniques.some(
      (t) => t.nome === technique.nome && t.subOption === variationName
    );

    if (isDuplicate) {
      toast.error(`Você já possui a técnica "${technique.nome}${variationName ? `: ${variationName}` : ''}".`);
      return;
    }

    const techniqueData = {
      ...technique,
      id: uuidv4(),
      subOption: variationName,
      descricao: variation ? variation.descricao : technique.descricao,
    };
    delete techniqueData.variacoes;

    const newTechniques = [...currentTechniques, techniqueData];
    updateCharacter({ techniques: newTechniques });
    toast.success(`Técnica "${technique.nome}" adicionada!`);
  };

  // Remover técnica
  const handleRemoveTechnique = (techniqueId) => {
    const newTechniques = (character.techniques || []).filter(t => t.id !== techniqueId);
    updateCharacter({ techniques: newTechniques });
  };

  // Consumir item
  const handleConsume = (itemName) => {
    const inventory = [...(character.inventory || [])];
    const itemIndex = inventory.findIndex(i => i.name === itemName && i.quantity > 0);
    if (itemIndex === -1) {
      toast.error(`Você não tem mais "${itemName}".`);
      return;
    }
    const updates = {};
    let toastMessage = `"${itemName}" consumido.`;
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
    inventory[itemIndex].quantity -= 1;
    updates.inventory = inventory.filter(i => i.quantity > 0);
    updateCharacter(updates);
    toast.success(toastMessage);
  };

  const value = {
    // Estado
    character,
    loading,
    isEditing,
    setIsEditing,
    points,
    resources,
    lockedItems,
    itemCounts,
    unmetClassReqs,
    setUnmetClassReqs,
    
    // Funções
    updateCharacter,
    handleAttributeChange,
    handleResourceChange,
    addItem,
    removeItem,
    handleArchetypeChange,
    handleMakeChoice,
    handleAddKit,
    handleRemoveKit,
    checkTechniqueRequirements,
    handleAddTechnique,
    handleRemoveTechnique,
    handleConsume
  };

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = () => {
  const context = useContext(CharacterContext);
  if (context === undefined) {
    throw new Error('useCharacter deve ser usado dentro de um CharacterProvider');
  }
  return context;
};

