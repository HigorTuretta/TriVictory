// src/components/VTT/MacroManager.jsx
import React, { useState, useEffect } from 'react';
import { MacroList, MacroItem, MacroInfo, MacroControls, MacroForm } from './styles';
import { FaPen, FaTrash, FaPlus, FaSave } from 'react-icons/fa';

const newMacroTemplate = { name: '', command: '' };

export const MacroManager = ({ macros, addMacro, updateMacro, deleteMacro }) => {
    const [formState, setFormState] = useState(newMacroTemplate);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        if (editingId) {
            const macroToEdit = macros.find(m => m.id === editingId);
            if (macroToEdit) setFormState(macroToEdit);
        } else {
            setFormState(newMacroTemplate);
        }
    }, [editingId, macros]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (editingId) {
            updateMacro(formState);
            setEditingId(null);
        } else {
            addMacro(formState);
        }
        setFormState(newMacroTemplate);
    };

    return (
        <div>
            <MacroList>
                {macros.length > 0 ? macros.map(macro => (
                    <MacroItem key={macro.id}>
                        <MacroInfo>
                            <p>{macro.name}</p>
                            <span>{macro.command}</span>
                        </MacroInfo>
                        <MacroControls>
                            <button onClick={() => setEditingId(macro.id)}><FaPen /></button>
                            <button onClick={() => deleteMacro(macro.id)}><FaTrash /></button>
                        </MacroControls>
                    </MacroItem>
                )) : <p>Nenhuma macro criada.</p>}
            </MacroList>
            
            <MacroForm>
                <h5>{editingId ? 'Editar Macro' : 'Criar Nova Macro'}</h5>
                <input name="name" value={formState.name} onChange={handleChange} placeholder="Nome (Ex: Ataque de Espada)" />
                <input name="command" value={formState.command} onChange={handleChange} placeholder="Comando (Ex: 1d6+Poder+2)" />
                <button onClick={handleSave}>
                    {editingId ? <><FaSave /> Salvar Alterações</> : <><FaPlus /> Adicionar Macro</>}
                </button>
                {editingId && <button onClick={() => setEditingId(null)} style={{background: 'grey'}}>Cancelar Edição</button>}
            </MacroForm>
        </div>
    );
};