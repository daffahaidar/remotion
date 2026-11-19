import React from 'react';
import {Interactive, useCurrentFrame, useVideoConfig} from 'remotion';
import {
	ACCENTS,
	ACCENT_NAMES,
	PROP_COLORS,
	PROP_INK,
	PROP_OW,
	PropShadow,
	propVariants,
	type AccentColor,
} from './shared';

export type BugState = 'alive' | 'squashed';

export type BugProps = {
	readonly color?: AccentColor;
	readonly state?: BugState;
	readonly animated?: boolean;
	readonly style?: React.CSSProperties;
};

const STATES: readonly BugState[] = ['alive', 'squashed'];
const SPOTS = [
	[68, 78, 9],
	[120, 70, 8],
	[138, 94, 7],
	[78, 100, 6],
] as const;

const BugInner: React.FC<BugProps> = ({color = 'red', state = 'alive', animated = true, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const t = animated ? frame / fps : 0;
	const pal = ACCENTS[color];

	if (state === 'squashed') {
		return (
			<svg
				viewBox="0 0 200 160"
				width={200}
				height={160}
				style={{overflow: 'visible', transformOrigin: '50% 90%', ...style}}
			>
				<ellipse cx={100} cy={146} rx={92} ry={12} fill={pal.main} opacity={0.25} />
				{[
					[64, 138, 40, 152],
					[98, 140, 94, 156],
					[130, 138, 154, 152],
				].map(([x1, y1, x2, y2]) => (
					<line
						key={x1}
						x1={x1}
						y1={y1}
						x2={x2}
						y2={y2}
						stroke={PROP_INK}
						strokeWidth={PROP_OW}
						strokeLinecap="round"
					/>
				))}
				<path
					d="M 36 142 C 42 116, 150 114, 160 142 Q 98 152 36 142 Z"
					fill={pal.main}
					stroke={PROP_INK}
					strokeWidth={PROP_OW}
					strokeLinejoin="round"
				/>
				<ellipse cx={72} cy={132} rx={8} ry={4} fill={PROP_INK} opacity={0.8} />
				<ellipse cx={120} cy={130} rx={7} ry={3.5} fill={PROP_INK} opacity={0.8} />
				<ellipse cx={174} cy={142} rx={18} ry={9} fill={PROP_COLORS.slateDark} stroke={PROP_INK} strokeWidth={5} />
				{[168, 180].map((ex) => (
					<path
						key={ex}
						d={`M ${ex - 3} 139 L ${ex + 3} 145 M ${ex + 3} 139 L ${ex - 3} 145`}
						stroke={PROP_COLORS.white}
						strokeWidth={2.5}
						strokeLinecap="round"
					/>
				))}
				{/* Impact lines */}
				{['M 70 110 L 64 96', 'M 100 106 L 100 90', 'M 130 110 L 136 96'].map((d) => (
					<path key={d} d={d} stroke={PROP_INK} strokeWidth={4} strokeLinecap="round" />
				))}
			</svg>
		);
	}

	const bob = -Math.abs(Math.sin(t * 7)) * 2;
	const antenna = Math.sin(t * 6) * 3;

	return (
		<svg
			viewBox="0 0 200 160"
			width={200}
			height={160}
			style={{overflow: 'visible', transformOrigin: '50% 90%', ...style}}
		>
			<PropShadow cx={104} cy={148} rx={72} ry={8} />

			{/* Wiggling legs */}
			{[70, 100, 128].map((x, i) => (
				<path
					key={x}
					d={`M ${x} 106 L ${x - 8} 130 L ${x - 2} 146`}
					transform={`rotate(${Math.sin(t * 14 + i * 2.1) * 14} ${x} 106)`}
					fill="none"
					stroke={PROP_INK}
					strokeWidth={PROP_OW}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			))}

			<g transform={`translate(0 ${bob})`}>
				{/* Antennae */}
				{[
					[160, 74, 150 + antenna, 44],
					[174, 74, 188 - antenna, 44],
				].map(([x1, y1, x2, y2]) => (
					<g key={x1}>
						<path
							d={`M ${x1} ${y1} Q ${(x1 + x2) / 2} ${y1 - 22} ${x2} ${y2}`}
							fill="none"
							stroke={PROP_INK}
							strokeWidth={5}
							strokeLinecap="round"
						/>
						<circle cx={x2} cy={y2} r={6} fill={pal.main} stroke={PROP_INK} strokeWidth={3.5} />
					</g>
				))}

				{/* Head */}
				<circle cx={166} cy={96} r={24} fill={PROP_COLORS.slateDark} stroke={PROP_INK} strokeWidth={PROP_OW} />
				{[
					[162, 88, 8],
					[178, 90, 8.5],
				].map(([cx, cy, r]) => (
					<g key={cx}>
						<circle cx={cx} cy={cy} r={r} fill={PROP_COLORS.white} stroke={PROP_INK} strokeWidth={3} />
						<circle cx={cx + 3} cy={cy + 1} r={3.8} fill={PROP_INK} />
					</g>
				))}
				<path
					d="M 164 106 Q 174 114 184 103"
					fill="none"
					stroke={PROP_COLORS.paper}
					strokeWidth={3}
					strokeLinecap="round"
				/>

				{/* Shell */}
				<path
					d="M 33 108 C 33 58, 70 44, 98 44 C 130 44, 158 62, 158 108 Q 96 120 33 108 Z"
					fill={pal.main}
					stroke={PROP_INK}
					strokeWidth={PROP_OW}
					strokeLinejoin="round"
				/>
				<path
					d="M 128 52 C 148 64, 156 84, 155 106 Q 140 110 124 111 C 140 92, 138 70, 128 52 Z"
					fill={pal.shade}
					opacity={0.55}
				/>
				<path d="M 98 46 Q 92 80 94 114" fill="none" stroke={PROP_INK} strokeWidth={4} strokeLinecap="round" />
				{SPOTS.map(([cx, cy, r]) => (
					<circle key={cx} cx={cx} cy={cy} r={r} fill={PROP_INK} opacity={0.82} />
				))}
				<path
					d="M 50 76 Q 60 58 82 52"
					fill="none"
					stroke={PROP_COLORS.white}
					strokeWidth={6}
					strokeLinecap="round"
					opacity={0.5}
				/>
			</g>
		</svg>
	);
};

/** Reusable 2D cartoon software bug critter (alive & crawling, or squashed = fixed). */
export const Bug = Interactive.create({
	Component: BugInner,
	layout: 'none',
	componentName: 'BugProp',
	schema: {
		color: {
			type: 'enum',
			default: 'red',
			description: 'Shell color',
			variants: propVariants(ACCENT_NAMES),
			keyframable: false,
		},
		state: {
			type: 'enum',
			default: 'alive',
			description: 'Alive or squashed',
			variants: propVariants(STATES),
			keyframable: false,
		},
		animated: {type: 'boolean', default: true, description: 'Wiggle legs'},
	},
});
