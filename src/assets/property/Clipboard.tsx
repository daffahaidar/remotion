import React from 'react';
import {Interactive} from 'remotion';
import {PROP_COLORS, PROP_INK, PROP_OW, PropShadow, propVariants} from './shared';

export type ClipboardVariant = 'qa' | 'pm' | 'medical';

export type ClipboardProps = {
	readonly variant?: ClipboardVariant;
	readonly title?: string;
	readonly style?: React.CSSProperties;
};

const VARIANTS: readonly ClipboardVariant[] = ['qa', 'pm', 'medical'];

const ClipboardInner: React.FC<ClipboardProps> = ({variant = 'qa', title, style}) => {
	const boardFill = variant === 'qa' ? PROP_COLORS.wood : variant === 'pm' ? PROP_COLORS.slateDark : '#0ea5e9';
	const heading = title ?? (variant === 'qa' ? 'QA TEST' : variant === 'pm' ? 'SPRINT' : 'HEALTH');

	return (
		<svg
			viewBox="0 0 200 260"
			width={200}
			height={260}
			style={{overflow: 'visible', transformOrigin: '50% 85%', ...style}}
		>
			<PropShadow cx={100} cy={246} rx={62} ry={9} />

			{/* Backing clipboard */}
			<rect x={28} y={30} width={144} height={208} rx={16} fill={boardFill} stroke={PROP_INK} strokeWidth={PROP_OW} />
			<rect x={152} y={36} width={14} height={196} rx={6} fill={PROP_INK} opacity={0.14} />

			{/* Crisp white paper */}
			<rect x={40} y={46} width={120} height={178} rx={8} fill={PROP_COLORS.paper} stroke={PROP_INK} strokeWidth={4} />

			{/* Metal top clip */}
			<circle cx={100} cy={20} r={10} fill="none" stroke={PROP_INK} strokeWidth={5} />
			<rect
				x={66}
				y={22}
				width={68}
				height={28}
				rx={8}
				fill={PROP_COLORS.slateMid}
				stroke={PROP_INK}
				strokeWidth={PROP_OW}
			/>
			<rect x={76} y={27} width={48} height={6} rx={3} fill={PROP_COLORS.slateLight} />

			{/* Paper title pill */}
			<text
				x={100}
				y={72}
				textAnchor="middle"
				fill={PROP_INK}
				fontFamily="sans-serif"
				fontWeight={800}
				fontSize={14}
				letterSpacing="0.06em"
			>
				{heading}
			</text>
			<line x1={54} y1={80} x2={146} y2={80} stroke={PROP_COLORS.slateLight} strokeWidth={3} strokeLinecap="round" />

			{variant === 'qa' ? (
				<g>
					{[0, 1, 2].map((row) => {
						const y = 98 + row * 38;
						const fail = row === 2;
						return (
							<g key={row}>
								<rect
									x={52}
									y={y}
									width={22}
									height={22}
									rx={6}
									fill={fail ? '#ffe4e6' : '#dcfce7'}
									stroke={PROP_INK}
									strokeWidth={3.5}
								/>
								{fail ? (
									<path
										d={`M 58 ${y + 6} L 68 ${y + 16} M 68 ${y + 6} L 58 ${y + 16}`}
										stroke={PROP_COLORS.red}
										strokeWidth={3.5}
										strokeLinecap="round"
									/>
								) : (
									<path
										d={`M 57 ${y + 11} L 62 ${y + 16} L 70 ${y + 6}`}
										fill="none"
										stroke={PROP_COLORS.green}
										strokeWidth={3.5}
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								)}
								<rect x={82} y={y + 4} width={64} height={6} rx={3} fill={PROP_INK} />
								<rect x={82} y={y + 14} width={44} height={5} rx={2.5} fill={PROP_COLORS.slateMid} />
							</g>
						);
					})}
				</g>
			) : null}

			{variant === 'pm' ? (
				<g>
					{[
						{y: 96, pct: 68, color: PROP_COLORS.emerald},
						{y: 136, pct: 46, color: PROP_COLORS.amber},
						{y: 176, pct: 84, color: PROP_COLORS.indigo},
					].map((item, idx) => (
						<g key={idx}>
							<rect x={52} y={item.y} width={96} height={8} rx={4} fill={PROP_INK} opacity={0.85} />
							<rect x={52} y={item.y + 14} width={96} height={11} rx={5.5} fill={PROP_COLORS.slateLight} />
							<rect
								x={52}
								y={item.y + 14}
								width={item.pct}
								height={11}
								rx={5.5}
								fill={item.color}
								stroke={PROP_INK}
								strokeWidth={2}
							/>
						</g>
					))}
				</g>
			) : null}

			{variant === 'medical' ? (
				<g>
					{/* Red cross */}
					<rect x={93} y={92} width={14} height={36} rx={3} fill={PROP_COLORS.red} />
					<rect x={82} y={103} width={36} height={14} rx={3} fill={PROP_COLORS.red} />

					{/* ECG trace */}
					<path
						d="M 52 154 L 74 154 L 84 134 L 94 172 L 104 142 L 114 154 L 148 154"
						fill="none"
						stroke={PROP_COLORS.blue}
						strokeWidth={4.5}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<rect x={54} y={186} width={92} height={6} rx={3} fill={PROP_COLORS.slateMid} />
					<rect x={54} y={199} width={68} height={6} rx={3} fill={PROP_COLORS.slateLight} />
				</g>
			) : null}
		</svg>
	);
};

/** Reusable 2D cartoon clipboard prop for QA checklists, PM sprint tracking, and Doctor charts. */
export const Clipboard = Interactive.create({
	Component: ClipboardInner,
	layout: 'none',
	componentName: 'ClipboardProp',
	schema: {
		variant: {
			type: 'enum',
			default: 'qa',
			description: 'Checklist style',
			variants: propVariants(VARIANTS),
			keyframable: false,
		},
		title: {type: 'string', default: 'QA TEST', description: 'Header text'},
	},
});
