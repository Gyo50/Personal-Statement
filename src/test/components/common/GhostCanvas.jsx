import React, { useEffect, useRef } from 'react';

const GhostCanvas = ({ imageSrc, scrollTarget }) => {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  const lastScroll = useRef(0);
  const velocity = useRef(0);
  const rafId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = imageSrc;
    imgRef.current = img;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const getScrollValue = () => {
      if (scrollTarget?.current) {
        return scrollTarget.current.scrollTop;
      }
      return window.scrollY;
    };

    lastScroll.current = getScrollValue();

    const render = () => {
      const currentScroll = getScrollValue();
      const diff = currentScroll - lastScroll.current;
      lastScroll.current = currentScroll;

      // 🔥 속도 누적 + 감속 (잔상 핵심)
      velocity.current += diff * 2.2;
      velocity.current *= 0.86;

      // ✨ 이전 프레임을 "지우지 않고" 희미하게 덮음
      ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (img.complete) {
        const v = velocity.current;

        ctx.save();

        // RED
        ctx.globalAlpha = 0.4;
        ctx.drawImage(img, -6, -v * 0.3, canvas.width, canvas.height);

        // GREEN
        ctx.globalAlpha = 0.25;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // BLUE
        ctx.globalAlpha = 0.4;
        ctx.drawImage(img, 6, -v * 0.6, canvas.width, canvas.height);

        ctx.restore();
      }

      // 🔁 관성이 남아있는 동안만 반복
      if (Math.abs(velocity.current) > 0.1) {
        rafId.current = requestAnimationFrame(render);
      }
    };

    img.onload = () => {
      render();
    };

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('resize', resize);
    };
  }, [imageSrc, scrollTarget]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        mixBlendMode: 'normal', // ⚠️ 안정성 우선
        opacity: 1,
      }}
    />
  );
};

export default GhostCanvas;
