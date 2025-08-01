// src/components/CharacterSheetHeader/index.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { FaCamera, FaExpandArrowsAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

// CORREÇÃO: Importar as funções para construir as URLs das imagens
import { getMainImageUrl, getTokenImageUrl } from '../../services/cloudinaryService';

import {
  Wrapper,
  BannerImage,
  BannerOverlay,
  Content,
  BottomRow,
  TokenWrap,
  Token,
  UploadBtn,
  ExpandButton,
  Info,
  NameInput,
  PointsRow,
  Pill,
} from './styles';

export const CharacterSheetHeader = ({
  character,
  characterName,
  onNameChange,
  points,
  isOwner = false,
  isEditing = false,
  isDead = false,
  onOpenImageManager,
  onBannerClick,
}) => {
  const {
    portraitImage, // Agora é o public_id
    bannerPosition = 50,
    tokenImage, // Agora é o public_id
    tokenBorderColor = '#7b3ff1',
  } = character || {};

  const { total = 0, used = 0, remaining = 0, disBonus = 0 } = points || {};

  // CORREÇÃO: Usar os helpers para construir as URLs completas a partir dos public_ids
  const bannerUrl = portraitImage ? getMainImageUrl(portraitImage) : '';
  const tokenUrl = tokenImage ? getTokenImageUrl(tokenImage, tokenBorderColor) : '';

  const pointPills = [
    { label: 'Base', value: total, variant: 'base' },
    { label: 'Gastos', value: used, variant: 'default' },
    { label: 'Desvantagens', value: disBonus, variant: 'disBonus' },
    { label: 'Disponível', value: remaining, variant: 'remain' },
  ];

  const handleBannerClick = () => {
    if (bannerUrl && onBannerClick) {
      onBannerClick(bannerUrl);
    }
  };

  return (
    <Wrapper
      as={motion.header}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      $dead={isDead}
    >
      {bannerUrl && (
        <BannerImage
          src={bannerUrl}
          alt="Banner do personagem"
          $position={bannerPosition}
        />
      )}

      <BannerOverlay />

      {isOwner && isEditing && (
        <UploadBtn title="Gerenciar imagens" onClick={onOpenImageManager}>
          <FaCamera />
        </UploadBtn>
      )}

      {bannerUrl && (
        <ExpandButton title="Ampliar imagem" onClick={handleBannerClick}>
          <FaExpandArrowsAlt />
        </ExpandButton>
      )}

      <Content>
        <BottomRow>
          {tokenUrl && (
            <TokenWrap $border={tokenBorderColor}>
              <Token src={tokenUrl} alt="Token" />
            </TokenWrap>
          )}

          <Info>
            <NameInput
              value={characterName}
              placeholder="Nome do personagem"
              disabled={!isEditing || isDead}
              onChange={(e) => onNameChange(e.target.value)}
            />

            <PointsRow>
              {pointPills.map((pill) => (
                <Pill key={pill.label} $variant={pill.variant}>
                  {pill.label} • {pill.value}
                </Pill>
              ))}
            </PointsRow>
          </Info>
        </BottomRow>
      </Content>
    </Wrapper>
  );
};

CharacterSheetHeader.propTypes = {
  character: PropTypes.object.isRequired,
  characterName: PropTypes.string,
  onNameChange: PropTypes.func,
  points: PropTypes.shape({
    total: PropTypes.number,
    used: PropTypes.number,
    remaining: PropTypes.number,
    disBonus: PropTypes.number,
  }),
  isOwner: PropTypes.bool,
  isEditing: PropTypes.bool,
  isDead: PropTypes.bool,
  onOpenImageManager: PropTypes.func,
  onBannerClick: PropTypes.func,
};