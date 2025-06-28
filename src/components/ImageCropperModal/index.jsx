//src\components\ImageCropperModal\index.jsx
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Cropper from 'react-easy-crop';
import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';
import { HexColorPicker } from 'react-colorful';
import toast from 'react-hot-toast';
import {
  FaSearchPlus,
  FaSearchMinus,
  FaCloudUploadAlt,
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaTimes
} from 'react-icons/fa';

import { Modal } from '../Modal';
import {
  uploadImage,
  resizeImageFile
} from '../../services/cloudinaryService';

import {
  Body,
  DropZone,
  CropArea,
  Controls,
  Range,
  Btn,
  Stepper,
  ColorWrap,
  Preview
} from './styles';

const BANNER_RATIO = 14 / 4;
const TOKEN_RATIO = 1;
export const ImageCropperModal = ({ open, onClose, onDone }) => {
  const [step, setStep] = useState(0); // 0-banner, 1-token, 2-border
  const [src, setSrc] = useState(null);

  /* banner crop (antes era portrait) */
  const [cropB, setCropB] = useState({ x: 0, y: 0 });
  const [zoomB, setZoomB] = useState(1);
  const [pixelsB, setPixelsB] = useState(null);

  /* token crop (sem alteração) */
  const [cropT, setCropT] = useState({ x: 0, y: 0 });
  const [zoomT, setZoomT] = useState(1);
  const [pixelsT, setPixelsT] = useState(null);

  // ... (restante dos states inalterados) ...

  const [border, setBorder] = useState('#7b3ff1');
  const [loading, setLoading] = useState(false);

  // ... (funções onDrop, createImage, getBlob inalteradas) ...
  const onDrop = useCallback((files) => {
    const file = files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setSrc(reader.result);
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  });

  const createImage = (url) =>
    new Promise((res, rej) => {
      const img = new Image();
      img.onload = () => res(img);
      img.onerror = (e) => rej(e);
      img.crossOrigin = 'anonymous';
      img.src = url;
    });

  const getBlob = async (pixels) => {
    if (!pixels) return null;
    const img = await createImage(src);
    const canvas = document.createElement('canvas');
    canvas.width = pixels.width;
    canvas.height = pixels.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      img,
      pixels.x,
      pixels.y,
      pixels.width,
      pixels.height,
      0,
      0,
      pixels.width,
      pixels.height
    );
    return new Promise((res) => canvas.toBlob(res, 'image/jpeg', 0.9));
  };
  
  const handleSave = async () => {
    try {
      setLoading(true);

      // Otimização e Upload do Banner (1400px de largura)
      const bannerBlob = await getBlob(pixelsB);
      // Usar a lib de compressão para otimizar antes de subir
      const bannerOptimized = await imageCompression(bannerBlob, {
        maxWidthOrHeight: 1400, // Largura máxima
        useWebWorker: true,
        maxIteration: 10,
        initialQuality: 0.8,
      });
      const bannerRes = await uploadImage(bannerOptimized);

      // Otimização e Upload do Token (70x70)
      const tokenBlob = await getBlob(pixelsT);
      const tokenOptimized = await imageCompression(tokenBlob, {
        maxWidthOrHeight: 140, // Dobro do tamanho para qualidade
        useWebWorker: true,
      });
      
      // Criar a URL do token localmente é bom, mas o upload continua separado
      const tokenCanvas = document.createElement('canvas');
      tokenCanvas.width = 70;
      tokenCanvas.height = 70;
      const tCtx = tokenCanvas.getContext('2d');
      const tokenImg = await createImage(URL.createObjectURL(tokenOptimized));
      tCtx.drawImage(tokenImg, 0, 0, 70, 70);
      const miniBlob = await new Promise((r) =>
        tokenCanvas.toBlob(r, 'image/png', 0.95)
      );
      const tokenRes = await uploadImage(miniBlob);

      // Callback com as novas URLs
      onDone({
        bannerUrl: bannerRes.secure_url, // MUDOU: de portraitUrl para bannerUrl
        tokenUrl: tokenRes.secure_url,
        tokenBorderColor: border,
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


  /* ---- UI ---- */
  return (
    <Modal isOpen={open} onClose={onClose} title="Gerenciar Imagens" size="large">
      <Body>
        {!src && (
          <DropZone {...getRootProps()} $drag={isDragActive}>
            <input {...getInputProps()} />
            <FaCloudUploadAlt size={58} />
            <p>Arraste a imagem aqui ou clique para selecionar</p>
          </DropZone>
        )}

         {src && (
          <>
            <Stepper>
              {/* Texto do stepper atualizado */}
              <span className={step === 0 ? 'active' : ''}>1. Imagem de Destaque</span>
              <span className={step === 1 ? 'active' : ''}>2. Token</span>
              <span className={step === 2 ? 'active' : ''}>3. Borda do Token</span>
            </Stepper>

            {/* -------- banner step -------- */}
            {step === 0 && (
              <>
                <CropArea>
                  <Cropper
                    image={src}
                    crop={cropB} // MUDOU
                    zoom={zoomB} // MUDOU
                    aspect={BANNER_RATIO} // MUDOU
                    onCropChange={setCropB} // MUDOU
                    onZoomChange={setZoomB} // MUDOU
                    onCropComplete={(_, px) => setPixelsB(px)} // MUDOU
                  />
                </CropArea>
                {/* Controles para o zoom do banner */}
                <Controls>
                    <Btn onClick={() => setZoomB(Math.max(1, zoomB - 0.25))}>
                        <FaSearchMinus />
                    </Btn>
                    <Range
                        type="range"
                        min={1} max={3} step={0.01}
                        value={zoomB}
                        onChange={(e) => setZoomB(Number(e.target.value))}
                    />
                    <Btn onClick={() => setZoomB(Math.min(3, zoomB + 0.25))}>
                        <FaSearchPlus />
                    </Btn>
                </Controls>
                <Btn $primary onClick={() => setStep(1)}>
                    <FaArrowRight /> Próximo
                </Btn>
              </>
            )}

            {/* -------- token step (sem alterações na lógica, apenas visual) -------- */}
            {step === 1 && (
               <>
                 <CropArea>
                   <Cropper
                     image={src}
                     crop={cropT}
                     zoom={zoomT}
                     aspect={TOKEN_RATIO}
                     cropShape="round" // Mostra um preview redondo
                     showGrid={false}
                     onCropChange={setCropT}
                     onZoomChange={setZoomT}
                     onCropComplete={(_, px) => setPixelsT(px)}
                   />
                 </CropArea>
                 {/* Controles para o zoom do token */}
                <Controls>
                    <Btn onClick={() => setZoomT(Math.max(1, zoomT - 0.25))}>
                        <FaSearchMinus />
                    </Btn>
                    <Range
                        type="range"
                        min={1} max={3} step={0.01}
                        value={zoomT}
                        onChange={(e) => setZoomT(Number(e.target.value))}
                    />
                    <Btn onClick={() => setZoomT(Math.min(3, zoomT + 0.25))}>
                        <FaSearchPlus />
                    </Btn>
                </Controls>
                 <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Btn onClick={() => setStep(0)}>
                        <FaArrowLeft /> Voltar
                    </Btn>
                    <Btn $primary onClick={() => setStep(2)}>
                        <FaArrowRight /> Próximo
                    </Btn>
                 </div>
               </>
            )}

            {/* -------- border step -------- */}
            {step === 2 && (
              <>
                <ColorWrap>
                  <HexColorPicker color={border} onChange={setBorder} />
                  <Preview $color={border} />
                </ColorWrap>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Btn onClick={() => setStep(1)}>
                    <FaArrowLeft /> Voltar
                  </Btn>
                  <Btn
                    $primary
                    disabled={loading}
                    onClick={handleSave}
                  >
                    {loading ? 'Enviando…' : <><FaCheck /> Salvar</>}
                  </Btn>
                  <Btn onClick={onClose}>
                    <FaTimes /> Cancelar
                  </Btn>
                </div>
              </>
            )}
          </>
        )}
      </Body>
    </Modal>
  );
};

ImageCropperModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onDone: PropTypes.func
};
