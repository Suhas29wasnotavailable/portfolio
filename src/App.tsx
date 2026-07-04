import { useEffect } from 'react';
import { initSmoothScroll, destroySmoothScroll, prefersReducedMotion } from './lib/scroll';

import TargetCursor from './components/reactbits/TargetCursor';
import Navbar from './components/ui/Navbar';

import Intro from './components/sections/Intro';
import Home from './components/sections/Home';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import ArtworkGallery from './components/sections/ArtworkGallery';
import Contact from './components/sections/Contact';

/**
 * Flow: ASCII introduction → Home → About → Experience → Projects →
 * Artwork → Contact, bound together by smooth scroll and a cursor
 * effect that appears only over interactive elements.
 */
export default function App() {
  useEffect(() => {
    if (!prefersReducedMotion()) initSmoothScroll();
    return () => destroySmoothScroll();
  }, []);

  return (
    <>
      <TargetCursor targetSelector=".cursor-target" cursorColor="#6fc3ff" activeOnly />

      <Navbar />

      <main>
        <Intro />
        <Home />
        <About />
        <Experience />
        <Projects />
        <ArtworkGallery />
        <Contact />
      </main>
    </>
  );
}
