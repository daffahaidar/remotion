import React from 'react';
import {Interactive, useCurrentFrame, useVideoConfig} from 'remotion';
import {PROP_INK, PROP_OW, PropShadow, propVariants} from './shared';

export type PlantVariant = 'monstera' | 'cactus' | 'snake';
export type PotColor = 'terracotta' | 'white' | 'indigo';

export type PottedPlantProps = {
	readonly variant?: PlantVariant;
	readonly potColor?: PotColor;
	readonly animated?: boolean;
	readonly style?: React.CSSProperties;
};

const VARIANTS: readonly PlantVariant[] = ['monstera', 'cactus', 'snake'];
const POT_COLORS: readonly PotColor[] = ['terracotta', 'white', 'indigo'];
const POTS: Record<PotColor, {readonly main: string; readonly shade: string; readonly rim: string}> = {
	terracotta: {main: '#c2410c', shade: '#9a3412', rim: '#ea580c'},
	white: {main: '#f8fafc', shade: '#cbd5e1', rim: '#ffffff'},
	indigo: {main: '#6366f1', shade: '#4338ca', rim: '#818cf8'},
};
const LEAF = '#22c55e';
const LEAF_DARK = '#15803d';

// [stem tip x, y, angle, size]
const MONSTERA = [
	[78, 150, -78, 46],
	[122, 148, 78, 46],
	[60, 118, -48, 60],
	[142, 116, 48, 60],
	[100, 92, -4, 68],
] as const;

const Monstera: React.FC = () => (
	<g>
		{MONSTERA.map(([x, y]) => (
			<path
				key={`s${x}`}
				d={`M 100 184 Q ${(100 + x) / 2} ${y + 20} ${x} ${y}`}
				fill="none"
				stroke={LEAF_DARK}
				strokeWidth={6}
				strokeLinecap="round"
			/>
		))}
		{MONSTERA.map(([x, y, a, s]) => (
			<g key={`l${x}`} transform={`translate(${x} ${y}) rotate(${a})`}>
				<path
					d={`M 0 0 C ${-s * 0.6} ${-s * 0.15}, ${-s * 0.6} ${-s * 0.85}, 0 ${-s} C ${s * 0.6} ${-s * 0.85}, ${s * 0.6} ${-s * 0.15}, 0 0 Z`}
					fill={LEAF}
					stroke={PROP_INK}
					strokeWidth={5}
					strokeLinejoin="round"
				/>
				<path d={`M 0 -4 L 0 ${-s + 8}`} stroke={LEAF_DARK} strokeWidth={3.5} strokeLinecap="round" />
				{[0.35, 0.6].flatMap((k) =>
					[-1, 1].map((side) => (
						<path
							key={`${k}${side}`}
							d={`M ${side * s * 0.42} ${-s * k} L ${side * s * 0.16} ${-s * k + 6}`}
							stroke={LEAF_DARK}
							strokeWidth={4}
							strokeLinecap="round"
						/>
					)),
				)}
			</g>
		))}
	</g>
);

const Cactus: React.FC = () => (
	<g>
		{['M 84 140 L 64 140 Q 52 140 52 126 L 52 104', 'M 116 122 L 136 122 Q 148 122 148 108 L 148 86'].map((d) => (
			<g key={d}>
				<path d={d} fill="none" stroke={PROP_INK} strokeWidth={28} strokeLinecap="round" strokeLinejoin="round" />
				<path d={d} fill="none" stroke={LEAF} strokeWidth={17} strokeLinecap="round" strokeLinejoin="round" />
			</g>
		))}
		<rect x={78} y={62} width={44} height={130} rx={22} fill={LEAF} stroke={PROP_INK} strokeWidth={PROP_OW} />
		<path d="M 108 70 Q 116 80 116 100 L 116 186 L 106 186 Z" fill={LEAF_DARK} opacity={0.45} />
		{[92, 108].map((x) => (
			<line key={x} x1={x} y1={76} x2={x} y2={180} stroke={LEAF_DARK} strokeWidth={3} strokeLinecap="round" />
		))}
		{[
			[86, 92],
			[114, 110],
			[86, 132],
			[114, 152],
			[58, 116],
			[142, 98],
		].map(([x, y]) => (
			<path
				key={`${x}${y}`}
				d={`M ${x - 4} ${y} L ${x + 4} ${y} M ${x} ${y - 4} L ${x} ${y + 4}`}
				stroke={PROP_INK}
				strokeWidth={2.5}
				strokeLinecap="round"
			/>
		))}
		{/* Flower */}
		{[0, 72, 144, 216, 288].map((a) => (
			<ellipse
				key={a}
				cx={100}
				cy={50}
				rx={6}
				ry={11}
				transform={`rotate(${a} 100 60)`}
				fill="#fb7185"
				stroke={PROP_INK}
				strokeWidth={3}
			/>
		))}
		<circle cx={100} cy={60} r={6} fill="#fbbf24" stroke={PROP_INK} strokeWidth={3} />
	</g>
);

// [base x, tip dx, tip y]
const SNAKE = [
	[70, -16, 70],
	[130, 18, 76],
	[86, -6, 44],
	[114, 8, 52],
	[100, 0, 30],
] as const;

const SnakePlant: React.FC = () => (
	<g>
		{SNAKE.map(([x, dx, top], i) => (
			<g key={x}>
				<path
					d={`M ${x - 11} 186 Q ${x - 16} ${top + 60} ${x + dx} ${top} Q ${x + 16} ${top + 60} ${x + 11} 186 Z`}
					fill={i % 2 === 0 ? LEAF_DARK : '#16a34a'}
					stroke={PROP_INK}
					strokeWidth={5}
					strokeLinejoin="round"
				/>
				{[0.45, 0.7].map((k) => {
					const y = top + (186 - top) * k;
					return (
						<path
							key={k}
							d={`M ${x - 6} ${y} Q ${x} ${y - 5} ${x + 6} ${y}`}
							fill="none"
							stroke="#86efac"
							strokeWidth={3}
							strokeLinecap="round"
							opacity={0.75}
						/>
					);
				})}
			</g>
		))}
	</g>
);

const PottedPlantInner: React.FC<PottedPlantProps> = ({
	variant = 'monstera',
	potColor = 'terracotta',
	animated = true,
	style,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const t = animated ? frame / fps : 0;
	const pot = POTS[potColor];

	return (
		<svg
			viewBox="0 0 200 280"
			width={200}
			height={280}
			style={{overflow: 'visible', transformOrigin: '50% 96%', ...style}}
		>
			<PropShadow cx={100} cy={268} rx={72} ry={10} />

			<g transform={`rotate(${Math.sin(t * 1.5) * 2.5} 100 182)`}>
				{variant === 'monstera' ? <Monstera /> : variant === 'cactus' ? <Cactus /> : <SnakePlant />}
			</g>

			{/* Pot */}
			<path
				d="M 52 186 L 148 186 L 138 262 Q 136 268 128 268 L 72 268 Q 64 268 62 262 Z"
				fill={pot.main}
				stroke={PROP_INK}
				strokeWidth={PROP_OW}
				strokeLinejoin="round"
			/>
			<path
				d="M 120 196 L 144 196 L 136 260 Q 134 264 128 264 L 116 264 Q 124 230 120 196 Z"
				fill={pot.shade}
				opacity={0.6}
			/>
			<rect x={44} y={176} width={112} height={22} rx={8} fill={pot.rim} stroke={PROP_INK} strokeWidth={PROP_OW} />
			<ellipse cx={100} cy={178} rx={46} ry={5} fill="#5b3a1e" stroke={PROP_INK} strokeWidth={3} />
		</svg>
	);
};

/** Reusable 2D cartoon potted plant for office & home set dressing. */
export const PottedPlant = Interactive.create({
	Component: PottedPlantInner,
	layout: 'none',
	componentName: 'PottedPlantProp',
	schema: {
		variant: {
			type: 'enum',
			default: 'monstera',
			description: 'Plant type',
			variants: propVariants(VARIANTS),
			keyframable: false,
		},
		potColor: {
			type: 'enum',
			default: 'terracotta',
			description: 'Pot color',
			variants: propVariants(POT_COLORS),
			keyframable: false,
		},
		animated: {type: 'boolean', default: true, description: 'Gentle sway'},
	},
});
