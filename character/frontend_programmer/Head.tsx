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

const SX = 0.85;
const SZ = 0.93;
const FACE_CFG: FaceConfig = {
	sx: SX,
	sz: SZ,
	eyeA: 24,
	eyeY: 0.055,
	erx: 0.18 * R,
	ery: 0.225 * R,
	browWidth: 0.082 * R,
	eyelashes: true,
};

/** Hairline height per azimuth (0 = forehead, 90 = ear, 180 = nape). */
const HAIRLINE: readonly P2[] = [
	[0, -0.62],
	[28, -0.58],
	[52, -0.45],
	[72, -0.18],
	[88, 0.04],
	[112, 0.28],
	[142, 0.68],
	[180, 0.84],
];

/** Layered tousled medium-length volume around crown, sides, and nape. */
const PUFFS: readonly {c: T3; r: number}[] = [
	{c: [-0.28, -0.84, 0.22], r: 0.35},
	{c: [0.3, -0.86, 0.2], r: 0.36},
	{c: [0.02, -0.9, -0.14], r: 0.38},
	{c: [-0.54, -0.56, -0.12], r: 0.34},
	{c: [0.56, -0.54, -0.12], r: 0.35},
	{c: [-0.46, -0.12, -0.42], r: 0.34},
	{c: [0.48, -0.1, -0.42], r: 0.34},
	{c: [0, -0.42, -0.56], r: 0.42},
	{c: [-0.34, 0.24, -0.58], r: 0.33},
	{c: [0.36, 0.24, -0.58], r: 0.33},
	{c: [0, 0.26, -0.66], r: 0.38},
];

/** Swept parted fringe & playful side/nape flicks (clear of brows and glasses). */
const TUFTS: readonly {b: T3; t: T3; w: number; bend: number; accent?: boolean}[] = [
	// Left parted swoop across upper temple
	{b: [-0.08, -0.82, 0.62], t: [-0.88, -0.16, 0.56], w: 0.34, bend: 0.22},
	// Right signature swoop framing the side of the face
	{b: [-0.04, -0.86, 0.62], t: [0.9, -0.05, 0.52], w: 0.38, bend: -0.24},
	// Electric-cyan front highlight lock nested inside the right swoop
	{b: [0.16, -0.84, 0.64], t: [0.84, -0.2, 0.58], w: 0.14, bend: -0.2, accent: true},
	// Crown cowlick / volume flick
	{b: [0.08, -1.08, 0.02], t: [0.44, -1.28, -0.12], w: 0.2, bend: -0.14},
	// Back layered nape flicks
	{b: [-0.44, 0.28, -0.56], t: [-0.86, 0.56, -0.54], w: 0.22, bend: 0.15},
	{b: [0.46, 0.28, -0.56], t: [0.88, 0.56, -0.54], w: 0.22, bend: -0.15},
];

const SHINES: readonly (readonly T3[])[] = [
	[
		[-0.38, -0.92, 0.52],
		[-0.02, -1.08, 0.48],
		[0.4, -0.96, 0.46],
	],
	[
		[-0.36, -0.7, -0.74],
		[0, -0.82, -0.76],
		[0.36, -0.7, -0.74],
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

/** Frontend Programmer head: layered tousled hair with cyan highlight + rounded-square glasses. */
export const Head: React.FC<HeadProps> = ({yaw, nod, face, blink, uid, showGlasses = true}) => {
	const proj = createHeadProjection(yaw, nod, SX, SZ);
	const jaw = JAW[face.mouth] ?? 0;
	const id = (n: string) => `${uid}-${n}`;
	const url = (n: string) => `url(#${id(n)})`;

	const skullD = buildSkullPath(proj, nod, jaw, SX, SZ, 0);
	const cap = buildHairCapPath(proj, HAIRLINE, 1.04);

	const puffs = PUFFS.map((p) => ({...proj.P(v3(p.c[0], p.c[1], p.c[2])), r: p.r * R}));
	const tufts = TUFTS.map((t) => {
		const b = proj.P(v3(t.b[0], t.b[1], t.b[2]));
		return {
			d: buildTuftPath(b, proj.P(v3(t.t[0], t.t[1], t.t[2])), t.w * R, t.bend),
			z: b.z,
			accent: Boolean(t.accent),
		};
	});

	const frontPuffs = puffs.filter((p) => p.z > 0.08);
	const frontTufts = tufts.filter((t) => t.z > 0.1);
	const accentTufts = tufts.filter((t) => t.accent && t.z > 0.1);
	const baseTufts = tufts.filter((t) => !t.accent);
	const frontBaseTufts = frontTufts.filter((t) => !t.accent);

	const hairBaseShapes = (ps: typeof puffs, ts: typeof tufts) => (
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
				{hairBaseShapes(ps, ts)}
			</g>
			<g fill={K.hair}>{hairBaseShapes(ps, ts)}</g>
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
	const glasses = showGlasses
		? buildGlassesParts(
				proj,
				{
					shape: 'roundedSquare',
					frameColor: K.frame,
					lensColor: K.lens,
					lensX: 0.405,
					eyeY: FACE_CFG.eyeY,
					lensW: 0.265,
					lensH: 0.24,
					frameWidth: 0.05 * R,
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
				<clipPath id={id('hair')}>{hairBaseShapes(puffs, baseTufts)}</clipPath>
			</defs>

			{/* Skull outline sits behind hair */}
			<g fill={K.outline} stroke={K.outline} strokeWidth={OW * 2}>
				<path d={skullD} />
			</g>

			{/* Back hair silhouette */}
			{hairUnion(puffs, baseTufts)}
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
			</g>
			<FaceNose proj={proj} k={K} />

			{/* Front hair + cyan highlight streak */}
			<g clipPath={url('head')}>
				<g fill={K.skinShade} transform="translate(5 10)">
					{hairBaseShapes(frontPuffs, frontBaseTufts)}
				</g>
			</g>
			<g clipPath={url('head')}>{hairUnion(frontPuffs, frontBaseTufts)}</g>
			<g clipPath={url('hair')}>{shines}</g>
			{accentTufts.map((t, i) => (
				<path
					key={`accent${i}`}
					d={t.d}
					fill={K.hairAccent}
					stroke={K.outline}
					strokeWidth={4.5}
					strokeLinejoin="round"
				/>
			))}
			{ears.map((e) => (e && e.front ? e.el : null))}

			{glasses?.frames}
			<FaceBrowsAndSweat proj={proj} face={face} k={K} browWidth={FACE_CFG.browWidth} />
		</g>
	);
};
