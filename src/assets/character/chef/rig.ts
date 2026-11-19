/**
 * Chef character rig: palette and jolly executive-chef proportions.
 */

import {createLimbSolvers} from '../shared/rig';

export * from '../shared/rig';

/** Color palette for the Chef character. */
export const COLORS = {
	outline: '#1f1a1f',
	skin: '#f5c79e',
	skinShade: '#e3a579',
	blush: '#f18578',
	hair: '#4f3528',
	hairShine: '#855f4a',
	hat: '#ffffff',
	hatShade: '#e2e8f0',
	eyeWhite: '#ffffff',
	pupil: '#2b1e1b',
	mouth: '#7c2634',
	tongue: '#e9767a',
	teeth: '#ffffff',
	shirt: '#ffffff',
	shirtShade: '#e2e8f0',
	neckerchief: '#ef4444',
	neckerchiefShade: '#b91c1c',
	apron: '#334155',
	apronShade: '#1e293b',
	wood: '#d97706',
	pants: '#1e293b',
	cuff: '#334155',
	shoe: '#1f2937',
	shoeAccent: '#475569',
	sole: '#0f172a',
	sweat: '#9fd3ff',
	ground: 'rgba(28, 24, 38, 0.17)',
} as const;

export const RIG = {
	headY: -560,
	neckY: -405,
	shoulderX: 98,
	shoulderY: -372,
	hipX: 33,
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
