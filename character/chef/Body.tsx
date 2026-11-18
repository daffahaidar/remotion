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

const CLOG_SIZE: ShoeSize = {radius: 22, heel: 18, toe: 56, width: 40};

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
		sleeveRatio={0.44}
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
}> = (props) => (
	<SharedLeg {...props} rig={RIG} palette={BODY_PALETTE} shoeSize={CLOG_SIZE} dressShoe />
);

const TORSO: readonly TorsoSection[] = [
	[-410, 74, 62, 0],
	[-386, 118, 86, 2],
	[-335, 118, 90, 6],
	[-262, 114, 88, 4],
	[-184, 118, 88, 0],
];

/** Double-breasted chef coat with red neckerchief, apron, and wooden spatula peeking from pocket. */
export const Torso: React.FC<{
	readonly yaw: number;
	readonly shrug: number;
	readonly uid: string;
}> = ({yaw, shrug, uid}) => {
	const {d, c, sn, chestFrontX} = computeTorsoGeometry(TORSO, yaw, shrug);
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
				<ellipse cx={0} cy={-392 - shrug} rx={124} ry={34} fill={K.shirtShade} />

				{/* Double-breasted button rows */}
				{c > 0.18 ? (
					<g transform={`translate(${frontX} 0) scale(${c} 1)`}>
						{[-345, -310].map((by) => (
							<React.Fragment key={by}>
								<circle cx={-18} cy={by} r={4.5} fill={K.apron} stroke={K.outline} strokeWidth={2.5} />
								<circle cx={18} cy={by} r={4.5} fill={K.apron} stroke={K.outline} strokeWidth={2.5} />
							</React.Fragment>
						))}
					</g>
				) : null}

				{/* Dark slate apron wrapped around lower waist */}
				<rect x={-140} y={-272} width={280} height={100} fill={K.apron} stroke={K.outline} strokeWidth={4.5} />
				<rect x={-140} y={-272} width={280} height={14} fill={K.apronShade} />
				<line x1={-140} y1={-258} x2={140} y2={-258} stroke={K.outline} strokeWidth={4} />

				{/* Red chef neckerchief */}
				{c > -0.25 ? (
					<g transform={`translate(${44 * sn} ${-400 - shrug}) scale(${Math.max(c, 0.25)} 1)`}>
						<path
							d="M -42 -10 Q 0 18 42 -10 L 34 8 Q 0 28 -34 8 Z"
							fill={K.neckerchief}
							stroke={K.outline}
							strokeWidth={4.5}
							strokeLinejoin="round"
						/>
						{c > 0.15 ? (
							<path
								d="M -10 12 L 10 12 L 6 44 L -6 40 Z"
								fill={K.neckerchiefShade}
								stroke={K.outline}
								strokeWidth={4}
								strokeLinejoin="round"
							/>
						) : null}
					</g>
				) : null}
			</g>

			{/* Wooden spatula peeking out of apron pocket */}
			{c > 0.2 ? (
				<g transform={`translate(${chestFrontX + 42 * c} -266) rotate(12) scale(${c} 1)`}>
					<rect
						x={-6}
						y={-28}
						width={12}
						height={34}
						rx={4}
						fill={K.wood}
						stroke={K.outline}
						strokeWidth={3.5}
					/>
					<rect
						x={-11}
						y={-42}
						width={22}
						height={18}
						rx={5}
						fill={K.wood}
						stroke={K.outline}
						strokeWidth={3.5}
					/>
				</g>
			) : null}
		</g>
	);
};

export const Neck: React.FC = () => <SharedNeck fill={K.skin} outline={K.outline} halfW={28} />;

export const GroundShadow: React.FC<{readonly lift: number}> = ({lift}) => (
	<SharedGroundShadow lift={lift} color={K.ground} rx={174} />
);
