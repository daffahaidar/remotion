import React from 'react';
import type {IconType} from 'react-icons';
import {FaBookmark, FaCircleCheck, FaEquals, FaEyeSlash, FaHourglassHalf, FaIdCard, FaKey, FaLock, FaPlus, FaShieldHalved, FaUserPlus} from 'react-icons/fa6';
import {ManCharacter} from '../../../assets/character';
import {MONO, SFX, type Tone} from '../theme';
import {Actor, Card, Headline, IconTile, Pill, Reveal, SceneShell, Sfx, useLook} from '../ui';

const TIPS: readonly {at: number; icon: IconType; tone: Tone; label: string}[] = [
	{at: 7, icon: FaLock, tone: 'primary', label: 'Selalu pakai HTTPS'},
	{at: 8, icon: FaEyeSlash, tone: 'warning', label: 'Jangan simpan data sensitif'},
	{at: 9.1, icon: FaKey, tone: 'gold', label: 'Jaga secret key'},
	{at: 10.2, icon: FaHourglassHalf, tone: 'header', label: 'Masa berlaku pendek'},
];

const Term: React.FC<{readonly at: number; readonly icon: IconType; readonly tone: Tone; readonly label: string}> = ({at, icon, tone, label}) => (
	<Card at={at} tone={tone} style={{width: 820, padding: '22px 30px', display: 'flex', alignItems: 'center', gap: 24}}>
		<IconTile icon={icon} tone={tone} size={84} />
		<span style={{fontSize: 52, fontWeight: 800}}>{label}</span>
	</Card>
);

const Symbol: React.FC<{readonly at: number; readonly icon: IconType; readonly top: number}> = ({at, icon: Icon, top}) => {
	const look = useLook();
	return (
		<Reveal at={at} out={6.3} damping={10} style={{left: 0, width: 1080, top, display: 'flex', justifyContent: 'center'}}>
			<Icon size={48} color={look.dim} />
		</Reveal>
	);
};

const Equation: React.FC = () => (
	<>
		<Reveal at={0.8} out={6.3} kind="left" style={{left: 130, top: 470}}>
			<Term at={0.8} icon={FaIdCard} tone="payload" label="Data kamu" />
		</Reveal>
		<Symbol at={1.4} icon={FaPlus} top={625} />
		<Reveal at={1.7} out={6.3} kind="right" style={{left: 130, top: 700}}>
			<Term at={1.7} icon={FaShieldHalved} tone="signature" label="Tanda tangan" />
		</Reveal>
		<Symbol at={2.3} icon={FaEquals} top={855} />
		<Reveal at={2.6} out={6.3} damping={10} style={{left: 0, width: 1080, top: 925, display: 'flex', justifyContent: 'center'}}>
			<Card at={2.6} radius={44} style={{padding: '8px 80px'}}>
				<span
					style={{
						fontSize: 170,
						fontWeight: 800,
						letterSpacing: '-0.04em',
						backgroundImage: 'linear-gradient(90deg, #e11d48, #7c3aed 50%, #0284c7)',
						WebkitBackgroundClip: 'text',
						backgroundClip: 'text',
						color: 'transparent',
					}}
				>
					JWT
				</span>
			</Card>
		</Reveal>
		<Reveal at={3.8} out={6.3} kind="rise" style={{left: 0, width: 1080, top: 1185, display: 'flex', justifyContent: 'center'}}>
			<Pill icon={FaCircleCheck} tone="success" size={36}>
				Server cukup cek tanda tangannya
			</Pill>
		</Reveal>
	</>
);

const NextUp: React.FC = () => {
	const look = useLook();
	return (
		<Card at={12.6} style={{padding: '28px 36px', display: 'flex', flexDirection: 'column', gap: 6}}>
			<span style={{fontSize: 28, fontWeight: 800, letterSpacing: '0.16em', color: look.dim}}>VIDEO BERIKUTNYA</span>
			<span style={{fontSize: 76, fontWeight: 800, color: look.tone('primary')}}>OAuth 2.0</span>
			<span style={{fontSize: 34, fontWeight: 700, color: look.dim}}>&quot;Login pakai Google&quot; itu kerjanya gimana?</span>
		</Card>
	);
};

const Tip: React.FC<{readonly tip: (typeof TIPS)[number]; readonly index: number}> = ({tip, index}) => (
	<Card at={tip.at} tone={tip.tone} style={{width: 410, height: 350, padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
		<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
			<IconTile icon={tip.icon} tone={tip.tone} size={96} />
			<span style={{fontFamily: MONO, fontSize: 40, fontWeight: 800, opacity: 0.35}}>0{index + 1}</span>
		</div>
		<span style={{fontSize: 48, fontWeight: 800, lineHeight: 1.15}}>{tip.label}</span>
	</Card>
);

export const Recap: React.FC = () => (
	<SceneShell chapter="Rangkuman" chapterIcon={FaBookmark}>
		<Headline text="Kesimpulannya:" top={300} size={88} out={6.3} />
		<Equation />

		<Headline text="4 aturan *aman*" top={300} size={96} at={6.5} out={12} tone="success" />
		{TIPS.map((tip, i) => (
			<Reveal key={tip.label} at={tip.at} out={12} damping={12} style={{left: i % 2 ? 560 : 110, top: i < 2 ? 500 : 890}}>
				<Tip tip={tip} index={i} />
			</Reveal>
		))}

		<Headline text="Simpan & *follow*" top={300} size={104} at={12.1} />
		<Reveal at={12.6} kind="rise" style={{left: 90, top: 510, width: 900}}>
			<NextUp />
		</Reveal>
		<Reveal at={12.3} kind="fade" style={{left: 0, top: 0, width: 1080, height: 1920}}>
			<Actor x={540} floor={1470}>
				<ManCharacter pose="wave" expression="happy" style={{scale: 0.68}} />
			</Actor>
		</Reveal>
		<Reveal at={13.4} damping={9} style={{left: 70, top: 1000, rotate: '-5deg'}}>
			<Pill icon={FaBookmark} tone="gold" solid size={38}>
				Simpan
			</Pill>
		</Reveal>
		<Reveal at={14.6} damping={9} style={{left: 700, top: 1060, rotate: '5deg'}}>
			<Pill icon={FaUserPlus} tone="header" solid size={38}>
				Follow
			</Pill>
		</Reveal>

		{[0.8, 1.7, 2.6].map((at) => (
			<Sfx key={at} name="Equation" src={SFX.pop} at={at} volume={0.5} />
		))}
		<Sfx name="Server checks" src={SFX.ding} at={3.8} volume={0.4} />
		<Sfx name="Tips" src={SFX.whoosh} at={6.5} volume={0.3} />
		{TIPS.map((tip) => (
			<Sfx key={tip.label} name="Tip" src={SFX.pop} at={tip.at} volume={0.5} />
		))}
		<Sfx name="CTA" src={SFX.whoosh} at={12.1} volume={0.3} />
		<Sfx name="Save" src={SFX.sparkle} at={13.4} volume={0.5} />
		<Sfx name="Follow" src={SFX.ding} at={14.6} volume={0.5} />
	</SceneShell>
);
