/**
 * Fullstack Programmer character rig: palette and versatile athletic proportions.
 */

import {createLimbSolvers} from '../shared/rig';

export * from '../shared/rig';

/** Color palette for the Fullstack Programmer character. */
export const COLORS = {
	outline: '#1f1a1f',
	skin: '#f6cca9',
	skinShade: '#e5aa80',
	blush: '#f08e7c',
	hair: '#24212d',
	hairShine: '#5b5373',
	capCyan: '#0284c7',
	capEmerald: '#10b981',
	capDark: '#0f172a',
	eyeWhite: '#ffffff',
	pupil: '#2b1e1b',
	mouth: '#7c2634',
	tongue: '#e9767a',
	teeth: '#ffffff',
	shirt: '#1e293b',
	shirtShade: '#0f172a',
	sleeveCyan: '#0ea5e9',
	sleeveCyanShade: '#0284c7',
	sleeveEmerald: '#10b981',
	sleeveEmeraldShade: '#059669',
	badgeBg: '#0f172a',
	badgeCyan: '#38bdf8',
	badgeEmerald: '#34d399',
	pants: '#27303f',
	cuff: '#3d495e',
	shoe: '#0ea5e9',
	shoeAccent: '#10b981',
	sole: '#f8fafc',
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
	legW: 62,
} as const;

export const {solveArm, solveLeg} = createLimbSolvers(RIG);
