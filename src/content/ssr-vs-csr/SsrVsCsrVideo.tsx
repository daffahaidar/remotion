import React from 'react';
import {AbsoluteFill, Html5Audio, Sequence, Track, staticFile} from 'remotion';
import {ObjectTransitionCurtain, SubtitleOverlay} from './components/CartoonUi';
import {Scene01Hook} from './scenes/Scene01Hook';
import {Scene02RestaurantIntro} from './scenes/Scene02RestaurantIntro';
import {Scene03SsrAnalogy} from './scenes/Scene03SsrAnalogy';
import {Scene04SsrTech} from './scenes/Scene04SsrTech';
import {Scene05CsrAnalogy} from './scenes/Scene05CsrAnalogy';
import {Scene06CsrTech} from './scenes/Scene06CsrTech';
import {Scene07Comparison} from './scenes/Scene07Comparison';
import {Scene08NextJsTwist} from './scenes/Scene08NextJsTwist';
import {Scene09Closing} from './scenes/Scene09Closing';
import {PALETTE, SCENE_TIMINGS, VIDEO_CONFIG} from './theme';

export type SsrVsCsrVideoProps = {
	readonly showSubtitles?: boolean;
	readonly channelHandle?: string;
	readonly voiceoverFile?: string;
	readonly enableSfx?: boolean;
};

export const SsrVsCsrVideo: React.FC<SsrVsCsrVideoProps> = ({
	showSubtitles = true,
	channelHandle = '@BelajarCoding',
	voiceoverFile = 'audio/voiceover-placeholder.wav',
	enableSfx = true,
}) => {
	return (
		<AbsoluteFill style={{backgroundColor: PALETTE.ink}}>
			{/* 1. Nine native 9:16 cartoon scenes */}
			<Track name="Scenes">
				<Scene01Hook
					name="01 Hook (00:00-00:12)"
					from={SCENE_TIMINGS.scene01.from}
					durationInFrames={SCENE_TIMINGS.scene01.durationInFrames}
				/>
				<Scene02RestaurantIntro
					name="02 Analogi Restoran (00:12-00:27)"
					from={SCENE_TIMINGS.scene02.from}
					durationInFrames={SCENE_TIMINGS.scene02.durationInFrames}
				/>
				<Scene03SsrAnalogy
					name="03 SSR Restoran (00:27-00:47)"
					from={SCENE_TIMINGS.scene03.from}
					durationInFrames={SCENE_TIMINGS.scene03.durationInFrames}
				/>
				<Scene04SsrTech
					name="04 SSR Teknis (00:47-01:02)"
					from={SCENE_TIMINGS.scene04.from}
					durationInFrames={SCENE_TIMINGS.scene04.durationInFrames}
				/>
				<Scene05CsrAnalogy
					name="05 CSR Restoran (01:02-01:20)"
					from={SCENE_TIMINGS.scene05.from}
					durationInFrames={SCENE_TIMINGS.scene05.durationInFrames}
				/>
				<Scene06CsrTech
					name="06 CSR Teknis (01:20-01:35)"
					from={SCENE_TIMINGS.scene06.from}
					durationInFrames={SCENE_TIMINGS.scene06.durationInFrames}
				/>
				<Scene07Comparison
					name="07 Perbandingan (01:35-01:55)"
					from={SCENE_TIMINGS.scene07.from}
					durationInFrames={SCENE_TIMINGS.scene07.durationInFrames}
				/>
				<Scene08NextJsTwist
					name="08 Plot Twist NextJS (01:55-02:10)"
					from={SCENE_TIMINGS.scene08.from}
					durationInFrames={SCENE_TIMINGS.scene08.durationInFrames}
				/>
				<Scene09Closing
					name="09 Closing (02:10-02:25)"
					from={SCENE_TIMINGS.scene09.from}
					durationInFrames={SCENE_TIMINGS.scene09.durationInFrames}
					channelHandle={channelHandle}
				/>
			</Track>

			{/* 2. Object-based circular wipe transitions across scene cuts */}
			<Track name="Transitions">
				<Sequence name="Cut 01->02" from={352} durationInFrames={16}>
					<ObjectTransitionCurtain color="#ea580c" label="RESTORAN!" />
				</Sequence>
				<Sequence name="Cut 02->03" from={802} durationInFrames={16}>
					<ObjectTransitionCurtain color={PALETTE.ssrMain} label="SSR" />
				</Sequence>
				<Sequence name="Cut 03->04" from={1402} durationInFrames={16}>
					<ObjectTransitionCurtain color="#0284c7" label="TEKNIS SSR" />
				</Sequence>
				<Sequence name="Cut 04->05" from={1852} durationInFrames={16}>
					<ObjectTransitionCurtain color={PALETTE.csrMain} label="CSR" />
				</Sequence>
				<Sequence name="Cut 05->06" from={2392} durationInFrames={16}>
					<ObjectTransitionCurtain color="#ea580c" label="TEKNIS CSR" />
				</Sequence>
				<Sequence name="Cut 06->07" from={2842} durationInFrames={16}>
					<ObjectTransitionCurtain color="#1e293b" label="VS" />
				</Sequence>
				<Sequence name="Cut 07->08" from={3442} durationInFrames={16}>
					<ObjectTransitionCurtain color={PALETTE.nextRose} label="NEXT.JS!" />
				</Sequence>
				<Sequence name="Cut 08->09" from={3892} durationInFrames={16}>
					<ObjectTransitionCurtain color={PALETTE.nextIndigo} label="KESIMPULAN" />
				</Sequence>
			</Track>

			{/* 3. Synchronized Subtitle / Narration Guide Track */}
			<Track name="Subtitles">
				<Sequence name="Subtitles" durationInFrames={VIDEO_CONFIG.durationInFrames}>
					<SubtitleOverlay enabled={showSubtitles} />
				</Sequence>
			</Track>

			{/* 4. Manual Voice-Over Track (drop in your recording at public/audio/) */}
			<Track name="VoiceOver">
				<Sequence name="VoiceOver Track" durationInFrames={VIDEO_CONFIG.durationInFrames}>
					<Html5Audio src={staticFile(voiceoverFile)} volume={1} />
				</Sequence>
			</Track>

			{/* 5. Subtle Cartoon SFX (low gain so voice-over remains crystal clear) */}
			{enableSfx ? (
				<Track name="SFX">
					<Sequence name="Pop Browser 1" from={38} durationInFrames={12}>
						<Html5Audio src={staticFile('audio/sfx/pop.wav')} volume={0.18} />
					</Sequence>
					<Sequence name="Pop Browser 2" from={114} durationInFrames={12}>
						<Html5Audio src={staticFile('audio/sfx/pop.wav')} volume={0.18} />
					</Sequence>
					<Sequence name="Hook Title Sparkle" from={224} durationInFrames={16}>
						<Html5Audio src={staticFile('audio/sfx/sparkle.wav')} volume={0.18} />
					</Sequence>
					<Sequence name="Whoosh 01->02" from={352} durationInFrames={12}>
						<Html5Audio src={staticFile('audio/sfx/whoosh.wav')} volume={0.16} />
					</Sequence>
					<Sequence name="Pop Koki" from={490} durationInFrames={12}>
						<Html5Audio src={staticFile('audio/sfx/pop.wav')} volume={0.16} />
					</Sequence>
					<Sequence name="Whoosh 02->03" from={802} durationInFrames={12}>
						<Html5Audio src={staticFile('audio/sfx/whoosh.wav')} volume={0.16} />
					</Sequence>
					<Sequence name="Ding Makanan Matang" from={1085} durationInFrames={16}>
						<Html5Audio src={staticFile('audio/sfx/ding.wav')} volume={0.2} />
					</Sequence>
					<Sequence name="Cloche Open" from={1215} durationInFrames={14}>
						<Html5Audio src={staticFile('audio/sfx/sparkle.wav')} volume={0.17} />
					</Sequence>
					<Sequence name="Whoosh 03->04" from={1402} durationInFrames={12}>
						<Html5Audio src={staticFile('audio/sfx/whoosh.wav')} volume={0.16} />
					</Sequence>
					<Sequence name="Hydration Sparkle" from={1705} durationInFrames={16}>
						<Html5Audio src={staticFile('audio/sfx/sparkle.wav')} volume={0.18} />
					</Sequence>
					<Sequence name="Button Click 1" from={1733} durationInFrames={10}>
						<Html5Audio src={staticFile('audio/sfx/click.wav')} volume={0.22} />
					</Sequence>
					<Sequence name="Button Click 2" from={1771} durationInFrames={10}>
						<Html5Audio src={staticFile('audio/sfx/click.wav')} volume={0.22} />
					</Sequence>
					<Sequence name="Whoosh 04->05" from={1852} durationInFrames={12}>
						<Html5Audio src={staticFile('audio/sfx/whoosh.wav')} volume={0.16} />
					</Sequence>
					<Sequence name="CSR Ding Matang" from={2290} durationInFrames={16}>
						<Html5Audio src={staticFile('audio/sfx/ding.wav')} volume={0.18} />
					</Sequence>
					<Sequence name="Whoosh 05->06" from={2392} durationInFrames={12}>
						<Html5Audio src={staticFile('audio/sfx/whoosh.wav')} volume={0.16} />
					</Sequence>
					<Sequence name="CSR UI Pop" from={2695} durationInFrames={12}>
						<Html5Audio src={staticFile('audio/sfx/pop.wav')} volume={0.18} />
					</Sequence>
					<Sequence name="Whoosh 06->07" from={2842} durationInFrames={12}>
						<Html5Audio src={staticFile('audio/sfx/whoosh.wav')} volume={0.16} />
					</Sequence>
					<Sequence name="Myth Buster Ding" from={3240} durationInFrames={16}>
						<Html5Audio src={staticFile('audio/sfx/ding.wav')} volume={0.18} />
					</Sequence>
					<Sequence name="Whoosh 07->08" from={3442} durationInFrames={12}>
						<Html5Audio src={staticFile('audio/sfx/whoosh.wav')} volume={0.16} />
					</Sequence>
					<Sequence name="NextJS Twist Sparkle" from={3460} durationInFrames={16}>
						<Html5Audio src={staticFile('audio/sfx/sparkle.wav')} volume={0.2} />
					</Sequence>
					<Sequence name="Use Client Punchline" from={3745} durationInFrames={16}>
						<Html5Audio src={staticFile('audio/sfx/ding.wav')} volume={0.2} />
					</Sequence>
					<Sequence name="Whoosh 08->09" from={3892} durationInFrames={12}>
						<Html5Audio src={staticFile('audio/sfx/whoosh.wav')} volume={0.16} />
					</Sequence>
					<Sequence name="Closing CTA Pop" from={4190} durationInFrames={12}>
						<Html5Audio src={staticFile('audio/sfx/sparkle.wav')} volume={0.18} />
					</Sequence>
				</Track>
			) : null}
		</AbsoluteFill>
	);
};
