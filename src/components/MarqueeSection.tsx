import { useEffect, useRef, useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { computeMarqueeOffset } from '../utils/portfolioLogic';

const images = PROJECTS.flatMap((project) => project.images);
const firstRow = images.filter((image) => !image.portrait);
const secondRow = [...images].reverse();
const ROW_1_ITEMS = [...firstRow, ...firstRow];
const ROW_2_ITEMS = [...secondRow, ...secondRow];

export function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const updateOffset = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      setOffset(computeMarqueeOffset(window.scrollY, sectionTop, window.innerHeight));
    };

    updateOffset();
    window.addEventListener('scroll', updateOffset, { passive: true });
    window.addEventListener('resize', updateOffset, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateOffset);
      window.removeEventListener('resize', updateOffset);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Бүтээлүүдийн зургууд"
      className="pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
    >
      <div className="flex flex-col gap-3">
        {/* Row 1: Moves RIGHT on scroll */}
        <div
          data-testid="marquee-row-1"
          className="flex gap-3 w-max"
          style={{
            transform: `translateX(${offset - 200}px)`,
            willChange: 'transform',
          }}
        >
          {ROW_1_ITEMS.map((image, idx) => (
            <div
              key={`r1-${idx}`}
              className="w-[420px] h-[270px] shrink-0 rounded-2xl overflow-hidden bg-[#161616]"
            >
              <img
                src={image.src}
                alt={idx < firstRow.length ? image.alt : ''}
                loading="lazy"
                referrerPolicy="no-referrer"
                className={`w-full h-full block ${image.portrait || image.fit === 'contain' ? 'object-contain' : 'object-cover object-top'}`}
              />
            </div>
          ))}
        </div>

        {/* Row 2: Moves LEFT on scroll */}
        <div
          data-testid="marquee-row-2"
          className="flex gap-3 w-max"
          style={{
            transform: `translateX(${-(offset - 200)}px)`,
            willChange: 'transform',
          }}
        >
          {ROW_2_ITEMS.map((image, idx) => (
            <div
              key={`r2-${idx}`}
              className="w-[420px] h-[270px] shrink-0 rounded-2xl overflow-hidden bg-[#161616]"
            >
              <img
                src={image.src}
                alt=""
                loading="lazy"
                referrerPolicy="no-referrer"
                className={`w-full h-full block ${image.portrait || image.fit === 'contain' ? 'object-contain' : 'object-cover object-top'}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
