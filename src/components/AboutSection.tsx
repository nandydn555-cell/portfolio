import { ABOUT_STICKERS, PROFILE } from '../data/portfolioData';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { ContactButton } from './ContactButton';

export interface AboutSectionProps {
  onOpenContact: () => void;
}

export function AboutSection({ onOpenContact }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="relative min-h-screen grid place-items-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden"
    >
      <div className="about-collage w-full max-w-7xl">
        {ABOUT_STICKERS.map((sticker, index) => (
          <FadeIn key={sticker} delay={index * 0.07} y={14} className={`about-sticker about-sticker--${sticker}`}>
            <span className="about-sticker-frame">
              <img src={`/theme/stickers/${sticker}.jpg`} alt="" loading="lazy" />
            </span>
          </FadeIn>
        ))}

        <div className="about-card flex min-w-0 flex-col items-center gap-8 rounded-[2rem] border border-[#d7c3b5] bg-[#fff9f1] px-5 py-10 sm:gap-12 sm:px-14 sm:py-14">
          <div className="flex flex-col items-center gap-6 sm:gap-9">
            <FadeIn delay={0} y={40}>
              <h2
                className="hero-heading display-heading leading-none text-center"
                style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
              >
                Миний тухай
              </h2>
            </FadeIn>

            <AnimatedText
              text={PROFILE.bio}
              className="text-[#513740] font-medium text-center leading-relaxed max-w-[560px]"
            />
          </div>

          <ContactButton onClick={onOpenContact} />
        </div>
      </div>
    </section>
  );
}
