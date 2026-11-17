import {loadFont as loadFredoka} from '@remotion/google-fonts/Fredoka';
import {loadFont as loadJetBrainsMono} from '@remotion/google-fonts/JetBrainsMono';
import {loadFont as loadPlusJakarta} from '@remotion/google-fonts/PlusJakartaSans';
import {Easing, interpolate} from 'remotion';
import type {ExpressionName, PoseName} from '../../../character';

const fredoka = loadFredoka('normal', {weights: ['500', '600', '700'], subsets: ['latin']});
const jakarta = loadPlusJakarta('normal', {weights: ['500', '600', '700', '800'], subsets: ['latin']});
const jetbrains = loadJetBrainsMono('normal', {weights: ['500', '700'], subsets: ['latin']});

export const FONTS = {
	display: fredoka.fontFamily,
	body: jakarta.fontFamily,
	mono: jetbrains.fontFamily,
} as const;

export const VIDEO_CONFIG = {
	width: 1080,
	height: 1920,
	fps: 30,
	durationInFrames: 4350, // 145 seconds
} as const;

/**
 * Conservative safe area for Instagram Reels, TikTok, and YouTube Shorts (1080x1920).
 * Keeps key UI, text, and characters clear of top notch/bars, right-side action buttons,
 * and bottom caption/handle overlays.
 */
export const SAFE_AREA = {
	top: 168,
	left: 72,
	right: 136, // Extra clearance for Reels/Shorts right-side Like/Comment/Share rail
	bottom: 340, // Clearance for platform caption, audio ticker, and scrubber
	contentWidth: 1080 - 72 - 136, // 872px safe column
	centerX: 72 + (1080 - 72 - 136) / 2, // 508px (slightly left-weighted for right rail safety)
	stageBottomY: 1430, // Feet / platform baseline above subtitle strip
	subtitleTopY: 1445, // Subtitle strip sits safely in y: 1445..1575
} as const;

export const PALETTE = {
	ink: '#1f1a1f',
	textDark: '#162032',
	textMuted: '#475569',
	white: '#ffffff',
	cream: '#fffdf7',

	// Sky / Hook
	skyTop: '#cbe6ff',
	skyBottom: '#f2f9ff',

	// Restaurant (warm inviting cartoon palette)
	restoTop: '#ffe8cc',
	restoBottom: '#fff7ed',
	restoWood: '#c26b2d',
	restoAwningRed: '#ef4444',
	restoAwningCream: '#fff5e6',

	// Tech Dark Slate
	techBgTop: '#0b1324',
	techBgBottom: '#16223c',
	techCardBg: '#1e293b',

	// SSR Semantic (Emerald / Cyan)
	ssrMain: '#10b981',
	ssrDark: '#047857',
	ssrLight: '#d1fae5',
	ssrAccent: '#0ea5e9',
	ssrAccentLight: '#e0f2fe',

	// CSR Semantic (Amber / Orange)
	csrMain: '#f97316',
	csrDark: '#c2410c',
	csrLight: '#ffedd5',
	csrGold: '#facc15',
	csrGoldLight: '#fef9c3',

	// Next.js / Plot Twist
	nextBgTop: '#090d1a',
	nextBgBottom: '#1e1b4b',
	nextIndigo: '#6366f1',
	nextCyan: '#38bdf8',
	nextRose: '#f43f5e',
} as const;

export const SCENE_TIMINGS = {
	scene01: {from: 0, durationInFrames: 360, label: '00:00 - 00:12'}, // 12s
	scene02: {from: 360, durationInFrames: 450, label: '00:12 - 00:27'}, // 15s
	scene03: {from: 810, durationInFrames: 600, label: '00:27 - 00:47'}, // 20s
	scene04: {from: 1410, durationInFrames: 450, label: '00:47 - 01:02'}, // 15s
	scene05: {from: 1860, durationInFrames: 540, label: '01:02 - 01:20'}, // 18s
	scene06: {from: 2400, durationInFrames: 450, label: '01:20 - 01:35'}, // 15s
	scene07: {from: 2850, durationInFrames: 600, label: '01:35 - 01:55'}, // 20s
	scene08: {from: 3450, durationInFrames: 450, label: '01:55 - 02:10'}, // 15s
	scene09: {from: 3900, durationInFrames: 450, label: '02:10 - 02:25'}, // 15s
} as const;

export const popScale = (
	frame: number,
	startFrame: number,
	durationFrames = 14,
	damping = 11,
): number =>
	interpolate(frame, [startFrame, startFrame + durationFrames], [0, 1], {
		easing: Easing.spring({damping, stiffness: 180, mass: 0.9}),
		output: 'perceptual-scale',
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

export const fadeIn = (frame: number, startFrame: number, durationFrames = 10): number =>
	interpolate(frame, [startFrame, startFrame + durationFrames], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

export const slideProgress = (frame: number, startFrame: number, durationFrames = 16): number =>
	interpolate(frame, [startFrame, startFrame + durationFrames], [0, 1], {
		easing: Easing.bezier(0.16, 1, 0.3, 1),
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

export type CharacterBeat = {
	readonly frame: number;
	readonly pose: PoseName;
	readonly expression: ExpressionName;
};

/**
 * Smoothly blends a single continuous character rig through multiple timed beats
 * without resetting autoBlink or causing frame cuts.
 */
export const resolveCharacterBeats = (
	frame: number,
	beats: readonly CharacterBeat[],
	blendFrames = 10,
): {
	readonly pose: PoseName;
	readonly poseTo: PoseName;
	readonly poseBlend: number;
	readonly expression: ExpressionName;
	readonly expressionTo: ExpressionName;
	readonly expressionBlend: number;
} => {
	let activeIdx = 0;
	for (let i = 0; i < beats.length; i++) {
		if (frame >= beats[i].frame) {
			activeIdx = i;
		}
	}
	if (activeIdx === 0) {
		return {
			pose: beats[0].pose,
			poseTo: beats[0].pose,
			poseBlend: 0,
			expression: beats[0].expression,
			expressionTo: beats[0].expression,
			expressionBlend: 0,
		};
	}
	const prev = beats[activeIdx - 1];
	const curr = beats[activeIdx];
	const t = interpolate(frame, [curr.frame, curr.frame + blendFrames], [0, 1], {
		easing: Easing.bezier(0.16, 1, 0.3, 1),
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	return {
		pose: prev.pose,
		poseTo: curr.pose,
		poseBlend: t,
		expression: prev.expression,
		expressionTo: curr.expression,
		expressionBlend: t,
	};
};
