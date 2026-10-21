/**
 * OOP Matrix Rain Animation Engine
 * Encapsulates high-DPI canvas rendering, animation loop, lifecycle, and battery-friendly RAF.
 */

export class MatrixColumn {
  constructor(index, fontSize, canvasHeight) {
    this.index = index;
    this.fontSize = fontSize;
    this.canvasHeight = canvasHeight;
    this.reset(true);
  }

  reset(initial = false) {
    this.y = initial ? Math.random() * -80 : 0;
    this.speed = Math.random() * 0.45 + 0.65;
    this.length = Math.floor(Math.random() * 15) + 10;
  }

  update(maxChars) {
    this.charIndex = Math.floor(Math.random() * maxChars);
    this.y += this.speed;

    if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
      this.reset();
    }
  }

  draw(ctx, chars, primaryColor, glowColor) {
    const char = chars[this.charIndex] || chars[0];
    const x = this.index * this.fontSize;
    const y = this.y * this.fontSize;

    // Glowing white leading character
    if (this.y > 0 && this.y < 3) {
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 6;
    } else {
      ctx.fillStyle = Math.random() > 0.35 ? primaryColor : 'rgba(255, 255, 255, 0.25)';
      ctx.shadowBlur = 0;
    }

    ctx.fillText(char, x, y);
    ctx.shadowBlur = 0;
  }
}

export class MatrixEngine {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: false });
    this.options = {
      chars: 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01{}[]()<>=;:./\\|+-*&^%$#@!~`ReactNodePythonTypeScriptViteFallnix',
      primaryColor: options.primaryColor || '#10b981',
      glowColor: options.glowColor || 'rgba(16, 185, 129, 0.8)',
      fps: options.fps || 35,
      ...options,
    };

    this.charList = this.options.chars.split('');
    this.columns = [];
    this.animationFrameId = null;
    this.lastFrameTime = 0;
    this.frameInterval = 1000 / this.options.fps;
    this.isPaused = false;

    // Bound listeners
    this.handleResize = this.handleResize.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    this.render = this.render.bind(this);
  }

  init() {
    window.addEventListener('resize', this.handleResize);
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    this.handleResize();
    this.start();
  }

  setColorTheme(primaryColor, glowColor) {
    this.options.primaryColor = primaryColor;
    this.options.glowColor = glowColor || primaryColor;
  }

  handleResize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.width = Math.floor(this.width * dpr);
    this.canvas.height = Math.floor(this.height * dpr);

    this.ctx.resetTransform?.();
    this.ctx.scale(dpr, dpr);

    const isMobile = this.width <= 480;
    this.fontSize = isMobile ? 18 : 16;
    const colCount = Math.floor(this.width / this.fontSize);

    this.columns = Array.from(
      { length: colCount },
      (_, i) => new MatrixColumn(i, this.fontSize, this.height)
    );

    // Initial fill
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  handleVisibilityChange() {
    if (document.hidden) {
      this.pause();
    } else {
      this.resume();
    }
  }

  render(timestamp) {
    if (this.isPaused) return;

    this.animationFrameId = requestAnimationFrame(this.render);

    const elapsed = timestamp - this.lastFrameTime;
    if (elapsed < this.frameInterval) return;

    this.lastFrameTime = timestamp - (elapsed % this.frameInterval);

    // Semi-transparent fade layer
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.ctx.font = `${this.fontSize}px 'JetBrains Mono', monospace`;

    for (let i = 0; i < this.columns.length; i++) {
      const col = this.columns[i];
      col.update(this.charList.length);
      col.draw(this.ctx, this.charList, this.options.primaryColor, this.options.glowColor);
    }
  }

  start() {
    this.isPaused = false;
    this.lastFrameTime = performance.now();
    this.animationFrameId = requestAnimationFrame(this.render);
  }

  pause() {
    this.isPaused = true;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  resume() {
    if (this.isPaused) {
      this.start();
    }
  }

  destroy() {
    this.pause();
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    this.columns = [];
  }
}
