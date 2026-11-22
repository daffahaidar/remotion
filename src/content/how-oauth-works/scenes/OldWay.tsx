import React from 'react';
import type {IconType} from 'react-icons';
import {
	FaAddressBook,
	FaBan,
	FaCalendarCheck,
	FaDatabase,
	FaEnvelope,
	FaGoogleDrive,
	FaKey,
	FaLockOpen,
} from 'react-icons/fa6';
import {MONO, SFX} from '../../shared/theme';
import {Card, Headline, IconTile, Reveal, SceneShell, Sfx, Stamp, TypeText, useLook} from '../../shared/ui';
import {OAUTH, ROLE} from '../parts';

const STAMP_AT = 10.8;
const RISKS: readonly {at: number; icon: IconType; title: string; sub: string}[] = [
	{at: 3, icon: FaLockOpen, title: 'Akses penuh', sub: 'email, Drive, semuanya'},
	{at: 6, icon: FaBan, title: 'Nggak bisa dicabut', sub: 'kecuali ganti password'},
	{at: 9, icon: FaDatabase, title: 'Ikut bocor', sub: 'kalau aplikasinya dibobol'},
];
const EVERYTHING = [
	{at: 4, icon: FaEnvelope},
	{at: 4.4, icon: FaGoogleDrive},
	{at: 4.8, icon: FaAddressBook},
];

const Request: React.FC = () => {
	const look = useLook();
	return (
		<Card
			at={0.8}
			tone={ROLE.client}
			style={{width: 840, padding: '22px 28px', display: 'flex', alignItems: 'center', gap: 22}}
		>
			<IconTile icon={FaCalendarCheck} tone={ROLE.client} size={80} />
			<div style={{flex: 1}}>
				<div style={{fontSize: 34, fontWeight: 800}}>{OAUTH.app} minta:</div>
				<div
					style={{
						marginTop: 8,
						height: 64,
						borderRadius: 16,
						boxShadow: look.inset,
						display: 'flex',
						alignItems: 'center',
						gap: 16,
						padding: '0 22px',
						fontFamily: MONO,
						fontSize: 32,
						fontWeight: 700,
					}}
				>
					<FaKey size={28} color={look.tone('danger')} />
					<TypeText text="••••••••••" at={1} cps={9} style={{color: look.tone('danger'), letterSpacing: '0.12em'}} />
				</div>
			</div>
		</Card>
	);
};

const Risk: React.FC<{readonly risk: (typeof RISKS)[number]; readonly index: number}> = ({risk, index}) => {
	const look = useLook();
	return (
		<Card
			at={risk.at}
			tone="danger"
			style={{width: 840, padding: '24px 30px', display: 'flex', alignItems: 'center', gap: 26}}
		>
			<IconTile icon={risk.icon} tone="danger" size={86} />
			<div style={{flex: 1}}>
				<div style={{fontSize: 46, fontWeight: 800}}>{risk.title}</div>
				<div style={{fontSize: 34, fontWeight: 700, color: look.dim}}>{risk.sub}</div>
			</div>
			{index === 0 ? (
				<div style={{display: 'flex', gap: 10}}>
					{EVERYTHING.map((e) => (
						<Reveal key={e.at} at={e.at} damping={9} style={{position: 'relative'}}>
							<e.icon size={42} color={look.tone('danger')} />
						</Reveal>
					))}
				</div>
			) : (
				<span style={{fontFamily: MONO, fontSize: 40, fontWeight: 800, opacity: 0.35}}>0{index + 1}</span>
			)}
		</Card>
	);
};

export const OldWay: React.FC = () => (
	<SceneShell chapter="Cara lama" chapterIcon={FaKey} shakeAt={STAMP_AT}>
		<Headline text="Cara lama: *kasih password*" top={300} size={96} tone="danger" />
		<Reveal at={0.8} kind="rise" style={{left: 120, top: 540}}>
			<Request />
		</Reveal>
		{RISKS.map((r, i) => (
			<Reveal key={r.title} at={r.at} kind="left" style={{left: 120, top: 720 + i * 172}}>
				<Risk risk={r} index={i} />
			</Reveal>
		))}
		<Stamp at={STAMP_AT} size={80} rotate={-6} style={{left: 0, right: 0, top: 1255}}>
			TERLALU BERISIKO
		</Stamp>

		<Sfx name="Request" src={SFX.pop} at={0.8} volume={0.45} />
		<Sfx name="Typing password" src={SFX.typing} at={1} volume={0.35} />
		{RISKS.map((r) => (
			<Sfx key={r.title} name="Risk" src={SFX.pop} at={r.at} volume={0.5} />
		))}
		{EVERYTHING.map((e) => (
			<Sfx key={e.at} name="Unlocked" src={SFX.click} at={e.at} volume={0.35} />
		))}
		<Sfx name="Leak" src={SFX.glitch} at={9.4} volume={0.35} />
		<Sfx name="Stamp" src={SFX.boom} at={STAMP_AT} volume={0.45} />
	</SceneShell>
);
