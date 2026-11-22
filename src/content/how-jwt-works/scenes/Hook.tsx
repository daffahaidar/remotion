import React from 'react';
import {FaCrown, FaEye, FaQuestion} from 'react-icons/fa6';
import {interpolate, random, useCurrentFrame} from 'remotion';
import {MONO, SFX, TONES} from '../theme';
import {Card, Glow, HackerDesk, Headline, Pill, Reveal, SceneShell, Sfx, Stamp, useLook, useRamp, useSec} from '../ui';

/** `"user"` gets selected at `at`, deleted, and retyped as `"admin"`; struck through at `strikeAt`. */
export const RoleEdit: React.FC<{readonly at: number; readonly strikeAt?: number}> = ({at, strikeAt = 999}) => {
	const look = useLook();
	const frame = useCurrentFrame();
	const t = useSec();
	const typed = 'admin'.slice(0, Math.max(0, Math.floor((t - at - 0.35) * 12)));
	const jitter = t > at + 0.7 && t < at + 1.2 ? (random(`j${frame}`) - 0.5) * 10 : 0;
	if (t < at + 0.25)
		return (
			<span style={{color: look.tone('payload'), backgroundColor: t > at ? 'rgba(96, 165, 250, 0.35)' : undefined, borderRadius: 6}}>
				&quot;user&quot;
			</span>
		);
	return (
		<span
			style={{
				color: look.tone('danger'),
				textDecoration: t > strikeAt ? 'line-through' : undefined,
				textShadow: jitter ? `${jitter}px 0 0 #22d3ee, ${-jitter}px 0 0 #f43f5e` : `0 0 22px ${TONES.danger.fill}`,
			}}
		>
			&quot;{typed}
			{typed.length === 5 ? '"' : <span style={{display: 'inline-block', width: '0.55em', height: '1em', verticalAlign: '-0.15em', backgroundColor: 'currentColor'}} />}
		</span>
	);
};

const HookStage: React.FC = () => {
	const look = useLook();
	const t = useSec();
	const blends = [useRamp(2.9, 0.3), useRamp(4.5, 0.18), useRamp(6.2, 0.3)];
	const phase = t < 4.5 ? 0 : t < 6.2 ? 1 : 2;
	const expression = t < 2.2 ? 'focused' : t < 3.2 ? 'smirk' : t < 4.5 ? 'laugh' : t < 6.2 ? 'jawDrop' : 'confused';
	const titleGlitch = interpolate(t, [8, 8.35], [14, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	return (
		<>
			<Glow x={540} y={1180} r={600} color="rgba(34, 197, 94, 0.42)" />

			<Reveal at={-1} out={7.9} kind="fade" style={{left: 0, top: 0, width: 1080, height: 1920}}>
				<HackerDesk
					x={540}
					floor={1490}
					scale={0.76}
					screen={t < 4.5 ? 'code' : 'error'}
					hacker={{
						expression,
						pose: (['typing', 'fistPump', 'surprised'] as const)[phase],
						poseTo: (['fistPump', 'surprised', 'think'] as const)[phase],
						poseBlend: blends[phase],
						talking: t > 3.2 && t < 4.4,
					}}
				/>
			</Reveal>

			<Reveal at={-1} out={6.1} kind="fade" style={{left: 110, top: 300, width: 860}}>
				<Card at={-1} style={{overflow: 'hidden'}}>
					<div style={{display: 'flex', alignItems: 'center', gap: 12, padding: '22px 30px', borderBottom: `1px solid ${look.edge}`}}>
						{['#f87171', '#facc15', '#4ade80'].map((c) => (
							<div key={c} style={{width: 18, height: 18, borderRadius: 9, backgroundColor: c}} />
						))}
						<span style={{marginLeft: 16, fontFamily: MONO, fontSize: 30, color: look.dim}}>token.payload</span>
					</div>
					<div style={{padding: '24px 40px 34px', fontFamily: MONO, fontSize: 52, fontWeight: 700, lineHeight: 1.45}}>
						<div style={{color: look.dim}}>{'{'}</div>
						<div>
							&nbsp;&nbsp;<span style={{color: look.tone('primary')}}>&quot;name&quot;</span>: <span style={{color: look.tone('payload')}}>&quot;Budi&quot;</span>,
						</div>
						<div>
							&nbsp;&nbsp;<span style={{color: look.tone('primary')}}>&quot;role&quot;</span>: <RoleEdit at={1.2} strikeAt={4.6} />
						</div>
						<div style={{color: look.dim}}>{'}'}</div>
					</div>
				</Card>
			</Reveal>

			<Reveal at={3} out={4.5} damping={10} style={{left: 0, width: 1080, top: 760, display: 'flex', justifyContent: 'center'}}>
				<Pill icon={FaCrown} tone="gold" solid size={56}>
					ADMIN?!
				</Pill>
			</Reveal>

			<div
				style={{
					position: 'absolute',
					inset: 0,
					backgroundColor: TONES.danger.fill,
					opacity: interpolate(t, [4.5, 4.56, 5.2], [0, 0.3, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
				}}
			/>
			<Stamp at={4.5} out={6.1} size={92} style={{left: 0, right: 0, top: 690}}>
				401 · DITOLAK
			</Stamp>

			<Headline text="Kok bisa *ketahuan?*" top={330} at={6.3} out={7.9} size={108} tone="danger" />
			{[
				{at: 6.5, left: 300, top: 760, rotate: -16, size: 90},
				{at: 6.7, left: 690, top: 700, rotate: 12, size: 120},
				{at: 6.9, left: 480, top: 640, rotate: -4, size: 70},
			].map((q) => (
				<Reveal key={q.at} at={q.at} out={7.9} damping={9} style={{left: q.left, top: q.top, rotate: `${q.rotate}deg`}}>
					<FaQuestion size={q.size} color={TONES.danger.fill} />
				</Reveal>
			))}

			<Reveal at={8} kind="pop" damping={11} style={{left: 90, top: 470, width: 900}}>
				<Card at={8} radius={64} style={{padding: '54px 0 60px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
					<div style={{fontSize: 60, fontWeight: 800, letterSpacing: '0.24em', color: look.dim}}>CARA KERJA</div>
					<div
						style={{
							fontSize: 290,
							fontWeight: 800,
							lineHeight: 1.02,
							letterSpacing: '-0.04em',
							backgroundImage: 'linear-gradient(90deg, #fb7185, #a78bfa 50%, #38bdf8)',
							WebkitBackgroundClip: 'text',
							backgroundClip: 'text',
							color: 'transparent',
							filter: `drop-shadow(${titleGlitch}px 0 0 #f43f5e) drop-shadow(${-titleGlitch}px 0 0 #22d3ee) drop-shadow(0 0 40px rgba(167, 139, 250, 0.45))`,
						}}
					>
						JWT
					</div>
					<div style={{fontFamily: MONO, fontSize: 48, fontWeight: 700, color: look.text}}>JSON Web Token</div>
				</Card>
			</Reveal>

			<Reveal at={9.4} kind="rise" style={{left: 0, width: 1080, top: 1090, display: 'flex', justifyContent: 'center', gap: 14}}>
				<Pill tone="header" solid size={34}>
					HEADER
				</Pill>
				<Pill tone="payload" solid size={34}>
					PAYLOAD
				</Pill>
				<Pill tone="signature" solid size={34}>
					SIGNATURE
				</Pill>
			</Reveal>
			<Reveal at={10.4} kind="rise" style={{left: 0, width: 1080, top: 1230, display: 'flex', justifyContent: 'center'}}>
				<Pill icon={FaEye} tone="gold" size={42}>
					Tonton sampai habis
				</Pill>
			</Reveal>
		</>
	);
};

export const Hook: React.FC = () => (
	<SceneShell theme="dark" cut={false} whoosh={false} glow="rgba(34, 197, 94, 0.16)" shakeAt={4.5}>
		<HookStage />
		<Sfx name="Typing" src={SFX.typing} at={0} volume={0.45} />
		<Sfx name="Glitch admin" src={SFX.glitch} at={1.9} volume={0.45} />
		<Sfx name="Pop admin" src={SFX.pop} at={3} volume={0.6} />
		<Sfx name="Boom 401" src={SFX.boom} at={4.5} volume={0.6} />
		<Sfx name="Denied 401" src={SFX.denied} at={4.55} volume={0.4} />
		<Sfx name="Riser" src={SFX.riser} at={6} volume={0.35} />
		<Sfx name="Pop question" src={SFX.pop} at={6.3} volume={0.5} />
		<Sfx name="Impact title" src={SFX.impact} at={8} volume={0.75} />
		<Sfx name="Pop parts" src={SFX.pop} at={9.4} volume={0.5} />
		<Sfx name="Sparkle watch" src={SFX.sparkle} at={10.4} volume={0.45} />
	</SceneShell>
);
