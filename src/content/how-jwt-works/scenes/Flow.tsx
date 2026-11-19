import React from 'react';
import type {IconType} from 'react-icons';
import {FaBolt, FaCircleCheck, FaFloppyDisk, FaLink, FaMobileScreen, FaServer, FaShieldHalved} from 'react-icons/fa6';
import {JWT, MONO, SFX, TONES, type Tone} from '../theme';
import {Arrow, Card, Headline, IconTile, Pill, Reveal, SceneShell, Sfx, TokenText, useLook, useRamp} from '../ui';

const CLIENT_X = 290;
const SERVER_X = 790;

const Lane: React.FC<{readonly x: number; readonly icon: IconType; readonly label: string}> = ({x, icon, label}) => (
	<Reveal at={0.7} kind="drop" style={{left: x - 180, top: 470, width: 360}}>
		<Card at={0.7} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '18px 0'}}>
			<IconTile icon={icon} size={66} />
			<span style={{fontSize: 36, fontWeight: 800, letterSpacing: '0.06em'}}>{label}</span>
		</Card>
	</Reveal>
);

const LifeLine: React.FC<{readonly x: number}> = ({x}) => {
	const look = useLook();
	const p = useRamp(1, 1.2);
	return <div style={{position: 'absolute', left: x - 3, top: 590, width: 6, height: 860 * p, borderRadius: 3, backgroundImage: `repeating-linear-gradient(${look.dim}66 0 14px, transparent 14px 28px)`}} />;
};

/** Step number badge + label, centered on (x, y). */
const Step: React.FC<{readonly n: number; readonly at: number; readonly x: number; readonly y: number; readonly tone?: Tone; readonly children: React.ReactNode}> = ({
	n,
	at,
	x,
	y,
	tone = 'primary',
	children,
}) => (
	<Reveal at={at} damping={12} style={{left: x - 400, top: y - 36, width: 800, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12}}>
		<div style={{width: 56, height: 56, borderRadius: 28, backgroundColor: TONES[tone].fill, color: '#ffffff', fontSize: 32, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
			{n}
		</div>
		{children}
	</Reveal>
);

const Note: React.FC<{readonly at: number; readonly y: number; readonly children: React.ReactNode}> = ({at, y, children}) => {
	const look = useLook();
	return (
		<Reveal at={at} kind="fade" style={{left: 0, width: 1080, top: y, display: 'flex', justifyContent: 'center', fontFamily: MONO, fontSize: 30, fontWeight: 700, color: look.dim}}>
			{children}
		</Reveal>
	);
};

export const Flow: React.FC = () => (
	<SceneShell chapter="Alur lengkap" chapterIcon={FaLink}>
		<Headline text="Alur *lengkap* JWT" top={300} size={92} />
		<Lane x={CLIENT_X} icon={FaMobileScreen} label="APLIKASI" />
		<Lane x={SERVER_X} icon={FaServer} label="SERVER" />
		<LifeLine x={CLIENT_X} />
		<LifeLine x={SERVER_X} />

		<Step n={1} at={2.6} x={540} y={640}>
			<Pill size={30} mono>
				POST /login
			</Pill>
		</Step>
		<Arrow x1={CLIENT_X + 10} y1={690} x2={SERVER_X - 10} y2={690} at={2.9} />
		<Note at={3.2} y={705}>
			email + password
		</Note>

		<Step n={2} at={6.2} x={SERVER_X - 60} y={800} tone="success">
			<Pill icon={FaCircleCheck} tone="success" size={30}>
				cek → buat JWT
			</Pill>
		</Step>
		<Reveal at={7.4} kind="fade" style={{left: 340, top: 845, width: 400, display: 'flex', justifyContent: 'center'}}>
			<TokenText parts={[JWT.header.slice(0, 6), JWT.payload.slice(0, 6), JWT.signature.slice(0, 6)]} size={30} />
		</Reveal>
		<Arrow x1={SERVER_X - 10} y1={905} x2={CLIENT_X + 10} y2={905} at={7.6} tone="payload" />

		<Step n={3} at={10.6} x={CLIENT_X + 40} y={985}>
			<Pill icon={FaFloppyDisk} size={30}>
				simpan token
			</Pill>
		</Step>

		<Step n={4} at={13.6} x={540} y={1085}>
			<Pill size={30} mono>
				GET /profil
			</Pill>
		</Step>
		<Arrow x1={CLIENT_X + 10} y1={1135} x2={SERVER_X - 10} y2={1135} at={13.9} />
		<Note at={14.3} y={1150}>
			Authorization: Bearer eyJhbG…
		</Note>

		<Step n={5} at={18} x={SERVER_X - 60} y={1245} tone="signature">
			<Pill icon={FaShieldHalved} tone="signature" size={30}>
				cek signature ✓
			</Pill>
		</Step>
		<Arrow x1={SERVER_X - 10} y1={1310} x2={CLIENT_X + 10} y2={1310} at={19.6} tone="success" />
		<Reveal at={19.9} damping={10} style={{left: 0, width: 1080, top: 1335, display: 'flex', justifyContent: 'center', gap: 14}}>
			<Pill tone="success" solid size={32}>
				200 OK · data profil
			</Pill>
			<Pill icon={FaBolt} tone="gold" size={30}>
				tanpa cek sesi
			</Pill>
		</Reveal>

		<Sfx name="Step 1" src={SFX.click} at={2.6} volume={0.5} />
		<Sfx name="Send login" src={SFX.whoosh} at={2.9} volume={0.3} />
		<Sfx name="Step 2" src={SFX.ding} at={6.2} volume={0.35} />
		<Sfx name="Token back" src={SFX.whoosh} at={7.6} volume={0.3} />
		<Sfx name="Step 3 save" src={SFX.click} at={10.6} volume={0.5} />
		<Sfx name="Step 4" src={SFX.click} at={13.6} volume={0.5} />
		<Sfx name="Send request" src={SFX.whoosh} at={13.9} volume={0.3} />
		<Sfx name="Step 5 verify" src={SFX.beep} at={18} volume={0.4} />
		<Sfx name="200 OK" src={SFX.ding} at={19.9} volume={0.45} />
	</SceneShell>
);
