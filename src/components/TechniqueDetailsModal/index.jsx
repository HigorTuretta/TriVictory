import React from 'react';
import { Modal } from '../Modal';
import {
  ModalContentWrapper, ModalHeader, TechniqueTitle, InfoGrid, InfoItem, Description, SectionDivider,
  VariationsHeader, VariationList, VariationCard, VariationDetails, VariationName, VariationDescription,
  VariationActions, VariationInfo, SelectButton
} from './styles';
import { CategoryBadge } from '../TechniqueSelectionGrid/styles';

export const TechniqueDetailsModal = ({ isOpen, onClose, technique, onSelect, checkRequirements, selectedTechniques = [] }) => {
  if (!technique) return null;

  const { meets, unmet } = checkRequirements(technique);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContentWrapper>
        <ModalHeader>
          <TechniqueTitle>{technique.nome}</TechniqueTitle>
          <CategoryBadge category={technique.categoria}>{technique.categoria}</CategoryBadge>
        </ModalHeader>
        
        <InfoGrid>
          <InfoItem><strong>Requisito:</strong> <span>{technique.requisito || 'Nenhum'}</span></InfoItem>
          <InfoItem><strong>Alcance:</strong> <span>{technique.alcance}</span></InfoItem>
          <InfoItem><strong>Custo:</strong> <span>{technique.custo}</span></InfoItem>
          <InfoItem><strong>Duração:</strong> <span>{technique.duracao}</span></InfoItem>
        </InfoGrid>

        {technique.testes && <InfoItem style={{marginBottom: '1rem'}}><strong>Testes:</strong> <span>{technique.testes}</span></InfoItem>}
        
        <Description>{technique.descricao}</Description>
        
        {(technique.variacoes && technique.variacoes.length > 0) ? (
          <>
            <SectionDivider />
            <VariationsHeader>Variações da Técnica</VariationsHeader>
            <VariationList>
              {technique.variacoes.map(variation => {
                const isAlreadySelected = selectedTechniques.some(
                  t => t.nome === technique.nome && t.subOption === variation.nome
                );

                return (
                  <VariationCard key={variation.nome}>
                    <VariationDetails>
                      <VariationName>{variation.nome}</VariationName>
                      <VariationDescription>{variation.descricao}</VariationDescription>
                    </VariationDetails>
                    <VariationActions>
                      {(variation.custo || variation.testes) && (
                        <VariationInfo>
                          {variation.custo ? `Custo: ${variation.custo}` : ''}
                          {variation.testes ? `Teste: ${variation.testes}`: ''}
                        </VariationInfo>
                      )}
                      <SelectButton 
                        onClick={() => onSelect(technique, variation)} 
                        disabled={!meets || isAlreadySelected}
                        title={!meets ? `Requisitos não cumpridos: ${unmet.join(', ')}` : (isAlreadySelected ? 'Variação já adicionada' : 'Adicionar Variação')}
                      >
                        {isAlreadySelected ? 'Já Adicionada' : (meets ? 'Selecionar' : 'Bloqueado')}
                      </SelectButton>
                    </VariationActions>
                  </VariationCard>
                );
              })}
            </VariationList>
          </>
        ) : (
          <>
            <SectionDivider />
            <SelectButton 
              onClick={() => onSelect(technique, null)} 
              disabled={!meets || selectedTechniques.some(t => t.nome === technique.nome)}
              title={!meets ? `Requisitos não cumpridos: ${unmet.join(', ')}` : 'Adicionar Técnica'}
            >
              {!meets ? 'Requisitos não cumpridos' : 'Adicionar Técnica à Ficha'}
            </SelectButton>
          </>
        )}
      </ModalContentWrapper>
    </Modal>
  );
};