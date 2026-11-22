import React from 'react';
import type {IconType} from 'react-icons';
import {
	FaBan,
	FaBookmark,
	FaCode,
	FaEquals,
	FaHandshake,
	FaLock,
	FaPlus,
	FaShieldHalved,
	FaSliders,
	FaTicket,
} from 'react-icons/fa6';
import {SFX, type Tone} from '../../shared/theme';
import {Card, EqSymbol, Headline, Pill, Reveal, SceneShell, Sfx, Term, TipCard} from '../../shared/ui';
import {ROLE} from '../parts';

const EQ_OUT = 5.4;
const SAFE_AT = 4;
const TIPS: readonly {at: number; icon: IconType; tone: Tone; label: string}[] = [
	{at: 6.6, icon: FaShieldHalved, tone: ROLE.auth, label: 'Login cuma di halaman resmi'},
	{at: 8.2, icon: FaSliders, tone: ROLE.scope, label: 'Kasih izin seperlunya'},
	{at: 9.6, icon: FaBan, tone: ROLE.client, label: 'Cabut akses lama'},
	{at: 10.8, icon: FaCode, tone: ROLE.code, label: 'Developer: pakai PKCE'},
];

const Equation: React.FC = () => (
	<>
		<Reveal at={1.2} out={EQ_OUT} kind="left" style={{left: 130, top: 470}}>
			<Term at={1.2} icon={FaHandshake} tone={ROLE.owner} label="Izin kamu" />
		</Reveal>
		<EqSymbol at={1.8} out={EQ_OUT} icon={FaPlus} top={625} />
		<Reveal at={2.2} out={EQ_OUT} kind="right" style={{left: 130, top: 700}}>
			<Term at={2.2} icon={FaTicket} tone={ROLE.token} label="Token terbatas" />
		</Reveal>
		<EqSymbol at={2.8} out={EQ_OUT} icon={FaEquals} top={855} />
		<Reveal
			at={3}
			out={EQ_OUT}
			damping={10}
			style={{left: 0, width: 1080, top: 925, display: 'flex', justifyContent: 'center'}}
		>
			<Card at={3} radius={44} style={{padding: '8px 70px'}}>
				<span
					style={{
						fontSize: 170,
						fontWeight: 800,
						letterSpacing: '-0.04em',
						backgroundImage: 'linear-gradient(90deg, #7c3aed, #2563eb 50%, #ca8a04)',
						WebkitBackgroundClip: 'text',
						backgroundClip: 'text',
						color: 'transparent',
					}}
				>
					OAuth
				</span>
			</Card>
		</Reveal>
		<Reveal
			at={SAFE_AT}
			out={EQ_OUT}
			kind="rise"
			style={{left: 0, width: 1080, top: 1185, display: 'flex', justifyContent: 'center'}}
		>
			<Pill icon={FaLock} tone="success" size={36}>
				Password tetap di tangan kamu
			</Pill>
		</Reveal>
	</>
);

export const Recap: React.FC = () => (
	<SceneShell chapter="Rangkuman" chapterIcon={FaBookmark}>
		<Headline text="Kesimpulannya:" top={300} size={88} out={EQ_OUT} />
		<Equation />

		<Headline text="4 tips *aman*" top={300} size={96} at={5.8} tone="success" />
		{TIPS.map((tip, i) => (
			<Reveal key={tip.label} at={tip.at} damping={12} style={{left: i % 2 ? 550 : 120, top: i < 2 ? 490 : 880}}>
				<TipCard {...tip} index={i} />
			</Reveal>
		))}

		{[1.2, 2.2, 3].map((at) => (
			<Sfx key={at} name="Equation" src={SFX.pop} at={at} volume={0.5} />
		))}
		<Sfx name="Password safe" src={SFX.ding} at={SAFE_AT} volume={0.4} />
		<Sfx name="Tips" src={SFX.whoosh} at={5.8} volume={0.3} />
		{TIPS.map((tip) => (
			<Sfx key={tip.label} name="Tip" src={SFX.pop} at={tip.at} volume={0.5} />
		))}
	</SceneShell>
);
