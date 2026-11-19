import React from 'react';
import {
	GroundShadow as SharedGroundShadow,
	Leg as SharedLeg,
	Neck as SharedNeck,
	SleeveArm,
	computeTorsoGeometry,
	type BodyPalette,
	type ShoeSize,
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

const PM_SHOE_SIZE: ShoeSize = {radius: 21, heel: 17, toe: 56, width: 36};

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
		sleeveColor={K.shirt}
		cuffColor={K.shirtShade}
		sleeveRatio={0.48}
		watchColor={K.watchBand}
		watchFaceColor={K.watchFace}
		watchDotColor={K.scrunchie}
		handScale={1.34}
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
}> = (props) => <SharedLeg {...props} rig={RIG} palette={BODY_PALETTE} shoeSize={PM_SHOE_SIZE} />;

const TORSO: readonly TorsoSection[] = [
	[-410, 66, 54, 0],
	[-386, 104, 74, 2],
	[-335, 100, 78, 6],
	[-262, 96, 76, 3],
	[-184, 104, 78, 0],
];

/** Terracotta smart-casual blazer cardigan over cream turtleneck + office lanyard & ID badge. */
export const Torso: React.FC<{
	readonly yaw: number;
	readonly shrug: number;
	readonly uid: string;
	readonly showLanyard?: boolean;
}> = ({yaw, shrug, uid, showLanyard = true}) => {
	const {d, c, sn} = computeTorsoGeometry(TORSO, yaw, shrug);
	const clip = `${uid}-torso`;
	const frontX = 66 * sn;

	return (
		<g>
			<clipPath id={clip}>
				<path d={d} />
			</clipPath>
			<path d={d} fill={K.shirtShade} stroke={K.outline} strokeWidth={OW * 2} strokeLinejoin="round" />
			<g clipPath={`url(#${clip})`}>
				<path d={d} fill={K.shirt} transform="translate(-16 -10)" />
				<ellipse cx={0} cy={-392 - shrug} rx={114} ry={34} fill={K.shirtShade} />

				{c > 0.16 ? (
					<g transform={`translate(${frontX} 0) scale(${c} 1)`}>
						{/* Cream inner top panel & turtleneck */}
						<path
							d={`M -34 ${-410 - shrug} L 34 ${-410 - shrug} L 26 -180 L -26 -180 Z`}
							fill={K.innerTop}
							stroke={K.outline}
							strokeWidth={4.5}
						/>
						<rect
							x={-28}
							y={-416 - shrug}
							width={56}
							height={24}
							rx={8}
							fill={K.innerTopShade}
							stroke={K.outline}
							strokeWidth={4}
						/>
						{/* Cardigan lapels */}
						<path
							d={`M -34 ${-406 - shrug} L -50 ${-344 - shrug * 0.6} L -32 ${-320 - shrug * 0.5} Z`}
							fill={K.shirtShade}
							stroke={K.outline}
							strokeWidth={4}
							strokeLinejoin="round"
						/>
						<path
							d={`M 34 ${-406 - shrug} L 50 ${-344 - shrug * 0.6} L 32 ${-320 - shrug * 0.5} Z`}
							fill={K.shirtShade}
							stroke={K.outline}
							strokeWidth={4}
							strokeLinejoin="round"
						/>
					</g>
				) : null}
			</g>

			{/* Office lanyard + PM ID card */}
			{showLanyard && c > 0.18 ? (
				<g transform={`translate(${frontX} 0) scale(${c} 1)`}>
					<path
						d={`M -28 ${-406 - shrug} L 0 ${-304 - shrug * 0.35} L 28 ${-406 - shrug}`}
						fill="none"
						stroke={K.outline}
						strokeWidth={11}
						strokeLinejoin="round"
					/>
					<path
						d={`M -28 ${-406 - shrug} L 0 ${-304 - shrug * 0.35} L 28 ${-406 - shrug}`}
						fill="none"
						stroke={K.lanyard}
						strokeWidth={5.5}
						strokeLinejoin="round"
					/>
					<rect
						x={-20}
						y={-304 - shrug * 0.35}
						width={40}
						height={28}
						rx={6}
						fill={K.badgeCard}
						stroke={K.outline}
						strokeWidth={4}
					/>
					<rect x={-12} y={-296 - shrug * 0.35} width={24} height={6} rx={2} fill={K.lanyard} />
					<rect x={-12} y={-286 - shrug * 0.35} width={16} height={4} rx={2} fill={K.shirt} />
				</g>
			) : null}
		</g>
	);
};

export const Neck: React.FC = () => <SharedNeck fill={K.skin} outline={K.outline} halfW={24} />;

export const GroundShadow: React.FC<{readonly lift: number}> = ({lift}) => (
	<SharedGroundShadow lift={lift} color={K.ground} rx={160} />
);
