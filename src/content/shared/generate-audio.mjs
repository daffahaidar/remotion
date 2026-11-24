// Procedural, royalty-free backsound for every video — no samples, no licenses, no Content ID claims.
// Deterministic (seeded): every run produces the same files.
//   node src/content/shared/generate-audio.mjs <slug>          -> public/audio/music/<slug>.mp3
//   node src/content/shared/generate-audio.mjs <slug> --sfx    -> also rewrites the synthesized SFX in public/audio/sfx/
// Music is 120 BPM (1 bar = 2 s). Add a SONGS entry per video whose sections follow that video's SCENE_SECONDS.
import {Buffer} from 'node:buffer';
import {execFileSync} from 'node:child_process';
import {rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {argv, exit, stdout} from 'node:process';

const SR = 44100;
const TAU = Math.PI * 2;
const BAR = 2;
const BEAT = BAR / 4;
const S = (sec) => Math.round(sec * SR);
const mtof = (m) => 440 * 2 ** ((m - 69) / 12);

let seed = 1337;
const rand = () => {
	seed = (seed + 0x6d2b79f5) | 0;
	let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
	t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
	return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const noise = () => rand() * 2 - 1;
const bus = (sec) => [new Float32Array(S(sec)), new Float32Array(S(sec))];

/** Renders fn(t, i) for `dur` seconds at `t0` into a stereo bus with constant-power pan (-1..1). */
const add = ([L, R], t0, dur, pan, fn) => {
	const a = ((pan + 1) * Math.PI) / 4;
	const gl = Math.cos(a);
	const gr = Math.sin(a);
	const s0 = S(t0);
	const n = Math.min(S(dur), L.length - s0);
	for (let i = 0; i < n; i++) {
		const v = fn(i / SR, i);
		L[s0 + i] += v * gl;
		R[s0 + i] += v * gr;
	}
};

// --- instruments --------------------------------------------------------------
const kick = (b, t0, g) => {
	let ph = 0;
	add(b, t0, 0.45, 0, (t, i) => {
		ph += (TAU * (46 + 115 * Math.exp(-t * 32))) / SR;
		return g * (Math.tanh(1.8 * Math.sin(ph)) * Math.exp(-t * 7) + (i < 80 ? noise() * 0.25 * (1 - i / 80) : 0));
	});
};
const clap = (b, t0, g, pan = 0) => {
	let lp = 0;
	let slow = 0;
	add(b, t0, 0.3, pan, (t) => {
		lp += (noise() - lp) * 0.45;
		slow += (lp - slow) * 0.08;
		const burst = Math.max(Math.exp(-t * 220), t > 0.011 ? Math.exp(-(t - 0.011) * 220) : 0, t > 0.022 ? Math.exp(-(t - 0.022) * 220) : 0);
		return g * (lp - slow) * (burst + 0.55 * Math.exp(-t * 16));
	});
};
const hat = (b, t0, g, decay = 60, pan = 0) => {
	let prev = 0;
	add(b, t0, 0.2, pan, (t) => {
		const n = noise();
		const hp = n - prev;
		prev = n;
		return g * hp * Math.exp(-t * decay);
	});
};
const bass = (b, t0, dur, midi, g) => {
	const f = mtof(midi);
	add(b, t0, dur + 0.1, 0, (t) => {
		const env = Math.min(1, t / 0.006) * (t < dur ? 0.7 + 0.3 * Math.exp(-t * 10) : 0.7 * Math.exp(-(t - dur) * 45));
		const x = Math.sin(TAU * f * t) + 0.3 * Math.sin(TAU * 2 * f * t) + 0.1 * Math.sin(TAU * 3 * f * t);
		return g * Math.tanh(1.5 * x) * env;
	});
};
/** FM electric piano: bright tine attack that mellows out, gentle tremolo. */
const ep = (b, t0, dur, midi, g, pan) => {
	const f = mtof(midi);
	add(b, t0, dur + 0.8, pan, (t) => {
		const env = Math.min(1, t / 0.004) * Math.exp(-t * 1.1) * (t < dur ? 1 : Math.exp(-(t - dur) * 7));
		const idx = 0.25 + 1.4 * Math.exp(-t * 7);
		return g * Math.sin(TAU * f * t + idx * Math.sin(TAU * f * t)) * (1 + 0.12 * Math.sin(TAU * 4.6 * t)) * env;
	});
};
const chordEp = (b, t0, dur, notes, g) => {
	for (const m of notes) {
		ep(b, t0, dur, m + 0.03, g / 2, -0.45);
		ep(b, t0, dur, m - 0.03, g / 2, 0.45);
	}
};
/** Additive saw pad with slow attack; `bright` > 0 rolls off upper harmonics (bigger = darker). */
const pad = (b, t0, dur, midi, g, pan, bright = 0.45) => {
	const f = mtof(midi);
	add(b, t0, dur + 1.2, pan, (t) => {
		const env = Math.min(1, t / 0.6) * (t < dur ? 1 : Math.exp(-(t - dur) * 3));
		let x = 0;
		for (let k = 1; k <= 7; k++) x += (Math.sin(TAU * f * k * t * (1 + (k % 2 ? 0.0015 : -0.0015))) * Math.exp(-k * bright)) / k;
		return g * x * env;
	});
};
const pluck = (b, t0, midi, g, pan) => {
	const f = mtof(midi);
	add(b, t0, 0.35, pan, (t) => g * (Math.sin(TAU * f * t) + 0.18 * Math.sin(TAU * 2 * f * t) * Math.exp(-t * 30)) * Math.min(1, t / 0.002) * Math.exp(-t * 13));
};
const riser = (b, t0, dur, g) => {
	let lp = 0;
	let ph = 0;
	add(b, t0, dur, 0, (t) => {
		const p = t / dur;
		lp += (noise() - lp) * (0.02 + 0.5 * p * p);
		ph += (TAU * 180 * 8 ** p) / SR;
		return g * p * p * (0.7 * lp + 0.25 * Math.sin(ph)) * Math.min(1, (dur - t) / 0.02);
	});
};
const impact = (b, t0, g) => {
	let ph = 0;
	let lp = 0;
	add(b, t0, 2.5, 0, (t) => {
		ph += (TAU * (34 + 70 * Math.exp(-t * 9))) / SR;
		lp += (noise() - lp) * (0.04 + 0.4 * Math.exp(-t * 12));
		return g * (Math.tanh(2 * Math.sin(ph)) * Math.exp(-t * 2.2) * 0.9 + lp * Math.exp(-t * 5) * 0.9);
	});
};

/** Freeverb-style room (8 combs + 4 allpasses per channel). Returns the wet signal only. */
const reverb = ([inL, inR], room = 0.84, damp = 0.35) => {
	const n = inL.length;
	const out = [new Float32Array(n), new Float32Array(n)];
	[0, 23].forEach((spread, c) => {
		const combs = [1116, 1188, 1277, 1356, 1422, 1491, 1557, 1617].map((d) => ({buf: new Float32Array(d + spread), i: 0, store: 0}));
		const aps = [556, 441, 341, 225].map((d) => ({buf: new Float32Array(d + spread), i: 0}));
		const o = out[c];
		for (let s = 0; s < n; s++) {
			const x = (inL[s] + inR[s]) * 0.015;
			let y = 0;
			for (const k of combs) {
				const v = k.buf[k.i];
				k.store = v * (1 - damp) + k.store * damp;
				k.buf[k.i] = x + k.store * room;
				k.i = (k.i + 1) % k.buf.length;
				y += v;
			}
			for (const a of aps) {
				const v = a.buf[a.i];
				a.buf[a.i] = y + v * 0.5;
				a.i = (a.i + 1) % a.buf.length;
				y = v - y;
			}
			o[s] = y;
		}
	});
	return out;
};

const writeWav = (path, [L, R], peak = 0.89) => {
	let max = 1e-9;
	for (let i = 0; i < L.length; i++) max = Math.max(max, Math.abs(L[i]), Math.abs(R[i]));
	const gain = peak / max;
	const pcm = new Int16Array(L.length * 2);
	for (let i = 0; i < L.length; i++) {
		pcm[2 * i] = Math.round(L[i] * gain * 32767);
		pcm[2 * i + 1] = Math.round(R[i] * gain * 32767);
	}
	const head = Buffer.alloc(44);
	head.write('RIFF', 0);
	head.writeUInt32LE(36 + pcm.byteLength, 4);
	head.write('WAVEfmt ', 8);
	head.writeUInt32LE(16, 16);
	head.writeUInt16LE(1, 20);
	head.writeUInt16LE(2, 22);
	head.writeUInt32LE(SR, 24);
	head.writeUInt32LE(SR * 4, 28);
	head.writeUInt16LE(4, 32);
	head.writeUInt16LE(16, 34);
	head.write('data', 36);
	head.writeUInt32LE(pcm.byteLength, 40);
	writeFileSync(path, Buffer.concat([head, Buffer.from(pcm.buffer)]));
	return gain;
};

// --- songs ----------------------------------------------------------------------
// Section names: intro / pre (hook, title impact on the first pre bar), A (groove, no arpeggio),
// Aarp, B (busier), break (no drums, riser into the next scene), tension + resolve (dark payoff), end (final chord).
// `loop` = the groove's chord progression (the mood). The video runs `bars * 2` s; the file is 2 s longer for the final chord.
const SONGS = {
	// hook 0-12 s, explainer 12-124 s, hacker 124-142 s, recap 142-166 s, channel outro 166-176 s.
	'how-jwt-works': {
		loop: ['Am7', 'Fmaj7', 'Cmaj7', 'G6'],
		sections: [['intro', 4], ['pre', 2], ['A', 8], ['Aarp', 8], ['B', 8], ['break', 4], ['Aarp', 8], ['B', 8], ['Aarp', 12], ['tension', 6], ['resolve', 3], ['Aarp', 6], ['B', 6], ['A', 4], ['end', 1]],
	},
	// hook 0-12, problem 12-22, old way 22-34 (B), analogy 34-48, anatomy 48-58 + break 58-66, twist 66-78 (music drops at 66),
	// mechanism 78-96 (B), flow 96-116, payoff 116-128 tension + 128-134 resolve, PKCE 134-146, recap 146-158 (B), outro 158-168.
	'how-oauth-works': {
		loop: ['Am7', 'Fmaj7', 'Cmaj7', 'G6'],
		sections: [['intro', 4], ['pre', 2], ['A', 5], ['B', 6], ['Aarp', 7], ['B', 5], ['break', 4], ['Aarp', 6], ['B', 9], ['Aarp', 10], ['tension', 6], ['resolve', 3], ['Aarp', 6], ['B', 6], ['A', 4], ['end', 1]],
	},
	// hook 0-12, problem 12-26, old way 26-38 (B), phone analogy 38-52, anatomy 52-66 (B) + break 66-74, twist 74-86 (music drops at 74),
	// DNS lookup 86-104 (B), flow 104-124, payoff 124-136 tension + 136-142 resolve, packets 142-154, recap 154-166 (B), outro 166-176.
	// Brighter I-vi-IV-V loop: curiosity rather than the security videos' minor groove.
	'how-internet-works': {
		loop: ['Cmaj7', 'Am7', 'Fmaj7', 'G6'],
		sections: [['intro', 4], ['pre', 2], ['A', 7], ['B', 6], ['Aarp', 7], ['B', 7], ['break', 4], ['Aarp', 6], ['B', 9], ['Aarp', 10], ['tension', 6], ['resolve', 3], ['Aarp', 6], ['B', 6], ['A', 4], ['end', 1]],
	},
};
const SLUG = argv[2];
const SONG = SONGS[SLUG];
if (!SONG) {
	stdout.write(`Usage: node src/content/shared/generate-audio.mjs <${Object.keys(SONGS).join(' | ')}> [--sfx]\n`);
	exit(1);
}
/** One entry per bar: section name, bar index inside the section, section length. */
const PLAN = SONG.sections.flatMap(([sec, n]) => Array.from({length: n}, (_, k) => ({sec, k, n})));

// --- music ----------------------------------------------------------------------
const LEN = PLAN.length * BAR + 2;
const N = S(LEN);
const drums = bus(LEN);
const claps = bus(LEN);
const low = bus(LEN);
const keys = bus(LEN);
const arp = bus(LEN);
const pads = bus(LEN);
const fx = bus(LEN);
const duck = new Float32Array(N).fill(1);

const kickAt = (t, g) => {
	kick(drums, t, g);
	const s0 = S(t);
	for (let i = 0; i < S(0.4) && s0 + i < N; i++) duck[s0 + i] = Math.min(duck[s0 + i], 1 - 0.45 * Math.exp(-(i / SR) * 10));
};

const CH = {
	Am7: {root: 45, notes: [57, 60, 64, 67]},
	Fmaj7: {root: 41, notes: [53, 57, 60, 64]},
	Cmaj7: {root: 48, notes: [55, 59, 64, 67]},
	G6: {root: 43, notes: [55, 59, 62, 64]},
	Am: {root: 45, notes: [57, 60, 64, 69]},
	F: {root: 41, notes: [53, 57, 60, 65]},
	E: {root: 40, notes: [52, 56, 59, 64]},
	G: {root: 43, notes: [55, 59, 62, 67]},
	Am9: {root: 45, notes: [57, 60, 64, 67, 71]},
};
const LOOP = SONG.loop;
const ARP = [0, 1, 2, 3, 2, 1, 3, 2, 0, 2, 1, 3, 2, 3, 1, 2];

const groove = (bar, t, sec) => {
	const ch = CH[LOOP[(bar - 6 + 400) % 4]];
	const busy = sec === 'B';
	chordEp(keys, t, 1.7, ch.notes, 0.09);
	chordEp(keys, t + 2.5 * BEAT, 0.22, ch.notes.slice(1), 0.045);
	for (const [beat, len, oct] of [
		[0, 1.25, 0],
		[1.5, 0.5, 0],
		[2, 1, 0],
		[3.5, 0.45, 12],
	])
		bass(low, t + beat * BEAT, len * BEAT, ch.root + oct, 0.3);
	kickAt(t, 0.9);
	kickAt(t + 2 * BEAT, 0.85);
	if (bar % 2 || busy) kickAt(t + 2.75 * BEAT, 0.55);
	clap(claps, t + BEAT, 0.35, -0.1);
	clap(claps, t + 3 * BEAT, 0.35, 0.1);
	for (let s = 0; s < (busy ? 16 : 8); s++) {
		const step = busy ? s / 4 : s / 2;
		hat(drums, t + step * BEAT, s % 2 ? 0.1 : 0.06, 70, 0.25);
	}
	if (busy) hat(drums, t + 3.5 * BEAT, 0.07, 12, -0.25);
	if (sec !== 'A') for (let s = 0; s < 16; s++) pluck(arp, t + (s * BEAT) / 4, ch.notes[ARP[s] % ch.notes.length] + 12, 0.06, s % 2 ? 0.5 : -0.5);
	if (bar % 8 === 5) for (let s = 0; s < 4; s++) clap(claps, t + (3 + s / 4) * BEAT, 0.12 + s * 0.06, 0);
};

for (const [bar, {sec, k, n}] of PLAN.entries()) {
	const t = bar * BAR;
	if (sec === 'intro') {
		if (k === 0) for (const [i, m] of [45, 52, 57, 60].entries()) pad(pads, 0, 8, m, 0.05, i % 2 ? -0.3 : 0.3, 0.9);
		for (const beat of [0, 2]) {
			kickAt(t + beat * BEAT, 0.6);
			kickAt(t + beat * BEAT + 0.24, 0.35);
		}
		for (let q = 0; q < 4; q++) hat(drums, t + q * BEAT + BEAT / 2, 0.05, 90, 0.3);
		if (k === n - 1) riser(fx, t, BAR, 0.45);
	} else if (sec === 'pre') {
		if (k === 0) impact(fx, t, 0.8);
		const ch = CH[k === 0 ? 'Am7' : 'Fmaj7'];
		chordEp(keys, t, 1.9, ch.notes, 0.07);
		for (const [i, m] of ch.notes.entries()) pad(pads, t, BAR, m - 12, 0.025, i % 2 ? -0.4 : 0.4);
		bass(low, t, 1.5, ch.root, 0.25);
		for (let s = 0; s < 8; s++) hat(drums, t + (s * BEAT) / 2, s % 2 ? 0.07 : 0.04, 70, 0.25);
		if (k === n - 1) riser(fx, t + BAR / 2, BAR / 2, 0.25);
	} else if (sec === 'break') {
		const ch = CH[LOOP[(bar - 6) % 4]];
		for (const [i, m] of ch.notes.entries()) pad(pads, t, BAR, m, 0.035, i % 2 ? -0.4 : 0.4);
		bass(low, t, 1.8, ch.root, 0.2);
		for (let s = 0; s < 16; s++) pluck(arp, t + (s * BEAT) / 4, ch.notes[ARP[s] % ch.notes.length] + 12, 0.055, s % 2 ? 0.5 : -0.5);
		for (let q = 0; q < 4; q++) hat(drums, t + q * BEAT, 0.05, 80, 0);
		if (k === n - 1) riser(fx, t, BAR, 0.3);
	} else if (sec === 'tension') {
		const ch = CH[['Am', 'Am', 'F', 'F', 'E', 'E'][Math.floor((k * 6) / n)]];
		for (const [i, m] of ch.notes.entries()) pad(pads, t, BAR, m - 12, 0.045, i % 2 ? -0.4 : 0.4, 0.8);
		for (let e = 0; e < 8; e++) bass(low, t + (e * BEAT) / 2, 0.18, ch.root, e % 2 ? 0.2 : 0.28);
		for (let q = 0; q < 4; q++) {
			kickAt(t + q * BEAT, 0.6);
			hat(drums, t + q * BEAT + BEAT / 2, 0.07, 70, 0.2);
		}
		if (k === n - 2) riser(fx, t, 2 * BAR, 0.5);
	} else if (sec === 'resolve') {
		if (k === 0) impact(fx, t, 0.9);
		const ch = CH[['Am9', 'F', 'G'][Math.floor((k * 3) / n)]];
		chordEp(keys, t, 1.9, ch.notes, 0.07);
		for (const [i, m] of ch.notes.entries()) pad(pads, t, BAR, m - 12, 0.03, i % 2 ? -0.4 : 0.4);
		bass(low, t, 1.8, ch.root, 0.22);
		if (k === n - 1) for (let s = 0; s < 8; s++) hat(drums, t + (s * BEAT) / 2, s % 2 ? 0.07 : 0.04, 70, 0.25);
	} else if (sec === 'end') {
		kickAt(t, 0.9);
		chordEp(keys, t, 3.5, CH.Am9.notes, 0.1);
		for (const [i, m] of CH.Am9.notes.entries()) pad(pads, t, 3, m - 12, 0.03, i % 2 ? -0.4 : 0.4);
		bass(low, t, 3, 45, 0.3);
	} else {
		groove(bar, t, sec);
	}
}

const send = [new Float32Array(N), new Float32Array(N)];
for (let c = 0; c < 2; c++)
	for (let i = 0; i < N; i++) send[c][i] = keys[c][i] * 0.35 + arp[c][i] * 0.55 + pads[c][i] * 0.5 + claps[c][i] * 0.4 + fx[c][i] * 0.3;
const wet = reverb(send);
const master = bus(LEN);
for (let c = 0; c < 2; c++)
	for (let i = 0; i < N; i++) {
		const d = duck[i];
		const t = i / SR;
		const fade = Math.min(1, t / 0.01, (LEN - t) / 3);
		master[c][i] = Math.tanh(1.1 * (drums[c][i] + claps[c][i] + fx[c][i] + d * (low[c][i] + keys[c][i] + arp[c][i] + pads[c][i]) + 0.9 * wet[c][i])) * fade;
	}

const wav = join(tmpdir(), `${SLUG}-music.wav`);
writeWav(wav, master);
execFileSync('npx', ['remotion', 'ffmpeg', '-y', '-hide_banner', '-loglevel', 'error', '-i', wav, '-c:a', 'libmp3lame', '-b:a', '192k', `public/audio/music/${SLUG}.mp3`], {stdio: 'inherit'});
rmSync(wav);

stdout.write(`Music written: public/audio/music/${SLUG}.mp3 (${LEN} s)\n`);
if (!argv.includes('--sfx')) exit(0);

// --- sound effects ------------------------------------------------------------------
// Re-seeded so the SFX don't depend on which song ran first. (The committed SFX came from an earlier
// revision of this file, so --sfx changes their noise slightly; only pass it when you add or change an SFX.)
seed = 1337;
const sfx = (name, sec, draw, withVerb = false) => {
	const b = bus(sec);
	draw(b);
	if (withVerb) {
		const w = reverb(b, 0.8, 0.4);
		for (let c = 0; c < 2; c++) for (let i = 0; i < b[c].length; i++) b[c][i] += w[c][i] * 0.8;
	}
	writeWav(`public/audio/sfx/${name}.wav`, b);
};

sfx('typing', 1.5, (b) => {
	for (let t = 0.02; t < 1.38; t += 0.06 + 0.08 * rand()) {
		const g = 0.5 + 0.5 * rand();
		const f = 1800 + 1600 * rand();
		add(b, t, 0.06, (rand() - 0.5) * 0.4, (tt, i) => g * ((i < 260 ? noise() * (1 - i / 260) * 0.6 : 0) + Math.sin(TAU * f * tt) * Math.exp(-tt * 140) * 0.5 + Math.sin(TAU * 190 * tt) * Math.exp(-tt * 90) * 0.6));
	}
});
sfx('glitch', 0.5, (b) => {
	for (let t = 0; t < 0.45; ) {
		const d = 0.02 + 0.04 * rand();
		const f = 120 + 1800 * rand();
		const square = rand() < 0.5;
		const hold = 1 + Math.floor(rand() * 12);
		let hv = 0;
		add(b, t, d, (rand() - 0.5) * 1.2, (tt, i) => {
			if (i % hold === 0) hv = square ? Math.sign(Math.sin(TAU * f * tt)) : noise();
			return 0.5 * hv * Math.min(1, (d - tt) / 0.003);
		});
		t += d + (rand() < 0.3 ? 0.02 : 0);
	}
});
sfx('denied', 0.6, (b) => {
	for (const t0 of [0, 0.26])
		add(b, t0, 0.2, 0, (t) => 0.5 * Math.tanh(4 * (Math.sin(TAU * 150 * t) + 0.6 * Math.sin(TAU * 151.5 * t + 1))) * Math.min(1, t / 0.005, (0.2 - t) / 0.02));
});
sfx('riser', 2, (b) => riser(b, 0, 2, 1));
sfx('beep', 0.4, (b) => {
	add(b, 0, 0.08, 0, (t) => 0.5 * Math.sin(TAU * 1568 * t) * Math.min(1, t / 0.004, (0.08 - t) / 0.01));
	add(b, 0.11, 0.25, 0, (t) => 0.5 * Math.sin(TAU * 2093 * t) * Math.min(1, t / 0.004) * Math.exp(-t * 14));
});
sfx('ticking', 2, (b) => {
	for (let k = 0; k < 16; k++)
		add(b, k * 0.125, 0.04, k % 2 ? 0.2 : -0.2, (t, i) => 0.55 * ((i < 40 ? noise() * (1 - i / 40) : 0) * 0.5 + Math.sin(TAU * (k % 2 ? 2600 : 3200) * t) * Math.exp(-t * 160)));
});
sfx('whirr', 1.2, (b) => {
	let ph = 0;
	add(b, 0, 1.2, 0, (t) => {
		const p = t / 1.2;
		ph += (TAU * (220 + 520 * Math.sin(Math.PI * p))) / SR;
		return 0.45 * Math.sin(ph + 2 * Math.sin(ph * 0.5)) * (0.6 + 0.4 * Math.sin(TAU * 28 * t)) * Math.sin(Math.PI * p);
	});
});
sfx('impact', 2.5, (b) => impact(b, 0, 1), true);

stdout.write('SFX written: 8 files in public/audio/sfx/\n');
