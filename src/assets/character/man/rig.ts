/**
 * Mascot master rig: palette and proportions.
 *
 * Shares 3D math, types, and kinematics from `../shared/rig`.
 */

import {createLimbSolvers} from '../shared/rig';

export * from '../shared/rig';

/** Every color of the mascot. Change a value here to restyle all videos. */
export const COLORS = {
	outline: '#1f1a1f',
	skin: '#f6cba6',
	skinShade: '#e7aa84',
	blush: '#f08f7d',
	hair: '#2b2832',
	hairShine: '#625c6f',
	eyeWhite: '#ffffff',
	pupil: '#2b1e1b',
	frame: '#4a2b21',
	lens: '#dcecff',
	mouth: '#7c2634',
	tongue: '#e9767a',
	teeth: '#ffffff',
	shirt: '#5aa3e8',
	shirtShade: '#3f86cf',
	pants: '#2e456c',
	cuff: '#4a6897',
	shoe: '#e4493b',
	sole: '#f7f4ed',
	sweat: '#9fd3ff',
	ground: 'rgba(28, 24, 38, 0.16)',
} as const;

export const RIG = {
	headY: -560,
	neckY: -405,
	shoulderX: 90,
	shoulderY: -372,
	hipX: 31,
	hipY: -200,
	upperArm: 84,
	forearm: 78,
	thigh: 88,
	shin: 84,
	ankleH: 30,
	armW: 40,
	legW: 64,
} as const;

export const {solveArm, solveLeg} = createLimbSolvers(RIG);
