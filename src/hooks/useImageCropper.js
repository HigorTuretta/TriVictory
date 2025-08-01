// src/hooks/useImageCropper.js
import { useState, useCallback } from 'react';
import imageCompression from 'browser-image-compression';
import toast from 'react-hot-toast';
import { uploadImage } from '../services/cloudinaryService';

// --- Função Auxiliar Pura ---
/**
 * Gera um objeto Blob a partir de uma imagem e coordenadas de corte.
 * @param {string} imageSrc - A URL da imagem (pode ser um data URL).
 * @param {object} pixelCrop - O objeto com as dimensões e posição do corte (x, y, width, height).
 * @returns {Promise<Blob|null>} O Blob da imagem cortada.
 */
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

    ctx.drawImage(
        image,
        pixelCrop.x, pixelCrop.y,
        pixelCrop.width, pixelCrop.height,
        0, 0,
        pixelCrop.width, pixelCrop.height
    );

    return new Promise((resolve) => {
        canvas.toBlob(resolve, 'image/jpeg', 0.9);
    });
};


/**
 * Hook customizado para gerenciar a lógica complexa do modal de corte de imagem.
 * Encapsula o estado, as funções de manipulação e o processo de upload.
 * @param {string} initialImage - A imagem existente do personagem, se houver.
 * @param {function} onDone - Callback a ser executado com os dados da imagem após o upload bem-sucedido.
 * @param {function} onClose - Callback para fechar o modal.
 * @returns {object} - A API do hook com estados e manipuladores para a UI.
 */
export const useImageCropper = (initialImage, onDone, onClose) => {
    const [view, setView] = useState('menu');
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [originalSrc, setOriginalSrc] = useState(null);
    
    // Estado unificado para todos os dados de corte
    const [cropState, setCropState] = useState({
        portrait: { crop: { x: 0, y: 0 }, zoom: 1, pixels: null, blobUrl: null },
        banner: { crop: { x: 0, y: 0 }, pixels: null },
        token: { crop: { x: 0, y: 0 }, zoom: 1, pixels: null },
        borderColor: '#7b3ff1',
    });

    // Função auxiliar para atualizar o estado de corte de forma segura
    const updateCropState = (type, newValues) => {
        setCropState(prev => ({
            ...prev,
            [type]: { ...prev[type], ...newValues },
        }));
    };
    
    // Função para resetar todo o estado interno
    const resetState = useCallback(() => {
        setOriginalSrc(null);
        if (cropState.portrait.blobUrl) {
            URL.revokeObjectURL(cropState.portrait.blobUrl);
        }
        setCropState({
            portrait: { crop: { x: 0, y: 0 }, zoom: 1, pixels: null, blobUrl: null },
            banner: { crop: { x: 0, y: 0 }, pixels: null },
            token: { crop: { x: 0, y: 0 }, zoom: 1, pixels: null },
            borderColor: '#7b3ff1',
        });
        setStep(0);
        setView(initialImage ? 'menu' : 'upload');
    }, [cropState.portrait.blobUrl, initialImage]);

    // Função de callback para o dropzone
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            resetState();
            const reader = new FileReader();
            reader.onload = () => {
                setOriginalSrc(reader.result);
                setView('cropping');
            };
            reader.readAsDataURL(file);
        }
    }, [resetState]);

    // Função para salvar e fazer upload das imagens
    const handleSave = async () => {
        try {
            setLoading(true);

            // Processa e faz upload do retrato
            const portraitBlob = await getCroppedBlob(originalSrc, cropState.portrait.pixels);
            const portraitOptimized = await imageCompression(portraitBlob, { maxWidthOrHeight: 1024, useWebWorker: true });
            const portraitRes = await uploadImage(portraitOptimized);
            
            // Processa e faz upload do token
            const tokenBlob = await getCroppedBlob(originalSrc, cropState.token.pixels);
            const tokenOptimized = await imageCompression(tokenBlob, { maxWidthOrHeight: 280, useWebWorker: true });
            const tokenRes = await uploadImage(tokenOptimized);

            // Calcula a posição do banner (em porcentagem)
            const bannerYPercent = (cropState.banner.pixels.y / (cropState.portrait.pixels.height - cropState.banner.pixels.height)) * 100;

            // Chama o callback onDone com os public_ids do Cloudinary
            onDone({
                portraitImage: portraitRes.public_id,
                tokenImage: tokenRes.public_id,
                bannerPosition: Math.round(bannerYPercent),
                tokenBorderColor: cropState.borderColor,
            });

            toast.success('Imagens atualizadas!');
            onClose();
        } catch (err) {
            console.error(err);
            toast.error('Falha ao enviar as imagens. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };
    
    // Retorna a "API" do hook para ser consumida pelo componente de UI
    return {
        view, setView,
        step, setStep,
        loading,
        originalSrc, setOriginalSrc,
        cropState, updateCropState,
        resetState,
        onDrop,
        handleSave,
    };
};