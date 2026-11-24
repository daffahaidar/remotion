import React from 'react';
import {FaEnvelope, FaEyeSlash, FaGoogle, FaNotEqual, FaTicket, FaUserCheck, FaUserSecret} from 'react-icons/fa6';
import {interpolate} from 'remotion';
import type {PoseName} from '../../../assets/character/hacker';
import {Padlock, ServerRack} from '../../../assets/property';
import {MONO, SFX, TONES} from '../../shared/theme';
import {
	Card,
	current,
	Glow,
	HackerDesk,
	Headline,
	IconTile,
	Pill,
	Place,
	Reveal,
	SceneShell,
	Sfx,
	Stamp,
	Travel,
	useLook,
	useRamp,
	useSec,
} from '../../shared/ui';
import {OAUTH, ROLE} from '../parts';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const TOKEN_AT = 6.4;
const SEND_AT = 9.2;
const DENY_AT = 12;
const REVOKE_AT = 14;
const OFF_AT = 14.8;
const DEAD_AT = 15.8;
const SAFE_AT = 16.8;

const POSES: readonly {at: number; pose: PoseName}[] = [
	{at: 0, pose: 'typing'},
	{at: 2.4, pose: 'think'},
	{at: TOKEN_AT, pose: 'typing'},
	{at: SEND_AT, pose: 'fistPump'},
	{at: DENY_AT, pose: 'surprised'},
	{at: DEAD_AT, pose: 'facepalm'},
];
const EXPRESSIONS = [
	{at: 0, e: 'smirk'},
	{at: 2.4, e: 'confused'},
	{at: 4.4, e: 'skeptical'},
	{at: TOKEN_AT, e: 'smirk'},
	{at: SEND_AT, e: 'laugh'},
	{at: 10.6, e: 'nervousLaugh'},
	{at: DENY_AT, e: 'crying'},
	{at: REVOKE_AT, e: 'sad'},
	{at: DEAD_AT, e: 'furious'},
] as const;

const Hacker: React.FC = () => {
	const t = useSec();
	const i = current(POSES, t);
	const blend = interpolate(t, [POSES[i].at, POSES[i].at + 0.3], [0, 1], clamp);
	return (
		<HackerDesk
			x={320}
			floor={1490}
			scale={0.62}
			screen={t < DENY_AT ? 'terminal' : 'error'}
			hacker={{
				expression: EXPRESSIONS[current(EXPRESSIONS, t)].e,
				pose: POSES[Math.max(0, i - 1)].pose,
				poseTo: POSES[i].pose,
				poseBlend: blend,
			}}
		/>
	);
};

const NoPassword: React.FC = () => {
	const look = useLook();
	return (
		<Card at={2.2} style={{width: 860, padding: '24px 30px', display: 'flex', flexDirection: 'column', gap: 18}}>
			<div>
				<Pill icon={FaGoogle} tone={ROLE.auth} size={32}>
					Budi login lewat Google
				</Pill>
			</div>
			<Reveal at={4.2} kind="left" style={{position: 'relative'}}>
				<div style={{display: 'flex', alignItems: 'center', gap: 20, fontSize: 40, fontWeight: 800}}>
					Password Budi:
					<span style={{fontFamily: MONO, color: look.tone('danger')}}>???</span>
					<FaEyeSlash size={44} color={look.tone('danger')} style={{marginLeft: 'auto'}} />
				</div>
			</Reveal>
		</Card>
	);
};

const TokenCard: React.FC<{readonly at: number; readonly dead?: boolean}> = ({at, dead}) => {
	const look = useLook();
	return (
		<Card
			at={at}
			tone={dead ? 'danger' : ROLE.token}
			style={{width: 860, padding: '24px 30px', display: 'flex', alignItems: 'center', gap: 24}}
		>
			<IconTile icon={FaTicket} tone={dead ? 'danger' : ROLE.token} size={86} />
			<div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 10}}>
				<div
					style={{
						fontFamily: MONO,
						fontSize: 34,
						fontWeight: 700,
						color: look.tone(dead ? 'danger' : ROLE.token),
						textDecoration: dead ? 'line-through' : undefined,
					}}
				>
					{OAUTH.accessToken}
				</div>
				<div style={{height: 52}}>
					{dead ? (
						<Pill tone="danger" solid size={28} mono>
							401 · invalid_token
						</Pill>
					) : (
						<Reveal at={8} damping={10} style={{position: 'relative'}}>
							<Pill tone={ROLE.scope} solid size={28} mono>
								scope: {OAUTH.scope}
							</Pill>
						</Reveal>
					)}
				</div>
			</div>
		</Card>
	);
};

const Compare: React.FC = () => {
	const look = useLook();
	const row = {
		display: 'flex',
		alignItems: 'baseline',
		gap: 18,
		fontSize: 32,
		fontWeight: 700,
		color: look.dim,
	} as const;
	return (
		<Card
			at={10.2}
			style={{
				position: 'relative',
				width: 860,
				padding: '22px 30px',
				display: 'flex',
				flexDirection: 'column',
				gap: 10,
			}}
		>
			<div style={row}>
				Butuh:
				<span style={{fontFamily: MONO, fontSize: 36, color: look.tone('danger')}}>gmail.readonly</span>
			</div>
			<Reveal at={10.8} kind="left" style={{position: 'relative'}}>
				<div style={row}>
					Token:
					<span style={{fontFamily: MONO, fontSize: 36, color: look.tone(ROLE.scope)}}>{OAUTH.scope}</span>
				</div>
			</Reveal>
			<Reveal at={11.3} damping={8} style={{right: 30, top: 26}}>
				<div
					style={{
						width: 96,
						height: 96,
						borderRadius: 48,
						backgroundColor: TONES.danger.fill,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						boxShadow: `0 0 40px ${TONES.danger.fill}`,
					}}
				>
					<FaNotEqual size={54} color="#ffffff" />
				</div>
			</Reveal>
		</Card>
	);
};

const Toggle: React.FC = () => {
	const off = useRamp(OFF_AT, 0.3);
	return (
		<div style={{position: 'relative', width: 128, height: 68, borderRadius: 34, backgroundColor: '#475569'}}>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					borderRadius: 34,
					backgroundColor: TONES.success.fill,
					opacity: 1 - off,
				}}
			/>
			<div
				style={{
					position: 'absolute',
					top: 6,
					left: 6 + 60 * (1 - off),
					width: 56,
					height: 56,
					borderRadius: 28,
					backgroundColor: '#ffffff',
					boxShadow: '0 4px 10px rgba(0,0,0,0.35)',
				}}
			/>
		</div>
	);
};

const Revoke: React.FC = () => {
	const look = useLook();
	return (
		<Card
			at={REVOKE_AT}
			tone={ROLE.owner}
			style={{width: 860, padding: '24px 30px', display: 'flex', alignItems: 'center', gap: 24}}
		>
			<IconTile icon={FaUserCheck} tone={ROLE.owner} size={86} />
			<div style={{flex: 1}}>
				<div style={{fontSize: 40, fontWeight: 800}}>Akses {OAUTH.app}</div>
				<div style={{fontSize: 30, fontWeight: 700, color: look.dim}}>akun Google Budi</div>
			</div>
			<Toggle />
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
				<ServerRack status={t < SEND_AT + 0.6 ? 'healthy' : t < DENY_AT ? 'busy' : 'warning'} label="GOOGLE API" />
			</Place>

			<Headline text="Ingat *aplikasi nakal* tadi?" top={300} size={96} tone="danger" out={5.8} />
			<Reveal at={2.2} out={5.8} kind="rise" style={{left: 110, top: 560}}>
				<NoPassword />
			</Reveal>

			<Headline text="Cuma pegang *token*" top={300} size={96} tone={ROLE.token} at={6} out={REVOKE_AT - 0.2} />
			<Reveal at={TOKEN_AT} out={REVOKE_AT - 0.2} kind="rise" style={{left: 110, top: 545}}>
				<TokenCard at={TOKEN_AT} />
			</Reveal>
			<Travel from={[330, 1240]} to={[810, 1190]} at={SEND_AT} dur={0.8} arc={-220}>
				<Pill icon={FaEnvelope} tone="danger" solid size={28} mono>
					GET /gmail
				</Pill>
			</Travel>
			<Reveal at={10.2} out={DENY_AT - 0.05} kind="rise" style={{left: 110, top: 775}}>
				<Compare />
			</Reveal>

			<div
				style={{
					position: 'absolute',
					inset: 0,
					backgroundColor: TONES.danger.fill,
					opacity: interpolate(t, [DENY_AT, DENY_AT + 0.06, DENY_AT + 0.7], [0, 0.3, 0], clamp),
				}}
			/>
			<Stamp at={DENY_AT} out={REVOKE_AT - 0.2} size={84} style={{left: 0, right: 0, top: 790}}>
				403 · DITOLAK
			</Stamp>

			<Headline text="Cabut *izinnya*" top={300} size={100} tone={ROLE.owner} at={REVOKE_AT} out={SAFE_AT - 0.1} />
			<Reveal at={REVOKE_AT} out={SAFE_AT - 0.1} kind="rise" style={{left: 110, top: 545}}>
				<Revoke />
			</Reveal>
			<Reveal at={DEAD_AT} out={SAFE_AT - 0.1} kind="left" style={{left: 110, top: 765}}>
				<TokenCard at={DEAD_AT} dead />
			</Reveal>

			<Reveal at={SAFE_AT} kind="fade" style={{left: 0, top: 0, width: 1080, height: 1920}}>
				<Glow x={540} y={600} r={330} color="rgba(234, 179, 8, 0.3)" />
			</Reveal>
			<Reveal at={SAFE_AT} damping={10} style={{left: 405, top: 400}}>
				<div style={{scale: 1.5, transformOrigin: 'top left'}}>
					<Padlock locked color="gold" />
				</div>
			</Reveal>
			<Headline text="Password Budi *tetap aman*" top={760} size={76} tone={ROLE.token} at={SAFE_AT + 0.2} />
		</>
	);
};

export const ShadyAppFails: React.FC = () => (
	<SceneShell
		theme="dark"
		chapter="Balik ke aplikasi nakal"
		chapterIcon={FaUserSecret}
		glow="rgba(220, 38, 38, 0.10)"
		shakeAt={DENY_AT}
	>
		<Stage />
		<Sfx name="Lights off" src={SFX.switch} at={0} volume={0.5} />
		<Sfx name="Login via Google" src={SFX.pop} at={2.2} volume={0.45} />
		<Sfx name="No password" src={SFX.glitch} at={4.2} volume={0.35} />
		<Sfx name="Token" src={SFX.pop} at={TOKEN_AT} volume={0.45} />
		<Sfx name="Scope" src={SFX.ding} at={8} volume={0.3} />
		<Sfx name="Send request" src={SFX.whoosh} at={SEND_AT} volume={0.4} />
		<Sfx name="Checking" src={SFX.whirr} at={10.2} volume={0.4} />
		<Sfx name="Not equal" src={SFX.denied} at={11.3} volume={0.35} />
		<Sfx name="Denied boom" src={SFX.boom} at={DENY_AT} volume={0.42} />
		<Sfx name="Denied buzz" src={SFX.denied} at={DENY_AT + 0.05} volume={0.35} />
		<Sfx name="Sad trombone" src={SFX.fail} at={DENY_AT + 0.6} volume={0.4} />
		<Sfx name="Toggle off" src={SFX.click} at={OFF_AT} volume={0.6} />
		<Sfx name="Token dead" src={SFX.glitch} at={DEAD_AT} volume={0.4} />
		<Sfx name="Padlock" src={SFX.sparkle} at={SAFE_AT} volume={0.5} />
	</SceneShell>
);
