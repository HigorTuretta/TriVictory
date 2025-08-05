import React from 'react';
import { Modal } from '../Modal';
import {
  ModalContentWrapper, ModalHeader, TechniqueTitle, InfoGrid, InfoItem, Description, SectionDivider,
  VariationsHeader, VariationList, VariationCard as VariationCardStyled, VariationDetails, VariationName, VariationDescription,
  VariationActions, VariationInfo, SelectButton
} from './styles';
import { CategoryBadge } from '../TechniqueSelectionGrid/styles';


const formatRequirements = (reqs = []) => {
    if (reqs.length === 0) return 'Nenhum';
    
    const describeReq = (req) => {
        const nome = req.nome ? req.nome.charAt(0).toUpperCase() + req.nome.slice(1) : '';
        switch (req.tipo) {
            case 'atributo': return `${nome} ${req.valor}`;
            case 'pericia':
            case 'vantagem':
            case 'maestria':
                return nome;
            case 'ou':
                return `(${req.opcoes.map(describeReq).join(' ou ')})`;
            default: return 'Requisito';
        }
    };
    return reqs.map(describeReq).join(' e ');
};

// --- Subcomponentes para Modularização ---

const TechniqueHeader = ({ nome, categoria }) => (
  <ModalHeader>
    <TechniqueTitle>{nome}</TechniqueTitle>
    <CategoryBadge category={categoria}>{categoria}</CategoryBadge>
  </ModalHeader>
);

// MODIFICADO: Passa o array de requisitos para a nova função de formatação.
const TechniqueInfo = ({
  requisitos = [], // Agora recebe o array 'requisitos'
  alcance,
  custo,
  duracao,
  testes
}) => {
  const infoItems = [
    // Usa a nova função de formatação
    { label: 'Requisitos', value: formatRequirements(requisitos) },
    { label: 'Alcance', value: alcance },
    { label: 'Custo', value: custo },
    { label: 'Duração', value: duracao },
  ];

  return (
    <>
      <InfoGrid>
        {infoItems.map(item => item.value && ( // Só renderiza se tiver valor
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

  // A lógica de verificação agora retorna o array de objetos não cumpridos
  const { meets, unmet } = checkRequirements(technique);
  // A mensagem de erro agora também usa a função de formatação
  const unmetReasons = formatRequirements(unmet);
  const isAlreadySelected = selectedTechniques.some(t => t.nome === technique.nome && !t.subOption);
  const hasVariations = technique.variacoes && technique.variacoes.length > 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="large">
      <ModalContentWrapper>
        <TechniqueHeader nome={technique.nome} categoria={technique.categoria} />
        {/* Passa a propriedade 'requisitos' em vez de 'requisito' */}
        <TechniqueInfo {...technique} requisitos={technique.requisitos} />
        <Description>{technique.descricao}</Description>
        
        {hasVariations ? (
          <VariationsSection
            variations={technique.variacoes}
            selectedTechniques={selectedTechniques}
            techniqueName={technique.nome}
            onSelect={(variation) => onSelect(technique, variation)}
            meetsRequirements={meets}
            unmetReasons={unmetReasons}
          />
        ) : (
          <MainActionButton
            onSelect={() => onSelect(technique, null)}
            meetsRequirements={meets}
            isSelected={isAlreadySelected}
            unmetReasons={unmetReasons}
          />
        )}
      </ModalContentWrapper>
    </Modal>
  );
};