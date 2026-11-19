import React from 'react';
import type {IconType} from 'react-icons';
import {FaCreditCard, FaEye, FaKey, FaTriangleExclamation, FaUserSecret, FaXmark} from 'react-icons/fa6';
import {JWT, MONO, SFX, TONES} from '../theme';
import {Arrow, Card, Headline, IconTile, Pill, Reveal, SceneShell, Scramble, Sfx, Stamp, useLook} from '../ui';

const DECODED = ['{', '  "sub": "123",', '  "name": "Budi",', '  "role": "user",', '  "exp": 1798761600', '}'];
const NEVER: readonly {at: number; icon: IconType; label: string}[] = [
	{at: 8.3, icon: FaKey, label: 'Password'},
	{at: 8.8, icon: FaCreditCard, label: 'PIN / nomor kartu'},
	{at: 9.3, icon: FaUserSecret, label: 'Data rahasia lain'},
];

const Decoded: React.FC = () => {
	const look = useLook();
	return (
		<Card at={2.9} style={{width: 900, padding: '24px 40px', fontFamily: MONO, fontSize: 42, fontWeight: 700, lineHeight: 1.4, whiteSpace: 'pre'}}>
			{DECODED.map((line, i) => (
				<div key={line} style={{color: i === 0 || i === DECODED.length - 1 ? look.dim : look.tone('payload')}}>
					<Scramble text={line} from={' '.repeat(line.length)} at={2.9 + i * 0.12} dur={0.6} />
				</div>
			))}
		</Card>
	);
};

const NeverRow: React.FC<{readonly icon: IconType; readonly label: string; readonly at: number}> = ({icon, label, at}) => (
	<Card at={at} style={{width: 860, padding: '28px 32px', display: 'flex', alignItems: 'center', gap: 26}}>
		<IconTile icon={icon} tone="danger" size={86} />
		<div style={{flex: 1, fontSize: 48, fontWeight: 800}}>{label}</div>
		<Reveal at={at + 0.25} damping={8} style={{position: 'relative'}}>
			<div style={{width: 76, height: 76, borderRadius: 38, backgroundColor: TONES.danger.fill, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
				<FaXmark size={46} color="#ffffff" />
			</div>
		</Reveal>
	</Card>
);

export const NotEncrypted: React.FC = () => (
	<SceneShell chapter="Awas!" chapterIcon={FaTriangleExclamation} shakeAt={0.05}>
		<Reveal at={-0.05} out={1.3} damping={8} style={{left: 0, width: 1080, top: 640, display: 'flex', justifyContent: 'center'}}>
			<div style={{fontSize: 230, fontWeight: 800, letterSpacing: '-0.03em', color: TONES.warning.fill, rotate: '-4deg'}}>TAPI...</div>
		</Reveal>

		<Headline text="Payload *bisa dibaca!*" top={300} at={1.4} size={96} tone="warning" />

		<Reveal at={1.9} out={7.9} kind="rise" style={{left: 90, top: 540, width: 900}}>
			<Card pressed style={{padding: '22px 30px'}}>
				<div style={{fontSize: 28, fontWeight: 800, letterSpacing: '0.1em', color: TONES.payload.fill, marginBottom: 8}}>PAYLOAD (BASE64)</div>
				<div style={{fontFamily: MONO, fontSize: 32, fontWeight: 700, color: TONES.payload.fill, wordBreak: 'break-all', lineHeight: 1.35}}>{JWT.payload}</div>
			</Card>
		</Reveal>
		<Reveal at={2.5} out={7.9} kind="fade" style={{left: 0, top: 0, width: 1080, height: 1920}}>
			<Arrow x1={300} y1={745} x2={300} y2={830} at={2.5} dur={0.35} tone="warning" />
			<div style={{position: 'absolute', left: 350, top: 760}}>
				<Pill tone="warning" size={30} mono>
					decode Base64
				</Pill>
			</div>
		</Reveal>
		<Reveal at={2.9} out={7.9} kind="fade" style={{left: 90, top: 850}}>
			<Decoded />
		</Reveal>
		<Stamp at={4.3} out={7.9} tone="warning" size={76} rotate={-8} style={{left: 0, right: 0, top: 585}}>
			BUKAN DIENKRIPSI!
		</Stamp>
		<Reveal at={5.4} out={7.9} kind="rise" style={{left: 0, width: 1080, top: 1330, display: 'flex', justifyContent: 'center'}}>
			<Pill icon={FaEye} tone="primary" size={40}>
				Siapa pun bisa baca
			</Pill>
		</Reveal>

		<Reveal at={8} kind="rise" style={{left: 0, width: 1080, top: 600, display: 'flex', justifyContent: 'center'}}>
			<Pill tone="danger" solid size={42}>
				JANGAN simpan di payload:
			</Pill>
		</Reveal>
		{NEVER.map((n, i) => (
			<Reveal key={n.label} at={n.at} kind="left" style={{left: 110, top: 740 + i * 190}}>
				<NeverRow icon={n.icon} label={n.label} at={n.at} />
			</Reveal>
		))}

		<Sfx name="Record scratch" src={SFX.scratch} at={0} volume={0.55} />
		<Sfx name="Payload chip" src={SFX.pop} at={1.9} volume={0.45} />
		<Sfx name="Decode" src={SFX.glitch} at={2.9} volume={0.4} />
		<Sfx name="Stamp" src={SFX.boom} at={4.3} volume={0.4} />
		<Sfx name="Eye" src={SFX.pop} at={5.4} volume={0.45} />
		<Sfx name="Never list" src={SFX.whoosh} at={8} volume={0.3} />
		{NEVER.map((n) => (
			<Sfx key={n.label} name="Never item" src={SFX.denied} at={n.at + 0.25} volume={0.22} />
		))}
	</SceneShell>
);
