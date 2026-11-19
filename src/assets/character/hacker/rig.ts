/**
 * Hacker character rig: palette and sleek stealth proportions.
 */

import {createLimbSolvers} from '../shared/rig';

export * from '../shared/rig';

/** Color palette for the Hacker character. */
export const COLORS = {
	outline: '#1f1a1f',
	skin: '#f2c9ac',
	skinShade: '#dca480',
	blush: '#e5867b',
	hair: '#181c24',
	hairShine: '#3f4b5e',
	hood: '#161b24',
	hoodShade: '#0d1117',
	matrix: '#22c55e',
	matrixGlow: '#4ade80',
	eyeWhite: '#ffffff',
	pupil: '#19221d',
	mouth: '#7c2634',
	tongue: '#e9767a',
	teeth: '#ffffff',
	shirt: '#161b24',
	shirtShade: '#0d1117',
	pocket: '#10151d',
	mask: '#111827',
	pants: '#13171f',
	cuff: '#242b38',
	shoe: '#111827',
	shoeAccent: '#22c55e',
	sole: '#1f2937',
	sweat: '#9fd3ff',
	ground: 'rgba(16, 20, 28, 0.2)',
} as const;

export const RIG = {
	headY: -560,
	neckY: -405,
	shoulderX: 88,
	shoulderY: -372,
	hipX: 30,
	hipY: -200,
	upperArm: 84,
	forearm: 78,
	thigh: 88,
	shin: 84,
	ankleH: 30,
	armW: 40,
	legW: 62,
} as const;

export const {solveArm, solveLeg} = createLimbSolvers(RIG);
