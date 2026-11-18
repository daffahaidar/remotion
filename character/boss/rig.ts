/**
 * Boss / Executive character rig: palette and broader executive proportions.
 *
 * Shares 3D math, types, and kinematics from `../shared/rig`.
 */

import {createLimbSolvers} from '../shared/rig';

export * from '../shared/rig';

/** Color palette for the Boss character. */
export const COLORS = {
	outline: '#1f1a1f',
	skin: '#f3c59f',
	skinShade: '#e09f74',
	blush: '#e8836f',
	hair: '#222630',
	hairShine: '#505b6e',
	hairSilver: '#94a3b8',
	eyeWhite: '#ffffff',
	pupil: '#1f1917',
	frame: '#475569',
	lens: '#e0f2fe',
	mouth: '#7c2634',
	tongue: '#e9767a',
	teeth: '#ffffff',
	shirt: '#1e293b',
	shirtShade: '#0f172a',
	lapel: '#2c3a50',
	innerShirt: '#f8fafc',
	tie: '#dc2626',
	tieShade: '#991b1b',
	gold: '#fbbf24',
	pants: '#1e293b',
	cuff: '#334155',
	shoe: '#2c1d18',
	shoeAccent: '#5c3f34',
	sole: '#140e0c',
	sweat: '#9fd3ff',
	ground: 'rgba(28, 24, 38, 0.18)',
} as const;

export const RIG = {
	headY: -560,
	neckY: -405,
	shoulderX: 100,
	shoulderY: -372,
	hipX: 34,
	hipY: -200,
	upperArm: 84,
	forearm: 78,
	thigh: 88,
	shin: 84,
	ankleH: 30,
	armW: 42,
	legW: 64,
} as const;

export const {solveArm, solveLeg} = createLimbSolvers(RIG);
