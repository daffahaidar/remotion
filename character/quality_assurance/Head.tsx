import React from 'react';
import {
	HairHeadShell,
	createHeadProjection,
	type FaceConfig,
	type HairPuff,
	type HairTuft,
	type SkullShapeParams,
	type T3,
} from '../shared/face';
import {COLORS as K, R, type FaceSpec, type P2} from './rig';

const SX = 0.82;
const SZ = 0.92;

/** Observant, narrower rectangular-diamond facial posture. */
const SKULL_SHAPE: SkullShapeParams = {
	jawTaper: 0.1,
	jawZ: 0.09,
	jawSquare: 0.42,
	chinReach: 1.02,
	crownScale: 1.0,
};

const FACE_CFG: FaceConfig = {
	sx: SX,
	sz: SZ,
	eyeA: 23,
	eyeY: 0.045,
	erx: 0.178 * R,
	ery: 0.21 * R,
	mouthScale: 0.94,
	blushA: 37,
	blushY: 0.36,
	blushRx: 0.115,
	blushRy: 0.055,
	blushOpacity: 0.5,
	browWidth: 0.085 * R,
	eyelashes: 'feminine',
};

const HAIRLINE: readonly P2[] = [
	[0, -0.62],
	[30, -0.58],
	[54, -0.44],
	[76, -0.15],
	[92, 0.08],
	[116, 0.42],
	[148, 0.78],
	[180, 0.88],
];

const PUFFS: readonly HairPuff[] = [
	{c: [-0.26, -0.84, 0.22], r: 0.33},
	{c: [0.28, -0.85, 0.2], r: 0.34},
	{c: [0, -0.86, -0.18], r: 0.38},
	{c: [-0.52, -0.52, -0.14], r: 0.34},
	{c: [0.54, -0.5, -0.14], r: 0.34},
	{c: [-0.46, 0.02, -0.42], r: 0.32},
	{c: [0.46, 0.02, -0.42], r: 0.32},
	{c: [0, -0.34, -0.58], r: 0.4},
	{c: [0, 0.34, -0.62], r: 0.38},
];

const TUFTS: readonly HairTuft[] = [
	{b: [-0.14, -0.86, 0.62], t: [0.88, 0.05, 0.48], w: 0.36, bend: -0.22},
	{b: [-0.18, -0.84, 0.62], t: [-0.84, 0.02, 0.52], w: 0.3, bend: 0.2},
];

const SHINES: readonly (readonly T3[])[] = [
	[
		[-0.32, -0.9, 0.56],
		[0.04, -1.04, 0.48],
		[0.4, -0.9, 0.44],
	],
	[
		[-0.32, -0.68, -0.74],
		[0, -0.8, -0.74],
		[0.32, -0.68, -0.74],
	],
];

export type HeadProps = {
	readonly yaw: number;
	readonly nod: number;
	readonly face: FaceSpec;
	readonly blink: number;
	readonly uid: string;
	readonly showGlasses?: boolean;
};

/** QA head: narrower observant face, sleek bob with crimson hairclip, and sharp crimson cat-eye glasses. */
export const Head: React.FC<HeadProps> = ({yaw, nod, face, blink, uid, showGlasses = true}) => {
	const proj = createHeadProjection(yaw, nod, SX, SZ);
	const clipC = proj.P(proj.sph(48, -0.44, 1.03));

	return (
		<HairHeadShell
			yaw={yaw}
			nod={nod}
			face={face}
			blink={blink}
			uid={uid}
			faceCfg={FACE_CFG}
			skullShape={SKULL_SHAPE}
			k={K}
			hairline={HAIRLINE}
			puffs={PUFFS}
			tufts={TUFTS}
			shines={SHINES}
			delicateNose
			glasses={
				showGlasses
					? {
							shape: 'catEye',
							frameColor: K.frame,
							lensColor: K.lens,
							lensX: 0.4,
							eyeY: FACE_CFG.eyeY,
							lensW: 0.265,
							lensH: 0.215,
							frameWidth: 0.048 * R,
						}
					: null
			}
			extraTop={
				proj.facing(48) > 0.15 ? (
					<g transform={`translate(${clipC.x} ${clipC.y}) rotate(-28)`}>
						<rect
							x={-16}
							y={-5}
							width={32}
							height={10}
							rx={5}
							fill={K.hairClip}
							stroke={K.outline}
							strokeWidth={3.5}
						/>
					</g>
				) : null
			}
		/>
	);
};
