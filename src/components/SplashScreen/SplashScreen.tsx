import React from 'react';
import './SplashScreen.css';
import splashImage from '../../assets/splash-image.png';
import  {GameButton}  from '../GameButton/GameButton';


interface SplashScreenProps {
  onStart: () => void;
  onShowInstructions?: () => void;
}


const SplashScreen: React.FC<SplashScreenProps> = ({ onStart, onShowInstructions }) => {
  return (
    <div className="splash-screen">
      <img src={splashImage} alt="Splash" className="splash-image" />
      <div className="splash-btn-row">
        <GameButton text="Start Game" onClick={onStart} />
        <GameButton text="Game Play" onClick={onShowInstructions} />
      </div>
    </div>
  );
};

export default SplashScreen;
