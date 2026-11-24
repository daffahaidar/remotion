import React from 'react';
import {FaEye, FaGear, FaGoogle, FaKey, FaLock, FaUserLock, FaUserSecret, FaXmark} from 'react-icons/fa6';
import {interpolate} from 'remotion';
import type {PoseName} from '../../../assets/character/hacker';
import {Padlock, ServerRack} from '../../../assets/property';
import {MONO, SFX, TONES} from '../../shared/theme';
import {Card, Glow, Headline, IconTile, Pill, Place, Reveal, SceneShell, Scramble, Sfx, Stamp, Travel, useLook, useSec} from '../../shared/ui';
import {CafeHacker, NET, STAGE} from '../parts';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const SEEN_AT = 2.2;
const GOOGLE_AT = 4.2;
const LOCK_AT = 6.2;
const TRY_AT = 9;
const NO_KEY_AT = 9.5;
const FAIL_AT = 12;
const SAFE_AT = 13.6;
const SECRET_AT = 16.2;

const POSES: readonly {at: number; pose: PoseName}[] = [
	{at: 0, pose: 'typing'},
	{at: SEEN_AT, pose: 'fistPump'},
	{at: LOCK_AT, pose: 'think'},
	{at: TRY_AT, pose: 'typing'},
	{at: FAIL_AT, pose: 'surprised'},
	{at: SAFE_AT, pose: 'facepalm'},
];
const EXPRESSIONS = [
	{at: 0, e: 'smirk'},
	{at: SEEN_AT, e: 'laugh'},
	{at: LOCK_AT, e: 'confused'},
	{at: TRY_AT, e: 'focused'},
	{at: NO_KEY_AT, e: 'nervousLaugh'},
	{at: FAIL_AT, e: 'crying'},
	{at: SAFE_AT, e: 'sad'},
] as const;

/** What a Wi-Fi eavesdropper does see: who talks to which IP. */
const Seen: React.FC = () => {
	const look = useLook();
	return (
		<Card at={SEEN_AT} style={{width: 860, padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 12}}>
			<div style={{display: 'flex', alignItems: 'center', gap: 14, fontSize: 32, fontWeight: 700, color: look.dim}}>
				<FaEye size={32} />
				Yang dia lihat:
			</div>
			<div style={{fontFamily: MONO, fontSize: 42, fontWeight: 700}}>
				HP-Budi → <span style={{color: look.tone('primary')}}>{NET.ip}</span>
			</div>
			<div style={{height: 56}}>
				<Reveal at={GOOGLE_AT} damping={10} style={{position: 'relative'}}>
					<Pill icon={FaGoogle} tone={STAGE.dns} size={30}>
						= server Google
					</Pill>
				</Reveal>
			</div>
		</Card>
	);
};

/** What he cannot read: the TLS-encrypted content, and his failed attempt to open it. */
const Locked: React.FC = () => {
	const look = useLook();
	const t = useSec();
	return (
		<Card at={LOCK_AT} tone={STAGE.tls} style={{width: 860, padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 16}}>
			<div style={{display: 'flex', alignItems: 'center', gap: 20}}>
				<IconTile icon={FaLock} tone={STAGE.tls} size={76} />
				<span style={{fontFamily: MONO, fontSize: 36, fontWeight: 700, color: look.tone(STAGE.tls)}}>{NET.cipher}</span>
			</div>
			<div style={{height: 60}}>
				<Reveal at={TRY_AT} kind="left" style={{position: 'relative'}}>
					<div style={{display: 'flex', alignItems: 'center', gap: 16, fontFamily: MONO, fontSize: 34, fontWeight: 700}}>
						<FaGear size={40} color={TONES.gold.fill} style={{rotate: `${t * (t < FAIL_AT ? 420 : 40)}deg`}} />
						<span style={{color: look.dim}}>buka isi:</span>
						<span style={{color: look.tone('danger')}}>
							<Scramble text="cara-move-on" from="" at={TRY_AT} dur={1000} />
						</span>
					</div>
				</Reveal>
			</div>
			<div style={{height: 56}}>
				<Reveal at={NO_KEY_AT} damping={9} style={{position: 'relative'}}>
					<Pill icon={FaKey} tone="danger" solid size={30}>
						kunci: nggak punya <FaXmark size={28} />
					</Pill>
				</Reveal>
			</div>
		</Card>
	);
};

const Stage: React.FC = () => {
	const t = useSec();
	return (
		<>
			<Glow x={330} y={1230} r={420} color="rgba(34, 197, 94, 0.32)" />
			<Glow x={820} y={1250} r={330} color="rgba(56, 189, 248, 0.28)" />
			<CafeHacker x={320} scale={0.62} poses={POSES} expressions={EXPRESSIONS} failAt={FAIL_AT} />
			<Place x={700} y={1065} scale={0.75}>
				<ServerRack status="healthy" label="GOOGLE" />
			</Place>

			<Headline text="Ingat *hacker* tadi?" top={300} size={100} tone="danger" out={5.8} />
			<Reveal at={SEEN_AT} out={5.8} kind="rise" style={{left: 110, top: 540}}>
				<Seen />
			</Reveal>

			<Headline text="Isinya *dikunci TLS*" top={300} size={100} tone={STAGE.tls} at={6} out={SAFE_AT - 0.2} />
			<Reveal at={LOCK_AT} out={SAFE_AT - 0.2} kind="rise" style={{left: 110, top: 520}}>
				<Locked />
			</Reveal>
			<Travel from={[40, 1170]} to={[810, 1190]} at={6.6} dur={0.9} arc={-200}>
				<Pill icon={FaLock} tone={STAGE.tls} solid size={28}>
					paket Budi
				</Pill>
			</Travel>

			<div
				style={{
					position: 'absolute',
					inset: 0,
					backgroundColor: TONES.danger.fill,
					opacity: interpolate(t, [FAIL_AT, FAIL_AT + 0.06, FAIL_AT + 0.7], [0, 0.3, 0], clamp),
				}}
			/>
			<Stamp at={FAIL_AT} out={SAFE_AT - 0.2} size={86} style={{left: 0, right: 0, top: 815}}>
				GAGAL NGINTIP!
			</Stamp>

			<Reveal at={SAFE_AT} kind="fade" style={{left: 0, top: 0, width: 1080, height: 1920}}>
				<Glow x={540} y={620} r={330} color="rgba(234, 179, 8, 0.3)" />
			</Reveal>
			<Reveal at={SAFE_AT} damping={10} style={{left: 405, top: 440}}>
				<div style={{scale: 1.5, transformOrigin: 'top left'}}>
					<Padlock locked color="gold" />
				</div>
			</Reveal>
			<Headline text="Kunci cuma di *browser & Google*" top={800} size={76} tone={STAGE.tls} at={SAFE_AT + 0.4} />
			<Reveal at={SECRET_AT} damping={10} style={{left: 470, top: 990}}>
				<Pill icon={FaUserLock} tone="success" size={30}>
					Pencarian Budi: rahasia
				</Pill>
			</Reveal>
		</>
	);
};

export const SnifferFails: React.FC = () => (
	<SceneShell theme="dark" chapter="Balik ke hacker" chapterIcon={FaUserSecret} glow="rgba(220, 38, 38, 0.10)" shakeAt={FAIL_AT}>
		<Stage />
		<Sfx name="Lights off" src={SFX.switch} at={0} volume={0.5} />
		<Sfx name="Seen" src={SFX.pop} at={SEEN_AT} volume={0.45} />
		<Sfx name="Google" src={SFX.pop} at={GOOGLE_AT} volume={0.4} />
		<Sfx name="Locked" src={SFX.pop} at={LOCK_AT} volume={0.45} />
		<Sfx name="Packet passes" src={SFX.whoosh} at={6.6} volume={0.4} />
		<Sfx name="Trying" src={SFX.whirr} at={TRY_AT} volume={0.45} />
		{/* After the "no key" buzz and the whirr end, so the three don't stack past -1 dBFS. */}
		<Sfx name="Gibberish" src={SFX.glitch} at={10.6} volume={0.35} />
		<Sfx name="No key" src={SFX.denied} at={NO_KEY_AT} volume={0.35} />
		<Sfx name="Fail boom" src={SFX.boom} at={FAIL_AT} volume={0.45} />
		<Sfx name="Fail buzz" src={SFX.denied} at={FAIL_AT + 0.05} volume={0.35} />
		<Sfx name="Sad trombone" src={SFX.fail} at={FAIL_AT + 0.6} volume={0.4} />
		<Sfx name="Padlock" src={SFX.sparkle} at={SAFE_AT} volume={0.5} />
		<Sfx name="Secret" src={SFX.ding} at={SECRET_AT} volume={0.4} />
	</SceneShell>
);
