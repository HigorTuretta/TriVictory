import React from 'react';
import { Modal } from '../Modal';
import {
  ModalContentWrapper, ModalHeader, TechniqueTitle, InfoGrid, InfoItem, Description, SectionDivider,
  VariationsHeader, VariationList, VariationCard as VariationCardStyled, VariationDetails, VariationName, VariationDescription,
  VariationActions, VariationInfo, SelectButton
} from './styles';
import { CategoryBadge } from '../TechniqueSelectionGrid/styles';

// --- Subcomponentes para Modularização ---

const TechniqueHeader = ({ nome, categoria }) => (
  <ModalHeader>
    <TechniqueTitle>{nome}</TechniqueTitle>
    <CategoryBadge category={categoria}>{categoria}</CategoryBadge>
  </ModalHeader>
);

const TechniqueInfo = ({
  requisito = 'Nenhum',
  alcance,
  custo,
  duracao,
  testes
}) => {
  const infoItems = [
    { label: 'Requisito', value: requisito },
    { label: 'Alcance', value: alcance },
    { label: 'Custo', value: custo },
    { label: 'Duração', value: duracao },
  ];

  return (
    <>
      <InfoGrid>
        {infoItems.map(item => (
          <InfoItem key={item.label}>
            <strong>{item.label}:</strong>
            <span>{item.value}</span>
          </InfoItem>
        ))}
      </InfoGrid>
      {testes && <InfoItem style={{ marginBottom: '1rem' }}><strong>Testes:</strong> <span>{testes}</span></InfoItem>}
    </>
  );
};

const VariationCard = ({ variation, onSelect, isSelected, meetsRequirements, unmetReasons }) => (
  <VariationCardStyled>
    <VariationDetails>
      <VariationName>{variation.nome}</VariationName>
      <VariationDescription>{variation.descricao}</VariationDescription>
    </VariationDetails>
    <VariationActions>
      {(variation.custo || variation.testes) && (
        <VariationInfo>
          {variation.custo && `Custo: ${variation.custo}`}
          {variation.testes && ` Teste: ${variation.testes}`}
        </VariationInfo>
      )}
      <SelectButton
        onClick={() => onSelect(variation)}
        disabled={!meetsRequirements || isSelected}
        title={isSelected ? 'Variação já adicionada' : (!meetsRequirements ? `Requisitos não cumpridos: ${unmetReasons}` : 'Adicionar Variação')}
      >
        {isSelected ? 'Adicionada' : (meetsRequirements ? 'Selecionar' : 'Bloqueado')}
      </SelectButton>
    </VariationActions>
  </VariationCardStyled>
);

const VariationsSection = ({ variations, selectedTechniques, techniqueName, onSelect, meetsRequirements, unmetReasons }) => (
  <>
    <SectionDivider />
    <VariationsHeader>Variações da Técnica</VariationsHeader>
    <VariationList>
      {variations.map(variation => (
        <VariationCard
          key={variation.nome}
          variation={variation}
          onSelect={() => onSelect(variation)}
          isSelected={selectedTechniques.some(t => t.nome === techniqueName && t.subOption === variation.nome)}
          meetsRequirements={meetsRequirements}
          unmetReasons={unmetReasons}
        />
      ))}
    </VariationList>
  </>
);

const MainActionButton = ({ onSelect, meetsRequirements, isSelected, unmetReasons }) => (
  <>
    <SectionDivider />
    <SelectButton
      onClick={onSelect}
      disabled={!meetsRequirements || isSelected}
      title={isSelected ? 'Técnica já adicionada' : (!meetsRequirements ? `Requisitos não cumpridos: ${unmetReasons}` : 'Adicionar Técnica')}
    >
      {isSelected ? 'Adicionada' : (meetsRequirements ? 'Adicionar à Ficha' : 'Requisitos não cumpridos')}
    </SelectButton>
  </>
);

// --- Componente Principal ---

export const TechniqueDetailsModal = ({ isOpen, onClose, technique, onSelect, checkRequirements, selectedTechniques = [] }) => {
  if (!technique) return null;

  const { meets, unmet } = checkRequirements(technique);
  const isAlreadySelected = selectedTechniques.some(t => t.nome === technique.nome && !t.subOption);
  const hasVariations = technique.variacoes && technique.variacoes.length > 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="large">
      <ModalContentWrapper>
        <TechniqueHeader nome={technique.nome} categoria={technique.categoria} />
        <TechniqueInfo {...technique} />
        <Description>{technique.descricao}</Description>
        
        {hasVariations ? (
          <VariationsSection
            variations={technique.variacoes}
            selectedTechniques={selectedTechniques}
            techniqueName={technique.nome}
            onSelect={(variation) => onSelect(technique, variation)}
            meetsRequirements={meets}
            unmetReasons={unmet.join(', ')}
          />
        ) : (
          <MainActionButton
            onSelect={() => onSelect(technique, null)}
            meetsRequirements={meets}
            isSelected={isAlreadySelected}
            unmetReasons={unmet.join(', ')}
          />
        )}
      </ModalContentWrapper>
    </Modal>
  );
};