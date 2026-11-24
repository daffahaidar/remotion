import React from 'react';
import {FaGear, FaKey, FaNotEqual, FaPlus, FaUserSecret} from 'react-icons/fa6';
import {interpolate} from 'remotion';
import type {PoseName} from '../../../assets/character/hacker';
import {Padlock, ServerRack} from '../../../assets/property';
import {JWT, MONO, SFX, TONES} from '../theme';
import {Card, current, Glow, HackerDesk, Headline, IconTile, Pill, Place, Reveal, SceneShell, Scramble, Sfx, Stamp, Travel, useLook, useSec} from '../ui';
import {RoleEdit} from './Hook';

const POSES: readonly {at: number; pose: PoseName}[] = [
	{at: 0, pose: 'typing'},
	{at: 5, pose: 'fistPump'},
	{at: 6.4, pose: 'armsCrossed'},
	{at: 11, pose: 'surprised'},
	{at: 13.6, pose: 'facepalm'},
];
const EXPRESSIONS = [
	{at: 0, e: 'smirk'},
	{at: 2.4, e: 'focused'},
	{at: 5, e: 'laugh'},
	{at: 6.2, e: 'smirk'},
	{at: 10.2, e: 'nervousLaugh'},
	{at: 11, e: 'scared'},
	{at: 12, e: 'crying'},
	{at: 13.6, e: 'sad'},
] as const;

const Hacker: React.FC = () => {
	const t = useSec();
	const i = current(POSES, t);
	const blend = interpolate(t, [POSES[i].at, POSES[i].at + 0.3], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const expression = EXPRESSIONS[current(EXPRESSIONS, t)].e;
	return (
		<HackerDesk
			x={320}
			floor={1490}
			scale={0.62}
			screen={t < 12 ? 'terminal' : 'error'}
			hacker={{expression, pose: POSES[Math.max(0, i - 1)].pose, poseTo: POSES[i].pose, poseBlend: blend}}
		/>
	);
};

const Recompute: React.FC = () => {
	const look = useLook();
	const t = useSec();
	return (
		<Card at={6.6} tone="signature" style={{width: 900, padding: '24px 30px', display: 'flex', flexDirection: 'column', gap: 18}}>
			<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14}}>
				<Pill tone="header" solid size={28}>
					HEADER
				</Pill>
				<FaPlus size={26} color={look.dim} />
				<Pill tone="danger" solid size={28}>
					PAYLOAD (admin)
				</Pill>
				<FaPlus size={26} color={look.dim} />
				<IconTile icon={FaKey} tone="gold" size={62} />
			</div>
			<div style={{display: 'flex', alignItems: 'center', gap: 16}}>
				<FaGear size={44} color={TONES.signature.fill} style={{rotate: `${t * (t < 7.6 ? 400 : 60)}deg`}} />
				<span style={{fontFamily: MONO, fontSize: 30, fontWeight: 700, color: look.tone('warning')}}>
					<Scramble text={JWT.adminSignature} from={'?'.repeat(JWT.adminSignature.length)} at={7} dur={1.2} />
				</span>
			</div>
		</Card>
	);
};

const Compare: React.FC = () => {
	const look = useLook();
	const label = {fontSize: 30, fontWeight: 700, color: look.dim} as const;
	const sig = {fontFamily: MONO, fontSize: 30, fontWeight: 700} as const;
	return (
		<Card at={9.4} style={{position: 'relative', width: 900, padding: '24px 30px', display: 'flex', flexDirection: 'column', gap: 18}}>
			<div>
				<div style={label}>Signature di token</div>
				<div style={{...sig, color: look.tone('signature')}}>{JWT.signature}</div>
			</div>
			<Reveal at={10.2} kind="left" style={{position: 'relative'}}>
				<div style={label}>Hasil hitung server</div>
				<div style={{...sig, color: look.tone('warning')}}>{JWT.adminSignature}</div>
			</Reveal>
			<Reveal at={11} damping={8} style={{right: -30, top: 62}}>
				<div style={{width: 112, height: 112, borderRadius: 56, backgroundColor: TONES.danger.fill, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 40px ${TONES.danger.fill}`}}>
					<FaNotEqual size={62} color="#ffffff" />
				</div>
			</Reveal>
		</Card>
	);
};

const Stage: React.FC = () => {
	const t = useSec();
	return (
		<>
			<Glow x={330} y={1230} r={420} color="rgba(34, 197, 94, 0.32)" />
			<Glow x={820} y={1250} r={330} color="rgba(56, 189, 248, 0.28)" />
			<Hacker />
			<Place x={700} y={1065} scale={0.75}>
				<ServerRack status={t < 6.6 ? 'healthy' : t < 11 ? 'busy' : 'warning'} label="SERVER" />
			</Place>

			<Headline text="Ingat *hacker* tadi?" top={300} size={100} tone="danger" out={6} />
			<Reveal at={2.2} out={6} kind="rise" style={{left: 110, top: 540, width: 860}}>
				<Card at={2.2} style={{padding: '28px 40px', fontFamily: MONO, fontSize: 50, fontWeight: 700}}>
					<span style={{color: TONES.primary.fill}}>&quot;role&quot;</span>: <RoleEdit at={2.6} />
				</Card>
			</Reveal>
			<Travel from={[330, 1240]} to={[810, 1190]} at={5} dur={0.7} arc={-220}>
				<Pill icon={FaUserSecret} tone="danger" solid size={28} mono>
					role: admin
				</Pill>
			</Travel>

			<Headline text="Server *cek ulang*" top={300} size={100} tone="signature" at={6.2} out={13.4} />
			<Reveal at={6.6} out={13.4} kind="rise" style={{left: 90, top: 520}}>
				<Recompute />
			</Reveal>
			<Reveal at={9.4} out={13.4} kind="rise" style={{left: 90, top: 745}}>
				<Compare />
			</Reveal>

			<div
				style={{
					position: 'absolute',
					inset: 0,
					backgroundColor: TONES.danger.fill,
					opacity: interpolate(t, [12, 12.06, 12.7], [0, 0.3, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
				}}
			/>
			<Stamp at={12} out={13.4} size={86} style={{left: 0, right: 0, top: 830}}>
				TOKEN DITOLAK!
			</Stamp>

			<Reveal at={13.7} kind="fade" style={{left: 0, top: 0, width: 1080, height: 1920}}>
				<Glow x={540} y={640} r={330} color="rgba(234, 179, 8, 0.3)" />
			</Reveal>
			<Reveal at={13.7} damping={10} style={{left: 405, top: 450}}>
				<div style={{scale: 1.5, transformOrigin: 'top left'}}>
					<Padlock locked color="gold" />
				</div>
			</Reveal>
			<Headline text="Tanpa *secret key* = mustahil dipalsukan" top={810} size={76} tone="gold" at={14} />
		</>
	);
};

export const HackerFails: React.FC = () => (
	<SceneShell theme="dark" chapter="Balik ke hacker" chapterIcon={FaUserSecret} glow="rgba(220, 38, 38, 0.10)" shakeAt={12}>
		<Stage />
		<Sfx name="Lights off" src={SFX.switch} at={0} volume={0.5} />
		<Sfx name="Typing admin" src={SFX.typing} at={2.4} volume={0.4} />
		<Sfx name="Glitch admin" src={SFX.glitch} at={3.2} volume={0.4} />
		<Sfx name="Send token" src={SFX.whoosh} at={5} volume={0.4} />
		<Sfx name="Recompute" src={SFX.whirr} at={7} volume={0.45} />
		<Sfx name="Row token sig" src={SFX.pop} at={9.4} volume={0.45} />
		<Sfx name="Row server sig" src={SFX.pop} at={10.2} volume={0.45} />
		<Sfx name="Not equal" src={SFX.denied} at={11} volume={0.4} />
		<Sfx name="Rejected boom" src={SFX.boom} at={12} volume={0.6} />
		<Sfx name="Rejected buzz" src={SFX.denied} at={12.05} volume={0.35} />
		<Sfx name="Sad trombone" src={SFX.fail} at={12.7} volume={0.4} />
		<Sfx name="Padlock" src={SFX.sparkle} at={13.7} volume={0.5} />
	</SceneShell>
);
