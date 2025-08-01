import { useState, useCallback } from 'react';
import { useRoom } from '../contexts/RoomContext';
import { useAuth } from '../contexts/AuthContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import toast from 'react-hot-toast';

// Função para parsear um comando de rolagem, ex: "2d6+5" ou "1d6+Poder"
const parseRollCommand = (command) => {
    const parts = command.toLowerCase().split('d');
    const numDice = parseInt(parts[0], 10);
    const rest = parts[1].split('+');
    const sides = parseInt(rest[0], 10);
    const modifiers = rest.slice(1).map(mod => {
        const num = parseInt(mod, 10);
        return isNaN(num) ? { label: mod.trim(), value: 0 } : { label: `+${num}`, value: num };
    });
    return { numDice, sides, modifiers };
};

export const useDiceRoller = (character) => {
    const { roomId } = useRoom();
    const { currentUser } = useAuth();
    
    const [isRolling, setIsRolling] = useState(false);
    const [currentRoll, setCurrentRoll] = useState(null);
    const [modifierModal, setModifierModal] = useState({ isOpen: false, initialRoll: null, resolve: null });

    const executeRoll = useCallback(async (command, baseModifiers = []) => {
        const { numDice, sides, modifiers: commandModifiers } = parseRollCommand(command);
        const allModifiers = [...baseModifiers, ...commandModifiers];

        const results = Array.from({ length: numDice }, () => Math.floor(Math.random() * sides) + 1);
        const initialSum = results.reduce((a, b) => a + b, 0);

        const initialRoll = {
            command,
            results,
            initialSum,
            modifiers: allModifiers,
        };
        
        // Abre o modal de modificadores e aguarda a interação do usuário
        const finalModifiers = await new Promise(resolve => {
            setModifierModal({ isOpen: true, initialRoll, resolve });
        });
        
        // Se o usuário cancelou o modal
        if (finalModifiers === null) return;
        
        let finalResults = [...results];
        let finalTotal = initialSum;
        const finalModifiersList = [...allModifiers];

        // Aplicar gasto de PA
        if (finalModifiers.spendPA && character && character.pa_current > 0) {
            finalResults[0] = 6; // Garante um 6
            finalTotal = finalResults.reduce((a, b) => a + b, 0);
            finalModifiersList.push({ label: 'Gasto de PA', value: '1d=6' });
            // Lógica para atualizar o PA do personagem no DB seria aqui
        }

        // Adicionar modificador da popup
        if (finalModifiers.modifier !== 0) {
            finalTotal += finalModifiers.modifier;
            finalModifiersList.push({ label: 'Modificador', value: finalModifiers.modifier });
        }

        // Lógica de Crítico
        const critThreshold = finalModifiers.critOnFive ? 5 : 6;
        const crits = finalResults.filter(r => r >= critThreshold).length;
        if (crits > 0) {
             // Lógica de dobrar atributo se todos os dados forem críticos
             // (simplificado por agora, pode ser expandido)
        }

        const finalRollData = {
            ...initialRoll,
            total: finalTotal,
            modifiers: finalModifiersList,
            critThreshold,
            timestamp: serverTimestamp(),
            hidden: finalModifiers.isHidden,
            user: {
                uid: currentUser.uid,
                name: currentUser.nickname,
                character: character?.name || null,
            }
        };

        setCurrentRoll(finalRollData);
        setIsRolling(true);

        // Salva no log do Firestore
        await addDoc(collection(db, 'rooms', roomId, 'rolls'), finalRollData);
        
    }, [roomId, currentUser, character]);

    return {
        isRolling,
        currentRoll,
        executeRoll,
        modifierModal,
        setModifierModal,
        onAnimationComplete: () => setIsRolling(false),
    };
};