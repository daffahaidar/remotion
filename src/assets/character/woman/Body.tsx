import React from 'react';
import {
	GroundShadow as SharedGroundShadow,
	Hand,
	Leg as SharedLeg,
	Solid,
	Tube as SharedTube,
	computeTorsoGeometry,
	type BodyPalette,
	type ShoeSize,
	type TorsoSection,
} from '../shared/body';
import {COLORS as K, D2R, OW, RIG, smoothPath, type HandShape, type P2} from './rig';

const BODY_PALETTE: BodyPalette = {
	outline: K.outline,
	skin: K.skin,
	shirt: K.shirt,
	shirtShade: K.shirtShade,
	pants: K.pants,
	cuff: K.cuff,
	shoe: K.shoe,
	sole: K.sole,
	ground: K.ground,
};

const WOMAN_SHOE_SIZE: ShoeSize = {radius: 21, heel: 17, toe: 56, width: 36};

/** A limb drawn as an outlined tube. */
export const Tube: React.FC<{
	readonly p: readonly P2[];
	readonly w: number;
	readonly color: string;
}> = ({p, w, color}) => <SharedTube p={p} w={w} color={color} outline={K.outline} />;

/** Arm with a full-length modest tunic sleeve and wrist cuff. */
export const Arm: React.FC<{
	readonly s: P2;
	readonly e: P2;
	readonly w: P2;
	readonly hand: HandShape;
	readonly handRoll: number;
	readonly mirror: number;
	/** Draw the hand above the sleeve (arm pointing at the camera). */
	readonly handFront: boolean;
}> = ({s, e, w, hand, handRoll, mirror, handFront}) => {
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
	const sleeveEnd: P2 = [w[0] - fux * 6, w[1] - fuy * 6];
	const cuffStart: P2 = [w[0] - fux * 18, w[1] - fuy * 18];
	const cw = RIG.armW / 2 + 2;
	const angle = (fl > 4 ? Math.atan2(fy, fx) : Math.atan2(uy, ux)) / D2R - 90 + handRoll;
	const handEl = (
		<Hand at={w} angle={angle} mirror={mirror} shape={hand} skin={K.skin} outline={K.outline} scale={1.32} />
	);
	return (
		<g>
			{handFront ? null : handEl}
			<Tube p={[s, e, sleeveEnd]} w={RIG.armW + 4} color={K.shirt} />
			<line
				x1={cuffStart[0] + fnx * cw}
				y1={cuffStart[1] + fny * cw}
				x2={cuffStart[0] - fnx * cw}
				y2={cuffStart[1] - fny * cw}
				stroke={K.shirtShade}
				strokeWidth={5}
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
}> = (props) => <SharedLeg {...props} rig={RIG} palette={BODY_PALETTE} shoeSize={WOMAN_SHOE_SIZE} />;

/** [y, half width, half depth, forward offset] */
const TORSO: readonly TorsoSection[] = [
	[-410, 66, 54, 0],
	[-386, 102, 74, 2],
	[-335, 98, 80, 6],
	[-262, 98, 78, 4],
	[-174, 114, 84, 0],
];

/** Modest A-line tunic + hijab chest drape with brooch. */
export const Torso: React.FC<{
	readonly yaw: number;
	readonly shrug: number;
	readonly uid: string;
}> = ({yaw, shrug, uid}) => {
	const {d, c, sn} = computeTorsoGeometry(TORSO, yaw, shrug);
	const clip = `${uid}-torso`;

	// Hijab chest/shoulder drape sitting over the top of the tunic
	const dw = Math.sqrt((108 * c) ** 2 + (84 * sn) ** 2);
	const dcx = 6 * sn;
	const dy0 = -418 - shrug;
	const dyMid = -362 - shrug * 0.8;
	const dyBot = -304 - shrug * 0.5 + (c > 0 ? 10 * c : -8);
	const drapePts: P2[] = [
		[dcx, dy0 - 8],
		[dcx + dw * 0.72, dy0 + 6],
		[dcx + dw, dyMid],
		[dcx + dw * 0.58, dyBot - 10],
		[dcx, dyBot],
		[dcx - dw * 0.58, dyBot - 10],
		[dcx - dw, dyMid],
		[dcx - dw * 0.72, dy0 + 6],
	];
	const drapeD = smoothPath(drapePts);
	const drapeClip = `${uid}-drape`;

	return (
		<g>
			<clipPath id={clip}>
				<path d={d} />
			</clipPath>
			<path d={d} fill={K.shirtShade} stroke={K.outline} strokeWidth={OW * 2} strokeLinejoin="round" />
			<g clipPath={`url(#${clip})`}>
				<path d={d} fill={K.shirt} transform="translate(-16 -10)" />
				<ellipse cx={0} cy={-385 - shrug} rx={115} ry={42} fill={K.shirtShade} />
			</g>

			{/* Hijab shoulder & chest drape */}
			<clipPath id={drapeClip}>
				<path d={drapeD} />
			</clipPath>
			<path d={drapeD} fill={K.hijabShade} stroke={K.outline} strokeWidth={OW * 2} strokeLinejoin="round" />
			<g clipPath={`url(#${drapeClip})`}>
				<path d={drapeD} fill={K.hijab} transform="translate(-12 -8)" />
				<path
					d={`M ${dcx - dw * 0.65} ${dyMid - 8} Q ${dcx + 6 * c} ${dyBot - 18} ${dcx + dw * 0.72} ${dyMid - 14}`}
					fill="none"
					stroke={K.hijabShade}
					strokeWidth={5.5}
					strokeLinecap="round"
				/>
				<path
					d={`M ${dcx - dw * 0.42} ${dy0 + 18} Q ${dcx + 12 * c} ${dyMid + 14} ${dcx + dw * 0.52} ${dy0 + 22}`}
					fill="none"
					stroke={K.hijabShade}
					strokeWidth={4.5}
					strokeLinecap="round"
				/>
				{c > 0.15 ? (
					<circle cx={dcx + 42 * c} cy={dyMid + 8} r={8} fill={K.brooch} stroke={K.outline} strokeWidth={3.5} />
				) : null}
			</g>
		</g>
	);
};

export const Neck: React.FC = () => (
	<Solid d="M -38 -465 L 38 -465 L 44 -395 L -44 -395 Z" fill={K.hijabShade} outline={K.outline} />
);

export const GroundShadow: React.FC<{readonly lift: number}> = ({lift}) => (
	<SharedGroundShadow lift={lift} color={K.ground} rx={160} />
);
