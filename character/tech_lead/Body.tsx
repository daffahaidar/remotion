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
		sleeveRatio={0.45}
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
	[-184, 110, 82, 0],
];

/** Open olive-sage flannel overshirt over a dark charcoal tee. */
export const Torso: React.FC<{
	readonly yaw: number;
	readonly shrug: number;
	readonly uid: string;
}> = ({yaw, shrug, uid}) => {
	const {d, c, sn} = computeTorsoGeometry(TORSO, yaw, shrug);
	const clip = `${uid}-torso`;
	const frontX = 70 * sn;

	return (
		<g>
			<clipPath id={clip}>
				<path d={d} />
			</clipPath>
			<path d={d} fill={K.shirtShade} stroke={K.outline} strokeWidth={OW * 2} strokeLinejoin="round" />
			<g clipPath={`url(#${clip})`}>
				<path d={d} fill={K.shirt} transform="translate(-16 -10)" />
				<ellipse cx={0} cy={-392 - shrug} rx={116} ry={34} fill={K.shirtShade} />

				{/* Subtle flannel plaid grid lines */}
				{[-340, -280, -220].map((py) => (
					<line key={py} x1={-140} y1={py} x2={140} y2={py} stroke={K.plaid} strokeWidth={4} opacity={0.45} />
				))}
				{[-65, 65].map((px) => (
					<line
						key={px}
						x1={px + frontX * 0.4}
						y1={-410}
						x2={px + frontX * 0.4}
						y2={-180}
						stroke={K.shirtShade}
						strokeWidth={4}
						opacity={0.5}
					/>
				))}

				{/* Open flannel center showing dark inner tee */}
				{c > 0.16 ? (
					<g transform={`translate(${frontX} 0) scale(${c} 1)`}>
						<rect
							x={-36}
							y={-414 - shrug}
							width={72}
							height={240}
							fill={K.innerTee}
							stroke={K.outline}
							strokeWidth={4.5}
						/>
						{/* Flannel shirt collar lapels */}
						<path
							d={`M -36 ${-408 - shrug} L -62 ${-366 - shrug * 0.7} L -36 ${-352 - shrug * 0.6} Z`}
							fill={K.shirtShade}
							stroke={K.outline}
							strokeWidth={4}
							strokeLinejoin="round"
						/>
						<path
							d={`M 36 ${-408 - shrug} L 62 ${-366 - shrug * 0.7} L 36 ${-352 - shrug * 0.6} Z`}
							fill={K.shirtShade}
							stroke={K.outline}
							strokeWidth={4}
							strokeLinejoin="round"
						/>
					</g>
				) : null}
			</g>
		</g>
	);
};

export const Neck: React.FC = () => <SharedNeck fill={K.skin} outline={K.outline} />;

export const GroundShadow: React.FC<{readonly lift: number}> = ({lift}) => (
	<SharedGroundShadow lift={lift} color={K.ground} />
);
