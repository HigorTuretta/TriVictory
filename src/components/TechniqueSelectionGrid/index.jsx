import React, { useState, useMemo } from 'react';
import { TechniqueDetailsModal } from '../TechniqueDetailsModal';
import { Modal } from '../Modal'; // Importar o Modal base
import { ChoiceButton } from '../../screens/CharacterSheet/styles';
import { 
    GridContainer, Grid, TechniqueCard, TechniqueName, CategoryBadge,
    SelectedItemsContainer, SelectedItem, RemoveButton,
    ModalSelectionWrapper, ModalOptionButton // Novos imports de styles
} from './styles';
import toast from 'react-hot-toast';


// --- NOVO SUBCOMPONENTE: MODAL PARA ESCOLHER GOLPES ---
const GolpesChooserModal = ({ isOpen, onClose, onConfirm, technique }) => {
    const [selected, setSelected] = useState([]);
    if (!isOpen) return null;

    const handleToggle = (golpeName) => {
        setSelected(prev => {
            if (prev.includes(golpeName)) {
                return prev.filter(name => name !== golpeName);
            }
            if (prev.length < 2) {
                return [...prev, golpeName];
            }
            toast.error('Você pode escolher apenas dois golpes.');
            return prev;
        });
    };
    
    const handleConfirm = () => {
        if (selected.length !== 2) {
            return toast.error('Você precisa escolher exatamente dois golpes.');
        }
        onConfirm(technique, selected);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h3>{technique.nome}</h3>
            <p>{technique.descricao}</p>
            <ModalSelectionWrapper>
                {technique.variacoes.map(golpe => {
                    const isSelected = selected.includes(golpe.nome);
                    return (
                        <ModalOptionButton key={golpe.nome} onClick={() => handleToggle(golpe.nome)} style={{ backgroundColor: isSelected ? 'var(--color-primary)' : '' }}>
                            {golpe.nome}
                            <small>{golpe.descricao}</small>
                        </ModalOptionButton>
                    );
                })}
            </ModalSelectionWrapper>
            <ChoiceButton onClick={handleConfirm} style={{marginTop: '1.5rem'}}>Confirmar Escolha ({selected.length}/2)</ChoiceButton>
        </Modal>
    );
};

// --- Subcomponente para a Lista de Técnicas Selecionadas ---
const SelectedTechniquesList = ({ techniques, onRemove }) => {
  if (!techniques || techniques.length === 0) {
    return null;
  }

  return (
    <SelectedItemsContainer>
      {techniques.map((tech) => (
        <SelectedItem key={tech.id}>
          {tech.subOption ? `${tech.nome}: ${tech.subOption}` : tech.nome}
          <RemoveButton onClick={() => onRemove(tech.id)} title="Remover Técnica">
            ×
          </RemoveButton>
        </SelectedItem>
      ))}
    </SelectedItemsContainer>
  );
};

// --- Subcomponente para a Grade de Técnicas Disponíveis ---
const TechniqueGrid = ({ techniques, onCardClick }) => (
  <GridContainer>
    <Grid>
      {techniques.map(tech => (
        <TechniqueCard
          key={tech.nome}
          onClick={() => onCardClick(tech)}
          // CORREÇÃO: Passa a prop como `$category`
          $category={tech.categoria}
        >
          <TechniqueName>{tech.nome}</TechniqueName>
          <CategoryBadge $category={tech.categoria}>{tech.categoria}</CategoryBadge>
        </TechniqueCard>
      ))}
    </Grid>
  </GridContainer>
);

// --- Componente Principal ---
export const TechniqueSelectionGrid = ({
  techniques,
  selectedTechniques = [],
  onAddTechnique,
  onRemoveTechnique,
  checkRequirements
}) => {
  const [detailsModalTech, setDetailsModalTech] = useState(null);
  const [golpesModalOpen, setGolpesModalOpen] = useState(false); // Novo estado

  // Memoiza a técnica "Golpes" para fácil acesso
  const golpesTechnique = useMemo(() => techniques.find(t => t.regraEspecial === 'escolher_dois'), [techniques]);
  
  const handleCardClick = (technique) => {
      // Regra especial para "Golpes"
      if (technique.regraEspecial === 'escolher_dois') {
          setGolpesModalOpen(true);
      } else {
          setDetailsModalTech(technique);
      }
  };

  const handleSelectTechnique = (technique, variation) => {
    onAddTechnique(technique, variation);
    setDetailsModalTech(null); // Fecha o modal após a seleção
  };
  
  // Função para lidar com a confirmação da seleção de golpes
  const handleGolpesConfirm = (technique, selectedGolpes) => {
      selectedGolpes.forEach(golpeName => {
          const variation = technique.variacoes.find(v => v.nome === golpeName);
          if(variation) {
              onAddTechnique(technique, variation);
          }
      });
      setGolpesModalOpen(false);
  };

  return (
    <>
      <SelectedTechniquesList
        techniques={selectedTechniques}
        onRemove={onRemoveTechnique}
      />

      <TechniqueGrid
        techniques={techniques}
        onCardClick={handleCardClick} // Usa o novo handler
      />

      <TechniqueDetailsModal
        isOpen={!!detailsModalTech}
        onClose={() => setDetailsModalTech(null)}
        technique={detailsModalTech}
        onSelect={handleSelectTechnique}
        checkRequirements={checkRequirements}
        selectedTechniques={selectedTechniques}
      />
      
      {/* Renderiza o novo modal para "Golpes" */}
      <GolpesChooserModal
          isOpen={golpesModalOpen}
          onClose={() => setGolpesModalOpen(false)}
          onConfirm={handleGolpesConfirm}
          technique={golpesTechnique}
      />
    </>
  );
};