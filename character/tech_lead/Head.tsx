import React from 'react';
import {
	HairHeadShell,
	JAW,
	createHeadProjection,
	type FaceConfig,
	type HairPuff,
	type HairTuft,
	type SkullShapeParams,
	type T3,
} from '../shared/face';
import {COLORS as K, R, type FaceSpec, type P2} from './rig';

const SX = 0.8;
const SZ = 0.93;

/** Longer, narrower angular facial posture of a seasoned Tech Lead. */
const SKULL_SHAPE: SkullShapeParams = {
	jawTaper: 0.08,
	jawZ: 0.08,
	jawSquare: 0.45,
	chinReach: 1.08,
	crownScale: 0.98,
};

const FACE_CFG: FaceConfig = {
	sx: SX,
	sz: SZ,
	eyeA: 22.5,
	eyeY: 0.02,
	erx: 0.168 * R,
	ery: 0.195 * R,
	mouthY: 0.63,
	mouthScale: 0.94,
	blushOpacity: 0.35,
	browWidth: 0.085 * R,
};

const HAIRLINE: readonly P2[] = [
	[0, -0.62],
	[28, -0.6],
	[54, -0.46],
	[76, -0.2],
	[88, -0.02],
	[104, -0.1],
	[128, 0.32],
	[154, 0.6],
	[180, 0.74],
];

const PUFFS: readonly HairPuff[] = [
	{c: [-0.24, -0.84, 0.24], r: 0.32},
	{c: [0.22, -0.88, 0.22], r: 0.34},
	{c: [0, -0.82, -0.22], r: 0.38},
	{c: [-0.44, -0.6, -0.15], r: 0.31},
	{c: [0.44, -0.6, -0.15], r: 0.31},
	{c: [0, -0.34, -0.62], r: 0.38},
];

const TUFTS: readonly HairTuft[] = [
	{b: [-0.22, -0.82, 0.6], t: [0.52, -0.52, 0.72], w: 0.24, bend: -0.2},
	{b: [0.1, -0.84, 0.62], t: [-0.22, -0.46, 0.82], w: 0.14, bend: 0.16},
	{b: [-0.36, -0.8, 0.56], t: [-0.72, -0.48, 0.6], w: 0.18, bend: 0.14},
];

const SHINES: readonly (readonly T3[])[] = [
	[
		[-0.24, -0.94, 0.56],
		[0.08, -1.04, 0.46],
		[0.36, -0.94, 0.38],
	],
	[
		[-0.28, -0.74, -0.72],
		[0, -0.84, -0.72],
		[0.28, -0.74, -0.72],
	],
];

export type HeadProps = {
	readonly yaw: number;
	readonly nod: number;
	readonly face: FaceSpec;
	readonly blink: number;
	readonly uid: string;
	readonly showGlasses?: boolean;
	readonly showGoatee?: boolean;
	readonly showUnderEyeBags?: boolean;
};

/** Tech Lead head: longer angular face, tired under-eye lines, chin goatee, and slim glasses. */
export const Head: React.FC<HeadProps> = ({
	yaw,
	nod,
	face,
	blink,
	uid,
	showGlasses = true,
	showGoatee = true,
	showUnderEyeBags = true,
}) => {
	const proj = createHeadProjection(yaw, nod, SX, SZ);
	const jaw = JAW[face.mouth] ?? 0;

	const bags = showUnderEyeBags
		? ([1, -1] as const).map((s) => {
				const f = proj.facing(s * FACE_CFG.eyeA);
				if (f < 0.1) {
					return null;
				}
				const c = proj.P(proj.sph(s * FACE_CFG.eyeA, FACE_CFG.eyeY + 0.24, 1.0));
				const w = 18 * Math.max(f, 0.3);
				return (
					<path
						key={`bag${s}`}
						d={`M ${c.x - w} ${c.y} Q ${c.x} ${c.y + 7} ${c.x + w} ${c.y}`}
						fill="none"
						stroke={K.skinShade}
						strokeWidth={4.5}
						strokeLinecap="round"
					/>
				);
			})
		: null;

	const goateeC = proj.P(proj.sph(0, 0.88 + jaw * 0.4, 1.02));

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
			browY={-0.33}
			glasses={
				showGlasses
					? {
							shape: 'oval',
							frameColor: K.frame,
							lensColor: K.lens,
							lensX: 0.4,
							eyeY: FACE_CFG.eyeY,
							lensW: 0.255,
							lensH: 0.195,
							frameWidth: 0.044 * R,
						}
					: null
			}
			extraFace={
				<>
					{bags}
					{showGoatee && proj.cosYaw > -0.15 ? (
						<path
							transform={`translate(${goateeC.x} ${goateeC.y}) scale(${Math.max(proj.cosYaw, 0.35)} 1)`}
							d="M -18 -6 Q 0 0 18 -6 L 12 18 Q 0 26 -12 18 Z"
							fill={K.hair}
							stroke={K.outline}
							strokeWidth={3.5}
							strokeLinejoin="round"
						/>
					) : null}
				</>
			}
		/>
	);
};
