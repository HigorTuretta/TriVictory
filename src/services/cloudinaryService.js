// src/services/cloudinaryService.js
import { Cloudinary } from 'cloudinary-core';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

// Configuração do Cloudinary
const cloudinary = new Cloudinary({
  cloud_name: CLOUD_NAME,
  secure: true
});

/* ------------------------------------------------------------------ */
/* UPLOAD                                                             */
/* ------------------------------------------------------------------ */
export const uploadImage = async (file, extraFormData = {}) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'trivictory_preset');
  Object.entries(extraFormData).forEach(([k, v]) => formData.append(k, v));

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  );
  if (!res.ok) throw new Error('Falha no upload');
  return res.json();
};

/* ------------------------------------------------------------------ */
/* URL HELPERS                                                        */
/* ------------------------------------------------------------------ */
export const getTokenImageUrl = (publicId, borderColor = '#7b3ff1') =>
  cloudinary.url(publicId, {
    width: 70,
    height: 70,
    crop: 'fill',
    gravity: 'face',
    radius: 'max',
    quality: 'auto',
    fetch_format: 'auto',
    border: `3px_solid_${borderColor.replace('#', 'rgb:')}`,
    background: 'transparent'
  });

export const getMainImageUrl = (publicId) =>
  cloudinary.url(publicId, {
    width: 1024,
    height: 1536,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto',
    fetch_format: 'auto'
  });

/* ------------------------------------------------------------------ */
/* RESIZE LOCAL (canvas)                                              */
/* ------------------------------------------------------------------ */
export const resizeImageFile = (
  file,
  maxWidth = 1024,
  maxHeight = 1536,
  quality = 0.85
) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;

      if (width / height > maxWidth / maxHeight) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(img, 0, 0, width, height);
      canvas.toBlob(resolve, 'image/jpeg', quality);
    };
    img.src = URL.createObjectURL(file);
  });
