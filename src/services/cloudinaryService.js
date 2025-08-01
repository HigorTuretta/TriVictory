// src/services/cloudinaryService.js

// --- Configuração e Validação ---
const CLOUDINARY_CONFIG = {
  CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  UPLOAD_PRESET: 'trivictory_preset',
};

if (!CLOUDINARY_CONFIG.CLOUD_NAME) {
  throw new Error("Variável de ambiente 'VITE_CLOUDINARY_CLOUD_NAME' não está definida.");
}

const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.CLOUD_NAME}/image/upload`;
const BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CONFIG.CLOUD_NAME}/image/upload`;

// --- Funções de Upload ---
const _uploadFile = async (file, extraFormData = {}) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_CONFIG.UPLOAD_PRESET);

  for (const key in extraFormData) {
    formData.append(key, extraFormData[key]);
  }

  try {
    const response = await fetch(UPLOAD_URL, { method: 'POST', body: formData });
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
  return _uploadFile(imageFile);
};

// --- Funções Auxiliares de URL (Tornadas Robustas) ---

/**
 * Gera uma URL otimizada para o token do personagem.
 * Lida tanto com public_id quanto com URLs completas para retrocompatibilidade.
 */
export const getTokenImageUrl = (publicIdOrUrl, borderColor = '#7b3ff1') => {
  if (!publicIdOrUrl) return '';
  // Se já for uma URL completa, retorna diretamente.
  if (publicIdOrUrl.startsWith('http')) {
    return publicIdOrUrl;
  }
  
  const cloudinaryColor = `rgb:${borderColor.substring(1)}`;
  const transformations = [
    'w_140,h_140', 'c_fill,g_face', 'r_max', 'f_auto,q_auto',
    `bo_6px_solid_${cloudinaryColor}`,
  ].join(',');
  
  return `${BASE_URL}/${transformations}/${publicIdOrUrl}`;
};

/**
 * Gera uma URL otimizada para a imagem principal.
 * Lida tanto com public_id quanto com URLs completas para retrocompatibilidade.
 */
export const getMainImageUrl = (publicIdOrUrl) => {
  if (!publicIdOrUrl) return '';
  // Se já for uma URL completa, retorna diretamente.
  if (publicIdOrUrl.startsWith('http')) {
    return publicIdOrUrl;
  }
  
  const transformations = ['w_1024', 'c_fill,g_auto', 'f_auto,q_auto'].join(',');
  
  return `${BASE_URL}/${transformations}/${publicIdOrUrl}`;
};