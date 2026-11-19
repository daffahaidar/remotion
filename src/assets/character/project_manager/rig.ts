/**
 * Project Manager character rig: palette and agile smart-casual proportions.
 */

import {createLimbSolvers} from '../shared/rig';

export * from '../shared/rig';

/** Color palette for the Project Manager character. */
export const COLORS = {
	outline: '#1f1a1f',
	skin: '#f8d2b2',
	skinShade: '#e8b18a',
	blush: '#f38c84',
	hair: '#5c3329',
	hairShine: '#9c5947',
	scrunchie: '#fbbf24',
	eyeWhite: '#ffffff',
	pupil: '#2b1e1b',
	frame: '#7c2d12',
	lens: '#fef3c7',
	mouth: '#7c2634',
	tongue: '#e9767a',
	teeth: '#ffffff',
	shirt: '#ea580c',
	shirtShade: '#c2410c',
	innerTop: '#fffbeb',
	innerTopShade: '#fde68a',
	lanyard: '#0284c7',
	badgeCard: '#ffffff',
	watchBand: '#fbbf24',
	watchFace: '#1e293b',
	pants: '#1e293b',
	cuff: '#334155',
	shoe: '#f59e0b',
	shoeAccent: '#fffbeb',
	sole: '#ffffff',
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
