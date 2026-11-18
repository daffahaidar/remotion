import React from 'react';
import {
	GroundShadow as SharedGroundShadow,
	Hand,
	Leg as SharedLeg,
	Neck as SharedNeck,
	Tube,
	computeTorsoGeometry,
	type BodyPalette,
	type TorsoSection,
} from '../shared/body';
import {D2R, OW, RIG, lerp, type HandShape, type P2} from './rig';
import {COLORS as K} from './rig';

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

/** Pushed-up 3/4 crewneck sweater sleeve + forearm smartwatch on the left wrist. */
export const Arm: React.FC<{
	readonly s: P2;
	readonly e: P2;
	readonly w: P2;
	readonly hand: HandShape;
	readonly handRoll: number;
	readonly mirror: number;
	readonly handFront: boolean;
	readonly side: 1 | -1;
}> = ({s, e, w, hand, handRoll, mirror, handFront, side}) => {
	const dx = e[0] - s[0];
	const dy = e[1] - s[1];
	const l = Math.hypot(dx, dy);
	const ux = l > 0.5 ? dx / l : 0;
	const uy = l > 0.5 ? dy / l : 1;
	const fx = w[0] - e[0];
	const fy = w[1] - e[1];
	const fl = Math.hypot(fx, fy);
	const fux = fl > 0.5 ? fx / fl : ux;
	const fuy = fl > 0.5 ? fy / fl : uy;
	const fnx = -fuy;
	const fny = fux;

	// Pushed-up sweater sleeve stops at 42% down the forearm with a ribbed cuff.
	const sleeveEnd: P2 = [lerp(e[0], w[0], 0.42), lerp(e[1], w[1], 0.42)];
	const cuffW = (RIG.armW + 8) / 2;
	const angle =
		(fl > 4 ? Math.atan2(fy, fx) : Math.atan2(uy, ux)) / D2R - 90 + handRoll;

	// Sleek cyan smartwatch on the character's left wrist.
	const watchPos: P2 = [w[0] - fux * 16, w[1] - fuy * 16];
	const watchHalfW = RIG.armW / 2 + 2;

	const handEl = (
		<Hand at={w} angle={angle} mirror={mirror} shape={hand} skin={K.skin} outline={K.outline} />
	);

	return (
		<g>
			<Tube p={[s, e, w]} w={RIG.armW} color={K.skin} outline={K.outline} />
			{side === 1 ? (
				<g>
					<line
						x1={watchPos[0] + fnx * watchHalfW}
						y1={watchPos[1] + fny * watchHalfW}
						x2={watchPos[0] - fnx * watchHalfW}
						y2={watchPos[1] - fny * watchHalfW}
						stroke={K.outline}
						strokeWidth={14}
						strokeLinecap="round"
					/>
					<line
						x1={watchPos[0] + fnx * watchHalfW}
						y1={watchPos[1] + fny * watchHalfW}
						x2={watchPos[0] - fnx * watchHalfW}
						y2={watchPos[1] - fny * watchHalfW}
						stroke={K.watchBand}
						strokeWidth={7}
						strokeLinecap="round"
					/>
					<circle
						cx={watchPos[0]}
						cy={watchPos[1]}
						r={8}
						fill={K.watchFace}
						stroke={K.outline}
						strokeWidth={3.5}
					/>
					<circle cx={watchPos[0]} cy={watchPos[1]} r={2.5} fill={K.badgeAccent} />
				</g>
			) : null}
			{handFront ? null : handEl}
			<Tube p={[s, e, sleeveEnd]} w={RIG.armW + 8} color={K.shirt} outline={K.outline} />
			<line
				x1={sleeveEnd[0] + fnx * cuffW}
				y1={sleeveEnd[1] + fny * cuffW}
				x2={sleeveEnd[0] - fnx * cuffW}
				y2={sleeveEnd[1] - fny * cuffW}
				stroke={K.shirtShade}
				strokeWidth={8}
				strokeLinecap="round"
			/>
			<line
				x1={sleeveEnd[0] - fux * 6 + fnx * (cuffW - 2)}
				y1={sleeveEnd[1] - fuy * 6 + fny * (cuffW - 2)}
				x2={sleeveEnd[0] - fux * 6 - fnx * (cuffW - 2)}
				y2={sleeveEnd[1] - fuy * 6 - fny * (cuffW - 2)}
				stroke={K.outline}
				strokeWidth={3.5}
				strokeLinecap="round"
			/>
			{handFront ? handEl : null}
		</g>
	);
};

export const Leg: React.FC<{
	readonly h: P2;
	readonly k: P2;
	readonly a: P2;
	readonly yaw: number;
	readonly pitch: number;
	readonly side: 1 | -1;
	readonly uid: string;
}> = (props) => <SharedLeg {...props} rig={RIG} palette={BODY_PALETTE} />;

/** [y, half width, half depth, forward offset] */
const TORSO: readonly TorsoSection[] = [
	[-410, 68, 56, 0],
	[-386, 108, 76, 2],
	[-335, 106, 82, 6],
	[-262, 100, 78, 3],
	[-192, 106, 80, 0],
];

const INNER_HEM: readonly TorsoSection[] = [
	[-212, 102, 78, 1],
	[-176, 106, 80, 0],
];

/** Layered crewneck sweater over a crisp white undershirt + `</>` badge. */
export const Torso: React.FC<{
	readonly yaw: number;
	readonly shrug: number;
	readonly uid: string;
	readonly showBadge?: boolean;
}> = ({yaw, shrug, uid, showBadge = true}) => {
	const {d, c, chestFrontX} = computeTorsoGeometry(TORSO, yaw, shrug);
	const hemGeom = computeTorsoGeometry(INNER_HEM, yaw, 0);
	const clip = `${uid}-torso`;
	const hemClip = `${uid}-hem`;

	return (
		<g>
			{/* Crisp white layered tee hem peeking below the sweater */}
			<clipPath id={hemClip}>
				<path d={hemGeom.d} />
			</clipPath>
			<path d={hemGeom.d} fill={K.innerTeeShade} stroke={K.outline} strokeWidth={OW * 2} strokeLinejoin="round" />
			<g clipPath={`url(#${hemClip})`}>
				<path d={hemGeom.d} fill={K.innerTee} transform="translate(-14 -6)" />
			</g>

			{/* Main indigo crewneck sweater */}
			<clipPath id={clip}>
				<path d={d} />
			</clipPath>
			<path d={d} fill={K.shirtShade} stroke={K.outline} strokeWidth={OW * 2} strokeLinejoin="round" />
			<g clipPath={`url(#${clip})`}>
				<path d={d} fill={K.shirt} transform="translate(-16 -10)" />
				<ellipse cx={0} cy={-390 - shrug} rx={115} ry={34} fill={K.shirtShade} />

				{/* Ribbed bottom waistband */}
				<rect x={-140} y={-206} width={280} height={24} fill={K.shirtShade} />
				<line x1={-140} y1={-206} x2={140} y2={-206} stroke={K.outline} strokeWidth={4} />

				{/* White undershirt collar + sweater neckline */}
				{c > 0.15 ? (
					<>
						<path
							d={`M ${-48 * c} ${-406 - shrug} Q 0 ${-360 - shrug} ${48 * c} ${-406 - shrug} L ${42 * c} ${-418 - shrug} L ${-42 * c} ${-418 - shrug} Z`}
							fill={K.innerTee}
							stroke={K.outline}
							strokeWidth={4.5}
							strokeLinejoin="round"
						/>
						<path
							d={`M ${-56 * c} ${-400 - shrug} Q 0 ${-352 - shrug} ${56 * c} ${-400 - shrug}`}
							fill="none"
							stroke={K.outline}
							strokeWidth={4.5}
							strokeLinecap="round"
						/>
					</>
				) : null}
			</g>

			{/* Frontend `</>` chest emblem */}
			{showBadge && c > 0.2 ? (
				<g transform={`translate(${chestFrontX} ${-314 - shrug * 0.35}) scale(${c} 1)`}>
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
					<path
						d="M -13 -8 L -25 0 L -13 8"
						fill="none"
						stroke={K.badgeAccent}
						strokeWidth={5.5}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M 4 -10 L -4 10"
						fill="none"
						stroke={K.badgeCoral}
						strokeWidth={5}
						strokeLinecap="round"
					/>
					<path
						d="M 13 -8 L 25 0 L 13 8"
						fill="none"
						stroke={K.badgeAccent}
						strokeWidth={5.5}
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
