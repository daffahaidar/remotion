import React from 'react';
import {
	FaCalendarDays,
	FaCircleCheck,
	FaGoogle,
	FaKey,
	FaLock,
	FaShieldHalved,
	FaTicket,
	FaUserSecret,
	FaXmark,
} from 'react-icons/fa6';
import {interpolate} from 'remotion';
import {ManCharacter} from '../../../assets/character';
import type {PoseName} from '../../../assets/character/man';
import {MONO, SFX, TONES} from '../../shared/theme';
import {
	Actor,
	Card,
	Headline,
	Pill,
	Reveal,
	SceneShell,
	Scramble,
	Sfx,
	TypeText,
	useLook,
	useSec,
} from '../../shared/ui';
import {AppEntity, Entity, Field, OAUTH, ROLE, Window} from '../parts';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
/** Window phases: app -> Google login -> consent -> back at the app with the code. */
const GOOGLE_AT = 7.2;
const CONSENT_AT = 11;
const BACK_AT = 14;
const NO_FIELD_AT = 3.4;
const PRESS_AT = 6.4;
const ALLOW_AT = 13.2;
const POSES: readonly {at: number; pose: PoseName}[] = [
	{at: 0, pose: 'idle'},
	{at: 6, pose: 'point'},
	{at: ALLOW_AT, pose: 'thumbsUp'},
];

const Url: React.FC = () => {
	const look = useLook();
	const t = useSec();
	if (t < GOOGLE_AT) return <span style={{color: look.tone(ROLE.client)}}>jadwalku.app</span>;
	if (t < BACK_AT)
		return (
			<span style={{color: look.tone(ROLE.auth)}}>
				<Scramble text="accounts.google.com" from="jadwalku.app" at={GOOGLE_AT} dur={0.5} />
			</span>
		);
	return (
		<span style={{color: look.tone(ROLE.client)}}>
			jadwalku.app/cb?<span style={{color: look.tone(ROLE.code)}}>code={OAUTH.code.slice(0, 8)}…</span>
		</span>
	);
};

const Button: React.FC<{readonly at: number; readonly primary?: boolean; readonly children: React.ReactNode}> = ({
	at,
	primary,
	children,
}) => {
	const pressed = useSec() >= at;
	return (
		<Card
			pressed={pressed}
			tone={primary ? ROLE.auth : undefined}
			radius={18}
			style={{
				flex: 1,
				height: 76,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				gap: 14,
				fontSize: 34,
				fontWeight: 800,
				scale: pressed ? 0.985 : 1,
			}}
		>
			{children}
		</Card>
	);
};

const AppScreen: React.FC = () => {
	const look = useLook();
	return (
		<div style={{display: 'flex', flexDirection: 'column', gap: 26}}>
			<AppEntity sub="atur jadwalmu" />
			{/* Fixed-height slot so the button below doesn't jump when the box pops in. */}
			<div style={{height: 100}}>
				<Reveal at={NO_FIELD_AT} kind="pop" style={{position: 'relative'}}>
					<div
						style={{
							height: 100,
							borderRadius: 18,
							border: `4px dashed ${TONES.danger.fill}`,
							display: 'flex',
							alignItems: 'center',
							gap: 18,
							padding: '0 24px',
							color: look.tone('danger'),
							fontSize: 34,
							fontWeight: 800,
						}}
					>
						<FaKey size={34} />
						<span style={{textDecoration: 'line-through'}}>kolom password</span>
						<span style={{marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8}}>
							nggak ada <FaXmark size={36} />
						</span>
					</div>
				</Reveal>
			</div>
			<div style={{display: 'flex'}}>
				<Button at={PRESS_AT}>
					<FaGoogle size={40} color={look.tone(ROLE.auth)} />
					Lanjutkan dengan Google
				</Button>
			</div>
		</div>
	);
};

const GoogleLogin: React.FC = () => {
	const look = useLook();
	return (
		<div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
			<Entity icon={FaGoogle} tone={ROLE.auth} name="Login Google" sub="halaman resmi Google" />
			<Field label="Email">budi@gmail.com</Field>
			<Field label="Password">
				<TypeText text="••••••••••" at={9.4} cps={10} style={{color: look.tone(ROLE.auth), letterSpacing: '0.12em'}} />
			</Field>
		</div>
	);
};

const Consent: React.FC = () => {
	const look = useLook();
	return (
		<div style={{display: 'flex', flexDirection: 'column', gap: 22}}>
			<div style={{fontSize: 40, fontWeight: 800}}>
				<span style={{color: look.tone(ROLE.client)}}>{OAUTH.app}</span> ingin:
			</div>
			<Card pressed style={{padding: '22px 26px', display: 'flex', flexDirection: 'column', gap: 12}}>
				<div style={{display: 'flex', alignItems: 'center', gap: 18, fontSize: 38, fontWeight: 800}}>
					<FaCalendarDays size={40} color={look.tone(ROLE.resource)} />
					Lihat kalender kamu
				</div>
				<div>
					<Pill tone={ROLE.scope} size={26} mono>
						scope: {OAUTH.scope}
					</Pill>
				</div>
			</Card>
			<div style={{display: 'flex', gap: 20}}>
				<Button at={999}>Batal</Button>
				<Button at={ALLOW_AT} primary>
					<span style={{color: look.tone(ROLE.auth)}}>Izinkan</span>
				</Button>
			</div>
		</div>
	);
};

const BackWithCode: React.FC = () => {
	const look = useLook();
	return (
		<div style={{display: 'flex', flexDirection: 'column', gap: 26}}>
			<Entity icon={FaCircleCheck} tone="success" name={`Kembali ke ${OAUTH.app}`} sub="membawa kode izin" />
			<div style={{fontFamily: MONO, fontSize: 30, fontWeight: 700, color: look.dim}}>?code=</div>
			<div style={{marginTop: -18}}>
				<Pill icon={FaTicket} tone={ROLE.code} solid size={34} mono>
					{OAUTH.code}
				</Pill>
			</div>
			<Reveal at={17} damping={10} style={{position: 'relative'}}>
				<Pill tone="warning" size={30}>
					sekali pakai · cepat kedaluwarsa
				</Pill>
			</Reveal>
		</div>
	);
};

const PHASES = [
	{at: -1, out: GOOGLE_AT, el: <AppScreen />},
	{at: GOOGLE_AT, out: CONSENT_AT, el: <GoogleLogin />},
	{at: CONSENT_AT, out: BACK_AT, el: <Consent />},
	{at: BACK_AT, out: 999, el: <BackWithCode />},
];

const Budi: React.FC = () => {
	const t = useSec();
	const i = POSES.reduce((acc, p, idx) => (t >= p.at ? idx : acc), 0);
	const blend = interpolate(t, [POSES[i].at, POSES[i].at + 0.3], [0, 1], clamp);
	return (
		<Actor x={850} floor={1470}>
			<ManCharacter
				expression={t < 3 ? 'thinking' : t < BACK_AT ? 'happy' : 'proud'}
				pose={POSES[Math.max(0, i - 1)].pose}
				poseTo={POSES[i].pose}
				poseBlend={blend}
				yaw={-18}
				style={{scale: 0.42}}
			/>
		</Actor>
	);
};

const Stage: React.FC = () => (
	<>
		<Headline text="Kenapa *aman?*" top={300} size={100} tone={ROLE.auth} />
		<Reveal
			at={1}
			out={6.2}
			damping={9}
			style={{left: 0, width: 1080, top: 440, display: 'flex', justifyContent: 'center', rotate: '-3deg'}}
		>
			<Pill icon={FaUserSecret} tone="danger" solid size={30}>
				Ini kunci aplikasi nakal gagal!
			</Pill>
		</Reveal>

		<Reveal at={-1} kind="fade" style={{left: 90, top: 520}}>
			<Window width={900} url={<Url />}>
				<div style={{position: 'relative', height: 470}}>
					{PHASES.map((p) => (
						<Reveal key={p.at} at={p.at} out={p.out} kind="rise" style={{left: 34, top: 30, width: 832}}>
							{p.el}
						</Reveal>
					))}
				</div>
			</Window>
		</Reveal>

		<Reveal at={9.8} kind="left" style={{left: 90, top: 1110}}>
			<Pill icon={FaLock} tone={ROLE.auth} size={32}>
				Password cuma diketik di Google
			</Pill>
		</Reveal>
		<Reveal at={16.2} kind="left" style={{left: 90, top: 1200}}>
			<Pill icon={FaTicket} tone={ROLE.code} size={32}>
				Aplikasi cuma terima kode
			</Pill>
		</Reveal>
		<Budi />
	</>
);

export const Redirect: React.FC = () => (
	<SceneShell chapter="Rahasianya" chapterIcon={FaShieldHalved}>
		<Stage />
		<Sfx name="Re-hook" src={SFX.glitch} at={1} volume={0.35} />
		<Sfx name="No password field" src={SFX.denied} at={NO_FIELD_AT} volume={0.25} />
		<Sfx name="Press Google" src={SFX.click} at={PRESS_AT} volume={0.55} />
		<Sfx name="Redirect" src={SFX.whoosh} at={GOOGLE_AT} volume={0.35} />
		<Sfx name="Typing password" src={SFX.typing} at={9.4} volume={0.35} />
		<Sfx name="Password only at Google" src={SFX.pop} at={9.8} volume={0.4} />
		<Sfx name="Consent" src={SFX.pop} at={CONSENT_AT} volume={0.5} />
		<Sfx name="Allow" src={SFX.click} at={ALLOW_AT} volume={0.55} />
		<Sfx name="Redirect back" src={SFX.whoosh} at={BACK_AT} volume={0.35} />
		<Sfx name="Code" src={SFX.ding} at={BACK_AT + 0.4} volume={0.4} />
		<Sfx name="One-time" src={SFX.pop} at={17} volume={0.4} />
	</SceneShell>
);
