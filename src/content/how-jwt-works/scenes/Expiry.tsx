import React from 'react';
import type {IconType} from 'react-icons';
import {FaArrowsRotate, FaCircleCheck, FaClock, FaHourglassHalf} from 'react-icons/fa6';
import {Easing} from 'remotion';
import {WallClock} from '../../../assets/property';
import {MONO, SFX, type Tone} from '../theme';
import {Arrow, Card, Headline, IconTile, Pill, Place, Reveal, SceneShell, Sfx, Stamp, useLook, useRamp} from '../ui';

/** Countdown from 15:00 to 00:00 between `at` and `at + dur` seconds. */
const Countdown: React.FC<{readonly at: number; readonly dur: number}> = ({at, dur}) => {
	const look = useLook();
	const p = useRamp(at, dur, Easing.in(Easing.quad));
	const left = Math.round(900 * (1 - p));
	const mmss = `${String(Math.floor(left / 60)).padStart(2, '0')}:${String(left % 60).padStart(2, '0')}`;
	return <span style={{fontFamily: MONO, fontSize: 70, fontWeight: 800, color: p >= 1 ? look.tone('danger') : look.text}}>{mmss}</span>;
};

const TokenRow: React.FC<{
	readonly at: number;
	readonly icon: IconType;
	readonly tone: Tone;
	readonly title: string;
	readonly sub: string;
	readonly dim?: boolean;
	readonly children?: React.ReactNode;
}> = ({at, icon, tone, title, sub, dim, children}) => {
	const look = useLook();
	return (
		<Card at={at} tone={tone} style={{width: 900, padding: '26px 32px', display: 'flex', alignItems: 'center', gap: 24, opacity: dim ? 0.55 : 1}}>
			<IconTile icon={icon} tone={tone} size={90} />
			<div style={{flex: 1}}>
				<div style={{fontSize: 44, fontWeight: 800}}>{title}</div>
				<div style={{fontSize: 30, fontWeight: 700, color: look.dim}}>{sub}</div>
			</div>
			{children}
		</Card>
	);
};

const Stage: React.FC = () => {
	const expired = useRamp(6.2, 0.4);
	return (
		<>
			<Headline text="Token punya *masa berlaku*" top={300} size={92} tone="warning" />

			<Reveal at={1.6} kind="rise" style={{left: 90, top: 540}}>
				<TokenRow at={1.6} icon={FaClock} tone="warning" title="Access token" sub="umur pendek" dim={expired >= 1}>
					<Countdown at={3.2} dur={3} />
				</TokenRow>
			</Reveal>
			<Stamp at={6.2} size={72} rotate={-6} style={{left: 0, right: 0, top: 575}}>
				KEDALUWARSA
			</Stamp>

			<Reveal at={2.8} out={6.8} damping={11} style={{left: 420, top: 800}}>
				<Place x={0} y={0} scale={1.2}>
					<WallClock variant="alarm" color="amber" fastForward ringing={false} />
				</Place>
			</Reveal>

			<Reveal at={7.2} kind="rise" style={{left: 90, top: 790}}>
				<TokenRow at={7.2} icon={FaArrowsRotate} tone="success" title="Refresh token" sub="khusus minta token baru" />
			</Reveal>
			<Arrow x1={540} y1={950} x2={540} y2={1050} at={8.6} dur={0.4} tone="success" />
			<Reveal at={9.4} damping={11} style={{left: 90, top: 1065}}>
				<TokenRow at={9.4} icon={FaCircleCheck} tone="success" title="Access token baru" sub="siap dipakai lagi">
					<Countdown at={999} dur={1} />
				</TokenRow>
			</Reveal>
			<Reveal at={10.6} kind="rise" style={{left: 0, width: 1080, top: 1310, display: 'flex', justifyContent: 'center'}}>
				<Pill icon={FaCircleCheck} tone="success" solid size={40}>
					Tanpa login ulang
				</Pill>
			</Reveal>
		</>
	);
};

export const Expiry: React.FC = () => (
	<SceneShell chapter="Masa berlaku" chapterIcon={FaHourglassHalf}>
		<Stage />
		<Sfx name="Token card" src={SFX.pop} at={1.6} volume={0.45} />
		<Sfx name="Clock" src={SFX.pop} at={2.8} volume={0.4} />
		<Sfx name="Ticking" src={SFX.ticking} at={3.2} volume={0.45} />
		<Sfx name="Ticking 2" src={SFX.ticking} at={5.1} volume={0.45} />
		<Sfx name="Expired" src={SFX.denied} at={6.2} volume={0.4} />
		<Sfx name="Refresh token" src={SFX.whoosh} at={7.2} volume={0.35} />
		<Sfx name="New token" src={SFX.sparkle} at={9.4} volume={0.5} />
		<Sfx name="No re-login" src={SFX.ding} at={10.6} volume={0.45} />
	</SceneShell>
);
