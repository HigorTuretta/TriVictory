// src/components/VTT/TokenContextMenu.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaSkull, FaEye, FaEyeSlash, FaDiceD6 } from 'react-icons/fa';
import styled from 'styled-components';

const MenuOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;
  pointer-events: none; /* O overlay em si não é clicável */
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
  pointer-events: all; /* Os botões são clicáveis */
  box-shadow: ${({ theme }) => theme.shadows.medium};
  border: 2px solid ${({ theme }) => theme.surface};
  
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    transform: scale(1.1);
  }
`;

/**
 * Nosso próprio componente de Menu Radial customizado.
 */
const CustomRadialMenu = ({ x, y, children, distance = 100 }) => {
    const angleIncrement = 360 / children.length;

    return (
        <AnimatePresence>
            {React.Children.map(children, (child, index) => {
                const angle = angleIncrement * index;
                const radians = angle * (Math.PI / 180);
                const itemX = x + distance * Math.cos(radians);
                const itemY = y + distance * Math.sin(radians);

                return (
                    <motion.div
                        key={index}
                        initial={{ x: x, y: y, scale: 0, opacity: 0 }}
                        animate={{ x: itemX, y: itemY, scale: 1, opacity: 1 }}
                        exit={{ x: x, y: y, scale: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20, delay: index * 0.05 }}
                        style={{ position: 'absolute', top: 0, left: 0, transform: 'translate(-50%, -50%)' }}
                    >
                        {child}
                    </motion.div>
                );
            })}
        </AnimatePresence>
    );
};


export const TokenContextMenu = ({ token, x, y, onClose, onAction }) => {
    if (!token) return null;

    const handleAction = (action) => {
        onAction(action, token);
        onClose(); // Fecha o menu após a ação
    };

    return (
        <MenuOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose} // Clicar fora fecha o menu
        >
            <CustomRadialMenu x={x} y={y}>
                <MenuItem title="Remover" onClick={() => handleAction('delete')}><FaTrash /></MenuItem>
                <MenuItem title={token.isDead ? "Reviver" : "Matar"} onClick={() => handleAction('kill')}><FaSkull /></MenuItem>
                <MenuItem title={token.isVisible === false ? 'Revelar' : 'Ocultar'} onClick={() => handleAction('toggleVisibility')}>
                    {token.isVisible === false ? <FaEye /> : <FaEyeSlash />}
                </MenuItem>
                <MenuItem title="Rolar Iniciativa" onClick={() => handleAction('rollInitiative')}><FaDiceD6 /></MenuItem>
            </CustomRadialMenu>
        </MenuOverlay>
    );
};