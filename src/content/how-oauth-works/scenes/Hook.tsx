import React from 'react';
import {FaArrowRight, FaEnvelope, FaEye, FaGoogle, FaKey, FaQuestion} from 'react-icons/fa6';
import {interpolate} from 'remotion';
import type {PoseName} from '../../../assets/character/hacker';
import {MONO, SFX, TONES} from '../../shared/theme';
import {
	Card,
	Glow,
	HackerDesk,
	Headline,
	IconTile,
	Pill,
	Reveal,
	SceneShell,
	Sfx,
	Stamp,
	Travel,
	TypeText,
	useLook,
	useSec,
} from '../../shared/ui';
import {AppEntity, Field, ROLE, Window} from '../parts';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const PRESS_AT = 2.2;
const LEAK_AT = 2.9;
const STAMP_AT = 4;
const MAILS = [
	{at: 3.1, subject: 'Slip gaji Oktober'},
	{at: 3.35, subject: 'Kode OTP: 482913'},
	{at: 3.6, subject: 'Scan KTP.jpg'},
];
const POSES: readonly {at: number; pose: PoseName}[] = [
	{at: 0, pose: 'typing'},
	{at: 3, pose: 'fistPump'},
	{at: 5.6, pose: 'think'},
];

const LoginWindow: React.FC = () => {
	const look = useLook();
	const pressed = useSec() >= PRESS_AT;
	return (
		<Window at={-1} width={860} url={<span style={{color: look.tone(ROLE.client)}}>jadwalku.app/login</span>}>
			<div style={{padding: '24px 34px 30px', display: 'flex', flexDirection: 'column', gap: 18}}>
				<AppEntity sub="Masuk pakai akun Google" />
				<Field label="Email Google">budi@gmail.com</Field>
				<Field label="Password Google">
					<TypeText text="••••••••••" at={-0.4} cps={6} style={{color: look.tone('danger'), letterSpacing: '0.12em'}} />
				</Field>
				<Card
					pressed={pressed}
					tone={pressed ? 'danger' : undefined}
					radius={18}
					style={{
						height: 70,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						fontSize: 36,
						fontWeight: 800,
						scale: pressed ? 0.985 : 1,
					}}
				>
					Masuk
				</Card>
			</div>
		</Window>
	);
};

const Inbox: React.FC = () => {
	const look = useLook();
	return (
		<Card
			at={LEAK_AT}
			tone="danger"
			style={{width: 860, padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 14}}
		>
			<div style={{display: 'flex', alignItems: 'center', gap: 18, fontSize: 40, fontWeight: 800}}>
				<IconTile icon={FaEnvelope} tone="danger" size={70} />
				Email Budi
				<span style={{marginLeft: 'auto'}}>
					<Pill icon={FaEye} tone="danger" solid size={26}>
						DIBACA
					</Pill>
				</span>
			</div>
			{MAILS.map((m) => (
				<Reveal key={m.subject} at={m.at} kind="left" style={{position: 'relative'}}>
					<div
						style={{display: 'flex', alignItems: 'center', gap: 18, fontSize: 38, fontWeight: 700, padding: '6px 0'}}
					>
						<FaEnvelope size={30} color={look.tone('danger')} />
						{m.subject}
					</div>
				</Reveal>
			))}
		</Card>
	);
};

const Hacker: React.FC = () => {
	const t = useSec();
	const i = POSES.reduce((acc, p, idx) => (t >= p.at ? idx : acc), 0);
	const blend = interpolate(t, [POSES[i].at, POSES[i].at + 0.3], [0, 1], clamp);
	const expression = t < 2.4 ? 'focused' : t < 3 ? 'smirk' : t < 5 ? 'laugh' : t < 6.2 ? 'smirk' : 'confused';
	return (
		<HackerDesk
			x={540}
			floor={1490}
			scale={0.76}
			screen={t < LEAK_AT ? 'terminal' : 'dashboard'}
			hacker={{
				expression,
				pose: POSES[Math.max(0, i - 1)].pose,
				poseTo: POSES[i].pose,
				poseBlend: blend,
				talking: t > 3.2 && t < 4.4,
			}}
		/>
	);
};

const Stage: React.FC = () => {
	const look = useLook();
	const t = useSec();
	return (
		<>
			<Glow x={540} y={1180} r={600} color="rgba(34, 197, 94, 0.42)" />
			<Reveal at={-1} out={7.9} kind="fade" style={{left: 0, top: 0, width: 1080, height: 1920}}>
				<Hacker />
			</Reveal>

			<Reveal at={-1} out={LEAK_AT} kind="fade" style={{left: 110, top: 290}}>
				<LoginWindow />
			</Reveal>
			<Travel from={[540, 790]} to={[560, 1190]} at={2.4} dur={0.6} arc={-60}>
				<Pill icon={FaKey} tone="danger" solid size={30}>
					password Budi
				</Pill>
			</Travel>

			<Reveal at={LEAK_AT} out={4.9} kind="rise" style={{left: 110, top: 320}}>
				<Inbox />
			</Reveal>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					backgroundColor: TONES.danger.fill,
					opacity: interpolate(t, [STAMP_AT, STAMP_AT + 0.06, STAMP_AT + 0.7], [0, 0.3, 0], clamp),
				}}
			/>
			<Stamp at={STAMP_AT} out={4.9} size={92} style={{left: 0, right: 0, top: 700}}>
				AKUN BOCOR!
			</Stamp>

			<Headline text="Kok *Login pakai Google* aman?" top={320} at={5} out={7.9} size={100} />
			<Reveal
				at={5.8}
				out={7.9}
				damping={11}
				style={{left: 0, width: 1080, top: 600, display: 'flex', justifyContent: 'center'}}
			>
				<Card
					at={5.8}
					radius={999}
					style={{display: 'flex', alignItems: 'center', gap: 20, padding: '24px 44px', fontSize: 44, fontWeight: 800}}
				>
					<FaGoogle size={48} color={look.tone(ROLE.auth)} />
					Lanjutkan dengan Google
				</Card>
			</Reveal>
			{[
				{at: 6.3, left: 120, top: 720, rotate: -16, size: 90},
				{at: 6.5, left: 860, top: 560, rotate: 12, size: 110},
				{at: 6.7, left: 470, top: 760, rotate: -4, size: 70},
			].map((q) => (
				<Reveal key={q.at} at={q.at} out={7.9} damping={9} style={{left: q.left, top: q.top, rotate: `${q.rotate}deg`}}>
					<FaQuestion size={q.size} color={TONES.primary.fill} />
				</Reveal>
			))}

			<Reveal at={8} kind="pop" damping={11} style={{left: 90, top: 470, width: 900}}>
				<Card
					at={8}
					radius={64}
					style={{padding: '54px 0 60px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}
				>
					<div style={{fontSize: 60, fontWeight: 800, letterSpacing: '0.24em', color: look.dim}}>CARA KERJA</div>
					<div
						style={{
							fontSize: 270,
							fontWeight: 800,
							lineHeight: 1.05,
							letterSpacing: '-0.04em',
							backgroundImage: 'linear-gradient(90deg, #a78bfa, #60a5fa 50%, #facc15)',
							WebkitBackgroundClip: 'text',
							backgroundClip: 'text',
							color: 'transparent',
							filter: 'drop-shadow(0 0 40px rgba(96, 165, 250, 0.45))',
						}}
					>
						OAuth
					</div>
					<div style={{fontFamily: MONO, fontSize: 46, fontWeight: 700, color: look.text}}>OAuth 2.0 · RFC 6749</div>
				</Card>
			</Reveal>

			<Reveal
				at={9.4}
				kind="rise"
				style={{
					left: 0,
					width: 1080,
					top: 1090,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					gap: 16,
				}}
			>
				<Pill tone={ROLE.owner} solid size={34}>
					IZIN
				</Pill>
				<FaArrowRight size={34} color={look.dim} />
				<Pill tone={ROLE.code} solid size={34}>
					KODE
				</Pill>
				<FaArrowRight size={34} color={look.dim} />
				<Pill tone={ROLE.token} solid size={34}>
					TOKEN
				</Pill>
			</Reveal>
			<Reveal
				at={10.4}
				kind="rise"
				style={{left: 0, width: 1080, top: 1230, display: 'flex', justifyContent: 'center'}}
			>
				<Pill icon={FaEye} tone="gold" size={42}>
					Tonton sampai habis
				</Pill>
			</Reveal>
		</>
	);
};

export const Hook: React.FC = () => (
	<SceneShell theme="dark" cut={false} whoosh={false} glow="rgba(220, 38, 38, 0.12)" shakeAt={STAMP_AT}>
		<Stage />
		<Sfx name="Typing password" src={SFX.typing} at={0} volume={0.45} />
		<Sfx name="Press login" src={SFX.click} at={PRESS_AT} volume={0.5} />
		<Sfx name="Password flies" src={SFX.whoosh} at={2.4} volume={0.35} />
		<Sfx name="Hacker gets in" src={SFX.glitch} at={LEAK_AT} volume={0.45} />
		{MAILS.map((m) => (
			<Sfx key={m.at} name="Mail" src={SFX.pop} at={m.at} volume={0.4} />
		))}
		<Sfx name="Boom leak" src={SFX.boom} at={STAMP_AT} volume={0.6} />
		<Sfx name="Google button" src={SFX.pop} at={5.8} volume={0.5} />
		<Sfx name="Riser" src={SFX.riser} at={6} volume={0.35} />
		<Sfx name="Pop question" src={SFX.pop} at={6.3} volume={0.45} />
		<Sfx name="Impact title" src={SFX.impact} at={8} volume={0.75} />
		<Sfx name="Pop steps" src={SFX.pop} at={9.4} volume={0.5} />
		<Sfx name="Sparkle watch" src={SFX.sparkle} at={10.4} volume={0.45} />
	</SceneShell>
);
