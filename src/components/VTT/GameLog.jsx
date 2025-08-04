// src/components/VTT/GameLog.jsx
import React, { useState, useEffect, useRef } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../../firebase/config';
import { useRoom } from '../../contexts/RoomContext';
import { useAuth } from '../../contexts/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { 
    LogContainer, LogList, LogItem, LogHeader, LogInfo, LogCharacter, LogUser, 
    LogRoll, LogResult, LogTotal, LogBreakdown, HiddenRollCard, VisibilityToggle, 
    Timestamp, LogPagination
} from './styles';

const comicPhrases = [
    "O Mestre rola os dados atrás do escudo...", "Algo se move nas sombras...",
    "Um som ecoa à distância...", "Você sente um calafrio na espinha.",
    "O destino tece seus fios invisíveis.", "Os deuses observam em silêncio.",
    "Uma trama se desenrola fora de vista...", "O Mestre esboça um sorriso enigmático."
];

const formatResult = (roll) => {
    if (!roll || !roll.individualResults) return '';

    const dicePart = roll.individualResults.map(r => {
        if (r === 1) return `<strong class="fumble">${r}</strong>`;
        if (r >= roll.critThreshold) return `<strong class="crit">${r}</strong>`;
        return r.toString();
    }).join(' + ');

    const modsPart = (roll.modifiers || [])
        .filter(m => m.value !== 0)
        .map(m => ` ${m.value > 0 ? '+' : '-'} ${Math.abs(m.value)} <small>(${m.label})</small>`)
        .join('');

    return `[${dicePart}]${modsPart}`;
};

const formatTimestamp = (timestamp) => {
    if (!timestamp?.toDate) return '';
    return new Intl.DateTimeFormat('pt-BR', {
        hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'America/Sao_Paulo'
    }).format(timestamp.toDate());
};

export const GameLog = () => {
    const { roomId } = useRoom();
    const { currentUser } = useAuth();
    const { room } = useRoom();
    const [allLogs, setAllLogs] = useState([]);
    const [visibleLogsCount, setVisibleLogsCount] = useState(10);
    const logContainerRef = useRef(null);

    const isMaster = room?.masterId === currentUser?.uid;

    useEffect(() => {
        const logColRef = collection(db, 'rooms', roomId, 'rolls');
        const q = query(logColRef, orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setAllLogs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsubscribe();
    }, [roomId]);
    
    useEffect(() => {
        if(logContainerRef.current) {
             logContainerRef.current.scrollTop = 0;
        }
    }, [visibleLogsCount]);

    const toggleVisibility = async (logId, currentVisibility) => {
        const logRef = doc(db, 'rooms', roomId, 'rolls', logId);
        await updateDoc(logRef, { hidden: !currentVisibility });
    };

    const logsToShow = allLogs.slice(0, Math.min(visibleLogsCount, 20));

    return (
        <LogContainer>
            <LogList ref={logContainerRef}>
                <AnimatePresence>
                    {logsToShow.map((log) => {
                        const isPlayerViewingHiddenRoll = log.hidden && !isMaster;
                        
                        return (
                            <LogItem
                                key={log.id}
                                $hidden={isPlayerViewingHiddenRoll}
                                $isAllCrits={log.isAllCrits && !isPlayerViewingHiddenRoll}
                                $isAllFumbles={log.isAllFumbles && !isPlayerViewingHiddenRoll}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {isPlayerViewingHiddenRoll ? (
                                    <HiddenRollCard>{comicPhrases[log.id.charCodeAt(0) % comicPhrases.length]}</HiddenRollCard>
                                ) : (
                                    <>
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
                                        <Timestamp>{formatTimestamp(log.timestamp)}</Timestamp>
                                        
                                        {isMaster && (
                                            <VisibilityToggle onClick={() => toggleVisibility(log.id, log.hidden)} title={log.hidden ? "Revelar aos jogadores" : "Ocultar dos jogadores"}>
                                                {log.hidden ? <FaEyeSlash size={12}/> : <FaEye size={12}/>}
                                            </VisibilityToggle>
                                        )}
                                    </>
                                )}
                            </LogItem>
                        );
                    })}
                </AnimatePresence>
            </LogList>
            {allLogs.length > visibleLogsCount && visibleLogsCount < 20 && (
                 <LogPagination>
                    <button onClick={() => setVisibleLogsCount(prev => prev + 10)}>
                        Carregar Mais Antigas
                    </button>
                </LogPagination>
            )}
        </LogContainer>
    );
};