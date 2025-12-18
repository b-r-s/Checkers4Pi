import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Board } from '../components/Board';
import { useGameState } from '@ai-checkers/shared';
import { useStatistics } from '@ai-checkers/shared';

export const GameScreen = () => {
  const { stats, recordGameResult } = useStatistics();

  const handleGameEnd = (winner: 'red' | 'black' | 'draw', moveCount: number) => {
    // Record the game result - player (red) wins if red wins, loses if black wins
    const playerWon = winner === 'red';
    recordGameResult(playerWon, moveCount);
  };

  const { gameState, handleTileClick, movePiece, restartGame, toastMessage } = useGameState(handleGameEnd);

  const handleTileClickWrapper = (row: number, col: number) => {
    handleTileClick(row, col);
  };

  const handleMovePiece = (from: { row: number; col: number }, to: { row: number; col: number }) => {
    movePiece(from, to);
  };

  return (
    <View style={styles.container}>
      <Board
        gameState={gameState}
        onTileClick={handleTileClickWrapper}
        onMovePiece={handleMovePiece}
        onRestart={restartGame}
        toastMessage={toastMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});