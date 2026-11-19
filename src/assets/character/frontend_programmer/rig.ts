/**
 * Frontend Programmer character rig: palette and proportions.
 *
 * Shares the exact coordinate space and 3D math of the master character rigs.
 */

export * from '../shared/rig';

/** Color palette for the Frontend Programmer character. */
export const COLORS = {
	outline: '#1f1a1f',
	skin: '#f6cba6',
	skinShade: '#e7aa84',
	blush: '#f08f7d',
	hair: '#282138',
	hairShine: '#6f5fb3',
	hairAccent: '#22d3ee',
	eyeWhite: '#ffffff',
	pupil: '#2b1e1b',
	frame: '#232136',
	lens: '#cffafe',
	mouth: '#7c2634',
	tongue: '#e9767a',
	teeth: '#ffffff',
	shirt: '#5b5ce6',
	shirtShade: '#4338ca',
	innerTee: '#f8fafc',
	innerTeeShade: '#cbd5e1',
	badgeBg: '#1e1b4b',
	badgeAccent: '#22d3ee',
	badgeCoral: '#fb7185',
	watchBand: '#22d3ee',
	watchFace: '#0f172a',
	pants: '#334155',
	cuff: '#475569',
	shoe: '#06b6d4',
	shoeAccent: '#fb7185',
	sole: '#f8fafc',
	sweat: '#9fd3ff',
	ground: 'rgba(28, 24, 38, 0.16)',
} as const;

export const RIG = {
	headY: -560,
	neckY: -405,
	shoulderX: 86,
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
