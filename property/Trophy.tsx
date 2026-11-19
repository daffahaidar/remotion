import React from 'react';
import {Interactive, useCurrentFrame, useVideoConfig} from 'remotion';
import {PROP_COLORS, PROP_INK, PROP_OW, PropShadow, propVariants} from './shared';

export type TrophyVariant = 'gold' | 'silver' | 'bronze';

export type TrophyProps = {
	readonly variant?: TrophyVariant;
	readonly label?: string;
	readonly sparkle?: boolean;
	readonly style?: React.CSSProperties;
};

const VARIANTS: readonly TrophyVariant[] = ['gold', 'silver', 'bronze'];
const PALETTES: Record<TrophyVariant, {readonly main: string; readonly shade: string; readonly light: string}> = {
	gold: {main: '#fbbf24', shade: '#d97706', light: '#fde68a'},
	silver: {main: '#cbd5e1', shade: '#64748b', light: '#f1f5f9'},
	bronze: {main: '#d97706', shade: '#92400e', light: '#fbbf24'},
};

const star = (cx: number, cy: number, r: number) =>
	Array.from({length: 10}, (_, i) => {
		const a = (i * Math.PI) / 5 - Math.PI / 2;
		const rr = i % 2 === 0 ? r : r * 0.45;
		return `${i === 0 ? 'M' : 'L'} ${cx + rr * Math.cos(a)} ${cy + rr * Math.sin(a)}`;
	}).join(' ') + ' Z';

const SPARKLE = 'M 0 -14 L 4 -4 L 14 0 L 4 4 L 0 14 L -4 4 L -14 0 L -4 -4 Z';

const TrophyInner: React.FC<TrophyProps> = ({variant = 'gold', label = '#1', sparkle = true, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const t = frame / fps;
	const pal = PALETTES[variant];

	return (
		<svg viewBox="0 0 200 250" width={200} height={250} style={{overflow: 'visible', transformOrigin: '50% 94%', ...style}}>
			<PropShadow cx={100} cy={236} rx={78} ry={10} />

			{/* Handles */}
			{['M 50 52 Q 14 52 18 84 Q 22 110 56 112', 'M 150 52 Q 186 52 182 84 Q 178 110 144 112'].map((d) => (
				<g key={d}>
					<path d={d} fill="none" stroke={PROP_INK} strokeWidth={17} strokeLinecap="round" />
					<path d={d} fill="none" stroke={pal.main} strokeWidth={7} strokeLinecap="round" />
				</g>
			))}

			{/* Stem + bases */}
			<path d="M 88 144 L 112 144 L 118 178 L 82 178 Z" fill={pal.shade} stroke={PROP_INK} strokeWidth={PROP_OW} strokeLinejoin="round" />
			<rect x={58} y={174} width={84} height={20} rx={6} fill={pal.main} stroke={PROP_INK} strokeWidth={PROP_OW} />
			<rect x={46} y={192} width={108} height={40} rx={8} fill={PROP_COLORS.slateDark} stroke={PROP_INK} strokeWidth={PROP_OW} />
			<rect x={70} y={201} width={60} height={22} rx={4} fill={pal.light} stroke={PROP_INK} strokeWidth={3} />
			{label ? (
				<text x={100} y={217} textAnchor="middle" fill={PROP_INK} fontFamily="ui-monospace, monospace" fontWeight={800} fontSize={14}>
					{label}
				</text>
			) : null}

			{/* Cup */}
			<path d="M 46 34 L 154 34 L 150 92 Q 144 140 100 146 Q 56 140 50 92 Z" fill={pal.main} stroke={PROP_INK} strokeWidth={PROP_OW} strokeLinejoin="round" />
			<path d="M 126 40 L 150 40 L 147 92 Q 142 132 108 142 Q 130 120 128 90 Z" fill={pal.shade} opacity={0.55} />
			<path d="M 66 50 L 68 100" stroke={PROP_COLORS.white} strokeWidth={7} strokeLinecap="round" opacity={0.55} />
			<path d={star(100, 84, 20)} fill={pal.light} stroke={PROP_INK} strokeWidth={3.5} strokeLinejoin="round" />
			<rect x={38} y={24} width={124} height={18} rx={9} fill={pal.light} stroke={PROP_INK} strokeWidth={PROP_OW} />

			{sparkle
				? [
						[168, 26, 0],
						[30, 150, 1.6],
					].map(([x, y, phase]) => (
						<path
							key={x}
							d={SPARKLE}
							transform={`translate(${x} ${y}) scale(${0.6 + 0.45 * Math.abs(Math.sin(t * 3 + phase))})`}
							fill={pal.light}
							stroke={PROP_INK}
							strokeWidth={2.5}
							strokeLinejoin="round"
						/>
					))
				: null}
		</svg>
	);
};

/** Reusable 2D cartoon trophy for achievements, launches & "employee of the month". */
export const Trophy = Interactive.create({
	Component: TrophyInner,
	layout: 'none',
	componentName: 'TrophyProp',
	schema: {
		variant: {type: 'enum', default: 'gold', description: 'Medal finish', variants: propVariants(VARIANTS), keyframable: false},
		label: {type: 'string', default: '#1', description: 'Plaque text'},
		sparkle: {type: 'boolean', default: true, description: 'Sparkles'},
	},
});
