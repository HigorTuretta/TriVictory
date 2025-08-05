// src/hooks/useDiceRoller.js
import { useState, useCallback } from 'react';
import { useRoom } from '../contexts/RoomContext';
import { useAuth } from '../contexts/AuthContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import toast from 'react-hot-toast';

// MODIFICADO: A função agora é mais robusta contra character nulo
const parseRollCommand = (command, character) => {
    let numDice = 0;
    let sides = 6;
    const modifiers = [];
    const cleanCommand = command.toLowerCase().replace(/\s/g, '');
    const diceRegex = /(\d+)d(\d+)/;
    const diceMatch = cleanCommand.match(diceRegex);
    if (diceMatch) {
        numDice = parseInt(diceMatch[1], 10);
        sides = parseInt(diceMatch[2], 10);
    } else if (cleanCommand.startsWith('d')) {
        numDice = 1;
        sides = parseInt(cleanCommand.substring(1), 10);
    } else if (!isNaN(parseInt(cleanCommand, 10))) {
        // Permite rolagens de apenas um número como se fossem 1d...
        numDice = 1;
        sides = parseInt(cleanCommand, 10);
    }

    const modsString = cleanCommand.replace(diceRegex, '');
    const modParts = modsString.split(/[+-]/).filter(Boolean);
    let remainingMods = modsString;
    for (const part of modParts) {
        const operatorIndex = remainingMods.indexOf(part);
        const operator = remainingMods[operatorIndex - 1] || '+';
        remainingMods = remainingMods.substring(operatorIndex + part.length);
        const num = parseInt(part, 10);
        if (!isNaN(num)) {
            const value = operator === '+' ? num : -num;
            modifiers.push({ label: `${operator}${num}`, value });
        } else if (character && character.attributes) { // Essa checagem é a chave
            const attr = part.trim();
            if (Object.keys(character.attributes).includes(attr)) {
                const attrValue = character.attributes[attr];
                if (typeof attrValue === 'number') {
                    const value = operator === '+' ? attrValue : -attrValue;
                    modifiers.push({ label: attr.charAt(0).toUpperCase() + attr.slice(1), value });
                }
            }
        }
    }
    return { numDice, sides, modifiers };
};

export const useDiceRoller = (character, updateCharacter) => {
    const { roomId, room } = useRoom();
    const { currentUser } = useAuth();
    const isMaster = room?.masterId === currentUser.uid;
    
    const [isRolling, setIsRolling] = useState(false);
    const [currentRoll, setCurrentRoll] = useState(null);
    const [modifierModal, setModifierModal] = useState({ isOpen: false, resolve: null });

    const executeRoll = useCallback(async (baseCommand, baseModifiers = [], onComplete, macroName = null) => {
        // CORREÇÃO: Garante que charForRoll seja sempre um objeto, mesmo que 'character' seja nulo.
        const charForRoll = character || { attributes: {}, pa_current: 0, name: null };
        const userMods = await new Promise(resolve => { setModifierModal({ isOpen: true, resolve }); });
        
        if (userMods === null) return null;

        // A chamada a parseRollCommand agora é segura.
        const { numDice, modifiers: commandModifiers } = parseRollCommand(baseCommand, charForRoll);
        if (numDice === 0) {
            toast.error("Comando de rolagem inválido.");
            return null;
        }

        let finalDice = numDice;
        let results = [];
        let allModifiersForLog = [...baseModifiers, ...commandModifiers];
        let wasPaSpent = false;

        if (userMods.spendPA && charForRoll.pa_current > 0 && updateCharacter) {
            finalDice -= 1;
            results.push(6);
            wasPaSpent = true;
            updateCharacter({ pa_current: charForRoll.pa_current - 1 });
            toast.success("Você gastou 1 PA para garantir um sucesso!", { icon: '✨'});
        }
        
        for (let i = 0; i < finalDice; i++) { results.push(Math.floor(Math.random() * 6) + 1); }

        const critThreshold = userMods.critOnFive ? 5 : 6;
        const crits = results.filter(r => r >= critThreshold).length;
        const fumbles = results.filter(r => r === 1).length;
        
        let total = results.reduce((a, b) => a + b, 0);
        const primaryAttributeModifier = allModifiersForLog.find(m => ['Poder', 'Habilidade', 'Resistência'].includes(m.label));
        const attributeBaseValue = primaryAttributeModifier ? primaryAttributeModifier.value : 0;
        const effectiveAttributeValue = attributeBaseValue + userMods.modifier;

        allModifiersForLog.forEach(m => total += m.value);
        if (userMods.modifier !== 0) {
            total += userMods.modifier;
            allModifiersForLog.push({ label: 'Modificador', value: userMods.modifier });
        }
        
        if (crits > 0 && primaryAttributeModifier) {
            const critBonusTotal = crits * effectiveAttributeValue;
            total += critBonusTotal;
            allModifiersForLog.push({ label: `Crítico (x${crits})`, value: critBonusTotal });
        }

        const localRollData = {
            command: baseCommand, macroName, individualResults: results, modifiers: allModifiersForLog, total,
            critThreshold, isCrit: crits > 0, isAllFumbles: fumbles > 0 && fumbles === results.length, wasPaSpent,
            hidden: isMaster ? userMods.isHidden : false,
            user: { uid: currentUser.uid, name: currentUser.nickname, character: charForRoll.name || (isMaster ? 'Mestre' : null) }
        };
        
        const firestoreRollData = { ...localRollData, timestamp: new Date() };
        setCurrentRoll(localRollData);
        setIsRolling(true);

        try { await addDoc(collection(db, 'rooms', roomId, 'rolls'), firestoreRollData); } 
        catch (error) { toast.error("Falha ao registrar a rolagem."); setIsRolling(false); return null; }
        
        if (onComplete) onComplete(localRollData);
        return localRollData;

    }, [roomId, currentUser, character, isMaster, updateCharacter]);

    const onAnimationComplete = useCallback(() => setIsRolling(false), []);
    const closeModifierModal = useCallback((value) => {
        if (modifierModal.resolve) modifierModal.resolve(value);
        setModifierModal({ isOpen: false, resolve: null });
    }, [modifierModal]);

    return { isRolling, currentRoll, executeRoll, onAnimationComplete, isModifierModalOpen: modifierModal.isOpen, closeModifierModal };
};