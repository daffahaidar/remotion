import React from 'react';
import type {IconType} from 'react-icons';
import {FaBolt, FaClockRotateLeft, FaGlobe, FaGoogle, FaMagnifyingGlassLocation, FaServer, FaSitemap, FaWindowMaximize} from 'react-icons/fa6';
import {MONO, SFX} from '../../shared/theme';
import {Arrow, Card, Entity, Headline, IconTile, Pill, Reveal, SceneShell, Sfx, Travel, useLook, useSec} from '../../shared/ui';
import {NET, SourceNote, STAGE} from '../parts';

const ASK_AT = 3;
const IP_BACK_AT = 13.8;
const IP_HOME_AT = 14.8;
const CACHE_AT = 15.4;
const FAST_AT = 16.6;
/** The servers the resolver asks, left to right; `x` = card center. */
const SERVERS: readonly {at: number; answerAt: number; x: number; icon: IconType; name: string; zone: string; answer: string; mono?: boolean}[] = [
	{at: 6, answerAt: 7.6, x: 255, icon: FaGlobe, name: 'Server root', zone: '( . )', answer: 'Tanya .com!'},
	{at: 9, answerAt: 10.4, x: 540, icon: FaSitemap, name: 'Server .com', zone: '( .com )', answer: 'Tanya Google!'},
	{at: 12, answerAt: 13.2, x: 825, icon: FaGoogle, name: 'Server Google', zone: 'ns1.google.com', answer: NET.ip, mono: true},
];
const ROW_Y = 1000;

const NodeCard: React.FC<{readonly s: (typeof SERVERS)[number]}> = ({s}) => {
	const look = useLook();
	return (
		<Card at={s.at} tone={STAGE.dns} style={{width: 270, padding: '22px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8}}>
			<IconTile icon={s.icon} tone={STAGE.dns} size={64} />
			<div style={{fontSize: 32, fontWeight: 800}}>{s.name}</div>
			<div style={{fontFamily: MONO, fontSize: 26, fontWeight: 700, color: look.tone(STAGE.dns)}}>{s.zone}</div>
		</Card>
	);
};

/** The browser card: once the IP comes home it replaces the caption. */
const BrowserCard: React.FC = () => {
	const look = useLook();
	const home = useSec() >= IP_HOME_AT;
	return (
		<Card at={0.4} tone={home ? STAGE.dns : undefined} style={{width: 420, padding: '20px 26px'}}>
			<Entity
				icon={FaWindowMaximize}
				tone="primary"
				name="Browser"
				size={72}
				sub={home ? <span style={{fontFamily: MONO, color: look.tone(STAGE.dns)}}>{NET.ip}</span> : 'laptop kamu'}
			/>
		</Card>
	);
};

export const DnsLookup: React.FC = () => (
	<SceneShell chapter="Cara DNS bekerja" chapterIcon={FaMagnifyingGlassLocation}>
		<Headline text="Cara DNS *cari alamat*" top={300} size={92} tone={STAGE.dns} />

		<Reveal at={0.4} kind="drop" style={{left: 330, top: 520}}>
			<BrowserCard />
		</Reveal>
		<Arrow x1={540} y1={656} x2={540} y2={732} at={ASK_AT} dur={0.35} tone="primary" />
		<Reveal at={4.4} damping={10} style={{left: 570, top: 664}}>
			<Pill tone="primary" size={26} mono>
				{NET.domain}?
			</Pill>
		</Reveal>
		<Reveal at={ASK_AT + 0.2} kind="rise" style={{left: 330, top: 740}}>
			<Card at={ASK_AT + 0.2} tone={STAGE.dns} style={{width: 420, padding: '20px 26px'}}>
				<Entity icon={FaServer} tone={STAGE.dns} name="DNS resolver" sub="biasanya dari ISP" size={72} />
			</Card>
		</Reveal>
		<Reveal at={CACHE_AT} damping={10} style={{left: 770, top: 772}}>
			<Pill icon={FaClockRotateLeft} tone="gold" size={28}>
				disimpan
			</Pill>
		</Reveal>

		{SERVERS.map((s) => (
			<React.Fragment key={s.name}>
				<Arrow x1={540} y1={880} x2={s.x} y2={ROW_Y - 12} at={s.at - 0.3} dur={0.4} tone={STAGE.dns} />
				<Reveal at={s.at} kind="rise" style={{left: s.x - 135, top: ROW_Y}}>
					<NodeCard s={s} />
				</Reveal>
				<Reveal at={s.answerAt} damping={10} style={{left: s.x - 150, width: 300, top: ROW_Y + 215, display: 'flex', justifyContent: 'center'}}>
					<Pill tone={STAGE.dns} solid={!s.mono} size={s.mono ? 26 : 28} mono={s.mono}>
						{s.answer}
					</Pill>
				</Reveal>
			</React.Fragment>
		))}
		<Travel from={[825, ROW_Y + 240]} to={[540, 600]} at={IP_BACK_AT} dur={IP_HOME_AT - IP_BACK_AT} arc={-160}>
			<Pill tone={STAGE.dns} solid size={26} mono>
				{NET.ip}
			</Pill>
		</Travel>
		<Reveal at={FAST_AT} kind="rise" style={{left: 0, width: 1080, top: 1300, display: 'flex', justifyContent: 'center'}}>
			<Pill icon={FaBolt} tone="success" size={36}>
				Kunjungan berikutnya lebih cepat
			</Pill>
		</Reveal>
		<SourceNote at={0.4}>Sumber: RFC 1034 · IANA Root Servers</SourceNote>

		<Sfx name="Browser" src={SFX.pop} at={0.4} volume={0.45} />
		<Sfx name="Ask resolver" src={SFX.whoosh} at={ASK_AT} volume={0.3} />
		<Sfx name="Resolver" src={SFX.pop} at={ASK_AT + 0.2} volume={0.45} />
		<Sfx name="Question" src={SFX.pop} at={4.4} volume={0.35} />
		{SERVERS.map((s) => (
			<React.Fragment key={s.name}>
				<Sfx name={`Ask ${s.name}`} src={SFX.whoosh} at={s.at - 0.3} volume={0.25} />
				<Sfx name={s.name} src={SFX.pop} at={s.at} volume={0.45} />
				<Sfx name={`${s.name} answers`} src={s.mono ? SFX.ding : SFX.click} at={s.answerAt} volume={0.4} />
			</React.Fragment>
		))}
		<Sfx name="IP home" src={SFX.whoosh} at={IP_BACK_AT} volume={0.3} />
		<Sfx name="Cache" src={SFX.sparkle} at={CACHE_AT} volume={0.4} />
		<Sfx name="Faster" src={SFX.pop} at={FAST_AT} volume={0.45} />
	</SceneShell>
);
