import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { PROJECTS, type ProjectItem } from '../data/portfolioData';
import { computeCardTargetScale, computeCardTopOffset } from '../utils/portfolioLogic';
import { FadeIn } from './FadeIn';
import { LiveProjectButton } from './LiveProjectButton';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
  progress: MotionValue<number>;
  onSelectProject: (project: ProjectItem) => void;
}

function ProjectCard({
  project,
  index,
  totalCards,
  progress,
  onSelectProject,
}: ProjectCardProps) {
  const targetScale = computeCardTargetScale(index, totalCards);
  const rangeStart = index / totalCards;
  const scale = useTransform(progress, [rangeStart, 1], [1, targetScale]);
  const topOffset = computeCardTopOffset(index);
  const [cover] = project.images;

  return (
    <div className="md:h-[85vh] md:sticky md:top-24 flex items-start justify-center">
      <motion.article
        style={{
          scale,
          top: `${topOffset}px`,
        }}
        className="project-folder relative w-full max-w-5xl md:origin-top"
      >
        <p className="project-folder-tab text-xs font-semibold sm:text-sm">
          {project.category}
        </p>

        <div className="project-folder-front p-3 sm:p-5 md:p-7">
          <div className="project-folder-insert mb-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border px-4 py-3 sm:mb-5 sm:px-5">
            <h3 className="display-heading min-w-0 text-2xl leading-tight sm:text-3xl md:text-4xl">
              {project.name}
            </h3>
            <LiveProjectButton
              projectName={project.name}
              onClick={() => onSelectProject(project)}
            />
          </div>

          {cover ? (
            <img
              src={cover.src}
              alt={cover.alt}
              loading="lazy"
              className={`project-folder-insert block h-[clamp(11rem,34vw,25rem)] w-full rounded-2xl border ${cover.portrait || cover.fit === 'contain' ? 'object-contain' : 'object-cover object-top'}`}
            />
          ) : (
            <p className="project-folder-insert rounded-2xl border px-4 py-4 text-sm leading-relaxed sm:px-5 sm:text-base">
              {project.summary}
            </p>
          )}
        </div>
      </motion.article>
    </div>
  );
}

export interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      className="portfolio-background rounded-t-[40px] border-t border-[#d7c3b5] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-28 sm:pb-36"
      style={{ overflowX: 'clip' }}
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading display-heading text-center leading-none mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
        >
          Бүтээлүүд
        </h2>
      </FadeIn>

      <div ref={containerRef} className="relative flex flex-col gap-10">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            totalCards={PROJECTS.length}
            progress={scrollYProgress}
            onSelectProject={onSelectProject}
          />
        ))}
      </div>
    </section>
  );
}
