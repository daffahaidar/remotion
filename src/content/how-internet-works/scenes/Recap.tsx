import React from 'react';
import type {IconType} from 'react-icons';
import {FaBookmark, FaBoxesStacked, FaEquals, FaLocationDot, FaLock, FaMagnifyingGlass, FaPlus, FaRotate, FaWifi} from 'react-icons/fa6';
import {SFX, type Tone} from '../../shared/theme';
import {Card, EqSymbol, Headline, Reveal, SceneShell, Sfx, Term, TipCard} from '../../shared/ui';
import {StageStrip, STAGE} from '../parts';

/** "Alamat", "paket data", "internet" as spoken in "Alamat plus paket data: itulah internet." */
const EQ = [0.2, 0.8, 2.1] as const;
const EQ_OUT = 5.4;
const STRIP_AT = 3.6;
const TIPS: readonly {at: number; icon: IconType; tone: Tone; label: string}[] = [
	{at: 6.4, icon: FaLock, tone: STAGE.tls, label: 'Pakai HTTPS'},
	{at: 7.8, icon: FaMagnifyingGlass, tone: STAGE.dns, label: 'Cek alamat situs'},
	// No hyphen in "WiFi": the card would break the line at "Wi-".
	{at: 9.2, icon: FaWifi, tone: 'danger', label: 'Waspada WiFi publik'},
	{at: 10.6, icon: FaRotate, tone: STAGE.http, label: 'Update browser'},
];

const Equation: React.FC = () => (
	<>
		<Reveal at={EQ[0]} out={EQ_OUT} kind="left" style={{left: 130, top: 470}}>
			<Term at={EQ[0]} icon={FaLocationDot} tone={STAGE.dns} label="Alamat (IP)" />
		</Reveal>
		<EqSymbol at={0.6} out={EQ_OUT} icon={FaPlus} top={625} />
		<Reveal at={EQ[1]} out={EQ_OUT} kind="right" style={{left: 130, top: 700}}>
			<Term at={EQ[1]} icon={FaBoxesStacked} tone={STAGE.tcp} label="Paket data" />
		</Reveal>
		<EqSymbol at={1.5} out={EQ_OUT} icon={FaEquals} top={855} />
		<Reveal at={EQ[2]} out={EQ_OUT} damping={10} style={{left: 0, width: 1080, top: 925, display: 'flex', justifyContent: 'center'}}>
			<Card at={EQ[2]} radius={44} style={{padding: '8px 64px'}}>
				<span
					style={{
						fontSize: 170,
						fontWeight: 800,
						letterSpacing: '-0.04em',
						backgroundImage: 'linear-gradient(90deg, #0284c7, #16a34a 38%, #ca8a04 66%, #7c3aed)',
						WebkitBackgroundClip: 'text',
						backgroundClip: 'text',
						color: 'transparent',
					}}
				>
					Internet
				</span>
			</Card>
		</Reveal>
		<Reveal at={STRIP_AT} out={EQ_OUT} kind="rise" style={{left: 0, width: 1080, top: 1190, display: 'flex', justifyContent: 'center'}}>
			<StageStrip size={36} />
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

		{EQ.map((at) => (
			<Sfx key={at} name="Equation" src={SFX.pop} at={at} volume={0.5} />
		))}
		<Sfx name="Four stages" src={SFX.ding} at={STRIP_AT} volume={0.4} />
		<Sfx name="Tips" src={SFX.whoosh} at={5.8} volume={0.3} />
		{TIPS.map((tip) => (
			<Sfx key={tip.label} name="Tip" src={SFX.pop} at={tip.at} volume={0.5} />
		))}
	</SceneShell>
);
