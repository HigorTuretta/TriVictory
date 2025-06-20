import React from 'react';
import { TrackerContainer, PointsText, RemainingPoints } from './styles';

export const PointTracker = ({ points, basePoints }) => {
  const isInvalid = points.remaining < 0;

  return (
    <TrackerContainer>
      <PointsText>Pontos Base: <span>{basePoints}</span></PointsText>
      <PointsText>Bônus (Desvantagens): <span>{basePoints - points.total}</span></PointsText>
      <PointsText>Usados: <span>{points.used}</span></PointsText>
      <RemainingPoints $isInvalid={isInvalid}>
        Restantes: <span>{points.remaining}</span>
      </RemainingPoints>
    </TrackerContainer>
  );
};