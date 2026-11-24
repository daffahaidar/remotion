import React from 'react';
import type {IconType} from 'react-icons';
import {FaBoxesStacked, FaCircleCheck, FaFileCode, FaGoogle, FaLaptop, FaNetworkWired, FaRotateRight, FaWater, FaXmark} from 'react-icons/fa6';
import {MONO, SFX, TONES, type Tone} from '../../shared/theme';
import {Card, Headline, IconTile, Pill, Reveal, SceneShell, Sfx, Travel, useLook} from '../../shared/ui';
import {NET, SourceNote, STAGE} from '../parts';

const SPLIT_AT = 3.2;
const COUNT_AT = 4.4;
const ROUTE_AT = 6;
const LOST_AT = 9.2;
const RESEND_AT = 10.2;
const DONE_AT = 11.4;
const ROUTE_Y = 945;
const NODES: readonly {x: number; icon: IconType; tone: Tone; label: string}[] = [
	{x: 140, icon: FaLaptop, tone: 'primary', label: 'kamu'},
	{x: 320, icon: FaNetworkWired, tone: STAGE.tcp, label: 'router'},
	{x: 500, icon: FaWater, tone: STAGE.dns, label: 'kabel laut'},
	{x: 680, icon: FaNetworkWired, tone: STAGE.tcp, label: 'router'},
	{x: 860, icon: FaGoogle, tone: STAGE.http, label: 'Google'},
];

const Chip: React.FC<{readonly n: number; readonly lost?: boolean}> = ({n, lost}) => (
	<div
		style={{
			width: 60,
			height: 60,
			borderRadius: 16,
			backgroundColor: lost ? TONES.danger.fill : TONES.success.fill,
			boxShadow: `0 8px 18px ${lost ? TONES.danger.fill : TONES.success.fill}55`,
			color: '#ffffff',
			fontFamily: MONO,
			fontSize: 30,
			fontWeight: 800,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		}}
	>
		{n}
	</div>
);

const Route: React.FC = () => {
	const look = useLook();
	return (
		<>
			<Reveal at={ROUTE_AT} kind="fade" style={{left: NODES[0].x, top: ROUTE_Y - 3}}>
				<div
					style={{
						width: NODES[NODES.length - 1].x - NODES[0].x,
						height: 6,
						backgroundImage: `repeating-linear-gradient(90deg, ${look.dim}66 0 14px, transparent 14px 28px)`,
					}}
				/>
			</Reveal>
			{NODES.map((node, i) => (
				<React.Fragment key={node.x}>
					<Reveal at={ROUTE_AT + i * 0.12} damping={11} style={{left: node.x - 45, top: ROUTE_Y - 45}}>
						<IconTile icon={node.icon} tone={node.tone} size={90} raisedTile />
					</Reveal>
					<Reveal at={ROUTE_AT + i * 0.12} kind="fade" style={{left: node.x - 110, width: 220, top: ROUTE_Y + 58, textAlign: 'center', fontSize: 28, fontWeight: 700, color: look.dim}}>
						{node.label}
					</Reveal>
				</React.Fragment>
			))}
		</>
	);
};

export const Packets: React.FC = () => (
	<SceneShell chapter="Detail penting" chapterIcon={FaBoxesStacked}>
		<Headline text="Data *dipecah jadi paket*" top={300} size={92} tone={STAGE.tcp} />

		<Reveal at={0.4} kind="rise" style={{left: 240, top: 530}}>
			<Card at={0.4} tone={STAGE.http} style={{width: 600, padding: '20px 28px', display: 'flex', alignItems: 'center', gap: 22}}>
				<IconTile icon={FaFileCode} tone={STAGE.http} size={76} />
				<span style={{fontSize: 40, fontWeight: 800, flex: 1}}>HTML Google</span>
				<Pill tone={STAGE.http} size={30} mono>
					±{NET.htmlKb} KB
				</Pill>
			</Card>
		</Reveal>
		{Array.from({length: 10}, (_, i) => (
			<Reveal key={i} at={SPLIT_AT + i * 0.06} damping={10} style={{left: 160 + i * 76, top: 690}}>
				<Chip n={i + 1} />
			</Reveal>
		))}
		<Reveal at={COUNT_AT} damping={10} style={{left: 0, width: 1080, top: 772, display: 'flex', justifyContent: 'center'}}>
			<Pill icon={FaBoxesStacked} tone={STAGE.tcp} solid size={34}>
				±{NET.packets} paket
			</Pill>
		</Reveal>

		<Route />
		{[6.3, 6.7, 7.1, 7.5].map((at, i) => (
			<Travel key={at} from={[NODES[0].x, ROUTE_Y - 70]} to={[NODES[NODES.length - 1].x, ROUTE_Y - 70]} at={at} dur={1.4} arc={-50}>
				<Chip n={i + 1} />
			</Travel>
		))}

		<Travel from={[NODES[0].x, ROUTE_Y - 70]} to={[NODES[2].x, ROUTE_Y - 70]} at={8.4} dur={0.8} arc={-40}>
			<Chip n={7} />
		</Travel>
		<Reveal at={LOST_AT} damping={8} style={{left: NODES[2].x - 30, top: 1080}}>
			<div style={{display: 'flex', alignItems: 'center', gap: 14}}>
				<Chip n={7} lost />
				<Pill icon={FaXmark} tone="danger" size={30}>
					hilang!
				</Pill>
			</div>
		</Reveal>
		<Reveal at={RESEND_AT} kind="rise" style={{left: 0, width: 1080, top: 1190, display: 'flex', justifyContent: 'center'}}>
			<Pill icon={FaRotateRight} tone={STAGE.tcp} size={34}>
				TCP: kirim ulang paket 7
			</Pill>
		</Reveal>
		<Travel from={[NODES[0].x, ROUTE_Y - 70]} to={[NODES[NODES.length - 1].x, ROUTE_Y - 70]} at={RESEND_AT + 0.2} dur={1.1} arc={-50}>
			<Chip n={7} />
		</Travel>
		<Reveal at={DONE_AT} damping={10} style={{left: 0, width: 1080, top: 1290, display: 'flex', justifyContent: 'center'}}>
			<Pill icon={FaCircleCheck} tone="success" solid size={34}>
				Lengkap &amp; urut lagi
			</Pill>
		</Reveal>
		<SourceNote at={0.4}>±30 KB = HTML beranda Google (gzip), diukur 24 Nov 2026</SourceNote>

		<Sfx name="HTML" src={SFX.pop} at={0.4} volume={0.45} />
		<Sfx name="Split" src={SFX.pop} at={SPLIT_AT} volume={0.5} />
		<Sfx name="Count" src={SFX.ding} at={COUNT_AT} volume={0.35} />
		<Sfx name="Route" src={SFX.pop} at={ROUTE_AT} volume={0.4} />
		<Sfx name="Packets fly" src={SFX.whoosh} at={6.3} volume={0.3} />
		<Sfx name="Packets fly 2" src={SFX.whoosh} at={7.1} volume={0.25} />
		<Sfx name="Lost" src={SFX.glitch} at={LOST_AT} volume={0.35} />
		<Sfx name="Lost buzz" src={SFX.denied} at={LOST_AT + 0.1} volume={0.2} />
		<Sfx name="Resend" src={SFX.whoosh} at={RESEND_AT + 0.2} volume={0.3} />
		<Sfx name="Done" src={SFX.ding} at={DONE_AT} volume={0.4} />
	</SceneShell>
);
