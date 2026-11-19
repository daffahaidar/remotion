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

export type RocketProps = {
	readonly color?: AccentColor;
	readonly label?: string;
	readonly launching?: boolean;
	readonly animated?: boolean;
	readonly style?: React.CSSProperties;
};

const RocketInner: React.FC<RocketProps> = ({
	color = 'indigo',
	label = 'v1.0',
	launching = false,
	animated = true,
	style,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const t = animated ? frame / fps : 0;
	const pal = ACCENTS[color];
	const shakeX = launching && animated ? Math.sin(t * 55) * 1.6 : 0;
	const shakeY = launching && animated ? Math.cos(t * 47) * 1.2 : 0;
	const len = 56 + (animated ? 12 * Math.sin(t * 40) : 0);

	return (
		<svg
			viewBox="0 0 200 300"
			width={200}
			height={300}
			style={{overflow: 'visible', transformOrigin: '50% 80%', ...style}}
		>
			{launching ? (
				<g>
					{/* Exhaust smoke puffs */}
					{[0, 1, 2].flatMap((i) => {
						const cycle = (t * 1.2 + i / 3) % 1;
						return [-1, 1].map((side) => (
							<circle
								key={`${i}-${side}`}
								cx={100 + side * (30 + cycle * 50)}
								cy={286 - cycle * 10}
								r={10 + cycle * 14}
								fill={PROP_COLORS.slateLight}
								stroke={PROP_INK}
								strokeWidth={3}
								opacity={1 - cycle * 0.8}
							/>
						));
					})}
					{/* Flame: outer, inner, core */}
					<path
						d={`M 74 228 Q 66 ${228 + len * 0.55} 100 ${228 + len} Q 134 ${228 + len * 0.55} 126 228 Z`}
						fill="#f97316"
						stroke={PROP_INK}
						strokeWidth={4}
						strokeLinejoin="round"
					/>
					<path
						d={`M 84 228 Q 80 ${228 + len * 0.4} 100 ${228 + len * 0.72} Q 120 ${228 + len * 0.4} 116 228 Z`}
						fill={PROP_COLORS.gold}
					/>
					<path
						d={`M 92 228 Q 92 ${228 + len * 0.25} 100 ${228 + len * 0.42} Q 108 ${228 + len * 0.25} 108 228 Z`}
						fill={PROP_COLORS.white}
					/>
				</g>
			) : (
				<PropShadow cx={100} cy={244} rx={74} ry={10} />
			)}

			<g transform={`translate(${shakeX} ${shakeY})`}>
				{/* Side fins (behind body) */}
				{['M 60 160 C 34 176, 26 206, 30 238 L 64 214 Z', 'M 140 160 C 166 176, 174 206, 170 238 L 136 214 Z'].map(
					(d) => (
						<path key={d} d={d} fill={pal.main} stroke={PROP_INK} strokeWidth={PROP_OW} strokeLinejoin="round" />
					),
				)}

				{/* Nozzle */}
				<path
					d="M 76 208 L 124 208 L 130 230 L 70 230 Z"
					fill={PROP_COLORS.slateDark}
					stroke={PROP_INK}
					strokeWidth={PROP_OW}
					strokeLinejoin="round"
				/>

				{/* Fuselage */}
				<path
					d="M 100 20 C 140 50, 150 110, 142 210 L 58 210 C 50 110, 60 50, 100 20 Z"
					fill={PROP_COLORS.paper}
					stroke={PROP_INK}
					strokeWidth={PROP_OW}
					strokeLinejoin="round"
				/>
				<path
					d="M 114 36 C 136 64, 144 122, 139 207 L 122 207 C 127 130, 125 76, 114 36 Z"
					fill={PROP_COLORS.slateLight}
				/>

				{/* Nose cone */}
				<path
					d="M 100 20 C 120 35, 133 56, 139 80 L 61 80 C 67 56, 80 35, 100 20 Z"
					fill={pal.main}
					stroke={PROP_INK}
					strokeWidth={PROP_OW}
					strokeLinejoin="round"
				/>
				<path
					d="M 112 32 C 124 44, 132 60, 136 77 L 124 77 C 122 60, 118 46, 112 32 Z"
					fill={pal.shade}
					opacity={0.6}
				/>

				{/* Accent band */}
				<path d="M 57 176 L 143 176 L 143 194 L 57 194 Z" fill={pal.main} stroke={PROP_INK} strokeWidth={4.5} />

				{/* Porthole window */}
				<circle cx={100} cy={112} r={24} fill={PROP_COLORS.slateMid} stroke={PROP_INK} strokeWidth={PROP_OW} />
				<circle cx={100} cy={112} r={15} fill="#bae6fd" stroke={PROP_INK} strokeWidth={3.5} />
				<path
					d="M 92 106 Q 95 100 101 99"
					fill="none"
					stroke={PROP_COLORS.white}
					strokeWidth={4}
					strokeLinecap="round"
				/>

				{/* Left highlight */}
				<path
					d="M 70 96 Q 68 130 70 166"
					fill="none"
					stroke={PROP_COLORS.white}
					strokeWidth={6}
					strokeLinecap="round"
					opacity={0.8}
				/>

				{label ? (
					<text
						x={100}
						y={160}
						textAnchor="middle"
						fill={pal.shade}
						fontFamily="ui-monospace, monospace"
						fontWeight={800}
						fontSize={16}
					>
						{label}
					</text>
				) : null}

				{/* Center fin (front) */}
				<rect x={94} y={190} width={12} height={46} rx={6} fill={pal.main} stroke={PROP_INK} strokeWidth={4.5} />
			</g>
		</svg>
	);
};

/** Reusable 2D cartoon rocket for deploy / launch / release scenes. */
export const Rocket = Interactive.create({
	Component: RocketInner,
	layout: 'none',
	componentName: 'RocketProp',
	schema: {
		color: {
			type: 'enum',
			default: 'indigo',
			description: 'Accent color',
			variants: propVariants(ACCENT_NAMES),
			keyframable: false,
		},
		label: {type: 'string', default: 'v1.0', description: 'Body text'},
		launching: {type: 'boolean', default: false, description: 'Flame, smoke & shake'},
		animated: {type: 'boolean', default: true, description: 'Animate flame'},
	},
});
