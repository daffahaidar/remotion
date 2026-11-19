import React from 'react';
import {FaBook, FaCheck, FaGuitar, FaMicrophone, FaMusic, FaTicket, FaWandMagicSparkles, FaXmark} from 'react-icons/fa6';
import {useCurrentFrame} from 'remotion';
import {MONO, SFX, TONES} from '../theme';
import {Arrow, Card, Headline, IconTile, Pill, Reveal, SceneShell, Sfx, useLook, useRamp} from '../ui';

const INK = '#1f1a1f';

/** Festival wristband with a holographic seal — the visual stand-in for a JWT. */
const Band: React.FC = () => {
	const frame = useCurrentFrame();
	const sweep = useRamp(5.2, 0.7);
	return (
		<div style={{position: 'relative', width: 860, height: 250}}>
			<div
				style={{
					position: 'absolute',
					left: 0,
					top: 55,
					width: 860,
					height: 140,
					borderRadius: 70,
					border: `7px solid ${INK}`,
					backgroundImage: `repeating-linear-gradient(115deg, rgba(255,255,255,0.09) 0 18px, transparent 18px 40px), linear-gradient(90deg, ${TONES.payload.fill}, ${TONES.primary.fill})`,
					boxShadow: '0 22px 40px rgba(76, 29, 149, 0.35)',
					display: 'flex',
					alignItems: 'center',
					paddingLeft: 110,
					gap: 26,
					color: '#ffffff',
					fontWeight: 800,
					overflow: 'hidden',
				}}
			>
				<span style={{fontSize: 54, letterSpacing: '0.04em'}}>BUDI · VIP</span>
				<span style={{fontFamily: MONO, fontSize: 32, opacity: 0.85}}>s/d 23:00</span>
				<div
					style={{
						position: 'absolute',
						top: 0,
						bottom: 0,
						width: 120,
						left: -140 + sweep * 1150,
						background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)',
					}}
				/>
			</div>
			<div style={{position: 'absolute', left: 34, top: 98, width: 54, height: 54, borderRadius: 27, border: `6px solid ${INK}`, backgroundColor: '#e2e8f0'}} />
			<div
				style={{
					position: 'absolute',
					left: 640,
					top: 0,
					width: 210,
					height: 210,
					borderRadius: 105,
					border: `7px solid ${INK}`,
					backgroundImage: `conic-gradient(from ${frame * 4}deg, #f472b6, #facc15, #4ade80, #38bdf8, #a78bfa, #f472b6)`,
					boxShadow: '0 18px 36px rgba(15, 23, 42, 0.35)',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<div style={{width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(255,255,255,0.85)', border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<FaCheck size={64} color={TONES.success.fill} />
				</div>
			</div>
		</div>
	);
};

const STAGES = [
	{scan: 8.4, icon: FaMusic, name: 'Panggung A', path: '/profil'},
	{scan: 9.1, icon: FaMicrophone, name: 'Panggung B', path: '/pesanan'},
	{scan: 9.8, icon: FaGuitar, name: 'Panggung C', path: '/keranjang'},
];

const StageCard: React.FC<{readonly stage: (typeof STAGES)[number]}> = ({stage}) => {
	const look = useLook();
	const scan = useRamp(stage.scan - 0.45, 0.45);
	return (
		<Card at={7.6} style={{position: 'relative', width: 270, height: 230, padding: 22, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, overflow: 'hidden'}}>
			<IconTile icon={stage.icon} tone="payload" size={78} />
			<div style={{fontSize: 34, fontWeight: 800}}>{stage.name}</div>
			<div style={{fontFamily: MONO, fontSize: 28, fontWeight: 700, color: look.dim}}>{stage.path}</div>
			{scan > 0 && scan < 1 ? (
				<div style={{position: 'absolute', left: 0, right: 0, top: scan * 230 - 6, height: 12, backgroundColor: TONES.signature.fill, boxShadow: `0 0 26px ${TONES.signature.fill}`, opacity: 0.8}} />
			) : null}
			<Reveal at={stage.scan} damping={9} style={{right: 14, top: 14}}>
				<div style={{width: 58, height: 58, borderRadius: 29, backgroundColor: TONES.success.fill, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 20px ${TONES.success.fill}66`}}>
					<FaCheck size={32} color="#ffffff" />
				</div>
			</Reveal>
		</Card>
	);
};

const Stage: React.FC = () => {
	const look = useLook();
	return (
		<>
			<Headline text="Bayangkan *gelang konser*" top={300} size={96} tone="payload" />

			<Reveal at={3.3} kind="rise" style={{left: 0, width: 1080, top: 540, display: 'flex', justifyContent: 'center'}}>
				<Card at={3.3} style={{display: 'flex', alignItems: 'center', gap: 20, padding: '24px 30px'}}>
					<IconTile icon={FaTicket} tone="warning" size={80} />
					<div>
						<div style={{fontSize: 38, fontWeight: 800}}>Tunjukkan tiket</div>
						<div style={{fontSize: 30, fontWeight: 700, color: look.dim}}>di pintu masuk = login</div>
					</div>
				</Card>
			</Reveal>
			<Arrow x1={540} y1={684} x2={540} y2={762} at={4.2} dur={0.4} tone="payload" />

			<Reveal at={4.7} damping={11} style={{left: 110, top: 770}}>
				<Band />
			</Reveal>
			<Reveal at={6.1} kind="rise" style={{left: 0, width: 1080, top: 1040, display: 'flex', justifyContent: 'center', gap: 18}}>
				<Pill tone="payload" size={32}>
					Gelang = Token
				</Pill>
				<Pill tone="signature" size={32}>
					Segel = Tanda tangan
				</Pill>
			</Reveal>

			<div style={{position: 'absolute', left: 90, top: 1125, width: 900, display: 'flex', justifyContent: 'space-between'}}>
				{STAGES.map((s, i) => (
					<Reveal key={s.name} at={7.6 + i * 0.12} kind="rise" style={{position: 'relative'}}>
						<StageCard stage={s} />
					</Reveal>
				))}
			</div>

			<Reveal at={11.2} damping={10} style={{left: 0, width: 1080, top: 1380, display: 'flex', justifyContent: 'center'}}>
				<Pill icon={FaBook} tone="danger" size={36}>
					<span style={{textDecoration: 'line-through'}}>buku tamu</span>
					<FaXmark size={36} />
				</Pill>
			</Reveal>
		</>
	);
};

export const Wristband: React.FC = () => (
	<SceneShell chapter="Ide JWT" chapterIcon={FaWandMagicSparkles}>
		<Stage />
		<Sfx name="Ticket" src={SFX.pop} at={3.3} volume={0.5} />
		<Sfx name="Band" src={SFX.sparkle} at={4.7} volume={0.55} />
		<Sfx name="Labels" src={SFX.pop} at={6.1} volume={0.4} />
		{STAGES.map((s) => (
			<Sfx key={s.name} name="Scan" src={SFX.beep} at={s.scan} volume={0.4} />
		))}
		<Sfx name="No guest book" src={SFX.pop} at={11.2} volume={0.5} />
	</SceneShell>
);
