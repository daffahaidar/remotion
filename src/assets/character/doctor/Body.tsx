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
	<SleeveArm
		{...props}
		rig={RIG}
		outline={K.outline}
		skin={K.skin}
		sleeveColor={K.shirt}
		cuffColor={K.shirtShade}
		underCuffColor={K.scrubs}
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
	[-410, 68, 56, 0],
	[-386, 110, 78, 2],
	[-335, 108, 82, 6],
	[-262, 104, 80, 3],
	[-184, 110, 82, 0],
];

/** White lab coat worn over teal medical scrubs, 3D stethoscope, and medical cross pocket badge. */
export const Torso: React.FC<{
	readonly yaw: number;
	readonly shrug: number;
	readonly uid: string;
	readonly showStethoscope?: boolean;
}> = ({yaw, shrug, uid, showStethoscope = true}) => {
	const {d, c, sn, chestFrontX} = computeTorsoGeometry(TORSO, yaw, shrug);
	const clip = `${uid}-torso`;
	const frontX = 68 * sn;
	const backX = -64 * sn;

	return (
		<g>
			<clipPath id={clip}>
				<path d={d} />
			</clipPath>
			<path d={d} fill={K.shirtShade} stroke={K.outline} strokeWidth={OW * 2} strokeLinejoin="round" />
			<g clipPath={`url(#${clip})`}>
				<path d={d} fill={K.shirt} transform="translate(-16 -10)" />
				<ellipse cx={0} cy={-392 - shrug} rx={118} ry={34} fill={K.shirtShade} />

				{/* Back lab coat seam */}
				{c < -0.2 ? (
					<line x1={backX} y1={-370} x2={backX} y2={-184} stroke={K.shirtShade} strokeWidth={5} strokeLinecap="round" />
				) : null}

				{/* Inner teal scrubs panel & coat lapels */}
				{c > 0.16 ? (
					<g transform={`translate(${frontX} 0) scale(${c} 1)`}>
						<rect
							x={-30}
							y={-412 - shrug}
							width={60}
							height={240}
							fill={K.scrubs}
							stroke={K.outline}
							strokeWidth={4.5}
						/>
						{/* Scrub V-neck collar */}
						<path
							d={`M -22 ${-406 - shrug} L 0 ${-372 - shrug} L 22 ${-406 - shrug}`}
							fill="none"
							stroke={K.outline}
							strokeWidth={4.5}
							strokeLinejoin="round"
						/>
						{/* Coat lapels */}
						<path
							d={`M -30 ${-406 - shrug} L -52 ${-356 - shrug * 0.6} L -30 ${-334 - shrug * 0.5} Z`}
							fill={K.shirtShade}
							stroke={K.outline}
							strokeWidth={4}
							strokeLinejoin="round"
						/>
						<path
							d={`M 30 ${-406 - shrug} L 52 ${-356 - shrug * 0.6} L 30 ${-334 - shrug * 0.5} Z`}
							fill={K.shirtShade}
							stroke={K.outline}
							strokeWidth={4}
							strokeLinejoin="round"
						/>
					</g>
				) : null}
			</g>

			{/* Coat pocket with red medical cross (+) and pen */}
			{c > 0.2 ? (
				<g transform={`translate(${chestFrontX + 54 * c} ${-304 - shrug * 0.35}) scale(${c} 1)`}>
					<rect x={-18} y={-14} width={36} height={36} rx={6} fill={K.shirt} stroke={K.outline} strokeWidth={4} />
					<line x1={8} y1={-14} x2={11} y2={-28} stroke={K.scrubsShade} strokeWidth={5} strokeLinecap="round" />
					<path d="M 0 -5 L 0 11 M -8 3 L 8 3" stroke={K.crossRed} strokeWidth={5.5} strokeLinecap="round" />
				</g>
			) : null}

			{/* Stethoscope around neck & shoulders */}
			{showStethoscope ? (
				<g>
					{c < 0.2 ? (
						<path
							d={`M ${backX - 44} ${-392 - shrug} Q ${backX} ${-358 - shrug} ${backX + 44} ${-392 - shrug}`}
							fill="none"
							stroke={K.outline}
							strokeWidth={13}
							strokeLinecap="round"
						/>
					) : null}
					{c > 0.16 ? (
						<g transform={`translate(${frontX} 0) scale(${c} 1)`}>
							<path
								d={`M -44 ${-398 - shrug} C -52 ${-344 - shrug * 0.5} -48 -310 -34 -292`}
								fill="none"
								stroke={K.outline}
								strokeWidth={13}
								strokeLinecap="round"
							/>
							<path
								d={`M -44 ${-398 - shrug} C -52 ${-344 - shrug * 0.5} -48 -310 -34 -292`}
								fill="none"
								stroke={K.stethTube}
								strokeWidth={6}
								strokeLinecap="round"
							/>
							<path
								d={`M 44 ${-398 - shrug} C 52 ${-344 - shrug * 0.5} 48 -316 40 -304`}
								fill="none"
								stroke={K.outline}
								strokeWidth={13}
								strokeLinecap="round"
							/>
							<path
								d={`M 44 ${-398 - shrug} C 52 ${-344 - shrug * 0.5} 48 -316 40 -304`}
								fill="none"
								stroke={K.stethTube}
								strokeWidth={6}
								strokeLinecap="round"
							/>
							{/* Silver chestpiece disk */}
							<circle cx={-34} cy={-288} r={13} fill={K.stethMetal} stroke={K.outline} strokeWidth={4} />
							<circle cx={-34} cy={-288} r={5} fill={K.stethTube} />
						</g>
					) : null}
				</g>
			) : null}
		</g>
	);
};

export const Neck: React.FC = () => <SharedNeck fill={K.skin} outline={K.outline} />;

export const GroundShadow: React.FC<{readonly lift: number}> = ({lift}) => (
	<SharedGroundShadow lift={lift} color={K.ground} />
);
