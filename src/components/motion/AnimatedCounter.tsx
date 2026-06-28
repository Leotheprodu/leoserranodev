import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';

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
  duration = 1.6,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const { num, prefix, suffix } = parseValue(value);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => formatNumber(latest, value));
  const [display, setDisplay] = useState(() => formatNumber(0, value));

  useEffect(() => {
    if (!isInView) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setDisplay(formatNumber(num, value));
      return;
    }
    const controls = animate(count, num, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(formatNumber(latest, value)),
    });
    return () => controls.stop();
  }, [isInView, num, value, duration, count]);

  return (
    <motion.span ref={ref} className={className} aria-label={value}>
      {prefix}
      {display}
      {suffix}
    </motion.span>
  );
}

export default AnimatedCounter;
