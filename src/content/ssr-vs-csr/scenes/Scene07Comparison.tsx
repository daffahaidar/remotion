import React from 'react';
import {FaBolt, FaGear, FaScaleBalanced, FaServer} from 'react-icons/fa6';
import {Interactive, Track, interpolate, useCurrentFrame} from 'remotion';
import {ManCharacter} from '../../../../character';
import {
	CartoonCard,
	SceneBackground,
	TopScenePill,
} from '../components/CartoonUi';
import {FONTS, PALETTE, SAFE_AREA, fadeIn, popScale, resolveCharacterBeats} from '../theme';

const Scene07ComparisonInner: React.FC = () => {
	const frame = useCurrentFrame();

	const camScale = interpolate(frame, [0, 390, 600], [1, 1.02, 1.04], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const presenterBeat = resolveCharacterBeats(frame, [
		{frame: 0, pose: 'present', expression: 'happy'},
		{frame: 195, pose: 'pointUp', expression: 'focused'},
		{frame: 390, pose: 'shrug', expression: 'determined'},
		{frame: 485, pose: 'idea', expression: 'proud'},
	]);

	// SSR timeline fills fast on HTML phase (f=30..150)
	const ssrHtmlProgress = interpolate(frame, [28, 115], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const ssrHydrateProgress = interpolate(frame, [115, 190], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// CSR timeline waits through HTML empty + JS download/exec before UI ready (f=200..360)
	const csrJsProgress = interpolate(frame, [205, 315], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const csrUiProgress = interpolate(frame, [315, 380], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// When Myth-Buster pops in at f=390, cards soften cleanly behind the callout
	const cardsDim = frame >= 390 ? interpolate(frame, [390, 412], [1, 0.2], {extrapolateRight: 'clamp'}) : 1;
	const mythPop = popScale(frame, 390, 14, 10);

	return (
		<>
			<SceneBackground theme="compare" cameraScale={camScale} />

			<TopScenePill
				step="07"
				title="PERBANDINGAN SSR vs CSR"
				bg="#1e293b"
				icon={<FaScaleBalanced size={24} color="#facc15" />}
			/>

			<Track name="Comparison Cards">
				{/* TOP CARD: SSR */}
				<Interactive.Div
					name="Kartu Perbandingan SSR"
					style={{
						position: 'absolute',
						top: 248,
						left: SAFE_AREA.left,
						width: SAFE_AREA.contentWidth,
						scale: popScale(frame, 8, 14, 11),
						opacity: cardsDim,
					}}
				>
					<CartoonCard bg="#ecfdf5" borderColor={PALETTE.ink} style={{padding: '20px 24px'}}>
						<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14}}>
							<div style={{display: 'flex', alignItems: 'center', gap: 14}}>
								<div
									style={{
										width: 58,
										height: 58,
										borderRadius: 16,
										backgroundColor: PALETTE.ssrMain,
										border: `4px solid ${PALETTE.ink}`,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<FaServer size={28} color={PALETTE.white} />
								</div>
								<div>
									<div style={{fontFamily: FONTS.display, fontSize: 36, fontWeight: 700, color: PALETTE.ssrDark}}>
										SSR (Server-Side)
									</div>
									<div style={{fontFamily: FONTS.body, fontSize: 22, fontWeight: 700, color: PALETTE.ink}}>
										Server menyiapkan HTML berisi konten
									</div>
								</div>
							</div>
							<div
								style={{
									padding: '6px 14px',
									borderRadius: 999,
									backgroundColor: PALETTE.ssrMain,
									border: `3px solid ${PALETTE.ink}`,
									fontFamily: FONTS.display,
									fontSize: 22,
									fontWeight: 700,
									color: PALETTE.white,
								}}
							>
								Konten Awal!
							</div>
						</div>

						{/* Timeline Bar */}
						<div
							style={{
								backgroundColor: PALETTE.white,
								border: `4px solid ${PALETTE.ink}`,
								borderRadius: 18,
								padding: 12,
							}}
						>
							<div style={{display: 'flex', gap: 8, height: 28}}>
								<div
									style={{
										flex: 6,
										backgroundColor: '#e2e8f0',
										borderRadius: 10,
										overflow: 'hidden',
										border: `3px solid ${PALETTE.ink}`,
									}}
								>
									<div
										style={{
											width: `${Math.round(ssrHtmlProgress * 100)}%`,
											height: '100%',
											backgroundColor: PALETTE.ssrMain,
										}}
									/>
								</div>
								<div
									style={{
										flex: 4,
										backgroundColor: '#e2e8f0',
										borderRadius: 10,
										overflow: 'hidden',
										border: `3px solid ${PALETTE.ink}`,
									}}
								>
									<div
										style={{
											width: `${Math.round(ssrHydrateProgress * 100)}%`,
											height: '100%',
											backgroundColor: '#facc15',
										}}
									/>
								</div>
							</div>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									marginTop: 8,
									fontFamily: FONTS.mono,
									fontSize: 20,
									fontWeight: 700,
									color: PALETTE.ink,
								}}
							>
								<span>1. Server HTML -&gt; Tampil!</span>
								<span style={{display: 'inline-flex', alignItems: 'center', gap: 4}}>
									<FaBolt size={16} color="#ca8a04" /> 2. Hydration
								</span>
							</div>
						</div>
					</CartoonCard>
				</Interactive.Div>

				{/* BOTTOM CARD: CSR */}
				<Interactive.Div
					name="Kartu Perbandingan CSR"
					from={185}
					durationInFrames={415}
					style={{
						position: 'absolute',
						top: 604,
						left: SAFE_AREA.left,
						width: SAFE_AREA.contentWidth,
						scale: popScale(frame, 185, 14, 11),
						opacity: cardsDim,
					}}
				>
					<CartoonCard bg="#fff7ed" borderColor={PALETTE.ink} style={{padding: '20px 24px'}}>
						<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14}}>
							<div style={{display: 'flex', alignItems: 'center', gap: 14}}>
								<div
									style={{
										width: 58,
										height: 58,
										borderRadius: 16,
										backgroundColor: PALETTE.csrMain,
										border: `4px solid ${PALETTE.ink}`,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<FaGear size={28} color={PALETTE.white} />
								</div>
								<div>
									<div style={{fontFamily: FONTS.display, fontSize: 36, fontWeight: 700, color: PALETTE.csrDark}}>
										CSR (Client-Side)
									</div>
									<div style={{fontFamily: FONTS.body, fontSize: 22, fontWeight: 700, color: PALETTE.ink}}>
										Browser mengunduh &amp; merakit UI lewat JS
									</div>
								</div>
							</div>
							<div
								style={{
									padding: '6px 14px',
									borderRadius: 999,
									backgroundColor: PALETTE.csrMain,
									border: `3px solid ${PALETTE.ink}`,
									fontFamily: FONTS.display,
									fontSize: 22,
									fontWeight: 700,
									color: PALETTE.white,
								}}
							>
								Build di Browser
							</div>
						</div>

						{/* Timeline Bar */}
						<div
							style={{
								backgroundColor: PALETTE.white,
								border: `4px solid ${PALETTE.ink}`,
								borderRadius: 18,
								padding: 12,
							}}
						>
							<div style={{display: 'flex', gap: 8, height: 28}}>
								<div
									style={{
										flex: 7,
										backgroundColor: '#e2e8f0',
										borderRadius: 10,
										overflow: 'hidden',
										border: `3px solid ${PALETTE.ink}`,
									}}
								>
									<div
										style={{
											width: `${Math.round(csrJsProgress * 100)}%`,
											height: '100%',
											backgroundColor: PALETTE.csrMain,
										}}
									/>
								</div>
								<div
									style={{
										flex: 3,
										backgroundColor: '#e2e8f0',
										borderRadius: 10,
										overflow: 'hidden',
										border: `3px solid ${PALETTE.ink}`,
									}}
								>
									<div
										style={{
											width: `${Math.round(csrUiProgress * 100)}%`,
											height: '100%',
											backgroundColor: '#10b981',
										}}
									/>
								</div>
							</div>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									marginTop: 8,
									fontFamily: FONTS.mono,
									fontSize: 20,
									fontWeight: 700,
									color: PALETTE.ink,
								}}
							>
								<span>1. Download &amp; Run JS (Loading)</span>
								<span>2. UI Tampil!</span>
							</div>
						</div>
					</CartoonCard>
				</Interactive.Div>

				{/* MYTH BUSTER OVERLAY */}
				{frame >= 388 ? (
					<Interactive.Div
						name="Myth Buster Banner"
						style={{
							position: 'absolute',
							top: 445,
							left: SAFE_AREA.left + 20,
							width: SAFE_AREA.contentWidth - 40,
							scale: mythPop,
							opacity: fadeIn(frame, 388, 8),
						}}
					>
						<CartoonCard
							bg="#fef08a"
							style={{
								padding: '26px 28px',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								gap: 14,
								textAlign: 'center',
							}}
						>
							<div
								style={{
									width: 72,
									height: 72,
									borderRadius: '50%',
									backgroundColor: PALETTE.white,
									border: `5px solid ${PALETTE.ink}`,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<FaScaleBalanced size={36} color={PALETTE.ink} />
							</div>
							<div style={{fontFamily: FONTS.display, fontSize: 40, fontWeight: 700, color: PALETTE.ink, lineHeight: 1.2}}>
								SSR ≠ Selalu Lebih Cepat
							</div>
							<div style={{fontFamily: FONTS.display, fontSize: 40, fontWeight: 700, color: PALETTE.csrDark, lineHeight: 1.2}}>
								CSR ≠ Berarti Buruk!
							</div>
							<div style={{fontFamily: FONTS.body, fontSize: 25, fontWeight: 700, color: '#334155'}}>
								Keduanya punya kasus terbaiknya masing-masing.
							</div>
						</CartoonCard>
					</Interactive.Div>
				) : null}
			</Track>

			<Track name="Presenter">
				<ManCharacter
					name="Presenter Perbandingan"
					from={0}
					durationInFrames={600}
					seed="presenter-07"
					pose={presenterBeat.pose}
					poseTo={presenterBeat.poseTo}
					poseBlend={presenterBeat.poseBlend}
					expression={presenterBeat.expression}
					expressionTo={presenterBeat.expressionTo}
					expressionBlend={presenterBeat.expressionBlend}
					talking
					lookY={frame < 390 ? -0.45 : -0.2}
					style={{
						position: 'absolute',
						left: 0,
						top: 0,
						translate: '88px 575px',
						scale: 0.56,
					}}
				/>
			</Track>
		</>
	);
};

export const Scene07Comparison = Interactive.create({
	Component: Scene07ComparisonInner,
	layout: 'absolute-fill',
	componentName: 'Scene07Comparison',
});
