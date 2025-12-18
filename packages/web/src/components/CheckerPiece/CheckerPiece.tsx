import React, { useRef } from 'react';
import type { FC } from 'react';
import './CheckerPiece.css';
import type { PlayerColorTheme } from '@ai-checkers/shared';
import { getColorFilterCSS } from '@ai-checkers/shared';

export interface CheckerPieceProps {
  color: string;
  isKing: boolean;
  position: { row: number; col: number };
  isSelected?: boolean;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  colorTheme?: PlayerColorTheme;
}

export const CheckerPiece: FC<CheckerPieceProps> = ({
  color,
  isKing,
  isSelected,
  draggable,
  onDragStart,
  onDragEnd,
  onMouseEnter,
  onMouseLeave,
  colorTheme,
}) => {
  const imgRef = useRef<HTMLImageElement>(null);

  // Select the appropriate PNG based on color and king status
  const getPieceImage = () => {
    if (isKing) {
      return color === 'red' ? '/RedKing.png' : '/BlackKing.png';
    }
    return color === 'red' ? '/RedChecker.png' : '/BlackChecker.png';
  };

  const pieceImage = getPieceImage();

  const classNames = [
    'checker-piece',
    isKing ? 'king' : '',
    isSelected ? 'selected' : '',
    draggable ? 'draggable' : ''
  ].filter(Boolean).join(' ');

  // Apply color filter if colorTheme is provided
  const colorFilterStyle = colorTheme ? { filter: getColorFilterCSS(colorTheme) } : {};

  const handleDragStart = (e: React.DragEvent) => {
    // Use the hidden drag image element for a clean drag preview
    if (imgRef.current) {
      try {
        // Set drag image with offset at center (40x40 is approx center of 80x80 piece)
        e.dataTransfer.setDragImage(imgRef.current, 40, 40);
      } catch (err) {
        // Silently fail if drag image can't be set - browser will use default
      }
    }

    // Set drag effect
    e.dataTransfer.effectAllowed = 'move';

    if (onDragStart) {
      onDragStart(e);
    }
  };

  return (
    <div
      className={classNames}
      draggable={draggable}
      onDragStart={draggable ? handleDragStart : undefined}
      onDragEnd={draggable ? onDragEnd : undefined}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Visible piece */}
      <img
        src={pieceImage}
        alt={`${color} ${isKing ? 'king' : 'checker'}`}
        className="checker-piece"
        draggable={false}
        style={colorFilterStyle}
      />

      {/* Hidden image for drag ghost - preloaded and clean */}
      <img
        ref={imgRef}
        src={pieceImage}
        alt="drag-ghost"
        className="drag-ghost"
        style={colorFilterStyle}
      />
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
// Only re-render if the piece's actual properties change
export const CheckerPieceMemo = React.memo<CheckerPieceProps>(CheckerPiece, (prev, next) => {
  return (
    prev.color === next.color &&
    prev.isKing === next.isKing &&
    prev.isSelected === next.isSelected &&
    prev.draggable === next.draggable &&
    prev.position.row === next.position.row &&
    prev.position.col === next.position.col &&
    prev.colorTheme === next.colorTheme
  );
});
