import React from 'react';
import {FaBolt, FaCode, FaServer} from 'react-icons/fa6';
import {LuSparkles} from 'react-icons/lu';
import {SiNextdotjs} from 'react-icons/si';
import {Interactive, Track, interpolate, useCurrentFrame} from 'remotion';
import {ManCharacter, WomanCharacter} from '../../../../character';
import {
	CartoonCard,
	SceneBackground,
	TopScenePill,
} from '../components/CartoonUi';
import {FONTS, PALETTE, SAFE_AREA, fadeIn, popScale, resolveCharacterBeats} from '../theme';

const Scene08NextJsTwistInner: React.FC = () => {
	const frame = useCurrentFrame();

	// Punch-zoom on plot twist reveal
	const camScale = interpolate(frame, [0, 14, 42, 450], [1.14, 1.0, 1.02, 1.04], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const manBeat = resolveCharacterBeats(frame, [
		{frame: 0, pose: 'surprised', expression: 'jawDrop'},
		{frame: 95, pose: 'pointUp', expression: 'eureka'},
		{frame: 295, pose: 'idea', expression: 'proud'},
	]);

	const womanBeat = resolveCharacterBeats(frame, [
		{frame: 0, pose: 'surprised', expression: 'surprised'},
		{frame: 120, pose: 'listen', expression: 'happy'},
		{frame: 300, pose: 'cheer', expression: 'excited'},
	]);

	const logoScale = popScale(frame, 10, 14, 10);
	const serverCardPop = popScale(frame, 105, 14, 11);
	const clientCardPop = popScale(frame, 175, 14, 11);
	const punchlinePop = popScale(frame, 295, 14, 9);

	return (
		<>
			<SceneBackground theme="nextjs" cameraScale={camScale} />

			<TopScenePill
				step="08"
				title="PLOT TWIST NEXT.JS!"
				bg={PALETTE.nextRose}
				icon={<LuSparkles size={24} color={PALETTE.white} />}
			/>

			{/* Next.js Logo Medallion */}
			<Track name="NextJS Breakdown">
				<Interactive.Div
					name="NextJS Logo"
					from={6}
					durationInFrames={444}
					style={{
						position: 'absolute',
						top: 244,
						left: SAFE_AREA.left,
						width: SAFE_AREA.contentWidth,
						display: 'flex',
						justifyContent: 'center',
						scale: logoScale,
					}}
				>
					<div
						style={{
							display: 'inline-flex',
							alignItems: 'center',
							gap: 18,
							backgroundColor: PALETTE.white,
							border: `6px solid ${PALETTE.ink}`,
							boxShadow: `0 9px 0 ${PALETTE.nextIndigo}`,
							borderRadius: 999,
							padding: '12px 32px',
						}}
					>
						<SiNextdotjs size={56} color="#0f172a" />
						<div style={{display: 'flex', flexDirection: 'column'}}>
							<span style={{fontFamily: FONTS.display, fontSize: 34, fontWeight: 700, color: PALETTE.ink}}>
								Next.js App Router
							</span>
							<span style={{fontFamily: FONTS.mono, fontSize: 21, fontWeight: 700, color: PALETTE.nextIndigo}}>
								Hybrid Rendering Cerdas!
							</span>
						</div>
					</div>
				</Interactive.Div>

				{/* Card 1: Server Components (Default) */}
				<Interactive.Div
					name="Server Components Default"
					from={100}
					durationInFrames={350}
					style={{
						position: 'absolute',
						top: 382,
						left: SAFE_AREA.left,
						width: SAFE_AREA.contentWidth,
						scale: serverCardPop,
					}}
				>
					<CartoonCard bg="#ecfdf5" style={{padding: '16px 22px'}}>
						<div style={{display: 'flex', alignItems: 'center', gap: 16}}>
							<div
								style={{
									width: 56,
									height: 56,
									borderRadius: 16,
									backgroundColor: PALETTE.ssrMain,
									border: `4px solid ${PALETTE.ink}`,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									flexShrink: 0,
								}}
							>
								<FaServer size={28} color={PALETTE.white} />
							</div>
							<div style={{flex: 1}}>
								<div style={{fontFamily: FONTS.display, fontSize: 30, fontWeight: 700, color: PALETTE.ssrDark}}>
									1. Server Components (Default)
								</div>
								<div style={{fontFamily: FONTS.body, fontSize: 23, fontWeight: 700, color: PALETTE.ink}}>
									Semua komponen App Router dirender di server dulu!
								</div>
							</div>
						</div>
					</CartoonCard>
				</Interactive.Div>

				{/* Card 2: Client Components ('use client') */}
				<Interactive.Div
					name="Client Components Prerender"
					from={170}
					durationInFrames={280}
					style={{
						position: 'absolute',
						top: 544,
						left: SAFE_AREA.left,
						width: SAFE_AREA.contentWidth,
						scale: clientCardPop,
					}}
				>
					<CartoonCard bg="#eef2ff" style={{padding: '16px 22px'}}>
						<div style={{display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12}}>
							<div
								style={{
									padding: '6px 16px',
									borderRadius: 12,
									backgroundColor: '#1e1b4b',
									border: `3px solid ${PALETTE.ink}`,
									fontFamily: FONTS.mono,
									fontSize: 24,
									fontWeight: 700,
									color: '#38bdf8',
								}}
							>
								&apos;use client&apos;
							</div>
							<span style={{fontFamily: FONTS.display, fontSize: 29, fontWeight: 700, color: PALETTE.ink}}>
								Client Component
							</span>
						</div>

						<div style={{display: 'flex', gap: 12}}>
							<div
								style={{
									flex: 1,
									backgroundColor: '#d1fae5',
									border: `4px solid ${PALETTE.ink}`,
									borderRadius: 16,
									padding: '10px 14px',
									opacity: fadeIn(frame, 195, 10),
								}}
							>
								<div style={{display: 'flex', alignItems: 'center', gap: 8, fontFamily: FONTS.display, fontSize: 23, fontWeight: 700, color: PALETTE.ssrDark}}>
									<FaCode size={20} color={PALETTE.ssrDark} />
									<span>Initial Load</span>
								</div>
								<div style={{fontFamily: FONTS.body, fontSize: 21, fontWeight: 700, color: PALETTE.ink}}>
									Tetap diprerender jadi HTML!
								</div>
							</div>

							<div
								style={{
									flex: 1,
									backgroundColor: '#fef9c3',
									border: `4px solid ${PALETTE.ink}`,
									borderRadius: 16,
									padding: '10px 14px',
									opacity: fadeIn(frame, 235, 10),
								}}
							>
								<div style={{display: 'flex', alignItems: 'center', gap: 8, fontFamily: FONTS.display, fontSize: 23, fontWeight: 700, color: '#854d0e'}}>
									<FaBolt size={20} color="#ca8a04" />
									<span>Di Browser</span>
								</div>
								<div style={{fontFamily: FONTS.body, fontSize: 21, fontWeight: 700, color: PALETTE.ink}}>
									Baru di-hydrate agar interaktif!
								</div>
							</div>
						</div>
					</CartoonCard>
				</Interactive.Div>

				{/* BIG PUNCHLINE: 'use client' ≠ CSR murni */}
				<Interactive.Div
					name="Punchline Use Client"
					from={292}
					durationInFrames={158}
					style={{
						position: 'absolute',
						top: 785,
						left: SAFE_AREA.left,
						width: SAFE_AREA.contentWidth,
						display: 'flex',
						justifyContent: 'center',
						scale: punchlinePop,
					}}
				>
					<div
						style={{
							backgroundColor: '#fef08a',
							border: `6px solid ${PALETTE.ink}`,
							boxShadow: `0 10px 0 ${PALETTE.nextRose}`,
							borderRadius: 28,
							padding: '18px 34px',
							textAlign: 'center',
						}}
					>
						<div style={{fontFamily: FONTS.mono, fontSize: 44, fontWeight: 700, color: PALETTE.ink}}>
							&apos;use client&apos; ≠ CSR murni
						</div>
						<div style={{fontFamily: FONTS.body, fontSize: 24, fontWeight: 800, color: '#be123c', marginTop: 4}}>
							Tidak otomatis mematikan SSR!
						</div>
					</div>
				</Interactive.Div>
			</Track>

			{/* Both characters react dynamically below */}
			<Track name="Actors">
				<ManCharacter
					name="Presenter Plot Twist"
					from={0}
					durationInFrames={450}
					seed="presenter-08"
					pose={manBeat.pose}
					poseTo={manBeat.poseTo}
					poseBlend={manBeat.poseBlend}
					expression={manBeat.expression}
					expressionTo={manBeat.expressionTo}
					expressionBlend={manBeat.expressionBlend}
					talking
					yaw={18}
					lookY={-0.4}
					style={{
						position: 'absolute',
						left: 0,
						top: 0,
						translate: '-160px 575px',
						scale: 0.56,
					}}
				/>

				<WomanCharacter
					name="Pendukung Plot Twist"
					from={0}
					durationInFrames={450}
					seed="woman-08"
					pose={womanBeat.pose}
					poseTo={womanBeat.poseTo}
					poseBlend={womanBeat.poseBlend}
					expression={womanBeat.expression}
					expressionTo={womanBeat.expressionTo}
					expressionBlend={womanBeat.expressionBlend}
					yaw={-20}
					lookX={-0.3}
					lookY={-0.35}
					style={{
						position: 'absolute',
						left: 0,
						top: 0,
						translate: '310px 575px',
						scale: 0.56,
					}}
				/>
			</Track>
		</>
	);
};

export const Scene08NextJsTwist = Interactive.create({
	Component: Scene08NextJsTwistInner,
	layout: 'absolute-fill',
	componentName: 'Scene08NextJsTwist',
});
