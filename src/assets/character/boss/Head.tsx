import React from 'react';
import {
	FaceBrowsAndSweat,
	FaceInnerFeatures,
	FaceNose,
	JAW,
	buildEars,
	buildGlassesParts,
	buildHairCapPath,
	buildSkullPath,
	buildTuftPath,
	createHeadProjection,
	type FaceConfig,
	type SkullShapeParams,
	type T3,
} from '../shared/face';
import {COLORS as K, OW, R, smoothPath, v3, type FaceSpec, type P2} from './rig';

const SX = 0.93;
const SZ = 0.95;

/** Broad, strong square-jawed executive facial posture. */
const SKULL_SHAPE: SkullShapeParams = {
	jawTaper: 0.03,
	jawZ: 0.06,
	jawSquare: 0.78,
	chinReach: 1.03,
	crownScale: 0.96,
};

const FACE_CFG: FaceConfig = {
	sx: SX,
	sz: SZ,
	eyeA: 24.5,
	eyeY: 0.015,
	erx: 0.172 * R,
	ery: 0.185 * R,
	pupilRadius: 0.105,
	mouthY: 0.65,
	mouthScale: 0.94,
	blushA: 42,
	blushY: 0.36,
	blushRx: 0.11,
	blushRy: 0.052,
	blushOpacity: 0.45,
	browWidth: 0.115 * R,
};

/** Mature executive hairline (higher squared temples). */
const HAIRLINE: readonly P2[] = [
	[0, -0.64],
	[28, -0.62],
	[52, -0.48],
	[72, -0.22],
	[84, -0.02],
	[94, -0.14],
	[114, -0.08],
	[134, 0.3],
	[158, 0.56],
	[180, 0.7],
];

/** Slicked-back executive pompadour & neat sides. */
const PUFFS: readonly {c: T3; r: number}[] = [
	{c: [0.08, -0.92, 0.25], r: 0.34},
	{c: [-0.34, -0.84, 0.18], r: 0.3},
	{c: [0.46, -0.78, 0.14], r: 0.31},
	{c: [0, -0.84, -0.22], r: 0.4},
	{c: [-0.46, -0.62, -0.18], r: 0.32},
	{c: [0.46, -0.62, -0.18], r: 0.32},
	{c: [0, -0.34, -0.64], r: 0.38},
	{c: [-0.44, -0.24, -0.46], r: 0.3},
	{c: [0.44, -0.24, -0.46], r: 0.3},
];

/** Swept-back executive crown locks. */
const TUFTS: readonly {b: T3; t: T3; w: number; bend: number}[] = [
	{b: [-0.32, -0.78, 0.54], t: [0.42, -1.2, 0.08], w: 0.34, bend: -0.22},
	{b: [0.1, -0.84, 0.52], t: [0.58, -1.16, -0.08], w: 0.24, bend: -0.16},
	{b: [-0.38, -0.86, 0.28], t: [-0.72, -1.04, -0.1], w: 0.2, bend: 0.12},
];

const SHINES: readonly (readonly T3[])[] = [
	[
		[-0.28, -0.94, 0.54],
		[0.05, -1.08, 0.42],
		[0.36, -1.04, 0.28],
	],
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
	readonly showGlasses?: boolean;
	readonly showMustache?: boolean;
};

/** Boss head: broad square-jawed face posture, slicked-back silver-streaked hair, and executive mustache. */
export const Head: React.FC<HeadProps> = ({yaw, nod, face, blink, uid, showGlasses = false, showMustache = true}) => {
	const proj = createHeadProjection(yaw, nod, SX, SZ);
	const jaw = JAW[face.mouth] ?? 0;
	const id = (n: string) => `${uid}-${n}`;
	const url = (n: string) => `url(#${id(n)})`;

	const skullD = buildSkullPath(proj, nod, jaw, SX, SZ, 0, SKULL_SHAPE);
	const cap = buildHairCapPath(proj, HAIRLINE, 1.03);

	const puffs = PUFFS.map((p) => ({...proj.P(v3(p.c[0], p.c[1], p.c[2])), r: p.r * R}));
	const tufts = TUFTS.map((t) => {
		const b = proj.P(v3(t.b[0], t.b[1], t.b[2]));
		return {
			d: buildTuftPath(b, proj.P(v3(t.t[0], t.t[1], t.t[2])), t.w * R, t.bend),
			z: b.z,
		};
	});

	const frontPuffs = puffs.filter((p) => p.z > 0.05);
	const frontTufts = tufts.filter((t) => t.z > 0.1);

	const hairShapes = (ps: typeof puffs, ts: typeof tufts) => (
		<>
			{ps.map((p, i) => (
				<circle key={`p${i}`} cx={p.x} cy={p.y} r={p.r} />
			))}
			<path d={cap} />
			{ts.map((t, i) => (
				<path key={`t${i}`} d={t.d} />
			))}
		</>
	);

	const hairUnion = (ps: typeof puffs, ts: typeof tufts) => (
		<>
			<g fill={K.outline} stroke={K.outline} strokeWidth={OW * 2} strokeLinejoin="round">
				{hairShapes(ps, ts)}
			</g>
			<g fill={K.hair}>{hairShapes(ps, ts)}</g>
		</>
	);

	const shines = SHINES.map((line, i) => {
		const pts = line.map((p) => proj.P(v3(p[0], p[1], p[2])));
		if (pts.reduce((acc, p) => acc + p.z, 0) / pts.length < 0.2) {
			return null;
		}
		return (
			<path
				key={`shine${i}`}
				d={smoothPath(
					pts.map((p): P2 => [p.x, p.y]),
					false,
				)}
				fill="none"
				stroke={K.hairShine}
				strokeWidth={0.055 * R}
				strokeLinecap="round"
			/>
		);
	});

	// Distinguished silver-gray temple streaks on both sides of the hair
	const silverTemples = ([1, -1] as const).map((s) => {
		const f = proj.facing(s * 78);
		if (f < -0.25) {
			return null;
		}
		const b = proj.P(proj.sph(s * 82, -0.36, 1.02));
		const t = proj.P(proj.sph(s * 84, -0.02, 1.02));
		return <path key={`silver${s}`} d={buildTuftPath(b, t, 0.14 * R, s * 0.1)} fill={K.hairSilver} />;
	});

	// Executive mustache positioned cleanly between nose and mouth
	const mustacheFacing = proj.facing(face.mouthX * 10);
	const mustacheC = proj.P(proj.sph(face.mouthX * 10, 0.465 + jaw * 0.05, 1.02));

	// Subtle strong chin cleft/shadow
	const chinC = proj.P(proj.sph(0, 0.88 + jaw * 0.42, 1));

	const ears = buildEars(proj, K);
	const glasses = showGlasses
		? buildGlassesParts(
				proj,
				{
					shape: 'rectangular',
					frameColor: K.frame,
					lensColor: K.lens,
					lensX: 0.4,
					eyeY: FACE_CFG.eyeY,
					lensW: 0.27,
					lensH: 0.175,
					frameWidth: 0.044 * R,
					browlineAccent: true,
				},
				SX,
			)
		: null;

	return (
		<g>
			<defs>
				<clipPath id={id('head')}>
					<path d={skullD} />
				</clipPath>
				<clipPath id={id('hair')}>{hairShapes(puffs, tufts)}</clipPath>
			</defs>

			{/* Skull outline */}
			<g fill={K.outline} stroke={K.outline} strokeWidth={OW * 2}>
				<path d={skullD} />
			</g>

			{/* Back hair & silver temple streaks */}
			{hairUnion(puffs, tufts)}
			<g clipPath={url('hair')}>{silverTemples}</g>
			{glasses?.backTemples}
			{ears.map((e) => (e && !e.front ? e.el : null))}

			{/* Skull with cel shading */}
			<g fill={K.skinShade}>
				<path d={skullD} />
			</g>
			<g clipPath={url('head')}>
				<g fill={K.skin} transform={`translate(${-0.07 * R} ${-0.06 * R})`}>
					<path d={skullD} />
				</g>
			</g>

			{/* Face features */}
			<g clipPath={url('head')}>
				{glasses?.tints}
				<FaceInnerFeatures proj={proj} face={face} blink={blink} jaw={jaw} cfg={FACE_CFG} k={K} uid={uid} />
				{showMustache && mustacheFacing >= -0.1 ? (
					<path
						transform={`translate(${mustacheC.x} ${mustacheC.y}) scale(${Math.max(mustacheFacing, 0.35)} 1)`}
						d="M -32 4 Q -17 -9 0 -3 Q 17 -9 32 4 Q 17 8 0 3 Q -17 8 -32 4 Z"
						fill={K.hair}
						stroke={K.outline}
						strokeWidth={3.8}
						strokeLinejoin="round"
					/>
				) : null}
				{proj.cosYaw > 0.25 ? (
					<path
						d={`M ${chinC.x - 10 * proj.cosYaw} ${chinC.y} Q ${chinC.x} ${chinC.y + 4} ${chinC.x + 10 * proj.cosYaw} ${chinC.y}`}
						fill="none"
						stroke={K.skinShade}
						strokeWidth={4.5}
						strokeLinecap="round"
					/>
				) : null}
			</g>
			<FaceNose proj={proj} k={K} />

			{/* Front hair */}
			<g clipPath={url('head')}>
				<g fill={K.skinShade} transform="translate(6 12)">
					{hairShapes(frontPuffs, frontTufts)}
				</g>
			</g>
			<g clipPath={url('head')}>{hairUnion(frontPuffs, frontTufts)}</g>
			<g clipPath={url('hair')}>
				{shines}
				{silverTemples}
			</g>
			{ears.map((e) => (e && e.front ? e.el : null))}

			{glasses?.frames}
			<FaceBrowsAndSweat
				proj={proj}
				face={face}
				k={K}
				browWidth={FACE_CFG.browWidth}
				browY={-0.31}
				browAngles={[7, 21, 35]}
			/>
		</g>
	);
};
