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

export type ClockVariant = 'wall' | 'alarm';

export type WallClockProps = {
	readonly variant?: ClockVariant;
	readonly color?: AccentColor;
	readonly hours?: number;
	readonly minutes?: number;
	readonly fastForward?: boolean;
	readonly ringing?: boolean;
	readonly style?: React.CSSProperties;
};

const VARIANTS: readonly ClockVariant[] = ['wall', 'alarm'];

const Hand: React.FC<{
	readonly angle: number;
	readonly length: number;
	readonly width: number;
	readonly cx: number;
	readonly cy: number;
}> = ({angle, length, width, cx, cy}) => (
	<line
		x1={cx}
		y1={cy}
		x2={cx}
		y2={cy - length}
		transform={`rotate(${angle} ${cx} ${cy})`}
		stroke={PROP_INK}
		strokeWidth={width}
		strokeLinecap="round"
	/>
);

const WallClockInner: React.FC<WallClockProps> = ({
	variant = 'wall',
	color = 'indigo',
	hours = 10,
	minutes = 10,
	fastForward = false,
	ringing = false,
	style,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const t = frame / fps;
	const pal = ACCENTS[color];
	const alarm = variant === 'alarm';
	const cx = 100;
	const cy = alarm ? 118 : 110;
	const r = alarm ? 70 : 80;
	const face = alarm ? 56 : 66;
	// Fast-forward: 1.5 minute-hand revolutions per second.
	const extraMin = fastForward ? t * 1.5 * 360 : 0;
	const minAngle = minutes * 6 + extraMin;
	const hourAngle = (hours % 12) * 30 + minutes * 0.5 + extraMin / 12;
	const shake = ringing ? Math.sin(t * 50) * 6 : 0;
	const lines = ringing && Math.floor(t * 8) % 2 === 0;

	return (
		<svg
			viewBox="0 0 200 220"
			width={200}
			height={220}
			style={{overflow: 'visible', transformOrigin: alarm ? '50% 92%' : '50% 50%', ...style}}
		>
			{alarm ? <PropShadow cx={100} cy={204} rx={68} ry={10} /> : null}

			{lines ? (
				<g stroke={PROP_INK} strokeWidth={4.5} strokeLinecap="round" fill="none">
					<path d={`M ${cx - r - 14} ${cy - 30} Q ${cx - r - 24} ${cy} ${cx - r - 14} ${cy + 30}`} />
					<path d={`M ${cx + r + 14} ${cy - 30} Q ${cx + r + 24} ${cy} ${cx + r + 14} ${cy + 30}`} />
				</g>
			) : null}

			<g transform={`rotate(${shake} 100 ${alarm ? 200 : 110})`}>
				{alarm ? (
					<g>
						{/* Legs, bells, hammer */}
						<path d="M 66 172 L 52 200 M 134 172 L 148 200" stroke={PROP_INK} strokeWidth={9} strokeLinecap="round" />
						<path d="M 96 48 L 96 30 M 104 48 L 104 30" stroke={PROP_INK} strokeWidth={5} strokeLinecap="round" />
						<circle cx={100} cy={28} r={7} fill={PROP_COLORS.slateMid} stroke={PROP_INK} strokeWidth={4} />
						{[-1, 1].map((s) => (
							<path
								key={s}
								d="M -26 8 A 26 26 0 0 1 26 8 Z"
								transform={`translate(${100 + s * 46} 58) rotate(${s * 32})`}
								fill={pal.main}
								stroke={PROP_INK}
								strokeWidth={PROP_OW}
								strokeLinejoin="round"
							/>
						))}
					</g>
				) : null}

				{/* Case + face */}
				<circle cx={cx} cy={cy} r={r} fill={pal.main} stroke={PROP_INK} strokeWidth={PROP_OW} />
				<path
					d={`M ${cx + r * 0.5} ${cy - r * 0.84} A ${r - 3} ${r - 3} 0 0 1 ${cx + r * 0.5} ${cy + r * 0.84}`}
					fill="none"
					stroke={pal.shade}
					strokeWidth={8}
					opacity={0.6}
				/>
				<circle cx={cx} cy={cy} r={face} fill={PROP_COLORS.paper} stroke={PROP_INK} strokeWidth={4.5} />

				{/* Ticks */}
				{Array.from({length: 12}, (_, i) => (
					<line
						key={i}
						x1={cx}
						y1={cy - face + 6}
						x2={cx}
						y2={cy - face + (i % 3 === 0 ? 18 : 12)}
						transform={`rotate(${i * 30} ${cx} ${cy})`}
						stroke={i % 3 === 0 ? PROP_INK : PROP_COLORS.slateMid}
						strokeWidth={i % 3 === 0 ? 5 : 3.5}
						strokeLinecap="round"
					/>
				))}

				<Hand angle={hourAngle} length={face * 0.5} width={8} cx={cx} cy={cy} />
				<Hand angle={minAngle} length={face * 0.75} width={5.5} cx={cx} cy={cy} />
				{fastForward ? null : (
					<line
						x1={cx}
						y1={cy + 10}
						x2={cx}
						y2={cy - face * 0.8}
						transform={`rotate(${Math.floor(t) * 6} ${cx} ${cy})`}
						stroke={PROP_COLORS.red}
						strokeWidth={2.5}
						strokeLinecap="round"
					/>
				)}
				<circle cx={cx} cy={cy} r={7} fill={PROP_COLORS.gold} stroke={PROP_INK} strokeWidth={3.5} />
				<path
					d={`M ${cx - face + 14} ${cy - 22} A ${face - 10} ${face - 10} 0 0 1 ${cx - 20} ${cy - face + 12}`}
					fill="none"
					stroke={PROP_COLORS.white}
					strokeWidth={5}
					strokeLinecap="round"
					opacity={0.9}
				/>
			</g>
		</svg>
	);
};

/** Reusable 2D cartoon wall / alarm clock for deadline, overtime & time-passing scenes. */
export const WallClock = Interactive.create({
	Component: WallClockInner,
	layout: 'none',
	componentName: 'WallClockProp',
	schema: {
		variant: {
			type: 'enum',
			default: 'wall',
			description: 'Clock type',
			variants: propVariants(VARIANTS),
			keyframable: false,
		},
		color: {
			type: 'enum',
			default: 'indigo',
			description: 'Case color',
			variants: propVariants(ACCENT_NAMES),
			keyframable: false,
		},
		hours: {type: 'number', default: 10, min: 0, max: 12, step: 1, description: 'Hour', hiddenFromList: false},
		minutes: {type: 'number', default: 10, min: 0, max: 59, step: 1, description: 'Minute', hiddenFromList: false},
		fastForward: {type: 'boolean', default: false, description: 'Spin hands (time passing)'},
		ringing: {type: 'boolean', default: false, description: 'Shake & ring'},
	},
});
