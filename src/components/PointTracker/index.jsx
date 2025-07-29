import React from 'react';
import { TrackerContainer, PointRow, RemainingPointsRow } from './styles';

export const PointTracker = ({ points = {}, basePoints = 12 }) => {
  // --- Preparação dos Dados ---
  const used = Number(points.used || 0);
  const disBonus = Number(points.disBonus || 0); // Bônus de desvantagens
  const totalAvailable = basePoints + disBonus;
  const remaining = totalAvailable - used;
  const isInvalid = remaining < 0;

  // --- Array de Configuração para Renderização Dinâmica ---
  // Centraliza os dados a serem exibidos, tornando o JSX mais limpo.
  const pointBreakdown = [
    { label: 'Pontos Base', value: basePoints },
    { label: 'Bônus (Desvantagens)', value: disBonus },
    { label: 'Total Disponível', value: totalAvailable },
    { label: 'Pontos Usados', value: used },
  ];

  return (
    <TrackerContainer>
      {/* Mapeia o array de dados para renderizar cada linha */}
      {pointBreakdown.map(({ label, value }) => (
        <PointRow key={label}>
          <span>{label}</span>
          <span>{value}</span>
        </PointRow>
      ))}

      {/* Linha de resumo renderizada separadamente para estilização especial */}
      <RemainingPointsRow $isInvalid={isInvalid}>
        <span>Restantes</span>
        <span>{remaining}</span>
      </RemainingPointsRow>
    </TrackerContainer>
  );
};