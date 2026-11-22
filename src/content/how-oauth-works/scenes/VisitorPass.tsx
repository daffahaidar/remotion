import React from 'react';
import {
	FaBuilding,
	FaIdBadge,
	FaKey,
	FaPhoneVolume,
	FaTruckFast,
	FaUser,
	FaUserShield,
	FaWandMagicSparkles,
	FaXmark,
} from 'react-icons/fa6';
import {MONO, SFX, TONES} from '../../shared/theme';
import {Arrow, Bubble, Card, Headline, Pill, Reveal, SceneShell, Sfx, useLook, useRamp, useSec} from '../../shared/ui';
import {Entity, ROLE} from '../parts';

const INK = '#1f1a1f';
const PASS_AT = 9.6;
const FLOOR_AT = 11.4;
const HOUR_AT = 12.6;
const LABEL_AT = 13;
const RING = [7.2, 8.6] as const;

const Chip: React.FC<{readonly children: React.ReactNode}> = ({children}) => (
	<div
		style={{
			padding: '8px 20px',
			borderRadius: 999,
			backgroundColor: INK,
			color: '#ffffff',
			fontSize: 30,
			fontWeight: 800,
			whiteSpace: 'nowrap',
		}}
	>
		{children}
	</div>
);

/** Gold visitor pass — the visual stand-in for an access token. */
const Pass: React.FC = () => {
	const sweep = useRamp(PASS_AT + 0.3, 0.7);
	return (
		<div
			style={{
				position: 'relative',
				width: 840,
				height: 230,
				borderRadius: 36,
				border: `7px solid ${INK}`,
				backgroundImage: `repeating-linear-gradient(115deg, rgba(255,255,255,0.14) 0 18px, transparent 18px 40px), linear-gradient(120deg, #facc15, ${TONES.warning.fill})`,
				boxShadow: '0 22px 40px rgba(161, 98, 7, 0.35)',
				overflow: 'hidden',
				display: 'flex',
				alignItems: 'center',
				gap: 26,
				padding: '0 30px',
				color: INK,
			}}
		>
			<div
				style={{
					width: 130,
					height: 130,
					flexShrink: 0,
					borderRadius: 24,
					border: `6px solid ${INK}`,
					backgroundColor: 'rgba(255,255,255,0.85)',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<FaIdBadge size={70} color={INK} />
			</div>
			<div style={{flex: 1}}>
				<div style={{fontSize: 56, fontWeight: 800, letterSpacing: '0.04em'}}>KARTU TAMU</div>
				<div style={{display: 'flex', gap: 12, marginTop: 12, height: 52}}>
					<Reveal at={FLOOR_AT} damping={10} style={{position: 'relative'}}>
						<Chip>Lantai 12 saja</Chip>
					</Reveal>
					<Reveal at={HOUR_AT} damping={10} style={{position: 'relative'}}>
						<Chip>Berlaku 1 jam</Chip>
					</Reveal>
				</div>
			</div>
			<div
				style={{
					position: 'absolute',
					top: 0,
					bottom: 0,
					width: 120,
					left: -140 + sweep * 1120,
					background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
				}}
			/>
		</div>
	);
};

const Phone: React.FC = () => {
	const look = useLook();
	const t = useSec();
	const ringing = t > RING[0] && t < RING[1];
	return (
		<FaPhoneVolume
			size={64}
			color={look.tone(ROLE.auth)}
			style={{rotate: `${ringing ? Math.sin(t * 40) * 14 : 0}deg`}}
		/>
	);
};

const Stage: React.FC = () => (
	<>
		<Headline text="Bayangkan *kartu tamu*" top={300} size={100} tone={ROLE.token} />

		<Reveal at={2} kind="left" style={{left: 90, top: 560}}>
			<Card at={2} tone={ROLE.client} style={{width: 370, padding: '24px 26px'}}>
				<Entity icon={FaTruckFast} tone={ROLE.client} name="Kurir" sub="antar paket" size={76} />
			</Card>
		</Reveal>
		<Arrow x1={470} y1={626} x2={612} y2={626} at={2.8} dur={0.4} tone={ROLE.client} />
		<Reveal at={3.4} kind="right" style={{left: 620, top: 560}}>
			<Card at={3.4} tone={ROLE.resource} style={{width: 370, padding: '24px 26px'}}>
				<Entity icon={FaBuilding} tone={ROLE.resource} name="Apartemen" sub="unit kamu" size={76} />
			</Card>
		</Reveal>
		<Reveal at={5.4} damping={9} style={{left: 0, width: 1080, top: 708, display: 'flex', justifyContent: 'center'}}>
			<Pill icon={FaKey} tone="danger" solid size={32}>
				Kunci? Nggak! <FaXmark size={30} />
			</Pill>
		</Reveal>

		<Reveal at={6.6} kind="left" style={{left: 90, top: 800}}>
			<Card at={6.6} tone={ROLE.auth} style={{width: 370, padding: '24px 26px'}}>
				<Entity icon={FaUserShield} tone={ROLE.auth} name="Satpam" sub="penjaga lobi" size={76} />
			</Card>
		</Reveal>
		<Reveal at={RING[0]} damping={10} style={{left: 508, top: 834}}>
			<Phone />
		</Reveal>
		<Reveal at={RING[0]} kind="right" style={{left: 620, top: 800}}>
			<Card at={RING[0]} tone={ROLE.owner} style={{width: 370, padding: '24px 26px'}}>
				<Entity icon={FaUser} tone={ROLE.owner} name="Kamu" sub="pemilik unit" size={76} />
			</Card>
		</Reveal>
		<Reveal at={7.6} damping={10} style={{left: 110, top: 952}}>
			<Bubble tone={ROLE.auth} size={34}>
				Izinkan kurir?
			</Bubble>
		</Reveal>
		<Reveal at={8.7} damping={9} style={{left: 700, top: 952}}>
			<Bubble tone="success" size={34}>
				Boleh!
			</Bubble>
		</Reveal>

		<Reveal at={PASS_AT} damping={11} style={{left: 120, top: 1060}}>
			<Pass />
		</Reveal>
		<Reveal
			at={LABEL_AT}
			kind="rise"
			style={{left: 0, width: 1080, top: 1318, display: 'flex', justifyContent: 'center', gap: 16}}
		>
			<Pill tone={ROLE.token} size={30}>
				Kartu tamu = <span style={{fontFamily: MONO}}>Access token</span>
			</Pill>
			<Pill tone={ROLE.scope} size={30}>
				Lantai = <span style={{fontFamily: MONO}}>Scope</span>
			</Pill>
		</Reveal>
	</>
);

export const VisitorPass: React.FC = () => (
	<SceneShell chapter="Ide OAuth" chapterIcon={FaWandMagicSparkles}>
		<Stage />
		<Sfx name="Courier" src={SFX.pop} at={2} volume={0.5} />
		<Sfx name="Apartment" src={SFX.pop} at={3.4} volume={0.5} />
		<Sfx name="No key" src={SFX.denied} at={5.4} volume={0.3} />
		<Sfx name="Guard" src={SFX.pop} at={6.6} volume={0.45} />
		<Sfx name="Ring" src={SFX.beep} at={RING[0]} volume={0.35} />
		<Sfx name="Ring 2" src={SFX.beep} at={7.8} volume={0.35} />
		<Sfx name="Allowed" src={SFX.ding} at={8.7} volume={0.4} />
		<Sfx name="Visitor pass" src={SFX.sparkle} at={PASS_AT} volume={0.55} />
		<Sfx name="Floor" src={SFX.pop} at={FLOOR_AT} volume={0.45} />
		<Sfx name="Hour" src={SFX.pop} at={HOUR_AT} volume={0.45} />
		<Sfx name="Labels" src={SFX.whoosh} at={LABEL_AT} volume={0.3} />
	</SceneShell>
);
