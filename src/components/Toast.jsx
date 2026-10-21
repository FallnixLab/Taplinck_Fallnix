import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export const Toast = ({ message, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <div className="toast-wrapper">
          <motion.div
            className="toast-container"
            initial={{ opacity: 0, y: 25, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <CheckCircle2 size={18} className="toast-icon" />
            <span>{message}</span>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
