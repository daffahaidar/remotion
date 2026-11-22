import React from 'react';
import {FaCalendarDays, FaGoogle, FaKey, FaTicket, FaXmark} from 'react-icons/fa6';
import {ManCharacter} from '../../assets/character';
import {ChannelBadge} from '../shared/ChannelOutro';
import {MONO, TONES} from '../shared/theme';
import {Actor, Card, Glow, IconTile, SceneShell, useLook} from '../shared/ui';
import {OAUTH, ROLE, Window} from './parts';

/** Still frame: everything is placed "long after" its entrance so springs are settled. */
const SETTLED = -10;
const INK = '#1f1a1f';

/** Gradient title embossed into the canvas with a neumorphic highlight + cast shadow. */
const Title: React.FC = () => (
	<div
		style={{
			position: 'absolute',
			left: 0,
			width: 1080,
			top: 205,
			textAlign: 'center',
			fontSize: 300,
			fontWeight: 800,
			lineHeight: 1,
			letterSpacing: '-0.05em',
			backgroundImage: 'linear-gradient(100deg, #7c3aed, #4f46e5 35%, #2563eb 65%, #0891b2)',
			WebkitBackgroundClip: 'text',
			backgroundClip: 'text',
			color: 'transparent',
			filter:
				'drop-shadow(-8px -8px 10px rgba(255, 255, 255, 0.95)) drop-shadow(12px 14px 18px rgba(120, 135, 160, 0.55))',
		}}
	>
		OAuth
	</div>
);

const Question: React.FC = () => {
	const look = useLook();
	return (
		<Card
			at={SETTLED}
			radius={52}
			style={{padding: '26px 48px 30px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}
		>
			<div style={{display: 'flex', alignItems: 'center', gap: 18, fontSize: 64, fontWeight: 800, color: look.text}}>
				Login pakai
				<span style={{display: 'inline-flex', alignItems: 'center', gap: 3, color: look.tone(ROLE.auth)}}>
					<FaGoogle size={54} />
					oogle
				</span>
			</div>
			<div
				style={{
					fontSize: 132,
					fontWeight: 800,
					lineHeight: 1.05,
					letterSpacing: '-0.03em',
					color: look.tone(ROLE.auth),
					backgroundImage: `linear-gradient(transparent 60%, ${TONES[ROLE.auth].fill}33 60%, ${TONES[ROLE.auth].fill}33 92%, transparent 92%)`,
				}}
			>
				kok AMAN?
			</div>
		</Card>
	);
};

const Consent: React.FC = () => {
	const look = useLook();
	return (
		<Window at={SETTLED} width={540} url={<span style={{color: look.tone(ROLE.auth)}}>accounts.google.com</span>}>
			<div style={{padding: '22px 28px 28px', display: 'flex', flexDirection: 'column', gap: 18}}>
				<div style={{fontSize: 36, fontWeight: 800}}>
					<span style={{color: look.tone(ROLE.client)}}>{OAUTH.app}</span> ingin:
				</div>
				<Card
					pressed
					style={{padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14, fontSize: 34, fontWeight: 800}}
				>
					<FaCalendarDays size={36} color={look.tone(ROLE.resource)} />
					Lihat kalender
				</Card>
				<div style={{display: 'flex', gap: 16}}>
					<Card
						at={SETTLED}
						radius={18}
						style={{
							flex: 1,
							height: 70,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontSize: 32,
							fontWeight: 800,
						}}
					>
						Batal
					</Card>
					<div
						style={{
							flex: 1,
							height: 70,
							borderRadius: 18,
							backgroundColor: TONES[ROLE.auth].fill,
							boxShadow: `0 14px 30px ${TONES[ROLE.auth].fill}66`,
							color: '#ffffff',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontSize: 32,
							fontWeight: 800,
						}}
					>
						Izinkan
					</div>
				</div>
			</div>
		</Window>
	);
};

/** Gold ticket = the access token (same look as the visitor pass in the video). */
const Ticket: React.FC = () => (
	<div
		style={{
			width: 520,
			padding: '22px 28px',
			borderRadius: 32,
			border: `6px solid ${INK}`,
			backgroundImage: `repeating-linear-gradient(115deg, rgba(255,255,255,0.16) 0 16px, transparent 16px 36px), linear-gradient(120deg, #facc15, ${TONES.warning.fill})`,
			boxShadow: '0 22px 40px rgba(161, 98, 7, 0.35)',
			color: INK,
			display: 'flex',
			alignItems: 'center',
			gap: 20,
		}}
	>
		<div
			style={{
				width: 96,
				height: 96,
				flexShrink: 0,
				borderRadius: 22,
				border: `5px solid ${INK}`,
				backgroundColor: 'rgba(255,255,255,0.85)',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<FaTicket size={52} color={INK} />
		</div>
		<div>
			<div style={{fontSize: 40, fontWeight: 800, letterSpacing: '0.04em'}}>ACCESS TOKEN</div>
			<div
				style={{
					marginTop: 8,
					display: 'inline-block',
					padding: '6px 16px',
					borderRadius: 999,
					backgroundColor: INK,
					color: '#ffffff',
					fontFamily: MONO,
					fontSize: 24,
					fontWeight: 700,
				}}
			>
				{OAUTH.scope}
			</div>
		</div>
	</div>
);

/** Struck-through password field: the app never gets it. */
const NoPassword: React.FC = () => {
	const look = useLook();
	return (
		<Card
			at={SETTLED}
			tone="danger"
			radius={28}
			style={{display: 'flex', alignItems: 'center', gap: 16, padding: '14px 18px 14px 14px'}}
		>
			<IconTile icon={FaKey} tone="danger" size={64} />
			<span
				style={{
					fontFamily: MONO,
					fontSize: 40,
					fontWeight: 800,
					letterSpacing: '0.1em',
					color: look.tone('danger'),
					textDecoration: 'line-through',
				}}
			>
				••••••
			</span>
			<div
				style={{
					width: 52,
					height: 52,
					borderRadius: 26,
					backgroundColor: TONES.danger.fill,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<FaXmark size={32} color="#ffffff" />
			</div>
		</Card>
	);
};

const Cover: React.FC = () => {
	const look = useLook();
	return (
		<>
			<Glow x={170} y={330} r={520} color="rgba(124, 58, 237, 0.16)" />
			<Glow x={930} y={880} r={560} color="rgba(37, 99, 235, 0.16)" />
			<Glow x={760} y={1290} r={420} color="rgba(234, 179, 8, 0.2)" />

			<div style={{position: 'absolute', left: 48, top: 44}}>
				<ChannelBadge />
			</div>

			<div style={{position: 'absolute', left: 0, width: 1080, top: 162, display: 'flex', justifyContent: 'center'}}>
				<div
					style={{
						padding: '10px 34px',
						borderRadius: 999,
						boxShadow: look.inset,
						fontSize: 38,
						fontWeight: 800,
						letterSpacing: '0.3em',
						color: look.dim,
					}}
				>
					CARA KERJA
				</div>
			</div>
			<Title />
			<div style={{position: 'absolute', left: 0, width: 1080, top: 520, display: 'flex', justifyContent: 'center'}}>
				<Question />
			</div>

			<div style={{position: 'absolute', left: 470, top: 830, rotate: '-3deg'}}>
				<Consent />
			</div>
			<div style={{position: 'absolute', left: 500, top: 1210, rotate: '4deg'}}>
				<Ticket />
			</div>
			<Actor x={240} floor={1415}>
				<ManCharacter expression="surprised" pose="pointRight" yaw={18} style={{scale: 0.62}} />
			</Actor>
			<div style={{position: 'absolute', left: 52, top: 818, rotate: '-6deg'}}>
				<NoPassword />
			</div>
		</>
	);
};

/** 3:4 cover (1080x1440) for "Cara Kerja OAuth". Render: npx remotion still HowOauthWorksThumbnail src/content/how-oauth-works/thumbnail.png */
export const HowOauthWorksThumbnail: React.FC = () => (
	<SceneShell cut={false} whoosh={false}>
		<Cover />
	</SceneShell>
);
