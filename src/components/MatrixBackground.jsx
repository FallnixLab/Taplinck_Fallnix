import React, { useEffect, useRef } from 'react';
import { MatrixEngine } from '../classes/MatrixEngine';

export const MatrixBackground = ({ themeColor, glowColor }) => {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new MatrixEngine(canvasRef.current, {
      primaryColor: themeColor,
      glowColor: glowColor,
    });
    engine.init();
    engineRef.current = engine;

    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, []);

  // Update color dynamically when theme changes
  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.setColorTheme(themeColor, glowColor);
    }
  }, [themeColor, glowColor]);

  return <canvas ref={canvasRef} className="matrix-canvas" aria-hidden="true" />;
};
