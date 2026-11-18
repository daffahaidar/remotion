/**
 * Backend Programmer character rig: palette and proportions.
 *
 * Shares the exact coordinate space and 3D math of the master character rigs.
 */

export * from '../shared/rig';

/** Color palette for the Backend Programmer character. */
export const COLORS = {
	outline: '#1f1a1f',
	skin: '#f4c6a0',
	skinShade: '#e2a278',
	blush: '#ed8975',
	hair: '#1e232b',
	hairShine: '#4f5b6e',
	headphone: '#26303d',
	headphoneShade: '#151c24',
	headphoneGlow: '#10b981',
	cushion: '#374151',
	eyeWhite: '#ffffff',
	pupil: '#2b1e1b',
	frame: '#334155',
	lens: '#d1fae5',
	mouth: '#7c2634',
	tongue: '#e9767a',
	teeth: '#ffffff',
	shirt: '#243042',
	shirtShade: '#17202e',
	hoodShade: '#131b26',
	drawstring: '#e2e8f0',
	pocket: '#1b2535',
	badgeBg: '#0f172a',
	badgeAccent: '#10b981',
	badgeAmber: '#fbbf24',
	pants: '#1f242d',
	cuff: '#343d4b',
	shoe: '#1f2937',
	shoeAccent: '#10b981',
	sole: '#f1f5f9',
	sweat: '#9fd3ff',
	ground: 'rgba(28, 24, 38, 0.16)',
} as const;

export const RIG = {
	headY: -560,
	neckY: -405,
	shoulderX: 92,
	shoulderY: -372,
	hipX: 32,
	hipY: -200,
	upperArm: 84,
	forearm: 78,
	thigh: 88,
	shin: 84,
	ankleH: 30,
	armW: 42,
	legW: 64,
} as const;
