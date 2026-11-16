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
	smile: {d: 'M -28 -4 Q 0 17 28 -4'},
	rest: {d: 'M -22 0 Q 0 9 22 0'},
	neutral: {d: 'M -20 2 Q 0 6 20 2'},
	flat: {d: 'M -18 3 L 18 3'},
	frown: {d: 'M -24 10 Q 0 -7 24 10'},
	smirk: {d: 'M -22 5 Q 4 10 26 -7 M 23 -14 Q 29 -8 28 -2'},
	wavy: {d: 'M -26 3 Q -13 -6 0 3 Q 13 12 26 3'},
	mbp: {d: 'M -20 3 Q 0 0 20 3', width: 8},
	open: {
		d: 'M -28 -6 Q 0 0 28 -6 Q 26 28 0 32 Q -26 28 -28 -6 Z',
		open: true,
		teethTop: 6,
		tongue: [0, 29, 16, 10],
	},
	grin: {
		d: 'M -34 -8 Q 0 -2 34 -8 Q 28 24 0 26 Q -28 24 -34 -8 Z',
		open: true,
		teethTop: 7,
		tongue: [0, 25, 14, 8],
	},
	laugh: {
		d: 'M -34 -10 Q 0 -4 34 -10 Q 30 42 0 46 Q -30 42 -34 -10 Z',
		open: true,
		teethTop: 4,
		tongue: [0, 41, 20, 12],
	},
	aa: {
		d: 'M -22 -8 Q 0 -12 22 -8 Q 24 32 0 36 Q -24 32 -22 -8 Z',
		open: true,
		teethTop: -3,
		tongue: [0, 32, 14, 9],
	},
	ee: {
		d: 'M -28 -4 Q 0 -8 28 -4 Q 24 13 0 15 Q -24 13 -28 -4 Z',
		open: true,
		teethTop: 3,
		teethBottom: 9,
	},
	oh: {d: ell(0, 6, 14, 17), open: true, tongue: [0, 20, 9, 5]},
	oo: {d: ell(0, 4, 8.5, 10.5), open: true},
	fv: {d: 'M -22 0 Q 0 -6 22 0 Q 18 10 0 11 Q -18 10 -22 0 Z', open: true, teethTop: 7},
	l: {
		d: 'M -22 -6 Q 0 -10 22 -6 Q 22 24 0 26 Q -22 24 -22 -6 Z',
		open: true,
		teethTop: -1,
		tongue: [0, 6, 12, 9],
	},
	etc: {
		d: 'M -24 -3 Q 0 -6 24 -3 Q 20 9 0 10 Q -20 9 -24 -3 Z',
		open: true,
		teethTop: 2,
		teethBottom: 6,
	},
	surprised: {d: ell(0, 8, 12, 16), open: true, tongue: [0, 21, 8, 5]},
	jawDrop: {
		d: 'M -19 -6 Q 0 -10 19 -6 Q 25 56 0 70 Q -25 56 -19 -6 Z',
		open: true,
		teethTop: -2,
		tongue: [0, 62, 15, 9],
	},
	shout: {
		d: 'M -28 -6 Q 0 -14 28 -6 L 24 21 Q 0 15 -24 21 Z',
		open: true,
		teethTop: 2,
		teethBottom: 13,
	},
	clench: {
		d: 'M -26 -5 Q 0 -8 26 -5 L 23 14 Q 0 17 -23 14 Z',
		open: true,
		teethTop: 6,
		teethBottom: 6,
	},
	tongueOut: {
		d: 'M -26 -3 Q 0 13 26 -3',
		blep: true,
	},
	kiss: {
		d: 'M -5 -9 C 7 -9 9 -1 -1 1 C 9 3 7 12 -5 11',
	},
};

/** How far the chin drops for big mouth shapes (head units). */
const JAW: Partial<Record<MouthShape, number>> = {
	jawDrop: 0.28,
	laugh: 0.08,
	shout: 0.06,
	aa: 0.04,
	surprised: 0.04,
};

const SX = 0.84;
const SZ = 0.92;
const EYE_A = 23.5;
const EYE_Y = 0.05;
const ERX = 0.185 * R;
const ERY = 0.23 * R;

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

/** The hijabi head, drawn around its center (0, 0). */
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

	const jaw = JAW[face.mouth] ?? 0;
	const nodShift = Math.sin(-nod * D2R) * 0.12 * R;

	// --- outer hijab hood + back bun (cepol) -----------------------------
	const hoodPath = () => {
		const n = 48;
		const pts: P2[] = [];
		const hrx = crx * 1.1;
		const hryTop = R * 1.07;
		const yReach = lerp(0.95, 1.06 + jaw * 0.9, (cosYaw + 1) / 2);
		for (let i = 0; i < n; i++) {
			const th = (i / n) * Math.PI * 2;
			const s = Math.sin(th);
			const c = -Math.cos(th);
			if (c <= 0) {
				// Slight pointed arch at the top crown of the hijab
				const arch = Math.pow(Math.max(0, -c), 3) * 0.04 * R;
				pts.push([s * hrx, c * hryTop - arch + nodShift * 0.3]);
			} else {
				const taper = 1 - 0.08 * c * c;
				const hw = hrx * taper;
				const cz = 0.08 * c * (2 - c) * SZ * sinYaw * R;
				const y = c * yReach * R + c * nodShift;
				pts.push([cz + s * hw, y]);
			}
		}
		return smoothPath(pts);
	};
	const hoodD = hoodPath();
	// Back bun (cepol) under the hijab, visible in 3/4 and side views
	const bunC = P(v3(0, -0.14, -0.68));
	const bunR = 0.46 * R * Math.pow(Math.abs(sinYaw), 0.7);
	const showBun = Math.abs(sinYaw) > 0.18;

	const hoodShapes = () => (
		<>
			{showBun ? <circle cx={bunC.x} cy={bunC.y} r={bunR} /> : null}
			<path d={hoodD} />
		</>
	);

	// --- front face opening inside the hijab -----------------------------
	const showFace = cosYaw > -0.35;
	const faceOpeningPath = () => {
		const n = 48;
		const pts: P2[] = [];
		// Shift the face opening towards the front (+sinYaw) when the head turns
		const fcx = sinYaw * (0.28 + 0.42 * (1 - Math.max(0, cosYaw))) * R;
		const frx = (0.76 * Math.max(0, cosYaw) + 0.6 * (1 - Math.abs(cosYaw))) * R;
		const yTop = -0.66 * R + nodShift * 0.8;
		const yBot = (0.97 + jaw * 0.9) * R + nodShift;
		const yMid = (yTop + yBot) * 0.44;
		const ryU = yMid - yTop;
		const ryL = yBot - yMid;
		for (let i = 0; i < n; i++) {
			const th = (i / n) * Math.PI * 2;
			const s = Math.sin(th);
			const c = -Math.cos(th);
			if (c <= 0) {
				// Peaked hijab arch at the forehead center
				const peak = Math.pow(Math.max(0, -c), 2.2) * 0.05 * R * Math.max(0, cosYaw);
				pts.push([fcx + s * frx, yMid + c * ryU - peak]);
			} else {
				const taper = 1 - 0.14 * c * c;
				const cz = 0.08 * c * (2 - c) * sinYaw * R;
				pts.push([fcx + cz + s * frx * taper, yMid + c * ryL]);
			}
		}
		return smoothPath(pts);
	};
	const faceD = showFace ? faceOpeningPath() : '';

	// --- eyes (with feminine curved eyelashes) ---------------------------
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
					<path
						d={`M ${s * rx * 0.82} ${ry * 0.08} Q ${s * rx * 1.18} ${-ry * 0.12} ${s * rx * 1.25} ${-ry * 0.32}`}
						fill="none"
						stroke={K.outline}
						strokeWidth={5.5}
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
					<path
						d={`M ${s * rx * 0.85} ${ry * 0.18} Q ${s * rx * 1.18} ${ry * 0.05} ${s * rx * 1.26} ${-ry * 0.12}`}
						fill="none"
						stroke={K.outline}
						strokeWidth={5.5}
						strokeLinecap="round"
					/>
				</g>
			);
		}
		const k = Math.tan(spec.tilt * D2R) * -s;
		const w = rx + 8;
		const lookX = clamp(face.lookX + sinYaw * 0.5, -1, 1);
		const pr = 0.122 * R * spec.pupil;
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
					<circle cx={px - pr * 0.36} cy={py - pr * 0.42} r={pr * 0.36} fill="#fff" />
					<circle cx={px + pr * 0.38} cy={py + pr * 0.4} r={pr * 0.16} fill="#fff" />
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
				{/* Feminine upper outer eyelashes */}
				<path
					d={`M ${s * rx * 0.82} ${-ry * 0.48} Q ${s * rx * 1.16} ${-ry * 0.65} ${s * rx * 1.25} ${-ry * 0.88}`}
					fill="none"
					stroke={K.outline}
					strokeWidth={5.5}
					strokeLinecap="round"
				/>
				<path
					d={`M ${s * rx * 0.94} ${-ry * 0.18} Q ${s * rx * 1.2} ${-ry * 0.3} ${s * rx * 1.28} ${-ry * 0.48}`}
					fill="none"
					stroke={K.outline}
					strokeWidth={4.8}
					strokeLinecap="round"
				/>
			</g>
		);
	};

	// --- brows -------------------------------------------------------------
	const brow = (s: 1 | -1) => {
		const b = s === 1 ? face.browL : face.browR;
		const y0 = -0.35 - b.raise * 0.1;
		const t = Math.tan(b.tilt * D2R) * 0.09;
		const inner = P(sph(s * 9, y0 - t, 1.02));
		const mid = P(sph(s * 21, y0 - b.curve * 0.055, 1.02));
		const outer = P(sph(s * 33, y0 + t, 1.02));
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
				strokeWidth={0.075 * R}
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
		const b = P(v3(0, 0.21, 0.98));
		const t = P(v3(0, 0.32, 1.06));
		const n = P(v3(0, 0.39, 0.92));
		const bump = `M ${b.x} ${b.y} Q ${t.x} ${(b.y + t.y) / 2} ${t.x} ${t.y} Q ${t.x} ${n.y} ${n.x} ${n.y}`;
		const wl = P(v3(-0.075, 0.36, 0.93));
		const wr = P(v3(0.075, 0.36, 0.93));
		const bottom = P(v3(0, 0.4, 0.98));
		return (
			<g>
				{side > 0.15 ? (
					<>
						<path d={`${bump} Z`} fill={K.skin} />
						<path
							d={bump}
							fill="none"
							stroke={K.outline}
							strokeWidth={4.8}
							strokeLinecap="round"
							opacity={clamp(side * 2.5, 0, 1)}
						/>
					</>
				) : null}
				<path
					d={`M ${wl.x} ${wl.y} Q ${bottom.x} ${bottom.y + 5} ${wr.x} ${wr.y}`}
					fill="none"
					stroke={K.outline}
					strokeWidth={4.2}
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
		const c = P(sph(a, 0.59 + jaw * 0.35));
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
		const a = s * 36;
		const f = facing(a);
		if (f < 0.1 || face.blush <= 0.01) {
			return null;
		}
		const c = P(sph(a, 0.36));
		return (
			<ellipse
				key={`blush${s}`}
				cx={c.x}
				cy={c.y}
				rx={0.125 * R * f}
				ry={0.065 * R}
				fill={K.blush}
				opacity={face.blush * 0.6}
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
		const f = facing(52);
		if (face.sweat <= 0.01 || f < 0.05) {
			return null;
		}
		const c = P(sph(52, -0.26, 1.04));
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

	// Ciput (inner underscarf) band at the top of the forehead
	const ciputC = P(v3(0, -0.58, 0.85));

	return (
		<g>
			<defs>
				<clipPath id={id('hood')}>{hoodShapes()}</clipPath>
				{showFace ? (
					<clipPath id={id('face')}>
						<path d={faceD} />
					</clipPath>
				) : null}
			</defs>

			{/* Outer hijab hood outline + fill */}
			<g fill={K.outline} stroke={K.outline} strokeWidth={OW * 2} strokeLinejoin="round">
				{hoodShapes()}
			</g>
			<g fill={K.hijabShade}>{hoodShapes()}</g>
			<g clipPath={url('hood')}>
				<g fill={K.hijab} transform={`translate(${-0.06 * R} ${-0.05 * R})`}>
					{hoodShapes()}
				</g>
				{/* Soft hijab crown highlight & fabric crease lines */}
				<path
					d={`M ${-0.42 * crx} ${-0.84 * R} Q 0 ${-0.98 * R} ${0.42 * crx} ${-0.84 * R}`}
					fill="none"
					stroke={K.hairShine}
					strokeWidth={0.055 * R}
					strokeLinecap="round"
					opacity={0.75}
				/>
				{showBun ? (
					<path
						d={`M ${bunC.x - sinYaw * 0.12 * R} ${bunC.y - 0.28 * R} Q ${bunC.x - sinYaw * 0.25 * R} ${bunC.y} ${bunC.x - sinYaw * 0.1 * R} ${bunC.y + 0.28 * R}`}
						fill="none"
						stroke={K.hijabShade}
						strokeWidth={5}
						strokeLinecap="round"
					/>
				) : null}
			</g>

			{/* Face inside the hijab opening */}
			{showFace ? (
				<g clipPath={url('hood')}>
					{/* Soft shadow cast by the hijab onto the neck/chin */}
					<path d={faceD} fill={K.hijabShade} transform="translate(0 12)" />
					{/* Face outline & shaded skin */}
					<path d={faceD} fill={K.skinShade} stroke={K.outline} strokeWidth={OW * 1.7} strokeLinejoin="round" />
					<g clipPath={url('face')}>
						<path d={faceD} fill={K.skin} transform={`translate(${-0.06 * R} ${-0.05 * R})`} />

						{/* Ciput (underscarf) peeking at the top forehead */}
						{cosYaw > 0.15 ? (
							<ellipse
								cx={ciputC.x}
								cy={ciputC.y - 10}
								rx={0.68 * crx}
								ry={0.22 * R}
								fill={K.hijabInner}
								stroke={K.outline}
								strokeWidth={4.5}
							/>
						) : null}

						{/* Soft shadow from the top hijab edge onto the forehead */}
						<path
							d={faceD}
							fill="none"
							stroke={K.skinShade}
							strokeWidth={14}
							transform="translate(0 6)"
						/>

						{blushes}
						{eye(1)}
						{eye(-1)}
						{tears}
						{brow(1)}
						{brow(-1)}
						{mouth()}
					</g>
					{/* Re-stroke the hijab face opening edge & outer hood outline */}
					<path d={faceD} fill="none" stroke={K.outline} strokeWidth={OW * 1.15} strokeLinejoin="round" />
					<path d={hoodD} fill="none" stroke={K.outline} strokeWidth={OW} strokeLinejoin="round" />
				</g>
			) : null}

			{nose()}
			{sweat()}
		</g>
	);
};
