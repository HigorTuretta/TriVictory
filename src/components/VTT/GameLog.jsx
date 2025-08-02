// src/components/VTT/GameLog.jsx
import React, { useState, useEffect, useRef } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useRoom } from '../../contexts/RoomContext';
import { LogContainer, LogEntry, RollResult, RollBreakdown } from './styles';

const formatResult = (roll) => {
    const dicePart = roll.individualResults.map(r => {
        if (r === 1) return `<strong style="color: #F44336;">${r}</strong>`;
        if (r >= roll.critThreshold) return `<strong style="color: #4CAF50;">${r}</strong>`;
        return r;
    }).join(' + ');

    const modsPart = (roll.modifiers || []).map(m => ` ${m.value >= 0 ? '+' : '-'} ${Math.abs(m.value)} <small>(${m.label})</small>`).join('');

    return `[${dicePart}]${modsPart}`;
};

export const GameLog = () => {
    const { roomId } = useRoom();
    const [logs, setLogs] = useState([]);
    const logEndRef = useRef(null);

    useEffect(() => {
        const logColRef = collection(db, 'rooms', roomId, 'rolls');
        const q = query(logColRef, orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setLogs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsubscribe();
    }, [roomId]);

    useEffect(() => {
        logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    return (
        <LogContainer>
            {logs.map(log => (
                <LogEntry key={log.id} $hidden={log.hidden}>
                    <p><strong>{log.user.name}</strong> rolou <strong>{log.command}</strong></p>
                    <RollResult>{log.total}</RollResult>
                    <RollBreakdown dangerouslySetInnerHTML={{ __html: formatResult(log) }} />
                </LogEntry>
            ))}
            <div ref={logEndRef} />
        </LogContainer>
    );
};