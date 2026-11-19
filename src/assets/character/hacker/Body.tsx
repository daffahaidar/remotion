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
	<SleeveArm {...props} rig={RIG} outline={K.outline} skin={K.skin} sleeveColor={K.shirt} cuffColor={K.matrix} />
);

export const Leg: React.FC<{
	readonly h: P2;
	readonly k: P2;
	readonly a: P2;
	readonly yaw: number;
	readonly pitch: number;
	readonly side: 1 | -1;
	readonly uid: string;
}> = (props) => <SharedLeg {...props} rig={RIG} palette={BODY_PALETTE} cargoSeam />;

const TORSO: readonly TorsoSection[] = [
	[-410, 72, 60, 0],
	[-386, 114, 82, 2],
	[-335, 110, 86, 6],
	[-262, 106, 82, 3],
	[-186, 110, 84, 0],
];

/** Obsidian stealth hoodie with glowing matrix-green drawstrings, kangaroo pocket, and `01` cyber badge. */
export const Torso: React.FC<{
	readonly yaw: number;
	readonly shrug: number;
	readonly uid: string;
	readonly showBadge?: boolean;
}> = ({yaw, shrug, uid, showBadge = true}) => {
	const {d, c, sn, chestFrontX} = computeTorsoGeometry(TORSO, yaw, shrug);
	const clip = `${uid}-torso`;
	const frontX = 68 * sn;
	const pocketX = 72 * sn;

	return (
		<g>
			<clipPath id={clip}>
				<path d={d} />
			</clipPath>
			<path d={d} fill={K.shirtShade} stroke={K.outline} strokeWidth={OW * 2} strokeLinejoin="round" />
			<g clipPath={`url(#${clip})`}>
				<path d={d} fill={K.shirt} transform="translate(-16 -10)" />
				<ellipse cx={0} cy={-392 - shrug} rx={118} ry={34} fill={K.shirtShade} />

				<rect x={-140} y={-206} width={280} height={26} fill={K.shirtShade} />
				<line x1={-140} y1={-206} x2={140} y2={-206} stroke={K.outline} strokeWidth={4} />

				{/* Kangaroo pocket */}
				{c > 0.16 ? (
					<path
						d={`M ${pocketX - 62 * c} -206 L ${pocketX - 46 * c} -248 L ${pocketX + 46 * c} -248 L ${pocketX + 62 * c} -206 Z`}
						fill={K.pocket}
						stroke={K.outline}
						strokeWidth={4.5}
						strokeLinejoin="round"
					/>
				) : null}

				{/* Matrix-green drawstrings */}
				{c > 0.18 ? (
					<g transform={`translate(${frontX} 0) scale(${c} 1)`}>
						<path
							d={`M -52 ${-406 - shrug} Q 0 ${-364 - shrug} 52 ${-406 - shrug}`}
							fill="none"
							stroke={K.outline}
							strokeWidth={5.5}
							strokeLinecap="round"
						/>
						<path
							d={`M -18 ${-388 - shrug} L -18 ${-346 - shrug}`}
							fill="none"
							stroke={K.outline}
							strokeWidth={8}
							strokeLinecap="round"
						/>
						<path
							d={`M -18 ${-388 - shrug} L -18 ${-346 - shrug}`}
							fill="none"
							stroke={K.matrix}
							strokeWidth={4}
							strokeLinecap="round"
						/>
						<path
							d={`M 18 ${-388 - shrug} L 18 ${-346 - shrug}`}
							fill="none"
							stroke={K.outline}
							strokeWidth={8}
							strokeLinecap="round"
						/>
						<path
							d={`M 18 ${-388 - shrug} L 18 ${-346 - shrug}`}
							fill="none"
							stroke={K.matrix}
							strokeWidth={4}
							strokeLinecap="round"
						/>
					</g>
				) : null}
			</g>

			{/* Matrix `01` cyber lock/code emblem */}
			{showBadge && c > 0.2 ? (
				<g transform={`translate(${chestFrontX} ${-304 - shrug * 0.35}) scale(${c} 1)`}>
					<rect x={-36} y={-18} width={72} height={36} rx={10} fill={K.hoodShade} stroke={K.matrix} strokeWidth={3.5} />
					{/* Bold `0` */}
					<ellipse cx={-12} cy={0} rx={8} ry={10} fill="none" stroke={K.matrixGlow} strokeWidth={4.5} />
					{/* Bold `1` */}
					<path
						d="M 8 -7 L 14 -10 L 14 10 M 8 10 L 20 10"
						fill="none"
						stroke={K.matrixGlow}
						strokeWidth={4.5}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</g>
			) : null}
		</g>
	);
};

export const Neck: React.FC = () => <SharedNeck fill={K.hoodShade} outline={K.outline} halfW={32} />;

export const GroundShadow: React.FC<{readonly lift: number}> = ({lift}) => (
	<SharedGroundShadow lift={lift} color={K.ground} />
);
