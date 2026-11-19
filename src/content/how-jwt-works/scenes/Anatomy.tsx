import React from 'react';
import {FaFingerprint, FaUserSecret} from 'react-icons/fa6';
import {JWT, MONO, SFX, type Tone} from '../theme';
import {Card, Headline, Pill, Reveal, SceneShell, Sfx, TokenText, useLook} from '../ui';

const PART_AT = [8.5, 11.5, 16.5] as const;

const PartCard: React.FC<{
	readonly at: number;
	readonly tone: Tone;
	readonly name: string;
	readonly desc: string;
	readonly lines: readonly string[];
}> = ({at, tone, name, desc, lines}) => {
	const look = useLook();
	return (
		<Card at={at} tone={tone} style={{width: 900, padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 12}}>
			<div style={{display: 'flex', alignItems: 'center', gap: 20}}>
				<Pill tone={tone} solid size={32}>
					{name}
				</Pill>
				<span style={{fontSize: 36, fontWeight: 700, color: look.dim}}>{desc}</span>
			</div>
			<div style={{fontFamily: MONO, fontSize: 34, fontWeight: 700, lineHeight: 1.35, color: look.tone(tone), wordBreak: 'break-all'}}>
				{lines.map((l) => (
					<div key={l}>{l}</div>
				))}
			</div>
		</Card>
	);
};

export const Anatomy: React.FC = () => (
	<SceneShell chapter="Anatomi JWT" chapterIcon={FaFingerprint}>
		<Headline text="Di web, gelang itu = *JWT*" top={300} size={90} tone="payload" />

		<Reveal at={1.5} kind="rise" style={{left: 90, top: 540, width: 900}}>
			<Card pressed style={{padding: '26px 30px'}}>
				<TokenText parts={[JWT.header, JWT.payload, JWT.signature]} colorAt={PART_AT} typeAt={1.6} cps={75} dotAt={5.4} size={34} />
			</Card>
		</Reveal>

		<Reveal at={4.6} out={8.2} kind="rise" style={{left: 0, width: 1080, top: 885, display: 'flex', justifyContent: 'center'}}>
			<Pill tone="gold" size={40}>
				3 bagian · dipisah titik ( . )
			</Pill>
		</Reveal>

		<Reveal at={PART_AT[0]} kind="left" style={{left: 90, top: 830}}>
			<PartCard at={PART_AT[0]} tone="header" name="HEADER" desc="jenis algoritma" lines={['{"alg":"HS256","typ":"JWT"}']} />
		</Reveal>
		<Reveal at={PART_AT[1]} kind="left" style={{left: 90, top: 1015}}>
			<PartCard at={PART_AT[1]} tone="payload" name="PAYLOAD" desc="data kamu (claims)" lines={['{"sub":"123","name":"Budi",', ' "role":"user","exp":1798761600}']} />
		</Reveal>
		<Reveal at={PART_AT[2]} kind="left" style={{left: 90, top: 1245}}>
			<PartCard at={PART_AT[2]} tone="signature" name="SIGNATURE" desc="tanda tangan digital" lines={[JWT.signature]} />
		</Reveal>
		<Reveal at={19.5} damping={9} style={{right: 60, top: 1385, rotate: '-3deg'}}>
			<Pill icon={FaUserSecret} tone="danger" solid size={30}>
				Ini kenapa hacker gagal!
			</Pill>
		</Reveal>

		<Sfx name="Token typing" src={SFX.typing} at={1.6} volume={0.4} />
		<Sfx name="Three parts" src={SFX.pop} at={4.6} volume={0.45} />
		<Sfx name="Dots" src={SFX.sparkle} at={5.4} volume={0.45} />
		{PART_AT.map((at) => (
			<Sfx key={at} name="Part card" src={SFX.pop} at={at} volume={0.55} />
		))}
		<Sfx name="Hacker hint" src={SFX.glitch} at={19.5} volume={0.35} />
	</SceneShell>
);
