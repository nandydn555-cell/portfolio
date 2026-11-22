import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { computeCharProgressRange } from '../utils/portfolioLogic';

interface AnimatedCharProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function AnimatedChar({ char, progress, range }: AnimatedCharProps) {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-0 select-none" aria-hidden="true">
        {char}
      </span>
      <motion.span
        style={{ opacity }}
        className="absolute inset-0"
      >
        {char}
      </motion.span>
    </span>
  );
}

export interface AnimatedTextProps {
  text: string;
  className?: string;
}

export function AnimatedText({ text, className = '' }: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  const totalChars = text.length;
  let runningIndex = 0;

  return (
    <p
      ref={containerRef}
      className={className}
      style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
    >
      {words.map((word, wordIdx) => {
        const chars = word.split('');
        const wordStart = runningIndex;
        runningIndex += word.length + (wordIdx < words.length - 1 ? 1 : 0);

        return (
          <span key={`w-${wordIdx}`} className="inline-block whitespace-nowrap">
            {chars.map((char, charOffset) => {
              const charIndex = wordStart + charOffset;
              const range = computeCharProgressRange(charIndex, totalChars);
              return (
                <AnimatedChar
                  key={`c-${charIndex}`}
                  char={char}
                  progress={scrollYProgress}
                  range={range}
                />
              );
            })}
            {wordIdx < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        );
      })}
    </p>
  );
}
