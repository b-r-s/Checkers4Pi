import './App.css';
import { Board } from './components/Board';
import { Sidebar } from './components/Sidebar';
import { useGameState, useSettings, BOARD_COLOR_SCHEMES } from '@ai-checkers/shared';
import { useEffect } from 'react';

function App() {
  const { gameState, handleTileClick, movePiece, setAILevel, restartGame, toastMessage } = useGameState();
  const { settings, updateSettings } = useSettings();

  // Apply board colors as CSS variables
  useEffect(() => {
    const colors = BOARD_COLOR_SCHEMES[settings.boardColors];
    document.documentElement.style.setProperty('--board-light', colors.light);
    document.documentElement.style.setProperty('--board-dark', colors.dark);
  }, [settings.boardColors]);

  return (
    <div className="app-container">
      <div className="game-layout">
        <div className="main-content">
          <Board
            gameState={gameState}
            onTileClick={handleTileClick}
            onMovePiece={movePiece}
            onRestart={restartGame}
            toastMessage={toastMessage}
            playerColor={settings.playerColor}
          />
        </div>
        <Sidebar
          aiLevel={gameState.aiLevel}
          onAILevelChange={setAILevel}
          scores={gameState.scores}
          currentPlayer={gameState.currentPlayer}
          turnStartTime={gameState.turnStartTime}
          totalTime={gameState.totalTime}
          settings={settings}
          onSettingsChange={updateSettings}
        />
      </div>
    </div>
  );
}

export default App;
