// src/components/VTT/EnemyGrimoire.jsx
import React, { useState } from 'react';
import { useGrimoire } from '../../hooks/useGrimoire';
import { GrimoireList, EnemyCard, EnemyTokenPreview, EnemyInfo, EnemyForm } from './styles';

const newEnemyTemplate = {
    name: '', imageUrl: '', pv: 10, pm: 10, pa: 1,
    attributes: { poder: 1, habilidade: 1, resistencia: 1 },
    rollCommand: '1d6+Poder',
};

const EnemyItem = ({ enemy }) => {
    const handleDragStart = (e) => {
        const enemyData = JSON.stringify(enemy);
        e.dataTransfer.setData('application/vtt-enemy', enemyData);
    };

    return (
        <EnemyCard draggable onDragStart={handleDragStart}>
            <EnemyTokenPreview src={enemy.imageUrl || `https://api.dicebear.com/8.x/bottts/svg?seed=${enemy.name}`} />
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

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        
        if (name.startsWith('attr_')) {
            const attr = name.split('_')[1];
            setFormState(prev => ({
                ...prev,
                attributes: { ...prev.attributes, [attr]: parseInt(value) || 0 }
            }));
        } else {
            setFormState(prev => ({ ...prev, [name]: type === 'number' ? parseInt(value) || 0 : value }));
        }
    };

    const handleAddEnemy = () => {
        if (!formState.name.trim() || !formState.imageUrl.trim()) return;
        addEnemy(formState);
        setFormState(newEnemyTemplate);
    };

    if (loading) return <p>Carregando grimório...</p>;

    return (
        <div>
            <GrimoireList>
                {enemies.length > 0 ? (
                    enemies.map(enemy => <EnemyItem key={enemy.id} enemy={enemy} />)
                ) : (
                    <p>Nenhum inimigo no grimório. Adicione um abaixo!</p>
                )}
            </GrimoireList>

            <EnemyForm>
                <input name="name" value={formState.name} onChange={handleChange} placeholder="Nome do Inimigo" />
                <input name="imageUrl" value={formState.imageUrl} onChange={handleChange} placeholder="URL da Imagem/Token" />
                <input name="pv" type="number" value={formState.pv} onChange={handleChange} placeholder="PV" />
                <input name="pm" type="number" value={formState.pm} onChange={handleChange} placeholder="PM" />
                <input name="attr_poder" type="number" value={formState.attributes.poder} onChange={handleChange} placeholder="Poder" />
                <input name="attr_habilidade" type="number" value={formState.attributes.habilidade} onChange={handleChange} placeholder="Habilidade" />
                <input name="attr_resistencia" type="number" value={formState.attributes.resistencia} onChange={handleChange} placeholder="Resistência" />
                <input name="pa" type="number" value={formState.pa} onChange={handleChange} placeholder="PA" />
                <button onClick={handleAddEnemy}>+ Adicionar Inimigo</button>
            </EnemyForm>
        </div>
    );
};