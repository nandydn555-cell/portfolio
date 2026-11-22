import { Fragment, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { computeCharProgressRange } from '../utils/portfolioLogic';

interface AnimatedCharProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function AnimatedChar({ char, progress, range }: AnimatedCharProps) {
  const opacity = useTransform(progress, range, [0.25, 1]);
  return <motion.span style={{ opacity }}>{char}</motion.span>;
}

interface AnimatedParagraph {
  text: string;
  className?: string;
  emphasis?: boolean;
}

export interface AnimatedTextProps {
  paragraphs: readonly AnimatedParagraph[];
  className?: string;
}

export function AnimatedText({ paragraphs, className }: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.88', 'end 0.62'],
  });
  const totalChars = paragraphs.reduce((length, { text }) => length + text.length, 0);
  let charIndex = 0;

  return (
    <div ref={containerRef} className={className}>
      {paragraphs.map(({ text, className: paragraphClassName, emphasis }) => {
        const Text = emphasis ? 'strong' : 'span';
        const words = text.split(' ');

        return (
          <p key={text} className={paragraphClassName}>
            <Text>
              {reduceMotion ? text : (
                <>
                  <span className="sr-only select-none">{text}</span>
                  <span aria-hidden="true">
                    {words.map((word, wordIndex) => {
                      const wordStart = charIndex;
                      charIndex += word.length + (wordIndex < words.length - 1 ? 1 : 0);

                      return (
                        <Fragment key={wordStart}>
                          {wordIndex > 0 ? ' ' : null}
                          <span className="inline-block whitespace-nowrap">
                            {word.split('').map((char, offset) => (
                              <AnimatedChar
                                key={wordStart + offset}
                                char={char}
                                progress={scrollYProgress}
                                range={computeCharProgressRange(wordStart + offset, totalChars)}
                              />
                            ))}
                          </span>
                        </Fragment>
                      );
                    })}
                  </span>
                </>
              )}
            </Text>
          </p>
        );
      })}
    </div>
  );
}
