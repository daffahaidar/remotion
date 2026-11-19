/**
 * Quality Assurance (QA) character rig: palette and observant proportions.
 */

import {createLimbSolvers} from '../shared/rig';

export * from '../shared/rig';

/** Color palette for the Quality Assurance character. */
export const COLORS = {
	outline: '#1f1a1f',
	skin: '#f8d2b4',
	skinShade: '#e8b08a',
	blush: '#f18e87',
	hair: '#1e1b2e',
	hairShine: '#504973',
	hairClip: '#e11d48',
	eyeWhite: '#ffffff',
	pupil: '#251d24',
	frame: '#be123c',
	lens: '#ffe4e6',
	mouth: '#7c2634',
	tongue: '#e9767a',
	teeth: '#ffffff',
	shirt: '#f59e0b',
	shirtShade: '#d97706',
	innerShirt: '#f8fafc',
	innerShirtShade: '#e2e8f0',
	badgeBg: '#1e293b',
	bugRed: '#f43f5e',
	checkGreen: '#22c55e',
	pants: '#334155',
	cuff: '#475569',
	shoe: '#e11d48',
	shoeAccent: '#fbbf24',
	sole: '#f8fafc',
	sweat: '#9fd3ff',
	ground: 'rgba(28, 24, 38, 0.16)',
} as const;

export const RIG = {
	headY: -560,
	neckY: -405,
	shoulderX: 85,
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
