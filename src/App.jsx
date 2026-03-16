import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  Send,
  Music,
  Mail
} from 'lucide-react';
import './App.css';

const SOCIAL_LINKS = [
  { id: 1, name: 'GitHub', icon: <Github size={20} />, url: 'https://github.com/FallnixLab', desc: 'My source code repository' },
  { id: 2, name: 'Telegram', icon: <Send size={20} />, url: 'https://t.me/Fallnix', desc: 'DM me for collaboration' },
  { id: 3, name: 'Email', icon: <Mail size={20} />, url: 'mailto:admin@fallnix.ru', desc: 'admin@fallnix.ru' },
  { id: 4, name: 'TikTok', icon: <Music size={20} />, url: 'https://tiktok.com/@thefallnix', desc: 'Coding & Tech content' },
];

const SKILLS = ['React', 'JavaScript', 'Node.js', 'Python', 'UI/UX'];

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01{}[]()<>=;:./\\|+-*&^%$#@!~`const function return import export default async await if else for while class new this let var React useState useEffect useRef Fallnix';
    const charArray = chars.split('');
    const isMobile = window.innerWidth <= 480;
    const fontSize = isMobile ? 20 : 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    for (let i = 0; i < drops.length; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        if (Math.random() > 0.5) {
          ctx.fillStyle = '#10b981';
        } else {
          ctx.fillStyle = 'rgba(16, 185, 129, 0.4)';
        }

        if (drops[i] > 0 && drops[i] < 3) {
          ctx.fillStyle = '#ffffff';
        }

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, isMobile ? 65 : 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-canvas" />;
};

function App() {
  return (
    <>
      <MatrixRain />
      <div className="container">
        <header className="header">
          <motion.div
            className="avatar-container"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
          >
            <div className="avatar-ring"></div>
            <img
              src="/avatar.png"
              alt="Fallnix"
              className="avatar"
            />
          </motion.div>

          <motion.div
            className="info"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.3 }}
          >
            <h1 className="name">Fallnix</h1>
            <p className="bio">Full-stack Software Engineer & Digital Architect</p>

            <div className="skills-badge">
              {SKILLS.map((skill, i) => (
                <span key={i} className="badge">{skill}</span>
              ))}
            </div>
          </motion.div>
        </header>

        <main className="links-grid">
          {SOCIAL_LINKS.map((link, index) => (
            <motion.a
              key={link.id}
              href={link.url}
              className="link-card"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.05)', transition: { duration: 0 } }}
              whileTap={{ scale: 0.98, transition: { duration: 0 } }}
            >
              <div className="link-icon">{link.icon}</div>
              <div className="link-text">
                <span className="link-name">{link.name}</span>
                <span className="link-desc">{link.desc}</span>
              </div>
            </motion.a>
          ))}
        </main>

        <footer className="footer">
          <motion.div
            className="footer-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="status">
              <div className="status-dot"></div>
              <span>Open to new challenges</span>
            </div>
            <div className="copyright">© 2019-2026 FALLNIX</div>
          </motion.div>
        </footer>
      </div>
    </>
  );
}

export default App;
