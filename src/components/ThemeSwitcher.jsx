import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { sounds } from '../classes/SoundService';

export const THEMES = [
  { id: 'matrix', name: 'Matrix Green', color: '#10b981', glow: 'rgba(16, 185, 129, 0.4)' },
  { id: 'cyan', name: 'Cyberpunk Cyan', color: '#06b6d4', glow: 'rgba(6, 182, 212, 0.4)' },
  { id: 'violet', name: 'Neon Violet', color: '#a855f7', glow: 'rgba(168, 85, 247, 0.4)' },
  { id: 'amber', name: 'Amber Terminal', color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.4)' },
];

export const ThemeSwitcher = ({ currentTheme, onSelectTheme, isMuted, onToggleMute }) => {
  return (
    <div className="theme-switcher">
      <div className="palette-buttons">
        {THEMES.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`palette-dot ${currentTheme.id === t.id ? 'active' : ''}`}
            style={{ backgroundColor: t.color }}
            title={t.name}
            onClick={() => {
              sounds.playClick();
              onSelectTheme(t);
            }}
            onMouseEnter={() => sounds.playHover()}
            aria-label={`Switch theme to ${t.name}`}
          />
        ))}
      </div>

      <div className="control-buttons">
        <button
          type="button"
          className="icon-button"
          onClick={() => {
            onToggleMute();
          }}
          onMouseEnter={() => sounds.playHover()}
          title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
          aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
    </div>
  );
};
