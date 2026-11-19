/**
 * Female hijabi mascot master rig: palette and proportions.
 *
 * Shares 3D math, types, and kinematics from `../shared/rig`.
 */

import {createLimbSolvers} from '../shared/rig';

export * from '../shared/rig';

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

export const {solveArm, solveLeg} = createLimbSolvers(RIG);
