import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Lottie from 'lottie-react';

import DiceRoll from '../../assets/lotties/DiceRoll.json';     // ← relativo a /components
import { LoaderWrapper, Animation, Message } from './styles';

/**
 * Frases divertidas que giram durante o carregamento.
 * Você pode sobrescrever passando um array via prop `phrases`.
 */
const defaultPhrases = [
  'Rolando os dados do destino…',
  'Afiando espadas +1…',
  'Consultando o grimório de magias…',
  'Domando dragões famintos…',
  'Calculando XP não distribuído…',
  'Convocando o mestre de jogo…',
  'Organizando meeples na mesa…',
  'Evitando um temido fumble crítico…',
  'Recuperando mana arcana…',
  'Abrindo o saque do tesouro…'
];

export const RPGLoader = ({
  size = 180,
  interval = 2500,
  phrases = defaultPhrases,
  loop = true,
  style,
  ...rest
}) => {
  const [currentPhrase, setCurrentPhrase] = useState(
    phrases[Math.floor(Math.random() * phrases.length)]
  );
  const phrasesRef = useRef(phrases);

  /* Gira a frase a cada `interval` ms */
  useEffect(() => {
    const id = setInterval(() => {
      const next = phrasesRef.current[
        Math.floor(Math.random() * phrasesRef.current.length)
      ];
      setCurrentPhrase(next);
    }, interval);
    return () => clearInterval(id);
  }, [interval]);

  return (
    <LoaderWrapper style={style} {...rest}>
      <Animation
        animationData={DiceRoll}
        loop={loop}
        style={{ width: size, height: size }}
      />
      <Message>{currentPhrase}</Message>
    </LoaderWrapper>
  );
};

RPGLoader.propTypes = {
  size: PropTypes.number,        // largura/altura do Lottie
  interval: PropTypes.number,    // ms entre troca de frase
  phrases: PropTypes.arrayOf(PropTypes.string),
  loop: PropTypes.bool,
  style: PropTypes.object
};
