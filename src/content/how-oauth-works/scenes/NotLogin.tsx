import React from 'react';
import type {IconType} from 'react-icons';
import {
	FaCheck,
	FaEquals,
	FaGoogle,
	FaIdCard,
	FaKey,
	FaPlus,
	FaTicket,
	FaTriangleExclamation,
	FaXmark,
} from 'react-icons/fa6';
import {SFX, TONES, type Tone} from '../../shared/theme';
import {Card, Headline, IconTile, Pill, Reveal, SceneShell, Sfx, useLook} from '../../shared/ui';
import {ROLE} from '../parts';

const SIDES: readonly {
	at: number;
	mark: number;
	ok: boolean;
	icon: IconType;
	tone: Tone;
	title: string;
	term: string;
	question: string;
}[] = [
	{
		at: 2,
		mark: 2.8,
		ok: false,
		icon: FaIdCard,
		tone: 'danger',
		title: 'Login',
		term: 'autentikasi',
		question: 'Kamu siapa?',
	},
	{
		at: 3,
		mark: 4.3,
		ok: true,
		icon: FaKey,
		tone: ROLE.auth,
		title: 'OAuth',
		term: 'otorisasi',
		question: 'Boleh ngapain?',
	},
];
const OIDC_AT = 6.6;
const DONT_AT = 9;

const Badge: React.FC<{readonly ok: boolean}> = ({ok}) => {
	const fill = ok ? TONES.success.fill : TONES.danger.fill;
	const Icon = ok ? FaCheck : FaXmark;
	return (
		<div
			style={{
				width: 72,
				height: 72,
				borderRadius: 36,
				backgroundColor: fill,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				boxShadow: `0 8px 20px ${fill}66`,
			}}
		>
			<Icon size={42} color="#ffffff" />
		</div>
	);
};

const Side: React.FC<{readonly s: (typeof SIDES)[number]}> = ({s}) => {
	const look = useLook();
	return (
		<Card
			at={s.at}
			tone={s.tone}
			style={{
				position: 'relative',
				width: 420,
				height: 300,
				padding: '26px 28px',
				display: 'flex',
				flexDirection: 'column',
				gap: 8,
			}}
		>
			<IconTile icon={s.icon} tone={s.tone} size={84} />
			<div style={{fontSize: 44, fontWeight: 800}}>{s.title}</div>
			<div style={{fontSize: 30, fontWeight: 700, color: look.dim}}>{s.term}</div>
			<div style={{fontSize: 36, fontWeight: 800, color: look.tone(s.tone)}}>&quot;{s.question}&quot;</div>
			<Reveal at={s.mark} damping={8} style={{right: 24, top: 24}}>
				<Badge ok={s.ok} />
			</Reveal>
		</Card>
	);
};

const Stage: React.FC = () => {
	const look = useLook();
	return (
		<>
			<Reveal
				at={-0.05}
				out={1.3}
				damping={8}
				style={{left: 0, width: 1080, top: 640, display: 'flex', justifyContent: 'center'}}
			>
				<div
					style={{fontSize: 230, fontWeight: 800, letterSpacing: '-0.03em', color: TONES.warning.fill, rotate: '-4deg'}}
				>
					TAPI...
				</div>
			</Reveal>

			<Headline text="OAuth *bukan* buat login" top={300} at={1.4} size={96} tone="warning" />
			{SIDES.map((s, i) => (
				<Reveal key={s.title} at={s.at} kind={i ? 'right' : 'left'} style={{left: i ? 540 : 100, top: 540}}>
					<Side s={s} />
				</Reveal>
			))}

			<Reveal
				at={OIDC_AT}
				kind="rise"
				style={{
					left: 0,
					width: 1080,
					top: 885,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					gap: 16,
				}}
			>
				<Pill tone={ROLE.auth} size={32}>
					OAuth
				</Pill>
				<FaPlus size={30} color={look.dim} />
				<Pill icon={FaIdCard} tone={ROLE.code} size={32}>
					ID token
				</Pill>
				<FaEquals size={30} color={look.dim} />
				<Pill tone="success" solid size={32}>
					OpenID Connect
				</Pill>
			</Reveal>
			<Reveal
				at={5.2}
				kind="fade"
				style={{
					left: 0,
					width: 1080,
					top: 975,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					gap: 14,
					fontSize: 34,
					fontWeight: 700,
					color: look.dim,
				}}
			>
				<FaGoogle size={32} color={look.tone(ROLE.auth)} />
				dipakai tombol &quot;Login pakai Google&quot;
			</Reveal>

			<Reveal
				at={DONT_AT}
				kind="rise"
				style={{left: 0, width: 1080, top: 1080, display: 'flex', justifyContent: 'center'}}
			>
				<Pill tone="danger" solid size={40}>
					JANGAN:
				</Pill>
			</Reveal>
			<Reveal at={DONT_AT + 0.3} kind="left" style={{left: 120, top: 1175}}>
				<Card
					at={DONT_AT + 0.3}
					tone="danger"
					style={{width: 840, padding: '24px 30px', display: 'flex', alignItems: 'center', gap: 26}}
				>
					<IconTile icon={FaTicket} tone="danger" size={86} />
					<div style={{flex: 1}}>
						<div style={{fontSize: 44, fontWeight: 800}}>Access token</div>
						<div style={{fontSize: 34, fontWeight: 700, color: look.dim}}>dipakai sebagai bukti login</div>
					</div>
					<Reveal at={DONT_AT + 0.6} damping={8} style={{position: 'relative'}}>
						<Badge ok={false} />
					</Reveal>
				</Card>
			</Reveal>
		</>
	);
};

export const NotLogin: React.FC = () => (
	<SceneShell chapter="Awas!" chapterIcon={FaTriangleExclamation} shakeAt={0.05}>
		<Stage />
		<Sfx name="Record scratch" src={SFX.scratch} at={0} volume={0.55} />
		{SIDES.map((s) => (
			<React.Fragment key={s.title}>
				<Sfx name="Side card" src={SFX.pop} at={s.at} volume={0.45} />
				<Sfx name="Verdict" src={s.ok ? SFX.ding : SFX.denied} at={s.mark} volume={s.ok ? 0.4 : 0.25} />
			</React.Fragment>
		))}
		<Sfx name="OpenID Connect" src={SFX.pop} at={OIDC_AT} volume={0.5} />
		<Sfx name="Dont" src={SFX.whoosh} at={DONT_AT} volume={0.3} />
		<Sfx name="Dont mark" src={SFX.denied} at={DONT_AT + 0.6} volume={0.25} />
	</SceneShell>
);
