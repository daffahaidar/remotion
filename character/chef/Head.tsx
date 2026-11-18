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
import {COLORS as K, OW, R, smoothPath, v3, type FaceSpec, type P2} from './rig';

const SX = 0.95;
const SZ = 0.96;

/** Warm, round-cheeked jolly facial posture. */
const SKULL_SHAPE: SkullShapeParams = {
	jawTaper: 0.04,
	jawZ: 0.06,
	jawSquare: 0.28,
	chinReach: 0.98,
	crownScale: 0.96,
};

const FACE_CFG: FaceConfig = {
	sx: SX,
	sz: SZ,
	eyeA: 24,
	eyeY: 0.05,
	erx: 0.178 * R,
	ery: 0.21 * R,
	mouthY: 0.63,
	mouthScale: 0.96,
	blushA: 42,
	blushY: 0.37,
	blushRx: 0.135,
	blushRy: 0.065,
	blushOpacity: 0.68,
	browWidth: 0.095 * R,
};

const HAIRLINE: readonly P2[] = [
	[0, -0.58],
	[30, -0.56],
	[60, -0.42],
	[85, -0.12],
	[115, 0.25],
	[150, 0.58],
	[180, 0.72],
];

const PUFFS: readonly HairPuff[] = [
	{c: [0, -0.82, 0.12], r: 0.34},
	{c: [-0.46, -0.62, -0.1], r: 0.32},
	{c: [0.46, -0.62, -0.1], r: 0.32},
	{c: [0, -0.34, -0.62], r: 0.38},
];

const TUFTS: readonly HairTuft[] = [
	{b: [-0.28, -0.72, 0.62], t: [-0.62, -0.44, 0.72], w: 0.22, bend: 0.16},
	{b: [0.22, -0.74, 0.62], t: [0.6, -0.45, 0.72], w: 0.22, bend: -0.16},
];

const SHINES: readonly (readonly T3[])[] = [
	[
		[-0.32, -0.68, -0.72],
		[0, -0.78, -0.74],
		[0.32, -0.68, -0.72],
	],
];

export type HeadProps = {
	readonly yaw: number;
	readonly nod: number;
	readonly face: FaceSpec;
	readonly blink: number;
	readonly uid: string;
	readonly showHat?: boolean;
	readonly showMustache?: boolean;
};

/** Chef head: round warm cheeks, curled mustache, and pleated 3D chef toque. */
export const Head: React.FC<HeadProps> = ({
	yaw,
	nod,
	face,
	blink,
	uid,
	showHat = true,
	showMustache = true,
}) => {
	const proj = createHeadProjection(yaw, nod, SX, SZ);
	const jaw = JAW[face.mouth] ?? 0;

	const mustacheFacing = proj.facing(face.mouthX * 10);
	const mustacheC = proj.P(proj.sph(face.mouthX * 10, 0.465 + jaw * 0.05, 1.02));

	// 3D pleated chef toque kept within head-framing bounds (top <= -1.36 * R).
	const hatCenter = proj.P(v3(0, -0.68, 0));
	const hatHalfW = Math.hypot(0.92 * SX * proj.cosYaw, 0.92 * SZ * proj.sinYaw) * R;
	const leftX = hatCenter.x - hatHalfW;
	const rightX = hatCenter.x + hatHalfW;
	const cx = hatCenter.x;
	const bandEdgeY = hatCenter.y;
	const bandTopY = proj.P(v3(0, -0.96, 0)).y;
	const bandMidBot = proj.P(v3(0, -0.68, 0.72 * proj.cosYaw));
	const bandMidTop = proj.P(v3(0, -0.98, 0.72 * proj.cosYaw));

	const puffC = proj.P(v3(0, -1.14, 0));
	const puffL = proj.P(v3(-0.56, -1.08, 0));
	const puffR = proj.P(v3(0.56, -1.08, 0));
	const puffF = proj.P(v3(0, -1.08, 0.46));
	const puffB = proj.P(v3(0, -1.08, -0.46));

	const toqueBand = smoothPath([
		[leftX, bandEdgeY],
		[cx, bandMidBot.y],
		[rightX, bandEdgeY],
		[cx + hatHalfW * 0.94, bandTopY],
		[cx, bandMidTop.y],
		[cx - hatHalfW * 0.94, bandTopY],
	]);

	const toquePuffs = (rScale: number) => (
		<>
			<circle cx={puffL.x} cy={puffL.y} r={0.22 * rScale * R} />
			<circle cx={puffR.x} cy={puffR.y} r={0.22 * rScale * R} />
			<circle cx={puffF.x} cy={puffF.y} r={0.21 * rScale * R} />
			<circle cx={puffB.x} cy={puffB.y} r={0.21 * rScale * R} />
			<circle cx={puffC.x} cy={puffC.y} r={0.25 * rScale * R} />
		</>
	);

	const toqueEl = showHat ? (
		<g>
			{/* Puffy toque cloud + headband outline */}
			<g fill={K.outline} stroke={K.outline} strokeWidth={OW * 2} strokeLinejoin="round">
				{toquePuffs(1)}
				<path d={toqueBand} />
			</g>
			<g fill={K.hatShade}>
				{toquePuffs(1)}
				<path d={toqueBand} />
			</g>
			<g fill={K.hat} transform="translate(-8 -6)">
				{toquePuffs(0.92)}
			</g>
			<path d={toqueBand} fill={K.hat} stroke={K.outline} strokeWidth={4.5} strokeLinejoin="round" />
			{/* Pleat lines */}
			<line
				x1={cx - hatHalfW * 0.35}
				y1={bandMidTop.y + 4}
				x2={cx - hatHalfW * 0.4}
				y2={puffC.y + 10}
				stroke={K.hatShade}
				strokeWidth={5}
				strokeLinecap="round"
			/>
			<line
				x1={cx + hatHalfW * 0.35}
				y1={bandMidTop.y + 4}
				x2={cx + hatHalfW * 0.4}
				y2={puffC.y + 10}
				stroke={K.hatShade}
				strokeWidth={5}
				strokeLinecap="round"
			/>
		</g>
	) : null;

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
			extraFace={
				showMustache && mustacheFacing >= -0.1 ? (
					<path
						transform={`translate(${mustacheC.x} ${mustacheC.y}) scale(${Math.max(mustacheFacing, 0.35)} 1)`}
						d="M -38 2 Q -25 -13 -5 -3 Q 0 0 5 -3 Q 25 -13 38 2 Q 22 11 0 3 Q -22 11 -38 2 Z"
						fill={K.hair}
						stroke={K.outline}
						strokeWidth={3.8}
						strokeLinejoin="round"
					/>
				) : null
			}
			extraTop={toqueEl}
		/>
	);
};
