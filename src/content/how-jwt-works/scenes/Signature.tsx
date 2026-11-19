import React from 'react';
import {FaGear, FaKey, FaLock, FaPlus, FaShieldHalved} from 'react-icons/fa6';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {JWT, MONO, SFX, TONES} from '../theme';
import {Card, Headline, IconTile, Pill, Reveal, SceneShell, Scramble, Sfx, Stamp, Travel, useLook, useSec} from '../ui';

const SPINS = [9.0, 13.1];

const Machine: React.FC = () => {
	const look = useLook();
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	// Idle drift plus two fast bursts while hashing; integrated so the gear never jumps.
	const burst = (s: number) => interpolate(frame, [s * fps, (s + 1.3) * fps], [0, 720], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.45, 0, 0.2, 1)});
	const angle = frame * 1.5 + SPINS.reduce((a, s) => a + burst(s), 0);
	return (
		<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16}}>
			<Card at={8.6} radius={999} style={{width: 230, height: 230, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
				<div style={{width: 170, height: 170, borderRadius: 85, boxShadow: look.inset, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<FaGear size={110} color={TONES.signature.fill} style={{rotate: `${angle}deg`}} />
				</div>
			</Card>
			<Pill tone="signature" size={30} mono>
				HMAC-SHA256
			</Pill>
		</div>
	);
};

const SubValue: React.FC = () => {
	const look = useLook();
	const t = useSec();
	const changed = t >= 12.8;
	return (
		<span style={{fontFamily: MONO, fontSize: 38, fontWeight: 700, color: look.tone('payload')}}>
			{'{"sub":"'}
			<span style={{color: changed ? look.tone('warning') : undefined, backgroundColor: changed ? `${TONES.warning.fill}33` : undefined, borderRadius: 8, padding: '0 4px'}}>
				{changed ? '124' : '123'}
			</span>
			{'", ...}'}
		</span>
	);
};

const Stage: React.FC = () => {
	const look = useLook();
	const t = useSec();
	return (
		<>
			<Headline text="Kuncinya: *SIGNATURE*" top={300} size={96} tone="signature" />

			<Reveal at={3.6} kind="rise" style={{left: 0, width: 1080, top: 530, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 22}}>
				<Pill tone="header" solid size={36}>
					HEADER
				</Pill>
				<FaPlus size={34} color={look.dim} />
				<Pill tone="payload" solid size={36}>
					PAYLOAD
				</Pill>
			</Reveal>
			<Reveal at={4.4} kind="fade" style={{left: 0, width: 1080, top: 615, display: 'flex', justifyContent: 'center'}}>
				<SubValue />
			</Reveal>

			<Reveal at={6.8} kind="pop" style={{left: 0, width: 1080, top: 690, display: 'flex', justifyContent: 'center'}}>
				<Card at={6.8} tone="gold" style={{display: 'flex', alignItems: 'center', gap: 22, padding: '20px 30px'}}>
					<IconTile icon={FaKey} tone="gold" size={84} />
					<div>
						<div style={{fontSize: 42, fontWeight: 800}}>SECRET KEY</div>
						<div style={{fontFamily: MONO, fontSize: 34, fontWeight: 700, color: look.dim, letterSpacing: '0.18em'}}>••••••••••••</div>
					</div>
					<Pill icon={FaLock} tone="danger" size={26}>
						cuma server
					</Pill>
				</Card>
			</Reveal>

			<Reveal at={8.6} kind="pop" style={{left: 0, width: 1080, top: 880, display: 'flex', justifyContent: 'center'}}>
				<Machine />
			</Reveal>
			{SPINS.map((at) => (
				<React.Fragment key={at}>
					<Travel from={[400, 560]} to={[540, 995]} at={at - 0.5} dur={0.5} arc={-40}>
						<div style={{width: 34, height: 34, borderRadius: 17, backgroundColor: TONES.header.fill}} />
					</Travel>
					<Travel from={[690, 560]} to={[540, 995]} at={at - 0.45} dur={0.5} arc={-40}>
						<div style={{width: 34, height: 34, borderRadius: 17, backgroundColor: TONES.payload.fill}} />
					</Travel>
					<Travel from={[330, 760]} to={[540, 995]} at={at - 0.4} dur={0.45} arc={-20}>
						<FaKey size={40} color={TONES.gold.fill} />
					</Travel>
				</React.Fragment>
			))}

			<Reveal at={10.3} kind="rise" style={{left: 90, top: 1220, width: 900}}>
				<Card pressed style={{padding: '22px 30px', display: 'flex', flexDirection: 'column', gap: 10}}>
					<div>
						<Pill tone="signature" solid size={28}>
							SIGNATURE
						</Pill>
					</div>
					<div style={{fontFamily: MONO, fontSize: 32, fontWeight: 700, color: t >= 14 ? look.tone('warning') : look.tone('signature'), wordBreak: 'break-all'}}>
						{t < 14 ? <Scramble text={JWT.signature} at={10.3} dur={0.7} /> : <Scramble text={JWT.signature124} from={JWT.signature} at={14} dur={0.8} />}
					</div>
				</Card>
			</Reveal>
			<Stamp at={14.9} tone="warning" size={64} rotate={6} style={{left: 0, right: 0, top: 1150}}>
				BERUBAH TOTAL!
			</Stamp>
		</>
	);
};

export const Signature: React.FC = () => (
	<SceneShell chapter="Signature" chapterIcon={FaShieldHalved}>
		<Stage />
		<Sfx name="Inputs" src={SFX.pop} at={3.6} volume={0.5} />
		<Sfx name="Secret key" src={SFX.sparkle} at={6.8} volume={0.5} />
		<Sfx name="Machine" src={SFX.pop} at={8.6} volume={0.45} />
		{SPINS.map((at) => (
			<Sfx key={at} name="Hashing" src={SFX.whirr} at={at} volume={0.45} />
		))}
		<Sfx name="Signature out" src={SFX.ding} at={10.3} volume={0.4} />
		<Sfx name="Change one char" src={SFX.click} at={12.8} volume={0.6} />
		<Sfx name="New signature" src={SFX.glitch} at={14} volume={0.4} />
		<Sfx name="Stamp" src={SFX.boom} at={14.9} volume={0.35} />
	</SceneShell>
);
