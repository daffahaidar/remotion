import React from 'react';
import {Interactive, useCurrentFrame, useVideoConfig} from 'remotion';
import {PROP_COLORS, PROP_INK, PROP_OW, PropShadow, propVariants} from './shared';

export type CoffeeMugVariant = 'ceramic' | 'takeaway';
export type CoffeeMugColor = 'indigo' | 'emerald' | 'crimson' | 'white' | 'amber';

export type CoffeeMugProps = {
	readonly variant?: CoffeeMugVariant;
	readonly color?: CoffeeMugColor;
	readonly label?: string;
	readonly steam?: boolean;
	readonly style?: React.CSSProperties;
};

const PALETTES: Record<CoffeeMugColor, {readonly fill: string; readonly shade: string; readonly text: string}> = {
	indigo: {fill: '#6366f1', shade: '#4338ca', text: '#ffffff'},
	emerald: {fill: '#10b981', shade: '#047857', text: '#ffffff'},
	crimson: {fill: '#ef4444', shade: '#b91c1c', text: '#ffffff'},
	white: {fill: '#f8fafc', shade: '#cbd5e1', text: '#1f1a1f'},
	amber: {fill: '#f59e0b', shade: '#b45309', text: '#1f1a1f'},
};

const VARIANTS: readonly CoffeeMugVariant[] = ['ceramic', 'takeaway'];
const COLORS_LIST: readonly CoffeeMugColor[] = ['indigo', 'emerald', 'crimson', 'white', 'amber'];

const CoffeeMugInner: React.FC<CoffeeMugProps> = ({
	variant = 'ceramic',
	color = 'indigo',
	label = '</>',
	steam = true,
	style,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const t = frame / fps;
	const pal = PALETTES[color];

	return (
		<svg
			viewBox="0 0 160 170"
			width={160}
			height={170}
			style={{overflow: 'visible', transformOrigin: '50% 90%', ...style}}
		>
			<PropShadow cx={78} cy={154} rx={44} ry={9} />

			{/* Rising animated steam */}
			{steam ? (
				<g>
					{[0, 1, 2].map((i) => {
						const cycle = (t * 0.7 + i * 0.33) % 1;
						const xBase = 58 + i * 18;
						const sway = Math.sin(cycle * Math.PI * 2 + i) * 4;
						const yShift = -cycle * 14;
						const opacity = Math.sin(cycle * Math.PI) * 0.72;
						return (
							<path
								key={i}
								d={`M ${xBase} ${46 + yShift} Q ${xBase + sway} ${35 + yShift} ${xBase - sway * 0.6} ${24 + yShift}`}
								fill="none"
								stroke={PROP_COLORS.slateMid}
								strokeWidth={4.5}
								strokeLinecap="round"
								opacity={opacity}
							/>
						);
					})}
				</g>
			) : null}

			{variant === 'ceramic' ? (
				<g>
					{/* Chunky hollow D-handle */}
					<path
						d="M 106 76 C 138 74, 140 128, 106 128"
						fill="none"
						stroke={PROP_INK}
						strokeWidth={18}
						strokeLinecap="round"
					/>
					<path
						d="M 106 76 C 138 74, 140 128, 106 128"
						fill="none"
						stroke={pal.shade}
						strokeWidth={7.5}
						strokeLinecap="round"
					/>

					{/* Ceramic body */}
					<path
						d="M 38 66 L 112 66 L 108 134 Q 106 148 75 148 Q 44 148 42 134 Z"
						fill={pal.fill}
						stroke={PROP_INK}
						strokeWidth={PROP_OW}
						strokeLinejoin="round"
					/>
					{/* Right cel shade */}
					<path
						d="M 86 68 L 109 68 L 105 133 Q 102 145 75 145 L 75 145 Q 89 138 90 124 Z"
						fill={pal.shade}
						opacity={0.75}
					/>
					{/* Left highlight */}
					<rect x={47} y={84} width={7} height={44} rx={3.5} fill={PROP_COLORS.white} opacity={0.35} />

					{/* Top rim + dark roast */}
					<ellipse cx={75} cy={66} rx={37} ry={11} fill={PROP_COLORS.white} stroke={PROP_INK} strokeWidth={PROP_OW} />
					<ellipse cx={75} cy={67} rx={28} ry={7} fill="#451a03" stroke={PROP_INK} strokeWidth={2.5} />
					<path d="M 55 66 Q 72 62 88 66" fill="none" stroke="#78350f" strokeWidth={2.5} strokeLinecap="round" />

					{label ? (
						<text
							x={75}
							y={114}
							textAnchor="middle"
							fill={pal.text}
							fontFamily="ui-monospace, monospace"
							fontWeight={800}
							fontSize={20}
						>
							{label}
						</text>
					) : null}
				</g>
			) : (
				<g>
					{/* Tapered paper cup */}
					<path
						d="M 43 68 L 107 68 L 97 146 Q 75 151 53 146 Z"
						fill={PROP_COLORS.white}
						stroke={PROP_INK}
						strokeWidth={PROP_OW}
						strokeLinejoin="round"
					/>
					{/* Colored cardboard sleeve */}
					<path
						d="M 45 86 L 105 86 L 100 127 L 50 127 Z"
						fill={pal.fill}
						stroke={PROP_INK}
						strokeWidth={4.5}
						strokeLinejoin="round"
					/>
					{/* Travel lid */}
					<path
						d="M 38 68 Q 38 56 50 56 L 100 56 Q 112 56 112 68 Z"
						fill={PROP_COLORS.slateLight}
						stroke={PROP_INK}
						strokeWidth={PROP_OW}
						strokeLinejoin="round"
					/>
					<rect
						x={46}
						y={47}
						width={58}
						height={11}
						rx={5}
						fill={PROP_COLORS.white}
						stroke={PROP_INK}
						strokeWidth={4.5}
					/>
					<rect x={82} y={42} width={12} height={7} rx={3} fill={PROP_COLORS.white} stroke={PROP_INK} strokeWidth={3.5} />

					{label ? (
						<text
							x={75}
							y={113}
							textAnchor="middle"
							fill={pal.text}
							fontFamily="ui-monospace, monospace"
							fontWeight={800}
							fontSize={18}
						>
							{label}
						</text>
					) : null}
				</g>
			)}
		</svg>
	);
};

/** Reusable 2D cartoon developer coffee mug / takeaway cup with animated steam. */
export const CoffeeMug = Interactive.create({
	Component: CoffeeMugInner,
	layout: 'none',
	componentName: 'CoffeeMugProp',
	schema: {
		variant: {
			type: 'enum',
			default: 'ceramic',
			description: 'Cup style',
			variants: propVariants(VARIANTS),
			keyframable: false,
		},
		color: {
			type: 'enum',
			default: 'indigo',
			description: 'Accent color',
			variants: propVariants(COLORS_LIST),
			keyframable: false,
		},
		label: {type: 'string', default: '</>', description: 'Front text'},
		steam: {type: 'boolean', default: true, description: 'Show steam'},
	},
});
