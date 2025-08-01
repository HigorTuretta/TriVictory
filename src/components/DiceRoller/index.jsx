import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import {
  Overlay,
  DiceWrapper,
  ResultWrapper,
  TotalText,
  BreakdownText,
  DieSvg
} from './styles';

// --- Configuração dos Padrões dos Pontos do Dado ---
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

const formatBreakdown = (rollData) => {
  if (!rollData?.individualResults) return '';
  const diceStr = `[${rollData.individualResults.join(' + ')}]`;
  const modifiersStr = (rollData.modifiers || []).map((m) => ` + ${m.value} (${m.label})`).join('');
  return `${diceStr}${modifiersStr}`;
};

// --- Configurações de Animação ---
const ANIMATION_DURATION_MS = 4000;
const RESULTS_DELAY_S = 1.5; // Em segundos para o framer-motion

const DiceRollerContent = ({ rollData, onAnimationComplete }) => {
  const { individualResults, total } = rollData;
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    // Animação de contagem do resultado final
    const animation = animate(count, total || 0, {
      duration: 0.8,
      delay: RESULTS_DELAY_S,
      ease: 'easeOut'
    });
    // Timer para fechar o modal após a animação completa
    const finishTimer = setTimeout(onAnimationComplete, ANIMATION_DURATION_MS);

    return () => {
      animation.stop();
      clearTimeout(finishTimer);
    };
  }, [total, count, onAnimationComplete]);

  const calcOffsetX = (index, diceCount) => {
    const gap = 140;
    const middleIndex = (diceCount - 1) / 2;
    return (index - middleIndex) * gap;
  };

  return (
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
            initial={{ y: -500, x: calcOffsetX(index, individualResults.length), rotate: Math.random() * 720 }}
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

      <ResultWrapper
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: RESULTS_DELAY_S }}
      >
        <TotalText>{rounded}</TotalText>
        <BreakdownText>= {formatBreakdown(rollData)}</BreakdownText>
      </ResultWrapper>
    </Overlay>
  );
};

export const DiceRoller = ({ isVisible, rollData, onAnimationComplete }) => (
  <AnimatePresence>
    {isVisible && rollData && (
      <DiceRollerContent
        rollData={rollData}
        onAnimationComplete={onAnimationComplete}
      />
    )}
  </AnimatePresence>
);

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