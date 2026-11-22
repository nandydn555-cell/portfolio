import { useEffect, useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectModal } from './components/ProjectModal';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';
import type { ProjectItem } from './data/portfolioData';

declare global {
  interface Window {
    __bootLivingPortrait?: () => void;
    __faceEngine?: boolean;
  }
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [projectRef, setProjectRef] = useState('');

  useEffect(() => {
    window.__bootLivingPortrait?.();
  }, []);

  const handleOpenContact = (refProject = '') => {
    setProjectRef(refProject);
    setContactOpen(true);
  };

  return (
    <div
      className="portfolio-background min-h-screen"
      style={{ overflowX: 'clip' }}
    >
      <main>
        <HeroSection onOpenContact={() => handleOpenContact()} />
        <MarqueeSection />
        <AboutSection onOpenContact={() => handleOpenContact()} />
        <ServicesSection />
        <ProjectsSection onSelectProject={(p) => setSelectedProject(p)} />
      </main>
      <Footer />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={(projectName) => handleOpenContact(projectName)}
      />

      <ContactModal
        open={contactOpen}
        initialProjectRef={projectRef}
        onClose={() => setContactOpen(false)}
      />
    </div>
  );
}
