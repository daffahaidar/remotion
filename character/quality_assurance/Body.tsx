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

const QA_SHOE_SIZE: ShoeSize = {radius: 21, heel: 17, toe: 56, width: 36};

/** Crisp white collared shirt sleeves rolled 3/4 below mustard vest. */
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
		sleeveColor={K.innerShirt}
		cuffColor={K.innerShirtShade}
		sleeveRatio={0.46}
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
}> = (props) => <SharedLeg {...props} rig={RIG} palette={BODY_PALETTE} shoeSize={QA_SHOE_SIZE} />;

const TORSO: readonly TorsoSection[] = [
	[-410, 66, 54, 0],
	[-386, 104, 74, 2],
	[-335, 100, 78, 6],
	[-262, 96, 76, 3],
	[-184, 104, 78, 0],
];

/** Mustard utility vest layered over a crisp white collared shirt + QA Bug/Check badge. */
export const Torso: React.FC<{
	readonly yaw: number;
	readonly shrug: number;
	readonly uid: string;
	readonly showBadge?: boolean;
}> = ({yaw, shrug, uid, showBadge = true}) => {
	const {d, c, sn, chestFrontX} = computeTorsoGeometry(TORSO, yaw, shrug);
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

				{/* Ribbed vest bottom trim */}
				<rect x={-130} y={-204} width={260} height={24} fill={K.shirtShade} />
				<line x1={-130} y1={-204} x2={130} y2={-204} stroke={K.outline} strokeWidth={4} />

				{/* White collared shirt V-neck peeking out at top */}
				{c > 0.16 ? (
					<g transform={`translate(${frontX} 0) scale(${c} 1)`}>
						<path
							d={`M -42 ${-410 - shrug} L 42 ${-410 - shrug} L 0 ${-360 - shrug} Z`}
							fill={K.innerShirt}
							stroke={K.outline}
							strokeWidth={4.5}
							strokeLinejoin="round"
						/>
						<path
							d={`M -36 ${-406 - shrug} L -16 ${-382 - shrug} L 0 ${-398 - shrug} L 16 ${-382 - shrug} L 36 ${-406 - shrug}`}
							fill="none"
							stroke={K.outline}
							strokeWidth={4}
							strokeLinejoin="round"
						/>
					</g>
				) : null}
			</g>

			{/* QA Bug & Checkmark badge */}
			{showBadge && c > 0.2 ? (
				<g transform={`translate(${chestFrontX} ${-308 - shrug * 0.35}) scale(${c} 1)`}>
					<rect
						x={-38}
						y={-19}
						width={76}
						height={38}
						rx={12}
						fill={K.badgeBg}
						stroke={K.outline}
						strokeWidth={4.5}
					/>
					{/* Tiny stylized bug */}
					<circle cx={-16} cy={2} r={8} fill={K.bugRed} />
					<circle cx={-16} cy={-7} r={4.5} fill={K.bugRed} />
					<line x1={-26} y1={-1} x2={-6} y2={-1} stroke={K.badgeBg} strokeWidth={2.5} />
					{/* Crisp emerald check */}
					<path
						d="M 4 2 L 12 10 L 25 -8"
						fill="none"
						stroke={K.checkGreen}
						strokeWidth={5.5}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</g>
			) : null}
		</g>
	);
};

export const Neck: React.FC = () => <SharedNeck fill={K.skin} outline={K.outline} halfW={24} />;

export const GroundShadow: React.FC<{readonly lift: number}> = ({lift}) => (
	<SharedGroundShadow lift={lift} color={K.ground} rx={160} />
);
