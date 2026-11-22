import React from 'react';
import type {IconType} from 'react-icons';
import {FaBookmark, FaCircleCheck, FaEquals, FaEyeSlash, FaHourglassHalf, FaIdCard, FaKey, FaLock, FaPlus, FaShieldHalved} from 'react-icons/fa6';
import {SFX, type Tone} from '../theme';
import {Card, EqSymbol, Headline, Pill, Reveal, SceneShell, Sfx, Term, TipCard} from '../ui';

const TIPS: readonly {at: number; icon: IconType; tone: Tone; label: string}[] = [
	{at: 7, icon: FaLock, tone: 'primary', label: 'Selalu pakai HTTPS'},
	{at: 8, icon: FaEyeSlash, tone: 'warning', label: 'Jangan simpan data sensitif'},
	{at: 9.1, icon: FaKey, tone: 'gold', label: 'Jaga secret key'},
	{at: 10.2, icon: FaHourglassHalf, tone: 'header', label: 'Masa berlaku pendek'},
];

const Equation: React.FC = () => (
	<>
		<Reveal at={0.8} out={6.3} kind="left" style={{left: 130, top: 470}}>
			<Term at={0.8} icon={FaIdCard} tone="payload" label="Data kamu" />
		</Reveal>
		<EqSymbol at={1.4} out={6.3} icon={FaPlus} top={625} />
		<Reveal at={1.7} out={6.3} kind="right" style={{left: 130, top: 700}}>
			<Term at={1.7} icon={FaShieldHalved} tone="signature" label="Tanda tangan" />
		</Reveal>
		<EqSymbol at={2.3} out={6.3} icon={FaEquals} top={855} />
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

export const Recap: React.FC = () => (
	<SceneShell chapter="Rangkuman" chapterIcon={FaBookmark}>
		<Headline text="Kesimpulannya:" top={300} size={88} out={6.3} />
		<Equation />

		<Headline text="4 aturan *aman*" top={300} size={96} at={6.5} tone="success" />
		{TIPS.map((tip, i) => (
			<Reveal key={tip.label} at={tip.at} damping={12} style={{left: i % 2 ? 560 : 110, top: i < 2 ? 500 : 890}}>
				<TipCard {...tip} index={i} />
			</Reveal>
		))}

		{[0.8, 1.7, 2.6].map((at) => (
			<Sfx key={at} name="Equation" src={SFX.pop} at={at} volume={0.5} />
		))}
		<Sfx name="Server checks" src={SFX.ding} at={3.8} volume={0.4} />
		<Sfx name="Tips" src={SFX.whoosh} at={6.5} volume={0.3} />
		{TIPS.map((tip) => (
			<Sfx key={tip.label} name="Tip" src={SFX.pop} at={tip.at} volume={0.5} />
		))}
	</SceneShell>
);
