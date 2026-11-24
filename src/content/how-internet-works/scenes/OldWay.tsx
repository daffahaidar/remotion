import React from 'react';
import {FaClockRotateLeft, FaDesktop, FaDownload, FaFileLines, FaGlobe} from 'react-icons/fa6';
import {interpolateColors} from 'remotion';
import {MONO, SFX, TONES} from '../../shared/theme';
import {Card, Headline, IconTile, Pill, Reveal, SceneShell, Sfx, Stamp, useLook, useRamp} from '../../shared/ui';
import {SourceNote, STAGE} from '../parts';

const STAMP_AT = 8.6;
const DNS_AT = 10;
/** Rows of computers that download the file: the first row early, then the network floods. */
const ROWS = [
	{at: 3.2, y: 880},
	{at: 6.4, y: 1020},
	{at: 7.2, y: 1160},
];
const COLS = [190, 365, 540, 715, 890];

/** The single shared host table, with a meter for the load on the one server that hands it out. */
const HostsFile: React.FC = () => {
	const look = useLook();
	const load = useRamp(3.2, STAMP_AT - 3.2);
	const fill = interpolateColors(load, [0, 0.7, 1], [TONES.warning.fill, TONES.warning.fill, TONES.danger.fill]);
	return (
		<Card at={0.4} tone="warning" style={{width: 560, padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 14}}>
			<div style={{display: 'flex', alignItems: 'center', gap: 18}}>
				<IconTile icon={FaFileLines} tone="warning" size={72} />
				<div>
					<div style={{fontFamily: MONO, fontSize: 44, fontWeight: 800}}>HOSTS.TXT</div>
					<div style={{fontSize: 28, fontWeight: 700, color: look.dim}}>di satu pusat (NIC)</div>
				</div>
			</div>
			<div style={{fontFamily: MONO, fontSize: 30, fontWeight: 700, color: look.dim}}>nama → alamat</div>
			{[0.8, 0.62, 0.72].map((w) => (
				<div key={w} style={{display: 'flex', gap: 14}}>
					<div style={{width: `${w * 45}%`, height: 20, borderRadius: 10, backgroundColor: look.dim, opacity: 0.35}} />
					<div style={{width: `${w * 38}%`, height: 20, borderRadius: 10, backgroundColor: TONES.warning.fill, opacity: 0.45}} />
				</div>
			))}
			<div style={{fontSize: 28, fontWeight: 700, color: look.dim, marginTop: 6}}>beban server pusat</div>
			<div style={{height: 28, borderRadius: 14, boxShadow: look.inset, padding: 5}}>
				<div style={{width: `${12 + 88 * load}%`, height: '100%', borderRadius: 9, backgroundColor: fill}} />
			</div>
		</Card>
	);
};

const Computer: React.FC<{readonly at: number}> = ({at}) => (
	<div style={{position: 'relative'}}>
		<IconTile icon={FaDesktop} tone="primary" size={100} raisedTile />
		<Reveal at={at + 0.3} damping={9} style={{right: -14, top: -14}}>
			<div style={{width: 44, height: 44, borderRadius: 22, backgroundColor: TONES.warning.fill, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
				<FaDownload size={22} color="#ffffff" />
			</div>
		</Reveal>
	</div>
);

export const OldWay: React.FC = () => (
	<SceneShell chapter="Cara lama" chapterIcon={FaClockRotateLeft} shakeAt={STAMP_AT}>
		<Headline text="Dulu: *satu file*" top={300} size={100} tone="warning" />
		<Reveal at={0.4} kind="rise" style={{left: 260, top: 445}}>
			<HostsFile />
		</Reveal>

		{ROWS.map((row, r) =>
			COLS.map((x, i) => {
				const at = row.at + i * (r ? 0.07 : 0.12);
				return (
					<Reveal key={`${row.y}-${x}`} at={at} damping={11} style={{left: x - 50, top: row.y}}>
						<Computer at={at} />
					</Reveal>
				);
			}),
		)}
		<Stamp at={STAMP_AT} size={92} rotate={-6} style={{left: 0, right: 0, top: 985}}>
			KEWALAHAN!
		</Stamp>

		<Reveal at={DNS_AT} damping={10} style={{left: 0, width: 1080, top: 1292, display: 'flex', justifyContent: 'center'}}>
			<Pill icon={FaGlobe} tone={STAGE.dns} solid size={42}>
				1983: lahirlah DNS
			</Pill>
		</Reveal>
		<SourceNote at={0.4}>Sumber: RFC 882 (1983) · RFC 1034 (1987)</SourceNote>

		<Sfx name="File" src={SFX.pageTurn} at={0.4} volume={0.5} />
		{ROWS.map((row) => (
			<Sfx key={row.y} name="Computers" src={SFX.pop} at={row.at} volume={0.45} />
		))}
		<Sfx name="Overload" src={SFX.whirr} at={6.8} volume={0.4} />
		<Sfx name="Stamp" src={SFX.boom} at={STAMP_AT} volume={0.45} />
		<Sfx name="DNS" src={SFX.ding} at={DNS_AT} volume={0.4} />
	</SceneShell>
);
