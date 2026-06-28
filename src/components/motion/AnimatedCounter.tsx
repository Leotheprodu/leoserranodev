import { useEffect, useRef, useState } from 'react';
import { motion, animate } from 'framer-motion';

interface AnimatedCounterProps {
  value: string;
  duration?: number;
  className?: string;
}

function parseValue(value: string): { num: number; prefix: string; suffix: string } {
  const match = value.match(/^([^\d]*)([\d.]+)(.*)$/);
  if (!match) return { num: 0, prefix: value, suffix: '' };
  return {
    prefix: match[1] ?? '',
    num: parseFloat(match[2] ?? '0'),
    suffix: match[3] ?? '',
  };
}

function formatNumber(n: number, original: string): string {
  const decimals = original.includes('.')
    ? original.split('.')[1]?.length ?? 0
    : 0;
  return n.toFixed(decimals);
}

export function AnimatedCounter({
  value,
  duration = 2,
  className,
}: AnimatedCounterProps) {
  const { num, prefix, suffix } = parseValue(value);
  const [display, setDisplay] = useState(() => formatNumber(0, value));
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setDisplay(formatNumber(num, value));
      return;
    }

    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = num * eased;
      setDisplay(formatNumber(current, value));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [num, value, duration]);

  return (
    <motion.span className={className} aria-label={value}>
      {prefix}
      {display}
      {suffix}
    </motion.span>
  );
}

export default AnimatedCounter;
