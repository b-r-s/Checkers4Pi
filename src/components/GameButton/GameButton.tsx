// GameButton.tsx
import React from 'react';
import './GameButton.css';

interface GameButtonProps {
  text?: string;
  onClick?: () => void;
}

export const GameButton: React.FC<GameButtonProps> = ({ 
  text = "AUTHENTICATE", 
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className="game-button"
    >
      {/* Outer border element */}
      <span className="game-button-outer-border"></span>
      {/* Button Content */}
      <span className="game-button-text">
        {text}
      </span>
    </button>
  );
};