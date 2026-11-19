import React from 'react';
import {Interactive, useCurrentFrame, useVideoConfig} from 'remotion';
import {PROP_COLORS, PROP_INK, PROP_OW, PropShadow, propVariants} from './shared';

export type PackageVariant = 'cardboard' | 'gift';

export type PackageBoxProps = {
	readonly variant?: PackageVariant;
	readonly open?: boolean;
	readonly label?: string;
	readonly animated?: boolean;
	readonly style?: React.CSSProperties;
};

const VARIANTS: readonly PackageVariant[] = ['cardboard', 'gift'];
const PALETTES: Record<PackageVariant, {readonly front: string; readonly side: string; readonly top: string; readonly inside: string; readonly tape: string}> = {
	cardboard: {front: '#e8b273', side: '#c0844f', top: '#f3c98f', inside: '#7c4a24', tape: '#fde68a'},
	gift: {front: '#6366f1', side: '#4338ca', top: '#818cf8', inside: '#312e81', tape: '#fbbf24'},
};

// 2.5D box: front face 40..170 x 100..200, depth offset (+36, -22).
const FRONT = 'M 40 100 L 170 100 L 170 200 L 40 200 Z';
const SIDE = 'M 170 100 L 206 78 L 206 178 L 170 200 Z';
const TOP = 'M 40 100 L 76 78 L 206 78 L 170 100 Z';

const PackageBoxInner: React.FC<PackageBoxProps> = ({variant = 'cardboard', open = false, label = 'npm', animated = true, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const t = animated ? frame / fps : 0;
	const pal = PALETTES[variant];
	const wobble = !open && animated ? Math.sin(t * 9) * 1.6 * Math.max(0, Math.sin(t * 1.8)) : 0;
	const pulse = 0.65 + 0.35 * Math.sin(t * 5);
	const face = {stroke: PROP_INK, strokeWidth: PROP_OW, strokeLinejoin: 'round'} as const;

	return (
		<svg viewBox="0 0 240 230" width={240} height={230} style={{overflow: 'visible', transformOrigin: '50% 88%', ...style}}>
			<PropShadow cx={124} cy={202} rx={100} ry={11} />

			<g transform={`rotate(${wobble} 120 200)`}>
				{open ? (
					<g>
						{/* Glow rays from inside */}
						{[-50, -25, 0, 25, 50].map((a) => (
							<line
								key={a}
								x1={123}
								y1={38}
								x2={123}
								y2={38 - 30 * pulse}
								transform={`rotate(${a} 123 80)`}
								stroke={PROP_COLORS.gold}
								strokeWidth={7}
								strokeLinecap="round"
								opacity={pulse}
							/>
						))}
						<path d="M 76 78 L 206 78 L 200 46 L 82 46 Z" fill={pal.side} {...face} />
						<path d={TOP} fill={pal.inside} {...face} />
					</g>
				) : (
					<path d={TOP} fill={pal.top} {...face} />
				)}

				<path d={SIDE} fill={pal.side} {...face} />
				<path d={FRONT} fill={pal.front} {...face} />
				<path d="M 44 176 L 166 176 L 166 196 L 44 196 Z" fill={pal.side} opacity={0.35} />

				{/* Tape / ribbon */}
				{variant === 'gift' ? (
					<g>
						<rect x={95} y={100} width={20} height={100} fill={pal.tape} stroke={PROP_INK} strokeWidth={3.5} />
						<path d="M 170 140 L 206 118 L 206 132 L 170 154 Z" fill={pal.tape} stroke={PROP_INK} strokeWidth={3.5} strokeLinejoin="round" />
					</g>
				) : (
					<rect x={95} y={100} width={20} height={28} fill={pal.tape} stroke={PROP_INK} strokeWidth={3.5} />
				)}
				{open ? null : <path d="M 95 100 L 115 100 L 151 78 L 131 78 Z" fill={pal.tape} stroke={PROP_INK} strokeWidth={3.5} strokeLinejoin="round" />}

				{/* Bow on closed gift */}
				{variant === 'gift' && !open ? (
					<g>
						<ellipse cx={108} cy={76} rx={17} ry={10} transform="rotate(-24 108 76)" fill={pal.tape} stroke={PROP_INK} strokeWidth={4} />
						<ellipse cx={140} cy={76} rx={17} ry={10} transform="rotate(24 140 76)" fill={pal.tape} stroke={PROP_INK} strokeWidth={4} />
						<circle cx={124} cy={84} r={8} fill={pal.tape} stroke={PROP_INK} strokeWidth={4} />
					</g>
				) : null}

				{/* Flaps when open */}
				{open ? (
					<g>
						<path d="M 40 100 L 76 78 L 50 52 L 14 74 Z" fill={pal.top} {...face} />
						<path d="M 170 100 L 206 78 L 234 96 L 198 118 Z" fill={pal.top} {...face} />
					</g>
				) : null}

				{label ? (
					<g>
						<rect x={58} y={142} width={72} height={34} rx={6} fill={PROP_COLORS.white} stroke={PROP_INK} strokeWidth={3.5} />
						<text x={94} y={165} textAnchor="middle" fill={PROP_INK} fontFamily="ui-monospace, monospace" fontWeight={800} fontSize={17}>
							{label}
						</text>
					</g>
				) : null}
			</g>
		</svg>
	);
};

/** Reusable 2D cartoon package box (npm package, release artifact, delivery, gift). */
export const PackageBox = Interactive.create({
	Component: PackageBoxInner,
	layout: 'none',
	componentName: 'PackageBoxProp',
	schema: {
		variant: {type: 'enum', default: 'cardboard', description: 'Box style', variants: propVariants(VARIANTS), keyframable: false},
		open: {type: 'boolean', default: false, description: 'Open with glow'},
		label: {type: 'string', default: 'npm', description: 'Front label'},
		animated: {type: 'boolean', default: true, description: 'Wobble / glow pulse'},
	},
});
