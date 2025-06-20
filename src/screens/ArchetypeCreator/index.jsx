import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import {
    CreatorContainer, Header, Form, FormGroup, Label, Input, Textarea,
    SaveButton, BackButton, SubSection, DynamicList, ListItem,
    AddButton, RemoveButton, ChoiceBlock
} from './styles';

export const ArchetypeCreator = ({ gameData, onSave, onExit }) => {
    const [archetype, setArchetype] = useState({
        nome: '',
        custo: 0,
        poderes: [''],
        escolhas: [],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setArchetype(prev => ({ ...prev, [name]: name === 'custo' ? parseInt(value, 10) || 0 : value }));
    };

    const handlePoderesChange = (index, value) => {
        const newPoderes = [...archetype.poderes];
        newPoderes[index] = value;
        setArchetype(prev => ({ ...prev, poderes: newPoderes }));
    };

    const addPoder = () => setArchetype(prev => ({ ...prev, poderes: [...prev.poderes, ''] }));
    const removePoder = (index) => setArchetype(prev => ({ ...prev, poderes: prev.poderes.filter((_, i) => i !== index) }));
    
    const addEscolha = () => {
        const newEscolha = { id: uuidv4(), tipo: 'vantagem', listaFiltro: [], mensagem: '' };
        setArchetype(prev => ({...prev, escolhas: [...prev.escolhas, newEscolha]}));
    };
    const removeEscolha = (id) => setArchetype(prev => ({...prev, escolhas: prev.escolhas.filter(e => e.id !== id)}));

    const handleEscolhaChange = (id, field, value) => {
        setArchetype(prev => ({
            ...prev,
            escolhas: prev.escolhas.map(e => e.id === id ? {...e, [field]: value} : e)
        }));
    };

    const handleSave = () => {
        if (!archetype.nome) {
            toast.error("O arquétipo precisa de um nome!");
            return;
        }
        onSave(archetype);
        toast.success(`Arquétipo "${archetype.nome}" salvo com sucesso!`);
    }

    return (
        <CreatorContainer>
            <BackButton onClick={onExit}>← Voltar para Ficha</BackButton>
            <Header>Criador de Arquétipo</Header>
            <Form>
                <FormGroup>
                    <Label>Nome do Arquétipo</Label>
                    <Input name="nome" value={archetype.nome} onChange={handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Custo em Pontos</Label>
                    <Input type="number" name="custo" value={archetype.custo} onChange={handleInputChange} />
                </FormGroup>

                <SubSection>
                    <Label>Poderes e Descrições</Label>
                    <DynamicList>
                        {archetype.poderes.map((poder, index) => (
                            <ListItem key={index}>
                                <Input value={poder} onChange={(e) => handlePoderesChange(index, e.target.value)} placeholder={`Descrição do Poder #${index + 1}`} />
                                <RemoveButton onClick={() => removePoder(index)}>&times;</RemoveButton>
                            </ListItem>
                        ))}
                        <AddButton type="button" onClick={addPoder}>+ Adicionar Poder</AddButton>
                    </DynamicList>
                </SubSection>

                <SubSection>
                    <Label>Escolhas Obrigatórias</Label>
                     <DynamicList>
                        {archetype.escolhas.map((escolha) => (
                           <ChoiceBlock key={escolha.id}>
                                <h4>Nova Escolha <RemoveButton onClick={() => removeEscolha(escolha.id)}>&times;</RemoveButton></h4>
                                <FormGroup>
                                    <Label>Tipo</Label>
                                    <select value={escolha.tipo} onChange={(e) => handleEscolhaChange(escolha.id, 'tipo', e.target.value)}>
                                        <option value="vantagem">Vantagem</option>
                                        <option value="desvantagem">Desvantagem</option>
                                    </select>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Mensagem do Modal</Label>
                                    <Input value={escolha.mensagem} onChange={(e) => handleEscolhaChange(escolha.id, 'mensagem', e.target.value)} placeholder="Ex: Escolha o Talento do seu..."/>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Opções Disponíveis</Label>
                                    <select 
                                        multiple 
                                        value={escolha.listaFiltro}
                                        onChange={(e) => {
                                            const options = Array.from(e.target.selectedOptions, option => option.value);
                                            handleEscolhaChange(escolha.id, 'listaFiltro', options);
                                        }}
                                        style={{height: '150px'}}
                                    >
                                        {(escolha.tipo === 'vantagem' ? gameData.vantagens : gameData.desvantagens).map(item => (
                                            <option key={item.nome} value={item.nome}>{item.nome}</option>
                                        ))}
                                    </select>
                                </FormGroup>
                           </ChoiceBlock>
                        ))}
                        <AddButton type="button" onClick={addEscolha}>+ Adicionar Bloco de Escolha</AddButton>
                    </DynamicList>
                </SubSection>

                <SaveButton type="button" onClick={handleSave}>Salvar Arquétipo</SaveButton>
            </Form>
        </CreatorContainer>
    );
};