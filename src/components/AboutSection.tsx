import { Award, ChevronDown } from 'lucide-react';
import { ABOUT_STICKERS, CREDENTIAL_BADGES, MICROSOFT_LEARN_MODULES, PROFILE } from '../data/portfolioData';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { ContactButton } from './ContactButton';

export interface AboutSectionProps {
  onOpenContact: () => void;
}

const aboutParagraphs = [
  {
    text: `Сайн уу! Намайг ${PROFILE.name} гэдэг.`,
    className: 'text-center text-base font-semibold text-[#472b39] sm:text-xl',
  },
  ...PROFILE.bio.paragraphs.map((text) => ({ text })),
  { text: PROFILE.bio.closing, emphasis: true, className: 'text-[#472b39]' },
];

export function AboutSection({ onOpenContact }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="relative min-h-screen grid place-items-center gap-12 px-5 sm:px-8 md:px-10 py-20 overflow-hidden"
    >
      <div className="about-collage w-full max-w-7xl">
        {ABOUT_STICKERS.map((sticker, index) => (
          <FadeIn key={sticker} delay={index * 0.07} y={14} className={`about-sticker about-sticker--${sticker}`}>
            <span className="about-sticker-frame">
              <img src={`/theme/stickers/${sticker}.jpg`} alt="" loading="lazy" />
            </span>
          </FadeIn>
        ))}

        <div className="about-card flex min-w-0 flex-col items-center gap-8 rounded-[2rem] border border-[#d7c3b5] px-5 py-10 sm:gap-10 sm:px-14 sm:py-14">
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
              paragraphs={aboutParagraphs}
              className="max-w-[35rem] space-y-4 text-[#513740] text-sm leading-relaxed sm:text-base"
            />
          </div>

          <ContactButton onClick={onOpenContact} />
        </div>
      </div>

      {CREDENTIAL_BADGES.length > 0 ? (
        <section
          id="credentials"
          aria-labelledby="credentials-title"
          className="credentials-background w-full max-w-3xl rounded-[2rem] border border-[#d7c3b5] px-4 py-9 text-center sm:px-8 sm:py-12"
        >
          <h2 id="credentials-title" className="display-heading hero-heading mb-7 text-4xl sm:text-5xl">
            Сертификат, шагнал
          </h2>
          <ul className="flex flex-wrap justify-center gap-4">
            {CREDENTIAL_BADGES.map(({ name, issuer, imageSrc, credentialUrl }) => (
              <FadeIn
                as="li"
                key={issuer + ':' + name}
                y={14}
                className="flex w-full max-w-[16rem] flex-col items-center gap-3 rounded-2xl border border-[#e4cddb] bg-[#fff9f1] p-5 sm:w-56"
              >
                <div className="grid size-32 place-items-center rounded-full border-2 border-dashed border-[#b77ea1] bg-[#f6e6ef] p-2 text-[#713b63]">
                  {imageSrc ? (
                    <img src={imageSrc} alt="" loading="lazy" className="size-full rounded-full object-cover" />
                  ) : (
                    <Award className="size-10" aria-hidden="true" />
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="display-heading break-words text-xl leading-tight text-[#472b39]">{name}</h3>
                  <p className="mt-1 break-words text-sm text-[#6d4957]">{issuer}</p>
                </div>
                {credentialUrl ? (
                  <a
                    href={credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name + ' · Credly дээр үзэх'}
                    className="mt-auto text-sm font-semibold text-[#713b63] underline underline-offset-4"
                  >
                    Credly дээр үзэх
                  </a>
                ) : null}
              </FadeIn>
            ))}
          </ul>

          <details className="group mt-6 rounded-2xl border border-[#e4cddb] bg-[#fff9f1] text-left">
            <summary className="flex cursor-pointer list-none items-center gap-3 rounded-2xl p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#713b63] sm:px-5 [&::-webkit-details-marker]:hidden">
              <span className="flex shrink-0 -space-x-3" aria-hidden="true">
                {MICROSOFT_LEARN_MODULES.slice(0, 3).map(({ slug }) => (
                  <img
                    key={slug}
                    src={`/badges/microsoft-learn/${slug}.svg`}
                    alt=""
                    loading="lazy"
                    className="size-8 rounded-full ring-2 ring-[#fff9f1] sm:size-10"
                  />
                ))}
              </span>
              <span className="min-w-0 flex-1">
                <span className="display-heading block text-xl leading-tight text-[#472b39] sm:text-2xl">Microsoft Learn</span>
                <span className="text-sm text-[#6d4957]">C# · {MICROSOFT_LEARN_MODULES.length} сургалтын badge</span>
              </span>
              <ChevronDown className="size-5 shrink-0 text-[#713b63] transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
            </summary>
            <ul className="grid gap-3 border-t border-[#e4cddb] p-3 sm:grid-cols-2 sm:p-4">
              {MICROSOFT_LEARN_MODULES.map(({ slug, name, completedOn, passedAssessment }) => (
                <li key={slug} className="flex min-w-0 items-start gap-3 rounded-xl border border-[#e4cddb] bg-[#f8eef5] p-3">
                  <img
                    src={`/badges/microsoft-learn/${slug}.svg`}
                    alt=""
                    loading="lazy"
                    className="size-11 shrink-0"
                  />
                  <div className="min-w-0">
                    <a
                      href={`https://learn.microsoft.com/en-us/training/modules/${slug}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-words text-sm font-semibold leading-snug text-[#472b39] underline decoration-[#713b63]/45 underline-offset-3 hover:decoration-[#713b63]"
                    >
                      {name}
                    </a>
                    <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-xs text-[#6d4957]">
                      <time dateTime={completedOn}>{completedOn.replaceAll('-', '.')}</time>
                      {passedAssessment ? <span className="font-medium text-[#68405f]">Шалгалтад тэнцсэн</span> : null}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </details>
        </section>
      ) : null}
    </section>
  );
}
