import React from 'react';
import {Interactive, useCurrentFrame, useVideoConfig, type InteractivitySchema} from 'remotion';
import {PROP_COLORS, PROP_INK, PROP_OW, PropShadow} from './shared';

export type DatabaseVariant = 'sql' | 'cache' | 'cloud' | 'locked' | 'error';

export type DatabaseCylinderProps = {
	readonly variant?: DatabaseVariant;
	readonly label?: string;
	readonly animated?: boolean;
	readonly style?: React.CSSProperties;
};

const VARIANTS: readonly DatabaseVariant[] = ['sql', 'cache', 'cloud', 'locked', 'error'];
const PALETTE: Record<DatabaseVariant, {readonly main: string; readonly shade: string; readonly top: string}> = {
	sql: {main: '#3b82f6', shade: '#1d4ed8', top: '#93c5fd'},
	cache: {main: '#10b981', shade: '#047857', top: '#6ee7b7'},
	cloud: {main: '#6366f1', shade: '#4338ca', top: '#a5b4fc'},
	locked: {main: '#475569', shade: '#1e293b', top: '#94a3b8'},
	error: {main: '#ef4444', shade: '#b91c1c', top: '#fca5a5'},
};

const DatabaseCylinderInner: React.FC<DatabaseCylinderProps> = ({
	variant = 'sql',
	label = 'DB',
	animated = true,
	style,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const t = animated ? frame / fps : 0;
	const pal = PALETTE[variant];
	const pulse = animated ? 0.6 + 0.4 * Math.sin(t * 5) : 1;

	return (
		<svg
			viewBox="0 0 260 300"
			width={260}
			height={300}
			style={{overflow: 'visible', transformOrigin: '50% 93%', ...style}}
		>
			<PropShadow cx={130} cy={278} rx={96} ry={14} />

			{/* 3 Stacked Cylinder Disks */}
			{[2, 1, 0].map((idx) => {
				const dy = 70 + idx * 64;
				return (
					<g key={idx}>
						<path
							d={`M 42 ${dy} L 42 ${dy + 54} A 88 26 0 0 0 218 ${dy + 54} L 218 ${dy} Z`}
							fill={pal.main}
							stroke={PROP_INK}
							strokeWidth={PROP_OW}
							strokeLinejoin="round"
						/>
						{/* Right cel shade */}
						<path
							d={`M 164 ${dy + 18} L 164 ${dy + 72} A 88 26 0 0 0 218 ${dy + 54} L 218 ${dy} Z`}
							fill={pal.shade}
							opacity={0.55}
						/>
						<path
							d={`M 42 ${dy} L 42 ${dy + 54} A 88 26 0 0 0 218 ${dy + 54} L 218 ${dy}`}
							fill="none"
							stroke={PROP_INK}
							strokeWidth={PROP_OW}
							strokeLinejoin="round"
						/>
						{/* Status pill LED */}
						<circle cx={72} cy={dy + 40} r={6} fill={PROP_COLORS.white} opacity={pulse} />
					</g>
				);
			})}

			{/* Top cylinder cap */}
			<ellipse cx={130} cy={70} rx={88} ry={26} fill={pal.top} stroke={PROP_INK} strokeWidth={PROP_OW} />
			<text x={130} y={77} textAnchor="middle" fontFamily="monospace" fontSize={22} fontWeight={700} fill={PROP_INK}>
				{label}
			</text>

			{/* Optional Lock / Error emblem */}
			{variant === 'locked' ? (
				<g transform="translate(198 228)">
					<path
						d="M -12 -6 L -12 -16 A 12 12 0 0 1 12 -16 L 12 -6"
						fill="none"
						stroke={PROP_INK}
						strokeWidth={6}
						strokeLinecap="round"
					/>
					<rect
						x={-20}
						y={-6}
						width={40}
						height={32}
						rx={7}
						fill={PROP_COLORS.gold}
						stroke={PROP_INK}
						strokeWidth={5}
					/>
					<circle cx={0} cy={10} r={4.5} fill={PROP_INK} />
				</g>
			) : variant === 'error' ? (
				<g transform="translate(198 228)">
					<circle cx={0} cy={0} r={22} fill={PROP_COLORS.amber} stroke={PROP_INK} strokeWidth={5} />
					<path d="M -8 -8 L 8 8 M 8 -8 L -8 8" stroke={PROP_INK} strokeWidth={5.5} strokeLinecap="round" />
				</g>
			) : null}
		</svg>
	);
};

const variants = (names: readonly string[]) =>
	names.reduce<Record<string, InteractivitySchema>>((acc, n) => {
		acc[n] = {};
		return acc;
	}, {});

/** Reusable 2D cartoon database cylinder prop (SQL, Cache, Cloud, Locked, Error). */
export const DatabaseCylinder = Interactive.create({
	Component: DatabaseCylinderInner,
	layout: 'none',
	componentName: 'DatabaseCylinderProp',
	schema: {
		variant: {
			type: 'enum',
			default: 'sql',
			description: 'Database type',
			variants: variants(VARIANTS),
			keyframable: false,
		},
		label: {type: 'string', default: 'DB', description: 'Top label'},
		animated: {type: 'boolean', default: true, description: 'Animate status light'},
	},
});
