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
} from '../character';
import {
	BackendProgrammerModelSheet,
	BossModelSheet,
	ChefModelSheet,
	DoctorModelSheet,
	FrontendProgrammerModelSheet,
	FullstackProgrammerModelSheet,
	HackerModelSheet,
	ModelSheet,
	ProjectManagerModelSheet,
	QualityAssuranceModelSheet,
	TechLeadModelSheet,
	WomanModelSheet,
} from './ModelSheet';
import {PropertySheet} from './PropertySheet';
import {RigDemo} from './RigDemo';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Folder name="Mascot">
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
			<Composition
				id="RigDemo"
				component={RigDemo}
				width={1920}
				height={1080}
				fps={30}
				durationInFrames={540}
			/>
			<Still id="ModelSheet" component={ModelSheet} width={2400} height={5380} />
			<Still id="WomanModelSheet" component={WomanModelSheet} width={2400} height={5380} />
			<Still
				id="FrontendProgrammerModelSheet"
				component={FrontendProgrammerModelSheet}
				width={2400}
				height={5380}
			/>
			<Still
				id="BackendProgrammerModelSheet"
				component={BackendProgrammerModelSheet}
				width={2400}
				height={5380}
			/>
			<Still id="BossModelSheet" component={BossModelSheet} width={2400} height={5380} />
			<Still id="ChefModelSheet" component={ChefModelSheet} width={2400} height={5380} />
			<Still id="DoctorModelSheet" component={DoctorModelSheet} width={2400} height={5380} />
			<Still
				id="ProjectManagerModelSheet"
				component={ProjectManagerModelSheet}
				width={2400}
				height={5380}
			/>
			<Still id="TechLeadModelSheet" component={TechLeadModelSheet} width={2400} height={5380} />
			<Still
				id="FullstackProgrammerModelSheet"
				component={FullstackProgrammerModelSheet}
				width={2400}
				height={5380}
			/>
			<Still
				id="QualityAssuranceModelSheet"
				component={QualityAssuranceModelSheet}
				width={2400}
				height={5380}
			/>
			<Still id="HackerModelSheet" component={HackerModelSheet} width={2400} height={5380} />
			</Folder>
			<Folder name="Props">
				<Still id="PropertySheet" component={PropertySheet} width={2400} height={2820} />
			</Folder>
		</>
	);
};
