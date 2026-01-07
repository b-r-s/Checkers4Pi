import React from 'react';
import './GamePlayInstructions.css';

interface InstructionItem {
  title: string;
  text: string | string[];
}

const instructions: InstructionItem[] = [
  {
    title: 'Introduction',
    text: [
      'Welcome to Checkers4Pi!',
      'This guide will help you understand the rules and how to play the game. Checkers is a classic two-player strategy game played on an 8x8 board. Each player controls 12 pieces, with the goal of capturing all opponent pieces or blocking them so they cannot move.',
      'Checkers4Pi has been designed to incorporate an AI engine for you to play against. The AI difficulty levels are Beginner, Intermediate, and Advanced. Beginner level allows you to undo your last move once per game, and the AI will make almost random moves. Intermediate and Advanced levels do not allow undos. The AI will think several moves ahead at Intermediate and even more at Advanced level to provide a tougher challenge. Finally, at Advanced level you have the option to allow the AI to make the first move.'
    ]
  },
  {
    title: 'Basic Rules',
    text: 'Checkers is a two-player game played on an 8x8 board with alternating dark and light squares. Each player starts with 12 pieces placed on the dark squares of the three rows closest to them. Players take turns moving their pieces diagonally forward to adjacent empty dark squares. If an opponent\'s piece is diagonally adjacent and the square beyond it is empty, you MUST jump and capture it. Multiple jumps are allowed, and required if available. When a piece reaches the farthest row from the player, it becomes a King and can move and capture both forward and backward. The objective is to capture all opponent pieces or block them so they cannot move.'
  },
  {
    title: 'Objective',
    text: 'Capture all of your opponent\'s pieces or block them so they cannot move.'
  },
  {
    title: 'Board Setup',
    text: 'The game is played on an 8x8 board. Each player starts with 12 pieces placed on the dark squares of the three rows closest to them.'
  },
  {
    title: 'Turns',
    text: 'Players alternate turns. Red moves first.'
  },
  {
    title: 'Moving Pieces',
    text: 'Regular pieces move diagonally forward to an adjacent empty dark square.'
  },
  {
    title: 'Capturing',
    text: 'If an opponent\'s piece is diagonally adjacent and the square beyond it is empty, you MUST jump and capture it. Multiple jumps are allowed, and required if available.'
  },
  {
    title: 'King Promotion',
    text: 'When a piece reaches the farthest row from the player, it becomes a King and can move and capture both forward and backward. Moves must still be diagonal.'
  },
  {
    title: 'Winning',
    text: 'You win by capturing all opponent pieces or leaving them with no legal moves.'
  },
  {
    title: 'Draw',
    text: 'If neither player can force a win, the game is a draw.'
  },
  {
    title: 'AI Opponent',
    text: 'The AI opponent offers different difficulty levels to challenge your skills. For Beginner level, you can undo your last move once per game and the AI will make random moves. For Intermediate and Advanced levels, the AI uses more sophisticated strategies and undoing moves is not allowed. The AI will think several moves ahead to provide a tougher challenge.'
  }
];

const renderText = (text: string | string[]) => {
  if (Array.isArray(text)) {
    return text.map((paragraph, idx) => (
      <p key={idx} className="instruction-paragraph">{paragraph}</p>
    ));
  }
  return text;
};

export const GamePlayInstructions: React.FC = () => (
  <div className="gameplay-instructions-container">
    <h2>How to Play Checkers4Pi</h2>
    <ul className="gameplay-instructions-list">
      {instructions.map((item, idx) => (
        <li key={idx} className="gameplay-instruction-item">
          <strong>{item.title}:</strong> {renderText(item.text)}
        </li>
      ))}
    </ul>
  </div>
);

export default GamePlayInstructions;
