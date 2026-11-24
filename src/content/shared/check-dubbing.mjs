// Checks that every narration line of a script_dubbing.md can be spoken calmly inside its time window.
//   node src/content/shared/check-dubbing.mjs src/content/<slug>/script_dubbing.md
// Needed time = estimated syllables / MAX_RATE + pauses ("..." mid-line = 0.5 s; , ; : ? ! or a sentence end mid-line = 0.2 s).
// Syllables are estimated the Indonesian way: vowels with ai/au/oi merged, all-consonant acronyms spelled letter by letter
// (DNS = 3, HTTP = 4), "." inside a word read as "dot". Digits are rejected: write numbers the way the dubber says them.
import {readFileSync} from 'node:fs';
import {argv, exit, stdout} from 'node:process';

/** Syllables per second at a calm, clear explainer pace. Never count on the dubber rushing. */
const MAX_RATE = 5.5;
const ELLIPSIS_PAUSE = 0.5;
const MARK_PAUSE = 0.2;

const count = (text, re) => (text.match(re) || []).length;

const syllables = (word) => {
	if (/^[A-Z]{2,3}$/.test(word) || /^[B-DF-HJ-NP-TV-Z]{4,}$/.test(word)) return word.length;
	const lower = word.toLowerCase();
	return Math.max(1, count(lower, /[aeiou]/g) - count(lower, /ai|au|oi|oo|ee/g));
};

/** Seconds needed to say one narration line, plus its words. */
const measure = (line) => {
	const inner = line
		.replace(/\*\*/g, '')
		.replace(/"/g, ' ')
		.replace(/^[\s.…]+/, '')
		.replace(/[\s.!?…]+$/, '');
	const ellipses = count(inner, /\.\.\.|…/g);
	const marks = count(inner.replace(/\.\.\.|…/g, ' '), /[,;:!?]|\.(?=\s)/g);
	const words = inner
		.split(/\s+/)
		.map((w) => w.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, ''))
		.filter(Boolean);
	const syl = words.reduce((sum, w) => {
		const dotted = w.split('.').filter(Boolean);
		const parts = dotted.flatMap((p) => p.split('-')).filter(Boolean);
		return sum + dotted.length - 1 + parts.reduce((s, p) => s + syllables(p), 0);
	}, 0);
	return {words, sec: syl / MAX_RATE + ellipses * ELLIPSIS_PAUSE + marks * MARK_PAUSE};
};

const file = argv[2];
if (!file) {
	stdout.write('Usage: node src/content/shared/check-dubbing.mjs src/content/<slug>/script_dubbing.md\n');
	exit(1);
}
const lines = readFileSync(file, 'utf8').split('\n');
const toSec = (mm, ss) => Number(mm) * 60 + Number(ss);
let problems = 0;
let totalWords = 0;
let totalSec = 0;
let totalNeed = 0;
lines.forEach((line, i) => {
	const m = /^Detik (\d+):(\d+) - (\d+):(\d+):/.exec(line);
	if (!m) return;
	const have = toSec(m[3], m[4]) - toSec(m[1], m[2]);
	const narration = lines[i + 1] || '';
	const {words, sec} = measure(narration);
	const digits = words.filter((w) => /\d/.test(w));
	totalWords += words.length;
	totalSec += have;
	totalNeed += sec;
	if (sec <= have && digits.length === 0) return;
	problems++;
	const why = digits.length ? `angka harus ditulis sebagai kata: ${digits.join(', ')}` : `butuh ±${sec.toFixed(1)} s, tersedia ${have} s`;
	stdout.write(`✗ ${m[1]}:${m[2]} - ${m[3]}:${m[4]}  ${why}\n    ${narration}\n`);
});
stdout.write(
	`${problems ? '✗' : '✓'} ${problems} baris terlalu padat · ${totalWords} kata (${(totalWords / totalSec).toFixed(2)} kata/detik) · bicara ±${Math.round(totalNeed)} dari ${totalSec} detik\n`,
);
exit(problems ? 1 : 0);
