// src/components/VTT/TokenCropperModal.jsx
import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Modal } from '../Modal';
import { uploadImage } from '../../services/cloudinaryService';
import imageCompression from 'browser-image-compression';
import toast from 'react-hot-toast';
import styled from 'styled-components';

const CropperContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  background: #333;
`;

const ControlsContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const getCroppedBlob = async (imageSrc, pixelCrop) => {
    const image = await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (error) => reject(error);
        img.crossOrigin = 'anonymous';
        img.src = imageSrc;
    });

    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);

    return new Promise((resolve) => {
        canvas.toBlob(resolve, 'image/png', 1);
    });
};

export const TokenCropperModal = ({ isOpen, onClose, onComplete, imageSrc }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [loading, setLoading] = useState(false);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixelsValue) => {
        setCroppedAreaPixels(croppedAreaPixelsValue);
    }, []);

    const handleSave = async () => {
        if (!croppedAreaPixels) return;
        setLoading(true);
        try {
            const blob = await getCroppedBlob(imageSrc, croppedAreaPixels);
            const compressedFile = await imageCompression(blob, { maxSizeMB: 0.5, maxWidthOrHeight: 280, useWebWorker: true });
            const result = await uploadImage(compressedFile);
            
            toast.success('Token enviado com sucesso!');
            onComplete(result.public_id);
            onClose();
        } catch (error) {
            toast.error('Falha ao enviar a imagem do token.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h3>Recortar Token</h3>
            <CropperContainer>
                <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    cropShape="round"
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                />
            </CropperContainer>
            <ControlsContainer>
                <label>Zoom</label>
                <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    onChange={(e) => setZoom(e.target.value)}
                />
                <button onClick={handleSave} disabled={loading}>
                    {loading ? 'Enviando...' : 'Salvar Token'}
                </button>
            </ControlsContainer>
        </Modal>
    );
};