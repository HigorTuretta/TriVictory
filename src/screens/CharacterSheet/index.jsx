import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash, FaSkull, FaHeartbeat, FaPencilAlt, FaSave } from 'react-icons/fa';
import Lottie from 'lottie-react';

// Componentes Filhos
import { PointTracker } from '../../components/PointTracker';
import { AttributeDisplay } from '../../components/AttributeDisplay';
import { SelectionGrid } from '../../components/SelectionGrid';
import { Mochila } from '../../components/Mochila';
import { FinalizedView } from '../../components/FinalizedView';
import { Modal } from '../../components/Modal';
import { LevelXPTracker } from '../../components/LevelXPTracker';
import { InventorySettings } from '../../components/InventorySettings';
import { ConfirmModal } from '../../components/ConfirmModal';
import { CustomItemModal } from '../../components/CustomItemModal';
import { MoneyTracker } from '../../components/MoneyTracker';

// Dados e Animação
import deathAnimation from '../../assets/lotties/deathAnimation.json';

// Estilos
import {
  SheetContainer,
  Header,
  CharacterNameInput,
  Section,
  SectionTitle,
  BackButton,
  FinalizedSection,
  HeaderPanel,
  SheetLayoutGrid,
  LeftColumn,
  RightColumn,
  FooterPanel,
  BackstoryTextarea,
  SectionHeader,
  VisibilityButton,
  NotesTextarea,
  AddArchetypeButton,
  DeathButton,
  DeathAnimationOverlay,
  FloatingActionButton,
  ChoiceButton,
  ArchetypeSelect,
  ArchetypeInfo,
  ArchetypePower,
  ArchetypeChoiceInfo,
} from './styles';

// Sub-componente para seção de Arquétipo
const ArchetypeSection = ({
  character,
  gameData,
  isEditing,
  handleArchetypeChange,
  goToArchetypeCreator,
}) => (
  <Section>
    <SectionTitle>Arquétipo</SectionTitle>
    {isEditing ? (
      <>
        <ArchetypeSelect
          value={character.archetype?.nome || ''}
          onChange={handleArchetypeChange}
          disabled={character.isDead}
        >
          <option value=''>Nenhum (Humano)</option>
          {gameData.arquetipos.map((a) => (
            <option key={a.id || a.nome} value={a.nome}>
              {a.nome} ({a.custo}pt)
            </option>
          ))}
        </ArchetypeSelect>
        <AddArchetypeButton onClick={goToArchetypeCreator} disabled={character.isDead}>
          + Criar Arquétipo Customizado
        </AddArchetypeButton>
      </>
    ) : (
      <p style={{ fontSize: '1.2rem', fontWeight: 500 }}>
        {character.archetype?.nome || 'Humano'}
      </p>
    )}
    {character.archetype && (
      <ArchetypeInfo>
        {character.archetype.poderes.map((poder, i) => (
          <ArchetypePower key={i}>{poder}</ArchetypePower>
        ))}
      </ArchetypeInfo>
    )}
    {character.archetypeChoices && Object.keys(character.archetypeChoices).length > 0 && (
      <ArchetypeChoiceInfo>
        <strong>Escolhas de Arquétipo:</strong>
        {Object.values(character.archetypeChoices).map((choice) => (
          <span key={choice.id}>
            {choice.nome} {choice.subOption && `(${choice.subOption})`}
          </span>
        ))}
      </ArchetypeChoiceInfo>
    )}
  </Section>
);

export const CharacterSheet = ({
  characterData,
  gameData,
  onUpdate,
  onExit,
  onAddCustomItem,
  onUpdateCustomItem,
  onDeleteCustomItem,
  goToArchetypeCreator,
}) => {
  const [character, setCharacter] = useState(characterData);

  const [isEditing, setIsEditing] = useState(
    () => !characterData.level && Object.values(characterData.attributes).every((v) => v === 0),
  );

  const [isBackstoryVisible, setIsBackstoryVisible] = useState(true);
  const [points, setPoints] = useState({ total: 12, used: 0, remaining: 12 });
  const [choiceModal, setChoiceModal] = useState(null);
  const [confirmDeathModal, setConfirmDeathModal] = useState(false);
  const [confirmResurrectionModal, setConfirmResurrectionModal] = useState(false);

  useEffect(() => {
    onUpdate(character);
  }, [character, onUpdate]);

  useEffect(() => {
    const { attributes, archetype, skills, advantages, disadvantages, basePoints } = character;
    const totalBasePoints = basePoints || 12;

    const attrPoints = Object.values(attributes).reduce((sum, val) => sum + val, 0);
    const archetypeCost = archetype?.custo ?? 0;
    const skillsCost = (skills || []).reduce((sum, skill) => sum + skill.custo, 0);
    const advantagesCost = (advantages || [])
      .filter((v) => !v.fromArchetype)
      .reduce((sum, adv) => sum + adv.custo, 0);
    const disadvantagesBonus = (disadvantages || [])
      .filter((d) => !d.fromArchetype)
      .reduce((sum, dis) => sum + dis.custo, 0);

    const used = attrPoints + archetypeCost + skillsCost + advantagesCost;
    const totalWithDisadvantages = totalBasePoints - disadvantagesBonus;
    setPoints({ total: totalWithDisadvantages, used, remaining: totalWithDisadvantages - used });
  }, [character]);

  useEffect(() => {
    const archetype = character.archetype;
    if (isEditing && archetype && archetype.escolhas) {
      const hasPendingChoices = archetype.escolhas.some(
        (choice) => !(character.archetypeChoices && character.archetypeChoices[choice.id]),
      );
      if (hasPendingChoices && !choiceModal) {
        const nextChoice = archetype.escolhas.find(
          (choice) => !(character.archetypeChoices && character.archetypeChoices[choice.id]),
        );
        if (nextChoice) {
          setChoiceModal(nextChoice);
        }
      }
    }
  }, [character, isEditing, choiceModal]);

  useEffect(() => {
    if (isEditing) {
      const newMaxPv = (character.attributes.resistencia || 0) * 5 || 1;
      const newMaxPm = (character.attributes.habilidade || 0) * 5 || 1;
      const newMaxPa = character.attributes.poder || 1;
      const updates = {};
      if ((character.pv_current || 0) > newMaxPv || character.pv_current === undefined)
        updates.pv_current = newMaxPv;
      if ((character.pm_current || 0) > newMaxPm || character.pm_current === undefined)
        updates.pm_current = newMaxPm;
      if ((character.pa_current || 0) > newMaxPa || character.pa_current === undefined)
        updates.pa_current = newMaxPa;
      if (Object.keys(updates).length > 0) {
        setCharacter((prev) => ({ ...prev, ...updates }));
      }
    }
  }, [character.attributes, isEditing]);

  const handleUpdate = (update) => {
    setCharacter((prev) => ({ ...prev, ...update }));
  };

  const handleResourceChange = (resource, value) => {
    setCharacter((prev) => ({ ...prev, [resource]: value }));
  };

  const handleAttributeChange = (attr, value) => {
    const newValue = Math.max(0, Math.min(5, value));
    setCharacter((prev) => ({ ...prev, attributes: { ...prev.attributes, [attr]: newValue } }));
  };

  const handleArchetypeChange = (e) => {
    const newArchetypeName = e.target.value;
    const newArchetype = gameData.arquetipos.find((a) => a.nome === newArchetypeName) || null;
    let advantagesList = (character.advantages || []).filter((adv) => !adv.fromArchetype);
    if (newArchetype?.vantagensGratuitas) {
      newArchetype.vantagensGratuitas.forEach((vantagemNome) => {
        const vantagemData = gameData.vantagens.find((v) => v.nome === vantagemNome);
        if (vantagemData) {
          advantagesList.push({ ...vantagemData, id: uuidv4(), fromArchetype: true });
        }
      });
    }
    setCharacter((prev) => ({
      ...prev,
      archetype: newArchetype,
      archetypeChoices: {},
      advantages: advantagesList,
    }));
    if (!newArchetype) setChoiceModal(null);
  };

  const handleMakeChoice = (choice, chosenItem, subOption = null) => {
    const newItem = { ...chosenItem, id: uuidv4(), subOption: subOption, fromArchetype: true };
    const listToUpdate = choice.tipo === 'vantagem' ? 'advantages' : 'disadvantages';
    setCharacter((prev) => ({
      ...prev,
      archetypeChoices: { ...prev.archetypeChoices, [choice.id]: newItem },
      [listToUpdate]: [...(prev[listToUpdate] || []), newItem],
    }));
    toast.success(
      `${newItem.nome}${subOption ? ` (${subOption})` : ''} definido como escolha de arquétipo!`,
    );
    setChoiceModal(null);
  };

  const addItem = (listName, item, subOption = null) => {
    setCharacter((prev) => {
      if ((prev[listName] || []).some((i) => i.nome === item.nome && !item.repetivel)) {
        toast.error(`${item.nome} já foi adicionado(a).`);
        return prev;
      }
      const newItem = { ...item, id: uuidv4(), subOption: subOption };
      const currentList = prev[listName] || [];
      if (listName === 'disadvantages') {
        const currentBonus = currentList
          .filter((d) => !d.fromArchetype)
          .reduce((sum, dis) => sum + dis.custo, 0);
        if (currentBonus + item.custo < -2) {
          toast.error('Você pode ter no máximo -2 pontos em desvantagens normais.');
          return prev;
        }
      }
      toast.success(`${item.nome} adicionado(a)!`);
      return { ...prev, [listName]: [...currentList, newItem] };
    });
  };

  const removeItem = (listName, itemId) => {
    setCharacter((prev) => {
      const itemRemoved = prev[listName].find((i) => i.id === itemId);
      if (itemRemoved.fromArchetype) {
        toast.error('Itens do arquétipo não podem ser removidos.');
        return prev;
      }
      toast.success(`${itemRemoved.nome} removido(a).`);
      return { ...prev, [listName]: prev[listName].filter((i) => i.id !== itemId) };
    });
  };

  const handleDeathConfirm = () => {
    handleUpdate({ isDead: true, pv_current: 0 });
    toast('Que seus feitos sejam lembrados.', { icon: '💀' });
    setConfirmDeathModal(false);
  };

  const handleResurrectionConfirm = () => {
    const maxPv = (character.attributes.resistencia || 0) * 5 || 1;
    handleUpdate({ isDead: false, pv_current: maxPv });
    toast.success(`Por um milagre, ${character.name} retorna à vida!`);
    setConfirmResurrectionModal(false);
  };

  if (!character) return <div>Carregando...</div>;

  const { poder, habilidade, resistencia } = character.attributes;
  const resources = {
    pa: poder > 0 ? poder : 1,
    pm: habilidade > 0 ? habilidade * 5 : 1,
    pv: resistencia > 0 ? resistencia * 5 : 1,
  };

  const inventorySettings =
    character.inventorySettings || { system: 'attribute', attribute: 'poder', multiplier: 10, fixedMax: 50 };
  const totalWeight = (character.inventory || []).reduce(
    (sum, item) => sum + (item.weight || 0) * (item.quantity || 1),
    0,
  );
  const carryingCapacity =
    inventorySettings.system === 'fixed'
      ? inventorySettings.fixedMax
      : (character.attributes[inventorySettings.attribute] || 0) * inventorySettings.multiplier || 5;

  const disabledItems = [
    ...Object.values(character.archetypeChoices || {}).map((c) => c.nome),
    ...(character.archetype?.vantagensGratuitas || []),
  ];

  return (
    <SheetContainer $isDead={character.isDead}>
      <ConfirmModal
        isOpen={confirmDeathModal}
        onClose={() => setConfirmDeathModal(false)}
        onConfirm={handleDeathConfirm}
        title='Confirmar Morte do Personagem'
        message='Esta ação marcará o personagem como morto e irá desabilitar a maioria das interações. Tem certeza?'
      />
      <ConfirmModal
        isOpen={confirmResurrectionModal}
        onClose={() => setConfirmResurrectionModal(false)}
        onConfirm={handleResurrectionConfirm}
        title='Ressuscitar Personagem'
        message={`Deseja trazer ${character.name} de volta à vida? Seus Pontos de Vida serão totalmente restaurados.`}
        confirmButtonClass='resurrect'
      />

      {character.isDead && (
        <DeathAnimationOverlay>
          <Lottie animationData={deathAnimation} loop={true} />
        </DeathAnimationOverlay>
      )}
      {choiceModal && (
        <Modal isOpen={!!choiceModal} onClose={() => setChoiceModal(null)}>
          <h3>{choiceModal.mensagem}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
            {(() => {
              const sourceList =
                choiceModal.tipo === 'desvantagem' ? gameData.desvantagens : gameData.vantagens;
              const itemsToShow = sourceList.filter(
                (item) =>
                  (choiceModal.listaFiltro && choiceModal.listaFiltro.includes(item.nome)) ||
                  (choiceModal.nomeFiltro && choiceModal.nomeFiltro === item.nome),
              );
              return itemsToShow.map((item) => {
                if (item.opcoes) {
                  return item.opcoes.map((opt) => (
                    <ChoiceButton
                      key={opt}
                      onClick={() => handleMakeChoice(choiceModal, item, opt)}
                    >
                      {item.nome}: {opt}
                    </ChoiceButton>
                  ));
                }
                return (
                  <ChoiceButton key={item.nome} onClick={() => handleMakeChoice(choiceModal, item)}>
                    Escolher {item.nome}
                  </ChoiceButton>
                );
              });
            })()}
          </div>
        </Modal>
      )}

      <BackButton onClick={onExit}>← Voltar para Seleção</BackButton>

      <Header>
        <CharacterNameInput
          type='text'
          value={character.name}
          onChange={(e) => handleUpdate({ name: e.target.value })}
          placeholder='Nome do Personagem'
          disabled={character.isDead}
        />
        <PointTracker points={points} basePoints={character.basePoints || 12} />
      </Header>

      <HeaderPanel>
        <Section>
          <AttributeDisplay
            attributes={character.attributes}
            resources={resources}
            currentResources={{
              pv_current: character.pv_current,
              pm_current: character.pm_current,
              pa_current: character.pa_current,
            }}
            onAttributeChange={handleAttributeChange}
            onResourceChange={handleResourceChange}
            isEditing={isEditing}
            isDead={character.isDead}
          />
        </Section>
      </HeaderPanel>

      <SheetLayoutGrid>
        <LeftColumn>
          <Section>
            <SectionTitle>Dinheiro</SectionTitle>
            <MoneyTracker
              money={
                character.money || { amount: 0, type: { nome: 'Moedas de Ouro', sigla: 'MO' } }
              }
              onUpdate={(newMoney) => handleUpdate({ money: newMoney })}
              isEditing={isEditing}
              isDead={character.isDead}
            />
          </Section>
          <Section>
            <SectionTitle>Level e XP</SectionTitle>
            <LevelXPTracker
              level={character.level}
              xp={character.xp}
              isEditing={isEditing}
              onUpdate={handleUpdate}
              isDead={character.isDead}
            />
          </Section>
          <ArchetypeSection
            character={character}
            gameData={gameData}
            isEditing={isEditing}
            handleArchetypeChange={handleArchetypeChange}
            goToArchetypeCreator={goToArchetypeCreator}
          />
          <Section>
            <NotesTextarea
              placeholder='Anote informações da sessão, nomes de NPCs, pistas importantes...'
              value={character.notes || ''}
              onChange={(e) => handleUpdate({ notes: e.target.value })}
              disabled={character.isDead}
            />
          </Section>
        </LeftColumn>

        <RightColumn>
          <Section style={{ height: '100%' }}>
            <SectionTitle>Mochila</SectionTitle>
            {isEditing && (
              <InventorySettings
                settings={inventorySettings}
                onUpdate={(newSettings) => handleUpdate({ inventorySettings: newSettings })}
              />
            )}
            <Mochila
              items={character.inventory || []}
              onUpdate={(inv) => handleUpdate({ inventory: inv })}
              capacity={carryingCapacity}
              totalWeight={totalWeight}
              isDead={character.isDead}
            />
          </Section>
        </RightColumn>
      </SheetLayoutGrid>

      <FooterPanel>
        {isEditing ? (
          <>
            <FinalizedSection>
              <SectionTitle>Perícias</SectionTitle>
              <SelectionGrid
                items={gameData.pericias}
                selectedItems={character.skills || []}
                disabledItems={disabledItems}
                onAddItem={(item, sub) => addItem('skills', item, sub)}
                onRemoveItem={(id) => removeItem('skills', id)}
                listName='Perícias'
                onAddCustomItem={onAddCustomItem}
                onUpdateCustomItem={onUpdateCustomItem}
                onDeleteCustomItem={onDeleteCustomItem}
              />
            </FinalizedSection>
            <FinalizedSection>
              <SectionTitle>Vantagens</SectionTitle>
              <SelectionGrid
                items={gameData.vantagens}
                selectedItems={character.advantages || []}
                disabledItems={disabledItems}
                onAddItem={(item, sub) => addItem('advantages', item, sub)}
                onRemoveItem={(id) => removeItem('advantages', id)}
                listName='Vantagens'
                onAddCustomItem={onAddCustomItem}
                onUpdateCustomItem={onUpdateCustomItem}
                onDeleteCustomItem={onDeleteCustomItem}
              />
            </FinalizedSection>
            <FinalizedSection>
              <SectionTitle>Desvantagens</SectionTitle>
              <SelectionGrid
                items={gameData.desvantagens}
                selectedItems={character.disadvantages || []}
                disabledItems={disabledItems}
                onAddItem={(item, sub) => addItem('disadvantages', item, sub)}
                onRemoveItem={(id) => removeItem('disadvantages', id)}
                listName='Desvantagens'
                onAddCustomItem={onAddCustomItem}
                onUpdateCustomItem={onUpdateCustomItem}
                onDeleteCustomItem={onDeleteCustomItem}
              />
            </FinalizedSection>
          </>
        ) : (
          <>
            <FinalizedSection>
              <SectionTitle>Perícias</SectionTitle>
              <FinalizedView items={character.skills || []} />
            </FinalizedSection>
            <FinalizedSection>
              <SectionTitle>Vantagens</SectionTitle>
              <FinalizedView items={character.advantages || []} />
            </FinalizedSection>
            <FinalizedSection>
              <SectionTitle>Desvantagens</SectionTitle>
              <FinalizedView items={character.disadvantages || []} />
            </FinalizedSection>
          </>
        )}
        <Section>
          <SectionHeader>
            <SectionTitle style={{ marginBottom: 0 }}>História do Personagem</SectionTitle>
            <VisibilityButton onClick={() => setIsBackstoryVisible(!isBackstoryVisible)}>
              {isBackstoryVisible ? <FaEyeSlash /> : <FaEye />}
            </VisibilityButton>
          </SectionHeader>
          {(isEditing || isBackstoryVisible) && (
            <BackstoryTextarea
              placeholder='Escreva a história, personalidade e objetivos do seu personagem aqui...'
              value={character.backstory || ''}
              onChange={(e) => handleUpdate({ backstory: e.target.value })}
              readOnly={!isEditing}
              disabled={character.isDead}
            />
          )}
        </Section>
      </FooterPanel>

      <FloatingActionButton
        onClick={() => setIsEditing(!isEditing)}
        disabled={character.isDead}
        title={isEditing ? 'Salvar e ir para Modo Jogo' : 'Entrar no Modo Edição'}
      >
        {isEditing ? <FaSave /> : <FaPencilAlt />}
      </FloatingActionButton>

      {!isEditing &&
        (character.isDead ? (
          <DeathButton className='resurrect' onClick={() => setConfirmResurrectionModal(true)}>
            <FaHeartbeat /> Ressuscitar
          </DeathButton>
        ) : (
          <DeathButton onClick={() => setConfirmDeathModal(true)}>
            <FaSkull /> Declarar Morte
          </DeathButton>
        ))}
    </SheetContainer>
  );
};
