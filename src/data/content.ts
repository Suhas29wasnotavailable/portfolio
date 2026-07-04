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
}

export const identity = {
  name: 'Suhas Y',
  /** Rendered as: hello there, I'm <accent>Suhas</accent>. */
  headingPre: "hello there, I'm ",
  headingAccent: 'Suhas',
  headingPost: '.',
  intro:
    'Computer Science (AI) student at Manipal Institute of Technology, Bengaluru, and an aspiring AI engineer. I like building things where solid engineering meets thoughtful design — lately that means RAG systems, LLM tooling, and the occasional interactive experiment like this one.',
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
  hint: 'welcome :)',
  hintSub: 'scroll down',
};

export const about = {
  lead: "I'm studying Computer Science with a focus on AI at Manipal Institute of Technology, Bengaluru — and spending most of my time outside class building software around language models.",
  paragraphs: [
    "Right now I'm a project intern at Persistent Systems, building enterprise dashboards that track how organizations actually use AI — usage, tokens, credits and cost across Claude, GitHub Copilot, Cursor and ChatGPT. It's taught me that the unglamorous layer of AI — governance, cost, reliability — is where a lot of the interesting engineering hides.",
    "I don't build projects to fill a GitHub profile. The ones I care about are the ones that force me to learn something unfamiliar: a new retrieval technique, a difficult architecture decision, an interface that has to feel right and not just work.",
    'Away from the keyboard I draw — traditional and digital — and that creative side shapes how I write software more than any framework has. I also travel whenever I can; new places and people have a way of resetting how you think.',
  ],
  interestsTitle: "A few things I'm exploring at the moment:",
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
    bullets: [
      'Got hands-on with enterprise networking and AI-powered surveillance systems in a live production environment.',
      'Wrote technical documentation and learned how engineering teams operate in an international professional setting.',
    ],
  },
];

export const projectsIntro =
  'Projects I built to learn something I didn’t know yet — not to add another repository to GitHub.';

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
  'Drawing came long before programming. A collection of traditional and digital pieces, exploring different styles and mediums.';

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
    "Whether it's an interesting project, an internship conversation, or you just want to talk shop about AI systems — my inbox is open.",
};
