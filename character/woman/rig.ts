/**
 * Female hijabi mascot master rig: palette, proportions, 3D math and the pose/face types.
 *
 * Coordinates are rig pixels. The origin is the ground point between the feet
 * and +y points down. Body space: +x = the character's left (screen right when
 * facing the camera), +z = forward. `yaw` turns the character around the
 * vertical axis: 0 = front, 90 = facing screen right, 180 = back, -90 = left.
 */

/** Every color of the female hijabi mascot. Change a value here to restyle all videos. */
export const COLORS = {
	outline: '#1f1a1f',
	skin: '#f8d3b4',
	skinShade: '#eab48e',
	blush: '#f4908b',
	hair: '#3a252c',
	hairShine: '#f39bb4',
	hijab: '#d96b8a',
	hijabShade: '#b84d6d',
	hijabInner: '#f7ecee',
	brooch: '#ffd447',
	eyeWhite: '#ffffff',
	pupil: '#2b1e1b',
	frame: '#6b4238',
	lens: '#dcecff',
	mouth: '#7c2634',
	tongue: '#e9767a',
	teeth: '#ffffff',
	shirt: '#4cb5a7',
	shirtShade: '#369688',
	pants: '#2b3e5e',
	cuff: '#435c85',
	shoe: '#d96b8a',
	sole: '#f7f4ed',
	sweat: '#9fd3ff',
	ground: 'rgba(28, 24, 38, 0.16)',
} as const;

/** Head radius in rig pixels. Most facial measurements are fractions of R. */
export const R = 160;
/** Outline thickness. */
export const OW = 7;

export const RIG = {
	headY: -560,
	neckY: -405,
	shoulderX: 84,
	shoulderY: -372,
	hipX: 30,
	hipY: -200,
	upperArm: 84,
	forearm: 78,
	thigh: 88,
	shin: 84,
	ankleH: 30,
	armW: 36,
	legW: 58,
} as const;

// ---------------------------------------------------------------------------
// Pose & face types
// ---------------------------------------------------------------------------

export type HandShape = 'relaxed' | 'fist' | 'point' | 'open' | 'thumbsUp' | 'peace';
export type ArmLayer = 'back' | 'mid' | 'front';

/**
 * One arm. Either forward kinematics (lift/swing/bend/twist) or inverse
 * kinematics (target + pole). When `target` is set, FK values are ignored.
 */
export type ArmPose = {
	readonly hand: HandShape;
	/** FK: 0 = hanging down, 90 = horizontal, 180 = straight up. */
	readonly lift?: number;
	/** FK: plane of the lift. 0 = sideways, 90 = forward, -90 = back, 180 = across the body. */
	readonly swing?: number;
	/** FK: elbow bend, 0 = straight arm. */
	readonly bend?: number;
	/** FK: rotates the elbow-bend plane. + = up/outward, - = down/inward. */
	readonly twist?: number;
	/** IK: wrist target [outward from the body midline, y, forward]. */
	readonly target?: readonly [number, number, number];
	/** IK: direction the elbow should point [outward, down, forward]. */
	readonly pole?: readonly [number, number, number];
	/** Extra 2D rotation of the hand in degrees. */
	readonly handRoll?: number;
	/** Mirror the hand drawing (thumb on the other side). */
	readonly handFlip?: boolean;
	/** Force the drawing order of this arm. */
	readonly layer?: ArmLayer;
};

/** Ankle target: x = outward from the midline, h = height above ground, z = forward. */
export type LegPose = {
	readonly x: number;
	readonly h: number;
	readonly z: number;
	/** Toe pitch in degrees, + = toe up. */
	readonly pitch?: number;
};

/** L = the character's left (screen right when facing the camera). */
export type PoseSpec = {
	readonly armL: ArmPose;
	readonly armR: ArmPose;
	readonly legL: LegPose;
	readonly legR: LegPose;
	/** 2D lean of the upper body in degrees, + = towards screen right. */
	readonly lean?: number;
	/** Hips drop in px (knees bend to keep the feet planted). */
	readonly crouch?: number;
	/** Whole body lift in px (jumps). */
	readonly lift?: number;
	/** Shoulder raise in px. */
	readonly shrug?: number;
	readonly headTilt?: number;
	readonly headYaw?: number;
	readonly headNod?: number;
	/** Oscillates one forearm while the clip plays (waving). */
	readonly wave?: {readonly arm: 'L' | 'R'; readonly amount: number; readonly rate: number};
};

export const MOUTH_SHAPES = [
	'smile',
	'rest',
	'neutral',
	'flat',
	'frown',
	'smirk',
	'wavy',
	'mbp',
	'open',
	'grin',
	'laugh',
	'aa',
	'ee',
	'oh',
	'oo',
	'fv',
	'l',
	'etc',
	'surprised',
	'jawDrop',
	'shout',
	'clench',
	'tongueOut',
	'kiss',
] as const;
export type MouthShape = (typeof MOUTH_SHAPES)[number];

export type EyeShape = 'normal' | 'happy' | 'closed' | 'star' | 'heart' | 'dead';

export type EyeSpec = {
	/** 0 = closed, 1 = normal, >1 = wide open. */
	readonly open: number;
	/** Lower lid raise 0..1 (squint, smile). */
	readonly lower: number;
	/** Upper lid slant in degrees, + = inner corner lower (angry), - = sad. */
	readonly tilt: number;
	/** Pupil size multiplier. */
	readonly pupil: number;
	readonly shape: EyeShape;
};

export type BrowSpec = {
	/** -1 = lowered, 1 = raised. */
	readonly raise: number;
	/** Degrees, + = inner end up (worried), - = inner end down (angry). */
	readonly tilt: number;
	/** Arch amount, + = arched. */
	readonly curve: number;
};

export type FaceSpec = {
	readonly eyeL: EyeSpec;
	readonly eyeR: EyeSpec;
	readonly browL: BrowSpec;
	readonly browR: BrowSpec;
	/** Pupil direction -1..1, + = screen right / down. */
	readonly lookX: number;
	readonly lookY: number;
	readonly mouth: MouthShape;
	/** Shift the mouth sideways -1..1. */
	readonly mouthX: number;
	readonly blush: number;
	readonly sweat: number;
	readonly tears?: number;
};

// ---------------------------------------------------------------------------
// Math
// ---------------------------------------------------------------------------

export type V3 = {readonly x: number; readonly y: number; readonly z: number};
export type P2 = readonly [number, number];

export const D2R = Math.PI / 180;
export const v3 = (x: number, y: number, z: number): V3 => ({x, y, z});
export const add = (a: V3, b: V3): V3 => v3(a.x + b.x, a.y + b.y, a.z + b.z);
export const sub = (a: V3, b: V3): V3 => v3(a.x - b.x, a.y - b.y, a.z - b.z);
export const mul = (a: V3, k: number): V3 => v3(a.x * k, a.y * k, a.z * k);
export const dot = (a: V3, b: V3) => a.x * b.x + a.y * b.y + a.z * b.z;
export const cross = (a: V3, b: V3): V3 =>
	v3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
export const len = (a: V3) => Math.sqrt(dot(a, a));
export const norm = (a: V3): V3 => {
	const l = len(a);
	return l < 1e-9 ? v3(0, 1, 0) : mul(a, 1 / l);
};
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const lerpV = (a: V3, b: V3, t: number): V3 => add(a, mul(sub(b, a), t));
export const clamp = (x: number, lo: number, hi: number) =>
	Math.min(hi, Math.max(lo, x));

/** Turn around the vertical axis. + = facing turns towards screen right. */
export const rotY = (p: V3, deg: number): V3 => {
	const c = Math.cos(deg * D2R);
	const s = Math.sin(deg * D2R);
	return v3(p.x * c + p.z * s, p.y, -p.x * s + p.z * c);
};

/** Tilt around the screen x axis. + = the front moves up. */
export const rotX = (p: V3, deg: number): V3 => {
	const c = Math.cos(deg * D2R);
	const s = Math.sin(deg * D2R);
	return v3(p.x, p.y * c - p.z * s, p.y * s + p.z * c);
};

const r1 = (n: number) => Math.round(n * 10) / 10;

export const polyPath = (pts: readonly P2[], closed = true) =>
	`M ${pts.map((p) => `${r1(p[0])} ${r1(p[1])}`).join(' L ')}${closed ? ' Z' : ''}`;

/** Smooth Catmull-Rom curve through the points. */
export const smoothPath = (pts: readonly P2[], closed = true): string => {
	const n = pts.length;
	if (n < 3) {
		return polyPath(pts, closed);
	}
	const at = (i: number) => (closed ? pts[(i + n) % n] : pts[clamp(i, 0, n - 1)]);
	let d = `M ${r1(pts[0][0])} ${r1(pts[0][1])}`;
	const segments = closed ? n : n - 1;
	for (let i = 0; i < segments; i++) {
		const p0 = at(i - 1);
		const p1 = at(i);
		const p2 = at(i + 1);
		const p3 = at(i + 2);
		d += ` C ${r1(p1[0] + (p2[0] - p0[0]) / 6)} ${r1(p1[1] + (p2[1] - p0[1]) / 6)} ${r1(
			p2[0] - (p3[0] - p1[0]) / 6,
		)} ${r1(p2[1] - (p3[1] - p1[1]) / 6)} ${r1(p2[0])} ${r1(p2[1])}`;
	}
	return closed ? `${d} Z` : d;
};

/** Stadium (capsule) outline between two points. */
export const capsulePath = (a: P2, b: P2, r: number): string => {
	const dx = b[0] - a[0];
	const dy = b[1] - a[1];
	const l = Math.hypot(dx, dy);
	if (l < 0.01) {
		return `M ${r1(a[0] - r)} ${r1(a[1])} A ${r} ${r} 0 1 0 ${r1(a[0] + r)} ${r1(
			a[1],
		)} A ${r} ${r} 0 1 0 ${r1(a[0] - r)} ${r1(a[1])} Z`;
	}
	const nx = (-dy / l) * r;
	const ny = (dx / l) * r;
	return `M ${r1(a[0] + nx)} ${r1(a[1] + ny)} L ${r1(b[0] + nx)} ${r1(
		b[1] + ny,
	)} A ${r} ${r} 0 0 0 ${r1(b[0] - nx)} ${r1(b[1] - ny)} L ${r1(a[0] - nx)} ${r1(
		a[1] - ny,
	)} A ${r} ${r} 0 0 0 ${r1(a[0] + nx)} ${r1(a[1] + ny)} Z`;
};

// ---------------------------------------------------------------------------
// Kinematics
// ---------------------------------------------------------------------------

/** Root, middle joint and end of a two-bone limb, in body space. */
export type Limb = {readonly a: V3; readonly b: V3; readonly c: V3};

/** Two-bone IK. The middle joint bends towards `pole`. */
export const solveIk = (a: V3, target: V3, l1: number, l2: number, pole: V3): Limb => {
	const dv = sub(target, a);
	const dist = len(dv);
	const axis = dist < 1e-6 ? v3(0, 1, 0) : mul(dv, 1 / dist);
	const d = clamp(dist, Math.abs(l1 - l2) + 1, l1 + l2 - 0.01);
	const along = (l1 * l1 - l2 * l2 + d * d) / (2 * d);
	const h = Math.sqrt(Math.max(0, l1 * l1 - along * along));
	let p = sub(pole, mul(axis, dot(pole, axis)));
	if (len(p) < 1e-6) {
		p = cross(axis, v3(1, 0, 0));
	}
	p = norm(p);
	return {a, b: add(a, add(mul(axis, along), mul(p, h))), c: add(a, mul(axis, d))};
};

/** side: +1 = character's left, -1 = character's right. */
export const solveArm = (pose: ArmPose, side: 1 | -1, shrug: number): Limb => {
	const s = v3(side * RIG.shoulderX, RIG.shoulderY - shrug, 0);
	if (pose.target) {
		const t = pose.target;
		const p = pose.pole ?? [1, 0.4, -0.4];
		return solveIk(
			s,
			v3(side * t[0], t[1] - shrug * 0.5, t[2]),
			RIG.upperArm,
			RIG.forearm,
			v3(side * p[0], p[1], p[2]),
		);
	}
	const lift = (pose.lift ?? 0) * D2R;
	const swing = (pose.swing ?? 0) * D2R;
	const u = v3(
		side * Math.sin(lift) * Math.cos(swing),
		Math.cos(lift),
		Math.sin(lift) * Math.sin(swing),
	);
	let n = sub(v3(0, 0, 1), mul(u, u.z));
	if (len(n) < 0.15) {
		n = sub(v3(0, -1, 0), mul(u, -u.y));
	}
	n = norm(n);
	const tw = side * (pose.twist ?? 0) * D2R;
	const plane = add(mul(n, Math.cos(tw)), mul(cross(u, n), Math.sin(tw)));
	const b = (pose.bend ?? 0) * D2R;
	const fore = add(mul(u, Math.cos(b)), mul(plane, Math.sin(b)));
	const elbow = add(s, mul(u, RIG.upperArm));
	return {a: s, b: elbow, c: add(elbow, mul(fore, RIG.forearm))};
};

export const solveLeg = (pose: LegPose, side: 1 | -1, hipY: number): Limb =>
	solveIk(
		v3(side * RIG.hipX, hipY, 0),
		v3(side * pose.x, -(pose.h + RIG.ankleH), pose.z),
		RIG.thigh,
		RIG.shin,
		v3(side * 0.15, 0, 1),
	);

/** Blend two solved limbs and keep the bone lengths. */
export const blendLimb = (p: Limb, q: Limb, t: number, l1: number, l2: number): Limb => {
	const a = lerpV(p.a, q.a, t);
	const b = add(a, mul(norm(sub(lerpV(p.b, q.b, t), a)), l1));
	const c = add(b, mul(norm(sub(lerpV(p.c, q.c, t), b)), l2));
	return {a, b, c};
};

