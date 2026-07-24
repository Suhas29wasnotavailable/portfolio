import { FiGithub, FiArrowUpRight } from 'react-icons/fi';
import { projects, projectsIntro, type Project } from '../../data/content';
import { Reveal, RevealItem } from '../ui/Reveal';
import SectionLabel from '../ui/SectionLabel';

/**
 * Projects — professional rows, alternating media/text. Interactions
 * are limited to subtle hover states and clean transitions. When a
 * project declares a `video`, it is embedded in place of the still.
 */

function ProjectMedia({ project }: { project: Project }) {
  return (
    <div className="group cursor-target relative overflow-hidden rounded-lg border border-line bg-white/[0.02] transition-colors duration-500 hover:border-holo/40">
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
          className="block aspect-video w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
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

function ProjectRow({ project, flip }: { project: Project; flip: boolean }) {
  return (
    <RevealItem>
      <article className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
        <div className={flip ? 'md:order-2' : undefined}>
          <ProjectMedia project={project} />
        </div>

        <div className={flip ? 'md:order-1' : undefined}>
          <h3 className="font-subhead text-3xl font-semibold text-ink md:text-4xl">
            {project.title}
          </h3>

          <p className="mt-4 max-w-lg leading-relaxed text-mist">{project.description}</p>

          <p className="mt-5 font-mono text-[13px] tracking-wide text-faint">
            {project.technologies.join('  ·  ')}
          </p>

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
      <div className="relative mx-auto w-full max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <RevealItem>
            <SectionLabel title="projects" />
          </RevealItem>

          <RevealItem>
            <p className="mt-6 max-w-xl leading-relaxed text-mist">{projectsIntro}</p>
          </RevealItem>

          <div className="mt-14 flex flex-col gap-20 md:gap-24">
            {projects.map((project, i) => (
              <ProjectRow key={project.title} project={project} flip={i % 2 === 1} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
