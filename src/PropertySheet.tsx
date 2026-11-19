import {loadFont} from '@remotion/google-fonts/Fredoka';
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {ChefCharacter, DoctorCharacter, FrontendProgrammerCharacter} from './assets/character';
import {
	Briefcase,
	Bug,
	Clipboard,
	CloudService,
	CoffeeMug,
	DatabaseCylinder,
	DesktopComputer,
	Laptop,
	Lightbulb,
	MagnifyingGlass,
	MedicalKit,
	OfficeDesk,
	PackageBox,
	Padlock,
	PottedPlant,
	PROP_COLORS,
	PROP_INK,
	Rocket,
	ServerRack,
	ServingCloche,
	Smartphone,
	Trophy,
	WallClock,
	Whiteboard,
} from './assets/property';

loadFont('normal', {weights: ['400', '600', '700'], subsets: ['latin']});

const BG = '#f6f3ee';
const CARD_BG = '#ffffff';
const BORDER = '#dfd8cc';

const SectionTitle: React.FC<{readonly title: string; readonly subtitle: string}> = ({title, subtitle}) => (
	<div
		style={{
			display: 'flex',
			alignItems: 'baseline',
			justifyContent: 'space-between',
			borderBottom: `3px solid ${BORDER}`,
			paddingBottom: 10,
		}}
	>
		<span style={{fontSize: 30, fontWeight: 700, letterSpacing: '0.02em', color: PROP_INK}}>{title}</span>
		<span style={{fontSize: 18, fontWeight: 600, color: '#6b6375'}}>{subtitle}</span>
	</div>
);

const PropCard: React.FC<{
	readonly name: string;
	readonly variantText: string;
	readonly scale?: number;
	readonly height?: number;
	readonly children: React.ReactNode;
}> = ({name, variantText, scale = 1, height = 255, children}) => (
	<div
		style={{
			backgroundColor: CARD_BG,
			border: `3px solid ${BORDER}`,
			borderRadius: 24,
			padding: '14px 20px 14px',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			height,
			boxSizing: 'border-box',
			minWidth: 0,
		}}
	>
		<div
			style={{
				position: 'relative',
				flex: 1,
				minHeight: 0,
				width: '100%',
				overflow: 'hidden',
			}}
		>
			<div
				style={{
					position: 'absolute',
					left: '50%',
					top: '50%',
					transform: `translate(-50%, -50%) scale(${scale})`,
					transformOrigin: 'center center',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					gap: 14,
				}}
			>
				{children}
			</div>
		</div>
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				gap: 8,
				marginTop: 8,
				flexShrink: 0,
			}}
		>
			<span style={{fontSize: 20, fontWeight: 700, color: PROP_INK}}>{name}</span>
			<span
				style={{
					fontSize: 13,
					fontWeight: 600,
					fontFamily: 'ui-monospace, monospace',
					color: '#5b5365',
					backgroundColor: '#f1ede6',
					padding: '3px 10px',
					borderRadius: 999,
					whiteSpace: 'nowrap',
				}}
			>
				{variantText}
			</span>
		</div>
	</div>
);

/** Visual reference sheet of all 22 reusable props and sample character pairings. */
export const PropertySheet: React.FC = () => {
	const swatches = [
		PROP_COLORS.ink,
		PROP_COLORS.indigo,
		PROP_COLORS.cyan,
		PROP_COLORS.emerald,
		PROP_COLORS.amber,
		PROP_COLORS.red,
		PROP_COLORS.wood,
	];

	return (
		<AbsoluteFill
			style={{
				backgroundColor: BG,
				fontFamily: 'Fredoka, ui-sans-serif, sans-serif',
				color: PROP_INK,
				padding: '48px 72px',
				display: 'flex',
				flexDirection: 'column',
				gap: 26,
			}}
		>
			{/* Header */}
			<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
				<div>
					<div style={{fontSize: 18, fontWeight: 700, letterSpacing: '0.12em', color: PROP_COLORS.indigo}}>
						PROPERTY LIBRARY • REMOTION 2D CARTOON
					</div>
					<div style={{fontSize: 54, fontWeight: 700, lineHeight: 1.08, marginTop: 4}}>REUSABLE CHARACTER PROPS</div>
				</div>
				<div style={{display: 'flex', gap: 10, alignItems: 'center', paddingBottom: 8}}>
					{swatches.map((hex) => (
						<div
							key={hex}
							style={{
								width: 30,
								height: 30,
								borderRadius: 10,
								backgroundColor: hex,
								border: `3px solid ${PROP_INK}`,
							}}
						/>
					))}
				</div>
			</div>

			{/* Section 1: Devices */}
			<SectionTitle title="1. COMPUTERS & MOBILE DEVICES" subtitle="Laptop • DesktopComputer • Smartphone" />
			<div style={{display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 22}}>
				<PropCard name="Laptop" variantText='screen="code" | silver' scale={0.78}>
					<Laptop screen="code" color="silver" badge="code" />
				</PropCard>
				<PropCard name="Laptop" variantText='screen="error" | spaceGray' scale={0.78}>
					<Laptop screen="error" color="spaceGray" badge="bug" />
				</PropCard>
				<PropCard name="Laptop" variantText="open={false} | indigo" scale={0.78}>
					<Laptop open={false} color="indigo" badge="none" />
				</PropCard>
				<PropCard name="DesktopComputer" variantText='dashboard | tower="right"' scale={0.58}>
					<DesktopComputer screen="dashboard" towerSide="right" />
				</PropCard>
				<PropCard name="DesktopComputer" variantText='terminal | tower="left"' scale={0.58}>
					<DesktopComputer screen="terminal" towerSide="left" accentColor={PROP_COLORS.emerald} />
				</PropCard>
				<PropCard name="Smartphone" variantText='screen="app" | dark' scale={0.65}>
					<Smartphone screen="app" frameColor="dark" />
				</PropCard>
				<PropCard name="Smartphone" variantText='screen="chat" | cyan' scale={0.65}>
					<Smartphone screen="chat" frameColor="cyan" />
				</PropCard>
				<PropCard name="Smartphone" variantText='screen="alert" | silver' scale={0.65}>
					<Smartphone screen="alert" frameColor="silver" />
				</PropCard>
			</div>

			{/* Section 2: Infrastructure & Architecture */}
			<SectionTitle title="2. SERVERS, DATABASES & WHITEBOARDS" subtitle="ServerRack • DatabaseCylinder • Whiteboard" />
			<div style={{display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 22}}>
				<PropCard name="ServerRack" variantText='status="healthy"' height={285} scale={0.41}>
					<ServerRack status="healthy" label="PROD-01" />
				</PropCard>
				<PropCard name="ServerRack" variantText='status="busy"' height={285} scale={0.41}>
					<ServerRack status="busy" label="API-02" />
				</PropCard>
				<PropCard name="ServerRack" variantText='status="down"' height={285} scale={0.41}>
					<ServerRack status="down" label="DB-FAIL" />
				</PropCard>
				<PropCard name="DatabaseCylinder" variantText="sql / cache / locked" height={285} scale={0.56}>
					<DatabaseCylinder variant="sql" label="SQL" />
					<DatabaseCylinder variant="cache" label="CACHE" />
					<DatabaseCylinder variant="locked" label="AUTH" />
				</PropCard>
				<PropCard name="DatabaseCylinder" variantText="cloud & error" height={275} scale={0.66}>
					<DatabaseCylinder variant="cloud" label="CLOUD" />
					<DatabaseCylinder variant="error" label="500" />
				</PropCard>
				<PropCard name="Whiteboard" variantText='mode="diagram"' height={275} scale={0.46}>
					<Whiteboard mode="diagram" title="SYSTEM FLOW" />
				</PropCard>
				<PropCard name="Whiteboard" variantText='mode="kanban"' height={275} scale={0.46}>
					<Whiteboard mode="kanban" title="SPRINT 12" />
				</PropCard>
				<PropCard name="Whiteboard" variantText='mode="bug"' height={275} scale={0.46}>
					<Whiteboard mode="bug" title="BUG HUNT" />
				</PropCard>
			</div>

			{/* Section 3: Office, Role & Analogy Props */}
			<SectionTitle
				title="3. OFFICE, ROLE & ANALOGY PROPS"
				subtitle="OfficeDesk • CoffeeMug • Clipboard • Briefcase • ServingCloche • MedicalKit"
			/>
			<div style={{display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 22}}>
				<PropCard name="OfficeDesk" variantText='variant="modern"' height={260} scale={0.52}>
					<OfficeDesk variant="modern" showChair />
				</PropCard>
				<PropCard name="OfficeDesk" variantText='variant="executive"' height={260} scale={0.52}>
					<OfficeDesk variant="executive" showChair />
				</PropCard>
				<PropCard name="CoffeeMug" variantText="ceramic & takeaway" height={260} scale={0.9}>
					<CoffeeMug variant="ceramic" color="indigo" label="</>" />
					<CoffeeMug variant="takeaway" color="emerald" label="JS" />
				</PropCard>
				<PropCard name="Briefcase" variantText="leather & dark" height={260} scale={0.76}>
					<Briefcase variant="leather" withGoldShine />
					<Briefcase variant="dark" withGoldShine={false} />
				</PropCard>
				<PropCard name="Clipboard" variantText="qa / pm / medical" height={260} scale={0.62}>
					<Clipboard variant="qa" title="QA TEST" />
					<Clipboard variant="pm" title="SPRINT" />
					<Clipboard variant="medical" title="VITALS" />
				</PropCard>
				<PropCard name="ServingCloche" variantText="open=false & open (burger)" height={260} scale={0.76}>
					<ServingCloche open={false} dish="burger" />
					<ServingCloche open dish="burger" />
				</PropCard>
				<PropCard name="ServingCloche" variantText="dish: html & json" height={260} scale={0.76}>
					<ServingCloche open dish="html" />
					<ServingCloche open dish="json" />
				</PropCard>
				<PropCard name="MedicalKit" variantText="firstAid & monitor" height={260} scale={0.58}>
					<MedicalKit variant="firstAid" healthy />
					<MedicalKit variant="monitor" healthy />
					<MedicalKit variant="monitor" healthy={false} />
				</PropCard>
			</div>

			{/* Section 4: Deploy, Debug & Security */}
			<SectionTitle
				title="4. DEPLOY, DEBUG & SECURITY"
				subtitle="Rocket • Bug • MagnifyingGlass • Padlock • CloudService • PackageBox"
			/>
			<div style={{display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 22}}>
				<PropCard name="Rocket" variantText="idle & launching" height={300} scale={0.6}>
					<Rocket color="red" label="v0.9" />
					<Rocket color="indigo" label="v1.0" launching />
				</PropCard>
				<PropCard name="Bug" variantText="red / emerald / purple" height={300} scale={0.6}>
					<Bug color="red" />
					<Bug color="emerald" />
					<Bug color="purple" />
				</PropCard>
				<PropCard name="Bug + MagnifyingGlass" variantText='squashed & lens="check"' height={300} scale={0.7}>
					<Bug color="red" state="squashed" />
					<MagnifyingGlass lens="check" handleColor="emerald" />
				</PropCard>
				<PropCard name="MagnifyingGlass" variantText='lens="bug" / "code"' height={300} scale={0.7}>
					<MagnifyingGlass lens="bug" />
					<MagnifyingGlass lens="code" handleColor="amber" />
				</PropCard>
				<PropCard name="Padlock" variantText="locked & unlocked" height={260} scale={0.72}>
					<Padlock locked color="gold" />
					<Padlock locked={false} color="red" />
				</PropCard>
				<PropCard name="CloudService" variantText="upload & download" height={260} scale={0.62}>
					<CloudService status="upload" label="DEPLOY" />
					<CloudService status="download" label="S3" />
				</PropCard>
				<PropCard name="CloudService" variantText="sync & error" height={260} scale={0.62}>
					<CloudService status="sync" label="SYNC" />
					<CloudService status="error" label="503" />
				</PropCard>
				<PropCard name="PackageBox" variantText="cardboard & gift (open)" height={260} scale={0.7}>
					<PackageBox variant="cardboard" label="npm" />
					<PackageBox variant="gift" open label="v2.0" />
				</PropCard>
			</div>

			{/* Section 5: Workplace & Storytelling */}
			<SectionTitle title="5. WORKPLACE & STORYTELLING" subtitle="WallClock • Lightbulb • Trophy • PottedPlant" />
			<div style={{display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 22}}>
				<PropCard name="WallClock" variantText="wall & alarm (ringing)" height={280} scale={0.85}>
					<WallClock variant="wall" hours={10} minutes={10} />
					<WallClock variant="alarm" color="red" hours={7} minutes={0} ringing />
				</PropCard>
				<PropCard name="Lightbulb" variantText="on={false} & on" height={280} scale={0.8}>
					<Lightbulb on={false} />
					<Lightbulb on />
				</PropCard>
				<PropCard name="Trophy" variantText="gold / silver / bronze" height={280} scale={0.68}>
					<Trophy variant="gold" label="#1" />
					<Trophy variant="silver" label="#2" />
					<Trophy variant="bronze" label="#3" />
				</PropCard>
				<PropCard name="PottedPlant" variantText="monstera / cactus / snake" height={280} scale={0.62}>
					<PottedPlant variant="monstera" />
					<PottedPlant variant="cactus" potColor="white" />
					<PottedPlant variant="snake" potColor="indigo" />
				</PropCard>
			</div>

			{/* Section 6: Character Pairing Demos (floor-anchored coordinates) */}
			<SectionTitle
				title="6. CHARACTER + PROP PAIRINGS"
				subtitle="Floor-aligned scale & layering check (Frontend, Chef & Doctor)"
			/>
			<div style={{display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 24}}>
				{/* Pairing 1: Typing behind desk (floor y = 496px) */}
				<div
					style={{
						backgroundColor: CARD_BG,
						border: `3px solid ${BORDER}`,
						borderRadius: 24,
						height: 540,
						position: 'relative',
						overflow: 'hidden',
					}}
				>
					{/* Subtle floor line */}
					<div
						style={{
							position: 'absolute',
							left: 36,
							right: 36,
							top: 496,
							height: 3,
							backgroundColor: '#e9e3d8',
							borderRadius: 2,
						}}
					/>
					{/* Character floor anchor at (420, 860) -> left = centerX - 420, top = 496 - 860 */}
					<FrontendProgrammerCharacter
						pose="typing"
						expression="focused"
						style={{position: 'absolute', left: 360 - 420, top: 496 - 860, scale: 0.54}}
					/>
					{/* OfficeDesk floor anchor at (280, 340) -> top = 496 - 340 = 156 */}
					<div
						style={{
							position: 'absolute',
							left: 360 - 280,
							top: 496 - 340,
							transform: 'scale(0.77)',
							transformOrigin: '280px 340px',
						}}
					>
						<OfficeDesk variant="modern" showChair={false} />
					</div>
					{/* Tabletop surface: 496 - 202 * 0.77 = 340px; laptop rests cleanly on tabletop */}
					<div
						style={{
							position: 'absolute',
							left: 345 - 160,
							top: 350 - 200,
							transform: 'scale(0.45)',
							transformOrigin: '160px 200px',
						}}
					>
						<Laptop screen="code" color="indigo" badge="code" />
					</div>
					<div
						style={{
							position: 'absolute',
							left: 500 - 80,
							top: 348 - 148,
							transform: 'scale(0.37)',
							transformOrigin: '80px 148px',
						}}
					>
						<CoffeeMug variant="ceramic" color="indigo" label="</>" />
					</div>
					<div
						style={{
							position: 'absolute',
							left: 24,
							top: 18,
							fontSize: 18,
							fontWeight: 700,
							backgroundColor: '#f1ede6',
							padding: '5px 14px',
							borderRadius: 999,
						}}
					>
						Frontend + OfficeDesk + Laptop + Mug
					</div>
				</div>

				{/* Pairing 2: Chef presenting dish on minimal counter */}
				<div
					style={{
						backgroundColor: CARD_BG,
						border: `3px solid ${BORDER}`,
						borderRadius: 24,
						height: 540,
						position: 'relative',
						overflow: 'hidden',
					}}
				>
					<div
						style={{
							position: 'absolute',
							left: 36,
							right: 36,
							top: 496,
							height: 3,
							backgroundColor: '#e9e3d8',
							borderRadius: 2,
						}}
					/>
					<ChefCharacter
						pose="present"
						expression="happy"
						talking
						style={{position: 'absolute', left: 225 - 420, top: 496 - 860, scale: 0.54}}
					/>
					<div
						style={{
							position: 'absolute',
							left: 525 - 280,
							top: 496 - 340,
							transform: 'scale(0.68)',
							transformOrigin: '280px 340px',
						}}
					>
						<OfficeDesk variant="minimal" showChair={false} />
					</div>
					{/* Cloche resting on counter top (496 - 202 * 0.68 = 359) */}
					<div
						style={{
							position: 'absolute',
							left: 525 - 130,
							top: 366 - 196,
							transform: 'scale(0.72)',
							transformOrigin: '130px 196px',
						}}
					>
						<ServingCloche open dish="html" />
					</div>
					<div
						style={{
							position: 'absolute',
							left: 24,
							top: 18,
							fontSize: 18,
							fontWeight: 700,
							backgroundColor: '#f1ede6',
							padding: '5px 14px',
							borderRadius: 999,
						}}
					>
						Chef + Counter + ServingCloche(html)
					</div>
				</div>

				{/* Pairing 3: Doctor on right pointing directly at Monitor + ServerRack */}
				<div
					style={{
						backgroundColor: CARD_BG,
						border: `3px solid ${BORDER}`,
						borderRadius: 24,
						height: 540,
						position: 'relative',
						overflow: 'hidden',
					}}
				>
					<div
						style={{
							position: 'absolute',
							left: 36,
							right: 36,
							top: 496,
							height: 3,
							backgroundColor: '#e9e3d8',
							borderRadius: 2,
						}}
					/>
					<div
						style={{
							position: 'absolute',
							left: 165 - 160,
							top: 496 - 500,
							transform: 'scale(0.54)',
							transformOrigin: '160px 500px',
						}}
					>
						<ServerRack status="down" label="API-ERR" />
					</div>
					<div
						style={{
							position: 'absolute',
							left: 315 - 120,
							top: 496 - 190,
							transform: 'scale(0.66)',
							transformOrigin: '120px 190px',
						}}
					>
						<MedicalKit variant="monitor" healthy={false} />
					</div>
					<DoctorCharacter
						pose="point"
						expression="worried"
						style={{position: 'absolute', left: 535 - 420, top: 496 - 860, scale: 0.54}}
					/>
					<div
						style={{
							position: 'absolute',
							left: 24,
							top: 18,
							fontSize: 18,
							fontWeight: 700,
							backgroundColor: '#f1ede6',
							padding: '5px 14px',
							borderRadius: 999,
						}}
					>
						Doctor + MedicalKit + ServerRack(down)
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};
