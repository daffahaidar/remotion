import React from 'react';
import {Interactive, type InteractivitySchema} from 'remotion';
import {PROP_COLORS, PROP_INK, PROP_OW, PropShadow} from './shared';

export type WhiteboardMode = 'diagram' | 'kanban' | 'code' | 'bug' | 'clean';

export type WhiteboardProps = {
	readonly mode?: WhiteboardMode;
	readonly title?: string;
	readonly style?: React.CSSProperties;
};

const MODES: readonly WhiteboardMode[] = ['diagram', 'kanban', 'code', 'bug', 'clean'];

const WhiteboardInner: React.FC<WhiteboardProps> = ({
	mode = 'diagram',
	title = 'ARCHITECTURE',
	style,
}) => {
	return (
		<svg
			viewBox="0 0 440 460"
			width={440}
			height={460}
			style={{overflow: 'visible', transformOrigin: '50% 96%', ...style}}
		>
			<PropShadow cx={220} cy={444} rx={168} ry={14} />

			{/* Stand legs & wheels */}
			<line x1={88} y1={310} x2={72} y2={432} stroke={PROP_INK} strokeWidth={18} strokeLinecap="round" />
			<line x1={88} y1={310} x2={72} y2={432} stroke={PROP_COLORS.slateMid} strokeWidth={8} strokeLinecap="round" />
			<line x1={352} y1={310} x2={368} y2={432} stroke={PROP_INK} strokeWidth={18} strokeLinecap="round" />
			<line x1={352} y1={310} x2={368} y2={432} stroke={PROP_COLORS.slateMid} strokeWidth={8} strokeLinecap="round" />
			<line x1={76} y1={388} x2={364} y2={388} stroke={PROP_INK} strokeWidth={16} strokeLinecap="round" />
			<line x1={76} y1={388} x2={364} y2={388} stroke={PROP_COLORS.slateMid} strokeWidth={6} strokeLinecap="round" />
			<circle cx={72} cy={436} r={10} fill={PROP_COLORS.slateDeep} stroke={PROP_INK} strokeWidth={4} />
			<circle cx={368} cy={436} r={10} fill={PROP_COLORS.slateDeep} stroke={PROP_INK} strokeWidth={4} />

			{/* Outer board frame */}
			<rect
				x={24}
				y={24}
				width={392}
				height={292}
				rx={16}
				fill={PROP_COLORS.slateLight}
				stroke={PROP_INK}
				strokeWidth={PROP_OW}
			/>
			{/* Dry-erase surface */}
			<rect
				x={40}
				y={40}
				width={360}
				height={252}
				rx={8}
				fill={PROP_COLORS.white}
				stroke={PROP_INK}
				strokeWidth={4}
			/>

			{/* Header */}
			<text x={58} y={72} fontFamily="sans-serif" fontSize={20} fontWeight={700} fill={PROP_INK}>
				{title}
			</text>
			<line x1={56} y1={84} x2={384} y2={84} stroke={PROP_COLORS.slateLight} strokeWidth={3} />

			{mode === 'diagram' ? (
				<g>
					<rect x={60} y={118} width={84} height={54} rx={10} fill="#dbeafe" stroke={PROP_COLORS.blue} strokeWidth={4} />
					<text x={102} y={151} textAnchor="middle" fontFamily="monospace" fontSize={16} fontWeight={700} fill="#1e40af">
						UI
					</text>
					<path d="M 152 145 L 178 145" stroke={PROP_INK} strokeWidth={4.5} strokeLinecap="round" />
					<rect x={182} y={118} width={84} height={54} rx={10} fill="#dcfce7" stroke={PROP_COLORS.emerald} strokeWidth={4} />
					<text x={224} y={151} textAnchor="middle" fontFamily="monospace" fontSize={16} fontWeight={700} fill="#065f46">
						API
					</text>
					<path d="M 274 145 L 300 145" stroke={PROP_INK} strokeWidth={4.5} strokeLinecap="round" />
					<rect x={304} y={118} width={78} height={54} rx={10} fill="#fef3c7" stroke={PROP_COLORS.amber} strokeWidth={4} />
					<text x={343} y={151} textAnchor="middle" fontFamily="monospace" fontSize={16} fontWeight={700} fill="#92400e">
						DB
					</text>
					<rect x={92} y={206} width={256} height={46} rx={10} fill="#f1f5f9" stroke={PROP_INK} strokeWidth={3.5} />
					<line x1={116} y1={229} x2={324} y2={229} stroke={PROP_COLORS.indigo} strokeWidth={6} strokeLinecap="round" />
				</g>
			) : null}

			{mode === 'kanban' ? (
				<g>
					{[0, 1, 2].map((col) => {
						const cx = 58 + col * 112;
						const tint = col === 0 ? '#fee2e2' : col === 1 ? '#fef3c7' : '#dcfce7';
						return (
							<g key={col}>
								<rect x={cx} y={104} width={98} height={162} rx={8} fill="#f8fafc" stroke={PROP_COLORS.slateMid} strokeWidth={3} />
								<rect x={cx + 10} y={118} width={78} height={28} rx={6} fill={tint} stroke={PROP_INK} strokeWidth={2.5} />
								<rect x={cx + 10} y={156} width={78} height={28} rx={6} fill={tint} stroke={PROP_INK} strokeWidth={2.5} />
							</g>
						);
					})}
				</g>
			) : null}

			{mode === 'code' ? (
				<g>
					{[0, 1, 2, 3, 4].map((i) => (
						<rect
							key={i}
							x={66 + (i === 1 || i === 2 ? 26 : 0)}
							y={108 + i * 32}
							width={140 + ((i * 47) % 120)}
							height={12}
							rx={6}
							fill={i % 2 === 0 ? PROP_COLORS.indigo : PROP_COLORS.cyan}
						/>
					))}
				</g>
			) : null}

			{mode === 'bug' ? (
				<g>
					<circle cx={148} cy={186} r={44} fill="#ffe4e6" stroke={PROP_COLORS.red} strokeWidth={5} />
					<path d="M 128 166 L 168 206 M 168 166 L 128 206" stroke={PROP_COLORS.red} strokeWidth={7} strokeLinecap="round" />
					<line x1={220} y1={160} x2={360} y2={160} stroke={PROP_INK} strokeWidth={7} strokeLinecap="round" />
					<line x1={220} y1={192} x2={332} y2={192} stroke={PROP_COLORS.slateMid} strokeWidth={7} strokeLinecap="round" />
					<line x1={220} y1={224} x2={346} y2={224} stroke={PROP_COLORS.emerald} strokeWidth={7} strokeLinecap="round" />
				</g>
			) : null}

			{/* Marker tray + colored markers */}
			<rect x={110} y={306} width={220} height={16} rx={5} fill={PROP_COLORS.slateMid} stroke={PROP_INK} strokeWidth={4} />
			<rect x={144} y={294} width={44} height={11} rx={4} fill={PROP_COLORS.blue} stroke={PROP_INK} strokeWidth={3} />
			<rect x={198} y={294} width={44} height={11} rx={4} fill={PROP_COLORS.red} stroke={PROP_INK} strokeWidth={3} />
		</svg>
	);
};

const variants = (names: readonly string[]) =>
	names.reduce<Record<string, InteractivitySchema>>((acc, n) => {
		acc[n] = {};
		return acc;
	}, {});

/** Reusable 2D cartoon presentation whiteboard for tutorials, architecture diagrams, and Kanban sprints. */
export const Whiteboard = Interactive.create({
	Component: WhiteboardInner,
	layout: 'none',
	componentName: 'WhiteboardProp',
	schema: {
		mode: {
			type: 'enum',
			default: 'diagram',
			description: 'Board drawing',
			variants: variants(MODES),
			keyframable: false,
		},
		title: {type: 'string', default: 'ARCHITECTURE', description: 'Board heading'},
	},
});
