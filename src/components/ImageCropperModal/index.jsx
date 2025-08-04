// src/components/ImageCropperModal/index.jsx
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Cropper from 'react-easy-crop';
import { useDropzone } from 'react-dropzone';
import { HexColorPicker } from 'react-colorful';
import { FaSearchPlus, FaSearchMinus, FaCloudUploadAlt, FaArrowLeft, FaArrowRight, FaCheck } from 'react-icons/fa';
import { Modal } from '../Modal';
import { useImageCropper } from '../../hooks/useImageCropper';
import {
    Body, DropZone, CropArea, Controls, Range, Btn, Stepper, ColorWrap, Preview,
    HelpText, ModalHeader, ChangeImageButton
} from './styles';

// --- Constantes ---
const CROP_CONFIG = {
    PORTRAIT: { aspect: 2 / 3, shape: 'rect' },
    BANNER: { aspect: 14 / 4, shape: 'rect' },
    TOKEN: { aspect: 1, shape: 'round' },
};

// --- Subcomponentes de UI ---
const UploadView = ({ getRootProps, getInputProps, isDragActive }) => (
    <DropZone {...getRootProps()} $drag={isDragActive}>
        <input {...getInputProps()} />
        <FaCloudUploadAlt size={58} />
        <p>Arraste uma imagem aqui ou clique para selecionar</p>
    </DropZone>
);

const CroppingStep = ({ helpText, imageSrc, cropConfig, crop, zoom, onCropChange, onZoomChange, onCropComplete, children }) => (
    <>
        <HelpText>{helpText}</HelpText>
        <CropArea>
            <Cropper
                image={imageSrc}
                aspect={cropConfig.aspect}
                cropShape={cropConfig.shape}
                crop={crop}
                zoom={zoom}
                onCropChange={onCropChange}
                onZoomChange={onZoomChange}
                onCropComplete={onCropComplete}
            />
        </CropArea>
        <Controls>
            <FaSearchMinus />
            <Range type="range" min={1} max={3} step={0.01} value={zoom} onChange={(e) => onZoomChange(Number(e.target.value))} />
            <FaSearchPlus />
        </Controls>
        {children}
    </>
);

const CroppingFlow = ({ logic }) => {
    return (
        <>
            <ModalHeader>
                <Stepper>
                    {['Retrato', 'Banner', 'Token', 'Borda'].map((label, index) => (
                        <span key={label} className={logic.step === index ? 'active' : ''}>{`${index + 1}. ${label}`}</span>
                    ))}
                </Stepper>
                <ChangeImageButton onClick={logic.resetState}>Trocar Imagem</ChangeImageButton>
            </ModalHeader>

            {logic.step === 0 && (
                <CroppingStep
                    helpText="Faça o corte principal da arte do seu personagem (2:3)."
                    imageSrc={logic.originalSrc}
                    cropConfig={CROP_CONFIG.PORTRAIT}
                    crop={logic.cropState.portrait.crop}
                    zoom={logic.cropState.portrait.zoom}
                    onCropChange={(c) => logic.updateCropState('portrait', { crop: c })}
                    onZoomChange={(z) => logic.updateCropState('portrait', { zoom: z })}
                    onCropComplete={(_, px) => logic.updateCropState('portrait', { pixels: px })}
                >
                    <Btn $primary onClick={logic.proceedToBanner} disabled={!logic.cropState.portrait.pixels}>
                        <FaArrowRight /> Próximo
                    </Btn>
                </CroppingStep>
            )}

            {logic.step === 1 && (
                <CroppingStep
                    helpText="Arraste para escolher a área que aparecerá no banner."
                    imageSrc={logic.croppedPortraitUrl}
                    cropConfig={CROP_CONFIG.BANNER}
                    crop={logic.cropState.banner.crop}
                    zoom={1}
                    onCropChange={(c) => logic.updateCropState('banner', { crop: c })}
                    onZoomChange={() => {}}
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
                    imageSrc={logic.originalSrc}
                    cropConfig={CROP_CONFIG.TOKEN}
                    crop={logic.cropState.token.crop}
                    zoom={logic.cropState.token.zoom}
                    onCropChange={(c) => logic.updateCropState('token', { crop: c })}
                    onZoomChange={(z) => logic.updateCropState('token', { zoom: z })}
                    onCropComplete={(_, px) => logic.updateCropState('token', { pixels: px })}
                >
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Btn onClick={() => logic.setStep(1)}><FaArrowLeft /> Voltar</Btn>
                        <Btn $primary onClick={() => logic.setStep(3)} disabled={!logic.cropState.token.pixels}>
                            <FaArrowRight /> Próximo
                        </Btn>
                    </div>
                </CroppingStep>
            )}

            {logic.step === 3 && (
                <>
                    <HelpText>Escolha a cor da borda para o seu token.</HelpText>
                    <ColorWrap>
                        <HexColorPicker
                            color={logic.cropState.borderColor}
                            onChange={(color) => logic.updateCropState('borderColor', { borderColor: color })}
                        />
                        <Preview $color={logic.cropState.borderColor} />
                    </ColorWrap>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
                        <Btn onClick={() => logic.setStep(2)}><FaArrowLeft /> Voltar</Btn>
                        <Btn $primary onClick={logic.handleSave} disabled={logic.loading}>
                            {logic.loading ? 'Enviando…' : <><FaCheck /> Salvar</>}
                        </Btn>
                    </div>
                </>
            )}
        </>
    );
};


// --- Componente Principal ---
export const ImageCropperModal = ({ open, onClose, onDone }) => {
    const logic = useImageCropper(onDone, onClose);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
        onDrop: logic.onDrop, 
        accept: { 'image/*': [] }, 
        multiple: false 
    });

    // Reseta o estado interno sempre que o modal for fechado.
    useEffect(() => {
        if (!open) {
            logic.resetState();
        }
    }, [open, logic.resetState]);

    return (
        <Modal isOpen={open} onClose={onClose} title="Gerenciar Imagens" size="large">
            <Body>
                {logic.originalSrc ? 
                    <CroppingFlow logic={logic} /> : 
                    <UploadView getRootProps={getRootProps} getInputProps={getInputProps} isDragActive={isDragActive} />
                }
            </Body>
        </Modal>
    );
};

ImageCropperModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  characterImage: PropTypes.string, // Ainda é útil para outras lógicas se necessário
};