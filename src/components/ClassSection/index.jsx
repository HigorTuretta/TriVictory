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

// Função para gerar a dica de requisitos pendentes de forma mais clara
const makeHint = (reqs) => {
  if (!reqs || reqs.length === 0) return '';

  const simpleReqs = reqs.filter(req => req.tipo !== 'ou');
  const orGroups = reqs.filter(req => req.tipo === 'ou');
  const parts = [];

  if (simpleReqs.length > 0) {
    parts.push(simpleReqs.map(r => `"${describeReq(r)}"`).join(', '));
  }

  if (orGroups.length > 0) {
    const orMessages = orGroups.map(group =>
      `(um entre: ${group.opcoes.map(r => `"${describeReq(r)}"`).join(', ')})`
    );
    parts.push(...orMessages);
  }

  return `Para habilitar, você precisa cumprir: ${parts.join(' e ')}.`;
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
  // --- Constantes e Estado Derivado ---
  const selectedKits = character.kits || [];
  const hasKits = selectedKits.length > 0;
  const hasUnmetReqs = unmetReqs?.length > 0;

  const selectedKitNames = selectedKits.map(k => k.nome);
  const availableKits = classes.filter(c => !selectedKitNames.includes(c.nome));
  
  const showPlaceholder = !isEditing && !hasKits;

  return (
    <Section>
      <SectionTitle>Kits de Personagem</SectionTitle>

      {/* LISTA DE KITS JÁ SELECIONADOS */}
      {hasKits && (
        <SelectedKitList>
          {selectedKits.map(kit => (
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

      {/* CONTROLES DE EDIÇÃO (ADICIONAR/CRIAR KITS) */}
      {isEditing && (
        <>
          <ClassSelect
            value=""
            onChange={(e) => onAddKit(e.target.value)}
            disabled={character.isDead}
          >
            <option value="">Adicionar novo Kit...</option>
            {availableKits.map((c) => (
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
      {hasUnmetReqs && (
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
      {hasKits && selectedKits.map(kit => (
        <ClassInfo key={kit.nome}>
          <strong>Poderes de {kit.nome}:</strong>
          {kit.poderes.map((p, i) => (
            <ClassPower key={`${kit.nome}-${i}`}>{p}</ClassPower>
          ))}
        </ClassInfo>
      ))}

      {/* PLACEHOLDER QUANDO NÃO HÁ KITS E NÃO ESTÁ EDITANDO */}
      {showPlaceholder && (
        <p style={{ fontSize: '1.2rem', fontWeight: 500 }}>—</p>
      )}
    </Section>
  );
};