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

/* ---------- SVG da face do dado ---------- */
const DieFace = ({ value }) => (
  <DieSvg viewBox="0 0 100 100">
    <rect
      width="100"
      height="100"
      rx="15"
      fill="white"
      stroke="#1E1E26"
      strokeWidth="5"
    />
    {value === 1 && <circle cx="50" cy="50" r="10" fill="black" />}
    {value === 2 && (
      <>
        <circle cx="25" cy="25" r="8" fill="black" />
        <circle cx="75" cy="75" r="8" fill="black" />
      </>
    )}
    {value === 3 && (
      <>
        <circle cx="25" cy="25" r="8" fill="black" />
        <circle cx="50" cy="50" r="8" fill="black" />
        <circle cx="75" cy="75" r="8" fill="black" />
      </>
    )}
    {value === 4 && (
      <>
        <circle cx="25" cy="25" r="8" fill="black" />
        <circle cx="75" cy="25" r="8" fill="black" />
        <circle cx="25" cy="75" r="8" fill="black" />
        <circle cx="75" cy="75" r="8" fill="black" />
      </>
    )}
    {value === 5 && (
      <>
        <circle cx="25" cy="25" r="8" fill="black" />
        <circle cx="75" cy="25" r="8" fill="black" />
        <circle cx="50" cy="50" r="8" fill="black" />
        <circle cx="25" cy="75" r="8" fill="black" />
        <circle cx="75" cy="75" r="8" fill="black" />
      </>
    )}
    {value === 6 && (
      <>
        <circle cx="25" cy="25" r="8" fill="black" />
        <circle cx="75" cy="25" r="8" fill="black" />
        <circle cx="25" cy="50" r="8" fill="black" />
        <circle cx="75" cy="50" r="8" fill="black" />
        <circle cx="25" cy="75" r="8" fill="black" />
        <circle cx="75" cy="75" r="8" fill="black" />
      </>
    )}
  </DieSvg>
);

DieFace.propTypes = { value: PropTypes.number.isRequired };

/* ---------- formata a “quebra” ---------- */
const formatBreakdown = (rollData) => {
  if (!rollData?.individualResults) return '';
  const diceStr = `[${rollData.individualResults.join(' + ')}]`;
  const modifiersStr = (rollData.modifiers || [])
    .map((m) => ` + ${m.value} (${m.label})`)
    .join(' ');
  return `${diceStr} ${modifiersStr}`.trim();
};

/* ================================================================== */
export const DiceRoller = ({ isVisible, rollData, onAnimationComplete }) => {
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    setShowResults(false);
    const showTimer = setTimeout(() => setShowResults(true), 1500);
    const finishTimer = setTimeout(onAnimationComplete, 4000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(finishTimer);
    };
  }, [isVisible, onAnimationComplete]);

  if (!isVisible || !rollData) return null;

  const { individualResults } = rollData;
  const diceCount = individualResults.length;

  /* cálculo de offset horizontal evitando overlap */
  const calcOffsetX = (idx) => {
    const gap = 140; // distância entre colunas
    const mid = (diceCount - 1) / 2;
    return (idx - mid) * gap;
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
          {individualResults.map((result, idx) => (
            <motion.div
              key={idx}
              initial={{
                y: -500,
                x: calcOffsetX(idx),
                rotate: Math.random() * 720
              }}
              animate={{
                y: 0,
                x: calcOffsetX(idx),
                rotate: 1440 + (Math.random() - 0.5) * 180,
                transition: {
                  type: 'spring',
                  stiffness: 100,
                  damping: 12,
                  delay: idx * 0.1
                }
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
    modifiers: PropTypes.array
  }),
  onAnimationComplete: PropTypes.func.isRequired
};
