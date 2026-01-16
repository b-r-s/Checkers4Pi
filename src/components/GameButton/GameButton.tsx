// GameButton.tsx
import React from 'react';
import './GameButton.css';

interface GameButtonProps {
  text?: string;
  onClick?: () => void;
  className?: string;
}

export const GameButton: React.FC<GameButtonProps> = ({ 
  text = "AUTHENTICATE", 
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className="game-button instruction-button"
    >

      <span className="game-button-text">
        {text}
      </span>
    </button>
  );
};