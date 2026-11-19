import React from 'react';
import {
	GroundShadow as SharedGroundShadow,
	Hand,
	Leg as SharedLeg,
	Neck as SharedNeck,
	Solid,
	Tube as SharedTube,
	computeTorsoGeometry,
	type BodyPalette,
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
	sole: K.sole,
	ground: K.ground,
};

/** A limb drawn as an outlined tube. */
export const Tube: React.FC<{
	readonly p: readonly P2[];
	readonly w: number;
	readonly color: string;
}> = ({p, w, color}) => <SharedTube p={p} w={w} color={color} outline={K.outline} />;

/** Arm with a short t-shirt sleeve. */
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
	const nx = -uy;
	const ny = ux;
	const end: P2 = [s[0] + dx * 0.46, s[1] + dy * 0.46];
	const w0 = 30;
	const w1 = 33;
	const sleeve = `M ${s[0] + nx * w0} ${s[1] + ny * w0} L ${end[0] + nx * w1} ${end[1] + ny * w1} L ${
		end[0] - nx * w1
	} ${end[1] - ny * w1} L ${s[0] - nx * w0} ${s[1] - ny * w0} A ${w0} ${w0} 0 0 0 ${s[0] + nx * w0} ${
		s[1] + ny * w0
	} Z`;
	const fx = w[0] - e[0];
	const fy = w[1] - e[1];
	const angle = (Math.hypot(fx, fy) > 4 ? Math.atan2(fy, fx) : Math.atan2(uy, ux)) / D2R - 90 + handRoll;
	const handEl = (
		<Hand at={w} angle={angle} mirror={mirror} shape={hand} skin={K.skin} outline={K.outline} scale={1.4} />
	);
	return (
		<g>
			<Tube p={[s, e, w]} w={RIG.armW} color={K.skin} />
			{handFront ? null : handEl}
			<Solid d={sleeve} fill={K.shirt} outline={K.outline} />
			<line
				x1={end[0] - ux * 7 + nx * (w1 - 3)}
				y1={end[1] - uy * 7 + ny * (w1 - 3)}
				x2={end[0] - ux * 7 - nx * (w1 - 3)}
				y2={end[1] - uy * 7 - ny * (w1 - 3)}
				stroke={K.shirtShade}
				strokeWidth={5}
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
	[-410, 70, 58, 0],
	[-386, 112, 78, 2],
	[-335, 110, 84, 6],
	[-262, 104, 80, 3],
	[-188, 110, 82, 0],
];

/** T-shirt torso built from cross-sections, turning cleanly with yaw. */
export const Torso: React.FC<{
	readonly yaw: number;
	readonly shrug: number;
	readonly uid: string;
}> = ({yaw, shrug, uid}) => {
	const {d, c} = computeTorsoGeometry(TORSO, yaw, shrug);
	const clip = `${uid}-torso`;
	return (
		<g>
			<clipPath id={clip}>
				<path d={d} />
			</clipPath>
			<path d={d} fill={K.shirtShade} stroke={K.outline} strokeWidth={OW * 2} strokeLinejoin="round" />
			<g clipPath={`url(#${clip})`}>
				<path d={d} fill={K.shirt} transform="translate(-16 -10)" />
				<ellipse cx={0} cy={-390 - shrug} rx={115} ry={34} fill={K.shirtShade} />
				{c > 0.2 ? (
					<path
						d={`M ${-50 * c} ${-404 - shrug} Q 0 ${-366 - shrug} ${50 * c} ${-404 - shrug}`}
						fill="none"
						stroke={K.outline}
						strokeWidth={4.5}
						strokeLinecap="round"
					/>
				) : null}
			</g>
		</g>
	);
};

export const Neck: React.FC = () => <SharedNeck fill={K.skin} outline={K.outline} />;

export const GroundShadow: React.FC<{readonly lift: number}> = ({lift}) => (
	<SharedGroundShadow lift={lift} color={K.ground} />
);
