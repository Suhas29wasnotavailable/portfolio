/**
 * ------------------------------------------------------------------
 *  CONTENT — single source of truth for everything editable.
 *
 *  Swap text, links and media here; no component needs to change.
 *  Media lives in /public/assets.
 * ------------------------------------------------------------------
 */

/** Prefix public assets with the deploy base (GitHub Pages serves under /portfolio/). */
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  /** Optional — omit if there is no live deployment. */
  live?: string;
  image: string;
  /** Optional — a local .mp4/.webm path. Rendered instead of the image when present. */
  video?: string;
}

export interface Artwork {
  src: string;
  title: string;
  /** Used to reserve layout space so the gallery never shifts while lazy-loading. */
  width: number;
  height: number;
}

export interface Job {
  company: string;
  role: string;
  period: string;
  location?: string;
  bullets: string[];
  /** Brand logo shown in place of the company name in the role heading. */
  logo?: string;
  /** Company site the logo links to. */
  website?: string;
  /** Brand colour used for the company name in the tab list. */
  brandColor?: string;
}

export const identity = {
  name: 'Suhas Y',
  /** Rendered as: hello there, I'm <accent>Suhas</accent>. */
  headingPre: "hello there, I'm ",
  headingAccent: 'Suhas',
  headingPost: '.',
  intro:
    'Computer Science student at Manipal Institute of Technology, Bengaluru, specializing in artificial intelligence. I build software where the engineering is sound and the design is considered — currently retrieval systems, LLM tooling, and interfaces worth shipping.',
  portrait: asset('assets/portrait.jpg'),
};

export const navigation = {
  links: [
    { label: 'home', id: 'home' },
    { label: 'about', id: 'about' },
    { label: 'experience', id: 'experience' },
    { label: 'projects', id: 'projects' },
    { label: 'artwork', id: 'artwork' },
    { label: 'contact', id: 'contact' },
  ],
};

export const intro = {
  ascii: 'hey!',
};

export const about = {
  lead: 'I split my time between teaching machines to read and drawing by hand — most of what I build sits somewhere in the overlap.',
  paragraphs: [
    "Right now I'm interning at Persistent Systems, building dashboards that put a hard number on a company's AI habit — every token, credit and dollar spent across Claude, GitHub Copilot, Cursor and ChatGPT. Nobody grows up dreaming about cost governance; I didn't expect to find it this interesting.",
    "I don't build things to farm green squares on GitHub. I go after the project that's a size too big for me — a retrieval trick I haven't tried, an architecture I'm not sure will hold, an interface that has to feel right and not just pass its tests. If I already know how it ends, I've usually lost interest halfway.",
    "Close the laptop and there's a decent chance I've got a pen in my hand — anime, portraits, whatever's been rattling around my head that week. Drawing shapes how I write software more than any framework has: composition, restraint, knowing when a thing is actually finished. Whatever curiosity is left over goes into airports and streets I've never walked.",
  ],
  interestsTitle: 'Currently down the rabbit hole on:',
  interests: [
    'Retrieval-Augmented Generation',
    'AI agents',
    'LLM engineering',
    'AI governance & FinOps',
    'Scalable backend architecture',
    'Human-centered interfaces',
  ],
  photo: asset('assets/about.jpg'),
  photoAlt: 'Suhas in New York City',
};

export const experience: Job[] = [
  {
    company: 'Persistent Systems',
    role: 'Project Intern',
    period: '12 Jun 2026 — 11 Sep 2026',
    logo: asset('assets/logos/persistent.png'),
    website: 'https://www.persistent.com',
    brandColor: '#EE7623',
    bullets: [
      'Building enterprise dashboards that monitor AI usage, token consumption, credits and costs across platforms like Claude, GitHub Copilot, Cursor and ChatGPT.',
      'Working with Power BI and Power Query to turn complex enterprise datasets into reporting that decision-makers actually use.',
    ],
  },
  {
    company: 'Tyax Pvt. Ltd.',
    role: 'Summer Intern',
    period: 'Jun 2025 — Jul 2025',
    location: 'Colombo, Sri Lanka',
    logo: asset('assets/logos/tyax.png'),
    website: 'https://www.tyaxinc.com',
    brandColor: '#4F9E3A',
    bullets: [
      'Got hands-on with enterprise networking and AI-powered surveillance systems in a live production environment.',
      'Wrote technical documentation and learned how engineering teams operate in an international professional setting.',
    ],
  },
];

export const projectsIntro =
  "A few projects built to learn something I didn't already know — not to add another repository to the pile.";

export const projects: Project[] = [
  {
    title: 'LoreMind',
    // Verify this description matches the real project and edit freely.
    description:
      'An AI companion for fictional universes. LoreMind ingests novels, wikis and notes, then answers questions about characters, timelines and lore with grounded, cited responses — built around a retrieval-augmented pipeline tuned for long, interconnected narratives.',
    technologies: ['Python', 'LangChain', 'FastAPI', 'React', 'PostgreSQL', 'pgvector'],
    github: 'https://github.com/Suhas29wasnotavailable/loremind', // PLACEHOLDER repo path
    live: undefined,
    image: asset('assets/projects/loremind.jpg'),
    video: undefined,
  },
  {
    title: 'CodePattern Analyzer',
    // Verify this description matches the real project and edit freely.
    description:
      'A code-authorship analysis tool. It fingerprints the structural style of source code — AST shape, complexity metrics, character n-grams — and matches it against known author patterns to attribute who likely wrote a snippet, with an AI-detection signal that flags code that reads machine-generated rather than human.',
    technologies: ['Python', 'scikit-learn', 'FastAPI', 'React'],
    github: 'https://github.com/Suhas29wasnotavailable/codepattern-analyzer', // PLACEHOLDER repo path
    live: undefined,
    image: asset('assets/projects/codepattern.jpg'),
    video: undefined,
  },
];

export const artworkIntro =
  'Drawing came long before code. A selection of traditional and digital work across a few different styles and mediums.';

export const artworks: Artwork[] = [
  // Edit titles freely — they show in the lightbox caption.
  { src: asset('assets/artwork/art-1.jpg'), title: 'Starlit Bears', width: 1125, height: 2000 },
  { src: asset('assets/artwork/art-2.jpg'), title: 'Eren', width: 1206, height: 886 },
  { src: asset('assets/artwork/art-3.jpg'), title: 'Tanjiro', width: 1206, height: 898 },
  { src: asset('assets/artwork/art-4.jpg'), title: 'Goddess Study', width: 1149, height: 1999 },
  { src: asset('assets/artwork/art-5.jpg'), title: 'Swordswoman', width: 1206, height: 1882 },
  { src: asset('assets/artwork/art-6.jpg'), title: 'Sukuna', width: 1151, height: 1999 },
  { src: asset('assets/artwork/art-7.jpg'), title: 'Spider-Man 2099', width: 1206, height: 1705 },
  { src: asset('assets/artwork/art-8.jpg'), title: 'The Creature', width: 1206, height: 1642 },
  { src: asset('assets/artwork/art-9.jpg'), title: 'Yuta', width: 1206, height: 1846 },
];

export const contact = {
  email: 'ys.suhas29@gmail.com',
  github: 'https://github.com/Suhas29wasnotavailable',
  linkedin: 'https://www.linkedin.com/in/suhassrivathsasay',
  resume: asset('assets/resume.pdf'),
  blurb:
    "Whether it's a project worth building, an internship conversation, or a chance to talk shop about AI systems — my inbox is open.",
};
