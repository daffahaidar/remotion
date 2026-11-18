import React, {useId} from 'react';
import {Interactive, useCurrentFrame, useVideoConfig} from 'remotion';
import {PROP_COLORS, PROP_INK, PROP_OW, PropShadow, propVariants} from './shared';

export type SmartphoneScreen = 'app' | 'chat' | 'alert' | 'loading' | 'off';
export type SmartphoneFrameColor = 'dark' | 'silver' | 'cyan';

export type SmartphoneProps = {
	readonly screen?: SmartphoneScreen;
	readonly frameColor?: SmartphoneFrameColor;
	readonly animated?: boolean;
	readonly style?: React.CSSProperties;
};

const PALETTES: Record<SmartphoneFrameColor, {readonly body: string; readonly shade: string}> = {
	dark: {body: '#334155', shade: '#1e293b'},
	silver: {body: '#e2e8f0', shade: '#94a3b8'},
	cyan: {body: '#22d3ee', shade: '#0891b2'},
};

const SCREENS: readonly SmartphoneScreen[] = ['app', 'chat', 'alert', 'loading', 'off'];
const FRAME_COLORS: readonly SmartphoneFrameColor[] = ['dark', 'silver', 'cyan'];

const SmartphoneInner: React.FC<SmartphoneProps> = ({
	screen = 'app',
	frameColor = 'dark',
	animated = true,
	style,
}) => {
	const uid = `sp${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const t = animated ? frame / fps : 0;
	const pal = PALETTES[frameColor];
	const clipId = `${uid}-scr`;

	const dotPulse = Math.floor(t * 4) % 3;
	const alertPulse = 0.85 + 0.15 * Math.sin(t * 8);

	return (
		<svg
			viewBox="0 0 180 280"
			width={180}
			height={280}
			style={{overflow: 'visible', transformOrigin: '50% 92%', ...style}}
		>
			<PropShadow cx={90} cy={262} rx={50} ry={9} />

			{/* Side buttons */}
			<rect x={28} y={66} width={8} height={22} rx={3} fill={pal.shade} stroke={PROP_INK} strokeWidth={4} />
			<rect x={28} y={96} width={8} height={22} rx={3} fill={pal.shade} stroke={PROP_INK} strokeWidth={4} />
			<rect x={144} y={78} width={8} height={36} rx={3} fill={pal.shade} stroke={PROP_INK} strokeWidth={4} />

			{/* Outer chassis */}
			<rect
				x={34}
				y={18}
				width={112}
				height={234}
				rx={24}
				fill={pal.body}
				stroke={PROP_INK}
				strokeWidth={PROP_OW}
			/>
			{/* Side cel highlight */}
			<rect x={40} y={24} width={10} height={222} rx={6} fill={PROP_COLORS.white} opacity={0.18} />

			{/* Inner dark bezel */}
			<rect
				x={43}
				y={27}
				width={94}
				height={216}
				rx={17}
				fill={screen === 'off' ? '#090d16' : PROP_COLORS.screenBg}
				stroke={PROP_INK}
				strokeWidth={3.5}
			/>

			<defs>
				<clipPath id={clipId}>
					<rect x={45} y={29} width={90} height={212} rx={15} />
				</clipPath>
			</defs>

			<g clipPath={`url(#${clipId})`}>
				{screen === 'app' ? (
					<g>
						{/* Top status header */}
						<rect x={45} y={29} width={90} height={44} fill={PROP_COLORS.indigo} />
						<circle cx={63} cy={55} r={8} fill={PROP_COLORS.cyan} stroke={PROP_INK} strokeWidth={2.5} />
						<rect x={77} y={50} width={44} height={6} rx={3} fill={PROP_COLORS.white} />
						<rect x={77} y={59} width={28} height={4} rx={2} fill="#c7d2fe" />

						{/* Card 1 */}
						<rect x={53} y={84} width={74} height={52} rx={9} fill="#1e293b" stroke="#334155" strokeWidth={2} />
						<rect x={61} y={93} width={34} height={6} rx={3} fill={PROP_COLORS.cyan} />
						<rect
							x={61}
							y={107}
							width={24 + (animated ? Math.sin(t * 2.5) * 10 : 0)}
							height={8}
							rx={4}
							fill={PROP_COLORS.emerald}
						/>
						<rect x={61} y={120} width={52} height={6} rx={3} fill="#475569" />

						{/* Card 2 + bottom CTA */}
						<rect x={53} y={145} width={34} height={38} rx={8} fill="#1e293b" />
						<circle cx={70} cy={164} r={10} fill={PROP_COLORS.amber} />
						<rect x={93} y={145} width={34} height={38} rx={8} fill="#1e293b" />
						<rect x={101} y={156} width={18} height={16} rx={4} fill={PROP_COLORS.indigo} />

						<rect x={53} y={194} width={74} height={26} rx={11} fill={PROP_COLORS.emerald} stroke={PROP_INK} strokeWidth={2.5} />
						<rect x={71} y={204} width={38} height={6} rx={3} fill={PROP_COLORS.white} />
					</g>
				) : null}

				{screen === 'chat' ? (
					<g>
						<rect x={45} y={29} width={90} height={34} fill="#1e293b" />
						<circle cx={62} cy={49} r={7} fill={PROP_COLORS.emerald} />
						<rect x={74} y={46} width={40} height={6} rx={3} fill={PROP_COLORS.white} />

						{/* Incoming bubble */}
						<rect x={52} y={76} width={60} height={26} rx={10} fill="#334155" />
						<rect x={60} y={85} width={42} height={6} rx={3} fill={PROP_COLORS.white} />

						{/* Outgoing bubble */}
						<rect x={68} y={110} width={60} height={30} rx={10} fill={PROP_COLORS.indigo} />
						<rect x={76} y={119} width={42} height={5} rx={2.5} fill={PROP_COLORS.white} />
						<rect x={88} y={128} width={30} height={5} rx={2.5} fill="#c7d2fe" />

						{/* Incoming typing bubble */}
						<rect x={52} y={148} width={44} height={24} rx={10} fill="#334155" />
						{[0, 1, 2].map((i) => (
							<circle
								key={i}
								cx={64 + i * 10}
								cy={160 - (dotPulse === i && animated ? 2.5 : 0)}
								r={3}
								fill={dotPulse === i ? PROP_COLORS.cyan : PROP_COLORS.slateMid}
							/>
						))}

						{/* Bottom input bar */}
						<rect x={52} y={196} width={76} height={22} rx={11} fill="#1e293b" stroke="#475569" strokeWidth={2} />
						<circle cx={116} cy={207} r={7} fill={PROP_COLORS.cyan} />
					</g>
				) : null}

				{screen === 'alert' ? (
					<g>
						<rect x={45} y={29} width={90} height={212} fill="#1f0b12" />
						<g opacity={alertPulse}>
							<rect
								x={52}
								y={74}
								width={76}
								height={88}
								rx={12}
								fill={PROP_COLORS.red}
								stroke={PROP_INK}
								strokeWidth={3}
							/>
							<path
								d="M 90 88 L 106 118 L 74 118 Z"
								fill={PROP_COLORS.white}
								stroke={PROP_INK}
								strokeWidth={2.5}
								strokeLinejoin="round"
							/>
							<line x1={90} y1={98} x2={90} y2={108} stroke={PROP_COLORS.red} strokeWidth={3.5} strokeLinecap="round" />
							<circle cx={90} cy={113} r={2} fill={PROP_COLORS.red} />
							<rect x={64} y={128} width={52} height={7} rx={3.5} fill={PROP_COLORS.white} />
							<rect x={70} y={140} width={40} height={6} rx={3} fill="#fecdd3" />
						</g>
						<rect x={58} y={178} width={64} height={24} rx={10} fill={PROP_COLORS.amber} stroke={PROP_INK} strokeWidth={2.5} />
					</g>
				) : null}

				{screen === 'loading' ? (
					<g transform={`translate(90 132) rotate(${t * 260})`}>
						<circle cx={0} cy={0} r={22} fill="none" stroke="#334155" strokeWidth={6} />
						<path
							d="M 0 -22 A 22 22 0 0 1 22 0"
							fill="none"
							stroke={PROP_COLORS.cyan}
							strokeWidth={6}
							strokeLinecap="round"
						/>
					</g>
				) : null}

				{/* Diagonal screen glare */}
				<path d="M 98 29 L 135 29 L 85 241 L 60 241 Z" fill={PROP_COLORS.white} opacity={0.07} />
			</g>

			{/* Dynamic Island & Home indicator */}
			<rect x={73} y={35} width={34} height={9} rx={4.5} fill="#020617" />
			<circle cx={99} cy={39.5} r={2} fill="#1e293b" />
			<rect x={71} y={232} width={38} height={4} rx={2} fill={PROP_COLORS.white} opacity={0.65} />
		</svg>
	);
};

/** Reusable 2D cartoon smartphone prop with app, chat, alert, and loading screens. */
export const Smartphone = Interactive.create({
	Component: SmartphoneInner,
	layout: 'none',
	componentName: 'SmartphoneProp',
	schema: {
		screen: {
			type: 'enum',
			default: 'app',
			description: 'Phone screen mode',
			variants: propVariants(SCREENS),
			keyframable: false,
		},
		frameColor: {
			type: 'enum',
			default: 'dark',
			description: 'Chassis color',
			variants: propVariants(FRAME_COLORS),
			keyframable: false,
		},
		animated: {type: 'boolean', default: true, description: 'Animate UI'},
	},
});
