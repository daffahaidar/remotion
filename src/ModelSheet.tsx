import {loadFont} from '@remotion/google-fonts/Fredoka';
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {
	COLORS as MAN_COLORS,
	Character as ManCharacter,
	EXPRESSION_NAMES,
	WOMAN_COLORS,
	WomanCharacter,
	type CharacterProps,
	type MouthShape,
} from '../character';

loadFont('normal', {weights: ['500', '700'], subsets: ['latin']});

// Generated from the rig presets, so this sheet stays programmatic.

const TURNAROUND: readonly [number, string][] = [
	[0, 'Front'],
	[40, '3/4 Front'],
	[90, 'Side'],
	[140, '3/4 Back'],
	[180, 'Back'],
];

const MOUTH_CHART: readonly [MouthShape, string][] = [
	['rest', 'Rest'],
	['mbp', 'M B P'],
	['aa', 'A I'],
	['ee', 'E'],
	['oh', 'O'],
	['oo', 'U W Q'],
	['fv', 'F V'],
	['l', 'L'],
	['etc', 'C D G K S T'],
];

const ACTIONS: readonly [string, CharacterProps][] = [
	['Idle', {}],
	['Wave', {pose: 'wave', expression: 'happy'}],
	['Point', {pose: 'point', expression: 'happy'}],
	['Think', {pose: 'think', expression: 'thinking'}],
	['Surprised', {pose: 'surprised', expression: 'surprised'}],
	['Cheer', {pose: 'cheer', expression: 'laugh'}],
	['Shrug', {pose: 'shrug', expression: 'confused'}],
	['Hands on hips', {pose: 'handsOnHips', expression: 'determined'}],
	['Arms crossed', {pose: 'armsCrossed', expression: 'smirk'}],
	['Present', {pose: 'present', expression: 'happy'}],
	['Thumbs up', {pose: 'thumbsUp', expression: 'wink'}],
	['Jump', {pose: 'jump', expression: 'laugh'}],
	['Walk', {motion: 'walk', yaw: 90}],
	['Run', {motion: 'run', yaw: 90, expression: 'determined'}],
	['Peace sign', {pose: 'peace', expression: 'cheeky'}],
	['Facepalm', {pose: 'facepalm', expression: 'embarrassed'}],
	['Fist pump', {pose: 'fistPump', expression: 'excited'}],
	['Bashful', {pose: 'bashful', expression: 'love'}],
	['Hold on / Stop', {pose: 'stop', expression: 'scared'}],
	['Welcome', {pose: 'welcome', expression: 'proud'}],
	['Dance', {pose: 'dance', expression: 'excited'}],
	['Idea / Aha!', {pose: 'idea', expression: 'eureka'}],
	['Thumbs down', {pose: 'thumbsDown', expression: 'skeptical'}],
	['Thank you / Pray', {pose: 'pray', expression: 'relief'}],
	['Listen', {pose: 'listen', expression: 'surprised'}],
	['Clap / Applause', {pose: 'clap', expression: 'happy'}],
	['Typing / Work', {pose: 'typing', expression: 'focused'}],
	['Sit', {pose: 'sit', expression: 'happy'}],
];

const MAN_SWATCHES: readonly [string, string][] = [
	['Skin', MAN_COLORS.skin],
	['Hair', MAN_COLORS.hair],
	['Glasses', MAN_COLORS.frame],
	['T-shirt', MAN_COLORS.shirt],
	['Jeans', MAN_COLORS.pants],
	['Sneakers', MAN_COLORS.shoe],
];

const WOMAN_SWATCHES: readonly [string, string][] = [
	['Skin', WOMAN_COLORS.skin],
	['Hijab', WOMAN_COLORS.hijab],
	['Ciput', WOMAN_COLORS.hijabInner],
	['Tunic', WOMAN_COLORS.shirt],
	['Pants', WOMAN_COLORS.pants],
	['Sneakers', WOMAN_COLORS.shoe],
];

const INK = '#2a2530';

const Section: React.FC<{
	readonly y: number;
	readonly accent: string;
	readonly children: React.ReactNode;
}> = ({y, accent, children}) => (
	<div
		style={{
			position: 'absolute',
			left: 100,
			top: y,
			width: 2200,
			borderTop: '4px solid #d9d2c6',
			paddingTop: 18,
			fontSize: 56,
			fontWeight: 700,
			color: accent,
		}}
	>
		{children}
	</div>
);

const Label: React.FC<{
	readonly x: number;
	readonly y: number;
	readonly children: React.ReactNode;
}> = ({x, y, children}) => (
	<div
		style={{
			position: 'absolute',
			left: x - 200,
			top: y,
			width: 400,
			textAlign: 'center',
			fontSize: 36,
			fontWeight: 500,
			color: INK,
		}}
	>
		{children}
	</div>
);

const SheetLayout: React.FC<{
	readonly title: string;
	readonly subtitle: string;
	readonly accent: string;
	readonly swatches: readonly [string, string][];
	readonly Rig: typeof ManCharacter;
}> = ({title, subtitle, accent, swatches, Rig}) => {
	const col = (i: number, n: number) => 100 + (2200 / n) * (i + 0.5);
	const Cell: React.FC<{
		readonly x: number;
		readonly y: number;
		readonly w: number;
		readonly h: number;
		readonly props: CharacterProps;
	}> = ({x, y, w, h, props}) => (
		<Rig {...props} style={{position: 'absolute', left: x - w / 2, top: y, width: w, height: h}} />
	);

	return (
		<AbsoluteFill style={{backgroundColor: '#f6f3ee', fontFamily: 'Fredoka', color: INK}}>
			<div style={{position: 'absolute', left: 100, top: 80, fontSize: 96, fontWeight: 700}}>
				{title}
			</div>
			<div style={{position: 'absolute', left: 104, top: 200, fontSize: 44, fontWeight: 500, color: '#6b6474'}}>
				{subtitle}
			</div>
			{swatches.map(([name, color], i) => (
				<div key={name} style={{position: 'absolute', left: 1430 + i * 135, top: 92, width: 120, textAlign: 'center'}}>
					<div
						style={{
							width: 84,
							height: 84,
							margin: '0 auto',
							borderRadius: 42,
							backgroundColor: color,
							border: `5px solid ${MAN_COLORS.outline}`,
						}}
					/>
					<div style={{fontSize: 26, fontWeight: 500, marginTop: 8}}>{name}</div>
					<div style={{fontSize: 22, color: '#6b6474'}}>{color}</div>
				</div>
			))}

			<Section y={300} accent={accent}>
				Turnaround
			</Section>
			{TURNAROUND.map(([yaw, label], i) => (
				<React.Fragment key={label}>
					<Cell x={col(i, 5)} y={380} w={588} h={630} props={{yaw}} />
					<Label x={col(i, 5)} y={995}>
						{label}
					</Label>
				</React.Fragment>
			))}

			<Section y={1080} accent={accent}>
				Expressions
			</Section>
			{EXPRESSION_NAMES.map((name, i) => {
				const x = col(i % 8, 8);
				const y = 1170 + Math.floor(i / 8) * 370;
				return (
					<React.Fragment key={name}>
						<Cell x={x} y={y} w={284} h={284} props={{expression: name, framing: 'head', autoBlink: false}} />
						<Label x={x} y={y + 288}>
							{name}
						</Label>
					</React.Fragment>
				);
			})}

			<Section y={2670} accent={accent}>
				Lip sync mouth chart
			</Section>
			{MOUTH_CHART.map(([shape, label], i) => (
				<React.Fragment key={shape}>
					<Cell
						x={col(i, 9)}
						y={2750}
						w={232}
						h={232}
						props={{mouth: shape, framing: 'head', autoBlink: false}}
					/>
					<Label x={col(i, 9)} y={2990}>
						{label}
					</Label>
				</React.Fragment>
			))}

			<Section y={3080} accent={accent}>
				Poses and actions
			</Section>
			{ACTIONS.map(([label, props], i) => {
				const x = col(i % 7, 7);
				const y = 3150 + Math.floor(i / 7) * 550;
				return (
					<React.Fragment key={label}>
						<Cell x={x} y={y} w={470} h={504} props={{...props, autoBlink: false}} />
						<Label x={x} y={y + 490}>
							{label}
						</Label>
					</React.Fragment>
				);
			})}
		</AbsoluteFill>
	);
};

export const ModelSheet: React.FC = () => (
	<SheetLayout
		title="Man · Master Character Rig"
		subtitle="Model sheet: turnaround, expressions, lip sync and poses"
		accent={MAN_COLORS.shirtShade}
		swatches={MAN_SWATCHES}
		Rig={ManCharacter}
	/>
);

export const WomanModelSheet: React.FC = () => (
	<SheetLayout
		title="Woman · Hijabi Character Rig"
		subtitle="Model sheet: turnaround, expressions, lip sync and poses"
		accent={WOMAN_COLORS.hijabShade}
		swatches={WOMAN_SWATCHES}
		Rig={WomanCharacter}
	/>
);
