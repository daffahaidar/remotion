import React from 'react';
import {
	COLORS as K,
	D2R,
	OW,
	R,
	clamp,
	lerp,
	polyPath,
	rotX,
	rotY,
	smoothPath,
	v3,
	type FaceSpec,
	type MouthShape,
	type P2,
	type V3,
} from './rig';

/** Projected point: x/y in px relative to the head center, z = facing (-1..1). */
type Pt = {readonly x: number; readonly y: number; readonly z: number};
type T3 = readonly [number, number, number];

// ---------------------------------------------------------------------------
// Hair, in head units (R = 1). x = character's left, y down, z forward.
// ---------------------------------------------------------------------------

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

const hairline = (aDeg: number) => {
	const a = Math.abs(aDeg);
	for (let i = 1; i < HAIRLINE.length; i++) {
		if (a <= HAIRLINE[i][0]) {
			const [a0, y0] = HAIRLINE[i - 1];
			const [a1, y1] = HAIRLINE[i];
			const t = (a - a0) / (a1 - a0);
			return y0 + (y1 - y0) * t * t * (3 - 2 * t);
		}
	}
	return HAIRLINE[HAIRLINE.length - 1][1];
};

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

// ---------------------------------------------------------------------------
// Mouths, in px around the mouth center.
// ---------------------------------------------------------------------------

const ell = (cx: number, cy: number, rx: number, ry: number) =>
	`M ${cx - rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx + rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx - rx} ${cy} Z`;

type MouthDef = {
	readonly d: string;
	readonly open?: boolean;
	/** Bottom edge of the upper teeth. */
	readonly teethTop?: number;
	/** Top edge of the lower teeth. */
	readonly teethBottom?: number;
	readonly tongue?: readonly [number, number, number, number];
	readonly width?: number;
	readonly blep?: boolean;
};

const MOUTHS: Record<MouthShape, MouthDef> = {
	smile: {d: 'M -30 -4 Q 0 18 30 -4'},
	rest: {d: 'M -24 0 Q 0 10 24 0'},
	neutral: {d: 'M -22 2 Q 0 6 22 2'},
	flat: {d: 'M -19 3 L 19 3'},
	frown: {d: 'M -26 10 Q 0 -8 26 10'},
	smirk: {d: 'M -24 5 Q 4 11 28 -8 M 25 -15 Q 31 -9 30 -2'},
	wavy: {d: 'M -28 3 Q -14 -7 0 3 Q 14 13 28 3'},
	mbp: {d: 'M -22 3 Q 0 0 22 3', width: 8},
	open: {
		d: 'M -30 -6 Q 0 0 30 -6 Q 28 30 0 34 Q -28 30 -30 -6 Z',
		open: true,
		teethTop: 6,
		tongue: [0, 31, 17, 11],
	},
	grin: {
		d: 'M -36 -8 Q 0 -2 36 -8 Q 30 26 0 28 Q -30 26 -36 -8 Z',
		open: true,
		teethTop: 8,
		tongue: [0, 27, 15, 8],
	},
	laugh: {
		d: 'M -36 -10 Q 0 -4 36 -10 Q 32 44 0 48 Q -32 44 -36 -10 Z',
		open: true,
		teethTop: 4,
		tongue: [0, 43, 21, 13],
	},
	aa: {
		d: 'M -24 -8 Q 0 -12 24 -8 Q 26 34 0 38 Q -26 34 -24 -8 Z',
		open: true,
		teethTop: -3,
		tongue: [0, 34, 15, 10],
	},
	ee: {
		d: 'M -30 -4 Q 0 -8 30 -4 Q 26 14 0 16 Q -26 14 -30 -4 Z',
		open: true,
		teethTop: 3,
		teethBottom: 10,
	},
	oh: {d: ell(0, 6, 15, 18), open: true, tongue: [0, 21, 10, 6]},
	oo: {d: ell(0, 4, 9, 11), open: true},
	fv: {d: 'M -24 0 Q 0 -6 24 0 Q 20 10 0 11 Q -20 10 -24 0 Z', open: true, teethTop: 8},
	l: {
		d: 'M -24 -6 Q 0 -10 24 -6 Q 24 26 0 28 Q -24 26 -24 -6 Z',
		open: true,
		teethTop: -1,
		tongue: [0, 6, 13, 10],
	},
	etc: {
		d: 'M -26 -3 Q 0 -6 26 -3 Q 22 9 0 10 Q -22 9 -26 -3 Z',
		open: true,
		teethTop: 2,
		teethBottom: 6,
	},
	surprised: {d: ell(0, 8, 13, 17), open: true, tongue: [0, 22, 8, 5]},
	jawDrop: {
		d: 'M -20 -6 Q 0 -10 20 -6 Q 27 60 0 74 Q -27 60 -20 -6 Z',
		open: true,
		teethTop: -2,
		tongue: [0, 66, 16, 10],
	},
	shout: {
		d: 'M -30 -6 Q 0 -14 30 -6 L 26 22 Q 0 16 -26 22 Z',
		open: true,
		teethTop: 2,
		teethBottom: 14,
	},
	clench: {
		d: 'M -28 -5 Q 0 -8 28 -5 L 25 15 Q 0 18 -25 15 Z',
		open: true,
		teethTop: 6,
		teethBottom: 6,
	},
	tongueOut: {
		d: 'M -28 -3 Q 0 14 28 -3',
		blep: true,
	},
	kiss: {
		d: 'M -5 -9 C 7 -9 9 -1 -1 1 C 9 3 7 12 -5 11',
	},
};

/** How far the chin drops for big mouth shapes (head units). */
const JAW: Partial<Record<MouthShape, number>> = {
	jawDrop: 0.3,
	laugh: 0.08,
	shout: 0.06,
	aa: 0.04,
	surprised: 0.04,
};

const SX = 0.86;
const SZ = 0.94;
const EYE_A = 24;
const EYE_Y = 0.06;
const ERX = 0.18 * R;
const ERY = 0.225 * R;
const LENS = 0.282 * R;
/** Lens center distance from the nose, head units (before SX). */
const LENS_X = 0.425;
const LENS_RX = LENS / (R * SX);

const tuftPath = (b: Pt, t: Pt, w: number, bend: number) => {
	const dx = t.x - b.x;
	const dy = t.y - b.y;
	const l = Math.hypot(dx, dy) || 1;
	const nx = -dy / l;
	const ny = dx / l;
	const hw = w / 2;
	const mx = (b.x + t.x) / 2 + nx * bend * l;
	const my = (b.y + t.y) / 2 + ny * bend * l;
	return `M ${b.x + nx * hw} ${b.y + ny * hw} Q ${mx + nx * hw * 0.6} ${my + ny * hw * 0.6} ${t.x} ${t.y} Q ${mx - nx * hw * 0.6} ${my - ny * hw * 0.6} ${b.x - nx * hw} ${b.y - ny * hw} Z`;
};

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
	const P = (p: V3): Pt => {
		const q = rotX(rotY(v3(p.x * SX, p.y, p.z * SZ), yaw), -nod);
		return {x: q.x * R, y: q.y * R, z: q.z};
	};
	const sph = (aDeg: number, y: number, r = 1): V3 => {
		const rho = Math.sqrt(Math.max(0, r * r - y * y));
		return v3(rho * Math.sin(aDeg * D2R), y, rho * Math.cos(aDeg * D2R));
	};
	const facing = (aDeg: number) => Math.cos((aDeg + yaw) * D2R);
	const sinYaw = Math.sin(yaw * D2R);
	const cosYaw = Math.cos(yaw * D2R);
	const crx = Math.hypot(SX * cosYaw, SZ * sinYaw) * R;
	const id = (n: string) => `${uid}-${n}`;
	const url = (n: string) => `url(#${id(n)})`;

	// --- skull + jaw (smooth oval contour) -------------------------------
	const jaw = JAW[face.mouth] ?? 0;
	const skullPath = (grow: number) => {
		const n = 48;
		const pts: P2[] = [];
		const nodShift = Math.sin(-nod * D2R) * 0.12 * R;
		const yReach = lerp(0.86, 1.01 + jaw * 0.9, (cosYaw + 1) / 2);
		for (let i = 0; i < n; i++) {
			const th = (i / n) * Math.PI * 2;
			const s = Math.sin(th);
			const c = -Math.cos(th);
			if (c <= 0) {
				pts.push([s * (crx + grow), c * (R + grow)]);
			} else {
				const taperX = 1 - 0.12 * c * c;
				const taperZ = 1 - 0.1 * c * c;
				const rx = SX * taperX;
				const rz = SZ * taperZ;
				const hw = Math.hypot(rx * cosYaw, rz * sinYaw) * R + grow;
				const cz = 0.11 * c * (2 - c) * SZ * sinYaw * R;
				const sideSlope = s * sinYaw * 0.05 * c * R;
				const y = c * yReach * R + sideSlope + c * nodShift + grow * c;
				pts.push([cz + s * hw, y]);
			}
		}
		return smoothPath(pts);
	};
	const skullD = skullPath(0);
	const skull = (grow: number) => <path d={grow === 0 ? skullD : skullPath(grow)} />;

	// --- hair cap: scalp area above the hairline, seen from this angle ----
	const capPath = (rCap: number) => {
		const n = 120;
		const pts: Pt[] = [];
		for (let i = 0; i < n; i++) {
			const a = -180 + (360 * i) / n;
			pts.push(P(sph(a, hairline(a))));
		}
		let entry = -1;
		for (let i = 0; i < n; i++) {
			if (pts[(i - 1 + n) % n].z < 0 && pts[i].z >= 0) {
				entry = i;
				break;
			}
		}
		if (entry === -1) {
			return pts[0].z >= 0
				? smoothPath(pts.map((p): P2 => [p.x, p.y]))
				: ell(0, 0, rCap * crx, rCap * R);
		}
		const edge = (p: Pt, q: Pt): P2 => {
			const t = p.z / (p.z - q.z);
			return [p.x + (q.x - p.x) * t, p.y + (q.y - p.y) * t];
		};
		const run: P2[] = [edge(pts[(entry - 1 + n) % n], pts[entry])];
		let i = entry;
		while (pts[i % n].z >= 0 && i < entry + n) {
			run.push([pts[i % n].x, pts[i % n].y]);
			i++;
		}
		run.push(edge(pts[(i - 1) % n], pts[i % n]));
		const first = run[0];
		const last = run[run.length - 1];
		const a0 = Math.atan2(last[1] / R, last[0] / crx);
		const a1 = Math.atan2(first[1] / R, first[0] / crx);
		const tau = Math.PI * 2;
		const mod = (x: number) => ((x % tau) + tau) % tau;
		const ccw = mod(a1 - a0);
		const sweep = mod(-Math.PI / 2 - a0) <= ccw ? ccw : -(tau - ccw);
		const steps = Math.max(2, Math.ceil(Math.abs(sweep) / (6 * D2R)));
		for (let k = 0; k <= steps; k++) {
			const ang = a0 + (sweep * k) / steps;
			run.push([Math.cos(ang) * rCap * crx, Math.sin(ang) * rCap * R]);
		}
		return polyPath(run);
	};
	const cap = capPath(1.035);
	const puffs = PUFFS.map((p) => ({...P(v3(p.c[0], p.c[1], p.c[2])), r: p.r * R}));
	const tufts = TUFTS.map((t) => {
		const b = P(v3(t.b[0], t.b[1], t.b[2]));
		return {d: tuftPath(b, P(v3(t.t[0], t.t[1], t.t[2])), t.w * R, t.bend), z: b.z};
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

	// --- ears ------------------------------------------------------------
	const ears = ([1, -1] as const).map((s) => {
		const a = s * 90;
		const f = facing(a);
		if (f < -0.35) {
			return null;
		}
		const c = P(sph(a, 0.12, 0.98));
		const out = Math.sign(Math.sin((a + yaw) * D2R) - 0.5 * sinYaw) || s;
		const x = c.x + out * 0.05 * R * (1 - Math.max(0, f));
		const k = 0.7 + 0.3 * Math.abs(f);
		return {
			front: f > 0.25,
			el: (
				<g key={`ear${s}`} transform={`translate(${x} ${c.y}) scale(${out * k} 1)`}>
					<path
						d="M -4 -27 C 22 -34 34 -6 24 14 C 18 28 4 32 -4 26 Z"
						fill={K.skin}
						stroke={K.outline}
						strokeWidth={OW}
						strokeLinejoin="round"
					/>
					<path
						d="M 4 -14 C 16 -14 20 2 12 10"
						fill="none"
						stroke={K.skinShade}
						strokeWidth={5}
						strokeLinecap="round"
					/>
				</g>
			),
		};
	});

	// --- glasses -----------------------------------------------------------
	const lensScale = Math.max(Math.abs(cosYaw), 0.12);
	const lenses = ([1, -1] as const)
		.map((s) => ({s, c: P(v3(s * LENS_X, EYE_Y, 1.02))}))
		.filter((l) => l.c.z > -0.05);
	const temples = ([1, -1] as const).map((s) => {
		const h = P(v3(s * (LENS_X + LENS_RX * 0.96), -0.02, 0.92));
		const e = P(v3(s * 0.97, 0.03, -0.12));
		return {
			back: e.z < 0,
			show: h.z > -0.2,
			el: (
				<line
					key={`temple${s}`}
					x1={h.x}
					y1={h.y}
					x2={e.x}
					y2={e.y}
					stroke={K.frame}
					strokeWidth={6}
					strokeLinecap="round"
				/>
			),
		};
	});
	const bridgeA = P(v3(LENS_X - LENS_RX, 0, 1.02));
	const bridgeB = P(v3(LENS_RX - LENS_X, 0, 1.02));
	const bridgeC = P(v3(0, -0.06, 1.06));

	// --- eyes --------------------------------------------------------------
	const eye = (s: 1 | -1) => {
		const spec = s === 1 ? face.eyeL : face.eyeR;
		const a = s * EYE_A;
		const f = facing(a);
		if (f < 0.08) {
			return null;
		}
		const c = P(sph(a, EYE_Y));
		const tr = `translate(${c.x} ${c.y}) scale(${Math.max(f, 0.25)} 1)`;
		const wide = Math.max(0, spec.open - 1);
		const rx = ERX * (1 + wide * 0.35);
		const ry = ERY * (1 + wide * 0.55);
		if (spec.shape === 'happy') {
			return (
				<g key={`eye${s}`} transform={tr}>
					<path
						d={`M ${-rx * 0.9} ${ry * 0.25} Q 0 ${-ry * 0.75} ${rx * 0.9} ${ry * 0.25}`}
						fill="none"
						stroke={K.outline}
						strokeWidth={8}
						strokeLinecap="round"
					/>
				</g>
			);
		}
		if (spec.shape === 'star') {
			const sr = rx * 1.08;
			const ir = sr * 0.42;
			const starPts: P2[] = [];
			for (let i = 0; i < 10; i++) {
				const ang = -Math.PI / 2 + (i * Math.PI) / 5;
				const rad = i % 2 === 0 ? sr : ir;
				starPts.push([Math.cos(ang) * rad, Math.sin(ang) * rad]);
			}
			return (
				<g key={`eye${s}`} transform={tr}>
					<path
						d={polyPath(starPts)}
						fill="#ffd447"
						stroke={K.outline}
						strokeWidth={5}
						strokeLinejoin="round"
					/>
				</g>
			);
		}
		if (spec.shape === 'heart') {
			const hr = rx * 0.95;
			return (
				<g key={`eye${s}`} transform={tr}>
					<path
						d={`M 0 ${hr * 0.85} C ${-hr * 1.25} ${hr * 0.15} ${-hr * 1.1} ${-hr * 0.95} 0 ${-hr * 0.35} C ${hr * 1.1} ${-hr * 0.95} ${hr * 1.25} ${hr * 0.15} 0 ${hr * 0.85} Z`}
						fill="#f25774"
						stroke={K.outline}
						strokeWidth={5}
						strokeLinejoin="round"
					/>
				</g>
			);
		}
		if (spec.shape === 'dead') {
			const dr = rx * 0.72;
			return (
				<g key={`eye${s}`} transform={tr}>
					<path
						d={`M ${-dr} ${-dr} L ${dr} ${dr} M ${dr} ${-dr} L ${-dr} ${dr}`}
						fill="none"
						stroke={K.outline}
						strokeWidth={8}
						strokeLinecap="round"
					/>
				</g>
			);
		}
		const open = clamp(spec.open, 0, 1) * blink;
		const yMeet = ry * 0.2;
		const yU = lerp(-ry - 4, yMeet, 1 - open);
		const yL = lerp(ry + 4, yMeet, spec.lower);
		if (spec.shape === 'closed' || open < 0.12 || yL - yU < 5) {
			return (
				<g key={`eye${s}`} transform={tr}>
					<path
						d={`M ${-rx * 0.95} ${ry * 0.12} Q 0 ${ry * 0.55} ${rx * 0.95} ${ry * 0.12}`}
						fill="none"
						stroke={K.outline}
						strokeWidth={7.5}
						strokeLinecap="round"
					/>
				</g>
			);
		}
		const k = Math.tan(spec.tilt * D2R) * -s;
		const w = rx + 8;
		const lookX = clamp(face.lookX + sinYaw * 0.5, -1, 1);
		const pr = 0.12 * R * spec.pupil;
		const px = lookX * rx * 0.42;
		const py = clamp(face.lookY, -1, 1) * ry * 0.4;
		const lidVisible = yU - Math.abs(k) * w > -ry;
		return (
			<g key={`eye${s}`} transform={tr}>
				<clipPath id={id(`eye${s}`)}>
					<ellipse cx={0} cy={0} rx={rx} ry={ry} />
				</clipPath>
				<ellipse cx={0} cy={0} rx={rx} ry={ry} fill={K.eyeWhite} />
				<g clipPath={url(`eye${s}`)}>
					<circle cx={px} cy={py} r={pr} fill={K.pupil} />
					<circle cx={px - pr * 0.36} cy={py - pr * 0.42} r={pr * 0.34} fill="#fff" />
					<circle cx={px + pr * 0.38} cy={py + pr * 0.4} r={pr * 0.15} fill="#fff" />
					{lidVisible ? (
						<>
							<path
								d={`M ${-w} ${-ry - 40} L ${w} ${-ry - 40} L ${w} ${yU + k * w} L ${-w} ${yU - k * w} Z`}
								fill={K.skin}
							/>
							<line
								x1={-w}
								y1={yU - k * w}
								x2={w}
								y2={yU + k * w}
								stroke={K.outline}
								strokeWidth={6}
							/>
						</>
					) : null}
					{spec.lower > 0.01 ? (
						<>
							<path
								d={`M ${-w} ${ry + 40} L ${w} ${ry + 40} L ${w} ${yL} L ${-w} ${yL} Z`}
								fill={K.skin}
							/>
							<line x1={-w} y1={yL} x2={w} y2={yL} stroke={K.outline} strokeWidth={4} />
						</>
					) : null}
				</g>
				<ellipse cx={0} cy={0} rx={rx} ry={ry} fill="none" stroke={K.outline} strokeWidth={4.5} />
				{lidVisible ? null : (
					<path
						d={`M ${-rx * 0.97} ${-ry * 0.25} A ${rx} ${ry} 0 0 1 ${rx * 0.97} ${-ry * 0.25}`}
						fill="none"
						stroke={K.outline}
						strokeWidth={7.5}
						strokeLinecap="round"
					/>
				)}
			</g>
		);
	};

	// --- brows -------------------------------------------------------------
	const brow = (s: 1 | -1) => {
		const b = s === 1 ? face.browL : face.browR;
		const y0 = -0.37 - b.raise * 0.11;
		const t = Math.tan(b.tilt * D2R) * 0.1;
		const inner = P(sph(s * 8, y0 - t, 1.02));
		const mid = P(sph(s * 21, y0 - b.curve * 0.05, 1.02));
		const outer = P(sph(s * 34, y0 + t, 1.02));
		if (mid.z < 0.12) {
			return null;
		}
		const cx = 2 * mid.x - (inner.x + outer.x) / 2;
		const cy = 2 * mid.y - (inner.y + outer.y) / 2;
		return (
			<path
				key={`brow${s}`}
				d={`M ${inner.x} ${inner.y} Q ${cx} ${cy} ${outer.x} ${outer.y}`}
				fill="none"
				stroke={K.hair}
				strokeWidth={0.095 * R}
				strokeLinecap="round"
			/>
		);
	};

	// --- nose --------------------------------------------------------------
	const nose = () => {
		if (cosYaw < -0.2) {
			return null;
		}
		const side = Math.abs(sinYaw);
		const b = P(v3(0, 0.2, 0.98));
		const t = P(v3(0, 0.32, 1.07));
		const n = P(v3(0, 0.4, 0.917));
		const bump = `M ${b.x} ${b.y} Q ${t.x} ${(b.y + t.y) / 2} ${t.x} ${t.y} Q ${t.x} ${n.y} ${n.x} ${n.y}`;
		const wl = P(v3(-0.085, 0.37, 0.93));
		const wr = P(v3(0.085, 0.37, 0.93));
		const bottom = P(v3(0, 0.41, 0.98));
		return (
			<g>
				{side > 0.15 ? (
					<>
						<path d={`${bump} Z`} fill={K.skin} />
						<path
							d={bump}
							fill="none"
							stroke={K.outline}
							strokeWidth={5}
							strokeLinecap="round"
							opacity={clamp(side * 2.5, 0, 1)}
						/>
					</>
				) : null}
				<path
					d={`M ${wl.x} ${wl.y} Q ${bottom.x} ${bottom.y + 6} ${wr.x} ${wr.y}`}
					fill="none"
					stroke={K.outline}
					strokeWidth={4.5}
					strokeLinecap="round"
					opacity={clamp(cosYaw * 1.6 - 0.3, 0, 1)}
				/>
			</g>
		);
	};

	// --- mouth -------------------------------------------------------------
	const mouth = () => {
		const a = face.mouthX * 14;
		const f = facing(a);
		if (f < -0.1) {
			return null;
		}
		const def = MOUTHS[face.mouth];
		const c = P(sph(a, 0.6 + jaw * 0.35));
		return (
			<g transform={`translate(${c.x} ${c.y}) scale(${Math.max(f, 0.38)} 1)`}>
				{def.open ? (
					<>
						<clipPath id={id('mouth')}>
							<path d={def.d} />
						</clipPath>
						<path d={def.d} fill={K.mouth} />
						<g clipPath={url('mouth')}>
							{def.tongue ? (
								<ellipse
									cx={def.tongue[0]}
									cy={def.tongue[1]}
									rx={def.tongue[2]}
									ry={def.tongue[3]}
									fill={K.tongue}
								/>
							) : null}
							{def.teethTop === undefined ? null : (
								<rect x={-60} y={-60} width={120} height={60 + def.teethTop} fill={K.teeth} />
							)}
							{def.teethBottom === undefined ? null : (
								<rect x={-60} y={def.teethBottom} width={120} height={60} fill={K.teeth} />
							)}
						</g>
						<path d={def.d} fill="none" stroke={K.outline} strokeWidth={5} strokeLinejoin="round" />
					</>
				) : (
					<>
						{def.blep ? (
							<>
								<path
									d="M -13 3 L -13 18 A 13 14 0 0 0 13 18 L 13 3 Z"
									fill={K.tongue}
									stroke={K.outline}
									strokeWidth={4.5}
									strokeLinejoin="round"
								/>
								<line x1={0} y1={5} x2={0} y2={19} stroke={K.outline} strokeWidth={3.5} strokeLinecap="round" />
							</>
						) : null}
						<path
							d={def.d}
							fill="none"
							stroke={K.outline}
							strokeWidth={def.width ?? 5.5}
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</>
				)}
			</g>
		);
	};

	const blushes = ([1, -1] as const).map((s) => {
		const a = s * 40;
		const f = facing(a);
		if (f < 0.1 || face.blush <= 0.01) {
			return null;
		}
		const c = P(sph(a, 0.4));
		return (
			<ellipse
				key={`blush${s}`}
				cx={c.x}
				cy={c.y}
				rx={0.12 * R * f}
				ry={0.06 * R}
				fill={K.blush}
				opacity={face.blush * 0.55}
			/>
		);
	});

	const tears = ([1, -1] as const).map((s) => {
		const tearAmt = face.tears ?? 0;
		const a = s * (EYE_A + 10);
		const f = facing(a);
		if (tearAmt <= 0.01 || f < 0.1) {
			return null;
		}
		const c = P(sph(a, EYE_Y + 0.19, 1.02));
		return (
			<path
				key={`tear${s}`}
				transform={`translate(${c.x} ${c.y}) rotate(${s * -14}) scale(${Math.max(f, 0.45)} 1)`}
				d="M 0 -14 C 5 -4 10 3 10 9 C 10 15 5 19 0 19 C -5 19 -10 15 -10 9 C -10 3 -5 -4 0 -14 Z"
				fill={K.sweat}
				stroke={K.outline}
				strokeWidth={3.8}
				opacity={tearAmt}
			/>
		);
	});

	const sweat = () => {
		const f = facing(58);
		if (face.sweat <= 0.01 || f < 0.05) {
			return null;
		}
		const c = P(sph(58, -0.3, 1.04));
		return (
			<path
				transform={`translate(${c.x} ${c.y}) scale(${Math.max(f, 0.4)} 1)`}
				d="M 0 -18 C 6 -6 12 2 12 8 C 12 15 6 20 0 20 C -6 20 -12 15 -12 8 C -12 2 -6 -6 0 -18 Z"
				fill={K.sweat}
				stroke={K.outline}
				strokeWidth={4}
				opacity={face.sweat}
			/>
		);
	};

	const shines = SHINES.map((line, i) => {
		const pts = line.map((p) => P(v3(p[0], p[1], p[2])));
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

	return (
		<g>
			<defs>
				<clipPath id={id('head')}>{skull(0)}</clipPath>
				<clipPath id={id('hair')}>{hairShapes(puffs, tufts)}</clipPath>
			</defs>

			{/* Skull outline sits under the hair, so it only shows where there is no hair */}
			<g fill={K.outline} stroke={K.outline} strokeWidth={OW * 2}>
				{skull(0)}
			</g>

			{/* Back hair: the full hair silhouette */}
			{hairUnion(puffs, tufts)}
			{temples.filter((t) => t.show && t.back).map((t) => t.el)}
			{ears.map((e) => (e && !e.front ? e.el : null))}

			{/* Skull with a soft shade on the side away from the light */}
			<g fill={K.skinShade}>{skull(0)}</g>
			<g clipPath={url('head')}>
				<g fill={K.skin} transform={`translate(${-0.07 * R} ${-0.06 * R})`}>
					{skull(0)}
				</g>
			</g>

			{/* Face. The lens tint goes behind the eyes so they stay crisp. */}
			<g clipPath={url('head')}>
				{lenses.map(({s, c}) => (
					<ellipse
						key={`tint${s}`}
						cx={c.x}
						cy={c.y}
						rx={LENS * lensScale}
						ry={LENS}
						fill={K.lens}
						opacity={0.4}
					/>
				))}
				{blushes}
				{eye(1)}
				{eye(-1)}
				{tears}
				{mouth()}
			</g>
			{nose()}

			{/* Front hair over the forehead, with its shadow */}
			<g clipPath={url('head')}>
				<g fill={K.skinShade} transform="translate(6 12)">
					{hairShapes(frontPuffs, frontTufts)}
				</g>
			</g>
			<g clipPath={url('head')}>{hairUnion(frontPuffs, frontTufts)}</g>
			<g clipPath={url('hair')}>{shines}</g>
			{ears.map((e) => (e && e.front ? e.el : null))}

			{/* Glasses */}
			{temples.filter((t) => t.show && !t.back).map((t) => t.el)}
			{lenses.map(({s, c}) => (
				<g key={`lens${s}`} transform={`translate(${c.x} ${c.y}) scale(${lensScale} 1)`}>
					<path
						d={`M ${-0.8 * LENS} ${-0.33 * LENS} A ${0.86 * LENS} ${0.86 * LENS} 0 0 1 ${-0.42 * LENS} ${-0.75 * LENS}`}
						fill="none"
						stroke="#ffffff"
						strokeWidth={5}
						strokeLinecap="round"
						opacity={0.7}
					/>
					<circle cx={0} cy={0} r={LENS} fill="none" stroke={K.frame} strokeWidth={0.05 * R} />
				</g>
			))}
			{lenses.length === 2 ? (
				<path
					d={`M ${bridgeA.x} ${bridgeA.y} Q ${bridgeC.x} ${bridgeC.y} ${bridgeB.x} ${bridgeB.y}`}
					fill="none"
					stroke={K.frame}
					strokeWidth={0.05 * R}
					strokeLinecap="round"
				/>
			) : null}

			{brow(1)}
			{brow(-1)}
			{sweat()}
		</g>
	);
};
