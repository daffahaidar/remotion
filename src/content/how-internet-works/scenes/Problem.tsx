import React from 'react';
import type {IconType} from 'react-icons';
import {FaArrowTurnDown, FaCheck, FaCircleQuestion, FaHouse, FaServer, FaUser, FaXmark} from 'react-icons/fa6';
import {ManCharacter} from '../../../assets/character';
import {MONO, SFX, TONES, type Tone} from '../../shared/theme';
import {Actor, Bubble, Card, Headline, IconTile, Pill, Reveal, SceneShell, Sfx, TypeText, useLook, useRamp, useSec, Window} from '../../shared/ui';
import {NET, STAGE} from '../parts';

const ENTER_AT = 2;
const SWAP_AT = 3.1;
const NAME_AT = 4;
const IP_AT = 6.8;
const HOUSE_AT = 9.2;
const ASK_AT = 11.2;

const Badge: React.FC<{readonly ok: boolean}> = ({ok}) => {
	const fill = ok ? TONES.success.fill : TONES.danger.fill;
	const Icon = ok ? FaCheck : FaXmark;
	return (
		<div style={{width: 64, height: 64, borderRadius: 32, backgroundColor: fill, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 20px ${fill}66`}}>
			<Icon size={36} color="#ffffff" />
		</div>
	);
};

/** "Name vs number" card: who reads it, what it looks like. */
const Kind: React.FC<{
	readonly at: number;
	readonly icon: IconType;
	readonly tone: Tone;
	readonly title: string;
	readonly value: string;
	readonly sub: string;
	readonly ok: boolean;
	readonly children?: React.ReactNode;
}> = ({at, icon, tone, title, value, sub, ok, children}) => {
	const look = useLook();
	return (
		<Card at={at} tone={tone} style={{position: 'relative', width: 400, padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 8}}>
			<div style={{display: 'flex', alignItems: 'center', gap: 16}}>
				<IconTile icon={icon} tone={tone} size={72} />
				<span style={{fontSize: 36, fontWeight: 800}}>{title}</span>
			</div>
			<div style={{fontFamily: MONO, fontSize: 38, fontWeight: 800, color: look.tone(tone)}}>{value}</div>
			<div style={{fontSize: 30, fontWeight: 700, color: look.dim}}>{sub}</div>
			{children}
			<Reveal at={at + 0.6} damping={8} style={{right: 20, top: 20}}>
				<Badge ok={ok} />
			</Reveal>
		</Card>
	);
};

const Keycap: React.FC = () => {
	const pressed = useSec() >= ENTER_AT;
	return (
		<Card pressed={pressed} tone={pressed ? 'primary' : undefined} radius={22} style={{display: 'flex', alignItems: 'center', gap: 16, padding: '18px 40px', fontSize: 40, fontWeight: 800, scale: pressed ? 0.97 : 1}}>
			Enter
			<FaArrowTurnDown size={34} style={{rotate: '90deg'}} />
		</Card>
	);
};

const Budi: React.FC = () => {
	const t = useSec();
	return (
		<Actor x={250} floor={1460}>
			<ManCharacter
				expression={t < SWAP_AT ? 'happy' : t < ASK_AT ? 'surprised' : 'thinking'}
				pose="idle"
				poseTo="think"
				poseBlend={useRamp(ASK_AT, 0.35)}
				yaw={18}
				talking={t > ASK_AT && t < 13.9}
				style={{scale: 0.46}}
			/>
		</Actor>
	);
};

export const Problem: React.FC = () => (
	<SceneShell chapter="Masalahnya" chapterIcon={FaCircleQuestion}>
		<Headline text="Kamu ketik *google.com*" top={300} size={96} out={SWAP_AT - 0.1} />
		<Headline text="Komputer *cuma kenal angka*" top={300} size={88} at={SWAP_AT} tone={STAGE.dns} />

		<Reveal at={-0.1} kind="rise" style={{left: 110, top: 525}}>
			<Window width={860} url={<TypeText text={NET.domain} at={0.4} cps={10} />}>
				<div style={{height: 170, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<Keycap />
				</div>
			</Window>
		</Reveal>

		<Reveal at={NAME_AT} kind="left" style={{left: 110, top: 800}}>
			<Kind at={NAME_AT} icon={FaUser} tone="primary" title="Nama" value={NET.domain} sub="buat manusia" ok={false} />
		</Reveal>
		<Reveal at={IP_AT} kind="right" style={{left: 550, top: 800}}>
			<Kind at={IP_AT} icon={FaServer} tone={STAGE.dns} title="IP address" value={NET.ip} sub="buat komputer" ok>
				<div style={{height: 56}}>
					<Reveal at={HOUSE_AT} damping={10} style={{position: 'relative'}}>
						<Pill icon={FaHouse} tone={STAGE.dns} size={28}>
							= alamat rumah
						</Pill>
					</Reveal>
				</div>
			</Kind>
		</Reveal>

		<Budi />
		<Reveal at={ASK_AT} damping={10} style={{left: 430, top: 1180}}>
			<Bubble tail="left" size={40}>
				Alamatnya di mana?
			</Bubble>
		</Reveal>

		<Sfx name="Lights on" src={SFX.switch} at={0} volume={0.5} />
		<Sfx name="Typing URL" src={SFX.typing} at={0.4} volume={0.35} />
		<Sfx name="Enter" src={SFX.click} at={ENTER_AT} volume={0.55} />
		<Sfx name="Headline swap" src={SFX.whoosh} at={SWAP_AT} volume={0.25} />
		<Sfx name="Name card" src={SFX.pop} at={NAME_AT} volume={0.5} />
		<Sfx name="Name unknown" src={SFX.denied} at={NAME_AT + 0.6} volume={0.2} />
		<Sfx name="IP card" src={SFX.pop} at={IP_AT} volume={0.5} />
		<Sfx name="IP known" src={SFX.ding} at={IP_AT + 0.6} volume={0.35} />
		<Sfx name="House" src={SFX.pop} at={HOUSE_AT} volume={0.45} />
		<Sfx name="Bubble" src={SFX.pop} at={ASK_AT} volume={0.5} />
	</SceneShell>
);
