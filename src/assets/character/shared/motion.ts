import {interpolate, random} from 'remotion';
import {D2R, type ArmPose, type MouthShape, type PoseSpec} from './rig';

/** Eye openness multiplier (1 = open) for natural, deterministic blinking. */
export const blinkAt = (frame: number, fps: number, seed: string): number => {
	const close = Math.max(1, Math.round(fps * 0.05));
	const hold = Math.max(1, Math.round(fps * 0.04));
	const reopen = Math.max(2, Math.round(fps * 0.1));
	const dur = close + hold + reopen;
	let start = Math.round(fps * (0.8 + random(`${seed}-blink-0`) * 1.4));
	let k = 0;
	while (start + dur < frame) {
		k++;
		const r = random(`${seed}-blink-${k}`);
		// Mostly every 2-5 s, sometimes a quick double blink.
		start += r < 0.15 ? dur + 2 : Math.round(fps * (2 + r * 2.8));
	}
	const local = frame - start;
	if (local < 0 || local > dur) {
		return 1;
	}
	return interpolate(local, [0, close, close + hold, dur], [1, 0, 0, 1]);
};

const VISEMES: readonly MouthShape[] = [
	'aa',
	'ee',
	'oh',
	'etc',
	'aa',
	'oo',
	'ee',
	'l',
	'etc',
	'fv',
	'aa',
	'oh',
];

/** Procedural lip flap: a new mouth shape roughly every 0.1 s. */
export const talkAt = (frame: number, fps: number, seed: string): MouthShape => {
	const step = Math.max(2, Math.round(fps * 0.1));
	const k = Math.floor(frame / step);
	const r = random(`${seed}-talk-${k}`);
	if (r < 0.14) {
		return 'mbp';
	}
	if (r < 0.2) {
		return 'rest';
	}
	return VISEMES[Math.floor(random(`${seed}-viseme-${k}`) * VISEMES.length)];
};

export type Motion = 'idle' | 'still' | 'walk' | 'run' | 'dance';
export const MOTIONS: readonly Motion[] = ['idle', 'still', 'walk', 'run', 'dance'];

const swings = (a: ArmPose) => !a.target && (a.lift ?? 0) < 40;

/** Waves the forearm named in `pose.wave`. */
const applyWave = (pose: PoseSpec, frame: number, fps: number): PoseSpec => {
	if (!pose.wave) {
		return pose;
	}
	const key = pose.wave.arm === 'L' ? 'armL' : 'armR';
	const arm = pose[key];
	const osc = Math.sin((frame / fps) * Math.PI * 2 * pose.wave.rate) * pose.wave.amount;
	return {...pose, [key]: {...arm, bend: (arm.bend ?? 0) + osc}};
};

/**
 * Layers a procedural cycle on top of a pose. `idle` breathes, `walk`/`run`
 * animate in place, so move the character with `style.translate`.
 * At speed 1 the character should travel about 150 rig px per second while
 * walking (310 px running) for the feet not to slide.
 */
export const applyMotion = (
	pose: PoseSpec,
	motion: Motion,
	frame: number,
	fps: number,
	speed: number,
	yaw: number,
): PoseSpec => {
	if (motion === 'still') {
		return pose;
	}
	return applyWave(cycle(pose, motion, frame, fps, speed, yaw), frame, fps);
};

const cycle = (
	pose: PoseSpec,
	motion: Exclude<Motion, 'still'>,
	frame: number,
	fps: number,
	speed: number,
	yaw: number,
): PoseSpec => {
	if (motion === 'idle') {
		const b = Math.sin(((frame / fps) * Math.PI * 2) / 3.4);
		return {
			...pose,
			lift: (pose.lift ?? 0) + b * 1.6,
			shrug: (pose.shrug ?? 0) + b * 1.2,
			headNod: (pose.headNod ?? 0) - b * 0.8,
		};
	}
	if (motion === 'dance') {
		const beat = (frame / fps) * Math.PI * 2 * speed * 1.6;
		const sway = Math.sin(beat);
		const bounce = Math.abs(Math.cos(beat));
		return {
			...pose,
			armL: {
				hand: 'open',
				lift: 95 + 32 * sway,
				swing: 18,
				bend: 65 - 20 * sway,
				twist: 80,
			},
			armR: {
				hand: 'open',
				lift: 95 - 32 * sway,
				swing: 18,
				bend: 65 + 20 * sway,
				twist: 80,
			},
			legL: {
				x: 38 + 10 * sway,
				h: 24 * Math.max(0, sway),
				z: 10 * sway,
				pitch: -12 * Math.max(0, sway),
			},
			legR: {
				x: 38 - 10 * sway,
				h: 24 * Math.max(0, -sway),
				z: -10 * sway,
				pitch: -12 * Math.max(0, -sway),
			},
			crouch: (pose.crouch ?? 0) + 18 * (1 - bounce),
			lean: (pose.lean ?? 0) + 8 * sway,
			shrug: (pose.shrug ?? 0) + 8 * bounce,
			headTilt: (pose.headTilt ?? 0) + 10 * sway,
			headNod: (pose.headNod ?? 0) + 5 * (1 - bounce),
		};
	}
	const run = motion === 'run';
	const p = (frame / fps) * Math.PI * 2 * speed * (run ? 1.5 : 1);
	const stride = run ? 52 : 38;
	const step = run ? 50 : 22;
	const leg = (ph: number, x: number) => ({
		x,
		z: stride * Math.cos(ph),
		h: step * Math.max(0, -Math.sin(ph)),
		pitch: 16 * Math.cos(ph),
	});
	const amp = run ? 55 : 28;
	const arm = (base: ArmPose, ph: number): ArmPose =>
		swings(base)
			? {
					hand: run ? 'fist' : base.hand,
					lift: -amp * Math.cos(ph),
					swing: 90,
					bend: run ? 95 : 20 + 10 * Math.max(0, Math.cos(ph)),
					twist: 0,
				}
			: base;
	return {
		...pose,
		legL: leg(p, pose.legL.x),
		legR: leg(p + Math.PI, pose.legR.x),
		armL: arm(pose.armL, p),
		armR: arm(pose.armR, p + Math.PI),
		lift: (pose.lift ?? 0) + (run ? 12 : 6) * (1 - Math.abs(Math.cos(p))),
		crouch: (pose.crouch ?? 0) + (run ? 14 : 3),
		lean: (pose.lean ?? 0) + Math.sin(yaw * D2R) * (run ? 9 : 3),
		headNod: (pose.headNod ?? 0) + (run ? 3 : 1) * Math.cos(2 * p),
	};
};
