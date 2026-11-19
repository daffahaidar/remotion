import {Audio} from '@remotion/media';
import React, {createContext, useContext} from 'react';
import type {IconType} from 'react-icons';
import {AbsoluteFill, Easing, interpolate, random, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {MONO, SANS, SFX, THEME, TONES, type ThemeName, type Tone} from './theme';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const ThemeCtx = createContext<ThemeName>('light');

/** Current canvas tokens + a resolver for text-safe tone colors. */
export const useLook = () => {
	const name = useContext(ThemeCtx);
	return {...THEME[name], name, tone: (t: Tone) => TONES[t][name]};
};
type Look = ReturnType<typeof useLook>;
export const raised = (look: Look, d = 10) =>
	`${-d}px ${-d}px ${d * 2.2}px ${look.hi}, ${d}px ${d}px ${d * 2.2}px ${look.lo}`;

/** Seconds since the scene started. */
export const useSec = () => useCurrentFrame() / useVideoConfig().fps;

/** Spring 0 → 1 starting `at` seconds into the scene. */
export const useIn = (at: number, damping = 14) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	return spring({frame: Math.max(0, frame - at * fps), fps, config: {damping, stiffness: 170, mass: 0.9}});
};

/** Eased 0 → 1 between `at` and `at + dur` seconds. */
export const useRamp = (at: number, dur: number, easing: (t: number) => number = Easing.bezier(0.65, 0, 0.35, 1)) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	return interpolate(frame, [at * fps, (at + dur) * fps], [0, 1], {...clamp, easing});
};

/** Deterministic camera shake (px offset string) for `dur` seconds after `at`. */
export const useShake = (at: number, dur = 0.45, amp = 16) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const k = (frame - at * fps) / (dur * fps);
	if (k < 0 || k > 1) return '0px 0px';
	const a = amp * (1 - k);
	return `${(random(`sx${frame}`) - 0.5) * 2 * a}px ${(random(`sy${frame}`) - 0.5) * 2 * a}px`;
};

export const Sfx: React.FC<{readonly src: string; readonly at: number; readonly volume?: number; readonly name?: string}> = ({
	src,
	at,
	volume = 0.6,
	name,
}) => {
	const {fps} = useVideoConfig();
	return <Audio name={name} src={src} from={Math.round(at * fps)} volume={volume} />;
};

const Chapter: React.FC<{readonly label: string; readonly icon?: IconType}> = ({label, icon: Icon}) => {
	const look = useLook();
	const p = useIn(-0.1, 16);
	return (
		<div style={{position: 'absolute', top: 190, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: p, translate: `0px ${(1 - p) * -40}px`}}>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: 14,
					padding: '14px 30px',
					borderRadius: 999,
					backgroundColor: look.bg,
					border: `1px solid ${look.edge}`,
					boxShadow: raised(look, 6),
					fontSize: 28,
					fontWeight: 800,
					letterSpacing: '0.14em',
					color: look.dim,
				}}
			>
				{Icon ? <Icon size={28} color={look.tone('primary')} /> : null}
				{label.toUpperCase()}
			</div>
		</div>
	);
};

type ShellProps = {
	readonly theme?: ThemeName;
	readonly chapter?: string;
	readonly chapterIcon?: IconType;
	/** Radial accent light behind the content (any CSS color). */
	readonly glow?: string;
	readonly whoosh?: boolean;
	/** Punch-in entrance; disable for the very first scene so frame 0 is already a full picture. */
	readonly cut?: boolean;
	/** Camera shake moment, in seconds. */
	readonly shakeAt?: number;
	readonly children: React.ReactNode;
};

/** Neumorphic canvas + punch-in cut + chapter pill + entry whoosh. */
export const SceneShell: React.FC<ShellProps> = ({theme = 'light', chapter, chapterIcon, glow, whoosh = true, cut = true, shakeAt = -10, children}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const t = THEME[theme];
	const enter = cut ? interpolate(frame, [0, 0.4 * fps], [0, 1], {...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1)}) : 1;
	const shake = useShake(shakeAt);
	return (
		<ThemeCtx.Provider value={theme}>
			<AbsoluteFill style={{backgroundColor: t.bg, color: t.text, fontFamily: SANS, overflow: 'hidden'}}>
				<AbsoluteFill
					style={{
						backgroundImage: `radial-gradient(${t.grid} 2.2px, transparent 2.8px)`,
						backgroundSize: '46px 46px',
						backgroundPosition: `0px ${(frame * 0.6) % 46}px`,
					}}
				/>
				{glow ? <AbsoluteFill style={{background: `radial-gradient(circle at 50% 46%, ${glow} 0%, transparent 62%)`}} /> : null}
				<AbsoluteFill
					style={{
						// Never fully transparent: frame 0 of a cut must already show the new scene.
						opacity: Math.min(1, 0.55 + enter),
						scale: 1.08 - 0.08 * enter,
						translate: shake,
						filter: enter < 1 ? `blur(${(1 - enter) * 12}px)` : undefined,
					}}
				>
					{children}
				</AbsoluteFill>
				{theme === 'dark' ? (
					<AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, transparent 55%, rgba(0, 0, 0, 0.5) 100%)'}} />
				) : null}
				{chapter ? <Chapter label={chapter} icon={chapterIcon} /> : null}
				{whoosh ? <Audio name="Cut whoosh" src={SFX.whoosh} volume={0.3} /> : null}
			</AbsoluteFill>
		</ThemeCtx.Provider>
	);
};

type HeadlineProps = {
	/** Words wrapped in *asterisks* get the accent color + marker. */
	readonly text: string;
	readonly top: number;
	readonly at?: number;
	readonly out?: number;
	readonly size?: number;
	readonly tone?: Tone;
	readonly width?: number;
};

/** Kinetic headline: words spring in one by one, highlighted words get a marker swipe. */
// Default `at` is slightly before the cut, so a scene's first frame already shows its headline.
export const Headline: React.FC<HeadlineProps> = ({text, top, at = -0.08, out = 999, size = 92, tone = 'primary', width = 920}) => {
	const look = useLook();
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const gone = useRamp(out, 0.3);
	let inMark = false;
	const words = text.split(' ').map((raw) => {
		const start = raw.startsWith('*');
		const mark = inMark || start;
		inMark = mark && !raw.endsWith('*');
		return {word: raw.replace(/\*/g, ''), mark};
	});
	if (gone >= 1) return null;
	return (
		<div
			style={{
				position: 'absolute',
				top,
				left: (1080 - width) / 2,
				width,
				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'center',
				columnGap: size * 0.26,
				fontSize: size,
				fontWeight: 800,
				lineHeight: 1.12,
				letterSpacing: '-0.02em',
				opacity: 1 - gone,
				translate: `0px ${gone * -40}px`,
			}}
		>
			{words.map(({word, mark}, i) => {
				const t0 = (at + i * 0.08) * fps;
				const p = spring({frame: Math.max(0, frame - t0), fps, config: {damping: 13, stiffness: 180}});
				const swipe = interpolate(frame, [t0 + 0.15 * fps, t0 + 0.45 * fps], [0, 1], clamp);
				return (
					<span
						key={`${i}-${word}`}
						style={{
							position: 'relative',
							display: 'inline-block',
							opacity: Math.min(1, p * 1.6),
							translate: `0px ${(1 - p) * 50}px`,
							scale: 0.7 + 0.3 * p,
							color: mark ? look.tone(tone) : look.text,
						}}
					>
						{mark ? (
							<span
								style={{
									position: 'absolute',
									left: -6,
									right: -6,
									bottom: size * 0.06,
									height: size * 0.32,
									borderRadius: 10,
									backgroundColor: TONES[tone].fill,
									opacity: look.name === 'dark' ? 0.32 : 0.2,
									scale: `${swipe} 1`,
									transformOrigin: 'left center',
								}}
							/>
						) : null}
						<span style={{position: 'relative'}}>{word}</span>
					</span>
				);
			})}
		</div>
	);
};

type RevealProps = {
	readonly at: number;
	readonly out?: number;
	readonly kind?: 'pop' | 'rise' | 'fade' | 'left' | 'right' | 'drop';
	readonly damping?: number;
	readonly style?: React.CSSProperties;
	readonly children: React.ReactNode;
};

/** Absolutely positioned block that springs in at `at` and fades out at `out` (seconds). */
export const Reveal: React.FC<RevealProps> = ({at, out = 999, kind = 'pop', damping = 13, style, children}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const p = useIn(at, damping);
	const q = useRamp(out, 0.3);
	if (frame < at * fps || q >= 1) return null;
	const shift = {
		pop: '0px 0px',
		fade: '0px 0px',
		rise: `0px ${(1 - p) * 70}px`,
		drop: `0px ${(1 - p) * -90}px`,
		left: `${(1 - p) * -160}px 0px`,
		right: `${(1 - p) * 160}px 0px`,
	}[kind];
	return (
		<div
			style={{
				position: 'absolute',
				...style,
				opacity: Math.min(1, p * 1.5) * (1 - q),
				translate: shift,
				scale: (kind === 'pop' ? 0.45 + 0.55 * p : 1) * (1 - 0.12 * q),
			}}
		>
			{children}
		</div>
	);
};

/** Neumorphic surface whose extrusion grows in from the canvas. */
export const Card: React.FC<{
	readonly at?: number;
	readonly pressed?: boolean;
	readonly tone?: Tone;
	readonly radius?: number;
	readonly style?: React.CSSProperties;
	readonly children?: React.ReactNode;
}> = ({at = 0, pressed, tone, radius = 32, style, children}) => {
	const look = useLook();
	const d = 11 * useIn(at, 16);
	const ring = tone ? `, 0 0 0 3px ${TONES[tone].fill}55` : '';
	return (
		<div
			style={{
				backgroundColor: look.bg,
				borderRadius: radius,
				border: `1px solid ${look.edge}`,
				boxShadow: (pressed ? look.inset : `${-d}px ${-d}px ${d * 2.2}px ${look.hi}, ${d}px ${d}px ${d * 2.2}px ${look.lo}`) + ring,
				...style,
			}}
		>
			{children}
		</div>
	);
};

export const IconTile: React.FC<{readonly icon: IconType; readonly tone?: Tone; readonly size?: number; readonly raisedTile?: boolean}> = ({
	icon: Icon,
	tone = 'primary',
	size = 88,
	raisedTile,
}) => {
	const look = useLook();
	return (
		<div
			style={{
				width: size,
				height: size,
				flexShrink: 0,
				borderRadius: size * 0.3,
				backgroundColor: look.bg,
				boxShadow: raisedTile ? raised(look, 6) : look.inset,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Icon size={size * 0.48} color={look.tone(tone)} />
		</div>
	);
};

/** Rounded label. `solid` = filled accent with white text (for JWT part names). */
export const Pill: React.FC<{
	readonly icon?: IconType;
	readonly tone?: Tone;
	readonly size?: number;
	readonly solid?: boolean;
	readonly mono?: boolean;
	readonly children: React.ReactNode;
}> = ({icon: Icon, tone = 'primary', size = 34, solid, mono, children}) => {
	const look = useLook();
	const color = solid ? '#ffffff' : look.tone(tone);
	return (
		<div
			style={{
				display: 'inline-flex',
				alignItems: 'center',
				gap: size * 0.35,
				padding: `${size * 0.32}px ${size * 0.7}px`,
				borderRadius: 999,
				backgroundColor: solid ? TONES[tone].fill : look.bg,
				boxShadow: solid ? `0 10px 24px ${TONES[tone].fill}55` : raised(look, 6),
				border: solid ? 'none' : `1px solid ${look.edge}`,
				color,
				fontSize: size,
				fontWeight: 800,
				fontFamily: mono ? MONO : SANS,
				whiteSpace: 'nowrap',
			}}
		>
			{Icon ? <Icon size={size * 0.95} color={color} /> : null}
			{children}
		</div>
	);
};

/** Comic speech bubble with a tail. */
export const Bubble: React.FC<{
	readonly tail?: 'left' | 'right' | 'down';
	readonly tone?: Tone;
	readonly size?: number;
	readonly children: React.ReactNode;
}> = ({tail = 'down', tone, size = 44, children}) => {
	const look = useLook();
	const tailPos: React.CSSProperties =
		tail === 'down' ? {left: '50%', bottom: -14, marginLeft: -16} : tail === 'left' ? {left: -14, top: '50%', marginTop: -16} : {right: -14, top: '50%', marginTop: -16};
	return (
		<div
			style={{
				position: 'relative',
				padding: `${size * 0.42}px ${size * 0.7}px`,
				borderRadius: size * 0.7,
				backgroundColor: look.bubble,
				boxShadow: `0 14px 34px ${look.lo}`,
				border: tone ? `4px solid ${TONES[tone].fill}` : `1px solid ${look.edge}`,
				color: tone ? look.tone(tone) : look.text,
				fontSize: size,
				fontWeight: 800,
				whiteSpace: 'nowrap',
			}}
		>
			<div
				style={{
					position: 'absolute',
					width: 32,
					height: 32,
					rotate: '45deg',
					backgroundColor: look.bubble,
					borderRight: tone && tail !== 'left' ? `4px solid ${TONES[tone].fill}` : undefined,
					borderBottom: tone && tail !== 'right' ? `4px solid ${TONES[tone].fill}` : undefined,
					borderLeft: tone && tail === 'left' ? `4px solid ${TONES[tone].fill}` : undefined,
					borderTop: tone && tail === 'right' ? `4px solid ${TONES[tone].fill}` : undefined,
					...tailPos,
				}}
			/>
			<span style={{position: 'relative'}}>{children}</span>
		</div>
	);
};

/** Rubber stamp that slams onto the screen at `at`. */
export const Stamp: React.FC<{
	readonly at: number;
	readonly out?: number;
	readonly tone?: Tone;
	readonly rotate?: number;
	readonly size?: number;
	readonly style?: React.CSSProperties;
	readonly children: React.ReactNode;
}> = ({at, out = 999, tone = 'danger', rotate = -9, size = 80, style, children}) => {
	const look = useLook();
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const p = interpolate(frame, [at * fps, (at + 0.2) * fps], [0, 1], {...clamp, easing: Easing.in(Easing.cubic)});
	const settle = useIn(at + 0.2, 8);
	const gone = useRamp(out, 0.25);
	if (frame < at * fps || gone >= 1) return null;
	const fill = TONES[tone].fill;
	return (
		<div
			style={{
				position: 'absolute',
				display: 'flex',
				justifyContent: 'center',
				...style,
				opacity: p * (1 - gone),
				scale: (2.6 - 1.6 * p) * (1 + 0.05 * Math.sin(settle * Math.PI)),
				rotate: `${rotate}deg`,
			}}
		>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: 18,
					border: `8px solid ${fill}`,
					color: look.tone(tone),
					borderRadius: 26,
					padding: '10px 34px',
					fontSize: size,
					fontWeight: 800,
					letterSpacing: '0.03em',
					backgroundColor: look.name === 'dark' ? 'rgba(30, 35, 44, 0.92)' : 'rgba(240, 244, 249, 0.94)',
					boxShadow: `0 0 0 6px ${fill}22, 0 24px 60px ${fill}55`,
					whiteSpace: 'nowrap',
				}}
			>
				{children}
			</div>
		</div>
	);
};

/** Typewriter text with a blinking block caret. */
export const TypeText: React.FC<{
	readonly text: string;
	readonly at: number;
	readonly cps?: number;
	readonly caret?: boolean;
	readonly style?: React.CSSProperties;
}> = ({text, at, cps = 28, caret = true, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const n = Math.max(0, Math.min(text.length, Math.floor((frame / fps - at) * cps)));
	const blinkOn = n < text.length || Math.floor(frame / (fps * 0.45)) % 2 === 0;
	return (
		<span style={style}>
			{text.slice(0, n)}
			{caret && frame >= at * fps && blinkOn ? (
				<span style={{display: 'inline-block', width: '0.55em', height: '1em', marginLeft: 4, verticalAlign: '-0.15em', backgroundColor: 'currentColor', opacity: 0.8}} />
			) : null}
		</span>
	);
};

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

/** Text that scrambles from `from` and resolves left-to-right into `text` during [at, at + dur]. */
export const Scramble: React.FC<{
	readonly text: string;
	readonly from?: string;
	readonly at: number;
	readonly dur?: number;
	readonly style?: React.CSSProperties;
}> = ({text, from, at, dur = 0.8, style}) => {
	const frame = useCurrentFrame();
	const p = useRamp(at, dur, Easing.linear);
	const tick = Math.floor(frame / 2);
	if (p <= 0) return <span style={style}>{from ?? text}</span>;
	const out = Array.from(text, (ch, i) => (i / text.length < p ? ch : GLYPHS[Math.floor(random(`g${i}-${tick}`) * GLYPHS.length)])).join('');
	return <span style={style}>{out}</span>;
};

/** The three JWT parts in their colors. Parts stay neutral until their `colorAt` time. */
export const TokenText: React.FC<{
	readonly parts: readonly [string, string, string];
	readonly colorAt?: readonly [number, number, number];
	readonly size?: number;
	readonly typeAt?: number;
	readonly cps?: number;
	/** From this time the two separator dots grow and turn gold. */
	readonly dotAt?: number;
	readonly style?: React.CSSProperties;
}> = ({parts, colorAt = [0, 0, 0], size = 36, typeAt, cps = 70, dotAt = 999, style}) => {
	const look = useLook();
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const t = frame / fps;
	const shown = typeAt === undefined ? Infinity : Math.max(0, Math.floor((t - typeAt) * cps));
	const tones: readonly Tone[] = ['header', 'payload', 'signature'];
	let used = 0;
	return (
		<div style={{fontFamily: MONO, fontSize: size, fontWeight: 700, lineHeight: 1.4, wordBreak: 'break-all', ...style}}>
			{parts.map((part, i) => {
				const visible = part.slice(0, Math.max(0, shown - used));
				const dot = i < 2 && shown - used > part.length ? '.' : '';
				used += part.length + 1;
				const on = t >= colorAt[i];
				const glow = interpolate(t, [colorAt[i], colorAt[i] + 0.25, colorAt[i] + 0.9], [0, 1, 0.35], clamp);
				return (
					<React.Fragment key={tones[i]}>
						<span
							style={{
								color: on ? look.tone(tones[i]) : look.dim,
								backgroundColor: on ? `${TONES[tones[i]].fill}${Math.round(glow * 40).toString(16).padStart(2, '0')}` : undefined,
								borderRadius: 8,
							}}
						>
							{visible}
						</span>
						{dot ? (
							<span
								style={{
									color: t >= dotAt ? look.tone('gold') : look.text,
									fontWeight: 800,
									fontSize: size * (1.25 + 0.9 * interpolate(t, [dotAt, dotAt + 0.3, dotAt + 1.2], [0, 1, 0.45], clamp)),
									lineHeight: 0.8,
								}}
							>
								{dot}
							</span>
						) : null}
					</React.Fragment>
				);
			})}
		</div>
	);
};

/** Straight arrow (1080x1920 canvas coordinates) that draws itself in. */
export const Arrow: React.FC<{
	readonly x1: number;
	readonly y1: number;
	readonly x2: number;
	readonly y2: number;
	readonly at: number;
	readonly dur?: number;
	readonly tone?: Tone;
	readonly width?: number;
	readonly dashed?: boolean;
}> = ({x1, y1, x2, y2, at, dur = 0.5, tone = 'primary', width = 8, dashed}) => {
	const look = useLook();
	const p = useRamp(at, dur, Easing.bezier(0.16, 1, 0.3, 1));
	if (p <= 0) return null;
	const ang = Math.atan2(y2 - y1, x2 - x1);
	const xe = x1 + (x2 - x1) * p;
	const ye = y1 + (y2 - y1) * p;
	const color = look.tone(tone);
	return (
		<svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
			<line
				x1={x1}
				y1={y1}
				x2={xe - Math.cos(ang) * 14}
				y2={ye - Math.sin(ang) * 14}
				stroke={color}
				strokeWidth={width}
				strokeLinecap="round"
				strokeDasharray={dashed ? '4 18' : undefined}
			/>
			<polygon points="-30,-17 0,0 -30,17" fill={color} transform={`translate(${xe} ${ye}) rotate(${(ang * 180) / Math.PI})`} />
		</svg>
	);
};

/** Moves its children from `from` to `to` (canvas coords, element centered) along an arc. */
export const Travel: React.FC<{
	readonly from: readonly [number, number];
	readonly to: readonly [number, number];
	readonly at: number;
	readonly dur?: number;
	readonly arc?: number;
	readonly keep?: boolean;
	readonly children: React.ReactNode;
}> = ({from, to, at, dur = 0.8, arc = -120, keep, children}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const p = useRamp(at, dur, Easing.bezier(0.45, 0, 0.2, 1));
	if (frame < at * fps || (!keep && p >= 1)) return null;
	const cx = (from[0] + to[0]) / 2;
	const cy = (from[1] + to[1]) / 2 + arc;
	const x = (1 - p) ** 2 * from[0] + 2 * (1 - p) * p * cx + p ** 2 * to[0];
	const y = (1 - p) ** 2 * from[1] + 2 * (1 - p) * p * cy + p ** 2 * to[1];
	return (
		<div style={{position: 'absolute', left: x, top: y, translate: '-50% -50%', opacity: Math.min(1, p * 6), scale: 0.6 + 0.4 * Math.min(1, p * 4)}}>
			{children}
		</div>
	);
};

/** Soft radial light, used to lift dark-outlined rigs off the dark canvas. */
export const Glow: React.FC<{readonly x: number; readonly y: number; readonly r: number; readonly color: string; readonly opacity?: number}> = ({
	x,
	y,
	r,
	color,
	opacity = 1,
}) => (
	<div
		style={{
			position: 'absolute',
			left: x - r,
			top: y - r,
			width: r * 2,
			height: r * 2,
			borderRadius: '50%',
			background: `radial-gradient(circle, ${color} 0%, transparent 68%)`,
			opacity,
		}}
	/>
);

/** Positions a character rig (840x900 viewBox, feet at y = 860) so its feet stand on (x, floor). */
export const Actor: React.FC<{readonly x: number; readonly floor: number; readonly children: React.ReactNode}> = ({x, floor, children}) => (
	<div style={{position: 'absolute', left: x - 420, top: floor - 860, width: 840, height: 900}}>{children}</div>
);

/** Positions a prop by its top-left corner with a uniform scale. */
export const Place: React.FC<{readonly x: number; readonly y: number; readonly scale?: number; readonly children: React.ReactNode}> = ({
	x,
	y,
	scale = 1,
	children,
}) => <div style={{position: 'absolute', left: x, top: y, scale, transformOrigin: 'top left'}}>{children}</div>;
