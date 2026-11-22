import { Award } from 'lucide-react';
import { ABOUT_STICKERS, CREDENTIAL_BADGES, PROFILE } from '../data/portfolioData';
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

      {CREDENTIAL_BADGES.length > 0 ? (
        <section
          aria-labelledby="credentials-title"
          className="w-full max-w-3xl rounded-[2rem] border border-[#d7c3b5] bg-[#f8eef5] px-4 py-9 text-center sm:px-8 sm:py-12"
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
        </section>
      ) : null}
    </section>
  );
}
