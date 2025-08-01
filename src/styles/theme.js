// src/styles/theme.js

// --- Variáveis de Estilo Compartilhadas ---
const sharedStyles = {
  fonts: {
    body: "'Inter', sans-serif",
    heading: "'Inter', sans-serif",
  },
  shadows: {
    small: '0 2px 8px rgba(0,0,0,0.1)',
    medium: '0 4px 12px rgba(0,0,0,0.15)',
    large: '0 8px 24px rgba(0,0,0,0.2)',
  },
  transitions: {
    short: 'all 0.2s ease-in-out',
    medium: 'all 0.3s ease',
  },
  borderRadius: '8px',
};

// --- Tema Claro ---
export const lightTheme = {
  ...sharedStyles,
  background: '#F0F2F5',
  surface: '#FFFFFF',
  surfaceVariant: '#E5E5EA',
  primary: '#8A4FFF',
  secondary: '#00BCD4',
  textPrimary: '#1C1C1E',
  textSecondary: '#6E6E73',
  border: '#D1D1D6',
  success: '#34C759',
  error: '#FF3B30',
  onPrimary: '#FFFFFF',
};

// --- Tema Escuro ---
export const darkTheme = {
  ...sharedStyles,
  background: '#121217',
  surface: '#1E1E26',
  surfaceVariant: '#2C2C34',
  primary: '#8A4FFF',
  secondary: '#00BCD4',
  textPrimary: '#EAEAEA',
  textSecondary: '#A0A0B0',
  border: '#33333F',
  success: '#4CAF50',
  error: '#F44336',
  onPrimary: '#FFFFFF',
};