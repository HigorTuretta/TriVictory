// src/components/Artifacts/ArtifactBuilderModal.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Modal } from '../Modal';
import { ConfirmModal } from '../ConfirmModal';
import { qualidadesDeArtefatos, desvantagens, pericias } from '../../data/gameData';
import toast from 'react-hot-toast';
import { BuilderWrapper, Header, XpTracker, QualityGrid, QualityCard, AddCustomButton } from './styles';

export const ArtifactBuilderModal = ({ isOpen, onClose, onSave, artifactToEdit, xpBudget }) => {
    const [name, setName] = useState('');
    const [qualities, setQualities] = useState([]);
    const [customModalOpen, setCustomModalOpen] = useState(false);

    useEffect(() => {
        if (artifactToEdit) {
            setName(artifactToEdit.name);
            setQualities(artifactToEdit.qualities || []);
        } else {
            setName('');
            setQualities([]);
        }
    }, [artifactToEdit, isOpen]);

    const spentXp = useMemo(() => qualities.reduce((sum, q) => sum + q.custo, 0), [qualities]);
    const remainingXp = xpBudget - spentXp;

    const handleToggleQuality = (quality) => {
        const isSelected = qualities.some(q => q.id === quality.id);

        if (isSelected) {
            setQualities(prev => prev.filter(q => q.id !== quality.id));
        } else {
            if (remainingXp < quality.custo) {
                return toast.error("XP do Artefato insuficiente!");
            }
            setQualities(prev => [...prev, quality]);
        }
    };
    
    const handleSave = () => {
        if (!name.trim()) return toast.error("O artefato precisa de um nome.");
        const artifactData = {
            id: artifactToEdit?.id || `art-${Date.now()}`,
            name,
            qualities
        };
        onSave(artifactData);
        onClose();
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size="large">
                <BuilderWrapper>
                    <Header>
                        <input value={name} onChange={e => setName(e.target.value)} placeholder="Nome do Artefato"/>
                        <XpTracker $invalid={remainingXp < 0}>
                            XP Gasto: {spentXp} / {xpBudget} (Restam: {remainingXp})
                        </XpTracker>
                    </Header>
                    <QualityGrid>
                        {qualidadesDeArtefatos.map(q => (
                            <QualityCard 
                                key={q.nome} 
                                onClick={() => handleToggleQuality(q)} 
                                $selected={qualities.some(sq => sq.nome === q.nome)}
                                disabled={remainingXp < q.custo && !qualities.some(sq => sq.nome === q.nome)}
                            >
                                <strong>{q.nome} ({q.custo > 0 ? `+${q.custo}`: q.custo}XP)</strong>
                                <small>{q.descricao}</small>
                            </QualityCard>
                        ))}
                    </QualityGrid>
                    <AddCustomButton onClick={() => setCustomModalOpen(true)}>+ Adicionar Qualidade Customizada</AddCustomButton>
                    <button onClick={handleSave}>Salvar Artefato</button>
                </BuilderWrapper>
            </Modal>
            
            <ConfirmModal 
                isOpen={customModalOpen}
                onClose={() => setCustomModalOpen(false)}
                onConfirm={() => {}} // Lógica a ser implementada se necessário
                title="Qualidade Customizada"
                message="A criação de qualidades customizadas para artefatos é permitida, mas lembre-se que o mestre tem a palavra final sobre o custo e o funcionamento. Converse com ele!"
            />
        </>
    );
};