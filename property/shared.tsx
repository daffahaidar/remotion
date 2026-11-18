import React from 'react';
import {type InteractivitySchema, useCurrentFrame, useVideoConfig} from 'remotion';

/** Shared cartoon ink & shading palette for character properties. */
export const PROP_INK = '#1f1a1f';
export const PROP_OW = 6;

export const PROP_COLORS = {
	ink: PROP_INK,
	shadow: 'rgba(24, 24, 38, 0.16)',
	white: '#ffffff',
	paper: '#f8fafc',
	slateLight: '#e2e8f0',
	slateMid: '#94a3b8',
	slateDark: '#334155',
	slateDeep: '#1e293b',
	screenBg: '#0f172a',
	cyan: '#22d3ee',
	blue: '#3b82f6',
	indigo: '#6366f1',
	emerald: '#10b981',
	green: '#22c55e',
	amber: '#f59e0b',
	gold: '#fbbf24',
	red: '#ef4444',
	rose: '#fb7185',
	wood: '#d97706',
	woodLight: '#f59e0b',
	woodDark: '#92400e',
} as const;

export type ScreenMode = 'code' | 'terminal' | 'browser' | 'dashboard' | 'error' | 'loading' | 'off';

/** Soft ground contact shadow under standing props. */
export const PropShadow: React.FC<{
	readonly cx: number;
	readonly cy: number;
	readonly rx: number;
	readonly ry?: number;
}> = ({cx, cy, rx, ry = 14}) => (
	<ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={PROP_COLORS.shadow} />
);

/** Reusable deterministic animated SVG screen content for Laptop, DesktopComputer, and Smartphone. */
export const ScreenContent: React.FC<{
	readonly x: number;
	readonly y: number;
	readonly width: number;
	readonly height: number;
	readonly mode: ScreenMode;
	readonly accent?: string;
	readonly animated?: boolean;
	readonly uid: string;
}> = ({x, y, width, height, mode, accent = PROP_COLORS.cyan, animated = true, uid}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const t = animated ? frame / fps : 0;
	const cursorOn = !animated || Math.floor(t * 2.2) % 2 === 0;
	const clipId = `${uid}-scr`;

	if (mode === 'off') {
		return (
			<g>
				<rect x={x} y={y} width={width} height={height} rx={6} fill="#1e293b" />
				<path
					d={`M ${x + width * 0.14} ${y + height * 0.15} L ${x + width * 0.36} ${y + height * 0.15} L ${x + width * 0.14} ${y + height * 0.42} Z`}
					fill="#334155"
					opacity={0.55}
				/>
			</g>
		);
	}

	const bg = mode === 'browser' ? '#f8fafc' : mode === 'error' ? '#450a0a' : PROP_COLORS.screenBg;
	const padX = x + width * 0.08;
	const padY = y + height * 0.14;
	const innerW = width * 0.84;

	return (
		<g>
			<defs>
				<clipPath id={clipId}>
					<rect x={x} y={y} width={width} height={height} rx={6} />
				</clipPath>
			</defs>
			<rect x={x} y={y} width={width} height={height} rx={6} fill={bg} />
			<g clipPath={`url(#${clipId})`}>
				{/* Top window bar */}
				<rect
					x={x}
					y={y}
					width={width}
					height={height * 0.14}
					fill={mode === 'browser' ? '#e2e8f0' : mode === 'error' ? '#7f1d1d' : '#1e293b'}
				/>
				<circle cx={x + 12} cy={y + height * 0.07} r={3.2} fill={PROP_COLORS.red} />
				<circle cx={x + 22} cy={y + height * 0.07} r={3.2} fill={PROP_COLORS.amber} />
				<circle cx={x + 32} cy={y + height * 0.07} r={3.2} fill={PROP_COLORS.green} />

				{mode === 'code' ? (
					<g>
						{[0, 1, 2, 3, 4].map((i) => {
							const ly = padY + height * 0.14 * (i + 0.7);
							const indent = i === 1 || i === 2 || i === 3 ? innerW * 0.12 : 0;
							const segW = innerW * (0.45 + ((i * 19) % 35) / 100);
							const lineColor =
								i === 0
									? PROP_COLORS.rose
									: i === 2
										? accent
										: i === 3
											? PROP_COLORS.amber
											: PROP_COLORS.emerald;
							return (
								<rect
									key={i}
									x={padX + indent}
									y={ly}
									width={Math.min(segW, innerW - indent)}
									height={Math.max(4, height * 0.065)}
									rx={3}
									fill={lineColor}
								/>
							);
						})}
						{cursorOn ? (
							<rect
								x={padX + innerW * 0.62}
								y={padY + height * 0.14 * 3.7}
								width={4}
								height={Math.max(6, height * 0.08)}
								rx={1}
								fill={PROP_COLORS.white}
							/>
						) : null}
					</g>
				) : null}

				{mode === 'terminal' ? (
					<g>
						<path
							d={`M ${padX} ${padY + height * 0.15} L ${padX + 9} ${padY + height * 0.21} L ${padX} ${padY + height * 0.27}`}
							fill="none"
							stroke={PROP_COLORS.green}
							strokeWidth={3.5}
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<rect
							x={padX + 16}
							y={padY + height * 0.17}
							width={innerW * 0.56}
							height={6}
							rx={3}
							fill={PROP_COLORS.white}
						/>
						<rect
							x={padX}
							y={padY + height * 0.36}
							width={innerW * 0.72}
							height={5.5}
							rx={3}
							fill={PROP_COLORS.emerald}
						/>
						<rect
							x={padX}
							y={padY + height * 0.5}
							width={innerW * 0.48}
							height={5.5}
							rx={3}
							fill={PROP_COLORS.slateMid}
						/>
						{cursorOn ? (
							<rect
								x={padX}
								y={padY + height * 0.66}
								width={10}
								height={6}
								rx={1.5}
								fill={PROP_COLORS.green}
							/>
						) : null}
					</g>
				) : null}

				{mode === 'browser' ? (
					<g>
						<rect
							x={padX}
							y={padY + height * 0.08}
							width={innerW}
							height={height * 0.24}
							rx={5}
							fill={accent}
						/>
						<rect
							x={padX}
							y={padY + height * 0.4}
							width={innerW * 0.46}
							height={height * 0.36}
							rx={5}
							fill="#cbd5e1"
						/>
						<rect
							x={padX + innerW * 0.54}
							y={padY + height * 0.4}
							width={innerW * 0.46}
							height={height * 0.36}
							rx={5}
							fill="#93c5fd"
						/>
					</g>
				) : null}

				{mode === 'dashboard' ? (
					<g>
						{[0, 1, 2, 3].map((i) => {
							const barH = height * (0.28 + 0.28 * Math.abs(Math.sin(t * 2 + i * 1.1)));
							const bw = (innerW - 24) / 4;
							const bx = padX + i * (bw + 8);
							const by = y + height * 0.86 - barH;
							return (
								<rect
									key={i}
									x={bx}
									y={by}
									width={bw}
									height={barH}
									rx={4}
									fill={i % 2 === 0 ? accent : PROP_COLORS.emerald}
								/>
							);
						})}
					</g>
				) : null}

				{mode === 'error' ? (
					<g>
						<path
							d={`M ${x + width * 0.5} ${padY + height * 0.14} L ${x + width * 0.66} ${padY + height * 0.64} L ${x + width * 0.34} ${padY + height * 0.64} Z`}
							fill={PROP_COLORS.red}
							stroke={PROP_COLORS.white}
							strokeWidth={3}
							strokeLinejoin="round"
						/>
						<line
							x1={x + width * 0.5}
							y1={padY + height * 0.3}
							x2={x + width * 0.5}
							y2={padY + height * 0.46}
							stroke={PROP_COLORS.white}
							strokeWidth={4}
							strokeLinecap="round"
						/>
						<circle cx={x + width * 0.5} cy={padY + height * 0.55} r={2.8} fill={PROP_COLORS.white} />
					</g>
				) : null}

				{mode === 'loading' ? (
					<g transform={`translate(${x + width * 0.5} ${y + height * 0.57}) rotate(${t * 240})`}>
						<circle cx={0} cy={0} r={Math.min(width, height) * 0.2} fill="none" stroke="#334155" strokeWidth={6} />
						<path
							d={`M 0 ${-Math.min(width, height) * 0.2} A ${Math.min(width, height) * 0.2} ${Math.min(width, height) * 0.2} 0 0 1 ${Math.min(width, height) * 0.2} 0`}
							fill="none"
							stroke={accent}
							strokeWidth={6}
							strokeLinecap="round"
						/>
					</g>
				) : null}

				{/* Screen diagonal reflection */}
				<path
					d={`M ${x + width * 0.65} ${y} L ${x + width} ${y} L ${x + width * 0.55} ${y + height} L ${x + width * 0.35} ${y + height} Z`}
					fill={PROP_COLORS.white}
					opacity={0.07}
				/>
			</g>
		</g>
	);
};

/** Helper for building Remotion Interactive enum variants cleanly. */
export const propVariants = (names: readonly string[]): Record<string, InteractivitySchema> =>
	names.reduce<Record<string, InteractivitySchema>>((acc, name) => {
		acc[name] = {};
		return acc;
	}, {});
