import {Composition, Folder, Still} from 'remotion';
import {Character, WomanCharacter} from '../character';
import {ModelSheet, WomanModelSheet} from './ModelSheet';
import {RigDemo} from './RigDemo';
import {
	Scene01Hook,
	Scene02RestaurantIntro,
	Scene03SsrAnalogy,
	Scene04SsrTech,
	Scene05CsrAnalogy,
	Scene06CsrTech,
	Scene07Comparison,
	Scene08NextJsTwist,
	Scene09Closing,
	SsrVsCsrVideo,
} from './content/ssr-vs-csr';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="SsrVsCsrNextJs"
				component={SsrVsCsrVideo}
				width={1080}
				height={1920}
				fps={30}
				durationInFrames={4350}
				defaultProps={{
					showSubtitles: true,
					channelHandle: '@BelajarCoding',
					voiceoverFile: 'audio/voiceover-placeholder.wav',
					enableSfx: true,
				}}
			/>

			<Folder name="SsrVsCsrScenes">
				<Composition
					id="Scene01Hook"
					component={Scene01Hook}
					width={1080}
					height={1920}
					fps={30}
					durationInFrames={360}
				/>
				<Composition
					id="Scene02RestaurantIntro"
					component={Scene02RestaurantIntro}
					width={1080}
					height={1920}
					fps={30}
					durationInFrames={450}
				/>
				<Composition
					id="Scene03SsrAnalogy"
					component={Scene03SsrAnalogy}
					width={1080}
					height={1920}
					fps={30}
					durationInFrames={600}
				/>
				<Composition
					id="Scene04SsrTech"
					component={Scene04SsrTech}
					width={1080}
					height={1920}
					fps={30}
					durationInFrames={450}
				/>
				<Composition
					id="Scene05CsrAnalogy"
					component={Scene05CsrAnalogy}
					width={1080}
					height={1920}
					fps={30}
					durationInFrames={540}
				/>
				<Composition
					id="Scene06CsrTech"
					component={Scene06CsrTech}
					width={1080}
					height={1920}
					fps={30}
					durationInFrames={450}
				/>
				<Composition
					id="Scene07Comparison"
					component={Scene07Comparison}
					width={1080}
					height={1920}
					fps={30}
					durationInFrames={600}
				/>
				<Composition
					id="Scene08NextJsTwist"
					component={Scene08NextJsTwist}
					width={1080}
					height={1920}
					fps={30}
					durationInFrames={450}
				/>
				<Composition
					id="Scene09Closing"
					component={Scene09Closing}
					width={1080}
					height={1920}
					fps={30}
					durationInFrames={450}
					defaultProps={{
						channelHandle: '@BelajarCoding',
					}}
				/>
			</Folder>

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
					id="RigDemo"
					component={RigDemo}
					width={1920}
					height={1080}
					fps={30}
					durationInFrames={540}
				/>
				<Still id="ModelSheet" component={ModelSheet} width={2400} height={5380} />
				<Still id="WomanModelSheet" component={WomanModelSheet} width={2400} height={5380} />
			</Folder>
		</>
	);
};
