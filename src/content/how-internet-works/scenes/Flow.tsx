import React from 'react';
import {FaAddressBook, FaCircleCheck, FaGoogle, FaLink, FaLock, FaPaintbrush, FaWindowMaximize} from 'react-icons/fa6';
import {SFX, type Tone} from '../../shared/theme';
import {Arrow, Caption, Headline, Lane, LifeLine, Pill, Reveal, SceneShell, Sfx, Step} from '../../shared/ui';
import {NET, STAGE} from '../parts';

const BROWSER_X = 200;
const DNS_X = 540;
const GOOGLE_X = 880;
const LANE_W = 300;
const BD_X = (BROWSER_X + DNS_X) / 2;

/** at = when the step number appears (matches the narration), y = label row. */
const S = {
	dns: {at: 2, y: 620},
	tcp: {at: 5, y: 770},
	tls: {at: 8, y: 930},
	get: {at: 12, y: 1080},
	ok: {at: 15, y: 1220},
	paint: {at: 17, y: 1360},
} as const;
const SHOWN_AT = 18.6;
/** The three TCP handshake messages: SYN →, SYN-ACK ←, ACK →. */
const HANDSHAKE = [
	{at: 5.3, dy: 45, toGoogle: true},
	{at: 5.8, dy: 68, toGoogle: false},
	{at: 6.3, dy: 91, toGoogle: true},
];

/** Arrow between the browser lane and another lane, just under a step label. */
const Hop: React.FC<{readonly at: number; readonly y: number; readonly to: number; readonly back?: boolean; readonly tone: Tone}> = ({
	at,
	y,
	to,
	back,
	tone,
}) => (back ? <Arrow x1={to - 10} y1={y} x2={BROWSER_X + 10} y2={y} at={at} tone={tone} width={6} /> : <Arrow x1={BROWSER_X + 10} y1={y} x2={to - 10} y2={y} at={at} tone={tone} width={6} />);

export const Flow: React.FC = () => (
	<SceneShell chapter="Alur lengkap" chapterIcon={FaLink}>
		<Headline text="Alur *lengkap*" top={300} size={92} />
		<Lane x={BROWSER_X} icon={FaWindowMaximize} tone="primary" label="BROWSER" width={LANE_W} />
		<Lane x={DNS_X} icon={FaAddressBook} tone={STAGE.dns} label="DNS" width={LANE_W} />
		<Lane x={GOOGLE_X} icon={FaGoogle} tone={STAGE.http} label="GOOGLE" width={LANE_W} />
		<LifeLine x={BROWSER_X} />
		<LifeLine x={DNS_X} />
		<LifeLine x={GOOGLE_X} />

		<Step n={1} at={S.dns.at} x={BD_X} y={S.dns.y} tone={STAGE.dns}>
			<Pill size={28} mono>
				{NET.domain}?
			</Pill>
		</Step>
		<Hop at={S.dns.at + 0.6} y={S.dns.y + 50} to={DNS_X} back tone={STAGE.dns} />
		<Caption at={S.dns.at + 1.2} x={BD_X} y={S.dns.y + 64}>
			IP: {NET.ip}
		</Caption>

		<Step n={2} at={S.tcp.at} x={DNS_X} y={S.tcp.y} tone={STAGE.tcp}>
			<Pill size={28} mono>
				SYN · SYN-ACK · ACK
			</Pill>
		</Step>
		{HANDSHAKE.map((h) => (
			<Hop key={h.at} at={h.at} y={S.tcp.y + h.dy} to={GOOGLE_X} back={!h.toGoogle} tone={STAGE.tcp} />
		))}

		<Step n={3} at={S.tls.at} x={DNS_X} y={S.tls.y} tone={STAGE.tls}>
			<Pill icon={FaLock} tone={STAGE.tls} size={28}>
				sertifikat + kunci rahasia
			</Pill>
		</Step>
		<Hop at={S.tls.at + 0.4} y={S.tls.y + 50} to={GOOGLE_X} back tone={STAGE.tls} />
		<Caption at={S.tls.at + 1.6} y={S.tls.y + 64}>
			{NET.host} · {NET.issuer}
		</Caption>

		<Step n={4} at={S.get.at} x={DNS_X} y={S.get.y} tone={STAGE.http}>
			<Pill size={28} mono>
				GET /
			</Pill>
		</Step>
		<Hop at={S.get.at + 0.3} y={S.get.y + 50} to={GOOGLE_X} tone={STAGE.http} />
		<Caption at={S.get.at + 0.8} y={S.get.y + 64}>
			Host: {NET.host}
		</Caption>

		<Step n={5} at={S.ok.at} x={DNS_X} y={S.ok.y} tone={STAGE.http}>
			<Pill tone={STAGE.http} solid size={28} mono>
				200 OK
			</Pill>
		</Step>
		<Hop at={S.ok.at + 0.3} y={S.ok.y + 50} to={GOOGLE_X} back tone={STAGE.http} />
		<Caption at={S.ok.at + 0.7} y={S.ok.y + 64}>
			&lt;!doctype html&gt;…
		</Caption>

		<Step n={6} at={S.paint.at} x={300} y={S.paint.y} tone="primary">
			<Pill icon={FaPaintbrush} tone="primary" size={28}>
				menggambar halaman
			</Pill>
		</Step>
		<Reveal at={SHOWN_AT} damping={10} style={{left: 560, top: S.paint.y - 30}}>
			<Pill icon={FaCircleCheck} tone="success" solid size={28}>
				halaman tampil!
			</Pill>
		</Reveal>

		{Object.values(S).map((s) => (
			<Sfx key={s.at} name="Step" src={SFX.click} at={s.at} volume={0.5} />
		))}
		{[S.dns.at + 0.6, ...HANDSHAKE.map((h) => h.at), S.tls.at + 0.4, S.get.at + 0.3, S.ok.at + 0.3].map((at) => (
			<Sfx key={at} name="Send" src={SFX.whoosh} at={at} volume={0.22} />
		))}
		<Sfx name="Lock" src={SFX.sparkle} at={S.tls.at + 0.4} volume={0.4} />
		<Sfx name="200 OK" src={SFX.ding} at={S.ok.at} volume={0.4} />
		<Sfx name="Page shown" src={SFX.ding} at={SHOWN_AT} volume={0.4} />
	</SceneShell>
);
