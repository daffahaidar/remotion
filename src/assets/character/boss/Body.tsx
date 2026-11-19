import React from 'react';
import {
	GroundShadow as SharedGroundShadow,
	Hand,
	Leg as SharedLeg,
	Neck as SharedNeck,
	Tube,
	computeTorsoGeometry,
	type BodyPalette,
	type ShoeSize,
	type TorsoSection,
} from '../shared/body';
import {COLORS as K, D2R, OW, RIG, type HandShape, type P2} from './rig';

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

const DRESS_SHOE_SIZE: ShoeSize = {radius: 19, heel: 18, toe: 62, width: 37};

/** Tailored suit blazer sleeve with peeking white shirt cuff and gold executive watch. */
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

	const shirtCuff: P2 = [w[0] - fux * 6, w[1] - fuy * 6];
	const jacketEnd: P2 = [w[0] - fux * 16, w[1] - fuy * 16];
	const watchPos: P2 = [w[0] - fux * 10, w[1] - fuy * 10];
	const cuffW = RIG.armW / 2 + 2;
	const angle =
		(fl > 4 ? Math.atan2(fy, fx) : Math.atan2(uy, ux)) / D2R - 90 + handRoll;

	const handEl = (
		<Hand at={w} angle={angle} mirror={mirror} shape={hand} skin={K.skin} outline={K.outline} scale={1.4} />
	);

	return (
		<g>
			{handFront ? null : handEl}
			{/* Crisp white dress-shirt cuff peeking at the wrist */}
			<Tube p={[jacketEnd, shirtCuff]} w={RIG.armW - 2} color={K.innerShirt} outline={K.outline} />
			{side === 1 ? (
				<line
					x1={watchPos[0] + fnx * (cuffW - 4)}
					y1={watchPos[1] + fny * (cuffW - 4)}
					x2={watchPos[0] - fnx * (cuffW - 4)}
					y2={watchPos[1] - fny * (cuffW - 4)}
					stroke={K.gold}
					strokeWidth={7}
					strokeLinecap="round"
				/>
			) : null}
			{/* Tailored suit jacket sleeve */}
			<Tube p={[s, e, jacketEnd]} w={RIG.armW + 6} color={K.shirt} outline={K.outline} />
			<line
				x1={jacketEnd[0] - fux * 6 + fnx * cuffW}
				y1={jacketEnd[1] - fuy * 6 + fny * cuffW}
				x2={jacketEnd[0] - fux * 6 - fnx * cuffW}
				y2={jacketEnd[1] - fuy * 6 - fny * cuffW}
				stroke={K.shirtShade}
				strokeWidth={4}
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
}> = (props) => (
	<SharedLeg {...props} rig={RIG} palette={BODY_PALETTE} shoeSize={DRESS_SHOE_SIZE} dressShoe />
);

/** Broad executive shoulders tapering down to tailored suit hem. */
const TORSO: readonly TorsoSection[] = [
	[-410, 76, 64, 0],
	[-386, 124, 88, 2],
	[-335, 120, 92, 6],
	[-262, 110, 86, 3],
	[-184, 114, 86, 0],
];

/** Executive suit blazer with lapels, white dress shirt V-neck, crimson power tie, and gold pocket square. */
export const Torso: React.FC<{
	readonly yaw: number;
	readonly shrug: number;
	readonly uid: string;
}> = ({yaw, shrug, uid}) => {
	const {d, c, sn, chestFrontX} = computeTorsoGeometry(TORSO, yaw, shrug);
	const clip = `${uid}-torso`;
	const frontX = 72 * sn;
	const backX = -68 * sn;

	return (
		<g>
			<clipPath id={clip}>
				<path d={d} />
			</clipPath>
			<path d={d} fill={K.shirtShade} stroke={K.outline} strokeWidth={OW * 2} strokeLinejoin="round" />
			<g clipPath={`url(#${clip})`}>
				<path d={d} fill={K.shirt} transform="translate(-16 -10)" />
				<ellipse cx={0} cy={-392 - shrug} rx={126} ry={34} fill={K.shirtShade} />

				{/* Back blazer vent seam */}
				{c < -0.2 ? (
					<line
						x1={backX}
						y1={-370}
						x2={backX}
						y2={-184}
						stroke={K.shirtShade}
						strokeWidth={5}
						strokeLinecap="round"
					/>
				) : null}

				{/* Front dress shirt V-opening, lapels, power tie, pocket square & buttons */}
				{c > 0.16 ? (
					<g transform={`translate(${frontX} 0) scale(${c} 1)`}>
						{/* White dress shirt V */}
						<path
							d={`M -44 ${-410 - shrug} L 44 ${-410 - shrug} L 0 ${-284 - shrug * 0.35} Z`}
							fill={K.innerShirt}
							stroke={K.outline}
							strokeWidth={4.5}
							strokeLinejoin="round"
						/>
						{/* Bold crimson power tie + gold tie bar */}
						<path
							d={`M -12 ${-406 - shrug} L 12 ${-406 - shrug} L 7 ${-384 - shrug} L -7 ${-384 - shrug} Z`}
							fill={K.tieShade}
							stroke={K.outline}
							strokeWidth={4}
							strokeLinejoin="round"
						/>
						<path
							d={`M -7 ${-384 - shrug} L 7 ${-384 - shrug} L 13 ${-312 - shrug * 0.45} L 0 ${-286 - shrug * 0.35} L -13 ${-312 - shrug * 0.45} Z`}
							fill={K.tie}
							stroke={K.outline}
							strokeWidth={4}
							strokeLinejoin="round"
						/>
						<line
							x1={-10}
							y1={-344 - shrug * 0.6}
							x2={10}
							y2={-344 - shrug * 0.6}
							stroke={K.gold}
							strokeWidth={5}
							strokeLinecap="round"
						/>
						{/* Tailored suit lapels */}
						<path
							d={`M -44 ${-406 - shrug} L -60 ${-360 - shrug * 0.7} L -36 ${-344 - shrug * 0.6} L -52 ${-328 - shrug * 0.5} L 0 ${-284 - shrug * 0.35} Z`}
							fill={K.lapel}
							stroke={K.outline}
							strokeWidth={4.5}
							strokeLinejoin="round"
						/>
						<path
							d={`M 44 ${-406 - shrug} L 60 ${-360 - shrug * 0.7} L 36 ${-344 - shrug * 0.6} L 52 ${-328 - shrug * 0.5} L 0 ${-284 - shrug * 0.35} Z`}
							fill={K.lapel}
							stroke={K.outline}
							strokeWidth={4.5}
							strokeLinejoin="round"
						/>
						{/* Suit buttons */}
						<circle cx={0} cy={-260} r={5.5} fill={K.shirtShade} stroke={K.outline} strokeWidth={3} />
						<circle cx={0} cy={-230} r={5.5} fill={K.shirtShade} stroke={K.outline} strokeWidth={3} />
					</g>
				) : null}
			</g>

			{/* Gold pocket square on the character's left breast */}
			{c > 0.2 ? (
				<g transform={`translate(${chestFrontX + 46 * c} ${-326 - shrug * 0.45}) scale(${c} 1)`}>
					<path
						d="M -16 4 L -10 -12 L 0 -5 L 11 -13 L 17 4 Z"
						fill={K.gold}
						stroke={K.outline}
						strokeWidth={3.5}
						strokeLinejoin="round"
					/>
					<line x1={-18} y1={5} x2={18} y2={5} stroke={K.outline} strokeWidth={4.5} strokeLinecap="round" />
				</g>
			) : null}
		</g>
	);
};

export const Neck: React.FC = () => <SharedNeck fill={K.skin} outline={K.outline} halfW={29} />;

export const GroundShadow: React.FC<{readonly lift: number}> = ({lift}) => (
	<SharedGroundShadow lift={lift} color={K.ground} rx={176} />
);
