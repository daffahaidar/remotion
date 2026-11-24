import React from 'react';
import type {IconType} from 'react-icons';
import {FaAddressBook, FaComments, FaPhone, FaPhoneVolume, FaUser, FaUserSecret} from 'react-icons/fa6';
import {MONO, SFX, type Tone} from '../../shared/theme';
import {Bubble, Card, Headline, IconTile, Pill, Reveal, SceneShell, Scramble, Sfx, useLook, useSec} from '../../shared/ui';
import {STAGE} from '../parts';

const RING = [0.8, 2.8] as const;

/** One beat of the phone call, mapped to the internet stage it stands for. */
const Beat: React.FC<{
	readonly at: number;
	readonly labelAt: number;
	readonly icon: IconType;
	readonly tone: Tone;
	readonly title: string;
	readonly label: string;
	readonly children: React.ReactNode;
}> = ({at, labelAt, icon, tone, title, label, children}) => (
	<Card at={at} tone={tone} style={{width: 400, height: 330, padding: '24px 26px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
		<div style={{display: 'flex', alignItems: 'center', gap: 16}}>
			<IconTile icon={icon} tone={tone} size={72} />
			<span style={{fontSize: 38, fontWeight: 800}}>{title}</span>
		</div>
		{children}
		<div style={{height: 54}}>
			<Reveal at={labelAt} damping={10} style={{position: 'relative'}}>
				<Pill tone={tone} size={30}>
					{label}
				</Pill>
			</Reveal>
		</div>
	</Card>
);

const Calling: React.FC = () => {
	const look = useLook();
	const t = useSec();
	const ringing = t > RING[0] && t < RING[1];
	return (
		<Card at={0.6} radius={999} style={{display: 'flex', alignItems: 'center', gap: 22, padding: '18px 40px 18px 18px', fontSize: 44, fontWeight: 800}}>
			<IconTile icon={FaPhoneVolume} tone="primary" size={84} />
			<span style={{rotate: `${ringing ? Math.sin(t * 40) * 2 : 0}deg`}}>Memanggil Ibu...</span>
			<span style={{fontSize: 34, color: look.dim}}>(kontak)</span>
		</Card>
	);
};

/** Masked number: we never show a real-looking phone number. */
const ContactNumber: React.FC = () => {
	const look = useLook();
	return <div style={{fontFamily: MONO, fontSize: 30, fontWeight: 700, color: look.tone(STAGE.dns)}}>0812-xxxx-xxxx</div>;
};

/** Gibberish that never resolves: what an eavesdropper hears. */
const Cipher: React.FC = () => {
	const look = useLook();
	return (
		<div style={{fontFamily: MONO, fontSize: 40, fontWeight: 800, color: look.tone(STAGE.tls), letterSpacing: '0.06em'}}>
			<Scramble text="sandi-rahasia" from="" at={9.2} dur={1000} />
		</div>
	);
};

export const PhoneCall: React.FC = () => {
	const contact = (
		<div style={{display: 'flex', alignItems: 'center', gap: 16}}>
			<IconTile icon={FaUser} tone={STAGE.dns} size={60} />
			<div>
				<div style={{fontSize: 34, fontWeight: 800}}>Ibu</div>
				<ContactNumber />
			</div>
		</div>
	);
	return (
		<SceneShell chapter="Analogi" chapterIcon={FaPhone}>
			<Headline text="Bayangkan kamu *nelepon*" top={300} size={96} />
			<Reveal at={0.6} out={2.9} damping={11} style={{left: 0, width: 1080, top: 640, display: 'flex', justifyContent: 'center'}}>
				<Calling />
			</Reveal>

			<Reveal at={3} kind="left" style={{left: 110, top: 540}}>
				<Beat at={3} labelAt={5.2} icon={FaAddressBook} tone={STAGE.dns} title="Cari kontak" label="Kontak = DNS">
					{contact}
				</Beat>
			</Reveal>
			<Reveal at={6} kind="right" style={{left: 550, top: 540}}>
				<Beat at={6} labelAt={8.4} icon={FaPhone} tone={STAGE.tcp} title="Tersambung" label="Halo-halo = TCP">
					<div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
						<Reveal at={6.4} damping={10} style={{position: 'relative', alignSelf: 'flex-start'}}>
							<Bubble tail="left" size={28}>
								Halo?
							</Bubble>
						</Reveal>
						<Reveal at={7.4} damping={10} style={{position: 'relative', alignSelf: 'flex-end'}}>
							<Bubble tail="right" tone={STAGE.tcp} size={28}>
								Halo, kedengaran!
							</Bubble>
						</Reveal>
					</div>
				</Beat>
			</Reveal>
			<Reveal at={9} kind="left" style={{left: 110, top: 900}}>
				<Beat at={9} labelAt={11} icon={FaUserSecret} tone={STAGE.tls} title="Bahasa sandi" label="Sandi = TLS">
					<Cipher />
				</Beat>
			</Reveal>
			<Reveal at={12} kind="right" style={{left: 550, top: 900}}>
				<Beat at={12} labelAt={13} icon={FaComments} tone={STAGE.http} title="Ngobrol" label="Obrolan = HTTP">
					<Reveal at={12.3} damping={10} style={{position: 'relative', alignSelf: 'flex-start'}}>
						<Bubble tail="left" tone={STAGE.http} size={28}>
							Minta halaman, dong!
						</Bubble>
					</Reveal>
				</Beat>
			</Reveal>

			<Sfx name="Ring" src={SFX.beep} at={RING[0]} volume={0.35} />
			<Sfx name="Ring 2" src={SFX.beep} at={1.8} volume={0.35} />
			{[3, 6, 9, 12].map((at) => (
				<Sfx key={at} name="Beat card" src={SFX.pop} at={at} volume={0.5} />
			))}
			<Sfx name="Halo" src={SFX.pop} at={6.4} volume={0.35} />
			<Sfx name="Connected" src={SFX.ding} at={7.4} volume={0.4} />
			<Sfx name="Secret code" src={SFX.glitch} at={9.4} volume={0.3} />
			{[5.2, 8.4, 11, 13].map((at) => (
				<Sfx key={at} name="Label" src={SFX.whoosh} at={at} volume={0.25} />
			))}
		</SceneShell>
	);
};
