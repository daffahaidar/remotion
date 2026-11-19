import React from 'react';
import {Interactive, useCurrentFrame, useVideoConfig} from 'remotion';
import {PROP_COLORS, PROP_INK, PROP_OW} from './shared';

export type LightbulbProps = {
	readonly on?: boolean;
	readonly animated?: boolean;
	readonly style?: React.CSSProperties;
};

const GLASS =
	'M 80 20 C 124 20, 140 58, 132 90 C 126 112, 108 124, 106 150 L 54 150 C 52 124, 34 112, 28 90 C 20 58, 36 20, 80 20 Z';

const LightbulbInner: React.FC<LightbulbProps> = ({on = true, animated = true, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const t = animated ? frame / fps : 0;
	const pulse = animated ? 0.75 + 0.25 * Math.sin(t * 6) : 1;

	return (
		<svg
			viewBox="0 0 160 220"
			width={160}
			height={220}
			style={{overflow: 'visible', transformOrigin: '50% 50%', ...style}}
		>
			{on ? (
				<g>
					<circle cx={80} cy={80} r={86 * pulse} fill="#fde68a" opacity={0.35} />
					{Array.from({length: 8}, (_, i) => (
						<line
							key={i}
							x1={80}
							y1={-4}
							x2={80}
							y2={-4 - 18 * pulse}
							transform={`rotate(${-105 + i * 30} 80 80)`}
							stroke={PROP_COLORS.amber}
							strokeWidth={7}
							strokeLinecap="round"
						/>
					))}
				</g>
			) : null}

			{/* Glass */}
			<path
				d={GLASS}
				fill={on ? '#fde047' : PROP_COLORS.slateLight}
				stroke={PROP_INK}
				strokeWidth={PROP_OW}
				strokeLinejoin="round"
			/>
			<path
				d="M 106 30 C 130 46, 136 74, 128 96 C 122 112, 108 122, 104 146 L 94 146 C 98 120, 116 104, 118 84 C 120 62, 116 44, 106 30 Z"
				fill={on ? PROP_COLORS.amber : PROP_COLORS.slateMid}
				opacity={0.4}
			/>
			<path
				d="M 66 150 L 66 112 Q 72 96 80 112 Q 88 96 94 112 L 94 150"
				fill="none"
				stroke={on ? '#b45309' : PROP_COLORS.slateDark}
				strokeWidth={4}
				strokeLinejoin="round"
			/>
			<path
				d="M 46 70 Q 48 46 68 36"
				fill="none"
				stroke={PROP_COLORS.white}
				strokeWidth={7}
				strokeLinecap="round"
				opacity={0.8}
			/>

			{/* Screw base */}
			{[
				[52, 150, 56],
				[54, 164, 52],
				[56, 178, 48],
			].map(([x, y, w]) => (
				<rect
					key={y}
					x={x}
					y={y}
					width={w}
					height={14}
					rx={6}
					fill={PROP_COLORS.slateMid}
					stroke={PROP_INK}
					strokeWidth={4.5}
				/>
			))}
			<path
				d="M 64 192 L 96 192 L 88 206 L 72 206 Z"
				fill={PROP_COLORS.slateDark}
				stroke={PROP_INK}
				strokeWidth={4.5}
				strokeLinejoin="round"
			/>
		</svg>
	);
};

/** Reusable 2D cartoon light bulb for "aha!" idea moments. */
export const Lightbulb = Interactive.create({
	Component: LightbulbInner,
	layout: 'none',
	componentName: 'LightbulbProp',
	schema: {
		on: {type: 'boolean', default: true, description: 'Light on'},
		animated: {type: 'boolean', default: true, description: 'Glow pulse'},
	},
});
