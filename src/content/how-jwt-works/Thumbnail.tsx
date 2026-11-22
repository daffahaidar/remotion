import React from 'react';
import {FaCrown} from 'react-icons/fa6';
import {HackerCharacter} from '../../assets/character';
import {ChannelBadge} from '../shared/ChannelOutro';
import {MONO, TONES} from './theme';
import {Actor, Card, Glow, Pill, SceneShell, Stamp, useLook} from './ui';

/** Still frame: everything is placed "long after" its entrance so springs are settled. */
const SETTLED = -10;

/** Gradient title embossed into the canvas with a neumorphic highlight + cast shadow. */
const Title: React.FC = () => (
	<div
		style={{
			position: 'absolute',
			left: 0,
			width: 1080,
			top: 200,
			textAlign: 'center',
			fontSize: 310,
			fontWeight: 800,
			lineHeight: 1,
			letterSpacing: '-0.04em',
			backgroundImage: 'linear-gradient(100deg, #e11d48, #7c3aed 50%, #0284c7)',
			WebkitBackgroundClip: 'text',
			backgroundClip: 'text',
			color: 'transparent',
			filter: 'drop-shadow(-8px -8px 10px rgba(255, 255, 255, 0.95)) drop-shadow(12px 14px 18px rgba(120, 135, 160, 0.55))',
		}}
	>
		JWT
	</div>
);

const Question: React.FC = () => {
	const look = useLook();
	return (
		<Card
			at={SETTLED}
			radius={52}
			style={{padding: '24px 52px 30px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}
		>
			<div style={{fontSize: 60, fontWeight: 800, color: look.text}}>
				Ubah jadi <span style={{color: look.tone('gold')}}>admin</span>, kok bisa
			</div>
			<div
				style={{
					fontSize: 140,
					fontWeight: 800,
					lineHeight: 1.05,
					letterSpacing: '-0.03em',
					color: look.tone('danger'),
					backgroundImage: `linear-gradient(transparent 60%, ${TONES.danger.fill}33 60%, ${TONES.danger.fill}33 92%, transparent 92%)`,
				}}
			>
				KETAHUAN?
			</div>
		</Card>
	);
};

/** The hacker's edited payload, colored like the video's token.payload card. */
const Payload: React.FC = () => {
	const look = useLook();
	const key = {color: look.tone('primary')};
	return (
		<Card at={SETTLED} tone="danger" style={{width: 540, overflow: 'hidden'}}>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: 12,
					padding: '20px 28px',
					borderBottom: `1px solid ${look.edge}`,
				}}
			>
				{['#f87171', '#facc15', '#4ade80'].map((c) => (
					<div key={c} style={{width: 18, height: 18, borderRadius: 9, backgroundColor: c}} />
				))}
				<span style={{marginLeft: 14, fontFamily: MONO, fontSize: 30, color: look.dim}}>token.payload</span>
			</div>
			<div style={{padding: '20px 32px 30px', fontFamily: MONO, fontSize: 42, fontWeight: 700, lineHeight: 1.5}}>
				<div style={{color: look.dim}}>{'{'}</div>
				<div>
					&nbsp;&nbsp;<span style={key}>&quot;name&quot;</span>:{' '}
					<span style={{color: look.tone('payload')}}>&quot;Budi&quot;</span>,
				</div>
				<div>
					&nbsp;&nbsp;<span style={key}>&quot;role&quot;</span>:{' '}
					<span style={{color: look.tone('danger'), textShadow: `0 0 18px ${TONES.danger.fill}55`}}>
						&quot;admin&quot;
					</span>
				</div>
				<div style={{color: look.dim}}>{'}'}</div>
			</div>
		</Card>
	);
};

const Cover: React.FC = () => {
	const look = useLook();
	return (
		<>
			<Glow x={540} y={360} r={520} color="rgba(124, 58, 237, 0.14)" />
			<Glow x={245} y={1180} r={440} color="rgba(34, 197, 94, 0.2)" />
			<Glow x={780} y={1060} r={460} color="rgba(220, 38, 38, 0.14)" />

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
			<div style={{position: 'absolute', left: 0, width: 1080, top: 525, display: 'flex', justifyContent: 'center'}}>
				<Question />
			</div>

			<div style={{position: 'absolute', left: 480, top: 850, rotate: '3deg'}}>
				<Payload />
			</div>
			<div style={{position: 'absolute', left: 750, top: 808, rotate: '10deg'}}>
				<Pill icon={FaCrown} tone="gold" solid size={36}>
					ADMIN?!
				</Pill>
			</div>
			<Stamp at={SETTLED} size={64} rotate={-8} style={{left: 450, right: 40, top: 1225}}>
				401 · DITOLAK
			</Stamp>
			<Actor x={245} floor={1420}>
				<HackerCharacter expression="jawDrop" pose="surprised" yaw={18} style={{scale: 0.64}} />
			</Actor>
		</>
	);
};

/** 3:4 cover (1080x1440) for "Cara Kerja JWT". Render: npx remotion still HowJwtWorksThumbnail src/content/how-jwt-works/thumbnail.png */
export const HowJwtWorksThumbnail: React.FC = () => (
	<SceneShell cut={false} whoosh={false}>
		<Cover />
	</SceneShell>
);
