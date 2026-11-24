import React from 'react';
import {FaArrowDown} from 'react-icons/fa6';
import {ManCharacter} from '../../assets/character';
import {ChannelBadge} from '../shared/ChannelOutro';
import {MONO, TONES} from '../shared/theme';
import {Actor, Card, Glow, SceneShell, useLook, Window} from '../shared/ui';
import {NET, StageStrip, STAGE} from './parts';

/** Still frame: everything is placed "long after" its entrance so springs are settled. */
const SETTLED = -10;

/** Gradient title embossed into the canvas with a neumorphic highlight + cast shadow. */
const Title: React.FC = () => (
	<div
		style={{
			position: 'absolute',
			left: 0,
			width: 1080,
			top: 212,
			textAlign: 'center',
			fontSize: 270,
			fontWeight: 800,
			lineHeight: 1,
			letterSpacing: '-0.05em',
			backgroundImage: 'linear-gradient(100deg, #0284c7, #16a34a 38%, #ca8a04 64%, #7c3aed)',
			WebkitBackgroundClip: 'text',
			backgroundClip: 'text',
			color: 'transparent',
			filter: 'drop-shadow(-8px -8px 10px rgba(255, 255, 255, 0.95)) drop-shadow(12px 14px 18px rgba(120, 135, 160, 0.55))',
		}}
	>
		Internet
	</div>
);

const Question: React.FC = () => {
	const look = useLook();
	return (
		<Card at={SETTLED} radius={52} style={{padding: '26px 54px 30px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
			<div style={{fontSize: 64, fontWeight: 800, color: look.text}}>Buka Google,</div>
			<div
				style={{
					fontSize: 132,
					fontWeight: 800,
					lineHeight: 1.05,
					letterSpacing: '-0.03em',
					color: look.tone('primary'),
					backgroundImage: `linear-gradient(transparent 60%, ${TONES.primary.fill}33 60%, ${TONES.primary.fill}33 92%, transparent 92%)`,
				}}
			>
				terjadi apa?
			</div>
		</Card>
	);
};

/** The browser resolving google.com into Google's IP address: the first thing the video explains. */
const Browser: React.FC = () => {
	const look = useLook();
	return (
		<Window at={SETTLED} width={560} url={<span style={{color: look.tone('primary')}}>{NET.domain}</span>}>
			<div style={{padding: '22px 30px 30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
				<FaArrowDown size={44} color={look.tone(STAGE.dns)} />
				<div style={{fontFamily: MONO, fontSize: 56, fontWeight: 800, color: look.tone(STAGE.dns)}}>{NET.ip}</div>
				<div style={{fontSize: 32, fontWeight: 700, color: look.dim}}>alamat asli Google</div>
			</div>
		</Window>
	);
};

const Cover: React.FC = () => {
	const look = useLook();
	return (
		<>
			<Glow x={170} y={330} r={520} color="rgba(2, 132, 199, 0.16)" />
			<Glow x={930} y={880} r={560} color="rgba(124, 58, 237, 0.15)" />
			<Glow x={760} y={1290} r={420} color="rgba(234, 179, 8, 0.2)" />

			<div style={{position: 'absolute', left: 48, top: 44}}>
				<ChannelBadge />
			</div>

			<div style={{position: 'absolute', left: 0, width: 1080, top: 162, display: 'flex', justifyContent: 'center'}}>
				<div style={{padding: '10px 34px', borderRadius: 999, boxShadow: look.inset, fontSize: 38, fontWeight: 800, letterSpacing: '0.3em', color: look.dim}}>
					CARA KERJA
				</div>
			</div>
			<Title />
			<div style={{position: 'absolute', left: 0, width: 1080, top: 520, display: 'flex', justifyContent: 'center'}}>
				<Question />
			</div>

			<div style={{position: 'absolute', left: 452, top: 850, rotate: '-3deg'}}>
				<Browser />
			</div>
			<div style={{position: 'absolute', left: 458, top: 1248, rotate: '2deg'}}>
				<StageStrip size={30} />
			</div>
			<Actor x={235} floor={1378}>
				<ManCharacter expression="surprised" pose="pointRight" yaw={18} style={{scale: 0.62}} />
			</Actor>
		</>
	);
};

/** 3:4 cover (1080x1440) for "Cara Kerja Internet". Render: npx remotion still HowInternetWorksThumbnail src/content/how-internet-works/thumbnail.png */
export const HowInternetWorksThumbnail: React.FC = () => (
	<SceneShell cut={false} whoosh={false}>
		<Cover />
	</SceneShell>
);
