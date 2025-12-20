import React, { useState, useEffect } from 'react';
import { FallingEmojis } from './FallingEmojis';
import './GameOverModal.css';

interface GameOverModalProps {
  winner: 'red' | 'black' | 'draw';
  onFadeComplete?: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({ winner, onFadeComplete }) => {
  const isRedWin = winner === 'red';
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Start fading out after 2 seconds
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    // Notify parent when fade is complete (2s + 500ms fade animation)
    const completeTimer = setTimeout(() => {
      onFadeComplete?.();
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onFadeComplete]);

  const getMessage = () => {
    switch (winner) {
      case 'red': return 'Red Wins! 🎉';
      case 'black': return 'Black Wins!';
      case 'draw': return 'Game Drawn!';
      default: return 'Game Over';
    }
  };

  const titleClass = winner === 'red' ? 'red' : winner === 'black' ? 'black' : 'draw';

  return (
    <>
      {isRedWin && <FallingEmojis />}
      <div className={`game-over-overlay ${!isVisible ? 'fade-out' : ''}`}>
        <div className="game-over-content">
          <h2 className={`game-over-title ${titleClass}`}>
            {getMessage()}
          </h2>

          <p className="game-over-message">
            {winner === 'draw' ? 'No more moves possible.' : `Congratulations ${winner}!`}
          </p>
        </div>
      </div>
    </>
  );
};
