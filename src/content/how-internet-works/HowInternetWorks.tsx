import React from 'react';
import {Series, staticFile, useVideoConfig} from 'remotion';
import {ChannelOutro, OUTRO_SECONDS} from '../shared/ChannelOutro';
import {Backsound} from '../shared/ui';
import {Anatomy} from './scenes/Anatomy';
import {DnsLookup} from './scenes/DnsLookup';
import {Flow} from './scenes/Flow';
import {Hook} from './scenes/Hook';
import {LockTwist} from './scenes/LockTwist';
import {OldWay} from './scenes/OldWay';
import {Packets} from './scenes/Packets';
import {PhoneCall} from './scenes/PhoneCall';
import {Problem} from './scenes/Problem';
import {Recap} from './scenes/Recap';
import {SnifferFails} from './scenes/SnifferFails';

/**
 * Scene lengths in seconds, matching script_dubbing.md. Retime here to fit your voice-over;
 * the composition length follows automatically. (The backsound's sections, in
 * src/content/shared/generate-audio.mjs, are cut for these values.)
 */
export const SCENE_SECONDS = {
	hook: 12,
	problem: 14,
	oldWay: 12,
	phoneCall: 14,
	anatomy: 22,
	lockTwist: 12,
	dnsLookup: 18,
	flow: 20,
	snifferFails: 18,
	packets: 12,
	recap: 12,
	outro: OUTRO_SECONDS,
} as const;
export const TOTAL_SECONDS = Object.values(SCENE_SECONDS).reduce((a: number, b) => a + b, 0);

/** Where the "TAPI..." twist starts: the backsound drops out there for a beat. */
const TWIST_SECONDS = SCENE_SECONDS.hook + SCENE_SECONDS.problem + SCENE_SECONDS.oldWay + SCENE_SECONDS.phoneCall + SCENE_SECONDS.anatomy;

export type HowInternetWorksProps = {
	/** 0 = mute the backsound (e.g. when adding a trending sound in-app). */
	readonly musicVolume: number;
};

export const HowInternetWorks: React.FC<HowInternetWorksProps> = ({musicVolume}) => {
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
				<Series.Sequence name="04 Analogi telepon" durationInFrames={SCENE_SECONDS.phoneCall * fps}>
					<PhoneCall />
				</Series.Sequence>
				<Series.Sequence name="05 Anatomi 4 tahap" durationInFrames={SCENE_SECONDS.anatomy * fps}>
					<Anatomy />
				</Series.Sequence>
				<Series.Sequence name="06 Gembok bukan jaminan" durationInFrames={SCENE_SECONDS.lockTwist * fps}>
					<LockTwist />
				</Series.Sequence>
				<Series.Sequence name="07 Cara DNS bekerja" durationInFrames={SCENE_SECONDS.dnsLookup * fps}>
					<DnsLookup />
				</Series.Sequence>
				<Series.Sequence name="08 Alur lengkap" durationInFrames={SCENE_SECONDS.flow * fps}>
					<Flow />
				</Series.Sequence>
				<Series.Sequence name="09 Hacker gagal" durationInFrames={SCENE_SECONDS.snifferFails * fps}>
					<SnifferFails />
				</Series.Sequence>
				<Series.Sequence name="10 Paket data" durationInFrames={SCENE_SECONDS.packets * fps}>
					<Packets />
				</Series.Sequence>
				<Series.Sequence name="11 Rangkuman" durationInFrames={SCENE_SECONDS.recap * fps}>
					<Recap />
				</Series.Sequence>
				<Series.Sequence name="12 Outro channel" durationInFrames={SCENE_SECONDS.outro * fps}>
					{/* TOPIK BERIKUTNYA belum ditentukan: tanpa kartu video berikutnya. Tambahkan nextTopic + nextQuestion bila sudah ada. */}
					<ChannelOutro />
				</Series.Sequence>
			</Series>
			<Backsound src={staticFile('audio/music/how-internet-works.mp3')} volume={musicVolume} dropAt={TWIST_SECONDS} />
		</>
	);
};
