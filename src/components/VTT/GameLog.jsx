// src/components/VTT/GameLog.jsx
import React, { useState, useEffect, useRef } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useRoom } from '../../contexts/RoomContext';
import { 
    LogContainer, LogItem, LogHeader, LogInfo, LogCharacter, LogUser, 
    LogRoll, LogResult, LogTotal, LogBreakdown 
} from './styles'; // Usaremos os novos estilos

const formatResult = (roll) => {
    const dicePart = roll.individualResults.map(r => {
        if (r === 1) return `<strong class="fumble">${r}</strong>`;
        if (r >= roll.critThreshold) return `<strong class="crit">${r}</strong>`;
        return r;
    }).join(' + ');

    const modsPart = (roll.modifiers || []).map(m => ` ${m.value >= 0 ? '+' : '-'} ${Math.abs(m.value)}`).join('');
    return `[${dicePart}]${modsPart}`;
};

export const GameLog = () => {
    const { roomId } = useRoom();
    const [logs, setLogs] = useState([]);
    const logContainerRef = useRef(null);

    useEffect(() => {
        const logColRef = collection(db, 'rooms', roomId, 'rolls');
        const q = query(logColRef, orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setLogs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsubscribe();
    }, [roomId]);

    useEffect(() => {
        if(logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <LogContainer ref={logContainerRef}>
            {logs.slice().reverse().map(log => (
                <LogItem 
                    key={log.id}
                    $hidden={log.hidden}
                    $isAllCrits={log.isAllCrits}
                    $isFumble={log.isFumble}
                >
                    <LogHeader>
                        <LogInfo>
                            <LogCharacter>{log.user.character || log.user.name}</LogCharacter>
                            {log.user.character && <LogUser>({log.user.name})</LogUser>}
                        </LogInfo>
                        <LogRoll>{log.macroName || log.command}</LogRoll>
                    </LogHeader>
                    <LogResult>
                        <LogBreakdown dangerouslySetInnerHTML={{ __html: formatResult(log) }} />
                        <LogTotal>{log.total}</LogTotal>
                    </LogResult>
                </LogItem>
            ))}
        </LogContainer>
    );
};