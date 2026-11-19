import React from 'react';
import {Interactive, useCurrentFrame, useVideoConfig, type InteractivitySchema} from 'remotion';
import {PROP_COLORS, PROP_INK, PROP_OW, PropShadow} from './shared';

export type ServerStatus = 'healthy' | 'busy' | 'warning' | 'down';

export type ServerRackProps = {
	readonly status?: ServerStatus;
	readonly label?: string;
	readonly animated?: boolean;
	readonly style?: React.CSSProperties;
};

const STATUSES: readonly ServerStatus[] = ['healthy', 'busy', 'warning', 'down'];

const ServerRackInner: React.FC<ServerRackProps> = ({
	status = 'healthy',
	label = 'PROD-01',
	animated = true,
	style,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const t = animated ? frame / fps : 0;

	const ledColor =
		status === 'healthy'
			? PROP_COLORS.green
			: status === 'busy'
				? PROP_COLORS.cyan
				: status === 'warning'
					? PROP_COLORS.amber
					: PROP_COLORS.red;

	const smokeDrift = (t * 28) % 36;

	return (
		<svg
			viewBox="0 0 320 520"
			width={320}
			height={520}
			style={{overflow: 'visible', transformOrigin: '50% 95%', ...style}}
		>
			<PropShadow cx={160} cy={496} rx={122} ry={16} />

			{/* Smoke / overheat wisps when server is down */}
			{status === 'down' ? (
				<g opacity={0.85}>
					<circle
						cx={112}
						cy={44 - smokeDrift * 0.6}
						r={20}
						fill="#cbd5e1"
						stroke={PROP_INK}
						strokeWidth={4.5}
					/>
					<circle
						cx={152}
						cy={24 - smokeDrift * 0.8}
						r={26}
						fill="#94a3b8"
						stroke={PROP_INK}
						strokeWidth={4.5}
					/>
					<circle
						cx={198}
						cy={42 - smokeDrift * 0.5}
						r={18}
						fill="#cbd5e1"
						stroke={PROP_INK}
						strokeWidth={4.5}
					/>
				</g>
			) : null}

			{/* Side 3D depth panel */}
			<path
				d="M 244 48 L 274 70 L 274 470 L 244 488 Z"
				fill={PROP_COLORS.slateDeep}
				stroke={PROP_INK}
				strokeWidth={PROP_OW}
				strokeLinejoin="round"
			/>
			{/* Main front rack chassis */}
			<rect
				x={52}
				y={48}
				width={196}
				height={440}
				rx={16}
				fill={PROP_COLORS.slateDark}
				stroke={PROP_INK}
				strokeWidth={PROP_OW}
				strokeLinejoin="round"
			/>

			{/* Header plate */}
			<rect x={70} y={66} width={160} height={36} rx={8} fill="#0f172a" stroke={PROP_INK} strokeWidth={3.5} />
			<text
				x={150}
				y={91}
				textAnchor="middle"
				fontFamily="monospace"
				fontSize={20}
				fontWeight={700}
				fill={ledColor}
			>
				{label}
			</text>

			{/* 4 Server Blade Units */}
			{[0, 1, 2, 3].map((row) => {
				const uy = 118 + row * 86;
				const blinkA = !animated || Math.sin(t * (status === 'busy' ? 14 : 5) + row * 1.7) > -0.2;
				const blinkB = !animated || Math.cos(t * (status === 'busy' ? 16 : 6) + row * 2.1) > 0;
				return (
					<g key={row}>
						<rect
							x={70}
							y={uy}
							width={160}
							height={68}
							rx={10}
							fill={PROP_COLORS.slateDeep}
							stroke={PROP_INK}
							strokeWidth={4.5}
						/>
						{/* Drive vent slots */}
						{[0, 1, 2, 3].map((v) => (
							<line
								key={v}
								x1={84 + v * 14}
								y1={uy + 18}
								x2={84 + v * 14}
								y2={uy + 50}
								stroke={PROP_COLORS.slateMid}
								strokeWidth={5}
								strokeLinecap="round"
							/>
						))}
						{/* Status LED lights */}
						<circle cx={170} cy={uy + 26} r={6.5} fill={blinkA ? ledColor : '#1e293b'} stroke={PROP_INK} strokeWidth={2.5} />
						<circle
							cx={192}
							cy={uy + 26}
							r={6.5}
							fill={
								status === 'down'
									? PROP_COLORS.red
									: blinkB
										? status === 'warning'
											? PROP_COLORS.amber
											: PROP_COLORS.cyan
										: '#1e293b'
							}
							stroke={PROP_INK}
							strokeWidth={2.5}
						/>
						<rect x={164} y={uy + 44} width={44} height={8} rx={4} fill="#0f172a" />
					</g>
				);
			})}

			{/* Rack feet */}
			<rect x={76} y={486} width={28} height={14} rx={4} fill={PROP_INK} />
			<rect x={196} y={486} width={28} height={14} rx={4} fill={PROP_INK} />

			{/* Warning / Down alert badge */}
			{status === 'warning' || status === 'down' ? (
				<g transform={`translate(234 52) scale(${1 + 0.06 * Math.sin(t * 7)})`}>
					<path
						d="M 0 -30 L 30 22 L -30 22 Z"
						fill={status === 'down' ? PROP_COLORS.red : PROP_COLORS.amber}
						stroke={PROP_INK}
						strokeWidth={5}
						strokeLinejoin="round"
					/>
					<line x1={0} y1={-10} x2={0} y2={6} stroke={PROP_COLORS.white} strokeWidth={5.5} strokeLinecap="round" />
					<circle cx={0} cy={14} r={3.2} fill={PROP_COLORS.white} />
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

/** Reusable 2D cartoon server rack with status LEDs, label, and error/smoke states. */
export const ServerRack = Interactive.create({
	Component: ServerRackInner,
	layout: 'none',
	componentName: 'ServerRackProp',
	schema: {
		status: {
			type: 'enum',
			default: 'healthy',
			description: 'Server status',
			variants: variants(STATUSES),
			keyframable: false,
		},
		label: {type: 'string', default: 'PROD-01', description: 'Rack label'},
		animated: {type: 'boolean', default: true, description: 'Animate LEDs'},
	},
});
