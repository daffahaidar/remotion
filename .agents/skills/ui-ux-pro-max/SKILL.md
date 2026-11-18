---
name: ui-ux-pro-max
description: >-
  MANDATORY UI/UX Pro Max design intelligence and asset rules for all Remotion
  videos and visual compositions (based on https://github.com/nextlevelbuilder/ui-ux-pro-max-skill),
  using Neuromorphism (Soft UI) as the default video & animation aesthetic,
  combined with react-icons (https://github.com/react-icons/react-icons) for vector
  icons and Unsplash for photographic image assets. ALWAYS read and follow this skill
  whenever designing or building any video scene, layout, infographic, dashboard, card,
  or UI display.
version: 1.1.0
---

# UI/UX Pro Max Skill for Remotion Video & UI Design

Reference repository: [`nextlevelbuilder/ui-ux-pro-max-skill`](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)

> **MANDATORY USER PREFERENCE — ALWAYS APPLY**:
> 1. **Always follow this `ui-ux-pro-max` skill** whenever designing or building any visual display, screen layout, card, overlay, infographic, or video scene in Remotion.
> 2. **Default Video & Animation Style = Neuromorphism (Soft UI / Neuromorphic Motion)**: Unless the user explicitly requests a different aesthetic, every video composition and animated UI in this project should use **Neumorphism** as its primary visual and motion language.

---

## 1. Mandatory Asset & Folder Rules (Content Folder, Icons, UI Design & Images)

### 0. Content Folder Structure — Always Save in `src/content/*`
- **Rule**: All raw content code, video compositions, episode scenes, and custom illustrations must be saved inside `src/content/*` (e.g., `src/content/HowInternetWorks.tsx` or `src/content/<episode-name>/...`).
- **Root Registration**: Import your composition from `./content/...` inside `src/Root.tsx`. When importing master character rigs or props from `src/content/*.tsx`, use `../../character` and `../../property` (or `../character`, `../property` depending on depth).

### A. Vector Icons — Always Use `react-icons`
- **Repository**: [`https://github.com/react-icons/react-icons`](https://github.com/react-icons/react-icons)
- **Rule**: Whenever a video scene, badge, diagram, callout, or UI card needs icons, **always use SVG icon components from `react-icons`** (e.g., `react-icons/fa6`, `react-icons/lu`, `react-icons/tb`, `react-icons/hi2`, `react-icons/md`, `react-icons/ri`) instead of raw text emojis (`🌐`, `📦`, `📡`).
- **Installation**: If `react-icons` is not yet in `package.json`, install it with:
  ```bash
  npm install react-icons
  ```
- **Best Practices in Remotion**:
  - Pass explicit `size` and `color` props (e.g., `<FaGlobe size={44} color="#4f46e5" />`).
  - Wrap icons in crisp **neumorphic icon tiles** (soft extruded or inset circular/rounded-square containers matching the canvas surface) to anchor visual hierarchy.

### B. UI/UX Reference, Neuromorphism Standard & Layout Intelligence — `ui-ux-pro-max-skill`
- **Repository**: [`https://github.com/nextlevelbuilder/ui-ux-pro-max-skill`](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
- **Rule**: Never generate generic, unstyled, or flat placeholder boxes. Establish a clear **Design System** for every video composition before writing JSX:
  1. **Default Preferred Visual & Animation Style — Neuromorphism (Soft UI / Neuromorphic Animation)**:
     - **Core Principle**: Elements extrude organically from (or press softly into) a unified matte background canvas using dual opposing directional shadows (top-left light highlight + bottom-right soft cast shadow) paired with soft border-radii and tactile spring physics.
     - **Light Neuromorphism Tokens (Default for tech explainers & educational storytelling)**:
       - Canvas & matching card base: `#e8eef5` (or `#e4ebf5`, `#ecf1f7`)
       - Subtle specular highlight edge: `1px solid rgba(255, 255, 255, 0.72)`
       - **Extruded / Raised Surface**: `boxShadow: '-10px -10px 22px rgba(255, 255, 255, 0.92), 10px 10px 22px rgba(163, 177, 198, 0.62)'`
       - **Pressed / Recessed Cavity (inputs, meters, progress wells, active tracks)**: `boxShadow: 'inset -6px -6px 14px rgba(255, 255, 255, 0.85), inset 6px 6px 14px rgba(163, 177, 198, 0.58)'`
       - Primary text: `#1e293b` (deep slate for crisp WCAG contrast), Secondary text: `#475569`
     - **Dark Neuromorphism Tokens (For backend, infrastructure, security, terminal themes)**:
       - Canvas & matching card base: `#1e232c` (or `#212631`)
       - Subtle edge: `1px solid rgba(255, 255, 255, 0.06)`
       - **Extruded / Raised Surface**: `boxShadow: '-8px -8px 18px rgba(255, 255, 255, 0.05), 10px 10px 22px rgba(0, 0, 0, 0.65)'`
       - **Pressed / Recessed Cavity**: `boxShadow: 'inset -5px -5px 12px rgba(255, 255, 255, 0.04), inset 6px 6px 14px rgba(0, 0, 0, 0.68)'`
       - Primary text: `#f8fafc`, Secondary text: `#94a3b8`
     - **Neuromorphic Motion & Animation Style**:
       - Animate surfaces **emerging from the canvas** (interpolate dual shadow offset/blur from `0px` flat -> `10px–14px` raised using `Easing.spring({damping: 18, stiffness: 150})` or `Easing.bezier(0.22, 1, 0.36, 1)`).
       - Simulate tactile UI interaction on highlights/focus (smoothly transitioning between extruded and pressed/inset shadow depth with subtle `scale: 0.985` click/press bounce).
       - Pair smooth floating/staggered reveal choreography with recessed indicator meters, glowing accent pills (`#4f46e5`, `#06b6d4`, `#10b981`, `#f59e0b`), and soft character/prop staging on extruded pedestals.
  2. **Secondary Layout Paradigms (Combine cleanly with Neuromorphism when needed)**:
     - **Bento Grid Layout** (ideal for summaries, multi-step breakdowns, feature showcases): Structured asymmetric or modular neuromorphic grid cells (`borderRadius: 24px–36px`), one hero cell + supporting metric/step cells, consistent `20px–28px` gaps, and extruded/inset icon tiles in each cell header.
     - **Alternative Styles (Only when explicitly requested by user)**: Glassmorphism, Claymorphism, or Neo-Brutalism / Cartoon Pop (`character/` and `property/` SVG assets naturally keep their clean cartoon ink outlines while scene UI cards, stages, and animations follow Neumorphism).
  3. **Typography & Hierarchy**:
     - Pair a bold expressive display font (e.g., `Fredoka`, `Plus Jakarta Sans`, `Inter`, `Space Grotesk`) with a clean monospace font (`JetBrains Mono` or `Fira Code`) for URLs, IP addresses, code snippets, and terminal metrics.
     - Maintain strict typographic scale for `1920×1080` video canvases:
       - Hero / Scene Title: `48px–64px` (`fontWeight: 700`)
       - Card Title / Key Metric: `32px–42px` (`fontWeight: 700`)
       - Supporting Body / Caption: `24px–34px` (`fontWeight: 600`)
       - Pill / Badge Label: `20px–24px` (`fontWeight: 700`, uppercase tracking)
  4. **Color & Contrast Rules**:
     - Ensure WCAG AAA readability (`>= 7:1` contrast ratio for primary text).
     - Use semantic color tokens consistently across all scenes:
       - Primary / Info: `#2563eb` (fill) / `#dbeafe` (surface) / `#1e3a8a` (text)
       - Success / Verified: `#16a34a` (fill) / `#dcfce7` (surface) / `#14532d` (text)
       - Warning / Highlight: `#ea580c` (fill) / `#ffedd5` (surface) / `#7c2d12` (text)
       - Danger / Myth: `#dc2626` (fill) / `#fee2e2` (surface) / `#7f1d1d` (text)
  5. **Anti-Patterns to Avoid**:
     - Never use raw emojis as primary UI icons when `react-icons` is available.
     - Never crowd text against card edges (minimum internal card padding: `24px–36px`).
     - Never overlap speech bubbles or callouts over the mascot's face or primary diagram text.

### C. Image & Photo Assets — Always Use `Unsplash`
- **Rule**: Whenever a composition needs photographic assets, real-world visual references, textures, or background imagery, source high-resolution royalty-free images from **Unsplash** (`https://images.unsplash.com/photo-<id>?auto=format&fit=crop&w=1200&q=80`).
- **Remotion Rendering Rule**:
  - Always render Unsplash URLs using `<Img>` or `<CanvasImage>` from `remotion` (never plain `<img>` or un-preloaded CSS backgrounds) so Remotion automatically tracks image loading via `delayRender()` and prevents blank/flickering frames during rendering.
  - Pair Unsplash photos with clean framing (recessed/extruded neuromorphic frames, rounded corners, subtle gradient overlays when placing text on top, and `objectFit: 'cover'`).

---

## 2. Example Pattern Combining Neumorphism, `react-icons` & Unsplash in Remotion

```tsx
import React from 'react';
import {Easing, Img, Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {FaServer} from 'react-icons/fa6';

export const NeuromorphicFeatureCard: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const depth = interpolate(frame, [0, 0.6 * fps], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.22, 1, 0.36, 1),
	});
	const offset = 10 * depth;
	const blur = 22 * depth;

	return (
		<Interactive.Div
			name="Neuromorphic Feature Card"
			style={{
				width: 540,
				padding: 30,
				borderRadius: 32,
				backgroundColor: '#e8eef5',
				border: '1px solid rgba(255, 255, 255, 0.72)',
				boxShadow: `${-offset}px ${-offset}px ${blur}px rgba(255, 255, 255, ${0.92 * depth}), ${offset}px ${offset}px ${blur}px rgba(163, 177, 198, ${0.62 * depth})`,
				display: 'flex',
				flexDirection: 'column',
				gap: 20,
			}}
		>
			<div style={{display: 'flex', alignItems: 'center', gap: 18}}>
				{/* Inset / pressed neumorphic icon tile */}
				<div
					style={{
						width: 68,
						height: 68,
						borderRadius: 22,
						backgroundColor: '#e8eef5',
						boxShadow:
							'inset -5px -5px 12px rgba(255, 255, 255, 0.85), inset 5px 5px 12px rgba(163, 177, 198, 0.58)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<FaServer size={30} color="#4f46e5" />
				</div>
				<div>
					<div style={{fontSize: 20, fontWeight: 700, color: '#4f46e5', letterSpacing: '0.08em'}}>
						INFRASTRUKTUR
					</div>
					<div style={{fontSize: 34, fontWeight: 700, color: '#1e293b'}}>Pusat Data Global</div>
				</div>
			</div>

			{/* Recessed neuromorphic media well */}
			<div
				style={{
					height: 200,
					padding: 8,
					borderRadius: 24,
					backgroundColor: '#e8eef5',
					boxShadow:
						'inset -6px -6px 14px rgba(255, 255, 255, 0.85), inset 6px 6px 14px rgba(163, 177, 198, 0.58)',
				}}
			>
				<div style={{width: '100%', height: '100%', borderRadius: 18, overflow: 'hidden'}}>
					<Img
						name="Data Center Photo"
						src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80"
						style={{width: '100%', height: '100%', objectFit: 'cover'}}
					/>
				</div>
			</div>
		</Interactive.Div>
	);
};
```

