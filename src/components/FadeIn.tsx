import type { ComponentType, ElementType, ReactNode, CSSProperties } from 'react';
import { useMemo } from 'react';
import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react';

type MotionAnyTag = ComponentType<HTMLMotionProps<'div'>>;
const motionElementCache = new Map<ElementType, MotionAnyTag>();

function getMotionComponent(as: ElementType): MotionAnyTag {
  let cached = motionElementCache.get(as);
  if (!cached) {
    cached = motion.create(as as 'div') as MotionAnyTag;
    motionElementCache.set(as, cached);
  }
  return cached;
}

export interface FadeInProps {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
}

export function FadeIn({
  children,
  as = 'div',
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = '',
  style,
}: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = useMemo(() => getMotionComponent(as), [as]);

  if (prefersReducedMotion) {
    const StaticTag = as;
    return (
      <StaticTag className={className} style={style}>
        {children}
      </StaticTag>
    );
  }

  return (
    <MotionTag
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      style={style}
    >
      {children}
    </MotionTag>
  );
}
