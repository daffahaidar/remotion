import React from 'react';
import {Interactive, type InteractivitySchema} from 'remotion';
import {PROP_COLORS, PROP_INK, PROP_OW, PropShadow} from './shared';

export type DeskVariant = 'modern' | 'executive' | 'minimal';

export type OfficeDeskProps = {
	readonly variant?: DeskVariant;
	readonly showChair?: boolean;
	readonly style?: React.CSSProperties;
};

const VARIANTS: readonly DeskVariant[] = ['modern', 'executive', 'minimal'];

const OfficeDeskInner: React.FC<OfficeDeskProps> = ({variant = 'modern', showChair = true, style}) => {
	const topColor = variant === 'executive' ? PROP_COLORS.wood : variant === 'modern' ? '#f1f5f9' : '#e2e8f0';
	const legColor = variant === 'executive' ? PROP_COLORS.woodDark : PROP_COLORS.slateDeep;
	const panelColor = variant === 'executive' ? '#78350f' : PROP_COLORS.slateDark;

	return (
		<svg
			viewBox="0 0 560 360"
			width={560}
			height={360}
			style={{overflow: 'visible', transformOrigin: '50% 95%', ...style}}
		>
			<PropShadow cx={280} cy={342} rx={246} ry={16} />

			{/* Background ergonomic office chair (optional) */}
			{showChair ? (
				<g>
					<rect
						x={268}
						y={230}
						width={24}
						height={98}
						fill={PROP_COLORS.slateDark}
						stroke={PROP_INK}
						strokeWidth={PROP_OW}
					/>
					<path
						d="M 224 338 L 280 322 L 336 338"
						fill="none"
						stroke={PROP_INK}
						strokeWidth={12}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<rect
						x={216}
						y={46}
						width={128}
						height={146}
						rx={26}
						fill={variant === 'executive' ? '#1e293b' : '#475569'}
						stroke={PROP_INK}
						strokeWidth={PROP_OW}
					/>
					<rect x={232} y={64} width={96} height={96} rx={16} fill={variant === 'executive' ? '#334155' : '#64748b'} />
				</g>
			) : null}

			{/* Desk legs */}
			<rect x={54} y={168} width={28} height={172} rx={6} fill={legColor} stroke={PROP_INK} strokeWidth={PROP_OW} />
			<rect x={478} y={168} width={28} height={172} rx={6} fill={legColor} stroke={PROP_INK} strokeWidth={PROP_OW} />

			{/* Front modesty panel or drawers */}
			{variant !== 'minimal' ? (
				<rect
					x={82}
					y={168}
					width={396}
					height={variant === 'executive' ? 142 : 76}
					fill={panelColor}
					stroke={PROP_INK}
					strokeWidth={PROP_OW}
				/>
			) : null}

			{variant === 'executive' ? (
				<rect x={116} y={192} width={328} height={92} rx={8} fill="none" stroke={PROP_COLORS.gold} strokeWidth={4} />
			) : null}

			{/* Tabletop */}
			<rect
				x={24}
				y={138}
				width={512}
				height={34}
				rx={10}
				fill={topColor}
				stroke={PROP_INK}
				strokeWidth={PROP_OW}
				strokeLinejoin="round"
			/>
			<line
				x1={42}
				y1={148}
				x2={518}
				y2={148}
				stroke={PROP_COLORS.white}
				strokeWidth={4}
				strokeLinecap="round"
				opacity={0.45}
			/>
		</svg>
	);
};

const variants = (names: readonly string[]) =>
	names.reduce<Record<string, InteractivitySchema>>((acc, n) => {
		acc[n] = {};
		return acc;
	}, {});

/** Reusable 2D cartoon office desk & chair prop aligned to character sitting/typing hands. */
export const OfficeDesk = Interactive.create({
	Component: OfficeDeskInner,
	layout: 'none',
	componentName: 'OfficeDeskProp',
	schema: {
		variant: {
			type: 'enum',
			default: 'modern',
			description: 'Desk style',
			variants: variants(VARIANTS),
			keyframable: false,
		},
		showChair: {type: 'boolean', default: true, description: 'Show office chair'},
	},
});
