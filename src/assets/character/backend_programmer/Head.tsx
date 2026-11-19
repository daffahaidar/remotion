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
import {COLORS as K, D2R, OW, R, lerp, smoothPath, v3, type FaceSpec, type P2} from './rig';

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
	[0, -0.56],
	[28, -0.56],
	[52, -0.44],
	[75, -0.18],
	[88, 0],
	[105, -0.06],
	[128, 0.36],
	[154, 0.62],
	[180, 0.76],
];

/** Fluffy tousled coder hair volume around crown and back. */
const PUFFS: readonly {c: T3; r: number}[] = [
	{c: [-0.28, -0.84, 0.24], r: 0.36},
	{c: [0.04, -0.9, 0.2], r: 0.38},
	{c: [0.34, -0.82, 0.22], r: 0.35},
	{c: [-0.52, -0.6, 0.02], r: 0.34},
	{c: [0.54, -0.58, 0.02], r: 0.34},
	{c: [0, -0.78, -0.24], r: 0.44},
	{c: [-0.46, -0.52, -0.25], r: 0.36},
	{c: [0.46, -0.52, -0.25], r: 0.36},
	{c: [0, -0.32, -0.66], r: 0.42},
	{c: [-0.44, -0.2, -0.48], r: 0.34},
	{c: [0.44, -0.2, -0.48], r: 0.34},
];

/** Messy textured curls & light forehead tufts (staying clear of glasses & brows). */
const TUFTS: readonly {b: T3; t: T3; w: number; bend: number}[] = [
	{b: [-0.34, -0.78, 0.58], t: [-0.54, -0.48, 0.78], w: 0.22, bend: -0.14},
	{b: [0.02, -0.82, 0.64], t: [-0.14, -0.52, 0.86], w: 0.18, bend: 0.16},
	{b: [0.28, -0.8, 0.6], t: [0.48, -0.5, 0.78], w: 0.22, bend: 0.14},
	{b: [-0.18, -1.04, 0.12], t: [-0.52, -1.24, 0.02], w: 0.22, bend: 0.15},
	{b: [0.24, -1.04, 0.08], t: [0.58, -1.22, -0.06], w: 0.22, bend: -0.15},
];

const SHINES: readonly (readonly T3[])[] = [
	[
		[-0.36, -0.92, 0.56],
		[0, -1.04, 0.54],
		[0.36, -0.9, 0.54],
	],
	[
		[-0.32, -0.72, -0.74],
		[0, -0.82, -0.74],
		[0.32, -0.72, -0.74],
	],
];

export type HeadProps = {
	readonly yaw: number;
	readonly nod: number;
	readonly face: FaceSpec;
	readonly blink: number;
	readonly uid: string;
	readonly showGlasses?: boolean;
	readonly showHeadphones?: boolean;
};

/** Backend Programmer head: messy textured hair + 3D studio headphones + rectangular glasses. */
export const Head: React.FC<HeadProps> = ({
	yaw,
	nod,
	face,
	blink,
	uid,
	showGlasses = true,
	showHeadphones = true,
}) => {
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

	const frontPuffs = puffs.filter((p) => p.z > 0.08);
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

	// --- 3D Over-ear studio headphones -----------------------------------
	const bandPts: P2[] = [];
	for (let i = 0; i <= 12; i++) {
		const th = -Math.PI / 2 + (i / 12) * Math.PI;
		const pt = proj.P(v3(Math.sin(th) * 1.11, 0.06 - Math.cos(th) * 1.35, -0.02));
		bandPts.push([pt.x, pt.y]);
	}
	const bandD = smoothPath(bandPts, false);

	const earcups = ([1, -1] as const).map((s) => {
		const a = s * 90;
		const f = proj.facing(a);
		if (f < -0.45) {
			return null;
		}
		const c = proj.P(v3(s * 1.07, 0.07, -0.02));
		const out = Math.sign(Math.sin((a + yaw) * D2R) - 0.5 * proj.sinYaw) || s;
		const cupRx = lerp(26, 44, Math.abs(f));
		const cupRy = 47;
		const cushionX = -out * lerp(10, 4, Math.abs(f));
		return {
			front: f > 0.25,
			el: (
				<g key={`cup${s}`} transform={`translate(${c.x} ${c.y})`}>
					{/* Soft ear cushion */}
					<ellipse
						cx={cushionX}
						cy={0}
						rx={cupRx * 0.85}
						ry={cupRy * 0.94}
						fill={K.cushion}
						stroke={K.outline}
						strokeWidth={OW}
					/>
					{/* Outer graphite shell */}
					<ellipse
						cx={0}
						cy={0}
						rx={cupRx}
						ry={cupRy}
						fill={K.headphone}
						stroke={K.outline}
						strokeWidth={OW}
					/>
					{/* Inner shade & glowing terminal emerald LED ring */}
					<ellipse
						cx={out * 3}
						cy={0}
						rx={cupRx * 0.66}
						ry={cupRy * 0.68}
						fill={K.headphoneShade}
						stroke={K.headphoneGlow}
						strokeWidth={4.5}
					/>
				</g>
			),
		};
	});

	const ears = showHeadphones ? [] : buildEars(proj, K);
	const glasses = showGlasses
		? buildGlassesParts(
				proj,
				{
					shape: 'rectangular',
					frameColor: K.frame,
					lensColor: K.lens,
					lensX: 0.4,
					eyeY: FACE_CFG.eyeY,
					lensW: 0.275,
					lensH: 0.21,
					frameWidth: 0.048 * R,
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

			{/* Back hair & behind-head accessories */}
			{hairUnion(puffs, tufts)}
			{glasses?.backTemples}
			{ears.map((e) => (e && !e.front ? e.el : null))}
			{earcups.map((e) => (e && !e.front ? e.el : null))}

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

			{/* Front hair */}
			<g clipPath={url('head')}>
				<g fill={K.skinShade} transform="translate(6 12)">
					{hairShapes(frontPuffs, frontTufts)}
				</g>
			</g>
			<g clipPath={url('head')}>{hairUnion(frontPuffs, frontTufts)}</g>
			<g clipPath={url('hair')}>{shines}</g>
			{ears.map((e) => (e && e.front ? e.el : null))}
			{showHeadphones ? (
				<>
					<path
						d={bandD}
						fill="none"
						stroke={K.outline}
						strokeWidth={28}
						strokeLinecap="round"
					/>
					<path
						d={bandD}
						fill="none"
						stroke={K.headphone}
						strokeWidth={15}
						strokeLinecap="round"
					/>
					<path
						d={bandD}
						fill="none"
						stroke={K.hairShine}
						strokeWidth={4}
						strokeLinecap="round"
						opacity={0.7}
					/>
				</>
			) : null}
			{earcups.map((e) => (e && e.front ? e.el : null))}

			{glasses?.frames}
			<FaceBrowsAndSweat proj={proj} face={face} k={K} browWidth={FACE_CFG.browWidth} />
		</g>
	);
};
