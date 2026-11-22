import { useEffect } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { ProjectItem } from '../data/portfolioData';

export interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onInquire: (projectName: string) => void;
}

export function ProjectModal({ project, onClose, onInquire }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#39252c]/65 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl rounded-[32px] border border-[#d7c3b5] bg-[#fff9f1] text-[#472b39] p-6 sm:p-8 my-auto"
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#6d4957] mb-1">
                  {project.category}
                </div>
                <h3
                  id="project-modal-title"
                  className="display-heading text-3xl sm:text-4xl"
                >
                  {project.name}
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Төслийн цонхыг хаах"
                className="w-11 h-11 rounded-full border border-[#cdbbab] flex items-center justify-center hover:bg-[#f6e6ef] transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm sm:text-base leading-relaxed mb-4 max-w-2xl">
              {project.summary}
            </p>

            <div className="flex flex-wrap items-center gap-2 text-xs tracking-wide text-[#6d4957] mb-5">
              {project.deliverables.map((item, idx) => (
                <span key={item} className="inline-flex items-center gap-2">
                  {idx > 0 && <span aria-hidden="true">/</span>}
                  <span>{item}</span>
                </span>
              ))}
            </div>

            {project.images.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {project.images.map((image, index) => (
                  <img
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    className={`w-full max-h-[55vh] object-contain rounded-2xl bg-[#f4e7df] ${index === 0 ? 'md:col-span-2' : ''}`}
                  />
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-btn rounded-full text-white font-medium uppercase tracking-widest px-6 py-3 text-xs sm:text-sm"
                >
                  Туршиж үзэх
                </a>
              )}
              {project.repositoryUrl && (
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[#cdbbab] px-6 py-3 text-xs sm:text-sm hover:bg-[#f6e6ef]"
                >
                  GitHub дээр үзэх
                </a>
              )}
              <button
                type="button"
                onClick={() => {
                  const name = project.name;
                  onClose();
                  onInquire(name);
                }}
                className="contact-btn rounded-full text-white font-medium uppercase tracking-widest px-8 py-3 text-xs sm:text-sm cursor-pointer inline-flex items-center gap-2"
              >
                <span>Ижил төслөөр хамтрах</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-[#cdbbab] px-6 py-3 text-xs sm:text-sm hover:bg-[#f6e6ef] transition-colors cursor-pointer"
              >
                Хаах
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
