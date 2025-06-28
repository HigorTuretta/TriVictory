import React from 'react';
import PropTypes from 'prop-types';
import { FaCamera } from 'react-icons/fa';
import { motion } from 'framer-motion';
import {
  Wrapper,
  BannerImage,
  BannerOverlay,
  Content,
  TokenWrap,
  Token,
  UploadBtn,
  Info,
  NameInput,
  PointsRow,
  Pill,
} from './styles';

export const CharacterSheetHeader = ({
  character,
  characterName,
  onNameChange,
  points = { total: 0, used: 0, remaining: 0 },
  isOwner = false,
  isEditing = false,
  isDead = false,
  onOpenImageManager,
  onBannerClick,
}) => {
  // ✅ CORREÇÃO APLICADA AQUI:
  // Procura primeiro por 'portraitImage' (novo) e depois por 'bannerImage' (antigo).
  const bannerUrl = character?.portraitImage || character?.bannerImage || '';
  console.log(points)
  const bannerPosition = character?.bannerPosition || 50;
  const tokenUrl = character?.tokenImage || '';
  const borderColor = character?.tokenBorderColor || '#7b3ff1';
  const { total = 0, used = 0, remaining = 0, disBonus = 0 } = points;

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
          alt="Banner do Personagem"
          $position={bannerPosition}
        />
      )}

      <BannerOverlay onClick={handleBannerClick} />

      {isOwner && isEditing && (
        <UploadBtn type="button" onClick={onOpenImageManager} title="Gerenciar Imagens">
          <FaCamera size={18} />
        </UploadBtn>
      )}

      <Content>


        <Info>
          {tokenUrl && (
            <TokenWrap $border={borderColor}>
              <Token src={tokenUrl} alt="Token" />
            </TokenWrap>
          )}
          <NameInput
            value={characterName}
            placeholder="Nome do personagem"
            disabled={!isEditing || isDead}
            onChange={(e) => onNameChange(e.target.value)}
          />
          <PointsRow>
            <Pill $variant="base">Base&nbsp;{total}</Pill>
            <Pill>Gastos&nbsp;{used}</Pill>
            <Pill $variant="disBonus">Desvantagens&nbsp;{disBonus}</Pill>
            <Pill $variant="remain">Rest.&nbsp;{remaining}</Pill>
          </PointsRow>
        </Info>
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
  }),
  isOwner: PropTypes.bool,
  isEditing: PropTypes.bool,
  isDead: PropTypes.bool,
  onOpenImageManager: PropTypes.func,
  onBannerClick: PropTypes.func,
};
