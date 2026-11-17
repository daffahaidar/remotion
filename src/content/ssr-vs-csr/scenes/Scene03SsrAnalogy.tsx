import React from 'react';
import {FaArrowDown, FaServer} from 'react-icons/fa6';
import {LuSparkles} from 'react-icons/lu';
import {Easing, Interactive, Track, interpolate, useCurrentFrame} from 'remotion';
import {ManCharacter, WomanCharacter} from '../../../../character';
import {
	CartoonCard,
	SceneBackground,
	SpeechBubble,
	TopScenePill,
} from '../components/CartoonUi';
import {
	ChefHatOverlay,
	ClochePlateProp,
	DiningTableProp,
	KitchenStoveStage,
} from '../components/RestaurantProps';
import {FONTS, PALETTE, SAFE_AREA, fadeIn, popScale, resolveCharacterBeats} from '../theme';

const Scene03SsrAnalogyInner: React.FC = () => {
	const frame = useCurrentFrame();

	const camScale = interpolate(frame, [0, 490, 580, 600], [1, 1.02, 1.08, 1.15], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Customer Woman reacts: Orders (0..135) -> Waits happily (135..405) -> Cheers & Eats (405..600)
	const customerBeat = resolveCharacterBeats(frame, [
		{frame: 0, pose: 'pointUp', expression: 'happy'},
		{frame: 140, pose: 'listen', expression: 'neutral'},
		{frame: 385, pose: 'surprised', expression: 'excited'},
		{frame: 420, pose: 'cheer', expression: 'laugh'},
	]);

	// Chef Man in kitchen window
	const chefBeat = resolveCharacterBeats(frame, [
		{frame: 0, pose: 'idle', expression: 'neutral'},
		{frame: 120, pose: 'typing', expression: 'focused'},
		{frame: 270, pose: 'thumbsUp', expression: 'proud'},
	]);

	// Cooking progress (f = 135..275)
	const cookProgress = interpolate(frame, [135, 275], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const isCooking = frame >= 135 && frame < 275;

	// Waiter delivery: Cloche glides from Kitchen (y=585) down to Dining Table (y=1185) at f=280..395
	const deliveryProgress = interpolate(frame, [280, 390], [0, 1], {
		easing: Easing.bezier(0.16, 1, 0.3, 1),
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const clocheY = interpolate(deliveryProgress, [0, 1], [595, 1175], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const clocheX = interpolate(deliveryProgress, [0, 1], [380, 560], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Lid lifts at f=405..435
	const lidOpen = interpolate(frame, [405, 435], [0, 1], {
		easing: Easing.spring({damping: 10}),
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Match-cut morph: plate transforms into HTML website card at f=510..585
	const morphToHtml = interpolate(frame, [510, 565], [0, 1], {
		easing: Easing.bezier(0.65, 0, 0.35, 1),
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const morphCenterX = interpolate(morphToHtml, [0, 1], [clocheX, 315], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const morphCenterY = interpolate(morphToHtml, [0, 1], [clocheY, 685], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<>
			<SceneBackground theme="restaurant" cameraScale={camScale} />

			<TopScenePill
				step="03"
				title="SSR = DIMASAK DI DAPUR"
				bg={PALETTE.ssrMain}
				icon={<FaServer size={24} color={PALETTE.white} />}
			/>

			{/* Kitchen Stage at top */}
			<Track name="Kitchen">
				<Interactive.Div
					name="Area Dapur Koki"
					style={{
						position: 'absolute',
						top: 256,
						left: SAFE_AREA.left,
						width: SAFE_AREA.contentWidth,
						display: 'flex',
						alignItems: 'center',
						gap: 18,
					}}
				>
					{/* Mini Chef Box */}
					<CartoonCard
						bg="#ecfdf5"
						style={{
							width: 390,
							height: 300,
							position: 'relative',
							overflow: 'hidden',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<div
							style={{
								fontFamily: FONTS.display,
								fontSize: 26,
								fontWeight: 700,
								color: PALETTE.ssrDark,
								zIndex: 2,
							}}
						>
							KOKI = SERVER
						</div>
						<div style={{position: 'relative', width: 260, height: 225}}>
							<ManCharacter
								name="Koki Dapur"
								framing="bust"
								seed="chef-03"
								pose={chefBeat.pose}
								poseTo={chefBeat.poseTo}
								poseBlend={chefBeat.poseBlend}
								expression={chefBeat.expression}
								expressionTo={chefBeat.expressionTo}
								expressionBlend={chefBeat.expressionBlend}
								style={{position: 'absolute', left: 0, top: 0, translate: '-150px -315px', scale: 0.34}}
							/>
							<ChefHatOverlay style={{position: 'absolute', top: -8, left: 46, transform: 'scale(0.5)'}} />
						</div>
					</CartoonCard>

					<KitchenStoveStage
						isCooking={isCooking}
						progress={cookProgress}
						label={cookProgress >= 1 ? 'MATANG! SIAP!' : 'LAGI DIMASAK...'}
						style={{flex: 1, height: 300}}
					/>
				</Interactive.Div>

				{/* Waiter delivery arrow & badge */}
				{frame >= 270 && frame < 510 ? (
					<Interactive.Div
						name="Pelayan Antar Makanan"
						style={{
							position: 'absolute',
							top: 635,
							left: 110,
							display: 'flex',
							alignItems: 'center',
							gap: 14,
							backgroundColor: '#fef9c3',
							border: `5px solid ${PALETTE.ink}`,
							boxShadow: `0 7px 0 ${PALETTE.ink}`,
							borderRadius: 24,
							padding: '12px 22px',
							scale: popScale(frame, 270, 12),
						}}
					>
						<FaArrowDown size={28} color="#d97706" />
						<span style={{fontFamily: FONTS.display, fontSize: 30, fontWeight: 700, color: PALETTE.ink}}>
							Pelayan Mengantarkan...
						</span>
					</Interactive.Div>
				) : null}
			</Track>

			{/* Customer & Presenter at bottom */}
			<Track name="Actors">
				<ManCharacter
					name="Presenter SSR"
					from={0}
					durationInFrames={600}
					seed="presenter-03"
					pose={frame < 135 ? 'present' : frame < 405 ? 'pointUp' : 'thumbsUp'}
					expression={frame < 405 ? 'happy' : 'proud'}
					talking={frame < 500}
					yaw={22}
					lookY={frame < 280 ? -0.6 : 0}
					style={{
						position: 'absolute',
						left: 0,
						top: 0,
						translate: '-170px 568px',
						scale: 0.62,
					}}
				/>

				<WomanCharacter
					name="Pelanggan Meja"
					from={0}
					durationInFrames={600}
					seed="customer-03"
					pose={customerBeat.pose}
					poseTo={customerBeat.poseTo}
					poseBlend={customerBeat.poseBlend}
					expression={customerBeat.expression}
					expressionTo={customerBeat.expressionTo}
					expressionBlend={customerBeat.expressionBlend}
					talking={frame < 120}
					yaw={-24}
					style={{
						position: 'absolute',
						left: 0,
						top: 0,
						translate: '300px 568px',
						scale: 0.64,
					}}
				/>
			</Track>

			{/* Dining Table */}
			<Interactive.Div
				name="Meja Pelanggan SSR"
				style={{
					position: 'absolute',
					top: 1310,
					left: 500,
				}}
			>
				<DiningTableProp width={440} />
			</Interactive.Div>

			{/* Speech Bubbles */}
			{frame >= 15 && frame <= 135 ? (
				<div style={{position: 'absolute', left: 495, top: 845, transform: `scale(${popScale(frame, 15, 12)})`}}>
					<SpeechBubble text="Pesan makanan, ya!" bg="#ecfdf5" tailSide="bottom-right" />
				</div>
			) : null}

			{frame >= 420 && frame < 515 ? (
				<div style={{position: 'absolute', left: 460, top: 845, transform: `scale(${popScale(frame, 420, 12)})`}}>
					<SpeechBubble text="Langsung santap!" bg="#dcfce7" tailSide="bottom-right" />
				</div>
			) : null}

			{/* Cloche Plate that travels from kitchen to table & morphs into HTML! */}
			{frame >= 265 ? (
				<Interactive.Div
					name="Piring Morph HTML"
					style={{
						position: 'absolute',
						left: morphCenterX,
						top: morphCenterY,
						opacity: fadeIn(frame, 265, 8),
					}}
				>
					<ClochePlateProp lidOpenProgress={lidOpen} morphToHtml={morphToHtml} label="HTML SSR Siap!" />
					{morphToHtml > 0.65 ? (
						<div
							style={{
								marginTop: 12,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 8,
								backgroundColor: PALETTE.ssrMain,
								border: `4px solid ${PALETTE.ink}`,
								borderRadius: 999,
								padding: '6px 16px',
								fontFamily: FONTS.display,
								fontSize: 24,
								fontWeight: 700,
								color: PALETTE.white,
							}}
						>
							<LuSparkles size={20} color={PALETTE.white} />
							<span>Sama Seperti HTML Jadi!</span>
						</div>
					) : null}
				</Interactive.Div>
			) : null}
		</>
	);
};

export const Scene03SsrAnalogy = Interactive.create({
	Component: Scene03SsrAnalogyInner,
	layout: 'absolute-fill',
	componentName: 'Scene03SsrAnalogy',
});
