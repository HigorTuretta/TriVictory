// src/components/VTT/TokenContextMenu.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaSkull, FaEye, FaEyeSlash, FaDiceD6, FaTimes } from 'react-icons/fa';
import styled, { useTheme } from 'styled-components';

const MenuOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  pointer-events: auto; /* Habilita o clique no overlay para fechar */
`;

const MenuContainer = styled.div`
  position: absolute;
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
  pointer-events: none;
`;

const MenuItem = styled(motion.div)`
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.secondary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  pointer-events: all;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  border: 2px solid ${({ theme }) => theme.surface};
  transform: translate(-50%, -50%);
  
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    transform: translate(-50%, -50%) scale(1.1);
  }
`;

const CenterButton = styled(motion.div)`
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.primary};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    cursor: pointer;
    pointer-events: all;
    box-shadow: ${({ theme }) => theme.shadows.small};
    transform: translate(-50%, -50%);
`;

export const TokenContextMenu = ({ token, x, y, onClose, onAction }) => {
    const theme = useTheme();

    if (!token) return null;

    const actions = [
        { id: 'delete', Icon: FaTrash, title: 'Remover' },
        { id: 'kill', Icon: FaSkull, title: token.isDead ? 'Reviver' : 'Matar' },
        { id: 'toggleVisibility', Icon: token.isVisible === false ? FaEye : FaEyeSlash, title: token.isVisible === false ? 'Revelar' : 'Ocultar' },
        { id: 'rollInitiative', Icon: FaDiceD6, title: 'Rolar Iniciativa' },
    ];
    
    const distance = 90;
    const angleIncrement = 360 / actions.length;

    return (
        <MenuOverlay
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <MenuContainer x={x} y={y}>
                <AnimatePresence>
                    {actions.map((action, index) => {
                        const angle = angleIncrement * index;
                        const radians = angle * (Math.PI / 180);
                        return (
                            <MenuItem
                                key={action.id}
                                theme={theme}
                                title={action.title}
                                onClick={(e) => { e.stopPropagation(); onAction(action.id, token); onClose(); }}
                                initial={{ scale: 0, x: 0, y: 0 }}
                                animate={{ scale: 1, x: distance * Math.cos(radians), y: distance * Math.sin(radians) }}
                                exit={{ scale: 0, x: 0, y: 0 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 20, delay: index * 0.05 }}
                            >
                                <action.Icon />
                            </MenuItem>
                        );
                    })}
                </AnimatePresence>
                <CenterButton theme={theme} onClick={onClose}><FaTimes /></CenterButton>
            </MenuContainer>
        </MenuOverlay>
    );
};