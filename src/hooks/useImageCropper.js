// src/hooks/useImageCropper.js
import { useState, useCallback } from 'react';
import imageCompression from 'browser-image-compression';
import toast from 'react-hot-toast';
import { uploadImage } from '../services/cloudinaryService';

// --- Função Auxiliar Pura ---
const getCroppedBlob = async (imageSrc, pixelCrop) => {
    if (!pixelCrop || !imageSrc) return null;

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
        canvas.toBlob(resolve, 'image/jpeg', 0.9);
    });
};


export const useImageCropper = (onDone, onClose) => {
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [originalSrc, setOriginalSrc] = useState(null);
    const [croppedPortraitUrl, setCroppedPortraitUrl] = useState(null);
    
    const [cropState, setCropState] = useState({
        portrait: { crop: { x: 0, y: 0 }, zoom: 1, pixels: null },
        banner: { crop: { x: 0, y: 0 }, pixels: null },
        token: { crop: { x: 0, y: 0 }, zoom: 1, pixels: null },
        borderColor: '#7b3ff1',
    });

const updateCropState = (type, newValues) => {
        setCropState(prev => {
            // Se for a cor da borda, apenas atualiza esse valor
            if (type === 'borderColor') {
                return { ...prev, borderColor: newValues.borderColor };
            }
            // Senão, mescla os valores do tipo específico (portrait, banner, etc.)
            return { ...prev, [type]: { ...prev[type], ...newValues } };
        });
    };
    const resetState = useCallback(() => {
        setOriginalSrc(null);
        if (croppedPortraitUrl) URL.revokeObjectURL(croppedPortraitUrl);
        setCroppedPortraitUrl(null);
        setCropState({
            portrait: { crop: { x: 0, y: 0 }, zoom: 1, pixels: null },
            banner: { crop: { x: 0, y: 0 }, pixels: null },
            token: { crop: { x: 0, y: 0 }, zoom: 1, pixels: null },
            borderColor: '#7b3ff1',
        });
        setStep(0);
    }, [croppedPortraitUrl]);

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            resetState();
            const reader = new FileReader();
            reader.onload = () => setOriginalSrc(reader.result);
            reader.readAsDataURL(file);
        }
    }, [resetState]);
    
    const proceedToBanner = async () => {
        if (!cropState.portrait.pixels) return;
        try {
            const blob = await getCroppedBlob(originalSrc, cropState.portrait.pixels);
            if (croppedPortraitUrl) URL.revokeObjectURL(croppedPortraitUrl);
            setCroppedPortraitUrl(URL.createObjectURL(blob));
            setStep(1);
        } catch (err) {
            toast.error("Erro ao processar imagem.");
        }
    };

    const handleSave = async () => {
        try {
            setLoading(true);

            const portraitBlob = await getCroppedBlob(originalSrc, cropState.portrait.pixels);
            const portraitOptimized = await imageCompression(portraitBlob, { maxWidthOrHeight: 1024, useWebWorker: true });
            const portraitRes = await uploadImage(portraitOptimized);
            
            const tokenBlob = await getCroppedBlob(originalSrc, cropState.token.pixels);
            const tokenOptimized = await imageCompression(tokenBlob, { maxWidthOrHeight: 280, useWebWorker: true });
            const tokenRes = await uploadImage(tokenOptimized);
            
            const portraitHeight = cropState.portrait.pixels.height;
            const bannerHeight = cropState.banner.pixels.height;
            const bannerY = cropState.banner.pixels.y;
            // Garante que a divisão por zero não ocorra se o banner ocupar toda a altura
            const bannerPositionPercent = portraitHeight > bannerHeight 
                ? (bannerY / (portraitHeight - bannerHeight)) * 100 
                : 50;


            onDone({
                portraitImage: portraitRes.public_id,
                tokenImage: tokenRes.public_id,
                bannerPosition: Math.round(bannerPositionPercent),
                tokenBorderColor: cropState.borderColor,
            });

            toast.success('Imagens atualizadas!');
            onClose();
        } catch (err) {
            console.error(err);
            toast.error('Falha ao enviar as imagens.');
        } finally {
            setLoading(false);
        }
    };
    
    return {
        step, setStep, loading, originalSrc, onDrop,
        cropState, updateCropState, resetState,
        croppedPortraitUrl, proceedToBanner,
        handleSave,
    };
};