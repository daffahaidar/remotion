import React from 'react';
import {FaEye, FaQuestion, FaWifi} from 'react-icons/fa6';
import {interpolate} from 'remotion';
import type {PoseName} from '../../../assets/character/hacker';
import {MONO, SFX, TONES} from '../../shared/theme';
import {Card, Glow, Headline, Pill, Reveal, SceneShell, Scramble, Sfx, Stamp, TypeText, useLook, useSec} from '../../shared/ui';
import {CafeHacker, NET, StageStrip} from '../parts';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const CATCH_AT = 0.3;
const READ_AT = 2.2;
const STAMP_AT = 4;
const WHY_AT = 5;
const WIFI_AT = 6;
const TITLE_AT = 8;
/** "Tonton sampai habis" is said first (00:09), the four stages show under "biar tahu kenapa". */
const WATCH_AT = 9;
const STAGES_AT = 10.3;

const POSES: readonly {at: number; pose: PoseName}[] = [
	{at: 0, pose: 'typing'},
	{at: 3.2, pose: 'think'},
	{at: STAMP_AT, pose: 'surprised'},
	{at: 5.4, pose: 'shrug'},
];
const EXPRESSIONS = [
	{at: 0, e: 'smirk'},
	{at: 1.6, e: 'focused'},
	{at: 3.2, e: 'confused'},
	{at: STAMP_AT, e: 'jawDrop'},
	{at: 5.4, e: 'confused'},
] as const;

/** The hacker's packet sniffer: sees who talks to which IP, but the content is ciphertext. */
const Sniffer: React.FC = () => {
	const look = useLook();
	const t = useSec();
	return (
		<Card at={-1} style={{overflow: 'hidden'}}>
			<div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '22px 30px', borderBottom: `1px solid ${look.edge}`}}>
				<FaWifi size={36} color={look.tone('danger')} />
				<span style={{fontFamily: MONO, fontSize: 32, fontWeight: 700, color: look.dim}}>sniffer · {NET.wifi}</span>
				<span style={{marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10, fontFamily: MONO, fontSize: 28, fontWeight: 800, color: look.tone('danger')}}>
					<span style={{width: 18, height: 18, borderRadius: 9, backgroundColor: TONES.danger.fill, opacity: Math.floor(t * 2) % 2 ? 0.25 : 1}} />
					REC
				</span>
			</div>
			<div style={{padding: '24px 36px 32px', fontFamily: MONO, fontWeight: 700, display: 'flex', flexDirection: 'column', gap: 12}}>
				<div style={{height: 62}}>
					<Reveal at={CATCH_AT} kind="left" style={{position: 'relative'}}>
						<span style={{fontSize: 44}}>
							HP-Budi → <span style={{color: look.tone('primary')}}>{NET.ip}</span>
						</span>
					</Reveal>
				</div>
				<div style={{fontSize: 32, color: look.dim}}>isi pencarian:</div>
				<div style={{height: 56, fontSize: 40, color: look.tone('danger')}}>
					{t < READ_AT ? <TypeText text="membaca..." at={CATCH_AT + 0.4} cps={10} /> : <Scramble text={NET.cipher} from="" at={READ_AT} dur={1.2} />}
				</div>
			</div>
		</Card>
	);
};

const Title: React.FC = () => {
	const look = useLook();
	const glitch = interpolate(useSec(), [TITLE_AT, TITLE_AT + 0.35], [14, 0], clamp);
	return (
		<Card at={TITLE_AT} radius={64} style={{padding: '50px 0 56px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
			<div style={{fontSize: 60, fontWeight: 800, letterSpacing: '0.24em', color: look.dim}}>CARA KERJA</div>
			<div
				style={{
					fontSize: 230,
					fontWeight: 800,
					lineHeight: 1.08,
					letterSpacing: '-0.04em',
					backgroundImage: 'linear-gradient(90deg, #38bdf8, #4ade80 35%, #facc15 65%, #a78bfa)',
					WebkitBackgroundClip: 'text',
					backgroundClip: 'text',
					color: 'transparent',
					filter: `drop-shadow(${glitch}px 0 0 #f43f5e) drop-shadow(${-glitch}px 0 0 #22d3ee) drop-shadow(0 0 40px rgba(56, 189, 248, 0.4))`,
				}}
			>
				Internet
			</div>
			<div style={{fontSize: 40, fontWeight: 700, color: look.text}}>Apa yang terjadi saat buka Google?</div>
		</Card>
	);
};

const Stage: React.FC = () => {
	const t = useSec();
	return (
		<>
			<Glow x={540} y={1180} r={600} color="rgba(34, 197, 94, 0.42)" />
			<Reveal at={-1} out={7.9} kind="fade" style={{left: 0, top: 0, width: 1080, height: 1920}}>
				<CafeHacker x={540} scale={0.76} poses={POSES} expressions={EXPRESSIONS} failAt={STAMP_AT} />
			</Reveal>

			<Reveal at={-1} out={WHY_AT} kind="fade" style={{left: 110, top: 300, width: 860}}>
				<Sniffer />
			</Reveal>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					backgroundColor: TONES.danger.fill,
					opacity: interpolate(t, [STAMP_AT, STAMP_AT + 0.06, STAMP_AT + 0.7], [0, 0.3, 0], clamp),
				}}
			/>
			<Stamp at={STAMP_AT} out={WHY_AT} size={92} style={{left: 0, right: 0, top: 690}}>
				NGGAK KEBACA!
			</Stamp>

			<Headline text="Kok *nggak kebaca?*" top={330} at={WHY_AT} out={7.9} size={108} tone="danger" />
			<Reveal at={WIFI_AT} out={7.9} damping={11} style={{left: 0, width: 1080, top: 600, display: 'flex', justifyContent: 'center'}}>
				<Pill icon={FaWifi} tone="warning" size={44}>
					Padahal Wi-Fi-nya sama!
				</Pill>
			</Reveal>
			{[
				{at: 6.4, left: 150, top: 720, rotate: -16, size: 90},
				{at: 6.6, left: 830, top: 690, rotate: 12, size: 110},
				{at: 6.8, left: 520, top: 760, rotate: -4, size: 70},
			].map((q) => (
				<Reveal key={q.at} at={q.at} out={7.9} damping={9} style={{left: q.left, top: q.top, rotate: `${q.rotate}deg`}}>
					<FaQuestion size={q.size} color={TONES.danger.fill} />
				</Reveal>
			))}

			<Reveal at={TITLE_AT} kind="pop" damping={11} style={{left: 90, top: 470, width: 900}}>
				<Title />
			</Reveal>
			<Reveal at={STAGES_AT} kind="rise" style={{left: 0, width: 1080, top: 1090, display: 'flex', justifyContent: 'center'}}>
				<StageStrip />
			</Reveal>
			<Reveal at={WATCH_AT} kind="rise" style={{left: 0, width: 1080, top: 1230, display: 'flex', justifyContent: 'center'}}>
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
		<Sfx name="Sniffing" src={SFX.typing} at={0} volume={0.45} />
		<Sfx name="Caught packet" src={SFX.pop} at={CATCH_AT} volume={0.5} />
		<Sfx name="Ciphertext" src={SFX.glitch} at={READ_AT} volume={0.45} />
		<Sfx name="Boom unreadable" src={SFX.boom} at={STAMP_AT} volume={0.6} />
		<Sfx name="Denied" src={SFX.denied} at={STAMP_AT + 0.05} volume={0.4} />
		<Sfx name="Same Wi-Fi" src={SFX.pop} at={WIFI_AT} volume={0.5} />
		<Sfx name="Riser" src={SFX.riser} at={6} volume={0.35} />
		<Sfx name="Pop question" src={SFX.pop} at={6.4} volume={0.45} />
		<Sfx name="Impact title" src={SFX.impact} at={TITLE_AT} volume={0.75} />
		<Sfx name="Sparkle watch" src={SFX.sparkle} at={WATCH_AT} volume={0.45} />
		<Sfx name="Pop stages" src={SFX.pop} at={STAGES_AT} volume={0.5} />
	</SceneShell>
);
