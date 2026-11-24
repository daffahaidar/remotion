import React from 'react';
import type {IconType} from 'react-icons';
import {FaBookmark, FaHandPointer, FaHandSparkles, FaHeart, FaRegBookmark, FaRegHeart, FaUserCheck, FaUserPlus} from 'react-icons/fa6';
import {Easing, Img, interpolate, useCurrentFrame} from 'remotion';
import logo from '../../assets/channel/profile.png';
import {SFX, TONES, type Tone} from './theme';
import {Card, raised, Reveal, SceneShell, Sfx, useIn, useLook, useRamp, useSec} from './ui';

/** Channel branding, shared by every video's outro. */
export const CHANNEL = {handle: 'daffahaidarnz', logo} as const;
/** The taps below are timed for this length: use it as the last SCENE_SECONDS entry. */
export const OUTRO_SECONDS = 10;

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/** `say` = caption appears (when the narration gives the reason), `at` = the finger taps the button. */
const ACTIONS: readonly {say: number; at: number; tone: Tone; icon: IconType; done: IconType; label: string; why: string; sfx: string}[] = [
	{say: 0.3, at: 2, tone: 'danger', icon: FaRegHeart, done: FaHeart, label: 'Like', why: 'Kalau videonya ngebantu', sfx: SFX.pop},
	{say: 2.9, at: 3.2, tone: 'gold', icon: FaRegBookmark, done: FaBookmark, label: 'Simpan', why: 'Biar nggak lupa', sfx: SFX.sparkle},
	{say: 4.9, at: 5.2, tone: 'primary', icon: FaUserPlus, done: FaUserCheck, label: 'Follow', why: 'Follow / Subscribe, gratis kok!', sfx: SFX.ding},
];
const NEXT_AT = 7;
const ROW_TOP = 820;
/** Button centers; the row ends at x = 960 to keep clear of the platform's like/comment rail. */
const centerX = (i: number) => 250 + i * 290;

const Avatar: React.FC = () => {
	const look = useLook();
	const frame = useCurrentFrame();
	const pulse = useIn(ACTIONS[2].at, 8);
	return (
		<div
			style={{
				width: 340,
				height: 340,
				padding: 12,
				borderRadius: '50%',
				background: `conic-gradient(from ${frame * 2}deg, ${TONES.header.fill}, ${TONES.payload.fill}, ${TONES.signature.fill}, ${TONES.header.fill})`,
				boxShadow: raised(look, 12),
				scale: 1 + 0.06 * Math.sin(pulse * Math.PI),
			}}
		>
			<div style={{width: '100%', height: '100%', padding: 8, borderRadius: '50%', backgroundColor: look.bg}}>
				<Img name="Channel logo" src={CHANNEL.logo} style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
			</div>
		</div>
	);
};

/** Eight dots bursting out of a button when it gets tapped. */
const Burst: React.FC<{readonly at: number; readonly tone: Tone}> = ({at, tone}) => {
	const p = useRamp(at, 0.5, Easing.out(Easing.cubic));
	if (p <= 0 || p >= 1) return null;
	return (
		<>
			{Array.from({length: 8}, (_, i) => {
				const a = (i / 8) * Math.PI * 2;
				const r = 64 + 56 * p;
				return (
					<div
						key={a}
						style={{
							position: 'absolute',
							left: 60 + Math.cos(a) * r - 8,
							top: 60 + Math.sin(a) * r - 8,
							width: 16,
							height: 16,
							borderRadius: 8,
							backgroundColor: TONES[tone].fill,
							opacity: 1 - p,
						}}
					/>
				);
			})}
		</>
	);
};

const ActionButton: React.FC<{readonly action: (typeof ACTIONS)[number]}> = ({action: {at, tone, icon: Idle, done: Done, label}}) => {
	const look = useLook();
	const on = useSec() >= at;
	const pop = useIn(at, 8);
	const Icon = on ? Done : Idle;
	const fill = TONES[tone].fill;
	return (
		<Card pressed={on} tone={on ? tone : undefined} style={{width: 260, height: 240, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18}}>
			<div style={{position: 'relative', width: 120, height: 120}}>
				<Burst at={at} tone={tone} />
				<div
					style={{
						width: 120,
						height: 120,
						borderRadius: 60,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: on ? fill : look.bg,
						boxShadow: on ? `0 12px 28px ${fill}66` : raised(look, 6),
						scale: 1 + 0.25 * Math.sin(pop * Math.PI),
					}}
				>
					<Icon size={56} color={on ? '#ffffff' : look.tone(tone)} />
				</div>
			</div>
			<span style={{fontSize: 44, fontWeight: 800, color: on ? look.tone(tone) : look.text}}>{label}</span>
		</Card>
	);
};

/** Tapping finger: rises in under the first button, hops to each one, taps, then drops away. */
const Finger: React.FC = () => {
	const look = useLook();
	const t = useSec();
	const enter = useRamp(ACTIONS[0].at - 0.7, 0.4);
	const exit = useRamp(ACTIONS[2].at + 0.4, 0.4);
	if (enter <= 0 || exit >= 1) return null;
	const x = interpolate(
		t,
		ACTIONS.flatMap((a) => [a.at - 0.3, a.at + 0.15]),
		ACTIONS.flatMap((_, i) => [centerX(i), centerX(i)]),
		{...clamp, easing: Easing.bezier(0.65, 0, 0.35, 1)},
	);
	const press = Math.max(...ACTIONS.map((a) => interpolate(t, [a.at - 0.12, a.at, a.at + 0.12], [0, 1, 0], clamp)));
	return (
		<div
			style={{
				position: 'absolute',
				// The fingertip sits ~35 px from the icon's left edge.
				left: x - 35,
				top: ROW_TOP + 100 + (1 - enter + exit) * 260,
				opacity: enter * (1 - exit),
				scale: 1 - 0.18 * press,
				transformOrigin: '35px 0px',
				filter: `drop-shadow(0 12px 18px ${look.lo})`,
			}}
		>
			<FaHandPointer size={110} color={look.text} />
		</div>
	);
};

const NextUp: React.FC<{readonly topic: string; readonly question?: string}> = ({topic, question}) => {
	const look = useLook();
	return (
		<Card at={NEXT_AT} style={{padding: '28px 36px', display: 'flex', flexDirection: 'column', gap: 6}}>
			<span style={{fontSize: 28, fontWeight: 800, letterSpacing: '0.16em', color: look.dim}}>VIDEO BERIKUTNYA</span>
			<span style={{fontSize: 76, fontWeight: 800, color: look.tone('primary')}}>{topic}</span>
			{question ? <span style={{fontSize: 34, fontWeight: 700, color: look.dim}}>{question}</span> : null}
		</Card>
	);
};

/** Raised channel chip (logo + handle), used on every video thumbnail. */
export const ChannelBadge: React.FC = () => {
	const look = useLook();
	return (
		<div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '10px 28px 10px 10px', borderRadius: 999, backgroundColor: look.bg, border: `1px solid ${look.edge}`, boxShadow: raised(look, 8)}}>
			<Img name="Channel logo" src={CHANNEL.logo} style={{width: 72, height: 72, borderRadius: 36, objectFit: 'cover'}} />
			<span style={{fontSize: 34, fontWeight: 800}}>
				<span style={{color: look.tone('primary')}}>@</span>
				{CHANNEL.handle}
			</span>
		</div>
	);
};

/**
 * Standard closing scene for every video: channel card, Like / Simpan / Follow taps, next-video teaser.
 * Leave out `nextTopic` while the next video is undecided: the next-video card (and its whoosh) is then not rendered.
 */
export const ChannelOutro: React.FC<{readonly nextTopic?: string; readonly nextQuestion?: string}> = ({nextTopic, nextQuestion}) => {
	const look = useLook();
	return (
		<SceneShell chapter="Sampai jumpa" chapterIcon={FaHandSparkles}>
			<Reveal at={-0.25} style={{left: 370, top: 290}}>
				<Avatar />
			</Reveal>
			<Reveal at={-0.1} kind="rise" style={{left: 0, width: 1080, top: 665, display: 'flex', justifyContent: 'center'}}>
				<span style={{fontSize: 72, fontWeight: 800, letterSpacing: '-0.02em'}}>
					<span style={{color: look.tone('primary')}}>@</span>
					{CHANNEL.handle}
				</span>
			</Reveal>
			{ACTIONS.map((a, i) => (
				<Reveal key={a.label} at={0.15 + i * 0.12} kind="rise" style={{left: centerX(i) - 130, top: ROW_TOP}}>
					<ActionButton action={a} />
				</Reveal>
			))}
			{ACTIONS.map((a, i) => (
				<Reveal
					key={a.label}
					at={a.say}
					out={i < ACTIONS.length - 1 ? ACTIONS[i + 1].say - 0.3 : undefined}
					kind="rise"
					style={{left: 0, width: 1080, top: 1095, display: 'flex', justifyContent: 'center'}}
				>
					<span style={{fontSize: 44, fontWeight: 800, color: look.tone(a.tone)}}>{a.why}</span>
				</Reveal>
			))}
			<Finger />
			{nextTopic ? (
				<>
					<Reveal at={NEXT_AT} kind="rise" style={{left: 120, top: 1190, width: 840}}>
						<NextUp topic={nextTopic} question={nextQuestion} />
					</Reveal>
					<Sfx name="Next video" src={SFX.whoosh} at={NEXT_AT} volume={0.3} />
				</>
			) : null}

			{ACTIONS.map((a) => (
				<Sfx key={a.label} name={a.label} src={a.sfx} at={a.at} volume={0.5} />
			))}
		</SceneShell>
	);
};
