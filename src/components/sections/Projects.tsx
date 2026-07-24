import { FiGithub, FiArrowUpRight } from 'react-icons/fi';
import { projects, projectsIntro, type Project } from '../../data/content';
import { Reveal, RevealItem } from '../ui/Reveal';
import SectionHeader from '../ui/SectionHeader';

/**
 * Projects — large indexed editorial rows, media and text alternating,
 * with a big serif title and a running project number.
 */

function ProjectMedia({ project }: { project: Project }) {
  return (
    <div className="group cursor-target relative overflow-hidden rounded-xl border border-line bg-white/[0.02] transition-colors duration-500 hover:border-holo/40">
      {project.video ? (
        <video
          className="block aspect-video w-full object-cover"
          src={project.video}
          poster={project.image}
          controls
          preload="metadata"
        />
      ) : (
        <img
          src={project.image}
          alt={`${project.title} — preview`}
          width={1200}
          height={750}
          loading="lazy"
          className="block aspect-video w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          draggable={false}
        />
      )}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(150deg, rgba(169,208,107,0.09), rgba(169,208,107,0) 45%)',
        }}
      />
    </div>
  );
}

function ProjectRow({ project, index, flip }: { project: Project; index: number; flip: boolean }) {
  return (
    <RevealItem>
      <article className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
        <div className={`md:col-span-7 ${flip ? 'md:order-2' : ''}`}>
          <ProjectMedia project={project} />
        </div>

        <div className={`md:col-span-5 ${flip ? 'md:order-1' : ''}`}>
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-sm text-holo">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="font-subhead text-4xl leading-none font-semibold text-ink md:text-5xl">
              {project.title}
            </h3>
          </div>

          <p className="mt-5 max-w-lg leading-relaxed text-mist">{project.description}</p>

          <p className="mt-5 font-mono text-[13px] tracking-wide text-faint">{project.technologies.join('  ·  ')}</p>

          <div className="mt-6 flex items-center gap-7">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="cursor-target inline-flex items-center gap-2 text-sm font-medium text-ink/85 transition-colors duration-300 hover:text-holo"
            >
              <FiGithub size={16} aria-hidden="true" />
              GitHub
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="cursor-target inline-flex items-center gap-1.5 text-sm font-medium text-ink/85 transition-colors duration-300 hover:text-holo"
              >
                Live demo
                <FiArrowUpRight size={15} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </article>
    </RevealItem>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative w-full" aria-label="Projects">
      <div className="relative mx-auto w-full max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <RevealItem>
            <SectionHeader index="04" title="projects" kicker="things i've built" />
          </RevealItem>

          <RevealItem>
            <p className="max-w-xl leading-relaxed text-mist">{projectsIntro}</p>
          </RevealItem>

          <div className="mt-16 flex flex-col gap-20 md:gap-28">
            {projects.map((project, i) => (
              <ProjectRow key={project.title} project={project} index={i} flip={i % 2 === 1} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
