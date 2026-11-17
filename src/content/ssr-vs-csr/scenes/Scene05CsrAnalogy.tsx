import React from 'react';
import {FaBoxOpen, FaClock} from 'react-icons/fa6';
import {LuSparkles} from 'react-icons/lu';
import {Easing, Interactive, Track, interpolate, useCurrentFrame} from 'remotion';
import {ManCharacter, WomanCharacter} from '../../../../character';
import {
	SceneBackground,
	SpeechBubble,
	TopScenePill,
} from '../components/CartoonUi';
import {
	DiningTableProp,
	KitchenStoveStage,
	RawIngredientsAndRecipe,
} from '../components/RestaurantProps';
import {FONTS, PALETTE, SAFE_AREA, fadeIn, popScale, resolveCharacterBeats} from '../theme';

const Scene05CsrAnalogyInner: React.FC = () => {
	const frame = useCurrentFrame();

	const camScale = interpolate(frame, [0, 420, 540], [1, 1.03, 1.1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Customer Woman receives crate & recipe -> reads -> cooks herself!
	const customerBeat = resolveCharacterBeats(frame, [
		{frame: 0, pose: 'listen', expression: 'happy'},
		{frame: 95, pose: 'surprised', expression: 'surprised'},
		{frame: 170, pose: 'think', expression: 'confused'},
		{frame: 265, pose: 'typing', expression: 'focused'},
		{frame: 430, pose: 'cheer', expression: 'relief'},
	]);

	// Cooking progress by customer at table (f = 265..430)
	const cookProgress = interpolate(frame, [265, 430], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const isCooking = frame >= 265 && frame < 430;

	// Morph raw ingredients into UI components (f = 435..495)
	const morphToUi = interpolate(frame, [435, 485], [0, 1], {
		easing: Easing.bezier(0.65, 0, 0.35, 1),
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const crateSlideY = interpolate(frame, [55, 105], [140, 270], {
		easing: Easing.bezier(0.16, 1, 0.3, 1),
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<>
			<SceneBackground theme="restaurant" cameraScale={camScale} />

			<TopScenePill
				step="05"
				title="CSR = MASAK SENDIRI"
				bg={PALETTE.csrMain}
				icon={<FaBoxOpen size={24} color={PALETTE.white} />}
			/>

			<Track name="Props CSR">
				{/* Crate of ingredients + Recipe scroll (morphs into UI components) */}
				<Interactive.Div
					name="Bahan Mentah & Resep"
					from={45}
					durationInFrames={495}
					style={{
						position: 'absolute',
						top: crateSlideY,
						left: SAFE_AREA.left,
						width: SAFE_AREA.contentWidth,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 14,
						opacity: fadeIn(frame, 45, 10),
					}}
				>
					<RawIngredientsAndRecipe morphToUi={morphToUi} />

					{morphToUi > 0.65 ? (
						<div
							style={{
								display: 'inline-flex',
								alignItems: 'center',
								gap: 8,
								backgroundColor: PALETTE.csrMain,
								border: `4px solid ${PALETTE.ink}`,
								borderRadius: 999,
								padding: '8px 20px',
								fontFamily: FONTS.display,
								fontSize: 25,
								fontWeight: 700,
								color: PALETTE.white,
							}}
						>
							<LuSparkles size={22} color={PALETTE.white} />
							<span>Bahan Jadi Komponen UI Website!</span>
						</div>
					) : null}
				</Interactive.Div>

				{/* Portable Cooking Stove at Table */}
				{frame >= 245 && morphToUi < 0.7 ? (
					<Interactive.Div
						name="Kompor Meja Pelanggan"
						style={{
							position: 'absolute',
							top: 505,
							left: SAFE_AREA.left + 215,
							scale: popScale(frame, 245, 14, 11),
							opacity: 1 - morphToUi,
						}}
					>
						<KitchenStoveStage
							isCooking={isCooking}
							progress={cookProgress}
							label={cookProgress >= 1 ? 'AKHIRNYA MATANG!' : 'PELANGGAN MASAK...'}
						/>
						{/* Extra process warning badge */}
						<div
							style={{
								marginTop: 12,
								display: 'inline-flex',
								alignItems: 'center',
								gap: 10,
								backgroundColor: '#fef3c7',
								border: `4px solid ${PALETTE.ink}`,
								boxShadow: `0 6px 0 ${PALETTE.ink}`,
								borderRadius: 999,
								padding: '8px 20px',
								fontFamily: FONTS.display,
								fontSize: 25,
								fontWeight: 700,
								color: '#9a3412',
							}}
						>
							<FaClock size={22} color="#ea580c" />
							<span>Ada Proses Tambahan di Meja!</span>
						</div>
					</Interactive.Div>
				) : null}
			</Track>

			<Track name="Actors">
				<ManCharacter
					name="Presenter CSR"
					from={0}
					durationInFrames={540}
					seed="presenter-05"
					pose={frame < 135 ? 'present' : frame < 320 ? 'pointRight' : 'idea'}
					expression={frame < 135 ? 'happy' : 'determined'}
					talking={frame < 500}
					yaw={22}
					lookX={0.45}
					style={{
						position: 'absolute',
						left: 0,
						top: 0,
						translate: '-170px 568px',
						scale: 0.6,
					}}
				/>

				<WomanCharacter
					name="Pelanggan Masak CSR"
					from={0}
					durationInFrames={540}
					seed="customer-05"
					pose={customerBeat.pose}
					poseTo={customerBeat.poseTo}
					poseBlend={customerBeat.poseBlend}
					expression={customerBeat.expression}
					expressionTo={customerBeat.expressionTo}
					expressionBlend={customerBeat.expressionBlend}
					yaw={-24}
					style={{
						position: 'absolute',
						left: 0,
						top: 0,
						translate: '295px 568px',
						scale: 0.62,
					}}
				/>
			</Track>

			<Interactive.Div
				name="Meja Pelanggan CSR"
				style={{
					position: 'absolute',
					top: 1310,
					left: 500,
				}}
			>
				<DiningTableProp width={440} />
			</Interactive.Div>

			{frame >= 115 && frame < 245 ? (
				<div style={{position: 'absolute', left: 430, top: 845, transform: `scale(${popScale(frame, 115, 12)})`}}>
					<SpeechBubble text="Lho, masak sendiri?!" bg="#ffedd5" tailSide="bottom-right" />
				</div>
			) : null}

			{frame >= 435 ? (
				<div style={{position: 'absolute', left: 460, top: 845, transform: `scale(${popScale(frame, 435, 12)})`}}>
					<SpeechBubble text="Jadi juga akhirnya!" bg="#dcfce7" tailSide="bottom-right" />
				</div>
			) : null}
		</>
	);
};

export const Scene05CsrAnalogy = Interactive.create({
	Component: Scene05CsrAnalogyInner,
	layout: 'absolute-fill',
	componentName: 'Scene05CsrAnalogy',
});
