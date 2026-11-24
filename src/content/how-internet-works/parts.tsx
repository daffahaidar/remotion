import React from 'react';
import {FaArrowRight} from 'react-icons/fa6';
import {interpolate} from 'remotion';
import type {ExpressionName, PoseName} from '../../assets/character/hacker';
import type {Tone} from '../shared/theme';
import {current, HackerDesk, Pill, Reveal, useLook, useSec} from '../shared/ui';

/** One color per stage of opening a page, used the same way in every scene (the phone analogy too). */
export const STAGE = {
	dns: 'signature', // DNS: cari alamat (= kontak)
	tcp: 'success', // TCP: buka sambungan (= halo-halo)
	tls: 'gold', // TLS: gembok (= bahasa sandi)
	http: 'payload', // HTTP: minta halaman (= obrolan)
} as const satisfies Record<string, Tone>;

export const STAGES = [
	{name: 'DNS', tone: STAGE.dns},
	{name: 'TCP', tone: STAGE.tcp},
	{name: 'TLS', tone: STAGE.tls},
	{name: 'HTTP', tone: STAGE.http},
] as const;

/**
 * Real example values (sources at the end of script_dubbing.md):
 * - ip: the address MDN gives for google.com in "How does the Internet work?" (real answers vary by location).
 * - issuer: the CA on www.google.com's certificate, checked with openssl on 24 Nov 2026.
 * - cipher: a TLS 1.3 encrypted record as seen on the wire: 17 = application_data, 03 03 = record version, then ciphertext.
 * - htmlKb / packets: the gzip'ed homepage HTML measured with curl on 24 Nov 2026 (29,810 bytes ≈ 20 TCP segments of 1,460 bytes).
 */
export const NET = {
	domain: 'google.com',
	host: 'www.google.com',
	ip: '142.250.190.78',
	issuer: 'Google Trust Services',
	cipher: '17 03 03 00 5a 9c e1 7b 3f d2 …',
	wifi: 'WiFi Kafe Gratis',
	htmlKb: 30,
	packets: 20,
} as const;

/** DNS → TCP → TLS → HTTP as raised pills in their stage colors (white on gold would be unreadable). */
export const StageStrip: React.FC<{readonly size?: number}> = ({size = 34}) => {
	const look = useLook();
	return (
		<div style={{display: 'flex', alignItems: 'center', gap: size * 0.4}}>
			{STAGES.map((s, i) => (
				<React.Fragment key={s.name}>
					{i ? <FaArrowRight size={size * 0.8} color={look.dim} /> : null}
					<Pill tone={s.tone} size={size}>
						{s.name}
					</Pill>
				</React.Fragment>
			))}
		</div>
	);
};

/** Small "Sumber: …" line at the bottom of the safe zone. */
export const SourceNote: React.FC<{readonly at: number; readonly children: React.ReactNode}> = ({at, children}) => {
	const look = useLook();
	return (
		<Reveal at={at} kind="fade" style={{left: 0, width: 1080, top: 1395, display: 'flex', justifyContent: 'center', fontSize: 26, fontWeight: 700, color: look.dim}}>
			{children}
		</Reveal>
	);
};

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/** The café-Wi-Fi hacker at his desk, following pose / expression timelines (seconds into the scene). */
export const CafeHacker: React.FC<{
	readonly x: number;
	readonly scale: number;
	readonly poses: readonly {at: number; pose: PoseName}[];
	readonly expressions: readonly {at: number; e: ExpressionName}[];
	/** From here on the laptop shows an error screen. */
	readonly failAt: number;
}> = ({x, scale, poses, expressions, failAt}) => {
	const t = useSec();
	const i = current(poses, t);
	return (
		<HackerDesk
			x={x}
			floor={1490}
			scale={scale}
			screen={t < failAt ? 'terminal' : 'error'}
			hacker={{
				expression: expressions[current(expressions, t)].e,
				pose: poses[Math.max(0, i - 1)].pose,
				poseTo: poses[i].pose,
				poseBlend: interpolate(t, [poses[i].at, poses[i].at + 0.3], [0, 1], clamp),
			}}
		/>
	);
};
