import React from 'react';
import type {IconType} from 'react-icons';
import {FaAddressBook, FaComments, FaHandshake, FaLayerGroup, FaLock, FaUserSecret} from 'react-icons/fa6';
import {MONO, SFX, TONES, type Tone} from '../../shared/theme';
import {Card, Headline, IconTile, Pill, raised, Reveal, SceneShell, Sfx, useLook, useRamp} from '../../shared/ui';
import {NET, STAGE} from '../parts';

const FOCUS_AT = 18.2;
const STICKER_AT = 19.5;
const CARDS: readonly {at: number; name: string; tone: Tone; icon: IconType; job: string; alias: string; sample: string}[] = [
	{at: 3.2, name: 'DNS', tone: STAGE.dns, icon: FaAddressBook, job: 'cari alamat', alias: 'kontak', sample: `${NET.domain} → ${NET.ip}`},
	{at: 7.2, name: 'TCP', tone: STAGE.tcp, icon: FaHandshake, job: 'buka sambungan', alias: 'halo-halo', sample: 'SYN → SYN-ACK → ACK'},
	{at: 10.7, name: 'TLS', tone: STAGE.tls, icon: FaLock, job: 'pasang gembok', alias: 'sandi', sample: `isi → ${NET.cipher.slice(0, 17)} …`},
	{at: 14.6, name: 'HTTP', tone: STAGE.http, icon: FaComments, job: 'minta halaman', alias: 'obrolan', sample: 'GET /  →  200 OK'},
];
const TLS = 2;

const StageCard: React.FC<{readonly c: (typeof CARDS)[number]; readonly n: number}> = ({c, n}) => {
	const look = useLook();
	return (
		<Card at={c.at} tone={c.tone} style={{width: 840, padding: '20px 28px', display: 'flex', alignItems: 'center', gap: 22}}>
			<div
				style={{
					width: 64,
					height: 64,
					flexShrink: 0,
					borderRadius: 32,
					backgroundColor: look.bg,
					boxShadow: raised(look, 5),
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					fontFamily: MONO,
					fontSize: 34,
					fontWeight: 800,
					color: look.tone(c.tone),
				}}
			>
				{n}
			</div>
			<div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 10}}>
				<div style={{display: 'flex', alignItems: 'center', gap: 16}}>
					<IconTile icon={c.icon} tone={c.tone} size={56} />
					<span style={{fontSize: 40, fontWeight: 800, color: look.tone(c.tone)}}>{c.name}</span>
					<span style={{fontSize: 34, fontWeight: 700}}>{c.job}</span>
					<span style={{marginLeft: 'auto'}}>
						<Pill tone={c.tone} size={24}>
							= {c.alias}
						</Pill>
					</span>
				</div>
				<div style={{fontFamily: MONO, fontSize: 32, fontWeight: 700, color: look.tone(c.tone), whiteSpace: 'nowrap'}}>{c.sample}</div>
			</div>
		</Card>
	);
};

/** All cards; at the re-hook the non-TLS ones dim and the TLS one gets a gold ring. */
const Stack: React.FC = () => {
	const dim = useRamp(FOCUS_AT, 0.4);
	return (
		<>
			{CARDS.map((c, i) => (
				<Reveal key={c.name} at={c.at} kind={i % 2 ? 'right' : 'left'} style={{left: 110, top: 470 + i * 170}}>
					<div style={{opacity: i === TLS ? 1 : 1 - 0.6 * dim}}>
						<StageCard c={c} n={i + 1} />
					</div>
				</Reveal>
			))}
			<div
				style={{
					position: 'absolute',
					left: 100,
					top: 470 + TLS * 170 - 10,
					width: 860,
					height: 168,
					borderRadius: 38,
					border: `5px solid ${TONES.gold.fill}`,
					boxShadow: `0 0 40px ${TONES.gold.fill}88`,
					opacity: dim,
					scale: 1 + 0.015 * Math.sin(dim * Math.PI),
				}}
			/>
		</>
	);
};

export const Anatomy: React.FC = () => (
	<SceneShell chapter="Anatomi" chapterIcon={FaLayerGroup}>
		<Headline text="Ada *4 tahap*" top={300} size={100} />
		<Stack />
		<Reveal at={STICKER_AT} damping={9} style={{left: 0, width: 1080, top: 1190, display: 'flex', justifyContent: 'center', rotate: '-3deg'}}>
			<Pill icon={FaUserSecret} tone="danger" solid size={36}>
				Ini kenapa hacker gagal!
			</Pill>
		</Reveal>

		{CARDS.map((c) => (
			<Sfx key={c.name} name={`${c.name} card`} src={SFX.pop} at={c.at} volume={0.5} />
		))}
		<Sfx name="Focus TLS" src={SFX.sparkle} at={FOCUS_AT} volume={0.45} />
		<Sfx name="Re-hook" src={SFX.glitch} at={STICKER_AT} volume={0.35} />
	</SceneShell>
);
