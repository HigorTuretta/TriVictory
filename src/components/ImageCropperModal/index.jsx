// src/components/ImageCropperModal/index.jsx
import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Cropper from 'react-easy-crop';
import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';
import { HexColorPicker } from 'react-colorful';
import toast from 'react-hot-toast';
import { FaSearchPlus, FaSearchMinus, FaCloudUploadAlt, FaArrowLeft, FaArrowRight, FaCheck, FaTimes } from 'react-icons/fa';
import { Modal } from '../Modal';
import { uploadImage } from '../../services/cloudinaryService';
import {
    Body, DropZone, CropArea, Controls, Range, Btn, Stepper, ColorWrap, Preview,
    HelpText, ModalHeader, ChangeImageButton, MenuContainer, MenuTitle, MenuOptions, MenuButton
} from './styles';

// --- Constantes e Helpers ---
const CROP_CONFIG = {
    PORTRAIT: { aspect: 2 / 3, shape: 'rect' },
    BANNER: { aspect: 14 / 4, shape: 'rect' },
    TOKEN: { aspect: 1, shape: 'round' },
};

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

  ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);

  return new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.9));
};

// --- Hook Customizado para Gerenciar a Lógica do Cropper ---
const useImageCropper = (initialImage, onDone, onClose) => {
    const [view, setView] = useState('menu');
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [originalSrc, setOriginalSrc] = useState(null);
    
    // Estados de corte
    const [cropState, setCropState] = useState({
        portrait: { crop: { x: 0, y: 0 }, zoom: 1, pixels: null, blobUrl: null },
        banner: { crop: { x: 0, y: 0 }, zoom: 1, pixels: null },
        token: { crop: { x: 0, y: 0 }, zoom: 1, pixels: null },
        borderColor: '#7b3ff1',
    });

    const updateCropState = (type, newValues) => setCropState(prev => ({ ...prev, [type]: { ...prev[type], ...newValues } }));

    const resetState = useCallback(() => {
        setOriginalSrc(null);
        if (cropState.portrait.blobUrl) URL.revokeObjectURL(cropState.portrait.blobUrl);
        setCropState({
            portrait: { crop: { x: 0, y: 0 }, zoom: 1, pixels: null, blobUrl: null },
            banner: { crop: { x: 0, y: 0 }, zoom: 1, pixels: null },
            token: { crop: { x: 0, y: 0 }, zoom: 1, pixels: null },
            borderColor: '#7b3ff1',
        });
        setStep(0);
    }, [cropState.portrait.blobUrl]);

    const onDrop = useCallback((files) => {
        const file = files[0];
        if (file) {
            resetState();
            const reader = new FileReader();
            reader.onload = () => { setOriginalSrc(reader.result); setView('cropping'); };
            reader.readAsDataURL(file);
        }
    }, [resetState]);

    const handleSave = async () => {
        try {
            setLoading(true);
            const portraitBlob = await getCroppedBlob(originalSrc, cropState.portrait.pixels);
            const portraitOptimized = await imageCompression(portraitBlob, { maxWidthOrHeight: 1024, useWebWorker: true });
            const portraitRes = await uploadImage(portraitOptimized);
            
            const tokenBlob = await getCroppedBlob(originalSrc, cropState.token.pixels);
            const tokenOptimized = await imageCompression(tokenBlob, { maxWidthOrHeight: 280, useWebWorker: true });
            const tokenRes = await uploadImage(tokenOptimized);

            onDone({
                portraitImage: portraitRes.public_id,
                tokenImage: tokenRes.public_id,
                bannerPosition: cropState.banner.pixels.y + (cropState.banner.pixels.height / 2),
                tokenBorderColor: cropState.borderColor,
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
    
    return {
        view, setView, step, setStep, loading, originalSrc, setOriginalSrc,
        cropState, updateCropState, resetState, onDrop, handleSave,
    };
};

// --- Subcomponentes de UI ---
const InitialMenu = ({ onEdit, onUpload }) => (
    <MenuContainer><MenuTitle>Você já tem uma imagem de personagem.</MenuTitle>
        <MenuOptions>
            <MenuButton $primary onClick={onEdit}>Editar Imagem Atual</MenuButton>
            <MenuButton onClick={onUpload}>Enviar Nova Imagem</MenuButton>
        </MenuOptions>
    </MenuContainer>
);

const UploadView = ({ getRootProps, getInputProps, isDragActive, hasImage, onCancel }) => (
    <DropZone {...getRootProps()} $drag={isDragActive}>
        <input {...getInputProps()} />
        <FaCloudUploadAlt size={58} />
        <p>Arraste uma imagem aqui ou clique para selecionar</p>
        {hasImage && <MenuButton style={{ marginTop: '1rem' }} onClick={(e) => { e.stopPropagation(); onCancel(); }}>Cancelar</MenuButton>}
    </DropZone>
);

const CroppingStep = ({ title, helpText, imageSrc, cropConfig, crop, zoom, onCropChange, onZoomChange, onCropComplete, children }) => (
    <>
        <HelpText>{helpText}</HelpText>
        <CropArea>
            <Cropper image={imageSrc} aspect={cropConfig.aspect} cropShape={cropConfig.shape} crop={crop} zoom={zoom} onCropChange={onCropChange} onZoomChange={onZoomChange} onCropComplete={onCropComplete} />
        </CropArea>
        <Controls>
            <FaSearchMinus />
            <Range type="range" min={1} max={3} step={0.01} value={zoom} onChange={(e) => onZoomChange(Number(e.target.value))} />
            <FaSearchPlus />
        </Controls>
        {children}
    </>
);

const CroppingSteps = ({ logic, characterImage }) => {
    const handleProceedToBanner = async () => {
        if (!logic.cropState.portrait.pixels) return;
        try {
            const blob = await getCroppedBlob(logic.originalSrc, logic.cropState.portrait.pixels);
            if (logic.cropState.portrait.blobUrl) URL.revokeObjectURL(logic.cropState.portrait.blobUrl);
            logic.updateCropState('portrait', { blobUrl: URL.createObjectURL(blob) });
            logic.setStep(1);
        } catch (err) {
            toast.error("Erro ao processar a imagem.");
        }
    };
    
    return (
        <>
            <ModalHeader>
                <Stepper>
                    {['Retrato', 'Banner', 'Token', 'Borda'].map((label, index) => (
                        <span key={label} className={logic.step === index ? 'active' : ''}>{`${index + 1}. ${label}`}</span>
                    ))}
                </Stepper>
                <ChangeImageButton onClick={characterImage ? () => { logic.resetState(); logic.setView('menu'); } : () => logic.setView('upload')}>
                    {characterImage ? 'Voltar ao Menu' : 'Trocar Imagem'}
                </ChangeImageButton>
            </ModalHeader>

            {logic.step === 0 && (
                <CroppingStep
                    helpText="Faça o corte principal da arte do seu personagem (2:3)."
                    imageSrc={logic.originalSrc} cropConfig={CROP_CONFIG.PORTRAIT}
                    crop={logic.cropState.portrait.crop} zoom={logic.cropState.portrait.zoom}
                    onCropChange={(c) => logic.updateCropState('portrait', { crop: c })}
                    onZoomChange={(z) => logic.updateCropState('portrait', { zoom: z })}
                    onCropComplete={(_, px) => logic.updateCropState('portrait', { pixels: px })}
                >
                    <Btn $primary onClick={handleProceedToBanner} disabled={!logic.cropState.portrait.pixels}><FaArrowRight /> Próximo</Btn>
                </CroppingStep>
            )}

            {logic.step === 1 && (
                <CroppingStep
                    helpText="Arraste para escolher a área que aparecerá no banner."
                    imageSrc={logic.cropState.portrait.blobUrl} cropConfig={CROP_CONFIG.BANNER}
                    crop={logic.cropState.banner.crop} zoom={1}
                    onCropChange={(c) => logic.updateCropState('banner', { crop: c })} onZoomChange={() => {}}
                    onCropComplete={(_, px) => logic.updateCropState('banner', { pixels: px })}
                >
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
                        <Btn onClick={() => logic.setStep(0)}><FaArrowLeft /> Voltar</Btn>
                        <Btn $primary onClick={() => logic.setStep(2)}><FaArrowRight /> Próximo</Btn>
                    </div>
                </CroppingStep>
            )}

            {logic.step === 2 && (
                <CroppingStep
                    helpText="Agora, selecione a imagem para o token redondo."
                    imageSrc={logic.originalSrc} cropConfig={CROP_CONFIG.TOKEN}
                    crop={logic.cropState.token.crop} zoom={logic.cropState.token.zoom}
                    onCropChange={(c) => logic.updateCropState('token', { crop: c })}
                    onZoomChange={(z) => logic.updateCropState('token', { zoom: z })}
                    onCropComplete={(_, px) => logic.updateCropState('token', { pixels: px })}
                >
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Btn onClick={() => logic.setStep(1)}><FaArrowLeft /> Voltar</Btn>
                        <Btn $primary onClick={() => logic.setStep(3)} disabled={!logic.cropState.token.pixels}><FaArrowRight /> Próximo</Btn>
                    </div>
                </CroppingStep>
            )}

            {logic.step === 3 && (
                <>
                    <HelpText>Escolha a cor da borda para o seu token.</HelpText>
                    <ColorWrap>
                        <HexColorPicker color={logic.cropState.borderColor} onChange={(c) => logic.updateCropState('borderColor', c)} />
                        <Preview $color={logic.cropState.borderColor} />
                    </ColorWrap>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
                        <Btn onClick={() => logic.setStep(2)}><FaArrowLeft /> Voltar</Btn>
                        <Btn $primary onClick={logic.handleSave} disabled={logic.loading}>{logic.loading ? 'Enviando…' : <><FaCheck /> Salvar</>}</Btn>
                        <Btn onClick={onClose}><FaTimes /> Cancelar</Btn>
                    </div>
                </>
            )}
        </>
    );
};


// --- Componente Principal ---
export const ImageCropperModal = ({ open, onClose, onDone, characterImage }) => {
    const logic = useImageCropper(characterImage, onDone, onClose);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: logic.onDrop, accept: { 'image/*': [] }, multiple: false });

    useEffect(() => {
        if (open) logic.setView(characterImage ? 'menu' : 'upload');
        else logic.resetState();
    }, [open, characterImage, logic.setView, logic.resetState]);

    const renderContent = () => {
        switch (logic.view) {
            case 'menu': return <InitialMenu onEdit={() => { logic.setOriginalSrc(characterImage); logic.setView('cropping'); }} onUpload={() => logic.setView('upload')} />;
            case 'upload': return <UploadView getRootProps={getRootProps} getInputProps={getInputProps} isDragActive={isDragActive} hasImage={!!characterImage} onCancel={() => logic.setView('menu')} />;
            case 'cropping': return logic.originalSrc ? <CroppingSteps logic={logic} characterImage={characterImage} /> : null;
            default: return null;
        }
    };

    return (
        <Modal isOpen={open} onClose={onClose} title="Gerenciar Imagens" size="large">
            <Body>{renderContent()}</Body>
        </Modal>
    );
};

ImageCropperModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onDone: PropTypes.func,
  characterImage: PropTypes.string,
};