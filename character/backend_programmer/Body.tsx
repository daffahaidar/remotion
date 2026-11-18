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
import {COLORS as K, D2R, OW, RIG, smoothPath, type HandShape, type P2} from './rig';

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

/** Full-length cozy hoodie sleeve with ribbed cuff. */
export const Arm: React.FC<{
	readonly s: P2;
	readonly e: P2;
	readonly w: P2;
	readonly hand: HandShape;
	readonly handRoll: number;
	readonly mirror: number;
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
	const sleeveEnd: P2 = [w[0] - fux * 8, w[1] - fuy * 8];
	const cuffStart: P2 = [w[0] - fux * 20, w[1] - fuy * 20];
	const cw = RIG.armW / 2 + 4;
	const angle =
		(fl > 4 ? Math.atan2(fy, fx) : Math.atan2(uy, ux)) / D2R - 90 + handRoll;

	const handEl = (
		<Hand at={w} angle={angle} mirror={mirror} shape={hand} skin={K.skin} outline={K.outline} />
	);

	return (
		<g>
			{handFront ? null : handEl}
			<Tube p={[s, e, sleeveEnd]} w={RIG.armW + 6} color={K.shirt} outline={K.outline} />
			<line
				x1={cuffStart[0] + fnx * cw}
				y1={cuffStart[1] + fny * cw}
				x2={cuffStart[0] - fnx * cw}
				y2={cuffStart[1] - fny * cw}
				stroke={K.shirtShade}
				strokeWidth={8}
				strokeLinecap="round"
			/>
			<line
				x1={cuffStart[0] - fux * 6 + fnx * (cw - 2)}
				y1={cuffStart[1] - fuy * 6 + fny * (cw - 2)}
				x2={cuffStart[0] - fux * 6 - fnx * (cw - 2)}
				y2={cuffStart[1] - fuy * 6 - fny * (cw - 2)}
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
}> = (props) => <SharedLeg {...props} rig={RIG} palette={BODY_PALETTE} cargoSeam />;

/** [y, half width, half depth, forward offset] */
const TORSO: readonly TorsoSection[] = [
	[-410, 74, 62, 0],
	[-386, 118, 84, 2],
	[-335, 114, 88, 6],
	[-262, 110, 84, 3],
	[-188, 114, 86, 0],
];

/** Dark-mode hoodie with 3D folded back hood, drawstrings, kangaroo pocket, and `>_` badge. */
export const Torso: React.FC<{
	readonly yaw: number;
	readonly shrug: number;
	readonly uid: string;
	readonly showBadge?: boolean;
}> = ({yaw, shrug, uid, showBadge = true}) => {
	const {d, c, sn, chestFrontX} = computeTorsoGeometry(TORSO, yaw, shrug);
	const clip = `${uid}-torso`;

	// 3D folded back hood sitting behind the collar and draping onto upper back.
	const hoodCenterX = -72 * sn;
	const hoodHalfW = Math.sqrt((82 * c) ** 2 + (54 * sn) ** 2);
	const hoodTopY = -434 - shrug;
	const hoodBotY = -324 - shrug * 0.5;
	const hoodPts: P2[] = [
		[hoodCenterX, hoodTopY],
		[hoodCenterX + hoodHalfW * 0.85, hoodTopY + 24],
		[hoodCenterX + hoodHalfW, hoodBotY - 28],
		[hoodCenterX + hoodHalfW * 0.52, hoodBotY],
		[hoodCenterX, hoodBotY + 8],
		[hoodCenterX - hoodHalfW * 0.52, hoodBotY],
		[hoodCenterX - hoodHalfW, hoodBotY - 28],
		[hoodCenterX - hoodHalfW * 0.85, hoodTopY + 24],
	];
	const hoodD = smoothPath(hoodPts);
	const hoodInFront = c < 0.28;

	const backHoodEl = (
		<g>
			<path d={hoodD} fill={K.hoodShade} stroke={K.outline} strokeWidth={OW * 2} strokeLinejoin="round" />
			<path
				d={`M ${hoodCenterX - hoodHalfW * 0.6} ${hoodBotY - 32} Q ${hoodCenterX} ${hoodBotY - 10} ${hoodCenterX + hoodHalfW * 0.6} ${hoodBotY - 32}`}
				fill="none"
				stroke={K.shirt}
				strokeWidth={5}
				strokeLinecap="round"
			/>
		</g>
	);

	// Front collar cowl + drawstrings + kangaroo pocket
	const collarX = 42 * sn;
	const pocketX = 76 * sn;

	return (
		<g>
			{hoodInFront ? null : backHoodEl}

			<clipPath id={clip}>
				<path d={d} />
			</clipPath>
			<path d={d} fill={K.shirtShade} stroke={K.outline} strokeWidth={OW * 2} strokeLinejoin="round" />
			<g clipPath={`url(#${clip})`}>
				<path d={d} fill={K.shirt} transform="translate(-16 -10)" />
				<ellipse cx={0} cy={-392 - shrug} rx={122} ry={36} fill={K.shirtShade} />

				{/* Ribbed hoodie waistband */}
				<rect x={-145} y={-206} width={290} height={26} fill={K.shirtShade} />
				<line x1={-145} y1={-206} x2={145} y2={-206} stroke={K.outline} strokeWidth={4} />

				{/* Kangaroo pocket */}
				{c > 0.16 ? (
					<path
						d={`M ${pocketX - 66 * c} ${-206} L ${pocketX - 50 * c} ${-248} L ${pocketX + 50 * c} ${-248} L ${pocketX + 66 * c} ${-206} Z`}
						fill={K.pocket}
						stroke={K.outline}
						strokeWidth={4.5}
						strokeLinejoin="round"
					/>
				) : null}

				{/* Front hoodie collar & drawstrings */}
				{c > 0.18 ? (
					<>
						<path
							d={`M ${collarX - 56 * c} ${-406 - shrug} Q ${collarX} ${-364 - shrug} ${collarX + 56 * c} ${-406 - shrug}`}
							fill="none"
							stroke={K.outline}
							strokeWidth={5.5}
							strokeLinecap="round"
						/>
						<path
							d={`M ${collarX - 20 * c} ${-386 - shrug} Q ${collarX - 22 * c} ${-366 - shrug} ${collarX - 20 * c} ${-348 - shrug}`}
							fill="none"
							stroke={K.outline}
							strokeWidth={8}
							strokeLinecap="round"
						/>
						<path
							d={`M ${collarX - 20 * c} ${-386 - shrug} Q ${collarX - 22 * c} ${-366 - shrug} ${collarX - 20 * c} ${-348 - shrug}`}
							fill="none"
							stroke={K.drawstring}
							strokeWidth={4}
							strokeLinecap="round"
						/>
						<path
							d={`M ${collarX + 20 * c} ${-386 - shrug} Q ${collarX + 22 * c} ${-366 - shrug} ${collarX + 20 * c} ${-348 - shrug}`}
							fill="none"
							stroke={K.outline}
							strokeWidth={8}
							strokeLinecap="round"
						/>
						<path
							d={`M ${collarX + 20 * c} ${-386 - shrug} Q ${collarX + 22 * c} ${-366 - shrug} ${collarX + 20 * c} ${-348 - shrug}`}
							fill="none"
							stroke={K.drawstring}
							strokeWidth={4}
							strokeLinecap="round"
						/>
					</>
				) : null}
			</g>

			{hoodInFront ? backHoodEl : null}

			{/* Backend `>_` terminal badge */}
			{showBadge && c > 0.2 ? (
				<g transform={`translate(${chestFrontX} ${-304 - shrug * 0.35}) scale(${c} 1)`}>
					<rect
						x={-38}
						y={-19}
						width={76}
						height={38}
						rx={11}
						fill={K.badgeBg}
						stroke={K.outline}
						strokeWidth={4.5}
					/>
					<circle cx={-26} cy={-9} r={2.8} fill={K.badgeAmber} />
					<path
						d="M -17 -7 L -5 1 L -17 9"
						fill="none"
						stroke={K.badgeAccent}
						strokeWidth={5.5}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<line
						x1={4}
						y1={8}
						x2={21}
						y2={8}
						stroke={K.badgeAccent}
						strokeWidth={5.5}
						strokeLinecap="round"
					/>
				</g>
			) : null}
		</g>
	);
};

export const Neck: React.FC = () => <SharedNeck fill={K.skin} outline={K.outline} />;

export const GroundShadow: React.FC<{readonly lift: number}> = ({lift}) => (
	<SharedGroundShadow lift={lift} color={K.ground} rx={170} />
);
