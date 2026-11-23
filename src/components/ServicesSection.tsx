import { SKILLS } from '../data/portfolioData';
import { FadeIn } from './FadeIn';

export function ServicesSection() {
  return (
    <section
      id="services"
      className="skills-background text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <div className="max-w-5xl mx-auto">
        <FadeIn delay={0} y={40}>
          <h2
            className="display-heading text-[#3d213e] text-center leading-none mb-10 sm:mb-14 md:mb-16"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
          >
            Ур чадвар
          </h2>
        </FadeIn>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {SKILLS.map((skill) => (
            <FadeIn
              as="li"
              key={skill.number}
              y={18}
              className="rounded-2xl border border-[#d7c3b5] bg-[#fffaf3]/95 p-5 sm:p-6"
            >
              <h3 className="display-heading text-2xl leading-tight text-[#472b39]">
                {skill.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#513740] sm:text-base">
                {skill.description}
              </p>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
