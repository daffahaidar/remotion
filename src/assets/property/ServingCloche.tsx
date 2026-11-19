import React from 'react';
import {Interactive, useCurrentFrame, useVideoConfig} from 'remotion';
import {PROP_COLORS, PROP_INK, PROP_OW, PropShadow, propVariants} from './shared';

export type ClocheDish = 'burger' | 'html' | 'json';

export type ServingClocheProps = {
	readonly open?: boolean;
	readonly dish?: ClocheDish;
	readonly animated?: boolean;
	readonly style?: React.CSSProperties;
};

const DISHES: readonly ClocheDish[] = ['burger', 'html', 'json'];

const ServingClocheInner: React.FC<ServingClocheProps> = ({
	open = true,
	dish = 'burger',
	animated = true,
	style,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const t = animated ? frame / fps : 0;
	const liftBob = animated && open ? Math.sin(t * 2.8) * 4 : 0;

	return (
		<svg
			viewBox="0 0 260 220"
			width={260}
			height={220}
			style={{overflow: 'visible', transformOrigin: '50% 90%', ...style}}
		>
			<PropShadow cx={130} cy={202} rx={98} ry={11} />

			{/* Platter dish */}
			<ellipse
				cx={130}
				cy={186}
				rx={106}
				ry={18}
				fill={PROP_COLORS.slateMid}
				stroke={PROP_INK}
				strokeWidth={PROP_OW}
			/>
			<ellipse cx={130} cy={180} rx={98} ry={15} fill={PROP_COLORS.slateLight} stroke={PROP_INK} strokeWidth={4} />
			<ellipse cx={130} cy={180} rx={78} ry={10} fill={PROP_COLORS.white} opacity={0.65} />

			{/* Dish payload sitting on platter */}
			{dish === 'burger' ? (
				<g>
					{/* Bottom bun */}
					<rect x={88} y={160} width={84} height={16} rx={8} fill="#f59e0b" stroke={PROP_INK} strokeWidth={4} />
					{/* Patty */}
					<rect x={84} y={148} width={92} height={14} rx={7} fill="#78350f" stroke={PROP_INK} strokeWidth={4} />
					{/* Cheese melt */}
					<path
						d="M 88 148 L 172 148 L 154 159 L 140 148 L 116 157 L 98 148 Z"
						fill={PROP_COLORS.gold}
						stroke={PROP_INK}
						strokeWidth={3}
						strokeLinejoin="round"
					/>
					{/* Crisp lettuce */}
					<path
						d="M 84 146 Q 98 136 112 146 Q 126 136 140 146 Q 156 136 176 146"
						fill="none"
						stroke={PROP_COLORS.green}
						strokeWidth={7}
						strokeLinecap="round"
					/>
					{/* Sesame top bun */}
					<path
						d="M 88 141 C 88 110, 172 110, 172 141 Z"
						fill="#fbbf24"
						stroke={PROP_INK}
						strokeWidth={4.5}
						strokeLinejoin="round"
					/>
					<circle cx={112} cy={126} r={2.5} fill="#fef3c7" />
					<circle cx={132} cy={120} r={2.5} fill="#fef3c7" />
					<circle cx={148} cy={128} r={2.5} fill="#fef3c7" />
				</g>
			) : null}

			{dish === 'html' ? (
				<g>
					<rect
						x={84}
						y={122}
						width={92}
						height={54}
						rx={12}
						fill={PROP_COLORS.indigo}
						stroke={PROP_INK}
						strokeWidth={4.5}
					/>
					{/* < / > angle glyphs */}
					<path
						d="M 110 139 L 97 149 L 110 159 M 150 139 L 163 149 L 150 159 M 136 136 L 124 162"
						fill="none"
						stroke={PROP_COLORS.cyan}
						strokeWidth={5}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</g>
			) : null}

			{dish === 'json' ? (
				<g>
					<rect
						x={88}
						y={122}
						width={84}
						height={54}
						rx={12}
						fill={PROP_COLORS.emerald}
						stroke={PROP_INK}
						strokeWidth={4.5}
					/>
					<text
						x={130}
						y={157}
						textAnchor="middle"
						fill={PROP_COLORS.white}
						fontFamily="ui-monospace, monospace"
						fontWeight={900}
						fontSize={28}
					>
						{'{ }'}
					</text>
				</g>
			) : null}

			{/* Gleaming silver dome lid */}
			<g transform={open ? `translate(-16 ${-64 + liftBob}) rotate(-18 130 176)` : undefined}>
				{/* Top knob */}
				<circle cx={130} cy={78} r={13} fill={PROP_COLORS.white} stroke={PROP_INK} strokeWidth={PROP_OW} />
				{/* Dome arc */}
				<path
					d="M 42 178 A 88 86 0 0 1 218 178 Z"
					fill={PROP_COLORS.slateLight}
					stroke={PROP_INK}
					strokeWidth={PROP_OW}
					strokeLinejoin="round"
				/>
				{/* Inner shade + glossy reflection */}
				<path d="M 155 96 A 84 82 0 0 1 213 174 L 182 174 C 186 142 172 114 155 96 Z" fill={PROP_COLORS.slateMid} opacity={0.75} />
				<path
					d="M 66 154 C 72 126, 90 108, 114 103"
					fill="none"
					stroke={PROP_COLORS.white}
					strokeWidth={8}
					strokeLinecap="round"
				/>
			</g>
		</svg>
	);
};

/** Reusable 2D cartoon chef cloche platter for culinary & software serving analogies. */
export const ServingCloche = Interactive.create({
	Component: ServingClocheInner,
	layout: 'none',
	componentName: 'ServingClocheProp',
	schema: {
		open: {type: 'boolean', default: true, description: 'Lid lifted'},
		dish: {
			type: 'enum',
			default: 'burger',
			description: 'Payload on plate',
			variants: propVariants(DISHES),
			keyframable: false,
		},
		animated: {type: 'boolean', default: true, description: 'Float lifted lid'},
	},
});
