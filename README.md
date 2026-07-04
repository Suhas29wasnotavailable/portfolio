# Suhas — Portfolio

A cinematic, droid-guided personal portfolio. Black canvas, white typography,
holographic blue light.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## The experience

1. **ASCII introduction** — a full viewport of black holding the ASCIIText
   animation ("hey!") and a quiet welcome hint. Scroll to continue.
2. **Home** — a small R2-D2-style droid flies in, parks above the portrait
   and projects it holographically; only then does the section materialize.
3. **About → Experience → Projects → Artwork → Contact** — the droid
   accompanies you, physically flying to each section and arriving first.
   It only fires its projector where there are pictures to project; in
   text-only sections it simply hovers.

A navigation bar (name · section links · socials) fades in once you leave
the introduction. The target-cursor effect appears only while hovering
interactive elements.

## Replacing the placeholders

All editable content lives in **`src/data/content.ts`** — bio text, project
descriptions/links, artwork list, contact links. Media lives in
**`public/assets/`**:

| Placeholder                             | Replace with                                         |
| --------------------------------------- | ---------------------------------------------------- |
| `public/assets/projects/*.svg`          | real project screenshots                             |
| Project descriptions/repos (content.ts) | real LoreMind / CodePattern Analyzer details         |
| `public/assets/artwork/art-*.svg`       | your artwork (update `width`/`height` in content.ts) |
| `public/assets/resume.pdf`              | your resume                                          |

Already real: portrait (`portrait.jpg`), about photo (`about.jpg`),
GitHub/LinkedIn/email links, and all bio/experience copy.

Projects support an optional `video` field — set it to a local `.mp4`/`.webm`
path and it embeds in place of the still image.

## Architecture notes

- **One animation clock.** Lenis smooth scroll is driven by GSAP's ticker
  (`src/lib/scroll.ts`); the droid's flight loop runs on the same ticker.
  No competing RAFs → no scroll jitter.
- **The droid** (`src/components/droid/`) is continuous physical state — an
  under-damped spring integrated per frame — so it can never teleport.
  Bobbing, banking, glancing and beam logic are layered on top. It writes
  transforms straight to refs; zero React re-renders per frame.
- **Projection gating** (`src/context/DroidContext.tsx`) — sections register
  an anchor; when the droid arrives and its beam ignites, the section is
  marked projected and its content resolves out of blur (Framer Motion).
  Layout space is always reserved, so scroll height never shifts.
- **ReactBits components** (`src/components/reactbits/`) — ASCIIText and
  TargetCursor, used as supplied. The intro's WebGL is mounted only while
  near the viewport.
- `prefers-reduced-motion` is respected throughout (no smooth-scroll
  hijack, no gating, no idle animation).
