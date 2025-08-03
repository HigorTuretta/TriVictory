// src/hooks/useDiceRoller.js
import { useState, useCallback } from 'react';
import { useRoom } from '../contexts/RoomContext';
import { useAuth } from '../contexts/AuthContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import toast from 'react-hot-toast';

const parseRollCommand = (command, character) => {
    // ...código da função parseRollCommand sem alterações...
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
        } else if (character && character.attributes) {
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
    const isMaster = room.masterId === currentUser.uid;
    
    const [isRolling, setIsRolling] = useState(false);
    const [currentRoll, setCurrentRoll] = useState(null);
    const [modifierModal, setModifierModal] = useState({ isOpen: false, resolve: null });

    // MODIFICADO: A função agora aceita `macroName`
    const executeRoll = useCallback(async (baseCommand, baseModifiers = [], onComplete, macroName = null) => {
        const charForRoll = character || { attributes: {}, pa_current: 0 };
        const userMods = await new Promise(resolve => { setModifierModal({ isOpen: true, resolve }); });
        
        if (userMods === null) return;

        const { numDice, sides, modifiers: commandModifiers } = parseRollCommand(baseCommand, charForRoll);
        if (numDice === 0) return toast.error("Comando de rolagem inválido.");

        let finalDice = numDice;
        let results = [];
        let tempModifiers = [...baseModifiers, ...commandModifiers];
        
        if (userMods.spendPA && charForRoll.pa_current > 0 && updateCharacter) {
            finalDice -= 1;
            results.push(6);
            tempModifiers.push({ label: 'Gasto de PA', value: 0 });
            updateCharacter({ pa_current: charForRoll.pa_current - 1 });
            toast.success("Você gastou 1 PA para garantir um sucesso!", { icon: '✨'});
        }
        
        for (let i = 0; i < finalDice; i++) {
            results.push(Math.floor(Math.random() * 6) + 1);
        }

        let total = results.reduce((a, b) => a + b, 0);
        tempModifiers.forEach(m => total += m.value);
        if (userMods.modifier !== 0) {
            total += userMods.modifier;
            tempModifiers.push({ label: 'Modificador', value: userMods.modifier });
        }
        
        const critThreshold = userMods.critOnFive ? 5 : 6;
        const crits = results.filter(r => r >= critThreshold).length;
        const fumbles = results.filter(r => r === 1).length;

        const localRollData = {
            command: baseCommand, 
            macroName: macroName, // NOVO: Salva o nome do macro
            individualResults: results, 
            modifiers: tempModifiers, 
            total,
            critThreshold, 
            isAllCrits: crits > 0 && crits === results.length, // NOVO: Flag para crítico total
            isFumble: fumbles > 0, // Ajustado para ser mais genérico
            hidden: isMaster ? userMods.isHidden : false,
            user: {
                uid: currentUser.uid, 
                name: currentUser.nickname,
                character: charForRoll.name || (isMaster ? 'Mestre' : null),
            }
        };

        setCurrentRoll(localRollData);
        setIsRolling(true);
        const firestoreRollData = { ...localRollData, timestamp: serverTimestamp() };
        try {
            await addDoc(collection(db, 'rooms', roomId, 'rolls'), firestoreRollData);
        } catch (error) {
            toast.error("Falha ao registrar a rolagem.");
            setIsRolling(false);
            return;
        }
        if (onComplete) onComplete(localRollData);
    }, [roomId, currentUser, character, isMaster, updateCharacter]);

    const onAnimationComplete = useCallback(() => setIsRolling(false), []);
    
    const closeModifierModal = useCallback((value) => {
        if (modifierModal.resolve) modifierModal.resolve(value);
        setModifierModal({ isOpen: false, resolve: null });
    }, [modifierModal]);

    return {
        isRolling, currentRoll, executeRoll,
        onAnimationComplete, isModifierModalOpen: modifierModal.isOpen,
        closeModifierModal,
    };
};