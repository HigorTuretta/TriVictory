// src/services/cloudinaryService.js

// --- Configuração e Validação ---
const CLOUDINARY_CONFIG = {
  CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  UPLOAD_PRESET: 'trivictory_preset',
};

if (!CLOUDINARY_CONFIG.CLOUD_NAME) {
  throw new Error("Variável de ambiente 'VITE_CLOUDINARY_CLOUD_NAME' não está definida.");
}

// CORREÇÃO FINAL: Garante que AMBAS as URLs usem exatamente o mesmo CLOUD_NAME.
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.CLOUD_NAME}/image/upload`;
const AUDIO_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.CLOUD_NAME}/video/upload`; 
const BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CONFIG.CLOUD_NAME}/image/upload`;

// --- Funções de Upload ---
const _uploadFile = async (file, resourceType = 'image') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_CONFIG.UPLOAD_PRESET);

  const uploadUrl = resourceType === 'audio' ? AUDIO_UPLOAD_URL : UPLOAD_URL;
  // Este 'resource_type' é necessário para que a API saiba como processar o arquivo.
  if(resourceType === 'audio') {
      formData.append('resource_type', 'video');
  }

  try {
    const response = await fetch(uploadUrl, { method: 'POST', body: formData });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message || 'Falha no upload para o Cloudinary');
    }
    return response.json();
  } catch (error) {
    console.error('Erro no serviço Cloudinary:', error);
    throw error;
  }
};

export const uploadImage = (imageFile) => {
  return _uploadFile(imageFile, 'image');
};

export const uploadAudio = (audioFile) => {
    const acceptedTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg'];
    if (!acceptedTypes.includes(audioFile.type)) {
        throw new Error('Tipo de arquivo de áudio inválido. Apenas MP3, WAV e OGG são permitidos.');
    }
    const maxSize = 20 * 1024 * 1024; // 20 MB
    if (audioFile.size > maxSize) {
        throw new Error('O arquivo de áudio é muito grande. O limite é de 20MB.');
    }

    return _uploadFile(audioFile, 'audio');
};

// --- Funções Auxiliares de URL ---
export const getTokenImageUrl = (publicIdOrUrl, borderColor = '#7b3ff1') => {
  if (!publicIdOrUrl) return '';
  if (publicIdOrUrl.startsWith('http')) return publicIdOrUrl;
  
  const cloudinaryColor = `rgb:${borderColor.substring(1)}`;
  const transformations = ['w_140,h_140', 'c_fill,g_face', 'r_max', 'f_auto,q_auto', `bo_6px_solid_${cloudinaryColor}`].join(',');
  return `${BASE_URL}/${transformations}/${publicIdOrUrl}`;
};

export const getMainImageUrl = (publicIdOrUrl) => {
  if (!publicIdOrUrl) return '';
  if (publicIdOrUrl.startsWith('http')) return publicIdOrUrl;
  const transformations = ['w_1024', 'c_fill,g_auto', 'f_auto,q_auto'].join(',');
  return `${BASE_URL}/${transformations}/${publicIdOrUrl}`;
};