import {loadFont} from '@remotion/google-fonts/Fredoka';
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {
	BACKEND_PROGRAMMER_COLORS,
	BackendProgrammerCharacter,
	BOSS_COLORS,
	BossCharacter,
	CHEF_COLORS,
	ChefCharacter,
	COLORS as MAN_COLORS,
	Character as ManCharacter,
	DOCTOR_COLORS,
	DoctorCharacter,
	EXPRESSION_NAMES,
	FRONTEND_PROGRAMMER_COLORS,
	FrontendProgrammerCharacter,
	FULLSTACK_PROGRAMMER_COLORS,
	FullstackProgrammerCharacter,
	HACKER_COLORS,
	HackerCharacter,
	PROJECT_MANAGER_COLORS,
	ProjectManagerCharacter,
	QUALITY_ASSURANCE_COLORS,
	QualityAssuranceCharacter,
	TECH_LEAD_COLORS,
	TechLeadCharacter,
	WOMAN_COLORS,
	WomanCharacter,
	type CharacterProps,
	type MouthShape,
} from './assets/character';

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

type Sheet = {
	readonly title: string;
	readonly accent: string;
	readonly swatches: readonly [string, string][];
	readonly Rig: typeof ManCharacter;
};

const SheetLayout: React.FC<Sheet> = ({title, accent, swatches, Rig}) => {
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
			<div style={{position: 'absolute', left: 100, top: 80, fontSize: 96, fontWeight: 700}}>{title}</div>
			<div style={{position: 'absolute', left: 104, top: 200, fontSize: 44, fontWeight: 500, color: '#6b6474'}}>
				Model sheet: turnaround, expressions, lip sync and poses
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
					<Cell x={col(i, 9)} y={2750} w={232} h={232} props={{mouth: shape, framing: 'head', autoBlink: false}} />
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

const SHEETS = {
	man: {
		title: 'Man · Master Character Rig',
		accent: MAN_COLORS.shirtShade,
		Rig: ManCharacter,
		swatches: [
			['Skin', MAN_COLORS.skin],
			['Hair', MAN_COLORS.hair],
			['Glasses', MAN_COLORS.frame],
			['T-shirt', MAN_COLORS.shirt],
			['Jeans', MAN_COLORS.pants],
			['Sneakers', MAN_COLORS.shoe],
		],
	},
	woman: {
		title: 'Woman · Hijabi Character Rig',
		accent: WOMAN_COLORS.hijabShade,
		Rig: WomanCharacter,
		swatches: [
			['Skin', WOMAN_COLORS.skin],
			['Hijab', WOMAN_COLORS.hijab],
			['Ciput', WOMAN_COLORS.hijabInner],
			['Tunic', WOMAN_COLORS.shirt],
			['Pants', WOMAN_COLORS.pants],
			['Sneakers', WOMAN_COLORS.shoe],
		],
	},
	frontend_programmer: {
		title: 'Frontend · Character Rig',
		accent: FRONTEND_PROGRAMMER_COLORS.shirt,
		Rig: FrontendProgrammerCharacter,
		swatches: [
			['Skin', FRONTEND_PROGRAMMER_COLORS.skin],
			['Hair', FRONTEND_PROGRAMMER_COLORS.hair],
			['Streak', FRONTEND_PROGRAMMER_COLORS.hairAccent],
			['Sweater', FRONTEND_PROGRAMMER_COLORS.shirt],
			['Chinos', FRONTEND_PROGRAMMER_COLORS.pants],
			['Sneakers', FRONTEND_PROGRAMMER_COLORS.shoe],
		],
	},
	backend_programmer: {
		title: 'Backend · Character Rig',
		accent: BACKEND_PROGRAMMER_COLORS.headphoneGlow,
		Rig: BackendProgrammerCharacter,
		swatches: [
			['Skin', BACKEND_PROGRAMMER_COLORS.skin],
			['Hair', BACKEND_PROGRAMMER_COLORS.hair],
			['Headset', BACKEND_PROGRAMMER_COLORS.headphoneGlow],
			['Hoodie', BACKEND_PROGRAMMER_COLORS.shirt],
			['Joggers', BACKEND_PROGRAMMER_COLORS.pants],
			['Sneakers', BACKEND_PROGRAMMER_COLORS.shoe],
		],
	},
	boss: {
		title: 'Boss · Character Rig',
		accent: BOSS_COLORS.tie,
		Rig: BossCharacter,
		swatches: [
			['Skin', BOSS_COLORS.skin],
			['Hair', BOSS_COLORS.hair],
			['Silver', BOSS_COLORS.hairSilver],
			['Suit', BOSS_COLORS.shirt],
			['Tie', BOSS_COLORS.tie],
			['Shoes', BOSS_COLORS.shoe],
		],
	},
	chef: {
		title: 'Chef · Character Rig',
		accent: CHEF_COLORS.neckerchief,
		Rig: ChefCharacter,
		swatches: [
			['Skin', CHEF_COLORS.skin],
			['Hair', CHEF_COLORS.hair],
			['Coat', CHEF_COLORS.shirt],
			['Scarf', CHEF_COLORS.neckerchief],
			['Apron', CHEF_COLORS.apron],
			['Wood', CHEF_COLORS.wood],
		],
	},
	doctor: {
		title: 'Doctor · Character Rig',
		accent: DOCTOR_COLORS.scrubs,
		Rig: DoctorCharacter,
		swatches: [
			['Skin', DOCTOR_COLORS.skin],
			['Hair', DOCTOR_COLORS.hair],
			['Coat', DOCTOR_COLORS.shirt],
			['Scrubs', DOCTOR_COLORS.scrubs],
			['Cross', DOCTOR_COLORS.crossRed],
			['Shoes', DOCTOR_COLORS.shoe],
		],
	},
	project_manager: {
		title: 'PM · Character Rig',
		accent: PROJECT_MANAGER_COLORS.shirt,
		Rig: ProjectManagerCharacter,
		swatches: [
			['Skin', PROJECT_MANAGER_COLORS.skin],
			['Hair', PROJECT_MANAGER_COLORS.hair],
			['Blazer', PROJECT_MANAGER_COLORS.shirt],
			['Top', PROJECT_MANAGER_COLORS.innerTop],
			['Lanyard', PROJECT_MANAGER_COLORS.lanyard],
			['Shoes', PROJECT_MANAGER_COLORS.shoe],
		],
	},
	tech_lead: {
		title: 'Tech Lead · Character Rig',
		accent: TECH_LEAD_COLORS.shirt,
		Rig: TechLeadCharacter,
		swatches: [
			['Skin', TECH_LEAD_COLORS.skin],
			['Hair', TECH_LEAD_COLORS.hair],
			['Flannel', TECH_LEAD_COLORS.shirt],
			['Tee', TECH_LEAD_COLORS.innerTee],
			['Pants', TECH_LEAD_COLORS.pants],
			['Accent', TECH_LEAD_COLORS.shoeAccent],
		],
	},
	fullstack_programmer: {
		title: 'Fullstack · Character Rig',
		accent: FULLSTACK_PROGRAMMER_COLORS.sleeveCyan,
		Rig: FullstackProgrammerCharacter,
		swatches: [
			['Skin', FULLSTACK_PROGRAMMER_COLORS.skin],
			['Cap', FULLSTACK_PROGRAMMER_COLORS.capCyan],
			['Emerald', FULLSTACK_PROGRAMMER_COLORS.sleeveEmerald],
			['Jacket', FULLSTACK_PROGRAMMER_COLORS.shirt],
			['Pants', FULLSTACK_PROGRAMMER_COLORS.pants],
			['Shoes', FULLSTACK_PROGRAMMER_COLORS.shoe],
		],
	},
	quality_assurance: {
		title: 'QA · Character Rig',
		accent: QUALITY_ASSURANCE_COLORS.frame,
		Rig: QualityAssuranceCharacter,
		swatches: [
			['Skin', QUALITY_ASSURANCE_COLORS.skin],
			['Hair', QUALITY_ASSURANCE_COLORS.hair],
			['Glasses', QUALITY_ASSURANCE_COLORS.frame],
			['Vest', QUALITY_ASSURANCE_COLORS.shirt],
			['Pants', QUALITY_ASSURANCE_COLORS.pants],
			['Shoes', QUALITY_ASSURANCE_COLORS.shoe],
		],
	},
	hacker: {
		title: 'Hacker · Character Rig',
		accent: HACKER_COLORS.matrix,
		Rig: HackerCharacter,
		swatches: [
			['Skin', HACKER_COLORS.skin],
			['Hood', HACKER_COLORS.hood],
			['Matrix', HACKER_COLORS.matrix],
			['Mask', HACKER_COLORS.mask],
			['Pants', HACKER_COLORS.pants],
			['Shoes', HACKER_COLORS.shoe],
		],
	},
} satisfies Record<string, Sheet>;

export type SheetId = keyof typeof SHEETS;

/** One model sheet per rig; pick the rig with the `character` prop. */
export const ModelSheet: React.FC<{readonly character: SheetId}> = ({character}) => (
	<SheetLayout {...SHEETS[character]} />
);
