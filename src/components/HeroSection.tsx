import { PORTRAIT_FALLBACK_URL, PROFILE } from '../data/portfolioData';
import { FadeIn } from './FadeIn';
import { ContactButton } from './ContactButton';

export interface HeroSectionProps {
  onOpenContact: () => void;
}

export function HeroSection({ onOpenContact }: HeroSectionProps) {
  return (
    <section
      className="hero-section relative isolate min-h-[max(710px,100svh)] sm:min-h-[max(680px,100svh)] flex flex-col"
      style={{ overflowX: 'clip' }}
    >
      <div className="hero-sparkles absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      {/* Top Navbar */}
      <FadeIn as="header" delay={0} y={-20} className="relative z-20 w-full">
        <nav
          aria-label="Үндсэн цэс"
          className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-6 md:px-10 pt-6 md:pt-8"
        >
          <a
            href="#about"
            className="font-semibold text-xs sm:text-sm md:text-lg lg:text-xl whitespace-nowrap shrink-0 transition-colors hover:text-[#713b63] focus-visible:ring-2 focus-visible:ring-[#713b63] rounded-sm"
          >
            Миний тухай
          </a>
          <a
            href="#services"
            className="font-semibold text-xs sm:text-sm md:text-lg lg:text-xl whitespace-nowrap shrink-0 transition-colors hover:text-[#713b63] focus-visible:ring-2 focus-visible:ring-[#713b63] rounded-sm"
          >
            Ур чадвар
          </a>
          <a
            href="#projects"
            className="font-semibold text-xs sm:text-sm md:text-lg lg:text-xl whitespace-nowrap shrink-0 transition-colors hover:text-[#713b63] focus-visible:ring-2 focus-visible:ring-[#713b63] rounded-sm"
          >
            Бүтээлүүд
          </a>
          <button
            type="button"
            onClick={onOpenContact}
            className="font-semibold text-xs sm:text-sm md:text-lg lg:text-xl whitespace-nowrap shrink-0 cursor-pointer bg-transparent border-0 p-0 transition-colors hover:text-[#713b63] focus-visible:ring-2 focus-visible:ring-[#713b63] rounded-sm"
          >
            Холбоо барих
          </button>
        </nav>
      </FadeIn>

      <div className="relative z-20 self-center px-4 pt-7">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading display-heading text-center text-[clamp(1.8rem,5.8vw,5.25rem)] leading-[1.08]">
            <span className="mb-2 block text-[0.62em]">Сайн уу? Намайг</span>{' '}
            <em className="inline-block whitespace-nowrap">{PROFILE.name}</em> гэдэг.
          </h1>
        </FadeIn>
      </div>

      {/* Centered Interactive Living Portrait */}
      <div className="hero-portrait-wrap" id="magnetWrap">
        <FadeIn delay={0.6} y={30}>
          <div className="hero-portrait-inner fade-in" id="magnetInner">
            <img
              id="faceFallback"
              src={PORTRAIT_FALLBACK_URL}
              alt=""
              referrerPolicy="no-referrer"
            />
            <canvas
              id="faceGl"
              data-testid="living-portrait-canvas"
              aria-hidden="true"
            />
            <div id="faceProps" aria-hidden="true">
              <svg id="faceFly" viewBox="0 0 32 32">
                <path
                  className="wing"
                  d="M15 15C12 9.500 4.500 8.500 2 13c2.500 4.500 10 4.500 13 2z"
                />
                <path
                  className="wing r"
                  d="M17 15c3-5.500 10.500-6.500 13-2-2.500 4.500-10 4.500-13 2z"
                />
                <ellipse cx="16" cy="19.500" rx="4" ry="6.500" />
                <circle cx="16" cy="11.500" r="3.300" />
              </svg>
              <svg id="faceHand" viewBox="0 0 32 32">
                <path
                  className="open"
                  d="M10.500 16.500V8.200a1.800 1.800 0 0 1 3.600 0V14v-8a1.800 1.800 0 0 1 3.600 0V14 7a1.800 1.800 0 0 1 3.600 0v8-5a1.800 1.800 0 0 1 3.600 0v10.500c0 5-3.400 8.500-8.400 8.500-3.600 0-5.700-1.600-7.600-4.600l-3.500-5.600c-.6-1 .1-2.200 1.200-2.400 1-.2 1.900.2 2.600 1z"
                />
                <path
                  className="grab"
                  d="M10.500 17v-3.300a1.800 1.800 0 0 1 3.600 0V14v-1.800a1.800 1.800 0 0 1 3.600 0V14v-1.300a1.800 1.800 0 0 1 3.600 0V14v-.3a1.800 1.800 0 0 1 3.600 0v6.800c0 5-3.400 8.500-8.400 8.500-3.600 0-5.700-1.600-7.600-4.600l-2.300-3.700c-.6-1 .1-2.200 1.200-2.400 1-.2 1.900.2 2.700 1z"
                />
              </svg>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-20 flex flex-wrap justify-between items-end gap-x-6 gap-y-4 px-5 sm:px-6 md:px-10 pb-7 sm:pb-8 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p className="font-semibold text-sm sm:text-base">
            {PROFILE.role}
          </p>
          <p className="mt-1 text-[#513740] leading-snug text-sm sm:text-base max-w-64">
            {PROFILE.tagline}
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton onClick={onOpenContact} />
        </FadeIn>
      </div>
    </section>
  );
}
