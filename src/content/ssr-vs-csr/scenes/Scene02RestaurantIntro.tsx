import React from 'react';
import {FaBell, FaUser, FaUtensils} from 'react-icons/fa6';
import {LuChefHat} from 'react-icons/lu';
import {Interactive, Track, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {ManCharacter, WomanCharacter} from '../../../../character';
import {
	CartoonCard,
	SceneBackground,
	SpeechBubble,
	TopScenePill,
} from '../components/CartoonUi';
import {ChefHatOverlay, ClochePlateProp, DiningTableProp} from '../components/RestaurantProps';
import {FONTS, PALETTE, SAFE_AREA, fadeIn, popScale, resolveCharacterBeats} from '../theme';

const Scene02RestaurantIntroInner: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const camY = interpolate(frame, [0, 150, 320, 450], [0, -18, -8, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Presenter guides from bottom-left
	const presenterBeat = resolveCharacterBeats(frame, [
		{frame: 0, pose: 'welcome', expression: 'happy'},
		{frame: 120, pose: 'present', expression: 'excited'},
		{frame: 280, pose: 'idea', expression: 'eureka'},
	]);

	// Woman customer walks in from right edge to dining table at x=710 (translateX = 290px)
	const walkDone = 105;
	const customerX = interpolate(frame, [30, walkDone], [620, 290], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const customerBeat = resolveCharacterBeats(frame, [
		{frame: 0, pose: 'idle', expression: 'happy'},
		{frame: 110, pose: 'listen', expression: 'happy'},
		{frame: 250, pose: 'pointUp', expression: 'excited'},
	]);

	const chefPop = popScale(frame, 130, 14, 11);
	const waiterPop = popScale(frame, 185, 14, 11);
	const customerCardPop = popScale(frame, 235, 14, 11);
	const forkPop = popScale(frame, 305, 14, 10);

	// Hanging pendant lamp gentle sway
	const lampSwing = Math.sin((frame / fps) * 2.2) * 5;

	return (
		<>
			<SceneBackground theme="restaurant" cameraY={camY} />

			{/* Swaying restaurant pendant lamps */}
			<div
				style={{
					position: 'absolute',
					top: 108,
					left: 165,
					transformOrigin: 'top center',
					transform: `rotate(${lampSwing}deg)`,
					pointerEvents: 'none',
				}}
			>
				<div style={{width: 6, height: 54, backgroundColor: PALETTE.ink, margin: '0 auto'}} />
				<div
					style={{
						width: 66,
						height: 36,
						borderRadius: '36px 36px 10px 10px',
						backgroundColor: '#f59e0b',
						border: `5px solid ${PALETTE.ink}`,
					}}
				/>
			</div>
			<div
				style={{
					position: 'absolute',
					top: 108,
					right: 195,
					transformOrigin: 'top center',
					transform: `rotate(${-lampSwing}deg)`,
					pointerEvents: 'none',
				}}
			>
				<div style={{width: 6, height: 54, backgroundColor: PALETTE.ink, margin: '0 auto'}} />
				<div
					style={{
						width: 66,
						height: 36,
						borderRadius: '36px 36px 10px 10px',
						backgroundColor: '#f59e0b',
						border: `5px solid ${PALETTE.ink}`,
					}}
				/>
			</div>

			<TopScenePill
				step="02"
				title="ANALOGI RESTORAN"
				bg="#ea580c"
				icon={<FaUtensils size={24} color={PALETTE.white} />}
			/>

			<Track name="Restaurant Stage">
				{/* Tier 1: Koki di Dapur */}
				<Interactive.Div
					name="Kartu Koki"
					from={125}
					durationInFrames={325}
					style={{
						position: 'absolute',
						top: 256,
						left: SAFE_AREA.left,
						width: SAFE_AREA.contentWidth,
						scale: chefPop,
					}}
				>
					<CartoonCard bg="#fff7ed" style={{display: 'flex', alignItems: 'center', gap: 20, padding: '14px 24px'}}>
						<div
							style={{
								width: 92,
								height: 92,
								borderRadius: 24,
								backgroundColor: '#fed7aa',
								border: `5px solid ${PALETTE.ink}`,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								position: 'relative',
								flexShrink: 0,
							}}
						>
							<LuChefHat size={48} color="#c2410c" />
							<ChefHatOverlay style={{position: 'absolute', top: -46, left: -12, transform: 'scale(0.38)'}} />
						</div>
						<div style={{flex: 1}}>
							<div style={{fontFamily: FONTS.display, fontSize: 34, fontWeight: 700, color: PALETTE.ink}}>
								1. KOKI (Dapur)
							</div>
							<div style={{fontFamily: FONTS.body, fontSize: 25, fontWeight: 700, color: '#9a3412'}}>
								Menyiapkan &amp; memasak pesanan = Server
							</div>
						</div>
					</CartoonCard>
				</Interactive.Div>

				{/* Tier 2: Pelayan */}
				<Interactive.Div
					name="Kartu Pelayan"
					from={180}
					durationInFrames={270}
					style={{
						position: 'absolute',
						top: 418,
						left: SAFE_AREA.left,
						width: SAFE_AREA.contentWidth,
						scale: waiterPop,
					}}
				>
					<CartoonCard bg="#fefce8" style={{display: 'flex', alignItems: 'center', gap: 20, padding: '14px 24px'}}>
						<div
							style={{
								width: 92,
								height: 92,
								borderRadius: 24,
								backgroundColor: '#fef08a',
								border: `5px solid ${PALETTE.ink}`,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								flexShrink: 0,
							}}
						>
							<FaBell size={42} color="#b45309" />
						</div>
						<div style={{flex: 1}}>
							<div style={{fontFamily: FONTS.display, fontSize: 34, fontWeight: 700, color: PALETTE.ink}}>
								2. PELAYAN (Antar)
							</div>
							<div style={{fontFamily: FONTS.body, fontSize: 25, fontWeight: 700, color: '#854d0e'}}>
								Mengirim sajian atau bahan ke meja = Network
							</div>
						</div>
					</CartoonCard>
				</Interactive.Div>

				{/* Tier 3: Pelanggan */}
				<Interactive.Div
					name="Kartu Pelanggan"
					from={230}
					durationInFrames={220}
					style={{
						position: 'absolute',
						top: 580,
						left: SAFE_AREA.left,
						width: SAFE_AREA.contentWidth,
						scale: customerCardPop,
					}}
				>
					<CartoonCard bg="#f0fdf4" style={{display: 'flex', alignItems: 'center', gap: 20, padding: '14px 24px'}}>
						<div
							style={{
								width: 92,
								height: 92,
								borderRadius: 24,
								backgroundColor: '#bbf7d0',
								border: `5px solid ${PALETTE.ink}`,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								flexShrink: 0,
							}}
						>
							<FaUser size={40} color="#15803d" />
						</div>
						<div style={{flex: 1}}>
							<div style={{fontFamily: FONTS.display, fontSize: 34, fontWeight: 700, color: PALETTE.ink}}>
								3. PELANGGAN (Meja)
							</div>
							<div style={{fontFamily: FONTS.body, fontSize: 25, fontWeight: 700, color: '#166534'}}>
								Menikmati / merakit hidangan = Browser
							</div>
						</div>
					</CartoonCard>
				</Interactive.Div>

				{/* 2 Ways Choice Banner */}
				<Interactive.Div
					name="Dua Cara Penyajian"
					from={300}
					durationInFrames={150}
					style={{
						position: 'absolute',
						top: 750,
						left: SAFE_AREA.left,
						width: SAFE_AREA.contentWidth,
						display: 'flex',
						flexDirection: 'column',
						gap: 12,
						scale: forkPop,
					}}
				>
					<div
						style={{
							display: 'flex',
							gap: 16,
						}}
					>
						<div
							style={{
								flex: 1,
								backgroundColor: PALETTE.ssrLight,
								border: `5px solid ${PALETTE.ink}`,
								boxShadow: `0 7px 0 ${PALETTE.ink}`,
								borderRadius: 24,
								padding: '14px 18px',
								textAlign: 'center',
							}}
						>
							<div style={{fontFamily: FONTS.display, fontSize: 30, fontWeight: 700, color: PALETTE.ssrDark}}>
								CARA 1 • SSR
							</div>
							<div style={{fontFamily: FONTS.body, fontSize: 23, fontWeight: 700, color: PALETTE.ink}}>
								Dimasak Koki
							</div>
						</div>
						<div
							style={{
								flex: 1,
								backgroundColor: PALETTE.csrLight,
								border: `5px solid ${PALETTE.ink}`,
								boxShadow: `0 7px 0 ${PALETTE.ink}`,
								borderRadius: 24,
								padding: '14px 18px',
								textAlign: 'center',
							}}
						>
							<div style={{fontFamily: FONTS.display, fontSize: 30, fontWeight: 700, color: PALETTE.csrDark}}>
								CARA 2 • CSR
							</div>
							<div style={{fontFamily: FONTS.body, fontSize: 23, fontWeight: 700, color: PALETTE.ink}}>
								Masak Sendiri
							</div>
						</div>
					</div>
				</Interactive.Div>
			</Track>

			{/* Customer Woman & Dining Table on right */}
			<Track name="Actors">
				<WomanCharacter
					name="Pelanggan Wanita"
					from={24}
					durationInFrames={426}
					seed="customer-02"
					motion={frame < walkDone ? 'walk' : 'idle'}
					speed={1.2}
					yaw={frame < walkDone ? -90 : -24}
					pose={customerBeat.pose}
					poseTo={customerBeat.poseTo}
					poseBlend={customerBeat.poseBlend}
					expression={customerBeat.expression}
					expressionTo={customerBeat.expressionTo}
					expressionBlend={customerBeat.expressionBlend}
					style={{
						position: 'absolute',
						left: 0,
						top: 0,
						translate: `${Math.round(customerX)}px 568px`,
						scale: 0.62,
					}}
				/>

				<ManCharacter
					name="Presenter Utama"
					from={0}
					durationInFrames={450}
					seed="presenter-02"
					pose={presenterBeat.pose}
					poseTo={presenterBeat.poseTo}
					poseBlend={presenterBeat.poseBlend}
					expression={presenterBeat.expression}
					expressionTo={presenterBeat.expressionTo}
					expressionBlend={presenterBeat.expressionBlend}
					talking
					yaw={22}
					lookX={0.45}
					lookY={-0.3}
					style={{
						position: 'absolute',
						left: 0,
						top: 0,
						translate: '-160px 568px',
						scale: 0.64,
					}}
				/>
			</Track>

			{/* Foreground Table & Cloche */}
			<Interactive.Div
				name="Meja Restoran"
				style={{
					position: 'absolute',
					top: 1315,
					left: 515,
					opacity: fadeIn(frame, 18, 12),
				}}
			>
				<DiningTableProp width={420} />
				<ClochePlateProp
					lidOpenProgress={0}
					style={{position: 'absolute', top: -115, left: 105, transform: 'scale(0.75)'}}
				/>
			</Interactive.Div>

			{frame >= 95 && frame <= 230 ? (
				<div
					style={{
						position: 'absolute',
						left: 480,
						top: 865,
						transform: `scale(${popScale(frame, 95, 12)})`,
					}}
				>
					<SpeechBubble text="Pesan makan dong!" bg="#fff7ed" tailSide="bottom-right" />
				</div>
			) : null}
		</>
	);
};

export const Scene02RestaurantIntro = Interactive.create({
	Component: Scene02RestaurantIntroInner,
	layout: 'absolute-fill',
	componentName: 'Scene02RestaurantIntro',
});
