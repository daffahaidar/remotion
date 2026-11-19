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
import {COLORS as K, OW, R, smoothPath, v3, type FaceSpec, type P2} from './rig';

const SX = 0.9;
const SZ = 0.94;

/** Energetic, slightly broader rounded-oval facial posture. */
const SKULL_SHAPE: SkullShapeParams = {
	jawTaper: 0.09,
	jawZ: 0.09,
	jawSquare: 0.25,
	chinReach: 1.0,
	crownScale: 1.0,
};

const FACE_CFG: FaceConfig = {
	sx: SX,
	sz: SZ,
	eyeA: 24.5,
	eyeY: 0.055,
	erx: 0.185 * R,
	ery: 0.22 * R,
	browWidth: 0.092 * R,
};

const HAIRLINE: readonly P2[] = [
	[0, -0.56],
	[28, -0.56],
	[54, -0.44],
	[76, -0.18],
	[88, 0],
	[106, -0.04],
	[132, 0.34],
	[156, 0.6],
	[180, 0.74],
];

const PUFFS: readonly HairPuff[] = [
	{c: [0, -0.84, 0.16], r: 0.36},
	{c: [-0.46, -0.62, -0.08], r: 0.33},
	{c: [0.46, -0.62, -0.08], r: 0.33},
	{c: [0, -0.34, -0.62], r: 0.4},
];

const TUFTS: readonly HairTuft[] = [
	{b: [-0.32, -0.74, 0.6], t: [-0.52, -0.44, 0.8], w: 0.2, bend: 0.16},
	{b: [-0.04, -0.76, 0.64], t: [0.16, -0.44, 0.86], w: 0.18, bend: -0.16},
	{b: [0.3, -0.74, 0.6], t: [0.54, -0.44, 0.78], w: 0.2, bend: -0.14},
];

const SHINES: readonly (readonly T3[])[] = [
	[
		[-0.3, -0.72, -0.74],
		[0, -0.82, -0.72],
		[0.3, -0.72, -0.74],
	],
];

export type HeadProps = {
	readonly yaw: number;
	readonly nod: number;
	readonly face: FaceSpec;
	readonly blink: number;
	readonly uid: string;
	readonly showCap?: boolean;
};

/** Fullstack Programmer head: energetic broader oval face and 3D dual-tone backwards tech cap. */
export const Head: React.FC<HeadProps> = ({yaw, nod, face, blink, uid, showCap = true}) => {
	const proj = createHeadProjection(yaw, nod, SX, SZ);

	// 3D backwards baseball cap crown + backwards visor brim
	const domeRadius = Math.hypot(1.04 * SX * proj.cosYaw, 1.04 * SZ * proj.sinYaw);
	const domePts: P2[] = [];
	for (let i = 0; i <= 10; i++) {
		const th = -Math.PI / 2 + (i / 10) * Math.PI;
		domePts.push([Math.sin(th) * domeRadius * R, (-0.5 - Math.cos(th) * 0.65) * R]);
	}
	const frontRimC = proj.P(v3(0, -0.58, 0.84));
	const domeD = smoothPath([...domePts, [frontRimC.x, frontRimC.y]]);

	const bL = proj.P(v3(-0.74, -0.54, -0.64));
	const bR = proj.P(v3(0.74, -0.54, -0.64));
	const bMidL = proj.P(v3(-0.56, -0.46, -1.24));
	const bTip = proj.P(v3(0, -0.44, -1.48));
	const bMidR = proj.P(v3(0.56, -0.46, -1.24));
	const brimD = smoothPath([
		[bL.x, bL.y],
		[bMidL.x, bMidL.y],
		[bTip.x, bTip.y],
		[bMidR.x, bMidR.y],
		[bR.x, bR.y],
	]);

	const brimInFront = proj.cosYaw <= 0.35;
	const brimEl = showCap ? (
		<g>
			<path d={brimD} fill={K.capEmerald} stroke={K.outline} strokeWidth={OW * 2} strokeLinejoin="round" />
			<path d={brimD} fill={K.capEmerald} />
		</g>
	) : null;

	const capCrownEl = showCap ? (
		<g>
			<path d={domeD} fill={K.capCyan} stroke={K.outline} strokeWidth={OW * 2} strokeLinejoin="round" />
			<path d={domeD} fill={K.capCyan} />
			{/* Snapback forehead strap cutout */}
			{proj.cosYaw > 0.2 ? (
				<path
					d={`M ${frontRimC.x - 42 * proj.cosYaw} ${frontRimC.y - 6} A ${42 * proj.cosYaw} 26 0 0 1 ${frontRimC.x + 42 * proj.cosYaw} ${frontRimC.y - 6} Z`}
					fill={K.capDark}
					stroke={K.outline}
					strokeWidth={4.5}
				/>
			) : null}
			{/* Top button on cap crown */}
			<circle
				cx={proj.P(v3(0, -1.18, 0)).x}
				cy={proj.P(v3(0, -1.18, 0)).y}
				r={9}
				fill={K.capEmerald}
				stroke={K.outline}
				strokeWidth={3.5}
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
			extraBack={brimInFront ? null : brimEl}
			extraTop={
				<>
					{capCrownEl}
					{brimInFront ? brimEl : null}
				</>
			}
		/>
	);
};
