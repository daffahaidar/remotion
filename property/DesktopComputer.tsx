import React, {useId} from 'react';
import {Interactive, type InteractivitySchema} from 'remotion';
import {PROP_COLORS, PROP_INK, PROP_OW, PropShadow, ScreenContent, type ScreenMode} from './shared';

export type TowerSide = 'right' | 'left' | 'none';

export type DesktopComputerProps = {
	readonly screen?: ScreenMode;
	readonly towerSide?: TowerSide;
	readonly accentColor?: string;
	readonly animated?: boolean;
	readonly style?: React.CSSProperties;
};

const SCREEN_MODES: readonly ScreenMode[] = ['code', 'terminal', 'browser', 'dashboard', 'error', 'loading', 'off'];
const TOWER_SIDES: readonly TowerSide[] = ['right', 'left', 'none'];

const DesktopComputerInner: React.FC<DesktopComputerProps> = ({
	screen = 'code',
	towerSide = 'right',
	accentColor = PROP_COLORS.cyan,
	animated = true,
	style,
}) => {
	const uid = `dc${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
	const monX = towerSide === 'left' ? 124 : towerSide === 'right' ? 24 : 74;
	const towerX = towerSide === 'left' ? 20 : 352;

	return (
		<svg
			viewBox="0 0 460 320"
			width={460}
			height={320}
			style={{overflow: 'visible', transformOrigin: '50% 94%', ...style}}
		>
			<PropShadow cx={230} cy={302} rx={195} ry={15} />

			{/* PC Tower */}
			{towerSide !== 'none' ? (
				<g>
					<rect
						x={towerX}
						y={78}
						width={88}
						height={216}
						rx={12}
						fill={PROP_COLORS.slateDeep}
						stroke={PROP_INK}
						strokeWidth={PROP_OW}
						strokeLinejoin="round"
					/>
					<rect x={towerX + 12} y={96} width={64} height={84} rx={8} fill="#0f172a" stroke={PROP_INK} strokeWidth={3.5} />
					<line
						x1={towerX + 24}
						y1={116}
						x2={towerX + 64}
						y2={116}
						stroke={accentColor}
						strokeWidth={5}
						strokeLinecap="round"
					/>
					<line
						x1={towerX + 24}
						y1={134}
						x2={towerX + 64}
						y2={134}
						stroke={accentColor}
						strokeWidth={5}
						strokeLinecap="round"
						opacity={0.65}
					/>
					<circle cx={towerX + 44} cy={208} r={10} fill={accentColor} stroke={PROP_INK} strokeWidth={3.5} />
					{[240, 254, 268].map((vy) => (
						<line
							key={vy}
							x1={towerX + 18}
							y1={vy}
							x2={towerX + 70}
							y2={vy}
							stroke={PROP_COLORS.slateDark}
							strokeWidth={5}
							strokeLinecap="round"
						/>
					))}
				</g>
			) : null}

			{/* Monitor Stand */}
			<rect
				x={monX + 132}
				y={214}
				width={48}
				height={46}
				fill={PROP_COLORS.slateMid}
				stroke={PROP_INK}
				strokeWidth={PROP_OW}
			/>
			<rect
				x={monX + 94}
				y={254}
				width={124}
				height={16}
				rx={7}
				fill={PROP_COLORS.slateLight}
				stroke={PROP_INK}
				strokeWidth={PROP_OW}
			/>

			{/* Wide Display */}
			<rect
				x={monX}
				y={24}
				width={312}
				height={196}
				rx={16}
				fill={PROP_COLORS.slateDeep}
				stroke={PROP_INK}
				strokeWidth={PROP_OW}
				strokeLinejoin="round"
			/>
			<ScreenContent
				x={monX + 14}
				y={38}
				width={284}
				height={164}
				mode={screen}
				accent={accentColor}
				animated={animated}
				uid={uid}
			/>
			<circle cx={monX + 156} cy={211} r={3.5} fill={accentColor} />

			{/* Mechanical Keyboard + Mouse */}
			<path
				d={`M ${monX + 34} 276 L ${monX + 226} 276 L ${monX + 236} 302 L ${monX + 24} 302 Z`}
				fill={PROP_COLORS.slateLight}
				stroke={PROP_INK}
				strokeWidth={PROP_OW}
				strokeLinejoin="round"
			/>
			<line
				x1={monX + 46}
				y1={288}
				x2={monX + 214}
				y2={288}
				stroke={PROP_COLORS.slateDark}
				strokeWidth={6}
				strokeLinecap="round"
			/>
			<ellipse
				cx={monX + 270}
				cy={290}
				rx={20}
				ry={13}
				fill={PROP_COLORS.slateLight}
				stroke={PROP_INK}
				strokeWidth={PROP_OW}
			/>
			<line x1={monX + 270} y1={280} x2={monX + 270} y2={288} stroke={PROP_INK} strokeWidth={3.5} strokeLinecap="round" />
		</svg>
	);
};

const variants = (names: readonly string[]) =>
	names.reduce<Record<string, InteractivitySchema>>((acc, n) => {
		acc[n] = {};
		return acc;
	}, {});

/** Reusable 2D cartoon desktop workstation (wide monitor, PC tower, keyboard, mouse). */
export const DesktopComputer = Interactive.create({
	Component: DesktopComputerInner,
	layout: 'none',
	componentName: 'DesktopComputerProp',
	schema: {
		screen: {
			type: 'enum',
			default: 'code',
			description: 'Screen mode',
			variants: variants(SCREEN_MODES),
			keyframable: false,
		},
		towerSide: {
			type: 'enum',
			default: 'right',
			description: 'PC tower side',
			variants: variants(TOWER_SIDES),
			keyframable: false,
		},
		accentColor: {type: 'color', default: PROP_COLORS.cyan, description: 'Accent color'},
		animated: {type: 'boolean', default: true, description: 'Animate screen'},
	},
});
