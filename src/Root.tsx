import {Composition, Folder, Still} from 'remotion';
import {
	BackendProgrammerCharacter,
	BossCharacter,
	Character,
	ChefCharacter,
	DoctorCharacter,
	FrontendProgrammerCharacter,
	FullstackProgrammerCharacter,
	HackerCharacter,
	ProjectManagerCharacter,
	QualityAssuranceCharacter,
	TechLeadCharacter,
	WomanCharacter,
} from './assets/character';
import {HowJwtWorks, TOTAL_SECONDS} from './content/how-jwt-works/HowJwtWorks';
import {HowJwtWorksThumbnail} from './content/how-jwt-works/Thumbnail';
import {HowOauthWorks, TOTAL_SECONDS as OAUTH_TOTAL_SECONDS} from './content/how-oauth-works/HowOauthWorks';
import {HowOauthWorksThumbnail} from './content/how-oauth-works/Thumbnail';
import {HowInternetWorks, TOTAL_SECONDS as INTERNET_TOTAL_SECONDS} from './content/how-internet-works/HowInternetWorks';
import {HowInternetWorksThumbnail} from './content/how-internet-works/Thumbnail';
import {ModelSheet} from './ModelSheet';
import {PropertySheet} from './PropertySheet';
import {RigDemo} from './RigDemo';

// Keep every composition explicit with inline defaultProps: Remotion Studio saves
// Props-panel edits back into this file only when they are inline object literals.
export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Folder name="Content">
				<Composition
					id="HowJwtWorks"
					component={HowJwtWorks}
					width={1080}
					height={1920}
					fps={30}
					durationInFrames={TOTAL_SECONDS * 30}
					defaultProps={{musicVolume: 0.28}}
				/>
				<Composition
					id="HowOauthWorks"
					component={HowOauthWorks}
					width={1080}
					height={1920}
					fps={30}
					durationInFrames={OAUTH_TOTAL_SECONDS * 30}
					defaultProps={{musicVolume: 0.28}}
				/>
				<Composition
					id="HowInternetWorks"
					component={HowInternetWorks}
					width={1080}
					height={1920}
					fps={30}
					durationInFrames={INTERNET_TOTAL_SECONDS * 30}
					defaultProps={{musicVolume: 0.28}}
				/>
			</Folder>

			{/* 3:4 covers, rendered to src/content/<slug>/thumbnail.png with `npx remotion still <id> <path>`. */}
			<Folder name="Thumbnails">
				<Still id="HowJwtWorksThumbnail" component={HowJwtWorksThumbnail} width={1080} height={1440} />
				<Still id="HowOauthWorksThumbnail" component={HowOauthWorksThumbnail} width={1080} height={1440} />
				<Still id="HowInternetWorksThumbnail" component={HowInternetWorksThumbnail} width={1080} height={1440} />
			</Folder>

			<Folder name="Rigs">
				<Composition
					id="MascotRig"
					component={Character}
					width={1080}
					height={1080}
					fps={30}
					durationInFrames={150}
					defaultProps={{
						expression: 'neutral',
						pose: 'idle',
						yaw: 0,
						talking: false,
						style: {translate: '120px 90px'},
					}}
				/>
				<Composition
					id="WomanRig"
					component={WomanCharacter}
					width={1080}
					height={1080}
					fps={30}
					durationInFrames={150}
					defaultProps={{
						expression: 'neutral',
						pose: 'idle',
						yaw: 0,
						talking: false,
						style: {translate: '120px 90px'},
					}}
				/>
				<Composition
					id="FrontendProgrammerRig"
					component={FrontendProgrammerCharacter}
					width={1080}
					height={1080}
					fps={30}
					durationInFrames={150}
					defaultProps={{
						expression: 'happy',
						pose: 'idle',
						yaw: 0,
						talking: false,
						showGlasses: true,
						showBadge: true,
						style: {translate: '120px 90px'},
					}}
				/>
				<Composition
					id="BackendProgrammerRig"
					component={BackendProgrammerCharacter}
					width={1080}
					height={1080}
					fps={30}
					durationInFrames={150}
					defaultProps={{
						expression: 'focused',
						pose: 'idle',
						yaw: 0,
						talking: false,
						showGlasses: true,
						showHeadphones: true,
						showBadge: true,
						style: {translate: '120px 90px'},
					}}
				/>
				<Composition
					id="BossRig"
					component={BossCharacter}
					width={1080}
					height={1080}
					fps={30}
					durationInFrames={150}
					defaultProps={{
						expression: 'determined',
						pose: 'handsOnHips',
						yaw: 0,
						talking: false,
						showGlasses: false,
						showMustache: true,
						style: {translate: '120px 90px'},
					}}
				/>
				<Composition
					id="ChefRig"
					component={ChefCharacter}
					width={1080}
					height={1080}
					fps={30}
					durationInFrames={150}
					defaultProps={{
						expression: 'proud',
						pose: 'present',
						yaw: 0,
						talking: false,
						showHat: true,
						showMustache: true,
						style: {translate: '120px 90px'},
					}}
				/>
				<Composition
					id="DoctorRig"
					component={DoctorCharacter}
					width={1080}
					height={1080}
					fps={30}
					durationInFrames={150}
					defaultProps={{
						expression: 'happy',
						pose: 'present',
						yaw: 0,
						talking: false,
						showGlasses: true,
						showStethoscope: true,
						style: {translate: '120px 90px'},
					}}
				/>
				<Composition
					id="ProjectManagerRig"
					component={ProjectManagerCharacter}
					width={1080}
					height={1080}
					fps={30}
					durationInFrames={150}
					defaultProps={{
						expression: 'happy',
						pose: 'welcome',
						yaw: 0,
						talking: false,
						showGlasses: true,
						showLanyard: true,
						style: {translate: '120px 90px'},
					}}
				/>
				<Composition
					id="TechLeadRig"
					component={TechLeadCharacter}
					width={1080}
					height={1080}
					fps={30}
					durationInFrames={150}
					defaultProps={{
						expression: 'thinking',
						pose: 'think',
						yaw: 0,
						talking: false,
						showGlasses: true,
						showGoatee: true,
						showUnderEyeBags: true,
						style: {translate: '120px 90px'},
					}}
				/>
				<Composition
					id="FullstackProgrammerRig"
					component={FullstackProgrammerCharacter}
					width={1080}
					height={1080}
					fps={30}
					durationInFrames={150}
					defaultProps={{
						expression: 'excited',
						pose: 'fistPump',
						yaw: 0,
						talking: false,
						showCap: true,
						showBadge: true,
						style: {translate: '120px 90px'},
					}}
				/>
				<Composition
					id="QualityAssuranceRig"
					component={QualityAssuranceCharacter}
					width={1080}
					height={1080}
					fps={30}
					durationInFrames={150}
					defaultProps={{
						expression: 'skeptical',
						pose: 'stop',
						yaw: 0,
						talking: false,
						showGlasses: true,
						showBadge: true,
						style: {translate: '120px 90px'},
					}}
				/>
				<Composition
					id="HackerRig"
					component={HackerCharacter}
					width={1080}
					height={1080}
					fps={30}
					durationInFrames={150}
					defaultProps={{
						expression: 'smirk',
						pose: 'armsCrossed',
						yaw: 0,
						talking: false,
						hoodUp: true,
						showMask: false,
						showBadge: true,
						style: {translate: '120px 90px'},
					}}
				/>
			</Folder>

			<Folder name="Demo">
				<Composition id="RigDemo" component={RigDemo} width={1920} height={1080} fps={30} durationInFrames={540} />
			</Folder>

			<Folder name="ModelSheets">
				<Still id="ModelSheet" component={ModelSheet} width={2400} height={5380} defaultProps={{character: 'man'}} />
				<Still
					id="WomanModelSheet"
					component={ModelSheet}
					width={2400}
					height={5380}
					defaultProps={{character: 'woman'}}
				/>
				<Still
					id="FrontendProgrammerModelSheet"
					component={ModelSheet}
					width={2400}
					height={5380}
					defaultProps={{character: 'frontend_programmer'}}
				/>
				<Still
					id="BackendProgrammerModelSheet"
					component={ModelSheet}
					width={2400}
					height={5380}
					defaultProps={{character: 'backend_programmer'}}
				/>
				<Still
					id="BossModelSheet"
					component={ModelSheet}
					width={2400}
					height={5380}
					defaultProps={{character: 'boss'}}
				/>
				<Still
					id="ChefModelSheet"
					component={ModelSheet}
					width={2400}
					height={5380}
					defaultProps={{character: 'chef'}}
				/>
				<Still
					id="DoctorModelSheet"
					component={ModelSheet}
					width={2400}
					height={5380}
					defaultProps={{character: 'doctor'}}
				/>
				<Still
					id="ProjectManagerModelSheet"
					component={ModelSheet}
					width={2400}
					height={5380}
					defaultProps={{character: 'project_manager'}}
				/>
				<Still
					id="TechLeadModelSheet"
					component={ModelSheet}
					width={2400}
					height={5380}
					defaultProps={{character: 'tech_lead'}}
				/>
				<Still
					id="FullstackProgrammerModelSheet"
					component={ModelSheet}
					width={2400}
					height={5380}
					defaultProps={{character: 'fullstack_programmer'}}
				/>
				<Still
					id="QualityAssuranceModelSheet"
					component={ModelSheet}
					width={2400}
					height={5380}
					defaultProps={{character: 'quality_assurance'}}
				/>
				<Still
					id="HackerModelSheet"
					component={ModelSheet}
					width={2400}
					height={5380}
					defaultProps={{character: 'hacker'}}
				/>
			</Folder>

			<Folder name="Props">
				<Still id="PropertySheet" component={PropertySheet} width={2400} height={3900} />
			</Folder>
		</>
	);
};
