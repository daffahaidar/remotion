import React from 'react';
import type {IconType} from 'react-icons';
import {FaCheck, FaGift, FaLock, FaMagnifyingGlass, FaTriangleExclamation, FaXmark} from 'react-icons/fa6';
import {interpolate} from 'remotion';
import {SFX, TONES} from '../../shared/theme';
import {Card, Headline, IconTile, Pill, Reveal, SceneShell, Sfx, Stamp, useLook, useRamp, useSec, Window} from '../../shared/ui';
import {SourceNote, STAGE} from '../parts';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const SITE_AT = 1.8;
const ENC_AT = 2.6;
const REAL_AT = 4;
const SCAM_AT = 6;
const DONT_AT = 9;
const CHECK_AT = 10.4;

/** A made-up look-alike domain on the reserved .example TLD (RFC 2606), so it can never be a real site. */
const FakeUrl: React.FC = () => {
	const look = useLook();
	const mark = useRamp(CHECK_AT + 0.5, 0.3);
	return (
		<span>
			g
			<span style={{color: mark > 0.5 ? look.tone('danger') : undefined, backgroundColor: `rgba(220, 38, 38, ${0.22 * mark})`, borderRadius: 6}}>ooo</span>
			gle-hadiah.example
		</span>
	);
};

const ScamSite: React.FC = () => (
	<Window at={SITE_AT} width={860} url={<FakeUrl />}>
		<div style={{padding: '24px 34px 28px', display: 'flex', flexDirection: 'column', gap: 18}}>
			<div style={{display: 'flex', alignItems: 'center', gap: 18, fontSize: 40, fontWeight: 800}}>
				<IconTile icon={FaGift} tone="danger" size={72} />
				Selamat! Kamu menang hadiah
			</div>
			<div
				style={{
					height: 70,
					borderRadius: 18,
					backgroundColor: TONES.danger.fill,
					color: '#ffffff',
					fontSize: 34,
					fontWeight: 800,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				Login untuk klaim
			</div>
		</div>
	</Window>
);

const Rule: React.FC<{readonly at: number; readonly ok: boolean; readonly label: string; readonly icon: IconType; readonly children: React.ReactNode}> = ({
	at,
	ok,
	label,
	icon: Icon,
	children,
}) => {
	const look = useLook();
	const tone = ok ? 'success' : 'danger';
	return (
		<Card at={at} tone={tone} style={{width: 840, padding: '18px 26px', display: 'flex', alignItems: 'center', gap: 22}}>
			<Pill tone={tone} solid size={32}>
				{label}
			</Pill>
			<span style={{flex: 1, fontSize: 40, fontWeight: 800}}>{children}</span>
			<Icon size={46} color={look.tone(tone)} />
		</Card>
	);
};

const Flash: React.FC = () => (
	<div
		style={{
			position: 'absolute',
			inset: 0,
			backgroundColor: TONES.danger.fill,
			opacity: interpolate(useSec(), [SCAM_AT, SCAM_AT + 0.06, SCAM_AT + 0.6], [0, 0.22, 0], clamp),
		}}
	/>
);

export const LockTwist: React.FC = () => (
	<SceneShell chapter="Awas!" chapterIcon={FaTriangleExclamation} shakeAt={SCAM_AT}>
		<Reveal at={-0.25} out={1.3} damping={8} style={{left: 0, width: 1080, top: 640, display: 'flex', justifyContent: 'center'}}>
			<div style={{fontSize: 230, fontWeight: 800, letterSpacing: '-0.03em', color: TONES.warning.fill, rotate: '-4deg'}}>TAPI...</div>
		</Reveal>

		<Headline text="Gembok *belum tentu asli*" top={300} at={1.4} size={92} tone="warning" />
		<Reveal at={SITE_AT} kind="rise" style={{left: 110, top: 560}}>
			<ScamSite />
		</Reveal>
		<Reveal at={ENC_AT} kind="left" style={{left: 110, top: 890}}>
			<Pill icon={FaLock} tone={STAGE.tls} size={34}>
				terenkripsi <FaCheck size={30} />
			</Pill>
		</Reveal>
		<Reveal at={REAL_AT} kind="right" style={{left: 530, top: 890}}>
			<Pill icon={FaXmark} tone="danger" size={34}>
				asli? belum tentu
			</Pill>
		</Reveal>

		<Flash />
		{/* Leaves before the rules so the page and the marked domain are readable again. */}
		<Stamp at={SCAM_AT} out={DONT_AT - 0.1} size={88} rotate={-8} style={{left: 0, right: 0, top: 690}}>
			SITUS PENIPU!
		</Stamp>

		<Reveal at={DONT_AT} kind="left" style={{left: 110, top: 1010}}>
			<Rule at={DONT_AT} ok={false} label="JANGAN" icon={FaXmark}>
				cuma lihat gembok
			</Rule>
		</Reveal>
		<Reveal at={CHECK_AT} kind="left" style={{left: 110, top: 1140}}>
			<Rule at={CHECK_AT} ok label="CEK" icon={FaMagnifyingGlass}>
				alamat situsnya
			</Rule>
		</Reveal>
		<SourceNote at={SCAM_AT}>Sumber: Chromium Blog, &quot;An Update on the Lock Icon&quot; (Mei 2023)</SourceNote>

		<Sfx name="Record scratch" src={SFX.scratch} at={0} volume={0.55} />
		<Sfx name="Scam site" src={SFX.pop} at={SITE_AT} volume={0.45} />
		<Sfx name="Encrypted" src={SFX.ding} at={ENC_AT} volume={0.35} />
		<Sfx name="Real?" src={SFX.denied} at={REAL_AT} volume={0.25} />
		<Sfx name="Scam stamp" src={SFX.boom} at={SCAM_AT} volume={0.45} />
		<Sfx name="Dont" src={SFX.whoosh} at={DONT_AT} volume={0.3} />
		<Sfx name="Dont mark" src={SFX.denied} at={DONT_AT + 0.4} volume={0.25} />
		<Sfx name="Check" src={SFX.pop} at={CHECK_AT} volume={0.5} />
		<Sfx name="Mark domain" src={SFX.click} at={CHECK_AT + 0.5} volume={0.45} />
	</SceneShell>
);
