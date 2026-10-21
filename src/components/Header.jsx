import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sounds } from '../classes/SoundService';

export const Header = ({ profile, onGlitch }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  const handleAvatarClick = () => {
    sounds.playGlitch();
    setIsGlitching(true);
    onGlitch?.();
    setTimeout(() => setIsGlitching(false), 600);
  };

  return (
    <header className="header">
      <motion.div
        className={`avatar-container ${isGlitching ? 'glitch-active' : ''}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
        onClick={handleAvatarClick}
        title="Click me for cyber glitch!"
      >
        <div className="avatar-ring"></div>
        <img
          src={profile.avatar}
          alt={profile.name}
          className="avatar"
          loading="eager"
        />
        {isGlitching && <div className="glitch-overlay"></div>}
      </motion.div>

      <motion.div
        className="info"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.3 }}
      >
        <h1 className="name">{profile.name}</h1>
        <p className="bio">{profile.role}</p>

        <div className="skills-badge">
          {profile.skills.map((skill, i) => (
            <span
              key={i}
              className="badge"
              onMouseEnter={() => sounds.playHover()}
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>
    </header>
  );
};
