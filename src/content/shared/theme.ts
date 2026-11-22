import {loadFont as loadMono} from '@remotion/google-fonts/JetBrainsMono';
import {loadFont as loadSans} from '@remotion/google-fonts/PlusJakartaSans';
import {staticFile} from 'remotion';

export const {fontFamily: SANS} = loadSans('normal', {weights: ['600', '700', '800'], subsets: ['latin']});
export const {fontFamily: MONO} = loadMono('normal', {weights: ['500', '700', '800'], subsets: ['latin']});

/** Neuromorphism tokens: light = explainer world, dark = hacker world. */
export const THEME = {
	light: {
		bg: '#e8eef5',
		text: '#1e293b',
		dim: '#475569',
		edge: 'rgba(255, 255, 255, 0.72)',
		hi: 'rgba(255, 255, 255, 0.92)',
		lo: 'rgba(163, 177, 198, 0.62)',
		inset: 'inset -6px -6px 14px rgba(255, 255, 255, 0.85), inset 6px 6px 14px rgba(163, 177, 198, 0.58)',
		grid: 'rgba(100, 116, 139, 0.16)',
		bubble: '#ffffff',
	},
	dark: {
		bg: '#1e232c',
		text: '#f8fafc',
		dim: '#94a3b8',
		edge: 'rgba(255, 255, 255, 0.06)',
		hi: 'rgba(255, 255, 255, 0.05)',
		lo: 'rgba(0, 0, 0, 0.65)',
		inset: 'inset -5px -5px 12px rgba(255, 255, 255, 0.04), inset 6px 6px 14px rgba(0, 0, 0, 0.68)',
		grid: 'rgba(148, 163, 184, 0.09)',
		bubble: '#2a313d',
	},
} as const;
export type ThemeName = keyof typeof THEME;

/** Semantic tones. `light`/`dark` = text-safe on each canvas (WCAG >= 4.5:1), `fill` = solid accents. */
export const TONES = {
	header: {light: '#be123c', dark: '#fb7185', fill: '#e11d48'},
	payload: {light: '#6d28d9', dark: '#a78bfa', fill: '#7c3aed'},
	signature: {light: '#0369a1', dark: '#38bdf8', fill: '#0284c7'},
	success: {light: '#15803d', dark: '#4ade80', fill: '#16a34a'},
	danger: {light: '#b91c1c', dark: '#f87171', fill: '#dc2626'},
	warning: {light: '#c2410c', dark: '#fb923c', fill: '#ea580c'},
	primary: {light: '#1d4ed8', dark: '#60a5fa', fill: '#2563eb'},
	gold: {light: '#a16207', dark: '#facc15', fill: '#eab308'},
} as const;
export type Tone = keyof typeof TONES;

export const SFX = {
	whoosh: staticFile('audio/sfx/whoosh.wav'),
	pop: staticFile('audio/sfx/pop.wav'),
	click: staticFile('audio/sfx/click.wav'),
	ding: staticFile('audio/sfx/ding.wav'),
	sparkle: staticFile('audio/sfx/sparkle.wav'),
	switch: staticFile('audio/sfx/switch.wav'),
	boom: staticFile('audio/sfx/vine-boom.wav'),
	scratch: staticFile('audio/sfx/record-scratch.wav'),
	pageTurn: staticFile('audio/sfx/page-turn.wav'),
	fail: staticFile('audio/sfx/price-is-right-fail.wav'),
	// Synthesized by generate-audio.mjs
	typing: staticFile('audio/sfx/typing.wav'),
	glitch: staticFile('audio/sfx/glitch.wav'),
	denied: staticFile('audio/sfx/denied.wav'),
	riser: staticFile('audio/sfx/riser.wav'),
	beep: staticFile('audio/sfx/beep.wav'),
	ticking: staticFile('audio/sfx/ticking.wav'),
	whirr: staticFile('audio/sfx/whirr.wav'),
	impact: staticFile('audio/sfx/impact.wav'),
} as const;
