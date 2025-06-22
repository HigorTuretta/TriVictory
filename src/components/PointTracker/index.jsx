import React from 'react';
import { TrackerContainer, PointsText, RemainingPoints } from './styles';

export const PointTracker = ({ points, basePoints = 12 }) => {
  const total   = Number(points?.total   ?? 0);
  const used    = Number(points?.used    ?? 0);
  const remain  = Number(points?.remaining ?? 0);
  const bonus   = basePoints - total;          // pode ser negativo
  const isInvalid = remain < 0;

  return (
    <TrackerContainer>
      <PointsText>
        Pontos Base: <span>{basePoints}</span>
      </PointsText>
      <PointsText>
        Bônus (Desvantagens): <span>{bonus}</span>
      </PointsText>
      <PointsText>
        Usados: <span>{used}</span>
      </PointsText>
      <RemainingPoints $isInvalid={isInvalid}>
        Restantes: <span>{remain}</span>
      </RemainingPoints>
    </TrackerContainer>
  );
};
