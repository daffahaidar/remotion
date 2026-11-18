/**
 * Doctor character rig: palette and composed clinical proportions.
 */

import {createLimbSolvers} from '../shared/rig';

export * from '../shared/rig';

/** Color palette for the Doctor character. */
export const COLORS = {
	outline: '#1f1a1f',
	skin: '#f6d0b1',
	skinShade: '#e6ae87',
	blush: '#ef8f86',
	hair: '#3a2722',
	hairShine: '#705147',
	eyeWhite: '#ffffff',
	pupil: '#2b1e1b',
	frame: '#475569',
	lens: '#e0f2fe',
	mouth: '#7c2634',
	tongue: '#e9767a',
	teeth: '#ffffff',
	shirt: '#ffffff',
	shirtShade: '#e2e8f0',
	scrubs: '#0d9488',
	scrubsShade: '#0f766e',
	stethTube: '#334155',
	stethMetal: '#cbd5e1',
	crossRed: '#ef4444',
	pants: '#0f766e',
	cuff: '#115e59',
	shoe: '#f8fafc',
	shoeAccent: '#0d9488',
	sole: '#cbd5e1',
	sweat: '#9fd3ff',
	ground: 'rgba(28, 24, 38, 0.16)',
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
	armW: 38,
	legW: 60,
} as const;

export const {solveArm, solveLeg} = createLimbSolvers(RIG);
