import React, { useState, useEffect } from 'react';
import { PROFILE_DATA } from './data/profile';
import { SOCIAL_LINKS } from './data/links';
import { MatrixBackground } from './components/MatrixBackground';
import { Header } from './components/Header';
import { LinkCard } from './components/LinkCard';
import { Footer } from './components/Footer';
import { ThemeSwitcher, THEMES } from './components/ThemeSwitcher';
import { Toast } from './components/Toast';
import { sounds } from './classes/SoundService';
import './App.css';

function App() {
  const [currentTheme, setCurrentTheme] = useState(THEMES[0]);
  const [isMuted, setIsMuted] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  // Apply CSS variables for the active theme
  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', currentTheme.color);
    document.documentElement.style.setProperty('--accent-glow', currentTheme.glow);
  }, [currentTheme]);

  const showToast = (message) => {
    setToastMessage(message);
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, 2500);
  };

  const handleToggleMute = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
    showToast(muted ? 'Sound Muted' : 'Sound Enabled');
  };

  return (
    <>
      <MatrixBackground
        themeColor={currentTheme.color}
        glowColor={currentTheme.glow}
      />

      <div className="container">
        <ThemeSwitcher
          currentTheme={currentTheme}
          onSelectTheme={setCurrentTheme}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />

        <Header
          profile={PROFILE_DATA}
          onGlitch={() => showToast('SYSTEM GLITCH DETECTED')}
        />

        <main className="links-grid">
          {SOCIAL_LINKS.map((link, index) => (
            <LinkCard
              key={link.id}
              link={link}
              index={index}
              onCopyToast={showToast}
            />
          ))}
        </main>

        <Footer profile={PROFILE_DATA} />
      </div>

      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
      />
    </>
  );
}

export default App;
