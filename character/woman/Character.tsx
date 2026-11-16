import React, {useId} from 'react';
import {Interactive, useCurrentFrame, useVideoConfig, type InteractivitySchema} from 'remotion';
import {Arm, GroundShadow, Leg, Neck, Torso} from './Body';
import {Head} from './Head';
import {MOTIONS, applyMotion, blinkAt, talkAt, type Motion} from './motion';
import {
	EXPRESSION_NAMES,
	POSE_NAMES,
	mixFace,
	resolveFace,
	resolvePose,
	type ExpressionName,
	type PoseName,
} from './presets';
import {
	D2R,
	MOUTH_SHAPES,
	RIG,
	blendLimb,
	clamp,
	lerp,
	rotY,
	solveArm,
	solveLeg,
	type ArmLayer,
	type FaceSpec,
	type LegPose,
	type MouthShape,
	type P2,
	type PoseSpec,
	type V3,
} from './rig';

export type Framing = 'full' | 'bust' | 'head';
const FRAMINGS: readonly Framing[] = ['full', 'bust', 'head'];

/** [x, y, width, height] in rig px. Ground is y = 0. */
const VIEWBOX: Record<Framing, readonly [number, number, number, number]> = {
	full: [-420, -860, 840, 900],
	bust: [-280, -800, 560, 560],
	head: [-215, -785, 430, 430],
};

export type CharacterProps = {
	/** Base expression, or a custom FaceSpec. */
	readonly expression?: ExpressionName | FaceSpec;
	/** Expression to blend towards with `expressionBlend` (0..1). */
	readonly expressionTo?: ExpressionName;
	readonly expressionBlend?: number;
	/** Base body pose, or a custom PoseSpec. */
	readonly pose?: PoseName | PoseSpec;
	/** Pose to blend towards with `poseBlend` (0..1). */
	readonly poseTo?: PoseName;
	readonly poseBlend?: number;
	/** Force a mouth shape, e.g. for hand-timed lip sync. */
	readonly mouth?: 'auto' | MouthShape;
	/** Procedural lip flap. */
	readonly talking?: boolean;
	/** idle = breathing, still = frozen, walk/run = in-place cycle. */
	readonly motion?: Motion;
	readonly speed?: number;
	readonly autoBlink?: boolean;
	/** Body turn: 0 front, 90 facing right, 180 back, -90 facing left. */
	readonly yaw?: number;
	readonly headYaw?: number;
	readonly headTilt?: number;
	readonly headNod?: number;
	/** Pupil direction -1..1. */
	readonly lookX?: number;
	readonly lookY?: number;
	readonly framing?: Framing;
	/** Changes blink/talk timing, so two copies don't move in sync. */
	readonly seed?: string;
	readonly style?: React.CSSProperties;
};

const CharacterInner: React.FC<CharacterProps> = ({
	expression = 'neutral',
	expressionTo = 'neutral',
	expressionBlend = 0,
	pose = 'idle',
	poseTo = 'idle',
	poseBlend = 0,
	mouth = 'auto',
	talking = false,
	motion = 'idle',
	speed = 1,
	autoBlink = true,
	yaw = 0,
	headYaw = 0,
	headTilt = 0,
	headNod = 0,
	lookX = 0,
	lookY = 0,
	framing = 'full',
	seed = 'woman',
	style,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const uid = `w${useId().replace(/[^a-zA-Z0-9]/g, '')}`;

	// --- face --------------------------------------------------------------
	const ft = clamp(expressionBlend, 0, 1);
	const baseFace = resolveFace(expression);
	const blended = ft > 0 ? mixFace(baseFace, resolveFace(expressionTo), ft) : baseFace;
	const face: FaceSpec = {
		...blended,
		mouth: mouth !== 'auto' ? mouth : talking ? talkAt(frame, fps, seed) : blended.mouth,
		lookX: blended.lookX + lookX,
		lookY: blended.lookY + lookY,
	};
	const blink = autoBlink ? blinkAt(frame, fps, seed) : 1;

	// --- body pose ---------------------------------------------------------
	const pt = clamp(poseBlend, 0, 1);
	const pa = applyMotion(resolvePose(pose), motion, frame, fps, speed, yaw);
	const pb = pt > 0 ? applyMotion(resolvePose(poseTo), motion, frame, fps, speed, yaw) : null;
	const num = (k: 'lean' | 'crouch' | 'lift' | 'shrug' | 'headTilt' | 'headYaw' | 'headNod') =>
		pb ? lerp(pa[k] ?? 0, pb[k] ?? 0, pt) : (pa[k] ?? 0);
	const crouch = num('crouch');
	const lift = num('lift');
	const lean = num('lean');
	const shrug = num('shrug');
	const talkWobble = talking ? 1 : 0;
	const tilt = headTilt + num('headTilt') + talkWobble * 1.5 * Math.sin(frame * 0.37);
	const nod = headNod + num('headNod') + talkWobble * 1.4 * Math.sin(frame * 0.9);

	const project = (p: V3): P2 => {
		const q = rotY(p, yaw);
		return [q.x, q.y];
	};
	const depth = (p: V3) => rotY(p, yaw).z;
	const facingBack = Math.cos(yaw * D2R) < 0;

	const arms = ([1, -1] as const)
		.map((side) => {
			const key = side === 1 ? 'armL' : 'armR';
			const a = pa[key];
			let limb = solveArm(a, side, pa.shrug ?? 0);
			let ap = a;
			if (pb) {
				limb = blendLimb(limb, solveArm(pb[key], side, pb.shrug ?? 0), pt, RIG.upperArm, RIG.forearm);
				ap = pt < 0.5 ? a : pb[key];
			}
			const zs = depth(limb.a);
			const zw = depth(limb.c);
			const avg = (zs + depth(limb.b) + zw) / 3;
			let layer: ArmLayer = ap.layer ?? (avg < -28 ? 'back' : 'mid');
			if (layer === 'front' && zw < 0) {
				layer = 'mid';
			}
			return {
				layer,
				z: avg,
				el: (
					<Arm
						key={key}
						s={project(limb.a)}
						e={project(limb.b)}
						w={project(limb.c)}
						hand={ap.hand}
						handRoll={ap.handRoll ?? 0}
						mirror={side * (facingBack ? -1 : 1) * (ap.handFlip ? -1 : 1)}
						handFront={zw - zs > 40}
					/>
				),
			};
		})
		.sort((m, n) => m.z - n.z);

	const hipY = RIG.hipY + crouch - lift;
	const legs = ([1, -1] as const)
		.map((side) => {
			const key = side === 1 ? 'legL' : 'legR';
			const a = pa[key];
			const lp: LegPose = pb
				? {
						x: lerp(a.x, pb[key].x, pt),
						h: lerp(a.h, pb[key].h, pt),
						z: lerp(a.z, pb[key].z, pt),
						pitch: lerp(a.pitch ?? 0, pb[key].pitch ?? 0, pt),
					}
				: a;
			const limb = solveLeg(lp, side, hipY);
			return {
				z: depth(limb.b),
				el: (
					<Leg
						key={key}
						h={project(limb.a)}
						k={project(limb.b)}
						a={project(limb.c)}
						yaw={yaw}
						pitch={lp.pitch ?? 0}
						side={side}
						uid={uid}
					/>
				),
			};
		})
		.sort((m, n) => m.z - n.z);

	const [vx, vy, vw, vh] = VIEWBOX[framing];
	const upper = `translate(0 ${crouch - lift}) rotate(${lean} 0 ${RIG.hipY})`;
	const armsIn = (layer: ArmLayer) => arms.filter((a) => a.layer === layer).map((a) => a.el);

	return (
		<svg
			viewBox={`${vx} ${vy} ${vw} ${vh}`}
			width={vw}
			height={vh}
			style={{
				overflow: framing === 'full' ? 'visible' : 'hidden',
				transformOrigin: `50% ${Math.min(100, (-vy / vh) * 100)}%`,
				...style,
			}}
		>
			<GroundShadow lift={lift} />
			<g transform={upper}>{armsIn('back')}</g>
			{legs.map((l) => l.el)}
			<g transform={upper}>
				<Neck />
				<Torso yaw={yaw} shrug={shrug} uid={uid} />
				{armsIn('mid')}
				<g transform={`rotate(${tilt} 0 ${RIG.neckY}) translate(0 ${RIG.headY})`}>
					<Head yaw={yaw + num('headYaw') + headYaw} nod={nod} face={face} blink={blink} uid={uid} />
				</g>
				{armsIn('front')}
			</g>
		</svg>
	);
};

const variants = (names: readonly string[]) =>
	names.reduce<Record<string, InteractivitySchema>>((acc, n) => {
		acc[n] = {};
		return acc;
	}, {});

const numberField = (description: string, def: number, min: number, max: number, step: number) =>
	({type: 'number', default: def, min, max, step, description, hiddenFromList: false}) as const;

/**
 * The mascot. Every prop in the schema below can be edited and keyframed in
 * Remotion Studio. Place and size it with `style` (translate / scale).
 */
export const Character = Interactive.create({
	Component: CharacterInner,
	layout: 'none',
	componentName: 'WomanCharacter',
	schema: {
		expression: {
			type: 'enum',
			default: 'neutral',
			description: 'Expression',
			variants: variants(EXPRESSION_NAMES),
			keyframable: true,
		},
		expressionTo: {
			type: 'enum',
			default: 'neutral',
			description: 'Blend to expression',
			variants: variants(EXPRESSION_NAMES),
			keyframable: true,
		},
		expressionBlend: numberField('Expression blend', 0, 0, 1, 0.01),
		pose: {
			type: 'enum',
			default: 'idle',
			description: 'Pose',
			variants: variants(POSE_NAMES),
			keyframable: true,
		},
		poseTo: {
			type: 'enum',
			default: 'idle',
			description: 'Blend to pose',
			variants: variants(POSE_NAMES),
			keyframable: true,
		},
		poseBlend: numberField('Pose blend', 0, 0, 1, 0.01),
		mouth: {
			type: 'enum',
			default: 'auto',
			description: 'Mouth override',
			variants: variants(['auto', ...MOUTH_SHAPES]),
			keyframable: true,
		},
		talking: {type: 'boolean', default: false, description: 'Talking'},
		motion: {
			type: 'enum',
			default: 'idle',
			description: 'Motion',
			variants: variants(MOTIONS),
			keyframable: true,
		},
		speed: numberField('Walk speed', 1, 0.2, 3, 0.05),
		autoBlink: {type: 'boolean', default: true, description: 'Auto blink'},
		yaw: numberField('Body turn (deg)', 0, -180, 180, 1),
		headYaw: numberField('Head turn (deg)', 0, -80, 80, 1),
		headTilt: numberField('Head tilt (deg)', 0, -40, 40, 1),
		headNod: numberField('Head nod (deg)', 0, -30, 30, 1),
		lookX: numberField('Look X', 0, -1, 1, 0.05),
		lookY: numberField('Look Y', 0, -1, 1, 0.05),
		framing: {
			type: 'enum',
			default: 'full',
			description: 'Framing',
			variants: variants(FRAMINGS),
			keyframable: false,
		},
	},
});
