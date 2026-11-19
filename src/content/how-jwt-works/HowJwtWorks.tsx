import {Audio} from '@remotion/media';
import React from 'react';
import {interpolate, Series, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Anatomy} from './scenes/Anatomy';
import {Expiry} from './scenes/Expiry';
import {Flow} from './scenes/Flow';
import {HackerFails} from './scenes/HackerFails';
import {Hook} from './scenes/Hook';
import {NotEncrypted} from './scenes/NotEncrypted';
import {Recap} from './scenes/Recap';
import {Session} from './scenes/Session';
import {Signature} from './scenes/Signature';
import {Stateless} from './scenes/Stateless';
import {Wristband} from './scenes/Wristband';

/**
 * Scene lengths in seconds, matching script_dubbing.md. Retime here to fit your voice-over;
 * the composition length follows automatically. (The backsound's sections are cut for these values.)
 */
export const SCENE_SECONDS = {
	hook: 12,
	stateless: 13,
	session: 14,
	wristband: 13,
	anatomy: 22,
	notEncrypted: 12,
	signature: 16,
	flow: 22,
	hackerFails: 18,
	expiry: 12,
	recap: 17,
} as const;
export const TOTAL_SECONDS = Object.values(SCENE_SECONDS).reduce((a: number, b) => a + b, 0);

/** Where the "TAPI..." twist starts: the backsound drops out there for a beat. */
const TWIST_SECONDS = SCENE_SECONDS.hook + SCENE_SECONDS.stateless + SCENE_SECONDS.session + SCENE_SECONDS.wristband + SCENE_SECONDS.anatomy;

export type HowJwtWorksProps = {
	/** 0 = mute the backsound (e.g. when adding a trending sound in-app). */
	readonly musicVolume: number;
};

const Backsound: React.FC<{readonly volume: number}> = ({volume}) => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();
	const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
	const twist = TWIST_SECONDS * fps;
	const fadeIn = interpolate(frame, [0, 0.3 * fps], [0, 1], clamp);
	const dropout = interpolate(frame, [twist - 2, twist, twist + 1.1 * fps, twist + 1.6 * fps], [1, 0, 0, 1], clamp);
	const fadeOut = interpolate(frame, [durationInFrames - 3 * fps, durationInFrames], [1, 0], clamp);
	return <Audio name="Backsound" src={staticFile('audio/music/how-jwt-works.mp3')} volume={volume * fadeIn * dropout * fadeOut} />;
};

export const HowJwtWorks: React.FC<HowJwtWorksProps> = ({musicVolume}) => {
	const {fps} = useVideoConfig();
	return (
		<>
			<Series>
				<Series.Sequence name="01 Hook" durationInFrames={SCENE_SECONDS.hook * fps}>
					<Hook />
				</Series.Sequence>
				<Series.Sequence name="02 Server pelupa" durationInFrames={SCENE_SECONDS.stateless * fps}>
					<Stateless />
				</Series.Sequence>
				<Series.Sequence name="03 Session" durationInFrames={SCENE_SECONDS.session * fps}>
					<Session />
				</Series.Sequence>
				<Series.Sequence name="04 Gelang konser" durationInFrames={SCENE_SECONDS.wristband * fps}>
					<Wristband />
				</Series.Sequence>
				<Series.Sequence name="05 Anatomi JWT" durationInFrames={SCENE_SECONDS.anatomy * fps}>
					<Anatomy />
				</Series.Sequence>
				<Series.Sequence name="06 Bukan enkripsi" durationInFrames={SCENE_SECONDS.notEncrypted * fps}>
					<NotEncrypted />
				</Series.Sequence>
				<Series.Sequence name="07 Signature" durationInFrames={SCENE_SECONDS.signature * fps}>
					<Signature />
				</Series.Sequence>
				<Series.Sequence name="08 Alur lengkap" durationInFrames={SCENE_SECONDS.flow * fps}>
					<Flow />
				</Series.Sequence>
				<Series.Sequence name="09 Hacker gagal" durationInFrames={SCENE_SECONDS.hackerFails * fps}>
					<HackerFails />
				</Series.Sequence>
				<Series.Sequence name="10 Masa berlaku" durationInFrames={SCENE_SECONDS.expiry * fps}>
					<Expiry />
				</Series.Sequence>
				<Series.Sequence name="11 Rangkuman & CTA" durationInFrames={SCENE_SECONDS.recap * fps}>
					<Recap />
				</Series.Sequence>
			</Series>
			<Backsound volume={musicVolume} />
		</>
	);
};
