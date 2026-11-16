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

## 2. Using the Project's Master 2D Character Rig (`character/`)

This workspace includes a complete, Studio-interactive 2.5D/2D SVG Mascot Rig in [`character/`](../../character/README.md). Always prefer importing `<Character>` from `../character` rather than drawing throwaway characters from scratch unless asked for a new character.

### Basic Usage inside `<Track>`

`<Character>` is already wrapped with `Interactive.create` and acts as a timeline sequence item (accepting `name`, `from`, `durationInFrames`, and `style`).

```tsx
import {AbsoluteFill, Easing, Interactive, Track, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Character} from '../character';

export const CartoonScene: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	return (
		<AbsoluteFill style={{background: 'linear-gradient(#cfe8ff, #f4faff)'}}>
			<Track name="Mascot">
				<Character
					name="Greeting"
					from={0}
					durationInFrames={3 * fps}
					pose="wave"
					expression="happy"
					talking
					style={{translate: '540px 120px', scale: 0.9}}
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

## 3. Cartoon Speech Bubbles, Callouts & Props

Style callout cards, speech bubbles, and titles to match the 2D cartoon aesthetic:
- Font: `@remotion/google-fonts/Fredoka` (`fontWeight: 600`)
- Cartoon stroke: `border: '8px solid #1f1a1f'`, rounded corners (`borderRadius: 40` to `80`), crisp white or pastel fill.
- Pop-in animation: inline `scale: interpolate(..., [0, 1], {easing: Easing.spring({damping: 12}), output: 'perceptual-scale', extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})`.

---

## 4. Workflow Checklist for Creating a New 2D Cartoon Video

1. **Read `remotion-best-practices` and `remotion-interactivity`** to ensure Studio-editable markup.
2. **Design the Scene Timeline**:
   - Break the story into clear beats (`<Track name="Background">`, `<Track name="Mascot">`, `<Track name="Props">`, `<Track name="Callouts">`, `<Track name="Audio">`).
3. **Register in `src/Root.tsx`**:
   - Keep `id`, `width`, `height`, `fps`, `durationInFrames`, and `defaultProps` inline on `<Composition>`.
4. **Preview in Remotion Studio**:
   - Start Studio (`npx remotion studio`) or render verification stills (`npx remotion still <CompId> out/check.png --frame=<N>`) and run `npm run lint` (`eslint src character && tsc`) to verify zero TypeScript or Remotion ESLint errors.

