import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Cropper from 'react-easy-crop';
import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';
import { HexColorPicker } from 'react-colorful';
import toast from 'react-hot-toast';
import {
  FaSearchPlus, FaSearchMinus, FaCloudUploadAlt, FaArrowLeft,
  FaArrowRight, FaCheck, FaTimes
} from 'react-icons/fa';

import { Modal } from '../Modal';
import { uploadImage } from '../../services/cloudinaryService';

import {
  Body, DropZone, CropArea, Controls, Range, Btn, Stepper,
  ColorWrap, Preview, HelpText, ModalHeader, ChangeImageButton,
  MenuContainer, MenuTitle, MenuOptions, MenuButton
} from './styles';

// Definindo as proporções
const PORTRAIT_ASPECT = 2 / 3;
const BANNER_ASPECT = 14 / 4;
const TOKEN_ASPECT = 1;

// Função auxiliar para criar um Blob de uma área cortada
const getCroppedBlob = async (imageSrc, pixelCrop) => {
  if (!pixelCrop) return null;
  const image = await new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;
  });

  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob(resolve, 'image/jpeg', 0.9);
  });
};

export const ImageCropperModal = ({ open, onClose, onDone, characterImage }) => {
  const [view, setView] = useState('menu');
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [originalSrc, setOriginalSrc] = useState(null);
  const [portraitCrop, setPortraitCrop] = useState({ x: 0, y: 0 });
  const [portraitZoom, setPortraitZoom] = useState(1);
  const [portraitPixels, setPortraitPixels] = useState(null);
  const [portraitBlobUrl, setPortraitBlobUrl] = useState(null);
  const [bannerCrop, setBannerCrop] = useState({ x: 0, y: 0 });
  const [bannerYPercent, setBannerYPercent] = useState(50);
  const [tokenCrop, setTokenCrop] = useState({ x: 0, y: 0 });
  const [tokenZoom, setTokenZoom] = useState(1);
  const [tokenPixels, setTokenPixels] = useState(null);
  const [borderColor, setBorderColor] = useState('#7b3ff1');

  const resetState = useCallback(() => {
    setOriginalSrc(null);
    setPortraitCrop({ x: 0, y: 0 });
    setPortraitZoom(1);
    setPortraitPixels(null);
    if (portraitBlobUrl) URL.revokeObjectURL(portraitBlobUrl);
    setPortraitBlobUrl(null);
    setBannerCrop({ x: 0, y: 0 });
    setBannerYPercent(50);
    setTokenCrop({ x: 0, y: 0 });
    setTokenZoom(1);
    setTokenPixels(null);
    setBorderColor('#7b3ff1');
    setStep(0);
  }, [portraitBlobUrl]);

  // Efeito para definir a tela inicial APENAS quando o modal abre
  useEffect(() => {
    if (open) {
      setView(characterImage ? 'menu' : 'upload');
    }
  }, [open, characterImage]);

  // Efeito para limpar o estado APENAS quando o modal fecha
  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => resetState(), 300); // Delay para animação
      return () => clearTimeout(timer);
    }
  }, [open, resetState]);

  const onDrop = useCallback((files) => {
    const file = files[0];
    if (file) {
      resetState();
      const reader = new FileReader();
      reader.onload = () => {
        setOriginalSrc(reader.result);
        setView('cropping'); // Direto para a tela de corte
      };
      reader.readAsDataURL(file);
    }
  }, [resetState]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] }, multiple: false });

  const handleStartEditing = () => {
    setOriginalSrc(characterImage);
    setView('cropping');
  };

  const handleReturnToMenu = () => {
    resetState();
    setView('menu');
  };

  const handleProceedToBanner = async () => {
    if (!portraitPixels) return;
    try {
      const blob = await getCroppedBlob(originalSrc, portraitPixels);
      if(portraitBlobUrl) URL.revokeObjectURL(portraitBlobUrl);
      setPortraitBlobUrl(URL.createObjectURL(blob));
      setStep(1);
    } catch(err) {
      toast.error("Erro ao processar a imagem. Tente novamente.");
      console.error(err);
    }
  };
  
  const handleSave = async () => {
    try {
      setLoading(true);
      const portraitBlob = await getCroppedBlob(originalSrc, portraitPixels);
      const portraitOptimized = await imageCompression(portraitBlob, { maxWidthOrHeight: 1024, useWebWorker: true });
      const portraitRes = await uploadImage(portraitOptimized);

      const tokenBlob = await getCroppedBlob(originalSrc, tokenPixels);
      const tokenOptimized = await imageCompression(tokenBlob, { maxWidthOrHeight: 140, useWebWorker: true });
      const tokenRes = await uploadImage(tokenOptimized);

      onDone({
        portraitImage: portraitRes.secure_url,
        tokenImage: tokenRes.secure_url,
        bannerPosition: bannerYPercent,
        tokenBorderColor: borderColor,
      });

      toast.success('Imagens atualizadas!');
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Falha ao enviar imagem');
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (view === 'menu') {
      return (
        <MenuContainer>
            <MenuTitle>Você já tem uma imagem de personagem.</MenuTitle>
            <MenuOptions>
                <MenuButton $primary onClick={handleStartEditing}>
                    Editar Imagem Atual
                </MenuButton>
                <MenuButton onClick={() => setView('upload')}>
                    Enviar Nova Imagem
                </MenuButton>
            </MenuOptions>
        </MenuContainer>
      );
    }

    if (view === 'upload') {
      return (
        <DropZone {...getRootProps()} $drag={isDragActive}>
            <input {...getInputProps()} />
            <FaCloudUploadAlt size={58} />
            <p>Arraste uma imagem aqui ou clique para selecionar</p>
            {characterImage && (
                <MenuButton style={{marginTop: '1rem'}} onClick={() => setView('menu')}>
                    Cancelar
                </MenuButton>
            )}
        </DropZone>
      );
    }

    if (view === 'cropping' && originalSrc) {
      return (
        <>
          <ModalHeader>
            <Stepper>
              <span className={step === 0 ? 'active' : ''}>1. Retrato</span>
              <span className={step === 1 ? 'active' : ''}>2. Banner</span>
              <span className={step === 2 ? 'active' : ''}>3. Token</span>
              <span className={step === 3 ? 'active' : ''}>4. Borda</span>
            </Stepper>
            <ChangeImageButton onClick={characterImage ? handleReturnToMenu : () => setView('upload')}>
              {characterImage ? 'Voltar ao Menu' : 'Trocar Imagem'}
            </ChangeImageButton>
          </ModalHeader>

          {step === 0 && (
            <>
              <HelpText>Faça o corte principal da arte do seu personagem (2:3).</HelpText>
              <CropArea><Cropper image={originalSrc} crop={portraitCrop} zoom={portraitZoom} aspect={PORTRAIT_ASPECT} onCropChange={setPortraitCrop} onZoomChange={setPortraitZoom} onCropComplete={(_, px) => setPortraitPixels(px)} /></CropArea>
              <Controls><FaSearchMinus /> <Range type="range" min={1} max={3} step={0.01} value={portraitZoom} onChange={(e) => setPortraitZoom(Number(e.target.value))} /> <FaSearchPlus /></Controls>
              <Btn $primary onClick={handleProceedToBanner} disabled={!portraitPixels}><FaArrowRight /> Próximo</Btn>
            </>
          )}
          
          {step === 1 && (
            <>
              <HelpText>Arraste para escolher a área que aparecerá no banner.</HelpText>
              <CropArea>
                <Cropper image={portraitBlobUrl} crop={bannerCrop} zoom={1} aspect={BANNER_ASPECT} onCropChange={setBannerCrop} onCropComplete={(ca) => setBannerYPercent(ca.y + (ca.height / 2))} showGrid={false} />
              </CropArea>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}><Btn onClick={() => setStep(0)}><FaArrowLeft /> Voltar</Btn><Btn $primary onClick={() => setStep(2)}><FaArrowRight /> Próximo</Btn></div>
            </>
          )}

          {step === 2 && (
            <>
              <HelpText>Agora, selecione a imagem para o token redondo.</HelpText>
              <CropArea><Cropper image={originalSrc} crop={tokenCrop} zoom={tokenZoom} aspect={TOKEN_ASPECT} cropShape="round" onCropChange={setTokenCrop} onZoomChange={setTokenZoom} onCropComplete={(_, px) => setTokenPixels(px)} /></CropArea>
              <Controls><FaSearchMinus /> <Range type="range" min={1} max={3} step={0.01} value={tokenZoom} onChange={(e) => setTokenZoom(Number(e.target.value))} /> <FaSearchPlus /></Controls>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}><Btn onClick={() => setStep(1)}><FaArrowLeft /> Voltar</Btn><Btn $primary onClick={() => setStep(3)} disabled={!tokenPixels}><FaArrowRight /> Próximo</Btn></div>
            </>
          )}

          {step === 3 && (
            <>
              <HelpText>Escolha a cor da borda para o seu token.</HelpText>
              <ColorWrap><HexColorPicker color={borderColor} onChange={setBorderColor} /> <Preview $color={borderColor} /></ColorWrap>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}><Btn onClick={() => setStep(2)}><FaArrowLeft /> Voltar</Btn><Btn $primary onClick={handleSave} disabled={loading}>{loading ? 'Enviando…' : <><FaCheck /> Salvar</>}</Btn><Btn onClick={onClose}><FaTimes /> Cancelar</Btn></div>
            </>
          )}
        </>
      );
    }
    return null;
  };

  return (
    <Modal isOpen={open} onClose={onClose} title="Gerenciar Imagens" size="large">
      <Body>
        {renderContent()}
      </Body>
    </Modal>
  );
};

ImageCropperModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onDone: PropTypes.func,
  characterImage: PropTypes.string,
};
