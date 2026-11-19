import {loadFont} from '@remotion/google-fonts/Fredoka';
import React from 'react';
import {AbsoluteFill, Easing, Interactive, Track, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Character} from './assets/character';

loadFont('normal', {weights: ['600'], subsets: ['latin']});

/** Showreel of the rig: talking, turnaround, walking, pointing, surprise, thinking. */
export const RigDemo: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	return (
		<AbsoluteFill style={{background: 'linear-gradient(#cfe8ff, #f4faff)'}}>
			<Interactive.Div
				name="Floor"
				style={{position: 'absolute', left: 0, top: 975, width: 1920, height: 105, backgroundColor: '#d6e6f4'}}
			/>

			<Track name="Mascot">
				<Character
					name="Hello"
					durationInFrames={3 * fps}
					pose="wave"
					expression="happy"
					talking
					style={{translate: '540px 120px', scale: 0.9}}
				/>
				<Character
					name="Turnaround"
					from={3 * fps}
					durationInFrames={3 * fps}
					yaw={interpolate(frame, [3.3 * fps, 5.7 * fps], [0, 360], {
						easing: Easing.bezier(0.65, 0, 0.35, 1),
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					})}
					style={{translate: '540px 120px', scale: 0.9}}
				/>
				<Character
					name="Walk"
					from={6 * fps}
					durationInFrames={4 * fps}
					motion="walk"
					speed={1.25}
					yaw={90}
					style={{
						translate: interpolate(frame, [6 * fps, 10 * fps], ['-120px 120px', '564px 120px'], {
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						}),
						scale: 0.9,
					}}
				/>
				<Character
					name="Point"
					from={10 * fps}
					durationInFrames={3 * fps}
					pose="idle"
					poseTo="point"
					poseBlend={interpolate(frame, [10.2 * fps, 10.6 * fps], [0, 1], {
						easing: Easing.bezier(0.16, 1, 0.3, 1),
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					})}
					expression="happy"
					talking
					style={{translate: '900px 120px', scale: 0.9}}
				/>
				<Character
					name="Surprise"
					from={13 * fps}
					durationInFrames={2 * fps}
					pose="surprised"
					expression="surprised"
					expressionTo="jawDrop"
					expressionBlend={interpolate(frame, [13.4 * fps, 13.6 * fps], [0, 1], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					})}
					style={{
						translate: '540px 120px',
						scale: interpolate(frame, [13 * fps, 13.5 * fps], [0.7, 0.9], {
							easing: Easing.spring({damping: 10}),
							output: 'perceptual-scale',
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						}),
					}}
				/>
				<Character
					name="Think"
					from={15 * fps}
					durationInFrames={3 * fps}
					pose="think"
					expression="thinking"
					style={{translate: '540px 120px', scale: 0.9}}
				/>
			</Track>

			<Track name="Labels">
				<Interactive.Div
					name="Label talk"
					durationInFrames={3 * fps}
					style={{
						position: 'absolute',
						left: 150,
						top: 100,
						fontFamily: 'Fredoka',
						fontSize: 78,
						fontWeight: 600,
						color: '#24324a',
					}}
				>
					Bicara + melambai
				</Interactive.Div>
				<Interactive.Div
					name="Label turn"
					from={3 * fps}
					durationInFrames={3 * fps}
					style={{
						position: 'absolute',
						left: 150,
						top: 100,
						fontFamily: 'Fredoka',
						fontSize: 78,
						fontWeight: 600,
						color: '#24324a',
					}}
				>
					Turnaround 360°
				</Interactive.Div>
				<Interactive.Div
					name="Label walk"
					from={6 * fps}
					durationInFrames={4 * fps}
					style={{
						position: 'absolute',
						left: 150,
						top: 100,
						fontFamily: 'Fredoka',
						fontSize: 78,
						fontWeight: 600,
						color: '#24324a',
					}}
				>
					Berjalan
				</Interactive.Div>
				<Interactive.Div
					name="Label point"
					from={10 * fps}
					durationInFrames={3 * fps}
					style={{
						position: 'absolute',
						left: 150,
						top: 100,
						fontFamily: 'Fredoka',
						fontSize: 78,
						fontWeight: 600,
						color: '#24324a',
					}}
				>
					Menunjuk
				</Interactive.Div>
				<Interactive.Div
					name="Label surprise"
					from={13 * fps}
					durationInFrames={2 * fps}
					style={{
						position: 'absolute',
						left: 150,
						top: 100,
						fontFamily: 'Fredoka',
						fontSize: 78,
						fontWeight: 600,
						color: '#24324a',
					}}
				>
					Terkejut
				</Interactive.Div>
				<Interactive.Div
					name="Label think"
					from={15 * fps}
					durationInFrames={3 * fps}
					style={{
						position: 'absolute',
						left: 150,
						top: 100,
						fontFamily: 'Fredoka',
						fontSize: 78,
						fontWeight: 600,
						color: '#24324a',
					}}
				>
					Berpikir
				</Interactive.Div>
			</Track>

			<Track name="Callouts">
				<Interactive.Div
					name="Callout card"
					from={10.3 * fps}
					durationInFrames={2.7 * fps}
					style={{
						position: 'absolute',
						left: 170,
						top: 400,
						padding: '24px 56px',
						borderRadius: 40,
						backgroundColor: '#ffffff',
						border: '8px solid #1f1a1f',
						fontFamily: 'Fredoka',
						fontSize: 150,
						fontWeight: 600,
						color: '#24324a',
						scale: interpolate(frame, [10.3 * fps, 10.7 * fps], [0, 1], {
							easing: Easing.spring({damping: 12}),
							output: 'perceptual-scale',
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						}),
					}}
				>
					Lihat ini!
				</Interactive.Div>
				<Interactive.Div
					name="Thought bubble"
					from={15.5 * fps}
					durationInFrames={2.5 * fps}
					style={{
						position: 'absolute',
						left: 1230,
						top: 170,
						padding: '20px 50px',
						borderRadius: 80,
						backgroundColor: '#ffffff',
						border: '8px solid #1f1a1f',
						fontFamily: 'Fredoka',
						fontSize: 110,
						fontWeight: 600,
						color: '#24324a',
						scale: interpolate(frame, [15.5 * fps, 15.9 * fps], [0, 1], {
							easing: Easing.spring({damping: 12}),
							output: 'perceptual-scale',
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						}),
					}}
				>
					Hmm…
				</Interactive.Div>
			</Track>
		</AbsoluteFill>
	);
};
