import { useRef, useState, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: 'button' | 'div' | 'a';
  onClick?: () => void;
  href?: string;
  target?: '_blank' | '_self';
  rel?: string;
  type?: 'button' | 'submit';
  ariaLabel?: string;
}

export function MagneticButton({
  children,
  className,
  strength = 0.3,
  as = 'div',
  onClick,
  href,
  target,
  rel,
  type = 'button',
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 250, damping: 20, mass: 0.4 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const motionProps = {
    style: { x: springX, y: springY },
    onMouseMove: handleMouseMove,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: handleMouseLeave,
    animate: isHovered ? { scale: 1.03 } : { scale: 1 },
    transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
  };

  if (as === 'a') {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
        onClick={onClick}
        aria-label={ariaLabel}
        className={className}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  if (as === 'button') {
    return (
      <motion.button
        ref={ref as React.RefObject<HTMLButtonElement>}
        type={type}
        onClick={onClick}
        aria-label={ariaLabel}
        className={className}
        {...motionProps}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      onClick={onClick}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

export default MagneticButton;
