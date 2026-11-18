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
import {COLORS as K, OW, R, v3, type FaceSpec, type P2} from './rig';

const SX = 0.86;
const SZ = 0.92;

/** Expressive diamond/V-chin facial posture with bright alert eyes. */
const SKULL_SHAPE: SkullShapeParams = {
	jawTaper: 0.21,
	jawZ: 0.12,
	jawSquare: 0,
	chinReach: 1.01,
	crownScale: 1.02,
};

const FACE_CFG: FaceConfig = {
	sx: SX,
	sz: SZ,
	eyeA: 24.5,
	eyeY: 0.045,
	erx: 0.188 * R,
	ery: 0.23 * R,
	mouthScale: 0.94,
	blushA: 37,
	blushY: 0.36,
	blushRx: 0.12,
	blushRy: 0.06,
	blushOpacity: 0.6,
	browWidth: 0.082 * R,
	eyelashes: 'feminine',
};

const HAIRLINE: readonly P2[] = [
	[0, -0.64],
	[30, -0.6],
	[56, -0.45],
	[76, -0.2],
	[90, 0.0],
	[112, 0.2],
	[145, 0.56],
	[180, 0.72],
];

const PUFFS: readonly HairPuff[] = [
	{c: [-0.26, -0.84, 0.22], r: 0.33},
	{c: [0.28, -0.86, 0.2], r: 0.34},
	{c: [0, -0.88, -0.18], r: 0.38},
	{c: [-0.46, -0.58, -0.15], r: 0.32},
	{c: [0.46, -0.58, -0.15], r: 0.32},
	{c: [0, -0.34, -0.62], r: 0.38},
];

const TUFTS: readonly HairTuft[] = [
	{b: [-0.14, -0.86, 0.62], t: [0.84, -0.2, 0.54], w: 0.34, bend: -0.22},
	{b: [-0.18, -0.84, 0.62], t: [-0.82, -0.26, 0.56], w: 0.28, bend: 0.2},
];

const SHINES: readonly (readonly T3[])[] = [
	[
		[-0.3, -0.92, 0.56],
		[0.06, -1.04, 0.48],
		[0.4, -0.92, 0.44],
	],
	[
		[-0.3, -0.7, -0.74],
		[0, -0.82, -0.74],
		[0.3, -0.7, -0.74],
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

/** Project Manager head: diamond V-chin face posture, high ponytail with scrunchie, and cat-eye glasses. */
export const Head: React.FC<HeadProps> = ({yaw, nod, face, blink, uid, showGlasses = true}) => {
	const proj = createHeadProjection(yaw, nod, SX, SZ);

	// 3D high ponytail anchored on upper back crown
	const tie = proj.P(v3(0, -0.68, -0.82));
	const tailMid = proj.P(v3(0, -0.45, -1.2));
	const tailTip = proj.P(v3(0, 0.14, -1.32));
	const ponytailInFront = proj.cosYaw < 0.2;

	const ponytailEl = (
		<g>
			<g fill={K.outline} stroke={K.outline} strokeWidth={OW * 2} strokeLinejoin="round">
				<path
					d={`M ${tie.x} ${tie.y} Q ${tailMid.x + 28} ${tailMid.y - 26} ${tailTip.x} ${tailTip.y} Q ${tailMid.x - 32} ${tailMid.y + 8} ${tie.x} ${tie.y} Z`}
				/>
				<circle cx={tie.x} cy={tie.y} r={22} />
			</g>
			<path
				d={`M ${tie.x} ${tie.y} Q ${tailMid.x + 28} ${tailMid.y - 26} ${tailTip.x} ${tailTip.y} Q ${tailMid.x - 32} ${tailMid.y + 8} ${tie.x} ${tie.y} Z`}
				fill={K.hair}
			/>
			<circle cx={tie.x} cy={tie.y} r={22} fill={K.scrunchie} stroke={K.outline} strokeWidth={4.5} />
		</g>
	);

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
							lensX: 0.41,
							eyeY: FACE_CFG.eyeY,
							lensW: 0.27,
							lensH: 0.23,
							frameWidth: 0.048 * R,
						}
					: null
			}
			extraBack={ponytailInFront ? null : ponytailEl}
			extraTop={ponytailInFront ? ponytailEl : null}
		/>
	);
};
