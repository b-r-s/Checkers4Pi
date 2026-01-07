import './App.css';
import { Board } from './components/Board';
import { Sidebar } from './components/Sidebar';
import SplashScreen from './components/SplashScreen';
import { GamePlayInstructions } from './components/GamePlayInstructions';
import { useGameState } from './hooks/useGameState';
import { useSettings } from './hooks/useSettings';
import { BOARD_COLOR_SCHEMES } from './utils/colorThemes';
import { useEffect, useState } from 'react';
import logo from './assets/logo.png';



function App() {
  const { settings, updateSettings } = useSettings();
  const { gameState, handleTileClick, movePiece, setAILevel, restartGame, undoMove, clearUndoHighlight, toastMessage } = useGameState(settings);
  const [showPlayAgain, setShowPlayAgain] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleRestart = () => {
    setShowPlayAgain(false);
    restartGame();
  };

  const handleStartGame = () => {
    setShowSplash(false);
  };

  const handleShowInstructions = () => {
    setShowInstructions(true);
  };

  const handleHideInstructions = () => {
    setShowInstructions(false);
  };

  // When aiMovesFirst setting changes and no moves have been made, restart to apply
  useEffect(() => {
    if (gameState.moveCount === 0 && !showSplash) {
      restartGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.aiMovesFirst]);

  // Apply board colors as CSS variables
  useEffect(() => {
    const colors = BOARD_COLOR_SCHEMES[settings.boardColors];
    document.documentElement.style.setProperty('--board-light', colors.light);
    document.documentElement.style.setProperty('--board-dark', colors.dark);
  }, [settings.boardColors]);

  if (showSplash) {
    if (showInstructions) {
      return <div><GamePlayInstructions /><div style={{textAlign:'center',marginTop:'1.5rem'}}><button className="start-button" onClick={handleHideInstructions}>Back</button></div></div>;
    }
    return <SplashScreen onStart={handleStartGame} onShowInstructions={handleShowInstructions} />;
  }

  return (
    <div className="app-container">
      <div className="game-layout">
        <div className="main-content">
          <Board
            gameState={gameState}
            onTileClick={handleTileClick}
            onMovePiece={movePiece}
            onRestart={handleRestart}
            onClearUndoHighlight={clearUndoHighlight}
            toastMessage={toastMessage}
            playerColor={settings.playerColor}
            onModalFadeComplete={() => setShowPlayAgain(true)}
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
          showPlayAgain={showPlayAgain}
          onPlayAgain={handleRestart}
          canUndo={gameState.aiLevel === 'beginner' && gameState.moveHistory.length >= 2 && !gameState.isAiTurn && !gameState.winner}
          onUndo={undoMove}
          logo={logo}
          gameInProgress={gameState.moveCount > 0}
        />
      </div>
    </div>
  );
}

export default App;
