import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { WindowContainer, WindowHeader, WindowTitle, CloseButton, WindowBody } from './styles';
import { FaTimes } from 'react-icons/fa';

export const FloatingWindow = ({ title, children, isOpen, onClose, initialPosition = { x: 100, y: 100 } }) => {
    const nodeRef = useRef(null);

    if (!isOpen) return null;

    return (
        <Draggable
            handle=".window-header"
            nodeRef={nodeRef} // CORREÇÃO: Usa nodeRef para evitar findDOMNode
            bounds="parent"
        >
            <WindowContainer ref={nodeRef} style={{ position: 'absolute', top: initialPosition.y, left: initialPosition.x }}>
                <WindowHeader className="window-header">
                    <WindowTitle>{title}</WindowTitle>
                    <CloseButton onClick={onClose} title="Fechar">
                        <FaTimes />
                    </CloseButton>
                </WindowHeader>
                <WindowBody>
                    {children}
                </WindowBody>
            </WindowContainer>
        </Draggable>
    );
};