import React from 'react';
import {Interactive, useCurrentFrame, useVideoConfig} from 'remotion';
import {PROP_COLORS, PROP_INK, PROP_OW, PropShadow, propVariants} from './shared';

export type BriefcaseVariant = 'leather' | 'dark';

export type BriefcaseProps = {
	readonly variant?: BriefcaseVariant;
	readonly withGoldShine?: boolean;
	readonly style?: React.CSSProperties;
};

const PALETTES: Record<BriefcaseVariant, {readonly body: string; readonly flap: string; readonly shade: string}> = {
	leather: {body: '#b45309', flap: '#d97706', shade: '#78350f'},
	dark: {body: '#334155', flap: '#475569', shade: '#1e293b'},
};

const VARIANTS: readonly BriefcaseVariant[] = ['leather', 'dark'];

const BriefcaseInner: React.FC<BriefcaseProps> = ({variant = 'leather', withGoldShine = true, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const glintScale = withGoldShine ? 0.8 + 0.35 * Math.abs(Math.sin((frame / fps) * 3)) : 0;
	const pal = PALETTES[variant];

	return (
		<svg
			viewBox="0 0 240 200"
			width={240}
			height={200}
			style={{overflow: 'visible', transformOrigin: '50% 90%', ...style}}
		>
			<PropShadow cx={120} cy={184} rx={90} ry={10} />

			{/* Top sturdy handle */}
			<path
				d="M 86 58 L 86 38 Q 86 24 100 24 L 140 24 Q 154 24 154 38 L 154 58"
				fill="none"
				stroke={PROP_INK}
				strokeWidth={18}
				strokeLinecap="round"
			/>
			<path
				d="M 86 58 L 86 38 Q 86 24 100 24 L 140 24 Q 154 24 154 38 L 154 58"
				fill="none"
				stroke={pal.shade}
				strokeWidth={7}
				strokeLinecap="round"
			/>

			{/* Main briefcase body */}
			<rect
				x={24}
				y={56}
				width={192}
				height={120}
				rx={18}
				fill={pal.body}
				stroke={PROP_INK}
				strokeWidth={PROP_OW}
			/>
			{/* Bottom cel shade */}
			<path
				d="M 27 148 L 213 148 L 213 158 Q 213 173 196 173 L 44 173 Q 27 173 27 158 Z"
				fill={pal.shade}
				opacity={0.7}
			/>

			{/* Upper front flap */}
			<path
				d="M 24 74 Q 24 56 42 56 L 198 56 Q 216 56 216 74 L 216 106 Q 120 122 24 106 Z"
				fill={pal.flap}
				stroke={PROP_INK}
				strokeWidth={PROP_OW}
				strokeLinejoin="round"
			/>

			{/* Brass buckle straps */}
			{[66, 158].map((lx) => (
				<g key={lx}>
					<rect
						x={lx}
						y={86}
						width={16}
						height={44}
						rx={5}
						fill={pal.shade}
						stroke={PROP_INK}
						strokeWidth={4}
					/>
					<rect
						x={lx - 2}
						y={98}
						width={20}
						height={20}
						rx={4}
						fill={PROP_COLORS.gold}
						stroke={PROP_INK}
						strokeWidth={3.5}
					/>
					<rect x={lx + 4} y={104} width={8} height={8} rx={2} fill={PROP_INK} />
				</g>
			))}

			{/* Optional sparkle diamond */}
			{withGoldShine ? (
				<g transform={`translate(204 44) scale(${glintScale})`}>
					<path
						d="M 0 -14 L 4 -4 L 14 0 L 4 4 L 0 14 L -4 4 L -14 0 L -4 -4 Z"
						fill={PROP_COLORS.gold}
						stroke={PROP_INK}
						strokeWidth={2.5}
						strokeLinejoin="round"
					/>
				</g>
			) : null}
		</svg>
	);
};

/** Reusable 2D cartoon executive briefcase for Boss, PM, and business drama scenes. */
export const Briefcase = Interactive.create({
	Component: BriefcaseInner,
	layout: 'none',
	componentName: 'BriefcaseProp',
	schema: {
		variant: {
			type: 'enum',
			default: 'leather',
			description: 'Case finish',
			variants: propVariants(VARIANTS),
			keyframable: false,
		},
		withGoldShine: {type: 'boolean', default: true, description: 'Gold sparkle'},
	},
});
