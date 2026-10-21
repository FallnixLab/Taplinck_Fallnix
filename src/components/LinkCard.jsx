import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Send, Mail, Music, ExternalLink, Copy, Check } from 'lucide-react';
import { sounds } from '../classes/SoundService';

export const TelegramIcon = ({ size = 20, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="currentColor"
    className={className}
    style={{ display: 'block' }}
  >
    <path d="M41.4193 7.30899C41.4193 7.30899 45.3046 5.79399 44.9808 9.47328C44.8729 10.9883 43.9016 16.2908 43.1461 22.0262L40.5559 39.0159C40.5559 39.0159 40.3401 41.5048 38.3974 41.9377C36.4547 42.3705 33.5408 40.4227 33.0011 39.9898C32.5694 39.6652 24.9068 34.7955 22.2086 32.4148C21.4531 31.7655 20.5897 30.4669 22.3165 28.9519L33.6487 18.1305C34.9438 16.8319 36.2389 13.8019 30.8426 17.4812L15.7331 27.7616C15.7331 27.7616 14.0063 28.8437 10.7686 27.8698L3.75342 25.7055C3.75342 25.7055 1.16321 24.0823 5.58815 22.459C16.3807 17.3729 29.6555 12.1786 41.4193 7.30899Z" />
  </svg>
);

export const TikTokIcon = ({ size = 20, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 1024 1024"
    fill="currentColor"
    fillRule="evenodd"
    className={className}
    style={{ display: 'block' }}
  >
    <path
      d="M365.014.667C408.68 0 452.011.333 495.342 0c2.667 51 21 102.999 58.33 138.998 37.332 37 89.997 54 141.328 59.666v134.332c-47.998-1.667-96.33-11.667-139.994-32.333-19-8.667-36.665-19.667-53.998-31-.333 97.332.334 194.665-.666 291.663-2.667 46.666-18 93-44.998 131.332-43.665 64-119.328 105.665-196.992 106.999-47.664 2.666-95.329-10.334-135.994-34.333C55.028 725.658 7.696 652.992.697 574.993c-.667-16.667-1-33.333-.334-49.666 6-63.333 37.332-123.999 85.997-165.332 55.33-47.999 132.66-70.999 204.99-57.332.667 49.333-1.332 98.665-1.332 147.998-33-10.667-71.664-7.667-100.663 12.333-20.999 13.667-36.998 34.666-45.331 58.333-7 17-5 35.666-4.667 53.666 8 54.666 60.664 100.665 116.662 95.665 37.332-.333 72.997-22 92.33-53.666 6.332-11 13.332-22.333 13.665-35.333 3.334-59.666 2-118.998 2.334-178.664.333-134.332-.334-268.33.666-402.328"
      transform="translate(165 112)"
    />
  </svg>
);

const ICON_MAP = {
  Github: Github,
  Send: TelegramIcon,
  Telegram: TelegramIcon,
  Mail: Mail,
  Music: TikTokIcon,
  TikTok: TikTokIcon,
};

export const LinkCard = ({ link, index, onCopyToast }) => {
  const [copied, setCopied] = useState(false);
  const IconComponent = ICON_MAP[link.iconKey] || ExternalLink;

  const handleClick = async (e) => {
    if (link.actionType === 'copy') {
      e.preventDefault();
      sounds.playSuccess();

      const textToCopy = link.rawEmail || link.url.replace('mailto:', '');
      try {
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        onCopyToast(`Email "${textToCopy}" copied!`);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        window.location.href = link.url;
      }
    } else {
      sounds.playClick();
    }
  };

  const cardInner = (
    <>
      <div className="link-icon">
        <IconComponent size={20} />
      </div>

      <div className="link-text">
        <div className="link-name-row">
          <span className="link-name">{link.name}</span>
          {link.actionType === 'copy' ? (
            <span className="action-pill">
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? 'Copied' : 'Copy'}
            </span>
          ) : (
            <ExternalLink size={14} className="external-indicator" />
          )}
        </div>
        <span className="link-desc">{link.desc}</span>
      </div>
    </>
  );

  const motionProps = {
    className: `link-card ${link.actionType === 'copy' ? 'link-card-copy' : ''}`,
    onClick: handleClick,
    onMouseEnter: () => sounds.playHover(),
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { delay: 0.2 + index * 0.05, duration: 0.3 },
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  };

  if (link.actionType === 'copy') {
    return (
      <motion.button type="button" {...motionProps}>
        {cardInner}
      </motion.button>
    );
  }

  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      {...motionProps}
    >
      {cardInner}
    </motion.a>
  );
};
