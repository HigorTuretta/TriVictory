import React from 'react';
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import {
  Section, SectionTitle, ClassSelect, AddClassButton, ClassInfo,
  ClassPower, ReqList, ReqItem, HintBox, SelectedKit, SelectedKitList
} from './styles';

// Função para formatar o nome do requisito
const describeReq = (req) => {
  if (req.tipo === 'ou') {
    return req.opcoes.map(r => describeReq(r)).join(' OU ');
  }
  return `${req.nome.charAt(0).toUpperCase() + req.nome.slice(1)} ${req.valor || ''}`.trim();
};

// Função para gerar a dica de requisitos pendentes
const makeHint = (reqs) => {
  const hasOr = reqs.some(req => req.tipo === 'ou');
  if (hasOr) {
    const orGroups = reqs.filter(req => req.tipo === 'ou');
    const simpleReqs = reqs.filter(req => req.tipo !== 'ou');
    let message = 'Para habilitar, você precisa cumprir os seguintes requisitos:';
    if (simpleReqs.length > 0) {
      message += ` ${simpleReqs.map(r => `"${describeReq(r)}"`).join(', ')}`;
    }
    orGroups.forEach(group => {
      message += ` (e mais um entre: ${group.opcoes.map(r => `"${describeReq(r)}"`).join(', ')})`;
    });
    return message;
  }
  return `Para habilitar, você precisa ter: ${reqs.map(r => `"${describeReq(r)}"`).join(', ')}.`;
};


export const ClassSection = ({
  character,
  classes,
  isEditing,
  onAddKit,
  onRemoveKit,
  goToClassCreator,
  unmetReqs,
}) => {
  const selectedKitNames = character.kits?.map(k => k.nome) || [];

  return (
    <Section>
      <SectionTitle>Kits de Personagem</SectionTitle>

      {/* LISTA DE KITS JÁ SELECIONADOS */}
      {character.kits && character.kits.length > 0 && (
        <SelectedKitList>
          {character.kits.map(kit => (
            <SelectedKit key={kit.nome}>
              {kit.nome}
              {isEditing && (
                <button onClick={() => onRemoveKit(kit.nome)} title={`Remover ${kit.nome}`}>
                  <FaTimes />
                </button>
              )}
            </SelectedKit>
          ))}
        </SelectedKitList>
      )}

      {isEditing && (
        <>
          <ClassSelect
            value=""
            onChange={(e) => onAddKit(e.target.value)}
            disabled={character.isDead}
          >
            <option value="">Adicionar novo Kit...</option>
            {classes
              .filter(c => !selectedKitNames.includes(c.nome)) // Filtra kits já selecionados
              .map((c) => (
                <option key={c.nome} value={c.nome}>
                  {c.nome}
                </option>
              ))}
          </ClassSelect>

          <AddClassButton onClick={goToClassCreator} disabled={character.isDead}>
            + Criar Kit Customizado
          </AddClassButton>
        </>
      )}

      {/* REQUISITOS PENDENTES */}
      {unmetReqs && unmetReqs.length > 0 && (
        <>
          <HintBox>{makeHint(unmetReqs)}</HintBox>
          <ReqList>
            {unmetReqs.map((req, index) => (
              <ReqItem key={index}>
                <FaExclamationTriangle /> {describeReq(req)}
              </ReqItem>
            ))}
          </ReqList>
        </>
      )}

      {/* PODERES DE TODOS OS KITS */}
      {character.kits && character.kits.length > 0 && (
        character.kits.map(kit => (
          <ClassInfo key={kit.nome}>
            <strong>Poderes de {kit.nome}:</strong>
            {kit.poderes.map((p, i) => (
              <ClassPower key={`${kit.nome}-${i}`}>{p}</ClassPower>
            ))}
          </ClassInfo>
        ))
      )}

      {!isEditing && (!character.kits || character.kits.length === 0) && (
        <p style={{ fontSize: '1.2rem', fontWeight: 500 }}>—</p>
      )}
    </Section>
  );
};