import React from 'react';
import {
	GroundShadow as SharedGroundShadow,
	Leg as SharedLeg,
	Neck as SharedNeck,
	SleeveArm,
	computeTorsoGeometry,
	type BodyPalette,
	type TorsoSection,
} from '../shared/body';
import {COLORS as K, OW, RIG, type HandShape, type P2} from './rig';

const BODY_PALETTE: BodyPalette = {
	outline: K.outline,
	skin: K.skin,
	shirt: K.shirt,
	shirtShade: K.shirtShade,
	pants: K.pants,
	cuff: K.cuff,
	shoe: K.shoe,
	shoeAccent: K.shoeAccent,
	sole: K.sole,
	ground: K.ground,
};

/** Dual-tone raglan sleeves: Frontend cyan on left arm, Backend emerald on right arm. */
export const Arm: React.FC<{
	readonly s: P2;
	readonly e: P2;
	readonly w: P2;
	readonly hand: HandShape;
	readonly handRoll: number;
	readonly mirror: number;
	readonly handFront: boolean;
	readonly side: 1 | -1;
}> = (props) => (
	<SleeveArm
		{...props}
		rig={RIG}
		outline={K.outline}
		skin={K.skin}
		sleeveColor={props.side === 1 ? K.sleeveCyan : K.sleeveEmerald}
		cuffColor={props.side === 1 ? K.sleeveCyanShade : K.sleeveEmeraldShade}
		sleeveRatio={0.5}
	/>
);

export const Leg: React.FC<{
	readonly h: P2;
	readonly k: P2;
	readonly a: P2;
	readonly yaw: number;
	readonly pitch: number;
	readonly side: 1 | -1;
	readonly uid: string;
}> = (props) => <SharedLeg {...props} rig={RIG} palette={BODY_PALETTE} />;

const TORSO: readonly TorsoSection[] = [
	[-410, 70, 58, 0],
	[-386, 112, 78, 2],
	[-335, 110, 84, 6],
	[-262, 104, 80, 3],
	[-186, 110, 82, 0],
];

/** Dual-tone zip tech jacket with `{</>}` Fullstack chest emblem. */
export const Torso: React.FC<{
	readonly yaw: number;
	readonly shrug: number;
	readonly uid: string;
	readonly showBadge?: boolean;
}> = ({yaw, shrug, uid, showBadge = true}) => {
	const {d, c, sn, chestFrontX} = computeTorsoGeometry(TORSO, yaw, shrug);
	const clip = `${uid}-torso`;
	const frontX = 68 * sn;

	return (
		<g>
			<clipPath id={clip}>
				<path d={d} />
			</clipPath>
			<path d={d} fill={K.shirtShade} stroke={K.outline} strokeWidth={OW * 2} strokeLinejoin="round" />
			<g clipPath={`url(#${clip})`}>
				<path d={d} fill={K.shirt} transform="translate(-16 -10)" />
				<ellipse cx={0} cy={-392 - shrug} rx={116} ry={34} fill={K.shirtShade} />

				{/* Subtle zip seam & dual-tone collar */}
				{c > 0.16 ? (
					<g transform={`translate(${frontX} 0) scale(${c} 1)`}>
						<line x1={0} y1={-392 - shrug} x2={0} y2={-186} stroke={K.outline} strokeWidth={4} />
						<path
							d={`M -48 ${-406 - shrug} Q 0 ${-364 - shrug} ${48} ${-406 - shrug}`}
							fill="none"
							stroke={K.sleeveCyan}
							strokeWidth={6}
							strokeLinecap="round"
						/>
					</g>
				) : null}
			</g>

			{/* Fullstack `{</>}` split emblem */}
			{showBadge && c > 0.2 ? (
				<g transform={`translate(${chestFrontX} ${-312 - shrug * 0.35}) scale(${c} 1)`}>
					<rect
						x={-40}
						y={-19}
						width={80}
						height={38}
						rx={12}
						fill={K.badgeBg}
						stroke={K.outline}
						strokeWidth={4.5}
					/>
					<path
						d="M -22 -8 L -28 -8 L -30 0 L -28 8 L -22 8"
						fill="none"
						stroke={K.badgeEmerald}
						strokeWidth={4.5}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M -10 -7 L -18 0 L -10 7"
						fill="none"
						stroke={K.badgeCyan}
						strokeWidth={4.5}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M 10 -7 L 18 0 L 10 7"
						fill="none"
						stroke={K.badgeCyan}
						strokeWidth={4.5}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M 22 -8 L 28 -8 L 30 0 L 28 8 L 22 8"
						fill="none"
						stroke={K.badgeEmerald}
						strokeWidth={4.5}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</g>
			) : null}
		</g>
	);
};

export const Neck: React.FC = () => <SharedNeck fill={K.skin} outline={K.outline} />;

export const GroundShadow: React.FC<{readonly lift: number}> = ({lift}) => (
	<SharedGroundShadow lift={lift} color={K.ground} />
);
