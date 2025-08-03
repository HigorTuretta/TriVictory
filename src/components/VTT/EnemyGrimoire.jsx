// src/components/VTT/EnemyGrimoire.jsx
import React, { useState } from 'react';
import { useGrimoire } from '../../hooks/useGrimoire';
import { GrimoireList, EnemyCard, EnemyTokenPreview, EnemyInfo, EnemyForm } from './styles';
import { TokenCropperModal } from './TokenCropperModal';
import { getTokenImageUrl } from '../../services/cloudinaryService';

const newEnemyTemplate = {
    name: '', imageUrl: '', pv: 10, pm: 10, pa: 1,
    attributes: { poder: 1, habilidade: 1, resistencia: 1 },
    rollCommand: '1d6+Habilidade', // Padrão mais comum
};

const EnemyItem = ({ enemy }) => {
    const handleDragStart = (e) => {
        const enemyData = JSON.stringify(enemy);
        e.dataTransfer.setData('application/vtt-enemy', enemyData);
    };

    return (
        <EnemyCard draggable onDragStart={handleDragStart}>
            <EnemyTokenPreview src={getTokenImageUrl(enemy.imageUrl) || `https://api.dicebear.com/8.x/bottts/svg?seed=${enemy.name}`} />
            <EnemyInfo>
                <p>{enemy.name}</p>
                <span>PV: {enemy.pv} | PM: {enemy.pm} | PA: {enemy.pa}</span>
            </EnemyInfo>
        </EnemyCard>
    );
};

export const EnemyGrimoire = () => {
    const { enemies, loading, addEnemy } = useGrimoire();
    const [formState, setFormState] = useState(newEnemyTemplate);
    const [isCropperOpen, setIsCropperOpen] = useState(false);
    const [imageToCrop, setImageToCrop] = useState(null);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        
        if (name.startsWith('attr_')) {
            const attr = name.split('_')[1];
            setFormState(prev => ({ ...prev, attributes: { ...prev.attributes, [attr]: parseInt(value) || 0 } }));
        } else {
            setFormState(prev => ({ ...prev, [name]: type === 'number' ? parseInt(value) || 0 : value }));
        }
    };
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageToCrop(reader.result);
                setIsCropperOpen(true);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleCropComplete = (publicId) => {
        setFormState(prev => ({ ...prev, imageUrl: publicId }));
    };

    const handleAddEnemy = () => {
        if (!formState.name.trim() || !formState.imageUrl.trim()) return;
        addEnemy(formState);
        setFormState(newEnemyTemplate);
    };

    if (loading) return <p>Carregando grimório...</p>;

    return (
        <>
            <GrimoireList>
                {enemies.length > 0 ? (
                    enemies.map(enemy => <EnemyItem key={enemy.id} enemy={enemy} />)
                ) : (
                    <p>Nenhum inimigo no grimório. Adicione um abaixo!</p>
                )}
            </GrimoireList>

            <EnemyForm>
                <input name="name" value={formState.name} onChange={handleChange} placeholder="Nome do Inimigo" />
                <input name="imageUrl" value={formState.imageUrl} onChange={handleChange} placeholder="Cole a URL ou faça upload" />

                <label htmlFor="enemy-token-upload" className="file-upload-button" style={{ gridColumn: '1 / -1', textAlign: 'center', cursor: 'pointer', background: '#555', padding: '8px', borderRadius: '4px' }}>
                    Selecionar Imagem do Token
                </label>
                <input id="enemy-token-upload" type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                
                {/* CORREÇÃO: Adicionados labels para clareza */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <label>PV</label><input name="pv" type="number" value={formState.pv} onChange={handleChange} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <label>PM</label><input name="pm" type="number" value={formState.pm} onChange={handleChange} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <label>Poder</label><input name="attr_poder" type="number" value={formState.attributes.poder} onChange={handleChange} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <label>Habilidade</label><input name="attr_habilidade" type="number" value={formState.attributes.habilidade} onChange={handleChange} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <label>Resistência</label><input name="attr_resistencia" type="number" value={formState.attributes.resistencia} onChange={handleChange} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <label>PA</label><input name="pa" type="number" value={formState.pa} onChange={handleChange} />
                </div>
                
                <button onClick={handleAddEnemy}>+ Adicionar Inimigo</button>
            </EnemyForm>

            {isCropperOpen && (
                <TokenCropperModal 
                    isOpen={isCropperOpen}
                    onClose={() => setIsCropperOpen(false)}
                    onComplete={handleCropComplete}
                    imageSrc={imageToCrop}
                />
            )}
        </>
    );
};