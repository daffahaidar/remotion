import React from 'react';
import {Interactive, useCurrentFrame, useVideoConfig} from 'remotion';
import {ACCENTS, ACCENT_NAMES, PROP_COLORS, PROP_INK, propVariants, type AccentColor} from './shared';

export type MagnifierLens = 'empty' | 'bug' | 'code' | 'check';

export type MagnifyingGlassProps = {
	readonly lens?: MagnifierLens;
	readonly handleColor?: AccentColor;
	readonly animated?: boolean;
	readonly style?: React.CSSProperties;
};

const LENSES: readonly MagnifierLens[] = ['empty', 'bug', 'code', 'check'];

const MagnifyingGlassInner: React.FC<MagnifyingGlassProps> = ({
	lens = 'bug',
	handleColor = 'indigo',
	animated = true,
	style,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const t = animated ? frame / fps : 0;
	const pal = ACCENTS[handleColor];
	const clipId = `mg${React.useId().replace(/[^a-zA-Z0-9]/g, '')}-lens`;
	const sway = Math.sin(t * 2) * 6;
	const crawl = Math.sin(t * 3) * 6;

	return (
		<svg
			viewBox="0 0 220 220"
			width={220}
			height={220}
			style={{overflow: 'visible', transformOrigin: '50% 50%', ...style}}
		>
			<defs>
				<clipPath id={clipId}>
					<circle cx={88} cy={88} r={52} />
				</clipPath>
			</defs>
			<g transform={`rotate(${sway} 110 110)`}>
				{/* Handle */}
				<line x1={136} y1={136} x2={192} y2={192} stroke={PROP_INK} strokeWidth={32} strokeLinecap="round" />
				<line x1={136} y1={136} x2={192} y2={192} stroke={pal.main} strokeWidth={20} strokeLinecap="round" />
				<line
					x1={150}
					y1={156}
					x2={184}
					y2={190}
					stroke={pal.shade}
					strokeWidth={6}
					strokeLinecap="round"
					opacity={0.7}
				/>
				<line x1={126} y1={126} x2={142} y2={142} stroke={PROP_INK} strokeWidth={34} />
				<line x1={128} y1={128} x2={140} y2={140} stroke={PROP_COLORS.slateMid} strokeWidth={24} />

				{/* Lens glass + contents */}
				<circle cx={88} cy={88} r={56} fill="#e0f2fe" />
				<g clipPath={`url(#${clipId})`}>
					{lens === 'bug' ? (
						<g transform={`translate(${crawl} 0)`}>
							{[76, 88, 100].map((x) => (
								<line
									key={x}
									x1={x}
									y1={100}
									x2={x - 6}
									y2={114}
									stroke={PROP_INK}
									strokeWidth={4}
									strokeLinecap="round"
								/>
							))}
							<circle cx={110} cy={92} r={9} fill={PROP_COLORS.slateDark} stroke={PROP_INK} strokeWidth={3.5} />
							<path
								d="M 64 102 C 64 80, 80 74, 90 74 C 102 74, 106 84, 106 102 Q 86 108 64 102 Z"
								fill={PROP_COLORS.red}
								stroke={PROP_INK}
								strokeWidth={4}
								strokeLinejoin="round"
							/>
							<circle cx={78} cy={88} r={4} fill={PROP_INK} />
							<circle cx={96} cy={90} r={3.5} fill={PROP_INK} />
						</g>
					) : null}
					{lens === 'code'
						? [0, 1, 2, 3].map((i) => (
								<rect
									key={i}
									x={58 + (i === 1 || i === 2 ? 10 : 0)}
									y={64 + i * 14}
									width={[52, 40, 46, 30][i]}
									height={7}
									rx={3.5}
									fill={[PROP_COLORS.rose, PROP_COLORS.indigo, PROP_COLORS.emerald, PROP_COLORS.amber][i]}
								/>
							))
						: null}
					{lens === 'check' ? (
						<g>
							<circle cx={88} cy={88} r={26} fill={PROP_COLORS.green} stroke={PROP_INK} strokeWidth={4} />
							<path
								d="M 76 88 L 85 97 L 101 78"
								fill="none"
								stroke={PROP_COLORS.white}
								strokeWidth={6}
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</g>
					) : null}
				</g>
				<path
					d="M 52 76 Q 56 56 76 46"
					fill="none"
					stroke={PROP_COLORS.white}
					strokeWidth={7}
					strokeLinecap="round"
					opacity={0.85}
				/>

				{/* Rim */}
				<circle cx={88} cy={88} r={60} fill="none" stroke={PROP_INK} strokeWidth={22} />
				<circle cx={88} cy={88} r={60} fill="none" stroke={PROP_COLORS.slateMid} strokeWidth={10} />
				<path
					d="M 40 60 A 56 56 0 0 1 70 34"
					fill="none"
					stroke={PROP_COLORS.slateLight}
					strokeWidth={4}
					strokeLinecap="round"
				/>
			</g>
		</svg>
	);
};

/** Reusable 2D cartoon magnifying glass for QA, debugging, search & inspection scenes. */
export const MagnifyingGlass = Interactive.create({
	Component: MagnifyingGlassInner,
	layout: 'none',
	componentName: 'MagnifyingGlassProp',
	schema: {
		lens: {
			type: 'enum',
			default: 'bug',
			description: 'What the lens shows',
			variants: propVariants(LENSES),
			keyframable: false,
		},
		handleColor: {
			type: 'enum',
			default: 'indigo',
			description: 'Handle color',
			variants: propVariants(ACCENT_NAMES),
			keyframable: false,
		},
		animated: {type: 'boolean', default: true, description: 'Sway & crawl'},
	},
});
