import React from 'react';
import {
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
export type Pt = {readonly x: number; readonly y: number; readonly z: number};
export type T3 = readonly [number, number, number];

export type FacePalette = {
	readonly outline: string;
	readonly skin: string;
	readonly skinShade: string;
	readonly blush: string;
	readonly hair: string;
	readonly eyeWhite: string;
	readonly pupil: string;
	readonly mouth: string;
	readonly tongue: string;
	readonly teeth: string;
	readonly sweat: string;
};

export type GlassesShape = 'round' | 'roundedSquare' | 'rectangular' | 'oval' | 'catEye';

export type GlassesSpec = {
	readonly shape: GlassesShape;
	readonly frameColor: string;
	readonly lensColor: string;
	readonly lensX: number;
	readonly eyeY: number;
	readonly lensW: number;
	readonly lensH: number;
	readonly frameWidth?: number;
	readonly lensOpacity?: number;
	readonly browlineAccent?: boolean;
};

export type SkullShapeParams = {
	/** Horizontal lower-jaw taper (0.03 = broad square jaw, 0.12 = oval, 0.2 = V-chin). */
	readonly jawTaper?: number;
	/** Depth taper for side view (0.05..0.15). */
	readonly jawZ?: number;
	/** Squircle exponent blend (0 = classic oval, 0.7..0.85 = strong square jaw). */
	readonly jawSquare?: number;
	/** Lower chin reach multiplier (1.01 default). */
	readonly chinReach?: number;
	/** Upper cranium width/height balance (1 default). */
	readonly crownScale?: number;
};

export type FaceConfig = {
	readonly sx: number;
	readonly sz: number;
	readonly eyeA: number;
	readonly eyeY: number;
	readonly erx: number;
	readonly ery: number;
	readonly pupilRadius?: number;
	readonly mouthY?: number;
	readonly mouthScale?: number;
	readonly blushA?: number;
	readonly blushY?: number;
	readonly blushRx?: number;
	readonly blushRy?: number;
	readonly blushOpacity?: number;
	readonly browWidth?: number;
	readonly eyelashes?: boolean | 'feminine';
};

export const ell = (cx: number, cy: number, rx: number, ry: number) =>
	`M ${cx - rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx + rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx - rx} ${cy} Z`;

type MouthDef = {
	readonly d: string;
	readonly open?: boolean;
	readonly teethTop?: number;
	readonly teethBottom?: number;
	readonly tongue?: readonly [number, number, number, number];
	readonly width?: number;
	readonly blep?: boolean;
};

export const MOUTHS: Record<MouthShape, MouthDef> = {
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

export const JAW: Partial<Record<MouthShape, number>> = {
	jawDrop: 0.3,
	laugh: 0.08,
	shout: 0.06,
	aa: 0.04,
	surprised: 0.04,
};

export type HeadProjection = {
	readonly P: (p: V3) => Pt;
	readonly sph: (aDeg: number, y: number, r?: number) => V3;
	readonly facing: (aDeg: number) => number;
	readonly sinYaw: number;
	readonly cosYaw: number;
	readonly crx: number;
};

/** Builds spherical projection helpers for a 3D head turned by `yaw` and `nod`. */
export const createHeadProjection = (yaw: number, nod: number, sx: number, sz: number): HeadProjection => {
	const P = (p: V3): Pt => {
		const q = rotX(rotY(v3(p.x * sx, p.y, p.z * sz), yaw), -nod);
		return {x: q.x * R, y: q.y * R, z: q.z};
	};
	const sph = (aDeg: number, y: number, r = 1): V3 => {
		const rho = Math.sqrt(Math.max(0, r * r - y * y));
		return v3(rho * Math.sin(aDeg * D2R), y, rho * Math.cos(aDeg * D2R));
	};
	const facing = (aDeg: number) => Math.cos((aDeg + yaw) * D2R);
	const sinYaw = Math.sin(yaw * D2R);
	const cosYaw = Math.cos(yaw * D2R);
	const crx = Math.hypot(sx * cosYaw, sz * sinYaw) * R;
	return {P, sph, facing, sinYaw, cosYaw, crx};
};

/** Smooth oval or squared skull + jaw contour that reacts to yaw, nod, and wide mouth shapes. */
export const buildSkullPath = (
	proj: HeadProjection,
	nod: number,
	jaw: number,
	sx: number,
	sz: number,
	grow = 0,
	shape: SkullShapeParams = {},
): string => {
	const n = 48;
	const pts: P2[] = [];
	const jawTaper = shape.jawTaper ?? 0.12;
	const jawZ = shape.jawZ ?? 0.1;
	const jawSquare = shape.jawSquare ?? 0;
	const chinReach = shape.chinReach ?? 1.01;
	const crownScale = shape.crownScale ?? 1;
	const sqExp = lerp(1, 0.72, clamp(jawSquare, 0, 1));
	const nodShift = Math.sin(-nod * D2R) * 0.12 * R;
	const yReach = lerp(0.86, chinReach + jaw * 0.9, (proj.cosYaw + 1) / 2);
	for (let i = 0; i < n; i++) {
		const th = (i / n) * Math.PI * 2;
		const s = Math.sin(th);
		const c = -Math.cos(th);
		if (c <= 0) {
			pts.push([s * (proj.crx + grow), c * (R * crownScale + grow)]);
		} else {
			const sShape = jawSquare > 0 ? Math.sign(s) * Math.pow(Math.abs(s), sqExp) : s;
			const cShape = jawSquare > 0 ? Math.pow(c, sqExp) : c;
			const taperX = 1 - jawTaper * c * c;
			const taperZ = 1 - jawZ * c * c;
			const rx = sx * taperX;
			const rz = sz * taperZ;
			const hw = Math.hypot(rx * proj.cosYaw, rz * proj.sinYaw) * R + grow;
			const cz = 0.11 * c * (2 - c) * sz * proj.sinYaw * R;
			const sideSlope = sShape * proj.sinYaw * 0.05 * c * R;
			const y = cShape * yReach * R + sideSlope + c * nodShift + grow * c;
			pts.push([cz + sShape * hw, y]);
		}
	}
	return smoothPath(pts);
};

/** Evaluates a piecewise hairline height curve over azimuth angle `aDeg`. */
export const evalHairline = (curve: readonly P2[], aDeg: number): number => {
	const a = Math.abs(aDeg);
	for (let i = 1; i < curve.length; i++) {
		if (a <= curve[i][0]) {
			const [a0, y0] = curve[i - 1];
			const [a1, y1] = curve[i];
			const t = (a - a0) / (a1 - a0);
			return y0 + (y1 - y0) * t * t * (3 - 2 * t);
		}
	}
	return curve[curve.length - 1][1];
};

/** Projects the scalp hair cap boundary seen from the current head yaw. */
export const buildHairCapPath = (proj: HeadProjection, hairlineCurve: readonly P2[], rCap: number): string => {
	const n = 120;
	const pts: Pt[] = [];
	for (let i = 0; i < n; i++) {
		const a = -180 + (360 * i) / n;
		pts.push(proj.P(proj.sph(a, evalHairline(hairlineCurve, a))));
	}
	let entry = -1;
	for (let i = 0; i < n; i++) {
		if (pts[(i - 1 + n) % n].z < 0 && pts[i].z >= 0) {
			entry = i;
			break;
		}
	}
	if (entry === -1) {
		return pts[0].z >= 0 ? smoothPath(pts.map((p): P2 => [p.x, p.y])) : ell(0, 0, rCap * proj.crx, rCap * R);
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
	const a0 = Math.atan2(last[1] / R, last[0] / proj.crx);
	const a1 = Math.atan2(first[1] / R, first[0] / proj.crx);
	const tau = Math.PI * 2;
	const mod = (x: number) => ((x % tau) + tau) % tau;
	const ccw = mod(a1 - a0);
	const sweep = mod(-Math.PI / 2 - a0) <= ccw ? ccw : -(tau - ccw);
	const steps = Math.max(2, Math.ceil(Math.abs(sweep) / (6 * D2R)));
	for (let k = 0; k <= steps; k++) {
		const ang = a0 + (sweep * k) / steps;
		run.push([Math.cos(ang) * rCap * proj.crx, Math.sin(ang) * rCap * R]);
	}
	return polyPath(run);
};

/** Tapered hair tuft path between projected 3D base and tip points. */
export const buildTuftPath = (b: Pt, t: Pt, w: number, bend: number): string => {
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

/** Ears projected onto the sides of the head, sorted behind/in front by yaw. */
export const buildEars = (proj: HeadProjection, k: FacePalette) =>
	([1, -1] as const).map((s) => {
		const a = s * 90;
		const f = proj.facing(a);
		if (f < -0.35) {
			return null;
		}
		const c = proj.P(proj.sph(a, 0.12, 0.98));
		const out = Math.sign(Math.sin((a + Math.atan2(proj.sinYaw, proj.cosYaw) / D2R) * D2R) - 0.5 * proj.sinYaw) || s;
		const x = c.x + out * 0.05 * R * (1 - Math.max(0, f));
		const scaleK = 0.7 + 0.3 * Math.abs(f);
		return {
			front: f > 0.25,
			el: (
				<g key={`ear${s}`} transform={`translate(${x} ${c.y}) scale(${out * scaleK} 1)`}>
					<path
						d="M -4 -27 C 22 -34 34 -6 24 14 C 18 28 4 32 -4 26 Z"
						fill={k.skin}
						stroke={k.outline}
						strokeWidth={OW}
						strokeLinejoin="round"
					/>
					<path
						d="M 4 -14 C 16 -14 20 2 12 10"
						fill="none"
						stroke={k.skinShade}
						strokeWidth={5}
						strokeLinecap="round"
					/>
				</g>
			),
		};
	});

/** Renders facial eyes, blushes, tears, and mouth inside the head clip mask. */
export const FaceInnerFeatures: React.FC<{
	readonly proj: HeadProjection;
	readonly face: FaceSpec;
	readonly blink: number;
	readonly jaw: number;
	readonly cfg: FaceConfig;
	readonly k: FacePalette;
	readonly uid: string;
}> = ({proj, face, blink, jaw, cfg, k, uid}) => {
	const id = (n: string) => `${uid}-${n}`;
	const url = (n: string) => `url(#${id(n)})`;

	const renderEye = (s: 1 | -1) => {
		const spec = s === 1 ? face.eyeL : face.eyeR;
		const a = s * cfg.eyeA;
		const f = proj.facing(a);
		if (f < 0.08) {
			return null;
		}
		const c = proj.P(proj.sph(a, cfg.eyeY));
		const tr = `translate(${c.x} ${c.y}) scale(${Math.max(f, 0.25)} 1)`;
		const wide = Math.max(0, spec.open - 1);
		const rx = cfg.erx * (1 + wide * 0.35);
		const ry = cfg.ery * (1 + wide * 0.55);

		if (spec.shape === 'happy') {
			return (
				<g key={`eye${s}`} transform={tr}>
					<path
						d={`M ${-rx * 0.9} ${ry * 0.25} Q 0 ${-ry * 0.75} ${rx * 0.9} ${ry * 0.25}`}
						fill="none"
						stroke={k.outline}
						strokeWidth={8}
						strokeLinecap="round"
					/>
					{cfg.eyelashes === 'feminine' ? (
						<path
							d={`M ${s * rx * 0.82} ${ry * 0.08} Q ${s * rx * 1.18} ${-ry * 0.12} ${s * rx * 1.25} ${-ry * 0.32}`}
							fill="none"
							stroke={k.outline}
							strokeWidth={5.5}
							strokeLinecap="round"
						/>
					) : cfg.eyelashes ? (
						<path
							d={`M ${s * rx * 0.82} ${ry * 0.08} Q ${s * rx * 1.15} ${-ry * 0.12} ${s * rx * 1.22} ${-ry * 0.3}`}
							fill="none"
							stroke={k.outline}
							strokeWidth={5}
							strokeLinecap="round"
						/>
					) : null}
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
					<path d={polyPath(starPts)} fill="#ffd447" stroke={k.outline} strokeWidth={5} strokeLinejoin="round" />
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
						stroke={k.outline}
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
						stroke={k.outline}
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
						stroke={k.outline}
						strokeWidth={7.5}
						strokeLinecap="round"
					/>
					{cfg.eyelashes === 'feminine' ? (
						<path
							d={`M ${s * rx * 0.85} ${ry * 0.18} Q ${s * rx * 1.18} ${ry * 0.05} ${s * rx * 1.26} ${-ry * 0.12}`}
							fill="none"
							stroke={k.outline}
							strokeWidth={5.5}
							strokeLinecap="round"
						/>
					) : null}
				</g>
			);
		}

		const tiltSlope = Math.tan(spec.tilt * D2R) * -s;
		const w = rx + 8;
		const lookX = clamp(face.lookX + proj.sinYaw * 0.5, -1, 1);
		const pr = (cfg.pupilRadius ?? 0.12) * R * spec.pupil;
		const px = lookX * rx * 0.42;
		const py = clamp(face.lookY, -1, 1) * ry * 0.4;
		const lidVisible = yU - Math.abs(tiltSlope) * w > -ry;

		return (
			<g key={`eye${s}`} transform={tr}>
				<clipPath id={id(`eye${s}`)}>
					<ellipse cx={0} cy={0} rx={rx} ry={ry} />
				</clipPath>
				<ellipse cx={0} cy={0} rx={rx} ry={ry} fill={k.eyeWhite} />
				<g clipPath={url(`eye${s}`)}>
					<circle cx={px} cy={py} r={pr} fill={k.pupil} />
					<circle cx={px - pr * 0.36} cy={py - pr * 0.42} r={pr * 0.34} fill="#fff" />
					<circle cx={px + pr * 0.38} cy={py + pr * 0.4} r={pr * 0.15} fill="#fff" />
					{lidVisible ? (
						<>
							<path
								d={`M ${-w} ${-ry - 40} L ${w} ${-ry - 40} L ${w} ${yU + tiltSlope * w} L ${-w} ${yU - tiltSlope * w} Z`}
								fill={k.skin}
							/>
							<line x1={-w} y1={yU - tiltSlope * w} x2={w} y2={yU + tiltSlope * w} stroke={k.outline} strokeWidth={6} />
						</>
					) : null}
					{spec.lower > 0.01 ? (
						<>
							<path d={`M ${-w} ${ry + 40} L ${w} ${ry + 40} L ${w} ${yL} L ${-w} ${yL} Z`} fill={k.skin} />
							<line x1={-w} y1={yL} x2={w} y2={yL} stroke={k.outline} strokeWidth={4} />
						</>
					) : null}
				</g>
				<ellipse cx={0} cy={0} rx={rx} ry={ry} fill="none" stroke={k.outline} strokeWidth={4.5} />
				{lidVisible ? null : (
					<path
						d={`M ${-rx * 0.97} ${-ry * 0.25} A ${rx} ${ry} 0 0 1 ${rx * 0.97} ${-ry * 0.25}`}
						fill="none"
						stroke={k.outline}
						strokeWidth={7.5}
						strokeLinecap="round"
					/>
				)}
				{cfg.eyelashes === 'feminine' ? (
					<>
						<path
							d={`M ${s * rx * 0.82} ${-ry * 0.48} Q ${s * rx * 1.16} ${-ry * 0.65} ${s * rx * 1.25} ${-ry * 0.88}`}
							fill="none"
							stroke={k.outline}
							strokeWidth={5.5}
							strokeLinecap="round"
						/>
						<path
							d={`M ${s * rx * 0.94} ${-ry * 0.18} Q ${s * rx * 1.2} ${-ry * 0.3} ${s * rx * 1.28} ${-ry * 0.48}`}
							fill="none"
							stroke={k.outline}
							strokeWidth={4.8}
							strokeLinecap="round"
						/>
					</>
				) : cfg.eyelashes ? (
					<path
						d={`M ${s * rx * 0.84} ${-ry * 0.42} Q ${s * rx * 1.12} ${-ry * 0.58} ${s * rx * 1.2} ${-ry * 0.78}`}
						fill="none"
						stroke={k.outline}
						strokeWidth={4.8}
						strokeLinecap="round"
					/>
				) : null}
			</g>
		);
	};

	const renderMouth = () => {
		const a = face.mouthX * 14;
		const f = proj.facing(a);
		if (f < -0.1) {
			return null;
		}
		const def = MOUTHS[face.mouth];
		const ms = cfg.mouthScale ?? 1;
		const baseMouthY = cfg.mouthY ?? (ms < 1 ? 0.59 : 0.6);
		const c = proj.P(proj.sph(a, baseMouthY + jaw * 0.35));
		return (
			<g transform={`translate(${c.x} ${c.y}) scale(${Math.max(f, 0.38) * ms} ${ms})`}>
				{def.open ? (
					<>
						<clipPath id={id('mouth')}>
							<path d={def.d} />
						</clipPath>
						<path d={def.d} fill={k.mouth} />
						<g clipPath={url('mouth')}>
							{def.tongue ? (
								<ellipse cx={def.tongue[0]} cy={def.tongue[1]} rx={def.tongue[2]} ry={def.tongue[3]} fill={k.tongue} />
							) : null}
							{def.teethTop === undefined ? null : (
								<rect x={-60} y={-60} width={120} height={60 + def.teethTop} fill={k.teeth} />
							)}
							{def.teethBottom === undefined ? null : (
								<rect x={-60} y={def.teethBottom} width={120} height={60} fill={k.teeth} />
							)}
						</g>
						<path d={def.d} fill="none" stroke={k.outline} strokeWidth={5} strokeLinejoin="round" />
					</>
				) : (
					<>
						{def.blep ? (
							<>
								<path
									d="M -13 3 L -13 18 A 13 14 0 0 0 13 18 L 13 3 Z"
									fill={k.tongue}
									stroke={k.outline}
									strokeWidth={4.5}
									strokeLinejoin="round"
								/>
								<line x1={0} y1={5} x2={0} y2={19} stroke={k.outline} strokeWidth={3.5} strokeLinecap="round" />
							</>
						) : null}
						<path
							d={def.d}
							fill="none"
							stroke={k.outline}
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
		const a = s * (cfg.blushA ?? 40);
		const f = proj.facing(a);
		if (f < 0.1 || face.blush <= 0.01) {
			return null;
		}
		const c = proj.P(proj.sph(a, cfg.blushY ?? 0.4));
		return (
			<ellipse
				key={`blush${s}`}
				cx={c.x}
				cy={c.y}
				rx={(cfg.blushRx ?? 0.12) * R * f}
				ry={(cfg.blushRy ?? 0.06) * R}
				fill={k.blush}
				opacity={face.blush * (cfg.blushOpacity ?? 0.55)}
			/>
		);
	});

	const tears = ([1, -1] as const).map((s) => {
		const tearAmt = face.tears ?? 0;
		const a = s * (cfg.eyeA + 10);
		const f = proj.facing(a);
		if (tearAmt <= 0.01 || f < 0.1) {
			return null;
		}
		const c = proj.P(proj.sph(a, cfg.eyeY + 0.19, 1.02));
		return (
			<path
				key={`tear${s}`}
				transform={`translate(${c.x} ${c.y}) rotate(${s * -14}) scale(${Math.max(f, 0.45)} 1)`}
				d="M 0 -14 C 5 -4 10 3 10 9 C 10 15 5 19 0 19 C -5 19 -10 15 -10 9 C -10 3 -5 -4 0 -14 Z"
				fill={k.sweat}
				stroke={k.outline}
				strokeWidth={3.8}
				opacity={tearAmt}
			/>
		);
	});

	return (
		<>
			{blushes}
			{renderEye(1)}
			{renderEye(-1)}
			{tears}
			{renderMouth()}
		</>
	);
};

/** 3D cartoon nose with side-profile bump. */
export const FaceNose: React.FC<{
	readonly proj: HeadProjection;
	readonly k: FacePalette;
	readonly delicate?: boolean;
}> = ({proj, k, delicate = false}) => {
	if (proj.cosYaw < -0.2) {
		return null;
	}
	const side = Math.abs(proj.sinYaw);
	const b = proj.P(v3(0, delicate ? 0.21 : 0.2, 0.98));
	const t = proj.P(v3(0, 0.32, delicate ? 1.06 : 1.07));
	const n = proj.P(v3(0, delicate ? 0.39 : 0.4, delicate ? 0.92 : 0.917));
	const bump = `M ${b.x} ${b.y} Q ${t.x} ${(b.y + t.y) / 2} ${t.x} ${t.y} Q ${t.x} ${n.y} ${n.x} ${n.y}`;
	const wingX = delicate ? 0.075 : 0.085;
	const wl = proj.P(v3(-wingX, delicate ? 0.36 : 0.37, 0.93));
	const wr = proj.P(v3(wingX, delicate ? 0.36 : 0.37, 0.93));
	const bottom = proj.P(v3(0, delicate ? 0.4 : 0.41, 0.98));
	return (
		<g>
			{side > 0.15 ? (
				<>
					<path d={`${bump} Z`} fill={k.skin} />
					<path
						d={bump}
						fill="none"
						stroke={k.outline}
						strokeWidth={delicate ? 4.8 : 5}
						strokeLinecap="round"
						opacity={clamp(side * 2.5, 0, 1)}
					/>
				</>
			) : null}
			<path
				d={`M ${wl.x} ${wl.y} Q ${bottom.x} ${bottom.y + (delicate ? 5 : 6)} ${wr.x} ${wr.y}`}
				fill="none"
				stroke={k.outline}
				strokeWidth={delicate ? 4.2 : 4.5}
				strokeLinecap="round"
				opacity={clamp(proj.cosYaw * 1.6 - 0.3, 0, 1)}
			/>
		</g>
	);
};

/** Eyebrows drawn over the upper face. */
export const FaceBrows: React.FC<{
	readonly proj: HeadProjection;
	readonly face: FaceSpec;
	readonly k: FacePalette;
	readonly browWidth?: number;
	readonly browY?: number;
	readonly browTiltFactor?: number;
	readonly browCurveFactor?: number;
	readonly browAngles?: readonly [number, number, number];
}> = ({
	proj,
	face,
	k,
	browWidth = 0.088 * R,
	browY = -0.37,
	browTiltFactor = 0.1,
	browCurveFactor = 0.05,
	browAngles = [8, 21, 34],
}) => {
	const brow = (s: 1 | -1) => {
		const b = s === 1 ? face.browL : face.browR;
		const y0 = browY - b.raise * 0.11;
		const t = Math.tan(b.tilt * D2R) * browTiltFactor;
		const inner = proj.P(proj.sph(s * browAngles[0], y0 - t, 1.02));
		const mid = proj.P(proj.sph(s * browAngles[1], y0 - b.curve * browCurveFactor, 1.02));
		const outer = proj.P(proj.sph(s * browAngles[2], y0 + t, 1.02));
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
				stroke={k.hair}
				strokeWidth={browWidth}
				strokeLinecap="round"
			/>
		);
	};

	return (
		<>
			{brow(1)}
			{brow(-1)}
		</>
	);
};

/** Stress sweat drop drawn on the temple. */
export const FaceSweat: React.FC<{
	readonly proj: HeadProjection;
	readonly face: FaceSpec;
	readonly k: FacePalette;
	readonly sweatPos?: readonly [number, number];
}> = ({proj, face, k, sweatPos = [58, -0.3]}) => {
	const fSweat = proj.facing(sweatPos[0]);
	if (face.sweat <= 0.01 || fSweat < 0.05) {
		return null;
	}
	const sweatC = proj.P(proj.sph(sweatPos[0], sweatPos[1], 1.04));
	return (
		<path
			transform={`translate(${sweatC.x} ${sweatC.y}) scale(${Math.max(fSweat, 0.4)} 1)`}
			d="M 0 -18 C 6 -6 12 2 12 8 C 12 15 6 20 0 20 C -6 20 -12 15 -12 8 C -12 2 -6 -6 0 -18 Z"
			fill={k.sweat}
			stroke={k.outline}
			strokeWidth={4}
			opacity={face.sweat}
		/>
	);
};

/** Eyebrows and stress sweat drop drawn over the upper face / frames. */
export const FaceBrowsAndSweat: React.FC<{
	readonly proj: HeadProjection;
	readonly face: FaceSpec;
	readonly k: FacePalette;
	readonly browWidth?: number;
	readonly browY?: number;
	readonly browTiltFactor?: number;
	readonly browCurveFactor?: number;
	readonly browAngles?: readonly [number, number, number];
	readonly sweatPos?: readonly [number, number];
}> = ({proj, face, k, sweatPos, ...browProps}) => (
	<>
		<FaceBrows proj={proj} face={face} k={k} {...browProps} />
		<FaceSweat proj={proj} face={face} k={k} sweatPos={sweatPos} />
	</>
);

/** Computes 3D projected glasses components (lens tint, temple arms, front rims). */
export const buildGlassesParts = (proj: HeadProjection, spec: GlassesSpec, sx: number) => {
	const lensScale = Math.max(Math.abs(proj.cosYaw), 0.12);
	const rx = spec.lensW * R;
	const ry = spec.lensH * R;
	const lensRx = spec.lensW / sx;
	const frameW = spec.frameWidth ?? 0.052 * R;
	const cornerR =
		spec.shape === 'round' || spec.shape === 'oval' ? rx : spec.shape === 'roundedSquare' ? rx * 0.42 : rx * 0.22;
	const catPath = `M ${-rx} ${-ry * 0.55} Q 0 ${-ry * 0.92} ${rx * 1.12} ${-ry * 1.05} Q ${rx * 1.06} ${ry * 0.72} 0 ${ry * 0.95} Q ${-rx * 0.96} ${ry * 0.85} ${-rx} ${-ry * 0.55} Z`;

	const lenses = ([1, -1] as const)
		.map((s) => ({s, c: proj.P(v3(s * spec.lensX, spec.eyeY, 1.02))}))
		.filter((l) => l.c.z > -0.05);

	const temples = ([1, -1] as const).map((s) => {
		const h = proj.P(v3(s * (spec.lensX + lensRx * 0.96), spec.eyeY - 0.06, 0.92));
		const e = proj.P(v3(s * 0.97, 0.03, -0.12));
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
					stroke={spec.frameColor}
					strokeWidth={6}
					strokeLinecap="round"
				/>
			),
		};
	});

	const bridgeA = proj.P(v3(spec.lensX - lensRx, spec.eyeY - 0.06, 1.02));
	const bridgeB = proj.P(v3(lensRx - spec.lensX, spec.eyeY - 0.06, 1.02));
	const bridgeC = proj.P(v3(0, spec.eyeY - 0.12, 1.06));
	const tintOpacity = spec.lensOpacity ?? 0.36;

	const tints = lenses.map(({s, c}) =>
		spec.shape === 'round' || spec.shape === 'oval' ? (
			<ellipse
				key={`tint${s}`}
				cx={c.x}
				cy={c.y}
				rx={rx * lensScale}
				ry={ry}
				fill={spec.lensColor}
				opacity={tintOpacity}
			/>
		) : spec.shape === 'catEye' ? (
			<g key={`tint${s}`} transform={`translate(${c.x} ${c.y}) scale(${lensScale * s} 1)`}>
				<path d={catPath} fill={spec.lensColor} opacity={tintOpacity} />
			</g>
		) : (
			<rect
				key={`tint${s}`}
				x={c.x - rx * lensScale}
				y={c.y - ry}
				width={rx * 2 * lensScale}
				height={ry * 2}
				rx={cornerR * lensScale}
				ry={cornerR}
				fill={spec.lensColor}
				opacity={tintOpacity}
			/>
		),
	);

	const frames = (
		<>
			{temples.filter((t) => t.show && !t.back).map((t) => t.el)}
			{lenses.map(({s, c}) => (
				<g key={`lens${s}`} transform={`translate(${c.x} ${c.y}) scale(${lensScale} 1)`}>
					{spec.shape === 'round' || spec.shape === 'oval' ? (
						<>
							<path
								d={`M ${-0.8 * rx} ${-0.33 * ry} A ${0.86 * rx} ${0.86 * ry} 0 0 1 ${-0.42 * rx} ${-0.75 * ry}`}
								fill="none"
								stroke="#ffffff"
								strokeWidth={5}
								strokeLinecap="round"
								opacity={0.7}
							/>
							<ellipse cx={0} cy={0} rx={rx} ry={ry} fill="none" stroke={spec.frameColor} strokeWidth={frameW} />
						</>
					) : spec.shape === 'catEye' ? (
						<g transform={`scale(${s} 1)`}>
							<line
								x1={-0.55 * rx}
								y1={-0.3 * ry}
								x2={-0.18 * rx}
								y2={-0.65 * ry}
								stroke="#ffffff"
								strokeWidth={5}
								strokeLinecap="round"
								opacity={0.68}
							/>
							<path d={catPath} fill="none" stroke={spec.frameColor} strokeWidth={frameW} strokeLinejoin="round" />
						</g>
					) : (
						<>
							<line
								x1={-0.62 * rx}
								y1={-0.35 * ry}
								x2={-0.25 * rx}
								y2={-0.68 * ry}
								stroke="#ffffff"
								strokeWidth={5}
								strokeLinecap="round"
								opacity={0.68}
							/>
							<rect
								x={-rx}
								y={-ry}
								width={rx * 2}
								height={ry * 2}
								rx={cornerR}
								ry={cornerR}
								fill="none"
								stroke={spec.frameColor}
								strokeWidth={frameW}
							/>
							{spec.browlineAccent ? (
								<path
									d={`M ${-rx * 0.92} ${-ry + 1} L ${rx * 0.92} ${-ry + 1}`}
									fill="none"
									stroke={spec.frameColor}
									strokeWidth={frameW * 1.45}
									strokeLinecap="round"
								/>
							) : null}
						</>
					)}
				</g>
			))}
			{lenses.length === 2 ? (
				<path
					d={`M ${bridgeA.x} ${bridgeA.y} Q ${bridgeC.x} ${bridgeC.y} ${bridgeB.x} ${bridgeB.y}`}
					fill="none"
					stroke={spec.frameColor}
					strokeWidth={frameW}
					strokeLinecap="round"
				/>
			) : null}
		</>
	);

	return {
		backTemples: temples.filter((t) => t.show && t.back).map((t) => t.el),
		tints,
		frames,
	};
};

export type HairPuff = {readonly c: T3; readonly r: number};
export type HairTuft = {readonly b: T3; readonly t: T3; readonly w: number; readonly bend: number};

/** Reusable 3D hair-and-skull head shell shared across character rigs. */
export const HairHeadShell: React.FC<{
	readonly yaw: number;
	readonly nod: number;
	readonly face: FaceSpec;
	readonly blink: number;
	readonly uid: string;
	readonly faceCfg: FaceConfig;
	readonly skullShape?: SkullShapeParams;
	readonly k: FacePalette & {readonly hairShine: string};
	readonly hairline: readonly P2[];
	readonly rCap?: number;
	readonly puffs: readonly HairPuff[];
	readonly tufts: readonly HairTuft[];
	readonly shines: readonly (readonly T3[])[];
	readonly glasses?: GlassesSpec | null;
	readonly delicateNose?: boolean;
	readonly browY?: number;
	readonly browAngles?: readonly [number, number, number];
	readonly hideEars?: boolean;
	readonly extraBack?: React.ReactNode;
	readonly extraFace?: React.ReactNode;
	readonly extraHairBack?: React.ReactNode;
	readonly extraHairFront?: React.ReactNode;
	readonly extraTop?: React.ReactNode;
}> = ({
	yaw,
	nod,
	face,
	blink,
	uid,
	faceCfg,
	skullShape,
	k,
	hairline,
	rCap = 1.035,
	puffs: puffDefs,
	tufts: tuftDefs,
	shines: shineDefs,
	glasses: glassesSpec,
	delicateNose = false,
	browY,
	browAngles,
	hideEars = false,
	extraBack,
	extraFace,
	extraHairBack,
	extraHairFront,
	extraTop,
}) => {
	const proj = createHeadProjection(yaw, nod, faceCfg.sx, faceCfg.sz);
	const jaw = JAW[face.mouth] ?? 0;
	const id = (n: string) => `${uid}-${n}`;
	const url = (n: string) => `url(#${id(n)})`;

	const skullD = buildSkullPath(proj, nod, jaw, faceCfg.sx, faceCfg.sz, 0, skullShape);
	const cap = buildHairCapPath(proj, hairline, rCap);

	const puffs = puffDefs.map((p) => ({...proj.P(v3(p.c[0], p.c[1], p.c[2])), r: p.r * R}));
	const tufts = tuftDefs.map((t) => {
		const b = proj.P(v3(t.b[0], t.b[1], t.b[2]));
		return {
			d: buildTuftPath(b, proj.P(v3(t.t[0], t.t[1], t.t[2])), t.w * R, t.bend),
			z: b.z,
		};
	});

	const frontPuffs = puffs.filter((p) => p.z > 0.06);
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
			<g fill={k.outline} stroke={k.outline} strokeWidth={OW * 2} strokeLinejoin="round">
				{hairShapes(ps, ts)}
			</g>
			<g fill={k.hair}>{hairShapes(ps, ts)}</g>
		</>
	);

	const shines = shineDefs.map((line, i) => {
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
				stroke={k.hairShine}
				strokeWidth={0.055 * R}
				strokeLinecap="round"
			/>
		);
	});

	const ears = hideEars ? [] : buildEars(proj, k);
	const glasses = glassesSpec ? buildGlassesParts(proj, glassesSpec, faceCfg.sx) : null;

	return (
		<g>
			<defs>
				<clipPath id={id('head')}>
					<path d={skullD} />
				</clipPath>
				<clipPath id={id('hair')}>{hairShapes(puffs, tufts)}</clipPath>
			</defs>

			<g fill={k.outline} stroke={k.outline} strokeWidth={OW * 2}>
				<path d={skullD} />
			</g>

			{extraBack}
			{hairUnion(puffs, tufts)}
			{extraHairBack ? <g clipPath={url('hair')}>{extraHairBack}</g> : null}
			{glasses?.backTemples}
			{ears.map((e) => (e && !e.front ? e.el : null))}

			<g fill={k.skinShade}>
				<path d={skullD} />
			</g>
			<g clipPath={url('head')}>
				<g fill={k.skin} transform={`translate(${-0.07 * R} ${-0.06 * R})`}>
					<path d={skullD} />
				</g>
			</g>

			<g clipPath={url('head')}>
				{glasses?.tints}
				<FaceInnerFeatures proj={proj} face={face} blink={blink} jaw={jaw} cfg={faceCfg} k={k} uid={uid} />
				{extraFace}
			</g>
			<FaceNose proj={proj} k={k} delicate={delicateNose} />

			<g clipPath={url('head')}>
				<g fill={k.skinShade} transform="translate(6 12)">
					{hairShapes(frontPuffs, frontTufts)}
				</g>
			</g>
			<g clipPath={url('head')}>{hairUnion(frontPuffs, frontTufts)}</g>
			<g clipPath={url('hair')}>
				{shines}
				{extraHairFront}
			</g>
			{ears.map((e) => (e && e.front ? e.el : null))}

			{glasses?.frames}
			<FaceBrowsAndSweat
				proj={proj}
				face={face}
				k={k}
				browWidth={faceCfg.browWidth}
				browY={browY}
				browAngles={browAngles}
			/>
			{extraTop}
		</g>
	);
};
