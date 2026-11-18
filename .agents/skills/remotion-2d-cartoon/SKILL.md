---
name: remotion-2d-cartoon
description: >-
  Create 2D cartoon animation videos, character scenes, expressions, lip-sync,
  walk cycles, callouts, and multi-scene cartoon episodes in Remotion using SVG
  vector rigs and interactive timelines. Use when the user asks to create, edit,
  or animate a 2D cartoon video, mascot scene, or character animation in Remotion.
version: 4.0.543
---

# Remotion 2D Cartoon Animation Skill

Use this skill alongside `remotion-best-practices`, `remotion-markup`, and `remotion-interactivity` when building 2D cartoon animation videos in Remotion.

---

## 1. Core Principles for 2D Cartoon Animation in Remotion

1. **Frame-Driven Determinism**:
   - Drive every motion using `useCurrentFrame()` and `useVideoConfig()` (`fps`, `width`, `height`, `durationInFrames`).
   - Never use CSS `transition`, CSS `@keyframes`, or `requestAnimationFrame`.
2. **Interactive Timeline Structure (`<Track>` & `<Interactive.*>`)**:
   - Organize scenes into logical `<Track>` rows (e.g., `<Track name="Background">`, `<Track name="Mascot">`, `<Track name="Callouts">`, `<Track name="Captions">`).
   - Use `<Interactive.Div>`, `<Interactive.Svg>`, and `<Interactive.Path>` with descriptive `name` props so every scene element can be moved, trimmed, or keyframed in Remotion Studio.
   - Keep `style` objects and `interpolate()` calls **inline** on JSX props (`translate`, `scale`, `rotate`, `opacity`) instead of CSS `transform` strings.
   - For scale animations, always include `output: 'perceptual-scale'`.
3. **12 Principles of Cartoon Motion in Remotion**:
   - **Squash & Stretch / Overshoot**: Use `Easing.spring({damping: 10..14})` on `scale` or `poseBlend` for bouncy cartoon entrances and reactions.
   - **Ease In / Ease Out (Slow In & Slow Out)**: Use `Easing.bezier(0.65, 0, 0.35, 1)` for smooth body turns/translations and `Easing.bezier(0.16, 1, 0.3, 1)` for snappy cartoon poses.
   - **Anticipation**: Before a big movement or jump, briefly blend into a crouched or opposite pose for `0.15 * fps` to `0.25 * fps` frames.
   - **Staging & Silhouette**: Keep thick cartoon outlines (`#1f1a1f`, `6px–8px` borders) and high-contrast flat/cel-shaded backgrounds so the character silhouette reads clearly.

---

## 2. Using the Project's Master 2D Character Rigs (`character/man` & `character/woman`)

This workspace includes two complete, Studio-interactive 2.5D/2D SVG Mascot Rigs in [`character/`](../../character/README.md):
- **Male Character (`character/man`)**: [`character/man/README.md`](../../character/man/README.md) (`ManCharacter` / `Character`)
- **Female Hijabi Character (`character/woman`)**: [`character/woman/README.md`](../../character/woman/README.md) (`WomanCharacter` / `Character`)

Both characters share the exact same props interface (`expression`, `pose`, `talking`, `mouth`, `motion`, `yaw`, etc.). Always prefer importing `<ManCharacter>` and `<WomanCharacter>` from `../character` (or `../character/man` and `../character/woman`).

### Basic Usage inside `<Track>`

Both `<ManCharacter>` and `<WomanCharacter>` are wrapped with `Interactive.create` and act as timeline sequence items (accepting `name`, `from`, `durationInFrames`, and `style`).

```tsx
import {AbsoluteFill, Easing, Interactive, Track, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {ManCharacter, WomanCharacter} from '../character';

export const CartoonScene: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	return (
		<AbsoluteFill style={{background: 'linear-gradient(#cfe8ff, #f4faff)'}}>
			<Track name="Mascot">
				<ManCharacter
					name="Host Man"
					from={0}
					durationInFrames={3 * fps}
					pose="wave"
					expression="happy"
					talking
					style={{translate: '360px 120px', scale: 0.9}}
				/>
				<WomanCharacter
					name="Host Woman"
					from={0}
					durationInFrames={3 * fps}
					pose="welcome"
					expression="happy"
					style={{translate: '880px 120px', scale: 0.9}}
				/>
			</Track>
		</AbsoluteFill>
	);
};
```

### Character Framing & Coordinates
- Native size (`framing="full"`): `840 × 900 px`. Foot contact is at `95.6%` height (default transform origin, so `scale` scales from the feet).
- Available `framing` options: `'full'` (full body), `'bust'` (head + chest), `'head'` (head only).
- **Important CLI note on Windows**: Never name a `<Composition id="Character" />` as it conflicts with the `character/` directory on Windows CLI renders.

### Available Expressions (32 Presets)
`neutral` · `happy` · `laugh` · `smirk` · `sideEye` · `eyeRoll` · `surprised` · `jawDrop` · `angry` · `sad` · `worried` · `thinking` · `confused` · `wink` · `embarrassed` · `determined` · `excited` · `love` · `crying` · `sleepy` · `dizzy` · `cheeky` · `scared` · `proud` · `eureka` · `skeptical` · `nervousLaugh` · `pleading` · `relief` · `disgusted` · `furious` · `focused`

### Available Poses (28 Presets) & Locomotion
- **Static / Action Poses (`pose` / `poseTo`)**:
  `idle` · `wave` · `point` (points left) · `pointRight` · `pointUp` · `think` · `surprised` · `cheer` · `shrug` · `handsOnHips` · `armsCrossed` · `present` · `thumbsUp` · `jump` · `peace` · `facepalm` · `fistPump` · `bashful` · `stop` · `welcome` · `dance` · `idea` · `thumbsDown` · `pray` · `listen` · `clap` · `typing` · `sit`
- **Locomotion (`motion`)**:
  - `'idle'` (gentle breathing)
  - `'still'` (completely frozen)
  - `'walk'` (walk cycle in place)
  - `'run'` (run cycle in place)
  - `'dance'` (rhythmic dance cycle)

### Smooth Pose & Expression Transitions
Blend smoothly between two poses or expressions using `poseTo` + `poseBlend` and `expressionTo` + `expressionBlend` (`0` to `1`):

```tsx
<Character
	name="Pointing Transition"
	from={3 * fps}
	durationInFrames={3 * fps}
	pose="idle"
	poseTo="pointRight"
	poseBlend={interpolate(frame, [3.2 * fps, 3.6 * fps], [0, 1], {
		easing: Easing.bezier(0.16, 1, 0.3, 1),
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	})}
	expression="neutral"
	expressionTo="happy"
	expressionBlend={interpolate(frame, [3.2 * fps, 3.5 * fps], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	})}
	talking
	style={{translate: '540px 120px', scale: 0.9}}
/>
```

### Walking & Running Without Foot Sliding
Because `motion="walk"` and `motion="run"` animate steps in place, animate `style.translate` horizontally to move across the stage:
- **Walk horizontal speed**: `~150 px/sec × speed × scale`
- **Run horizontal speed**: `~310 px/sec × speed × scale`
- **Direction (`yaw`)**: Use `yaw={90}` to face/walk right, `yaw={-90}` to face/walk left, `yaw={40}` for 3/4 view, `yaw={0}` for front view.

```tsx
<Character
	name="Walk Across"
	from={0}
	durationInFrames={4 * fps}
	motion="walk"
	speed={1.25}
	yaw={90}
	style={{
		translate: interpolate(frame, [0, 4 * fps], ['-120px 120px', '564px 120px'], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}),
		scale: 0.9,
	}}
/>
```

### Lip Sync & Talking
- **Automatic Lip-Flap**: Pass `talking={true}` (or `talking`) while the character speaks; mouth shapes cycle automatically every ~0.1s with subtle head bobbing.
- **Manual Phoneme / Viseme Lip Sync**: Set `mouth` per frame/syllable:
  - Silence: `'rest'`
  - `M, B, P`: `'mbp'`
  - `A, I`: `'aa'`
  - `E`: `'ee'`
  - `O`: `'oh'`
  - `U, W, Q`: `'oo'`
  - `F, V`: `'fv'`
  - `L`: `'l'`
  - Consonants (`C, D, G, K, N, R, S, T, Y, Z`): `'etc'`
  - Expressive mouths: `'smile'`, `'neutral'`, `'flat'`, `'frown'`, `'smirk'`, `'wavy'`, `'open'`, `'grin'`, `'laugh'`, `'surprised'`, `'jawDrop'`, `'shout'`.

### Custom FK / IK Poses & Gaze Control
- Use `lookX` (`-1..1`) and `lookY` (`-1..1`) to direct pupil gaze, and `headYaw`, `headTilt`, `headNod` (degrees) for head orientation.
- For custom poses, import `EXPRESSIONS` and `POSES` from `../character` and override arm FK angles (`lift`, `swing`, `bend`, `twist`) or 3D IK targets (`target: [x, y, z]`, `hand: 'open' | 'fist' | 'point' | 'thumbsUp' | 'peace'`).
- When placing 2+ characters in the same scene, give each a unique `seed` prop (e.g. `seed="char-a"`, `seed="char-b"`) so their blinks and lip-flaps do not synchronize identically.

---

## 3. UI Design (Neuromorphism Default), Callouts & Asset Rules

**MANDATORY**: Always read and follow [`ui-ux-pro-max`](../ui-ux-pro-max/SKILL.md) whenever designing scene cards, speech bubbles, diagrams, callouts, dashboards, or visual layouts:

1. **Vector Icons (`react-icons`)**:
   - Whenever a scene, diagram, badge, or callout needs icons, use SVG icon components from [`react-icons`](https://github.com/react-icons/react-icons) (e.g., `react-icons/fa6`, `react-icons/lu`, `react-icons/tb`, `react-icons/hi2`, `react-icons/md`) instead of raw text emojis.
   - Install `react-icons` if not present (`npm install react-icons`).
2. **UI/UX Design & Neuromorphism Animation Standard (`ui-ux-pro-max`)**:
   - **Always follow [`ui-ux-pro-max`](../ui-ux-pro-max/SKILL.md)** (`nextlevelbuilder/ui-ux-pro-max-skill` rules) when building any display/UI element.
   - **Default Video & UI Style = Neuromorphism (Soft UI)**: Stage characters (`character/*`) and props (`property/*`) inside unified soft-matte canvases (`#e8eef5` light / `#1e232c` dark) with **extruded dual-shadow cards**, **recessed/inset metric wells & icon badges**, soft `borderRadius: 24px–36px`, and tactile spring/bezier shadow elevation animations (`interpolate()` driving depth smoothly).
   - Use **Bento Grid** layouts for multi-item comparisons and structured explainers.
   - Font pairing: `@remotion/google-fonts/Fredoka` (`fontWeight: 600–700`) for headers/callouts + monospace (`JetBrains Mono` / `Fira Code`) for technical labels, URLs, and IP addresses.
   - Pop-in / extrusion animation: inline `scale: interpolate(..., [0, 1], {easing: Easing.spring({damping: 16}), output: 'perceptual-scale', extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})` alongside animated dual-shadow depth.
3. **Reusable Character Rigs & Props (`character/` & `property/`)**:
   - All 12 cartoon characters live in [`character/`](../../character/README.md) (`ManCharacter`, `WomanCharacter`, `FrontendProgrammerCharacter`, `BackendProgrammerCharacter`, `BossCharacter`, `ChefCharacter`, `DoctorCharacter`, `ProjectManagerCharacter`, `TechLeadCharacter`, `FullstackProgrammerCharacter`, `QualityAssuranceCharacter`, `HackerCharacter`).
   - All 12 reusable SVG props live in [`property/`](../../property/README.md) (`Laptop`, `DesktopComputer`, `Smartphone`, `ServerRack`, `DatabaseCylinder`, `OfficeDesk`, `Whiteboard`, `CoffeeMug`, `Clipboard`, `Briefcase`, `ServingCloche`, `MedicalKit`).
4. **Image Assets (`Unsplash`)**:
   - When real-world photos, backgrounds, or visual reference images are needed, source high-resolution images from **Unsplash** (`https://images.unsplash.com/photo-<id>?auto=format&fit=crop&w=1200&q=80`) and render them using Remotion's `<Img>` or `<CanvasImage>` so frames wait for image loading.
5. **Complex Animations (`GSAP` — `greensock/gsap-skills`)**:
   - When a scene requires complex choreography, multi-element staggered sequences, intricate SVG animations, or custom elastic/bounce eases, load the installed **GSAP skills** from [`greensock/gsap-skills`](https://github.com/greensock/gsap-skills).
   - Inside Remotion components, always create paused timelines (`gsap.timeline({ paused: true })`) and scrub them deterministically with `tl.seek(frame / fps)` inside `useLayoutEffect` / `useEffect` tied to `useCurrentFrame()`.

---

## 4. Workflow Checklist for Creating a New 2D Cartoon Video

1. **Read `remotion-best-practices`, `remotion-interactivity`, and `ui-ux-pro-max`** to ensure Studio-editable markup and pro-grade UI/UX design in **Neuromorphism** style.
2. **Store Video Content Code in `src/content/*`**:
   - Save all video content compositions, scenes, illustrations, and raw content files inside `src/content/*` (for example, `src/content/HowInternetWorks.tsx` or `src/content/<topic>/...`).
   - When importing the character rigs or props from inside `src/content/*`, import from `../../character` / `../../property` (or `../../../character` / `../../../property` if nested in a subfolder).
3. **Ensure `react-icons` is installed** (`npm install react-icons`) when building icon-rich scenes or diagrams, and use **Unsplash** (`<Img src="https://images.unsplash.com/..." />`) when photographic assets are needed.
4. **Design the Scene Timeline**:
   - Break the story into clear beats (`<Track name="Background">`, `<Track name="Mascot">`, `<Track name="Props">`, `<Track name="Callouts">`, `<Track name="Audio">`).
5. **Register in `src/Root.tsx`**:
   - Import the composition from `./content/...` and keep `id`, `width`, `height`, `fps`, `durationInFrames`, and `defaultProps` inline on `<Composition>`.
6. **Preview in Remotion Studio**:
   - Start Studio (`npx remotion studio`) or render verification stills (`npx remotion still <CompId> out/check.png --frame=<N>`) and run `npm run lint` (`eslint src character property && tsc`) to verify zero TypeScript or Remotion ESLint errors.

