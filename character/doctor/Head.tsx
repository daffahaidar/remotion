import React from 'react';
import {
	HairHeadShell,
	type FaceConfig,
	type HairPuff,
	type HairTuft,
	type SkullShapeParams,
	type T3,
} from '../shared/face';
import {COLORS as K, R, type FaceSpec, type P2} from './rig';

const SX = 0.81;
const SZ = 0.92;

/** Composed, slender, slightly longer oval facial posture. */
const SKULL_SHAPE: SkullShapeParams = {
	jawTaper: 0.16,
	jawZ: 0.11,
	jawSquare: 0.08,
	chinReach: 1.05,
	crownScale: 1.01,
};

const FACE_CFG: FaceConfig = {
	sx: SX,
	sz: SZ,
	eyeA: 23,
	eyeY: 0.04,
	erx: 0.175 * R,
	ery: 0.205 * R,
	mouthY: 0.62,
	mouthScale: 0.94,
	browWidth: 0.08 * R,
};

const HAIRLINE: readonly P2[] = [
	[0, -0.62],
	[28, -0.58],
	[54, -0.45],
	[76, -0.2],
	[88, -0.02],
	[104, -0.1],
	[128, 0.3],
	[154, 0.58],
	[180, 0.72],
];

const PUFFS: readonly HairPuff[] = [
	{c: [0.16, -0.88, 0.24], r: 0.32},
	{c: [-0.26, -0.84, 0.22], r: 0.3},
	{c: [0, -0.84, -0.2], r: 0.38},
	{c: [-0.42, -0.6, -0.15], r: 0.3},
	{c: [0.44, -0.6, -0.15], r: 0.31},
	{c: [0, -0.34, -0.62], r: 0.38},
];

const TUFTS: readonly HairTuft[] = [
	{b: [-0.24, -0.8, 0.58], t: [0.68, -0.68, 0.52], w: 0.28, bend: -0.22},
	{b: [-0.26, -0.78, 0.58], t: [-0.72, -0.42, 0.6], w: 0.22, bend: 0.18},
];

const SHINES: readonly (readonly T3[])[] = [
	[
		[-0.25, -0.94, 0.55],
		[0.12, -1.04, 0.45],
		[0.44, -0.94, 0.32],
	],
	[
		[-0.28, -0.74, -0.72],
		[0, -0.84, -0.7],
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
};

/** Doctor head: slender composed oval face posture, neat side-part hair, and sleek oval glasses. */
export const Head: React.FC<HeadProps> = ({yaw, nod, face, blink, uid, showGlasses = true}) => (
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
						shape: 'oval',
						frameColor: K.frame,
						lensColor: K.lens,
						lensX: 0.4,
						eyeY: FACE_CFG.eyeY,
						lensW: 0.26,
						lensH: 0.2,
						frameWidth: 0.042 * R,
					}
				: null
		}
	/>
);
