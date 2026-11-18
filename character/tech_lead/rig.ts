/**
 * Tech Lead character rig: palette and senior-engineer proportions.
 */

import {createLimbSolvers} from '../shared/rig';

export * from '../shared/rig';

/** Color palette for the Tech Lead character. */
export const COLORS = {
	outline: '#1f1a1f',
	skin: '#f2c7a5',
	skinShade: '#dfa67e',
	blush: '#e88b7b',
	hair: '#2b2422',
	hairShine: '#5e504b',
	eyeWhite: '#ffffff',
	pupil: '#251c1a',
	frame: '#475569',
	lens: '#e2e8f0',
	mouth: '#7c2634',
	tongue: '#e9767a',
	teeth: '#ffffff',
	shirt: '#4d7c0f',
	shirtShade: '#365314',
	plaid: '#65a30d',
	innerTee: '#1f2937',
	innerTeeShade: '#111827',
	pants: '#293548',
	cuff: '#3f506b',
	shoe: '#3f4a3c',
	shoeAccent: '#a3e635',
	sole: '#e2e8f0',
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
	armW: 38,
	legW: 60,
} as const;

export const {solveArm, solveLeg} = createLimbSolvers(RIG);
