import React from 'react';
import {FaBrain, FaEnvelope, FaUser} from 'react-icons/fa6';
import {ManCharacter} from '../../../assets/character';
import {ServerRack} from '../../../assets/property';
import {MONO, SFX} from '../theme';
import {Actor, Bubble, Card, Headline, IconTile, Pill, Place, Reveal, SceneShell, Sfx, Travel, useLook, useRamp, useSec} from '../ui';

const REQUESTS = [3.3, 4.6, 5.9];
const BUBBLES = [
	{at: 3.9, top: 880, left: 600, text: 'Kamu siapa?', size: 40},
	{at: 5.2, top: 770, left: 570, text: 'Kamu siapa??', size: 44},
	{at: 6.5, top: 660, left: 520, text: 'KAMU SIAPA???', size: 52},
];

const LoginCard: React.FC = () => {
	const look = useLook();
	return (
		<Card style={{width: 330, padding: 24, display: 'flex', flexDirection: 'column', gap: 14}}>
			<div style={{display: 'flex', alignItems: 'center', gap: 14, fontSize: 34, fontWeight: 800}}>
				<IconTile icon={FaUser} size={56} />
				Login
			</div>
			<div style={{height: 34, borderRadius: 12, boxShadow: look.inset}} />
			<div style={{height: 34, borderRadius: 12, boxShadow: look.inset}} />
		</Card>
	);
};

const Stage: React.FC = () => {
	const t = useSec();
	const facepalm = useRamp(6.6, 0.3);
	const expression = t < 4.1 ? 'happy' : t < 5.4 ? 'confused' : t < 6.6 ? 'skeptical' : t < 9.4 ? 'embarrassed' : 'angry';
	return (
		<>
			<Headline text="Server itu *PELUPA*" top={300} size={110} tone="danger" />

			<Actor x={250} floor={1440}>
				<ManCharacter expression={expression} pose="point" poseTo="facepalm" poseBlend={facepalm} yaw={18} style={{scale: 0.62}} />
			</Actor>
			<Place x={650} y={1000} scale={0.85}>
				<ServerRack status={t < 6.5 ? 'healthy' : 'warning'} label="SERVER" />
			</Place>

			{REQUESTS.map((at) => (
				<Travel key={at} from={[360, 1130]} to={[780, 1150]} at={at} dur={0.6} arc={-180}>
					<Pill icon={FaEnvelope} tone="primary" size={28} mono>
						GET /profil
					</Pill>
				</Travel>
			))}
			{BUBBLES.map((b) => (
				<Reveal key={b.at} at={b.at} damping={10} style={{left: b.left, top: b.top}}>
					<Bubble tone={b.at > 6 ? 'danger' : undefined} size={b.size}>
						{b.text}
					</Bubble>
				</Reveal>
			))}

			<Reveal at={7.6} out={9.3} kind="rise" style={{left: 0, width: 1080, top: 565, display: 'flex', justifyContent: 'center'}}>
				<Pill icon={FaBrain} tone="primary" size={40}>
					HTTP = <span style={{fontFamily: MONO}}>stateless</span>
				</Pill>
			</Reveal>

			{[9.4, 9.8, 10.2].map((at, i) => (
				<Reveal key={at} at={at} damping={11} style={{left: 90 + i * 22, top: 690 + i * 26, rotate: `${(i - 1) * 4}deg`}}>
					<LoginCard />
				</Reveal>
			))}
			<Reveal at={10.6} damping={9} style={{left: 120, top: 590, rotate: '-6deg'}}>
				<Pill tone="danger" solid size={40}>
					Login lagi?!
				</Pill>
			</Reveal>
		</>
	);
};

export const Stateless: React.FC = () => (
	<SceneShell chapter="Masalahnya" chapterIcon={FaBrain}>
		<Stage />
		<Sfx name="Lights on" src={SFX.switch} at={0} volume={0.5} />
		{REQUESTS.map((at) => (
			<Sfx key={at} name="Send request" src={SFX.click} at={at} volume={0.5} />
		))}
		{BUBBLES.map((b) => (
			<Sfx key={b.at} name="Bubble" src={SFX.pop} at={b.at} volume={0.55} />
		))}
		<Sfx name="Stateless tag" src={SFX.ding} at={7.6} volume={0.35} />
		{[9.4, 9.8, 10.2].map((at) => (
			<Sfx key={at} name="Login card" src={SFX.pop} at={at} volume={0.45} />
		))}
		<Sfx name="Login lagi" src={SFX.boom} at={10.6} volume={0.35} />
	</SceneShell>
);
