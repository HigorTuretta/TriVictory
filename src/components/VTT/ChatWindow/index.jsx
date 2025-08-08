// src/components/VTT/ChatWindow/index.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useRoom } from '../../../contexts/RoomContext';
import { useCurrentPlayerCharacter } from '../../../hooks/useCurrentPlayerCharacter';
import { FaTrash } from 'react-icons/fa'; // Importa o ícone de lixo
import { ConfirmModal } from '../../ConfirmModal'; // Importa o modal de confirmação
import {
    ChatContainer, MessageList, MessageItem, Sender, Text, Timestamp, ChatForm,
    ChatInput, SendButton, FormControls, RecipientSelect, ChatInputWrapper,
    SenderToggleContainer, ToggleSwitch, Slider, SenderToggleLabel,
    DeleteMessageButton,  ClearChatButton // Novos imports
} from './styles';

export const ChatWindow = ({ messages, sendMessage, deleteMessage, clearChat }) => {
    const { currentUser } = useAuth();
    const { room } = useRoom();
    const { character } = useCurrentPlayerCharacter();
    const [isConfirmingClear, setIsConfirmingClear] = useState(false);
    const [text, setText] = useState('');
    const [recipient, setRecipient] = useState('all');
    const [sendAsCharacter, setSendAsCharacter] = useState(false);

    const messagesEndRef = useRef(null);
    const isMaster = room?.masterId === currentUser.uid;

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        const senderName = sendAsCharacter && character ? character.name : currentUser.nickname;
        sendMessage(text, senderName, recipient);
        setText('');
    };

    // Permite enviar com "Enter" e criar nova linha com "Shift + Enter"
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend(e);
        }
    }

    const formatTime = (firebaseTimestamp) => {
        if (!firebaseTimestamp) return '';
        return new Date(firebaseTimestamp.seconds * 1000).toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleConfirmClear = () => {
        clearChat();
        setIsConfirmingClear(false);
    };

    // --- CORREÇÃO DE LÓGICA DE PERMISSÃO ---
    // Agora, jogadores normais só podem enviar mensagens para "Todos" ou para o "Mestre".
    // O Mestre pode enviar para todos ou em privado para cada jogador.
    const recipientOptions = [
        { value: 'all', label: 'Todos na Sala' },
        { value: 'master', label: 'Apenas para o Mestre' },
    ];
    if (isMaster) {
        const playerOptions = (room?.members || [])
            .filter(m => m.uid !== currentUser.uid)
            .map(m => ({ value: m.uid, label: `Para: ${m.nickname} (Privado)` }));
        recipientOptions.push(...playerOptions);
    }

    return (
        <>
            <ConfirmModal
                isOpen={isConfirmingClear}
                onClose={() => setIsConfirmingClear(false)}
                onConfirm={handleConfirmClear}
                title="Limpar Histórico do Chat?"
                message="Esta ação é irreversível e irá apagar todas as mensagens da sala para todos os jogadores."
                confirmVariant="confirm"
            />

            <ChatContainer>


                <MessageList>
                    {messages.map(msg => {
                        const isSender = msg.senderId === currentUser.uid;
                        const isPrivate = msg.recipient !== 'all';
                        return (
                            <MessageItem key={msg.id} $isSender={isSender} $isPrivate={isPrivate}>
                                {isMaster  && (
                                    <DeleteMessageButton onClick={() => deleteMessage(msg.id)} title="Remover mensagem">
                                        <FaTrash />
                                    </DeleteMessageButton>
                                )}
                                <Sender>{msg.senderName}{isPrivate && <span> (privado)</span>}</Sender>
                                <Text>{msg.text}</Text>
                                <Timestamp>{formatTime(msg.timestamp)}</Timestamp>
                            </MessageItem>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </MessageList>
                <ChatForm onSubmit={handleSend}>
                    <ChatInputWrapper>
                        <ChatInput
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Digite sua mensagem..."
                            rows={1}
                        />
                        <FormControls>
                            <RecipientSelect value={recipient} onChange={(e) => setRecipient(e.target.value)}>
                                {recipientOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                            </RecipientSelect>

                            {character && (
                                <SenderToggleContainer>
                                    <SenderToggleLabel>{currentUser.nickname}</SenderToggleLabel>
                                    <ToggleSwitch>
                                        <input type="checkbox" checked={sendAsCharacter} onChange={() => setSendAsCharacter(s => !s)} />
                                        <Slider />
                                    </ToggleSwitch>
                                    <SenderToggleLabel>{character.name}</SenderToggleLabel>
                                </SenderToggleContainer>
                            )}

                            <SendButton type="submit">Enviar</SendButton>
                            {isMaster && (
                                <ClearChatButton onClick={() => setIsConfirmingClear(true)} title="Limpar todo o histórico">
                                    <FaTrash /> Limpar
                                </ClearChatButton>
                            )}
                        </FormControls>
                    </ChatInputWrapper>
                </ChatForm>
            </ChatContainer>
        </>
    );
};