import React from 'react';
import {FaCalendarCheck, FaFingerprint, FaGear, FaGoogle, FaTicket, FaUserSecret} from 'react-icons/fa6';
import {MONO, SFX} from '../../shared/theme';
import {
	Arrow,
	Bubble,
	Card,
	Headline,
	IconTile,
	Pill,
	Reveal,
	SceneShell,
	Scramble,
	Sfx,
	Stamp,
	useLook,
} from '../../shared/ui';
import {OAUTH, ROLE} from '../parts';

const STEAL_AT = 2.2;
const INTRO_OUT = 4;
const VERIFIER_AT = 5.4;
const HASH_AT = 6.4;
const CHALLENGE_AT = 6.8;
const EXCHANGE_AT = 8.4;
const MATCH_AT = 9.4;
const THIEF_AT = 10.2;
const FAIL_AT = 11;

const Intercept: React.FC = () => {
	const look = useLook();
	return (
		<div style={{position: 'relative', width: 860, height: 300}}>
			<div style={{position: 'absolute', left: 0, top: 0}}>
				<IconTile icon={FaCalendarCheck} tone={ROLE.client} size={110} raisedTile />
			</div>
			<div style={{position: 'absolute', right: 0, top: 0}}>
				<IconTile icon={FaGoogle} tone={ROLE.auth} size={110} raisedTile />
			</div>
			<div
				style={{
					position: 'absolute',
					left: 130,
					right: 130,
					top: 52,
					height: 6,
					backgroundImage: `repeating-linear-gradient(90deg, ${look.dim}66 0 14px, transparent 14px 28px)`,
				}}
			/>
			<Reveal at={0.8} damping={10} style={{left: 0, right: 0, top: 26, display: 'flex', justifyContent: 'center'}}>
				<Pill icon={FaTicket} tone={ROLE.code} solid size={30} mono>
					code
				</Pill>
			</Reveal>
			<Reveal
				at={STEAL_AT}
				kind="drop"
				damping={10}
				style={{left: 0, right: 0, top: 130, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20}}
			>
				<IconTile icon={FaUserSecret} tone="danger" size={100} raisedTile />
				<Bubble tail="left" tone="danger" size={40}>
					dicegat!
				</Bubble>
			</Reveal>
		</div>
	);
};

const Value: React.FC<{readonly at: number; readonly name: string; readonly note: string; readonly value: string}> = ({
	at,
	name,
	note,
	value,
}) => {
	const look = useLook();
	return (
		<Card
			at={at}
			tone={ROLE.code}
			style={{width: 860, padding: '20px 28px', display: 'flex', flexDirection: 'column', gap: 10}}
		>
			<div style={{display: 'flex', alignItems: 'center', gap: 16}}>
				<Pill tone={ROLE.code} solid size={26} mono>
					{name}
				</Pill>
				<span style={{fontSize: 30, fontWeight: 700, color: look.dim}}>{note}</span>
			</div>
			<div style={{fontFamily: MONO, fontSize: 30, fontWeight: 700, color: look.tone(ROLE.code), whiteSpace: 'nowrap'}}>
				<Scramble text={value} from={' '.repeat(value.length)} at={at} dur={0.6} />
			</div>
		</Card>
	);
};

const Exchange: React.FC = () => (
	<Card
		at={EXCHANGE_AT}
		style={{
			width: 860,
			padding: '22px 28px',
			display: 'flex',
			alignItems: 'center',
			gap: 16,
			fontSize: 34,
			fontWeight: 800,
		}}
	>
		Tukar kode:
		<Pill tone={ROLE.code} size={26} mono>
			code + code_verifier
		</Pill>
		<Reveal at={MATCH_AT} damping={9} style={{position: 'relative', marginLeft: 'auto'}}>
			<Pill tone="success" solid size={28}>
				cocok ✓
			</Pill>
		</Reveal>
	</Card>
);

const Stage: React.FC = () => {
	const look = useLook();
	return (
		<>
			<Headline text="Pengaman ekstra: *PKCE*" top={300} size={92} tone={ROLE.code} />
			<Reveal at={-0.1} out={INTRO_OUT} kind="fade" style={{left: 110, top: 560}}>
				<Intercept />
			</Reveal>
			<Reveal
				at={3.2}
				out={INTRO_OUT}
				kind="rise"
				style={{left: 0, width: 1080, top: 900, display: 'flex', justifyContent: 'center'}}
			>
				<Pill tone={ROLE.code} size={30}>
					Proof Key for Code Exchange
				</Pill>
			</Reveal>

			<Reveal at={VERIFIER_AT} kind="rise" style={{left: 110, top: 545}}>
				<Value at={VERIFIER_AT} name="code_verifier" note="rahasia acak, disimpan" value={OAUTH.verifier} />
			</Reveal>
			<Arrow x1={540} y1={688} x2={540} y2={760} at={HASH_AT} dur={0.35} tone={ROLE.code} />
			<Reveal at={HASH_AT} damping={10} style={{left: 580, top: 696}}>
				<Pill icon={FaGear} tone={ROLE.code} size={26} mono>
					SHA-256
				</Pill>
			</Reveal>
			<Reveal at={CHALLENGE_AT} kind="rise" style={{left: 110, top: 770}}>
				<Value at={CHALLENGE_AT} name="code_challenge" note="dikirim di awal" value={OAUTH.challenge} />
			</Reveal>

			<Reveal at={EXCHANGE_AT} kind="left" style={{left: 110, top: 935}}>
				<Exchange />
			</Reveal>

			<Reveal at={THIEF_AT} kind="left" style={{left: 110, top: 1060}}>
				<Card
					at={THIEF_AT}
					tone="danger"
					style={{width: 860, padding: '20px 28px', display: 'flex', alignItems: 'center', gap: 20}}
				>
					<IconTile icon={FaUserSecret} tone="danger" size={76} />
					<span style={{flex: 1, fontSize: 36, fontWeight: 800}}>Pencuri: cuma code</span>
					<Pill tone="danger" solid size={26} mono>
						invalid_grant
					</Pill>
				</Card>
			</Reveal>
			<Stamp at={FAIL_AT} size={84} rotate={-7} style={{left: 0, right: 0, top: 1215}}>
				GAGAL!
			</Stamp>
			<Reveal
				at={VERIFIER_AT}
				kind="fade"
				style={{
					left: 0,
					width: 1080,
					top: 1395,
					display: 'flex',
					justifyContent: 'center',
					fontSize: 26,
					fontWeight: 700,
					color: look.dim,
				}}
			>
				Contoh nilai: RFC 7636, Lampiran B
			</Reveal>
		</>
	);
};

export const Pkce: React.FC = () => (
	<SceneShell chapter="Detail penting" chapterIcon={FaFingerprint} shakeAt={FAIL_AT}>
		<Stage />
		<Sfx name="Code" src={SFX.pop} at={0.8} volume={0.45} />
		<Sfx name="Stolen" src={SFX.glitch} at={STEAL_AT} volume={0.4} />
		<Sfx name="PKCE" src={SFX.ding} at={3.2} volume={0.35} />
		<Sfx name="Verifier" src={SFX.typing} at={VERIFIER_AT} volume={0.35} />
		<Sfx name="Hash" src={SFX.whirr} at={HASH_AT} volume={0.4} />
		<Sfx name="Challenge" src={SFX.pop} at={CHALLENGE_AT} volume={0.45} />
		<Sfx name="Exchange" src={SFX.click} at={EXCHANGE_AT} volume={0.5} />
		<Sfx name="Match" src={SFX.ding} at={MATCH_AT} volume={0.4} />
		<Sfx name="Thief" src={SFX.denied} at={THIEF_AT} volume={0.3} />
		<Sfx name="Fail stamp" src={SFX.boom} at={FAIL_AT} volume={0.45} />
	</SceneShell>
);
