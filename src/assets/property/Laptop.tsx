import React, {useId} from 'react';
import {Interactive, type InteractivitySchema} from 'remotion';
import {PROP_COLORS, PROP_INK, PROP_OW, PropShadow, ScreenContent, type ScreenMode} from './shared';

export type LaptopColor = 'silver' | 'spaceGray' | 'indigo' | 'emerald';
export type LaptopBadge = 'none' | 'code' | 'terminal' | 'bug';

export type LaptopProps = {
	readonly screen?: ScreenMode;
	readonly color?: LaptopColor;
	readonly badge?: LaptopBadge;
	readonly open?: boolean;
	readonly animated?: boolean;
	readonly style?: React.CSSProperties;
};

const PALETTES: Record<LaptopColor, {readonly body: string; readonly shade: string; readonly deck: string}> = {
	silver: {body: '#e2e8f0', shade: '#94a3b8', deck: '#cbd5e1'},
	spaceGray: {body: '#475569', shade: '#1e293b', deck: '#334155'},
	indigo: {body: '#6366f1', shade: '#4338ca', deck: '#4f46e5'},
	emerald: {body: '#10b981', shade: '#047857', deck: '#059669'},
};

const SCREEN_MODES: readonly ScreenMode[] = ['code', 'terminal', 'browser', 'dashboard', 'error', 'loading', 'off'];
const COLORS_LIST: readonly LaptopColor[] = ['silver', 'spaceGray', 'indigo', 'emerald'];
const BADGES_LIST: readonly LaptopBadge[] = ['none', 'code', 'terminal', 'bug'];

const LaptopInner: React.FC<LaptopProps> = ({
	screen = 'code',
	color = 'silver',
	badge = 'code',
	open = true,
	animated = true,
	style,
}) => {
	const uid = `lp${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
	const pal = PALETTES[color];

	return (
		<svg
			viewBox="0 0 320 220"
			width={320}
			height={220}
			style={{overflow: 'visible', transformOrigin: '50% 92%', ...style}}
		>
			<PropShadow cx={160} cy={204} rx={126} ry={12} />

			{open ? (
				<g>
					{/* Open display lid */}
					<rect
						x={42}
						y={14}
						width={236}
						height={140}
						rx={14}
						fill={pal.body}
						stroke={PROP_INK}
						strokeWidth={PROP_OW}
						strokeLinejoin="round"
					/>
					<ScreenContent x={54} y={24} width={212} height={118} mode={screen} animated={animated} uid={uid} />
					{/* Webcam dot */}
					<circle cx={160} cy={19} r={2.5} fill={PROP_INK} />

					{/* Angled keyboard deck */}
					<path
						d="M 42 152 L 278 152 L 304 190 L 16 190 Z"
						fill={pal.deck}
						stroke={PROP_INK}
						strokeWidth={PROP_OW}
						strokeLinejoin="round"
					/>
					{/* Keyboard key strip + trackpad */}
					<path d="M 52 158 L 268 158 L 276 172 L 44 172 Z" fill={pal.shade} stroke={PROP_INK} strokeWidth={3} />
					<path d="M 134 176 L 186 176 L 190 185 L 130 185 Z" fill={pal.body} stroke={PROP_INK} strokeWidth={2.5} />
					{/* Front base lip */}
					<rect
						x={16}
						y={188}
						width={288}
						height={12}
						rx={5}
						fill={pal.shade}
						stroke={PROP_INK}
						strokeWidth={PROP_OW}
						strokeLinejoin="round"
					/>
					<rect x={136} y={191} width={48} height={5} rx={2.5} fill={PROP_INK} />
				</g>
			) : (
				<g>
					{/* Closed sleek laptop lid */}
					<rect
						x={36}
						y={142}
						width={248}
						height={36}
						rx={10}
						fill={pal.body}
						stroke={PROP_INK}
						strokeWidth={PROP_OW}
						strokeLinejoin="round"
					/>
					<rect
						x={36}
						y={170}
						width={248}
						height={20}
						rx={7}
						fill={pal.shade}
						stroke={PROP_INK}
						strokeWidth={PROP_OW}
						strokeLinejoin="round"
					/>
					{badge === 'code' ? (
						<path
							d="M 150 154 L 142 160 L 150 166 M 170 154 L 178 160 L 170 166"
							fill="none"
							stroke={PROP_COLORS.cyan}
							strokeWidth={3.5}
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					) : badge === 'terminal' ? (
						<path
							d="M 148 154 L 156 160 L 148 166 M 162 165 L 172 165"
							fill="none"
							stroke={PROP_COLORS.green}
							strokeWidth={3.5}
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					) : badge === 'bug' ? (
						<circle cx={160} cy={160} r={6} fill={PROP_COLORS.rose} stroke={PROP_INK} strokeWidth={2.5} />
					) : null}
				</g>
			)}
		</svg>
	);
};

const variants = (names: readonly string[]) =>
	names.reduce<Record<string, InteractivitySchema>>((acc, n) => {
		acc[n] = {};
		return acc;
	}, {});

/** Reusable 2D cartoon laptop prop with deterministic animated screen modes. */
export const Laptop = Interactive.create({
	Component: LaptopInner,
	layout: 'none',
	componentName: 'LaptopProp',
	schema: {
		screen: {
			type: 'enum',
			default: 'code',
			description: 'Screen mode',
			variants: variants(SCREEN_MODES),
			keyframable: false,
		},
		color: {
			type: 'enum',
			default: 'silver',
			description: 'Body color',
			variants: variants(COLORS_LIST),
			keyframable: false,
		},
		badge: {
			type: 'enum',
			default: 'code',
			description: 'Lid sticker',
			variants: variants(BADGES_LIST),
			keyframable: false,
		},
		open: {type: 'boolean', default: true, description: 'Lid open'},
		animated: {type: 'boolean', default: true, description: 'Animate screen'},
	},
});
