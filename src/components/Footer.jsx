import React from 'react';
import { motion } from 'framer-motion';

export const Footer = ({ profile }) => {
  return (
    <footer className="footer">
      <motion.div
        className="footer-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="copyright">{profile.copyright}</div>
      </motion.div>
    </footer>
  );
};
