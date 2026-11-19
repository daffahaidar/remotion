import {lerp, type ArmPose, type BrowSpec, type EyeSpec, type FaceSpec, type LegPose, type PoseSpec} from './rig';

// ---------------------------------------------------------------------------
// Expressions (face presets)
// ---------------------------------------------------------------------------

const EYE: EyeSpec = {open: 1, lower: 0, tilt: 0, pupil: 1, shape: 'normal'};
const BROW: BrowSpec = {raise: 0, tilt: 0, curve: 0.45};
const eye = (e: Partial<EyeSpec> = {}): EyeSpec => ({...EYE, ...e});
const brow = (b: Partial<BrowSpec> = {}): BrowSpec => ({...BROW, ...b});

const NEUTRAL: FaceSpec = {
	eyeL: EYE,
	eyeR: EYE,
	browL: BROW,
	browR: BROW,
	lookX: 0,
	lookY: 0,
	mouth: 'smile',
	mouthX: 0,
	blush: 0.35,
	sweat: 0,
};
const face = (f: Partial<FaceSpec>): FaceSpec => ({...NEUTRAL, ...f});
const both = (e: EyeSpec) => ({eyeL: e, eyeR: e});
const brows = (b: BrowSpec) => ({browL: b, browR: b});

export const EXPRESSIONS = {
	neutral: NEUTRAL,
	happy: face({
		...both(eye({lower: 0.3})),
		...brows(brow({raise: 0.25})),
		mouth: 'open',
		blush: 0.6,
	}),
	laugh: face({
		...both(eye({shape: 'happy'})),
		...brows(brow({raise: 0.45, curve: 0.5})),
		mouth: 'laugh',
		blush: 0.75,
	}),
	smirk: face({
		eyeL: eye({open: 0.62, lower: 0.12}),
		eyeR: eye({open: 0.75, lower: 0.12}),
		browL: brow({raise: 0.55, curve: 0.5}),
		browR: brow({raise: -0.15, tilt: -6}),
		lookX: 0.35,
		mouth: 'smirk',
		mouthX: 0.25,
	}),
	sideEye: face({
		...both(eye({open: 0.58, lower: 0.18})),
		browL: brow({raise: -0.15, tilt: -8, curve: 0.1}),
		browR: brow({raise: 0.05, tilt: -4, curve: 0.1}),
		lookX: -1,
		mouth: 'flat',
		mouthX: -0.2,
		blush: 0.2,
	}),
	eyeRoll: face({
		...both(eye({open: 0.78})),
		...brows(brow({raise: 0.35})),
		lookX: 0.35,
		lookY: -1,
		mouth: 'flat',
		mouthX: 0.15,
		blush: 0.15,
	}),
	surprised: face({
		...both(eye({open: 1.22, pupil: 0.72})),
		...brows(brow({raise: 0.95, curve: 0.75})),
		mouth: 'surprised',
		blush: 0.25,
	}),
	jawDrop: face({
		...both(eye({open: 1.3, pupil: 0.58})),
		...brows(brow({raise: 1, curve: 0.8})),
		mouth: 'jawDrop',
		blush: 0.2,
	}),
	angry: face({
		...both(eye({open: 0.85, tilt: 20})),
		...brows(brow({raise: -0.45, tilt: -30, curve: 0})),
		mouth: 'frown',
		blush: 0,
	}),
	sad: face({
		...both(eye({open: 0.82, tilt: -14})),
		...brows(brow({raise: 0.2, tilt: 24, curve: 0})),
		lookY: 0.35,
		mouth: 'frown',
		blush: 0.1,
	}),
	worried: face({
		...both(eye({open: 1.05, pupil: 0.85})),
		...brows(brow({raise: 0.35, tilt: 26, curve: 0.1})),
		mouth: 'wavy',
		sweat: 1,
		blush: 0.2,
	}),
	thinking: face({
		...both(eye({open: 0.92})),
		browL: brow({raise: 0.55, curve: 0.5}),
		browR: brow({raise: -0.2, tilt: -10}),
		lookX: 0.7,
		lookY: -0.75,
		mouth: 'neutral',
		mouthX: 0.35,
	}),
	confused: face({
		browL: brow({raise: 0.65, tilt: 12}),
		browR: brow({raise: -0.25, tilt: -14}),
		lookX: -0.2,
		mouth: 'wavy',
		mouthX: -0.1,
	}),
	wink: face({
		eyeL: eye({shape: 'happy'}),
		eyeR: eye({lower: 0.25}),
		browL: brow({raise: -0.1}),
		browR: brow({raise: 0.35}),
		mouth: 'grin',
		blush: 0.55,
	}),
	embarrassed: face({
		...both(eye({shape: 'happy'})),
		...brows(brow({raise: 0.25, tilt: 18})),
		mouth: 'wavy',
		blush: 1,
		sweat: 1,
	}),
	determined: face({
		...both(eye({lower: 0.25, tilt: 8})),
		...brows(brow({raise: -0.25, tilt: -16})),
		mouth: 'smirk',
		mouthX: 0.15,
	}),
	excited: face({
		...both(eye({shape: 'star'})),
		...brows(brow({raise: 0.65, curve: 0.65})),
		mouth: 'laugh',
		blush: 0.85,
	}),
	love: face({
		...both(eye({shape: 'heart'})),
		...brows(brow({raise: 0.4, curve: 0.55})),
		mouth: 'kiss',
		blush: 1,
	}),
	crying: face({
		...both(eye({open: 0.72, lower: 0.25, tilt: -18})),
		...brows(brow({raise: 0.35, tilt: 28, curve: 0})),
		mouth: 'shout',
		blush: 0.4,
		tears: 1,
	}),
	sleepy: face({
		...both(eye({open: 0.32, tilt: -6})),
		...brows(brow({raise: -0.2, curve: 0.2})),
		lookY: 0.25,
		mouth: 'oh',
		blush: 0.2,
	}),
	dizzy: face({
		...both(eye({shape: 'dead'})),
		browL: brow({raise: 0.3, tilt: 16}),
		browR: brow({raise: -0.1, tilt: -12}),
		mouth: 'wavy',
		sweat: 1,
	}),
	cheeky: face({
		eyeL: eye({shape: 'happy'}),
		eyeR: eye({open: 1.05, lower: 0.15}),
		browL: brow({raise: -0.05}),
		browR: brow({raise: 0.4}),
		lookX: -0.25,
		mouth: 'tongueOut',
		blush: 0.65,
	}),
	scared: face({
		...both(eye({open: 1.28, pupil: 0.5})),
		...brows(brow({raise: 0.85, tilt: 24, curve: 0.1})),
		mouth: 'clench',
		sweat: 1,
	}),
	proud: face({
		...both(eye({shape: 'happy'})),
		...brows(brow({raise: 0.3, tilt: -8, curve: 0.4})),
		mouth: 'grin',
		blush: 0.45,
	}),
	eureka: face({
		...both(eye({open: 1.18, pupil: 1.1})),
		...brows(brow({raise: 0.8, curve: 0.7})),
		mouth: 'oh',
		blush: 0.5,
	}),
	skeptical: face({
		eyeL: eye({open: 0.95}),
		eyeR: eye({open: 0.52, lower: 0.28}),
		browL: brow({raise: 0.7, curve: 0.55}),
		browR: brow({raise: -0.35, tilt: -14, curve: 0.1}),
		lookX: 0.25,
		mouth: 'flat',
		mouthX: -0.25,
	}),
	nervousLaugh: face({
		...both(eye({open: 1.08, lower: 0.25, pupil: 0.82})),
		...brows(brow({raise: 0.4, tilt: 22, curve: 0.1})),
		mouth: 'clench',
		blush: 0.45,
		sweat: 1,
	}),
	pleading: face({
		...both(eye({open: 1.22, pupil: 1.32, tilt: -10})),
		...brows(brow({raise: 0.45, tilt: 22, curve: 0.2})),
		mouth: 'wavy',
		blush: 0.65,
		tears: 0.85,
	}),
	relief: face({
		...both(eye({shape: 'closed'})),
		...brows(brow({raise: 0.2, tilt: 10, curve: 0.35})),
		mouth: 'smile',
		blush: 0.35,
		sweat: 1,
	}),
	disgusted: face({
		eyeL: eye({open: 0.5, lower: 0.35, tilt: 10}),
		eyeR: eye({open: 0.65, lower: 0.3, tilt: -8}),
		browL: brow({raise: -0.35, tilt: -18}),
		browR: brow({raise: 0.1, tilt: 14}),
		mouth: 'wavy',
		mouthX: -0.2,
		blush: 0,
	}),
	furious: face({
		...both(eye({open: 1.15, lower: 0.2, tilt: 26, pupil: 0.68})),
		...brows(brow({raise: -0.55, tilt: -34, curve: 0})),
		mouth: 'shout',
		blush: 0.7,
	}),
	focused: face({
		...both(eye({open: 0.88, lower: 0.18, tilt: 6, pupil: 0.95})),
		...brows(brow({raise: -0.3, tilt: -12, curve: 0.1})),
		mouth: 'neutral',
		blush: 0,
	}),
} satisfies Record<string, FaceSpec>;

export type ExpressionName = keyof typeof EXPRESSIONS;
export const EXPRESSION_NAMES = Object.keys(EXPRESSIONS) as ExpressionName[];

// ---------------------------------------------------------------------------
// Poses (body presets). L = character's left = screen right when facing front.
// ---------------------------------------------------------------------------

const RELAXED: ArmPose = {lift: 9, swing: 0, bend: 14, twist: 0, hand: 'relaxed'};
const STAND: LegPose = {x: 32, h: 0, z: 0};
const pose = (p: Partial<PoseSpec>): PoseSpec => ({
	armL: RELAXED,
	armR: RELAXED,
	legL: STAND,
	legR: STAND,
	...p,
});
const mirrorArms = (a: ArmPose) => ({armL: a, armR: a});

export const POSES = {
	idle: pose({}),
	wave: pose({
		armL: {lift: 108, swing: 6, bend: 72, twist: 90, hand: 'open', layer: 'front'},
		headTilt: 5,
		wave: {arm: 'L', amount: 22, rate: 2.2},
	}),
	point: pose({
		armR: {lift: 86, swing: 16, bend: 6, hand: 'point'},
		lean: -2,
		headYaw: -14,
	}),
	pointRight: pose({
		armL: {lift: 86, swing: 16, bend: 6, hand: 'point'},
		lean: 2,
		headYaw: 14,
	}),
	pointUp: pose({
		armL: {lift: 160, swing: 20, bend: 12, hand: 'point'},
		headNod: -6,
	}),
	think: pose({
		armR: {target: [10, -405, 95], pole: [1, 0.7, -0.2], hand: 'fist', layer: 'front'},
		armL: {target: [-15, -290, 70], pole: [1, 0.4, -0.3], hand: 'fist'},
		headTilt: 7,
		headYaw: 8,
	}),
	surprised: pose({
		...mirrorArms({target: [138, -465, 75], pole: [1, 0.9, -0.3], hand: 'open', layer: 'front'}),
		headNod: -5,
	}),
	cheer: pose({
		...mirrorArms({lift: 140, swing: 0, bend: 20, twist: 90, hand: 'fist'}),
		headNod: -6,
	}),
	shrug: pose({
		...mirrorArms({lift: 28, swing: -15, bend: 80, twist: 90, hand: 'open'}),
		shrug: 14,
		headTilt: 9,
	}),
	handsOnHips: pose({
		...mirrorArms({target: [92, -250, 5], pole: [1, -0.2, -0.5], hand: 'fist'}),
		legL: {x: 42, h: 0, z: 0},
		legR: {x: 42, h: 0, z: 0},
	}),
	armsCrossed: pose({
		armL: {target: [-30, -318, 75], pole: [1, 0.5, 0.1], hand: 'fist'},
		armR: {target: [-28, -310, 82], pole: [1, 0.6, 0.1], hand: 'fist'},
	}),
	present: pose({
		armL: {lift: 52, swing: 32, bend: 40, twist: 60, hand: 'open'},
		headYaw: 14,
	}),
	thumbsUp: pose({
		armL: {lift: 40, swing: 20, bend: 110, twist: 90, hand: 'thumbsUp'},
		headTilt: -4,
	}),
	jump: pose({
		...mirrorArms({lift: 135, swing: 10, bend: 30, twist: 90, hand: 'open'}),
		legL: {x: 40, h: 120, z: -15, pitch: -25},
		legR: {x: 36, h: 115, z: 20, pitch: -10},
		lift: 110,
	}),
	peace: pose({
		armL: {lift: 102, swing: 18, bend: 78, twist: 85, hand: 'peace', layer: 'front'},
		headTilt: -6,
	}),
	facepalm: pose({
		armR: {target: [5, -545, 95], pole: [1, 0.6, -0.2], hand: 'open', handRoll: -20, layer: 'front'},
		headNod: 10,
		crouch: 6,
	}),
	fistPump: pose({
		armL: {target: [135, -620, 25], pole: [1, 0.3, -0.4], hand: 'fist'},
		armR: {lift: 35, swing: -20, bend: 85, twist: 70, hand: 'fist'},
		legL: {x: 36, h: 48, z: 18, pitch: -15},
		headTilt: -5,
	}),
	bashful: pose({
		armL: {target: [-8, -335, 80], pole: [1, 0.6, -0.2], hand: 'fist', layer: 'front'},
		armR: {target: [-8, -335, 80], pole: [1, 0.6, -0.2], hand: 'fist', layer: 'front'},
		lean: -4,
		headTilt: 8,
		headNod: 6,
	}),
	stop: pose({
		...mirrorArms({lift: 78, swing: 42, bend: 48, twist: 80, hand: 'open', layer: 'front'}),
		lean: -3,
		headNod: -4,
	}),
	welcome: pose({
		armR: {target: [-10, -330, 78], pole: [1, 0.5, -0.2], hand: 'open', layer: 'front'},
		armL: {lift: 58, swing: 24, bend: 28, twist: 65, hand: 'open'},
		crouch: 6,
		headTilt: 5,
		headNod: 6,
	}),
	dance: pose({
		armL: {lift: 118, swing: 16, bend: 50, twist: 80, hand: 'peace'},
		armR: {lift: 68, swing: 20, bend: 82, twist: 80, hand: 'open'},
		legL: {x: 46, h: 22, z: 12, pitch: -12},
		legR: {x: 30, h: 0, z: -8},
		lean: 7,
		crouch: 12,
		headTilt: 8,
	}),
	idea: pose({
		armL: {lift: 62, swing: 15, bend: 108, twist: 90, hand: 'point', handRoll: 12, layer: 'front'},
		headTilt: -5,
		headNod: -4,
	}),
	thumbsDown: pose({
		armL: {lift: 55, swing: 22, bend: 52, twist: 90, hand: 'thumbsUp', handRoll: 80, handFlip: true, layer: 'front'},
		headTilt: 4,
		headNod: 4,
	}),
	pray: pose({
		armL: {target: [18, -340, 85], pole: [1, 0.7, -0.2], hand: 'open', handRoll: -20, layer: 'front'},
		armR: {target: [18, -340, 85], pole: [1, 0.7, -0.2], hand: 'open', handRoll: -20, layer: 'front'},
		headNod: 8,
		crouch: 4,
	}),
	listen: pose({
		armL: {target: [142, -525, 30], pole: [1, 0.5, -0.3], hand: 'open', handRoll: 15, layer: 'front'},
		lean: 6,
		headTilt: 10,
		headYaw: -10,
	}),
	clap: pose({
		armL: {target: [38, -360, 85], pole: [1, 0.5, -0.2], hand: 'open', handRoll: -12, layer: 'front'},
		armR: {target: [18, -352, 85], pole: [1, 0.6, -0.2], hand: 'open', handRoll: -12, layer: 'front'},
		wave: {arm: 'L', amount: 14, rate: 4.5},
		headTilt: -5,
		shrug: 6,
	}),
	typing: pose({
		armL: {target: [52, -285, 85], pole: [1, 0.3, -0.5], hand: 'open', handRoll: -55, layer: 'front'},
		armR: {target: [52, -285, 85], pole: [1, 0.3, -0.5], hand: 'open', handRoll: -55, layer: 'front'},
		headNod: 8,
		crouch: 4,
		wave: {arm: 'L', amount: 8, rate: 6},
	}),
	sit: pose({
		armL: {target: [48, -235, 75], pole: [1, 0.3, -0.4], hand: 'relaxed', layer: 'front'},
		armR: {target: [48, -235, 75], pole: [1, 0.3, -0.4], hand: 'relaxed', layer: 'front'},
		legL: {x: 38, h: 15, z: 75, pitch: 8},
		legR: {x: 38, h: 15, z: 75, pitch: 8},
		crouch: 68,
	}),
} satisfies Record<string, PoseSpec>;

export type PoseName = keyof typeof POSES;
export const POSE_NAMES = Object.keys(POSES) as PoseName[];

// ---------------------------------------------------------------------------
// Blending
// ---------------------------------------------------------------------------

export const resolveFace = (e: ExpressionName | FaceSpec): FaceSpec =>
	typeof e === 'string' ? (EXPRESSIONS[e] ?? NEUTRAL) : e;

export const resolvePose = (p: PoseName | PoseSpec): PoseSpec => (typeof p === 'string' ? (POSES[p] ?? POSES.idle) : p);

const mixEye = (a: EyeSpec, b: EyeSpec, t: number): EyeSpec => ({
	open: lerp(a.open, b.open, t),
	lower: lerp(a.lower, b.lower, t),
	tilt: lerp(a.tilt, b.tilt, t),
	pupil: lerp(a.pupil, b.pupil, t),
	shape: t < 0.5 ? a.shape : b.shape,
});

const mixBrow = (a: BrowSpec, b: BrowSpec, t: number): BrowSpec => ({
	raise: lerp(a.raise, b.raise, t),
	tilt: lerp(a.tilt, b.tilt, t),
	curve: lerp(a.curve, b.curve, t),
});

/** Blend two expressions. Mouth and eye shapes switch halfway. */
export const mixFace = (a: FaceSpec, b: FaceSpec, t: number): FaceSpec => ({
	eyeL: mixEye(a.eyeL, b.eyeL, t),
	eyeR: mixEye(a.eyeR, b.eyeR, t),
	browL: mixBrow(a.browL, b.browL, t),
	browR: mixBrow(a.browR, b.browR, t),
	lookX: lerp(a.lookX, b.lookX, t),
	lookY: lerp(a.lookY, b.lookY, t),
	mouth: t < 0.5 ? a.mouth : b.mouth,
	mouthX: lerp(a.mouthX, b.mouthX, t),
	blush: lerp(a.blush, b.blush, t),
	sweat: lerp(a.sweat, b.sweat, t),
	tears: lerp(a.tears ?? 0, b.tears ?? 0, t),
});
