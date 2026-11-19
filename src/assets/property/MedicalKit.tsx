import React from 'react';
import {Interactive, useCurrentFrame, useVideoConfig} from 'remotion';
import {PROP_COLORS, PROP_INK, PROP_OW, PropShadow, propVariants} from './shared';

export type MedicalKitVariant = 'firstAid' | 'monitor';

export type MedicalKitProps = {
	readonly variant?: MedicalKitVariant;
	readonly healthy?: boolean;
	readonly animated?: boolean;
	readonly style?: React.CSSProperties;
};

const VARIANTS: readonly MedicalKitVariant[] = ['firstAid', 'monitor'];

const MedicalKitInner: React.FC<MedicalKitProps> = ({variant = 'firstAid', healthy = true, animated = true, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const t = animated ? frame / fps : 0;
	const beatScale = animated ? 1 + 0.1 * Math.pow(Math.max(0, Math.sin(t * 4)), 6) : 1;
	const blinkOn = !animated || Math.sin(t * 7) > 0;

	return (
		<svg
			viewBox="0 0 240 210"
			width={240}
			height={210}
			style={{overflow: 'visible', transformOrigin: '50% 90%', ...style}}
		>
			<PropShadow cx={120} cy={194} rx={86} ry={10} />

			{variant === 'firstAid' ? (
				<g>
					{/* Case handle */}
					<path
						d="M 88 58 L 88 40 Q 88 28 100 28 L 140 28 Q 152 28 152 40 L 152 58"
						fill="none"
						stroke={PROP_INK}
						strokeWidth={16}
						strokeLinecap="round"
					/>
					<path
						d="M 88 58 L 88 40 Q 88 28 100 28 L 140 28 Q 152 28 152 40 L 152 58"
						fill="none"
						stroke={PROP_COLORS.red}
						strokeWidth={6.5}
						strokeLinecap="round"
					/>

					{/* Main crisp white medic kit */}
					<rect
						x={30}
						y={56}
						width={180}
						height={128}
						rx={20}
						fill={PROP_COLORS.white}
						stroke={PROP_INK}
						strokeWidth={PROP_OW}
					/>
					<rect x={34} y={160} width={172} height={20} rx={8} fill={PROP_COLORS.slateLight} />

					{/* Top red latches */}
					<rect
						x={54}
						y={48}
						width={22}
						height={14}
						rx={5}
						fill={PROP_COLORS.red}
						stroke={PROP_INK}
						strokeWidth={3.5}
					/>
					<rect
						x={164}
						y={48}
						width={22}
						height={14}
						rx={5}
						fill={PROP_COLORS.red}
						stroke={PROP_INK}
						strokeWidth={3.5}
					/>

					{/* Bold centered medical cross */}
					<rect
						x={108}
						y={84}
						width={24}
						height={68}
						rx={5}
						fill={PROP_COLORS.red}
						stroke={PROP_INK}
						strokeWidth={3.5}
					/>
					<rect
						x={86}
						y={106}
						width={68}
						height={24}
						rx={5}
						fill={PROP_COLORS.red}
						stroke={PROP_INK}
						strokeWidth={3.5}
					/>
					{/* Cover inner stroke seams inside cross */}
					<rect x={110} y={88} width={20} height={60} rx={3} fill={PROP_COLORS.red} />
					<rect x={90} y={108} width={60} height={20} rx={3} fill={PROP_COLORS.red} />

					{/* Status indicator dot */}
					<circle
						cx={184}
						cy={80}
						r={8}
						fill={healthy ? PROP_COLORS.emerald : blinkOn ? PROP_COLORS.red : '#7f1d1d'}
						stroke={PROP_INK}
						strokeWidth={3}
					/>
				</g>
			) : (
				<g>
					{/* Monitor feet */}
					<rect
						x={56}
						y={168}
						width={24}
						height={20}
						rx={5}
						fill={PROP_COLORS.slateDark}
						stroke={PROP_INK}
						strokeWidth={4}
					/>
					<rect
						x={160}
						y={168}
						width={24}
						height={20}
						rx={5}
						fill={PROP_COLORS.slateDark}
						stroke={PROP_INK}
						strokeWidth={4}
					/>

					{/* Outer chassis */}
					<rect
						x={24}
						y={28}
						width={192}
						height={146}
						rx={18}
						fill={PROP_COLORS.slateLight}
						stroke={PROP_INK}
						strokeWidth={PROP_OW}
					/>
					{/* Dark ECG screen */}
					<rect x={38} y={42} width={164} height={102} rx={10} fill="#06141a" stroke={PROP_INK} strokeWidth={4} />

					{/* Subtle grid lines */}
					<line x1={38} y1={76} x2={202} y2={76} stroke="#0f2933" strokeWidth={1.5} />
					<line x1={38} y1={110} x2={202} y2={110} stroke="#0f2933" strokeWidth={1.5} />

					{healthy ? (
						<g>
							{/* Healthy green ECG pulse line */}
							<path
								d="M 46 98 L 76 98 L 88 74 L 98 124 L 112 58 L 124 114 L 134 98 L 194 98"
								fill="none"
								stroke={PROP_COLORS.emerald}
								strokeWidth={5}
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							{/* Beating heart icon */}
							<g transform={`translate(178 60) scale(${beatScale})`}>
								<path
									d="M 0 8 C -8 1, -13 -6, -7 -11 C -2 -14, 0 -8, 0 -8 C 0 -8, 2 -14, 7 -11 C 13 -6, 8 1, 0 8 Z"
									fill={PROP_COLORS.emerald}
								/>
							</g>
						</g>
					) : (
						<g>
							{/* Flatline warning */}
							<line
								x1={46}
								y1={98}
								x2={194}
								y2={98}
								stroke={blinkOn ? PROP_COLORS.red : '#7f1d1d'}
								strokeWidth={5}
								strokeDasharray="10 6"
								strokeLinecap="round"
							/>
							<text
								x={120}
								y={74}
								textAnchor="middle"
								fill={PROP_COLORS.red}
								fontFamily="ui-monospace, monospace"
								fontWeight={900}
								fontSize={16}
							>
								ERR 500
							</text>
						</g>
					)}

					{/* Control knobs */}
					<circle cx={60} cy={158} r={6} fill={PROP_COLORS.slateDark} stroke={PROP_INK} strokeWidth={2.5} />
					<circle cx={82} cy={158} r={6} fill={PROP_COLORS.slateDark} stroke={PROP_INK} strokeWidth={2.5} />
					<circle
						cx={182}
						cy={158}
						r={6}
						fill={healthy ? PROP_COLORS.emerald : blinkOn ? PROP_COLORS.red : '#7f1d1d'}
						stroke={PROP_INK}
						strokeWidth={2.5}
					/>
				</g>
			)}
		</svg>
	);
};

/** Reusable 2D cartoon medical kit & ECG monitor for Doctor debugging and system health analogies. */
export const MedicalKit = Interactive.create({
	Component: MedicalKitInner,
	layout: 'none',
	componentName: 'MedicalKitProp',
	schema: {
		variant: {
			type: 'enum',
			default: 'firstAid',
			description: 'Kit or monitor',
			variants: propVariants(VARIANTS),
			keyframable: false,
		},
		healthy: {type: 'boolean', default: true, description: 'Healthy status'},
		animated: {type: 'boolean', default: true, description: 'Animate pulse'},
	},
});
