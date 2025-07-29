import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Overlay,
  DiceWrapper,
  ResultWrapper,
  TotalText,
  BreakdownText,
  DieSvg
} from './styles';

// --- Configuração dos Padrões dos Pontos do Dado ---
// Mapeia o valor da face para um array de coordenadas dos pontos.
const DOT_PATTERNS = {
  1: [{ x: 50, y: 50, r: 10 }],
  2: [{ x: 25, y: 25, r: 8 }, { x: 75, y: 75, r: 8 }],
  3: [{ x: 25, y: 25, r: 8 }, { x: 50, y: 50, r: 8 }, { x: 75, y: 75, r: 8 }],
  4: [{ x: 25, y: 25, r: 8 }, { x: 75, y: 25, r: 8 }, { x: 25, y: 75, r: 8 }, { x: 75, y: 75, r: 8 }],
  5: [{ x: 25, y: 25, r: 8 }, { x: 75, y: 25, r: 8 }, { x: 50, y: 50, r: 8 }, { x: 25, y: 75, r: 8 }, { x: 75, y: 75, r: 8 }],
  6: [{ x: 25, y: 25, r: 8 }, { x: 75, y: 25, r: 8 }, { x: 25, y: 50, r: 8 }, { x: 75, y: 50, r: 8 }, { x: 25, y: 75, r: 8 }, { x: 75, y: 75, r: 8 }],
};

const DieFace = ({ value }) => (
  <DieSvg viewBox="0 0 100 100">
    <rect width="100" height="100" rx="15" fill="white" stroke="#1E1E26" strokeWidth="5" />
    {(DOT_PATTERNS[value] || []).map((dot, index) => (
      <circle key={index} cx={dot.x} cy={dot.y} r={dot.r} fill="black" />
    ))}
  </DieSvg>
);
DieFace.propTypes = { value: PropTypes.number.isRequired };

// --- Função Helper para Formatar a Rolagem ---
const formatBreakdown = (rollData) => {
  if (!rollData?.individualResults) return '';
  const diceStr = `[${rollData.individualResults.join(' + ')}]`;
  const modifiersStr = (rollData.modifiers || []).map((m) => ` + ${m.value} (${m.label})`).join('');
  return `${diceStr}${modifiersStr}`;
};

// --- Configurações de Animação ---
const ANIMATION_DURATION_MS = 4000;
const RESULTS_DELAY_MS = 1500;

export const DiceRoller = ({ isVisible, rollData, onAnimationComplete }) => {
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    setShowResults(false);
    
    // Timer para mostrar o resultado final após a animação dos dados.
    const showTimer = setTimeout(() => setShowResults(true), RESULTS_DELAY_MS);
    
    // Timer para fechar o modal após a animação completa.
    const finishTimer = setTimeout(onAnimationComplete, ANIMATION_DURATION_MS);

    // Limpa os timers se o componente for desmontado ou re-renderizado.
    return () => {
      clearTimeout(showTimer);
      clearTimeout(finishTimer);
    };
  }, [isVisible, onAnimationComplete]);

  if (!isVisible || !rollData) return null;

  const { individualResults } = rollData;
  const diceCount = individualResults.length;

  const calcOffsetX = (index) => {
    const gap = 140; // Espaçamento horizontal entre os dados.
    const middleIndex = (diceCount - 1) / 2;
    return (index - middleIndex) * gap;
  };

  return (
    <AnimatePresence>
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <DiceWrapper>
          {individualResults.map((result, index) => (
            <motion.div
              key={index}
              initial={{ y: -500, x: calcOffsetX(index), rotate: Math.random() * 720 }}
              animate={{
                y: 0,
                rotate: 1440 + (Math.random() - 0.5) * 180,
                transition: { type: 'spring', stiffness: 100, damping: 12, delay: index * 0.1 }
              }}
            >
              <DieFace value={result} />
            </motion.div>
          ))}
        </DiceWrapper>

        {showResults && (
          <ResultWrapper
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <TotalText>{rollData.total}</TotalText>
            <BreakdownText>= {formatBreakdown(rollData)}</BreakdownText>
          </ResultWrapper>
        )}
      </Overlay>
    </AnimatePresence>
  );
};

DiceRoller.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  rollData: PropTypes.shape({
    individualResults: PropTypes.arrayOf(PropTypes.number).isRequired,
    total: PropTypes.number,
    modifiers: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.number,
    })),
  }),
  onAnimationComplete: PropTypes.func.isRequired
};