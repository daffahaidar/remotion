import React from 'react';
import {Interactive, useCurrentFrame, useVideoConfig} from 'remotion';
import {ACCENTS, PROP_COLORS, PROP_INK, PROP_OW, PropShadow, propVariants} from './shared';

const PALETTES = {
	gold: {main: '#fbbf24', shade: '#d97706'},
	silver: {main: '#cbd5e1', shade: '#64748b'},
	...ACCENTS,
} as const;

export type PadlockColor = keyof typeof PALETTES;

export type PadlockProps = {
	readonly locked?: boolean;
	readonly color?: PadlockColor;
	readonly animated?: boolean;
	readonly style?: React.CSSProperties;
};

const COLORS_LIST = Object.keys(PALETTES) as readonly PadlockColor[];

const PadlockInner: React.FC<PadlockProps> = ({locked = true, color = 'gold', animated = true, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const t = animated ? frame / fps : 0;
	const pal = PALETTES[color];
	const lift = locked ? 0 : -26 + Math.sin(t * 6) * 3;
	const shackle = locked ? 'M 54 104 L 54 64 A 36 36 0 0 1 126 64 L 126 104' : 'M 54 128 L 54 64 A 36 36 0 0 1 126 64 L 126 80';
	const glint = locked && animated ? 0.7 + 0.35 * Math.abs(Math.sin(t * 3)) : 0;

	return (
		<svg viewBox="0 0 180 220" width={180} height={220} style={{overflow: 'visible', transformOrigin: '50% 92%', ...style}}>
			<PropShadow cx={90} cy={204} rx={66} ry={10} />

			{/* Shackle (behind body) */}
			<g transform={`translate(0 ${lift})`}>
				<path d={shackle} fill="none" stroke={PROP_INK} strokeWidth={26} strokeLinecap="round" />
				<path d={shackle} fill="none" stroke={PROP_COLORS.slateLight} strokeWidth={13} strokeLinecap="round" />
				<path d="M 60 62 A 30 30 0 0 1 80 36" fill="none" stroke={PROP_COLORS.white} strokeWidth={4} strokeLinecap="round" />
			</g>

			{/* Body */}
			<rect x={30} y={96} width={120} height={100} rx={20} fill={pal.main} stroke={PROP_INK} strokeWidth={PROP_OW} />
			<path d="M 33 166 L 147 166 L 147 174 Q 147 193 128 193 L 52 193 Q 33 193 33 174 Z" fill={pal.shade} opacity={0.7} />
			<rect x={42} y={108} width={10} height={52} rx={5} fill={PROP_COLORS.white} opacity={0.4} />

			{/* Keyhole */}
			<circle cx={90} cy={134} r={11} fill={PROP_INK} />
			<path d="M 84 138 L 80 166 L 100 166 L 96 138 Z" fill={PROP_INK} />

			{glint ? (
				<g transform={`translate(150 96) scale(${glint})`}>
					<path d="M 0 -14 L 4 -4 L 14 0 L 4 4 L 0 14 L -4 4 L -14 0 L -4 -4 Z" fill={PROP_COLORS.white} stroke={PROP_INK} strokeWidth={2.5} strokeLinejoin="round" />
				</g>
			) : null}
		</svg>
	);
};

/** Reusable 2D cartoon padlock for security, auth, encryption & hacker scenes. */
export const Padlock = Interactive.create({
	Component: PadlockInner,
	layout: 'none',
	componentName: 'PadlockProp',
	schema: {
		locked: {type: 'boolean', default: true, description: 'Locked / unlocked'},
		color: {type: 'enum', default: 'gold', description: 'Body color', variants: propVariants(COLORS_LIST), keyframable: false},
		animated: {type: 'boolean', default: true, description: 'Glint & shackle bounce'},
	},
});
