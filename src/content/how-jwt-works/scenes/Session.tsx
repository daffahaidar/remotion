import React from 'react';
import {FaBook, FaCookieBite, FaEnvelope} from 'react-icons/fa6';
import {Easing} from 'remotion';
import {ManCharacter} from '../../../assets/character';
import {ServerRack} from '../../../assets/property';
import {MONO, SFX} from '../theme';
import {Actor, Arrow, Bubble, Card, Headline, IconTile, Pill, Place, Reveal, SceneShell, Sfx, Stamp, Travel, TypeText, useLook, useRamp, useSec} from '../ui';

const ROWS = [
	{at: 8.2, id: 'sess_91bc', name: 'Sari'},
	{at: 8.4, id: 'sess_77de', name: 'Andi'},
	{at: 8.6, id: 'sess_c4a0', name: 'Rina'},
];
const SERVERS = [
	{at: 9.4, x: 400, label: 'A'},
	{at: 9.55, x: 580, label: 'B'},
	{at: 9.7, x: 760, label: 'C'},
];

const Row: React.FC<{readonly id: string; readonly name: string}> = ({id, name}) => {
	const look = useLook();
	return (
		<div style={{fontFamily: MONO, fontSize: 36, fontWeight: 700}}>
			<span style={{color: look.tone('warning')}}>{id}</span>
			<span style={{color: look.dim}}> → </span>
			{name}
		</div>
	);
};

const SessionTable: React.FC = () => {
	const look = useLook();
	const count = useRamp(8.6, 1.4, Easing.in(Easing.cubic));
	return (
		<Card at={1.4} style={{width: 860, padding: '28px 36px', display: 'flex', flexDirection: 'column', gap: 14}}>
			<div style={{display: 'flex', alignItems: 'center', gap: 18, fontSize: 38, fontWeight: 800, marginBottom: 6}}>
				<IconTile icon={FaBook} tone="warning" size={66} />
				Catatan sesi (di server)
			</div>
			<div style={{fontFamily: MONO, fontSize: 36, fontWeight: 700, height: 50}}>
				<TypeText text="sess_8f3a → Budi" at={2.6} cps={16} style={{color: look.text}} />
			</div>
			{ROWS.map((r) => (
				<Reveal key={r.id} at={r.at} kind="left" style={{position: 'relative'}}>
					<Row id={r.id} name={r.name} />
				</Reveal>
			))}
			<Reveal at={8.6} kind="fade" style={{position: 'relative'}}>
				<div style={{fontSize: 38, fontWeight: 800, color: look.tone('warning')}}>+ {Math.round(1 + count * 999999).toLocaleString('id-ID')} sesi lainnya</div>
			</Reveal>
		</Card>
	);
};

const Stage: React.FC = () => {
	const t = useSec();
	return (
		<>
			<Headline text="Cara lama: *SESSION*" top={300} size={100} tone="warning" />
			<Reveal at={1.4} kind="rise" style={{left: 110, top: 540}}>
				<SessionTable />
			</Reveal>

			<Actor x={190} floor={1460}>
				<ManCharacter expression={t < 10.5 ? 'happy' : 'worried'} pose={t < 5.8 ? 'idle' : 'thumbsUp'} yaw={20} style={{scale: 0.5}} />
			</Actor>
			<Travel from={[540, 660]} to={[200, 1025]} at={5} dur={0.8} arc={-60}>
				<FaCookieBite size={70} color="#c2410c" />
			</Travel>
			<Reveal at={5.8} damping={10} style={{left: 40, top: 995}}>
				<Pill icon={FaCookieBite} tone="warning" size={30} mono>
					sess_8f3a
				</Pill>
			</Reveal>

			{SERVERS.map((s) => (
				<Reveal key={s.label} at={s.at} kind="rise" style={{left: 0, top: 0}}>
					<Place x={s.x} y={1185} scale={0.5}>
						<ServerRack status={s.label === 'B' && t > 10.5 ? 'warning' : 'healthy'} label={`SRV-${s.label}`} />
					</Place>
				</Reveal>
			))}
			<Travel from={[300, 1220]} to={[660, 1250]} at={9.9} dur={0.6} arc={-120}>
				<Pill icon={FaEnvelope} size={26} mono>
					sess_8f3a
				</Pill>
			</Travel>
			<Reveal at={10.5} out={11.6} damping={10} style={{left: 400, top: 1070}}>
				<Bubble tone="danger" size={34}>
					sess_8f3a? Nggak kenal!
				</Bubble>
			</Reveal>

			{SERVERS.map((s, i) => (
				<Arrow key={s.label} x1={540} y1={998} x2={s.x + 80} y2={1170} at={11.7 + i * 0.15} dur={0.4} tone="warning" width={6} dashed />
			))}
			<Stamp at={12.5} tone="warning" size={86} rotate={-7} style={{left: 220, right: 0, top: 1010}}>
				BERAT &amp; RIBET
			</Stamp>
		</>
	);
};

export const Session: React.FC = () => (
	<SceneShell chapter="Cara lama" chapterIcon={FaBook} shakeAt={12.5}>
		<Stage />
		<Sfx name="Book" src={SFX.pageTurn} at={1.4} volume={0.6} />
		<Sfx name="Write row" src={SFX.typing} at={2.6} volume={0.35} />
		<Sfx name="Cookie" src={SFX.pop} at={5} volume={0.5} />
		<Sfx name="Cookie land" src={SFX.click} at={5.8} volume={0.5} />
		<Sfx name="Rows flood" src={SFX.typing} at={8.2} volume={0.3} />
		{SERVERS.map((s) => (
			<Sfx key={s.label} name="Server pop" src={SFX.pop} at={s.at} volume={0.45} />
		))}
		<Sfx name="Request B" src={SFX.click} at={9.9} volume={0.5} />
		<Sfx name="Unknown session" src={SFX.denied} at={10.5} volume={0.35} />
		<Sfx name="Sync" src={SFX.whoosh} at={11.7} volume={0.3} />
		<Sfx name="Stamp" src={SFX.boom} at={12.5} volume={0.4} />
	</SceneShell>
);
