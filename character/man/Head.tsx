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
	type T3,
} from '../shared/face';
import {COLORS as K, OW, R, smoothPath, v3, type FaceSpec, type P2} from './rig';

const SX = 0.86;
const SZ = 0.94;
const FACE_CFG: FaceConfig = {
	sx: SX,
	sz: SZ,
	eyeA: 24,
	eyeY: 0.06,
	erx: 0.18 * R,
	ery: 0.225 * R,
	browWidth: 0.095 * R,
};

/** Hairline height per azimuth (0 = forehead, 90 = ear, 180 = nape). */
const HAIRLINE: readonly P2[] = [
	[0, -0.58],
	[25, -0.6],
	[50, -0.48],
	[70, -0.25],
	[80, 0],
	[88, 0],
	[95, -0.13],
	[108, -0.1],
	[125, 0.32],
	[150, 0.6],
	[180, 0.75],
];

/** Volume of the swept-up quiff: big on top, short at the sides and back. */
const PUFFS: readonly {c: T3; r: number}[] = [
	{c: [0.12, -0.9, 0.3], r: 0.38},
	{c: [-0.32, -0.84, 0.25], r: 0.32},
	{c: [0.5, -0.74, 0.18], r: 0.34},
	{c: [0.05, -0.82, -0.2], r: 0.42},
	{c: [-0.42, -0.64, -0.12], r: 0.34},
	{c: [0.46, -0.6, -0.2], r: 0.36},
	{c: [0, -0.35, -0.62], r: 0.4},
	{c: [-0.45, -0.25, -0.45], r: 0.32},
	{c: [0.45, -0.25, -0.45], r: 0.32},
];

/** Strands: base, tip, width, bend. The first one is the signature swoop. */
const TUFTS: readonly {b: T3; t: T3; w: number; bend: number}[] = [
	{b: [-0.38, -0.78, 0.58], t: [0.62, -1.26, 0.32], w: 0.4, bend: -0.22},
	{b: [0.05, -1.18, 0.15], t: [0.5, -1.4, 0], w: 0.22, bend: -0.12},
	{b: [0.4, -1.05, 0.15], t: [0.86, -1.12, 0.05], w: 0.22, bend: -0.1},
	{b: [-0.08, -0.86, 0.66], t: [-0.22, -0.56, 0.86], w: 0.12, bend: -0.15},
	{b: [0.45, -0.85, -0.35], t: [0.75, -1.05, -0.45], w: 0.18, bend: 0.1},
];

const SHINES: readonly (readonly T3[])[] = [
	[
		[-0.3, -0.92, 0.62],
		[0.05, -1.1, 0.55],
		[0.4, -1.12, 0.4],
	],
	[
		[0.42, -0.98, 0.42],
		[0.62, -0.95, 0.3],
	],
	[
		[-0.3, -0.75, -0.75],
		[0, -0.85, -0.72],
		[0.3, -0.78, -0.72],
	],
];

export type HeadProps = {
	/** Total head turn in degrees (body yaw + head yaw). */
	readonly yaw: number;
	/** Degrees, + = looking down. */
	readonly nod: number;
	readonly face: FaceSpec;
	/** Eye openness multiplier from blinking, 0..1. */
	readonly blink: number;
	readonly uid: string;
};

/** The head, drawn around its center (0, 0). */
export const Head: React.FC<HeadProps> = ({yaw, nod, face, blink, uid}) => {
	const proj = createHeadProjection(yaw, nod, SX, SZ);
	const jaw = JAW[face.mouth] ?? 0;
	const id = (n: string) => `${uid}-${n}`;
	const url = (n: string) => `url(#${id(n)})`;

	const skullD = buildSkullPath(proj, nod, jaw, SX, SZ, 0);
	const cap = buildHairCapPath(proj, HAIRLINE, 1.035);

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

	const ears = buildEars(proj, K);
	const glasses = buildGlassesParts(
		proj,
		{
			shape: 'round',
			frameColor: K.frame,
			lensColor: K.lens,
			lensX: 0.425,
			eyeY: FACE_CFG.eyeY,
			lensW: 0.282,
			lensH: 0.282,
			frameWidth: 0.05 * R,
			lensOpacity: 0.4,
		},
		SX,
	);

	return (
		<g>
			<defs>
				<clipPath id={id('head')}>
					<path d={skullD} />
				</clipPath>
				<clipPath id={id('hair')}>{hairShapes(puffs, tufts)}</clipPath>
			</defs>

			{/* Skull outline sits under the hair, so it only shows where there is no hair */}
			<g fill={K.outline} stroke={K.outline} strokeWidth={OW * 2}>
				<path d={skullD} />
			</g>

			{/* Back hair: the full hair silhouette */}
			{hairUnion(puffs, tufts)}
			{glasses.backTemples}
			{ears.map((e) => (e && !e.front ? e.el : null))}

			{/* Skull with a soft shade on the side away from the light */}
			<g fill={K.skinShade}>
				<path d={skullD} />
			</g>
			<g clipPath={url('head')}>
				<g fill={K.skin} transform={`translate(${-0.07 * R} ${-0.06 * R})`}>
					<path d={skullD} />
				</g>
			</g>

			{/* Face. The lens tint goes behind the eyes so they stay crisp. */}
			<g clipPath={url('head')}>
				{glasses.tints}
				<FaceInnerFeatures proj={proj} face={face} blink={blink} jaw={jaw} cfg={FACE_CFG} k={K} uid={uid} />
			</g>
			<FaceNose proj={proj} k={K} />

			{/* Front hair over the forehead, with its shadow */}
			<g clipPath={url('head')}>
				<g fill={K.skinShade} transform="translate(6 12)">
					{hairShapes(frontPuffs, frontTufts)}
				</g>
			</g>
			<g clipPath={url('head')}>{hairUnion(frontPuffs, frontTufts)}</g>
			<g clipPath={url('hair')}>{shines}</g>
			{ears.map((e) => (e && e.front ? e.el : null))}

			{glasses.frames}
			<FaceBrowsAndSweat proj={proj} face={face} k={K} browWidth={FACE_CFG.browWidth} />
		</g>
	);
};
