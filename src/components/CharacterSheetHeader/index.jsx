// src/components/CharacterSheetHeader/index.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { FaCamera, FaExpandArrowsAlt, FaShareAlt, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast'; // Importar toast

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
  ShareButton, // Importar o novo botão
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
  updateCharacter, // Receber a função de atualização
}) => {
  const {
    id: characterId,
    portraitImage,
    bannerPosition = 50,
    tokenImage,
    tokenBorderColor = '#7b3ff1',
    isPublic = false, // Padrão para falso se não existir
  } = character || {};

  const { total = 0, used = 0, remaining = 0, disBonus = 0 } = points || {};

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

  // Lógica para o botão de compartilhamento
  const handleShare = () => {
    if (!isOwner || !updateCharacter) return;
    
    const newPublicState = !isPublic;
    updateCharacter({ isPublic: newPublicState });

    if (newPublicState) {
      const shareLink = `${window.location.origin}/sheet/${characterId}`;
      navigator.clipboard.writeText(shareLink);
      toast.success('Ficha agora é pública! Link copiado para a área de transferência.');
    } else {
      toast.error('Ficha agora é privada.');
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

      {/* NOVO BOTÃO DE COMPARTILHAMENTO */}
      {isOwner && (
        <ShareButton
          title={isPublic ? "Tornar ficha privada" : "Compartilhar (link público)"}
          onClick={handleShare}
          $isPublic={isPublic}
        >
          {isPublic ? <FaLock /> : <FaShareAlt />}
        </ShareButton>
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
                  {pill.label} • {pill.value}
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
  updateCharacter: PropTypes.func, // Adicionar prop type
};