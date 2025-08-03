// src/components/VTT/EnemyGrimoire.jsx
import React, { useState, useEffect } from 'react';
import { useGrimoire } from '../../hooks/useGrimoire';
import { useRoom } from '../../contexts/RoomContext';
import { FaTrash } from 'react-icons/fa';
import { GrimoireList, EnemyCard, DeleteEnemyButton, EnemyTokenPreview, EnemyInfo, EnemyForm } from './styles';
import { TokenCropperModal } from './TokenCropperModal';
import { ConfirmModal } from '../ConfirmModal';
import { getTokenImageUrl } from '../../services/cloudinaryService';

const newEnemyTemplate = {
    name: '', imageUrl: '', pv: 10, pm: 10, pa: 1,
    attributes: { poder: 1, habilidade: 1, resistencia: 1 },
    rollCommand: '1d6+Habilidade',
};

const EnemyItem = ({ enemy, onDeleteRequest }) => {
    const handleDragStart = (e) => {
        const enemyData = JSON.stringify(enemy);
        e.dataTransfer.setData('application/vtt-enemy', enemyData);
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation(); // Impede que o clique inicie um drag-and-drop
        onDeleteRequest(enemy);
    };

    return (
        <EnemyCard draggable onDragStart={handleDragStart}>
            <EnemyTokenPreview src={getTokenImageUrl(enemy.imageUrl) || `https://api.dicebear.com/8.x/bottts/svg?seed=${enemy.name}`} />
            <EnemyInfo>
                <p>{enemy.name}</p>
                <span>PV: {enemy.pv} | PM: {enemy.pm} | PA: {enemy.pa}</span>
            </EnemyInfo>
            <DeleteEnemyButton onClick={handleDeleteClick} title="Deletar Inimigo">
                <FaTrash size={14} />
            </DeleteEnemyButton>
        </EnemyCard>
    );
};

export const EnemyGrimoire = () => {
    const { enemies, loading, addEnemy, deleteEnemy } = useGrimoire();
    const { room, updateRoom } = useRoom();
    const [formState, setFormState] = useState(newEnemyTemplate);
    const [isCropperOpen, setIsCropperOpen] = useState(false);
    const [imageToCrop, setImageToCrop] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);

    useEffect(() => {
        const { poder, habilidade, resistencia } = formState.attributes;
        setFormState(prev => ({
            ...prev,
            pa: poder,
            pm: habilidade * 5,
            pv: resistencia * 5,
        }));
    }, [formState.attributes]);

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
            reader.onload = () => { setImageToCrop(reader.result); setIsCropperOpen(true); };
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

    const handleDeleteConfirm = async () => {
        if (!deleteTarget) return;
        await deleteEnemy(deleteTarget.id);
        const tokensWithoutEnemy = (room.tokens || []).filter(t => t.grimoireId !== deleteTarget.id);
        updateRoom({ tokens: tokensWithoutEnemy });
        setDeleteTarget(null);
    };

    if (loading) return <p>Carregando grimório...</p>;

    return (
        <>
            <GrimoireList>
                {enemies.length > 0 ? (
                    enemies.map(enemy => <EnemyItem key={enemy.id} enemy={enemy} onDeleteRequest={setDeleteTarget} />)
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
                
                <div><label>Poder</label><input name="attr_poder" type="number" value={formState.attributes.poder} onChange={handleChange} /></div>
                <div><label>PA (Automático)</label><input name="pa" type="number" value={formState.pa} onChange={handleChange} /></div>

                <div><label>Habilidade</label><input name="attr_habilidade" type="number" value={formState.attributes.habilidade} onChange={handleChange} /></div>
                <div><label>PM (Automático)</label><input name="pm" type="number" value={formState.pm} onChange={handleChange} /></div>

                <div><label>Resistência</label><input name="attr_resistencia" type="number" value={formState.attributes.resistencia} onChange={handleChange} /></div>
                <div><label>PV (Automático)</label><input name="pv" type="number" value={formState.pv} onChange={handleChange} /></div>
                
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
            
            <ConfirmModal
                isOpen={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDeleteConfirm}
                title={`Deletar ${deleteTarget?.name}?`}
                message="Isso removerá o inimigo do grimório e todos os seus tokens do mapa permanentemente."
            />
        </>
    );
};