---
name: ui-ux-pro-max
description: >-
  UI/UX Pro Max design intelligence and asset rules for Remotion videos and UI
  compositions (based on https://github.com/nextlevelbuilder/ui-ux-pro-max-skill),
  combined with react-icons (https://github.com/react-icons/react-icons) for vector
  icons and Unsplash for photographic image assets. Use whenever designing or
  building video scenes, infographics, dashboards, cards, or UI components.
version: 1.0.0
---

# UI/UX Pro Max Skill for Remotion Video & UI Design

Reference repository: [`nextlevelbuilder/ui-ux-pro-max-skill`](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)

Use this skill whenever creating or styling a Remotion video, educational explainer, motion graphic, or UI mockup scene to ensure production-grade visual quality.

---

## 1. Mandatory Asset & Folder Rules (Content Folder, Icons, UI Design & Images)

### 0. Content Folder Structure — Always Save in `src/content/*`

- **Rule**: All raw content code, video compositions, episode scenes, and custom illustrations must be saved inside `src/content/*` (e.g., `src/content/HowInternetWorks.tsx` or `src/content/<episode-name>/...`).
- **Root Registration**: Import your composition from `./content/...` inside `src/Root.tsx`. When importing the master character rigs from `src/content/*.tsx`, use `import {ManCharacter, WomanCharacter} from '../../character'`.

### A. Vector Icons — Always Use `react-icons`

- **Repository**: [`https://github.com/react-icons/react-icons`](https://github.com/react-icons/react-icons)
- **Rule**: Whenever a video scene, badge, diagram, callout, or UI card needs icons, **always use SVG icon components from `react-icons`** (e.g., `react-icons/fa6`, `react-icons/lu`, `react-icons/tb`, `react-icons/hi2`, `react-icons/md`, `react-icons/ri`) instead of raw text emojis (`🌐`, `📦`, `📡`).
- **Installation**: If `react-icons` is not yet in `package.json`, install it with:
  ```bash
  npm install react-icons
  ```
- **Best Practices in Remotion**:
  - Pass explicit `size` and `color` props (e.g., `<FaGlobe size={44} color="#2563eb" />`).
  - Wrap icons in crisp badge containers (circular or rounded-square icon boxes with matching background tints and borders) to anchor visual hierarchy.

### B. UI/UX Reference & Layout Intelligence — `ui-ux-pro-max-skill`

- **Repository**: [`https://github.com/nextlevelbuilder/ui-ux-pro-max-skill`](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
- **Rule**: Never generate generic, unstyled, or flat placeholder boxes. Establish a clear **Design System** for every video composition before writing JSX:
  1. **Choose a Cohesive Visual Style Paradigm**:
     - **Neo-Brutalism / Cartoon Pop** (ideal for 2D mascot explainers): Bold dark ink borders (`6px–8px solid #1f1a1f`), crisp hard offset shadows (`0 8px 0 #1f1a1f` or `0 12px 0 #1f1a1f`), high-saturation accent badges, warm or pastel surface cards (`#ffffff`, `#f8fafc`, `#fef9c3`, `#dbeafe`, `#dcfce7`).
     - **Bento Grid Layout** (ideal for summaries, multi-step breakdowns, feature showcases): Structured asymmetric or modular grid cells (`borderRadius: 24px–32px`), clear visual hierarchy with one hero cell and supporting metric/step cells, consistent `18px–24px` gaps, and icon badges in each cell header.
     - **Glassmorphism / Modern SaaS Dark UI** (ideal for tech/code/cybersecurity topics): Translucent layered cards (`rgba(255, 255, 255, 0.08)`), subtle `1px–2px` specular borders, vibrant glowing accents (`#38bdf8`, `#818cf8`, `#34d399`), deep slate backgrounds (`#0f172a`).
     - **Claymorphism / Soft 3D UI**: Soft inflated rounded cards (`borderRadius: 32px–48px`), inner + outer shadows for tactile depth, friendly pastel palettes.
  2. **Typography & Hierarchy**:
     - Pair a bold expressive display font (e.g., `Fredoka`, `Plus Jakarta Sans`, `Inter`, `Space Grotesk`) with a clean monospace font (`JetBrains Mono` or `Fira Code`) for URLs, IP addresses, code snippets, and terminal metrics.
     - Maintain strict typographic scale for `1920×1080` video canvases:
       - Hero / Scene Title: `48px–64px` (`fontWeight: 700`)
       - Card Title / Key Metric: `32px–42px` (`fontWeight: 700`)
       - Supporting Body / Caption: `24px–34px` (`fontWeight: 600`)
       - Pill / Badge Label: `20px–24px` (`fontWeight: 700`, uppercase tracking)
  3. **Color & Contrast Rules**:
     - Ensure WCAG AAA readability (`>= 7:1` contrast ratio for primary text).
     - Use semantic color tokens consistently across all scenes:
       - Primary / Info: `#2563eb` (fill) / `#dbeafe` (surface) / `#1e3a8a` (text)
       - Success / Verified: `#16a34a` (fill) / `#dcfce7` (surface) / `#14532d` (text)
       - Warning / Highlight: `#ea580c` (fill) / `#ffedd5` (surface) / `#7c2d12` (text)
       - Danger / Myth: `#dc2626` (fill) / `#fee2e2` (surface) / `#7f1d1d` (text)
  4. **Anti-Patterns to Avoid**:
     - Never use raw emojis as primary UI icons when `react-icons` is available.
     - Never crowd text against card edges (minimum internal card padding: `24px–36px`).
     - Never overlap speech bubbles or callouts over the mascot's face or primary diagram text.

### C. Image & Photo Assets — Always Use `Unsplash`

- **Rule**: Whenever a composition needs photographic assets, real-world visual references, textures, or background imagery, source high-resolution royalty-free images from **Unsplash** (`https://images.unsplash.com/photo-<id>?auto=format&fit=crop&w=1200&q=80`).
- **Remotion Rendering Rule**:
  - Always render Unsplash URLs using `<Img>` or `<CanvasImage>` from `remotion` (never plain `<img>` or un-preloaded CSS backgrounds) so Remotion automatically tracks image loading via `delayRender()` and prevents blank/flickering frames during rendering.
  - Pair Unsplash photos with clean framing (rounded corners, cartoon/brutalist borders, subtle gradient overlays when placing text on top, and `objectFit: 'cover'`).
