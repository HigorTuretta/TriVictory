import React, { useCallback, useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import toast, { Toaster } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

// Telas
import { CharacterSelect } from './screens/CharacterSelect';
import { CharacterSheet } from './screens/CharacterSheet';
import { ArchetypeCreator } from './screens/ArchetypeCreator';

// Dados Padrão do Jogo
import { pericias, vantagens, desvantagens, arquetipos } from './data/gameData';

function App() {
  const [view, setView] = useState('select'); // 'select', 'sheet', 'creator'
  
  const [characters, setCharacters] = useLocalStorage('3det_characters_v7', {});
  const [activeCharacterId, setActiveCharacterId] = useLocalStorage('3det_active_char_v7', null);

  // Armazenamento para itens customizados
  const [customSkills, setCustomSkills] = useLocalStorage('3det_custom_skills', []);
  const [customAdvantages, setCustomAdvantages] = useLocalStorage('3det_custom_advantages', []);
  const [customDisadvantages, setCustomDisadvantages] = useLocalStorage('3det_custom_disadvantages', []);
  const [customArchetypes, setCustomArchetypes] = useLocalStorage('3det_custom_archetypes', []);

 const handleNewCharacter = (basePoints) => {
    const newId = uuidv4();
    const newChar = {
      id: newId,
      name: 'Novo Herói',
      backstory: '',
      notes: '',
      isDead: false,
      money: { 
          amount: 0,
          type: { nome: 'Moedas de Ouro', sigla: 'MO' }
      },
      basePoints: parseInt(basePoints, 10) || 12,
      level: 0,
      xp: { current: 0, target: 100, system: 'unit' },
      inventorySettings: { system: 'attribute', attribute: 'poder', multiplier: 10, fixedMax: 50 },
      archetype: null,
      archetypeChoices: {},
      attributes: { poder: 0, habilidade: 0, resistencia: 0 },
      pv_current: 1, 
      pm_current: 1,
      pa_current: 1,
      skills: [],
      advantages: [],
      disadvantages: [],
      inventory: [],
    };
    setCharacters(prev => ({ ...prev, [newId]: newChar }));
    setActiveCharacterId(newId);
    setView('sheet');
  };

  const handleDeleteCharacter = (id) => {
    const characterName = characters[id]?.name || 'Personagem';
    const newCharacters = { ...characters };
    delete newCharacters[id];
    setCharacters(newCharacters);
    toast.success(`Ficha de "${characterName}" deletada com sucesso!`);
    if (activeCharacterId === id) {
      setActiveCharacterId(null);
      setView('select');
    }
  };

  const handleUpdateCharacter = useCallback((updatedChar) => {
    setCharacters(prev => ({ ...prev, [updatedChar.id]: updatedChar }));
  }, [setCharacters]);

  const addCustomItem = useCallback((type, item) => {
    const newItem = { ...item, id: uuidv4(), custom: true };
    if (type === 'pericias') setCustomSkills(prev => [...prev, newItem]);
    if (type === 'vantagens') setCustomAdvantages(prev => [...prev, newItem]);
    if (type === 'desvantagens') setCustomDisadvantages(prev => [...prev, newItem]);
    if (type === 'arquetipos') setCustomArchetypes(prev => [...prev, newItem]);
  }, [setCustomSkills, setCustomAdvantages, setCustomDisadvantages, setCustomArchetypes]);

  const updateCustomItem = useCallback((type, updatedItem) => {
    const updater = (prev) => prev.map(item => item.id === updatedItem.id ? updatedItem : item);
    if (type === 'pericias') setCustomSkills(updater);
    if (type === 'vantagens') setCustomAdvantages(updater);
    if (type === 'desvantagens') setCustomDisadvantages(updater);
    if (type === 'arquetipos') setCustomArchetypes(updater);
  }, [setCustomSkills, setCustomAdvantages, setCustomDisadvantages, setCustomArchetypes]);
  
  const deleteCustomItem = useCallback((type, itemId) => {
    const updater = (prev) => prev.filter(item => item.id !== itemId);
    if (type === 'pericias') setCustomSkills(updater);
    if (type === 'vantagens') setCustomAdvantages(updater);
    if (type === 'desvantagens') setCustomDisadvantages(updater);
    if (type === 'arquetipos') setCustomArchetypes(updater);
  }, [setCustomSkills, setCustomAdvantages, setCustomDisadvantages, setCustomArchetypes]);

  const handleSelectCharacter = (id) => {
    setActiveCharacterId(id);
    setView('sheet');
  }

  const handleExitSheet = () => {
    setActiveCharacterId(null);
    setView('select');
  }
  
  const activeCharacter = characters[activeCharacterId];

  // Combina os dados padrão com os customizados para serem passados aos componentes filhos
  const allData = {
    pericias: [...pericias, ...customSkills],
    vantagens: [...vantagens, ...customAdvantages],
    desvantagens: [...desvantagens, ...customDisadvantages],
    arquetipos: [...arquetipos, ...customArchetypes],
  };

  const renderView = () => {
    switch(view) {
      case 'sheet':
        return activeCharacter ? (
          <CharacterSheet
            key={activeCharacterId}
            characterData={activeCharacter}
            gameData={allData}
            onUpdate={handleUpdateCharacter}
            onExit={handleExitSheet}
            onAddCustomItem={addCustomItem}
            onUpdateCustomItem={updateCustomItem}
            onDeleteCustomItem={deleteCustomItem}
            goToArchetypeCreator={() => setView('creator')}
          />
        ) : setView('select');
      
      case 'creator':
        return (
          <ArchetypeCreator
            gameData={allData}
            onSave={(newArchetype) => {
              addCustomItem('arquetipos', newArchetype);
              setView('sheet');
            }}
            onExit={() => setView('sheet')}
          />
        );

      case 'select':
      default:
        return (
          <CharacterSelect
            characters={Object.values(characters)}
            onSelectCharacter={handleSelectCharacter}
            onNewCharacter={handleNewCharacter}
            onDeleteCharacter={handleDeleteCharacter}
          />
        );
    }
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { background: 'var(--color-surface)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' },
        }}
      />
      {renderView()}
    </>
  );
}

export default App;