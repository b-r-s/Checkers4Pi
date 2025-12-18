import React, { useState, useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { getValidMovesForPiece } from '@ai-checkers/shared';
import type { GameState } from '@ai-checkers/shared';

const { width: screenWidth } = Dimensions.get('screen');
const BOARD_SIZE = 8;
const SQUARE_SIZE = Math.min((screenWidth - 40) / BOARD_SIZE, 50); // Max 50px per square

export interface BoardProps {
  gameState: GameState;
  onTileClick: (row: number, col: number) => void;
  onMovePiece: (from: { row: number; col: number }, to: { row: number; col: number }) => void;
  onRestart: () => void;
  toastMessage: string | null;
}

export const Board: React.FC<BoardProps> = ({ gameState, onTileClick, onMovePiece, toastMessage }) => {
  const { board, selectedPosition, validMoves, lastAIMove } = gameState;
  const [draggingPos, setDraggingPos] = useState<{ row: number; col: number } | null>(null);

  // Performance optimization: create a Set for O(1) lookup
  const validMoveMap = useMemo(() => {
    const map = new Set<string>();
    validMoves.forEach(m => map.add(`${m.to.row},${m.to.col}`));
    return map;
  }, [validMoves]);

  const onGestureEvent = (event: any, row: number, col: number) => {
    // Handle drag gestures here
    // For now, just handle tap
  };

  const onHandlerStateChange = (event: any, row: number, col: number) => {
    if (event.nativeEvent.state === State.END) {
      // Handle drop/tap
      onTileClick(row, col);
    }
  };

  const renderSquare = (rowIndex: number, colIndex: number) => {
    const piece = board[rowIndex][colIndex];
    const isDark = (rowIndex + colIndex) % 2 === 1;
    const isSelected = selectedPosition?.row === rowIndex && selectedPosition?.col === colIndex;
    const isValidMove = validMoveMap.has(`${rowIndex},${colIndex}`);
    const isAIMoveSquare = lastAIMove && (
      (lastAIMove.from.row === rowIndex && lastAIMove.from.col === colIndex) ||
      (lastAIMove.to.row === rowIndex && lastAIMove.to.col === colIndex)
    );

    const squareStyle = [
      styles.square,
      {
        backgroundColor: isDark ? '#8B4513' : '#F5DEB3',
        width: SQUARE_SIZE,
        height: SQUARE_SIZE,
      },
      isSelected && styles.selected,
      isValidMove && styles.validMove,
      isAIMoveSquare && styles.aiMoveHighlight,
    ];

    return (
      <TouchableOpacity
        key={`${rowIndex}-${colIndex}`}
        style={squareStyle}
        onPress={() => onTileClick(rowIndex, colIndex)}
      >
        {isValidMove && <View style={styles.validMoveIndicator} />}
        {piece && (
          <Image
            source={
              piece.isKing
                ? piece.color === 'red'
                  ? require('../../assets/RedKing.png')
                  : require('../../assets/BlackKing.png')
                : piece.color === 'red'
                  ? require('../../assets/RedChecker.png')
                  : require('../../assets/RedChecker.png') // Using RedChecker as placeholder for black
            }
            style={styles.piece}
            resizeMode="contain"
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.board}>
        {board.map((row, rowIndex) =>
          <View key={rowIndex} style={styles.row}>
            {row.map((_, colIndex) => renderSquare(rowIndex, colIndex))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  board: {
    backgroundColor: '#654321',
    padding: 5,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  selected: {
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  validMove: {
    backgroundColor: '#90EE90',
  },
  validMoveIndicator: {
    position: 'absolute',
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#32CD32',
    opacity: 0.7,
  },
  aiMoveHighlight: {
    borderWidth: 2,
    borderColor: '#FF6347',
  },
  piece: {
    width: SQUARE_SIZE * 0.8,
    height: SQUARE_SIZE * 0.8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});