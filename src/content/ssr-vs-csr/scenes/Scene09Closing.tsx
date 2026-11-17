import React from 'react';
import {FaBookmark, FaGear, FaHeart, FaPlus, FaRocket, FaServer} from 'react-icons/fa6';
import {LuSparkles} from 'react-icons/lu';
import {Interactive, Track, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {ManCharacter} from '../../../../character';
import {
	CartoonCard,
	SceneBackground,
} from '../components/CartoonUi';
import {FONTS, PALETTE, SAFE_AREA, fadeIn, popScale, resolveCharacterBeats} from '../theme';

type Scene09Props = {
	readonly channelHandle?: string;
};

const Scene09ClosingInner: React.FC<Scene09Props> = ({channelHandle = '@BelajarCoding'}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const t = frame / fps;

	const camScale = interpolate(frame, [0, 320, 450], [1, 1.03, 1.06], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const presenterBeat = resolveCharacterBeats(frame, [
		{frame: 0, pose: 'present', expression: 'happy'},
		{frame: 165, pose: 'thumbsUp', expression: 'wink'},
		{frame: 300, pose: 'thumbsUp', expression: 'proud'},
	]);

	// Gentle floating orbit for SSR & CSR badges around presenter
	const ssrFloatY = Math.sin(t * 2.2) * 10;
	const csrFloatY = Math.cos(t * 2.2) * 10;

	const titlePop = popScale(frame, 180, 16, 10);
	const ctaPop = popScale(frame, 290, 14, 10);

	return (
		<>
			<SceneBackground theme="closing" cameraScale={camScale} />

			{/* Dedicated Channel Identity Space at Top Safe Area */}
			<Interactive.Div
				name="Channel Identity Slot"
				style={{
					position: 'absolute',
					top: SAFE_AREA.top,
					left: SAFE_AREA.left,
					width: SAFE_AREA.contentWidth,
					display: 'flex',
					justifyContent: 'center',
					opacity: fadeIn(frame, 4, 10),
				}}
			>
				<div
					style={{
						display: 'inline-flex',
						alignItems: 'center',
						gap: 12,
						padding: '10px 26px',
						borderRadius: 999,
						backgroundColor: PALETTE.white,
						border: `5px solid ${PALETTE.ink}`,
						boxShadow: `0 6px 0 ${PALETTE.ink}`,
					}}
				>
					<FaRocket size={24} color={PALETTE.nextIndigo} />
					<span style={{fontFamily: FONTS.mono, fontSize: 28, fontWeight: 700, color: PALETTE.ink}}>
						{channelHandle}
					</span>
				</div>
			</Interactive.Div>

			<Track name="Closing Badges">
				{/* Orbiting SSR Badge (left) */}
				<Interactive.Div
					name="Summary SSR Badge"
					from={10}
					durationInFrames={440}
					style={{
						position: 'absolute',
						top: 266 + ssrFloatY,
						left: SAFE_AREA.left,
						width: 415,
						scale: popScale(frame, 14, 14, 11),
					}}
				>
					<CartoonCard bg="#d1fae5" style={{padding: '16px 20px'}}>
						<div style={{display: 'flex', alignItems: 'center', gap: 12}}>
							<div
								style={{
									width: 48,
									height: 48,
									borderRadius: 14,
									backgroundColor: PALETTE.ssrMain,
									border: `4px solid ${PALETTE.ink}`,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<FaServer size={24} color={PALETTE.white} />
							</div>
							<div>
								<div style={{fontFamily: FONTS.display, fontSize: 32, fontWeight: 700, color: PALETTE.ssrDark}}>
									SSR
								</div>
								<div style={{fontFamily: FONTS.body, fontSize: 21, fontWeight: 700, color: PALETTE.ink}}>
									Konten siap di server
								</div>
							</div>
						</div>
					</CartoonCard>
				</Interactive.Div>

				{/* Orbiting CSR Badge (right) */}
				<Interactive.Div
					name="Summary CSR Badge"
					from={26}
					durationInFrames={424}
					style={{
						position: 'absolute',
						top: 266 + csrFloatY,
						left: SAFE_AREA.left + 445,
						width: 425,
						scale: popScale(frame, 28, 14, 11),
					}}
				>
					<CartoonCard bg="#ffedd5" style={{padding: '16px 20px'}}>
						<div style={{display: 'flex', alignItems: 'center', gap: 12}}>
							<div
								style={{
									width: 48,
									height: 48,
									borderRadius: 14,
									backgroundColor: PALETTE.csrMain,
									border: `4px solid ${PALETTE.ink}`,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<FaGear size={24} color={PALETTE.white} />
							</div>
							<div>
								<div style={{fontFamily: FONTS.display, fontSize: 32, fontWeight: 700, color: PALETTE.csrDark}}>
									CSR
								</div>
								<div style={{fontFamily: FONTS.body, fontSize: 21, fontWeight: 700, color: PALETTE.ink}}>
									UI dirakit di browser
								</div>
							</div>
						</div>
					</CartoonCard>
				</Interactive.Div>

				{/* Closing Hero Title: Belajar Coding Tanpa Pusing! */}
				<Interactive.Div
					name="Closing Title"
					from={175}
					durationInFrames={275}
					style={{
						position: 'absolute',
						top: 448,
						left: SAFE_AREA.left,
						width: SAFE_AREA.contentWidth,
						scale: titlePop,
					}}
				>
					<CartoonCard
						bg="#fef08a"
						style={{
							padding: '22px 26px',
							textAlign: 'center',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: 10,
						}}
					>
						<div
							style={{
								display: 'inline-flex',
								alignItems: 'center',
								gap: 8,
								padding: '6px 16px',
								borderRadius: 999,
								backgroundColor: PALETTE.white,
								border: `3px solid ${PALETTE.ink}`,
								fontFamily: FONTS.body,
								fontSize: 22,
								fontWeight: 800,
								color: PALETTE.ink,
							}}
						>
							<LuSparkles size={20} color={PALETTE.nextIndigo} />
							<span>PILIH SESUAI KEBUTUHAN APP!</span>
						</div>
						<div
							style={{
								fontFamily: FONTS.display,
								fontSize: 56,
								fontWeight: 700,
								color: PALETTE.ink,
								lineHeight: 1.12,
							}}
						>
							Belajar Coding Tanpa Pusing!
						</div>
					</CartoonCard>
				</Interactive.Div>

				{/* Follow CTA Pill */}
				<Interactive.Div
					name="Follow CTA"
					from={288}
					durationInFrames={162}
					style={{
						position: 'absolute',
						top: 725,
						left: SAFE_AREA.left,
						width: SAFE_AREA.contentWidth,
						display: 'flex',
						justifyContent: 'center',
						scale: ctaPop,
					}}
				>
					<div
						style={{
							display: 'inline-flex',
							alignItems: 'center',
							gap: 18,
							backgroundColor: PALETTE.nextIndigo,
							border: `6px solid ${PALETTE.ink}`,
							boxShadow: `0 9px 0 ${PALETTE.ink}`,
							borderRadius: 999,
							padding: '14px 32px',
							color: PALETTE.white,
							fontFamily: FONTS.display,
							fontSize: 32,
							fontWeight: 700,
						}}
					>
						<span style={{display: 'inline-flex', alignItems: 'center', gap: 8}}>
							<FaPlus size={22} color="#fef08a" /> Follow
						</span>
						<span>•</span>
						<span style={{display: 'inline-flex', alignItems: 'center', gap: 8}}>
							<FaHeart size={22} color="#fb7185" /> Like
						</span>
						<span>•</span>
						<span style={{display: 'inline-flex', alignItems: 'center', gap: 8}}>
							<FaBookmark size={20} color="#34d399" /> Save
						</span>
					</div>
				</Interactive.Div>
			</Track>

			{/* Presenter returns to center with Thumbs Up! */}
			<Track name="Presenter">
				<ManCharacter
					name="Presenter Closing"
					from={0}
					durationInFrames={450}
					seed="presenter-09"
					pose={presenterBeat.pose}
					poseTo={presenterBeat.poseTo}
					poseBlend={presenterBeat.poseBlend}
					expression={presenterBeat.expression}
					expressionTo={presenterBeat.expressionTo}
					expressionBlend={presenterBeat.expressionBlend}
					talking={frame <= 430}
					style={{
						position: 'absolute',
						left: 0,
						top: 0,
						translate: '88px 575px',
						scale: 0.72,
					}}
				/>
			</Track>

			{/* Dedicated clean watermark/channel space in lower safe margin */}
			<div
				style={{
					position: 'absolute',
					top: 1632,
					left: SAFE_AREA.left,
					width: SAFE_AREA.contentWidth,
					display: 'flex',
					justifyContent: 'center',
					opacity: 0.85,
					pointerEvents: 'none',
				}}
			>
				<div
					style={{
						padding: '8px 22px',
						borderRadius: 999,
						border: `3px dashed ${PALETTE.ink}`,
						fontFamily: FONTS.mono,
						fontSize: 22,
						fontWeight: 700,
						color: PALETTE.ink,
						backgroundColor: 'rgba(255,255,255,0.65)',
					}}
				>
					Space Identitas Channel • {channelHandle}
				</div>
			</div>
		</>
	);
};

export const Scene09Closing = Interactive.create({
	Component: Scene09ClosingInner,
	layout: 'absolute-fill',
	componentName: 'Scene09Closing',
	schema: {
		channelHandle: {
			type: 'string',
			default: '@BelajarCoding',
			description: 'Handle / Nama Channel',
		},
	},
});
