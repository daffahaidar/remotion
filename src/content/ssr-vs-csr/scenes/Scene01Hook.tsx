import React from 'react';
import {FaCircleCheck, FaSpinner} from 'react-icons/fa6';
import {LuSparkles} from 'react-icons/lu';
import {Easing, Interactive, Track, interpolate, useCurrentFrame} from 'remotion';
import {ManCharacter} from '../../../../character';
import {
	BrowserWindow,
	SceneBackground,
	SpeechBubble,
	TopScenePill,
} from '../components/CartoonUi';
import {CartoonLaptop} from '../components/RestaurantProps';
import {
	FONTS,
	PALETTE,
	SAFE_AREA,
	fadeIn,
	popScale,
	resolveCharacterBeats,
	slideProgress,
} from '../theme';

const Scene01HookInner: React.FC = () => {
	const frame = useCurrentFrame();

	const camScale = interpolate(frame, [0, 330, 360], [1, 1.03, 1.08], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const camY = interpolate(frame, [0, 180, 360], [0, -14, -26], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Presenter entrance from bottom with anticipation + squash/stretch
	const enterProgress = slideProgress(frame, 0, 22);
	const presenterY = interpolate(enterProgress, [0, 1], [1080, 575], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const landingSquash =
		frame < 28
			? interpolate(frame, [0, 18, 23, 28], [0.66, 0.7, 0.61, 0.65], {
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
				})
			: 0.65;

	const presenterBeat = resolveCharacterBeats(frame, [
		{frame: 0, pose: 'wave', expression: 'happy'},
		{frame: 40, pose: 'pointUp', expression: 'excited'},
		{frame: 118, pose: 'shrug', expression: 'confused'},
		{frame: 225, pose: 'cheer', expression: 'eureka'},
		{frame: 270, pose: 'present', expression: 'determined'},
	]);

	// Look direction follows Browser #1 (top) -> Browser #2 (mid) -> Camera
	const lookX = interpolate(frame, [0, 45, 125, 225, 260], [0, -0.35, 0.35, 0, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const lookY = interpolate(frame, [0, 45, 125, 225, 260], [0, -0.65, -0.45, -0.5, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Laptop pops in and slides cleanly aside after launching windows
	const laptopScale = popScale(frame, 14, 14, 10) *
		interpolate(frame, [38, 65], [1, 0.52], {
			easing: Easing.bezier(0.16, 1, 0.3, 1),
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		});
	const laptopY = interpolate(frame, [14, 40, 68], [480, 440, 1020], {
		easing: Easing.bezier(0.16, 1, 0.3, 1),
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const laptopX = interpolate(frame, [38, 68], [300, 620], {
		easing: Easing.bezier(0.16, 1, 0.3, 1),
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const browser1Scale = popScale(frame, 38, 16, 11);
	const browser2Scale = popScale(frame, 114, 16, 11);
	const heroTitleScale = popScale(frame, 224, 16, 10);

	const introQuestionOpacity = interpolate(frame, [8, 20, 212, 226], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<>
			<SceneBackground theme="sky" cameraScale={camScale} cameraY={camY} />

			<TopScenePill
				step="01"
				title="KENAPA BEDA KECEPATAN?"
				bg="#2563eb"
				icon={<LuSparkles size={26} color={PALETTE.white} />}
			/>

			<Track name="Props">
				{/* Intro question banner before big SSR vs CSR title */}
				<Interactive.Div
					name="Hook Question Banner"
					style={{
						position: 'absolute',
						top: 248,
						left: SAFE_AREA.left,
						width: SAFE_AREA.contentWidth,
						display: 'flex',
						justifyContent: 'center',
						opacity: introQuestionOpacity,
					}}
				>
					<div
						style={{
							fontFamily: FONTS.display,
							fontSize: 44,
							fontWeight: 700,
							color: PALETTE.ink,
							textAlign: 'center',
							backgroundColor: '#fef9c3',
							border: `5px solid ${PALETTE.ink}`,
							boxShadow: `0 7px 0 ${PALETTE.ink}`,
							borderRadius: 24,
							padding: '12px 28px',
						}}
					>
						Buka Website, Kok Beda-Beda?
					</div>
				</Interactive.Div>

				{/* Big Hero Title: SSR vs CSR */}
				<Interactive.Div
					name="Hero Title SSR vs CSR"
					from={222}
					durationInFrames={138}
					style={{
						position: 'absolute',
						top: 236,
						left: SAFE_AREA.left,
						width: SAFE_AREA.contentWidth,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 8,
						scale: heroTitleScale,
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 18,
							backgroundColor: PALETTE.white,
							border: `6px solid ${PALETTE.ink}`,
							boxShadow: `0 10px 0 ${PALETTE.ink}`,
							borderRadius: 30,
							padding: '14px 36px',
						}}
					>
						<span
							style={{
								fontFamily: FONTS.display,
								fontSize: 74,
								fontWeight: 700,
								color: PALETTE.ssrMain,
							}}
						>
							SSR
						</span>
						<span
							style={{
								fontFamily: FONTS.display,
								fontSize: 52,
								fontWeight: 700,
								color: PALETTE.ink,
							}}
						>
							vs
						</span>
						<span
							style={{
								fontFamily: FONTS.display,
								fontSize: 74,
								fontWeight: 700,
								color: PALETTE.csrMain,
							}}
						>
							CSR
						</span>
					</div>
				</Interactive.Div>

				{/* Browser #1: Instant content */}
				<Interactive.Div
					name="Browser Instant (SSR)"
					from={36}
					durationInFrames={324}
					style={{
						position: 'absolute',
						top: 365,
						left: SAFE_AREA.left + 16,
						scale: browser1Scale,
					}}
				>
					<BrowserWindow
						title="Konten Langsung Muncul!"
						url="web-cepat.id"
						mode="ssr-ready"
						accentColor={PALETTE.ssrMain}
						statusText="INSTAN"
						width={840}
					/>
					<div
						style={{
							position: 'absolute',
							left: 20,
							top: -22,
							backgroundColor: PALETTE.ssrMain,
							border: `5px solid ${PALETTE.ink}`,
							boxShadow: `0 5px 0 ${PALETTE.ink}`,
							borderRadius: 999,
							padding: '5px 15px',
							display: 'flex',
							alignItems: 'center',
							gap: 8,
							fontFamily: FONTS.display,
							fontSize: 22,
							fontWeight: 700,
							color: PALETTE.white,
							opacity: fadeIn(frame, 48, 8),
						}}
					>
						<FaCircleCheck size={18} color={PALETTE.white} />
						<span>0.2s Siap!</span>
					</div>
				</Interactive.Div>

				{/* Browser #2: Loading spinner */}
				<Interactive.Div
					name="Browser Loading (CSR)"
					from={112}
					durationInFrames={248}
					style={{
						position: 'absolute',
						top: 632,
						left: SAFE_AREA.left + 16,
						scale: browser2Scale,
					}}
				>
					<BrowserWindow
						title="Loading muter-muter..."
						url="web-client.id"
						mode="csr-loading"
						accentColor={PALETTE.csrMain}
						statusText="TUNGGU"
						width={840}
					/>
					<div
						style={{
							position: 'absolute',
							left: 20,
							top: -22,
							backgroundColor: PALETTE.csrMain,
							border: `5px solid ${PALETTE.ink}`,
							boxShadow: `0 5px 0 ${PALETTE.ink}`,
							borderRadius: 999,
							padding: '5px 15px',
							display: 'flex',
							alignItems: 'center',
							gap: 8,
							fontFamily: FONTS.display,
							fontSize: 22,
							fontWeight: 700,
							color: PALETTE.white,
							opacity: fadeIn(frame, 126, 8),
						}}
					>
						<FaSpinner size={18} color={PALETTE.white} />
						<span>Masih Kosong...</span>
					</div>
				</Interactive.Div>

				{/* Laptop prop */}
				<Interactive.Div
					name="Laptop Prop"
					style={{
						position: 'absolute',
						left: laptopX,
						top: laptopY,
						opacity: fadeIn(frame, 14, 6),
					}}
				>
					<CartoonLaptop scale={laptopScale} screenGlow={frame >= 114 ? '#fb923c' : '#10b981'} />
				</Interactive.Div>
			</Track>

			<Track name="Presenter">
				<ManCharacter
					name="Presenter Utama"
					from={0}
					durationInFrames={360}
					seed="presenter-01"
					pose={presenterBeat.pose}
					poseTo={presenterBeat.poseTo}
					poseBlend={presenterBeat.poseBlend}
					expression={presenterBeat.expression}
					expressionTo={presenterBeat.expressionTo}
					expressionBlend={presenterBeat.expressionBlend}
					talking={frame >= 8 && frame <= 350}
					yaw={frame > 105 && frame < 225 ? -14 : 12}
					lookX={lookX}
					lookY={lookY}
					style={{
						position: 'absolute',
						left: 0,
						top: 0,
						translate: `${frame > 50 ? -70 : 90}px ${Math.round(presenterY)}px`,
						scale: landingSquash,
					}}
				/>
			</Track>

			{/* Side reaction callout */}
			{frame >= 130 && frame < 225 ? (
				<div
					style={{
						position: 'absolute',
						left: 525,
						top: 945,
						transform: `scale(${popScale(frame, 130, 12)})`,
					}}
				>
					<SpeechBubble text="Kok muter terus?!" bg="#fef3c7" tailSide="bottom-left" />
				</div>
			) : null}

			{frame >= 240 ? (
				<div
					style={{
						position: 'absolute',
						left: 510,
						top: 945,
						transform: `scale(${popScale(frame, 240, 12)})`,
					}}
				>
					<SpeechBubble text="Yuk bahas di Next.js!" bg="#d1fae5" tailSide="bottom-left" />
				</div>
			) : null}
		</>
	);
};

export const Scene01Hook = Interactive.create({
	Component: Scene01HookInner,
	layout: 'absolute-fill',
	componentName: 'Scene01Hook',
});
