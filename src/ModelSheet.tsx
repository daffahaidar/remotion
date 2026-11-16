import {loadFont} from '@remotion/google-fonts/Fredoka';
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {COLORS, Character, EXPRESSION_NAMES, type CharacterProps, type MouthShape} from '../character';

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

const SWATCHES: readonly [string, string][] = [
	['Skin', COLORS.skin],
	['Hair', COLORS.hair],
	['Glasses', COLORS.frame],
	['T-shirt', COLORS.shirt],
	['Jeans', COLORS.pants],
	['Sneakers', COLORS.shoe],
];

const INK = '#2a2530';

const Section: React.FC<{readonly y: number; readonly children: React.ReactNode}> = ({y, children}) => (
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
			color: COLORS.shirtShade,
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

/** Places a character so that its viewBox is scaled to `w` x `h` at (x, y). */
const Cell: React.FC<{
	readonly x: number;
	readonly y: number;
	readonly w: number;
	readonly h: number;
	readonly props: CharacterProps;
}> = ({x, y, w, h, props}) => (
	<Character {...props} style={{position: 'absolute', left: x - w / 2, top: y, width: w, height: h}} />
);

export const ModelSheet: React.FC = () => {
	const col = (i: number, n: number) => 100 + (2200 / n) * (i + 0.5);
	return (
		<AbsoluteFill style={{backgroundColor: '#f6f3ee', fontFamily: 'Fredoka', color: INK}}>
			<div style={{position: 'absolute', left: 100, top: 80, fontSize: 96, fontWeight: 700}}>
				Mascot · Master Character Rig
			</div>
			<div style={{position: 'absolute', left: 104, top: 200, fontSize: 44, fontWeight: 500, color: '#6b6474'}}>
				Model sheet: turnaround, expressions, lip sync and poses
			</div>
			{SWATCHES.map(([name, color], i) => (
				<div key={name} style={{position: 'absolute', left: 1430 + i * 135, top: 92, width: 120, textAlign: 'center'}}>
					<div
						style={{
							width: 84,
							height: 84,
							margin: '0 auto',
							borderRadius: 42,
							backgroundColor: color,
							border: `5px solid ${COLORS.outline}`,
						}}
					/>
					<div style={{fontSize: 26, fontWeight: 500, marginTop: 8}}>{name}</div>
					<div style={{fontSize: 22, color: '#6b6474'}}>{color}</div>
				</div>
			))}

			<Section y={300}>Turnaround</Section>
			{TURNAROUND.map(([yaw, label], i) => (
				<React.Fragment key={label}>
					<Cell x={col(i, 5)} y={380} w={588} h={630} props={{yaw}} />
					<Label x={col(i, 5)} y={995}>
						{label}
					</Label>
				</React.Fragment>
			))}

			<Section y={1080}>Expressions</Section>
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

			<Section y={2670}>Lip sync mouth chart</Section>
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

			<Section y={3080}>Poses and actions</Section>
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
