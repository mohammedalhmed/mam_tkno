import { useEffect, useRef } from 'react';

export default function InteractiveAtmosphere() {
  const atmosphereRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const atmosphere = atmosphereRef.current;
    if (!atmosphere) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let pointerX = 50;
    let pointerY = 35;
    let targetX = 50;
    let targetY = 35;

    const render = () => {
      pointerX += (targetX - pointerX) * 0.08;
      pointerY += (targetY - pointerY) * 0.08;
      atmosphere.style.setProperty('--pointer-x', `${pointerX}%`);
      atmosphere.style.setProperty('--pointer-y', `${pointerY}%`);
      frame = window.requestAnimationFrame(render);
    };

    const updatePointer = (clientX: number, clientY: number) => {
      targetX = Math.max(0, Math.min(100, (clientX / window.innerWidth) * 100));
      targetY = Math.max(0, Math.min(100, (clientY / window.innerHeight) * 100));
    };

    const onPointerMove = (event: PointerEvent) => updatePointer(event.clientX, event.clientY);
    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) updatePointer(touch.clientX, touch.clientY);
    };
    const onScroll = () => {
      atmosphere.style.setProperty('--scroll-progress', `${Math.min(window.scrollY / Math.max(document.documentElement.scrollHeight - window.innerHeight, 1), 1)}`);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (!reduceMotion.matches) frame = window.requestAnimationFrame(render);
    const motionChange = () => {
      if (reduceMotion.matches) window.cancelAnimationFrame(frame);
      else frame = window.requestAnimationFrame(render);
    };
    reduceMotion.addEventListener?.('change', motionChange);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('scroll', onScroll);
      reduceMotion.removeEventListener?.('change', motionChange);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={atmosphereRef} className="interactive-atmosphere" aria-hidden="true">
      <span className="interactive-atmosphere__orb interactive-atmosphere__orb--cyan" />
      <span className="interactive-atmosphere__orb interactive-atmosphere__orb--orange" />
      <span className="interactive-atmosphere__cursor" />
      <span className="interactive-atmosphere__scanline" />
    </div>
  );
}
