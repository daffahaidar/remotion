import React from 'react';
import {Series, staticFile, useVideoConfig} from 'remotion';
import {ChannelOutro, OUTRO_SECONDS} from '../shared/ChannelOutro';
import {Backsound} from '../shared/ui';
import {Anatomy} from './scenes/Anatomy';
import {Flow} from './scenes/Flow';
import {Hook} from './scenes/Hook';
import {NotLogin} from './scenes/NotLogin';
import {OldWay} from './scenes/OldWay';
import {Pkce} from './scenes/Pkce';
import {Problem} from './scenes/Problem';
import {Recap} from './scenes/Recap';
import {Redirect} from './scenes/Redirect';
import {ShadyAppFails} from './scenes/ShadyAppFails';
import {VisitorPass} from './scenes/VisitorPass';

/**
 * Scene lengths in seconds, matching script_dubbing.md. Retime here to fit your voice-over;
 * the composition length follows automatically. (The backsound's sections, in
 * src/content/shared/generate-audio.mjs, are cut for these values.)
 */
export const SCENE_SECONDS = {
	hook: 12,
	problem: 10,
	oldWay: 12,
	visitorPass: 14,
	anatomy: 18,
	notLogin: 12,
	redirect: 18,
	flow: 20,
	shadyAppFails: 18,
	pkce: 12,
	recap: 12,
	outro: OUTRO_SECONDS,
} as const;
export const TOTAL_SECONDS = Object.values(SCENE_SECONDS).reduce((a: number, b) => a + b, 0);

/** Where the "TAPI..." twist starts: the backsound drops out there for a beat. */
const TWIST_SECONDS =
	SCENE_SECONDS.hook + SCENE_SECONDS.problem + SCENE_SECONDS.oldWay + SCENE_SECONDS.visitorPass + SCENE_SECONDS.anatomy;

export type HowOauthWorksProps = {
	/** 0 = mute the backsound (e.g. when adding a trending sound in-app). */
	readonly musicVolume: number;
};

export const HowOauthWorks: React.FC<HowOauthWorksProps> = ({musicVolume}) => {
	const {fps} = useVideoConfig();
	return (
		<>
			<Series>
				<Series.Sequence name="01 Hook" durationInFrames={SCENE_SECONDS.hook * fps}>
					<Hook />
				</Series.Sequence>
				<Series.Sequence name="02 Masalahnya" durationInFrames={SCENE_SECONDS.problem * fps}>
					<Problem />
				</Series.Sequence>
				<Series.Sequence name="03 Cara lama" durationInFrames={SCENE_SECONDS.oldWay * fps}>
					<OldWay />
				</Series.Sequence>
				<Series.Sequence name="04 Kartu tamu" durationInFrames={SCENE_SECONDS.visitorPass * fps}>
					<VisitorPass />
				</Series.Sequence>
				<Series.Sequence name="05 Anatomi OAuth" durationInFrames={SCENE_SECONDS.anatomy * fps}>
					<Anatomy />
				</Series.Sequence>
				<Series.Sequence name="06 Bukan buat login" durationInFrames={SCENE_SECONDS.notLogin * fps}>
					<NotLogin />
				</Series.Sequence>
				<Series.Sequence name="07 Rahasianya" durationInFrames={SCENE_SECONDS.redirect * fps}>
					<Redirect />
				</Series.Sequence>
				<Series.Sequence name="08 Alur lengkap" durationInFrames={SCENE_SECONDS.flow * fps}>
					<Flow />
				</Series.Sequence>
				<Series.Sequence name="09 Aplikasi nakal gagal" durationInFrames={SCENE_SECONDS.shadyAppFails * fps}>
					<ShadyAppFails />
				</Series.Sequence>
				<Series.Sequence name="10 PKCE" durationInFrames={SCENE_SECONDS.pkce * fps}>
					<Pkce />
				</Series.Sequence>
				<Series.Sequence name="11 Rangkuman" durationInFrames={SCENE_SECONDS.recap * fps}>
					<Recap />
				</Series.Sequence>
				<Series.Sequence name="12 Outro channel" durationInFrames={SCENE_SECONDS.outro * fps}>
					<ChannelOutro nextTopic="Cara Kerja Internet" nextQuestion="Apa yang terjadi saat kita buka Google?" />
				</Series.Sequence>
			</Series>
			<Backsound src={staticFile('audio/music/how-oauth-works.mp3')} volume={musicVolume} dropAt={TWIST_SECONDS} />
		</>
	);
};
