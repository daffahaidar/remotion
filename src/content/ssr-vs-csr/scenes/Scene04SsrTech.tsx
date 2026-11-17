import React from 'react';
import {FaBolt, FaServer} from 'react-icons/fa6';
import {Interactive, Track, interpolate, useCurrentFrame} from 'remotion';
import {ManCharacter} from '../../../../character';
import {
	BrowserWindow,
	SceneBackground,
	TopScenePill,
	VerticalFlowPipeline,
	type FlowStepItem,
} from '../components/CartoonUi';
import {FONTS, PALETTE, fadeIn, popScale, resolveCharacterBeats} from '../theme';

const SSR_STEPS: readonly FlowStepItem[] = [
	{
		label: '1. USER',
		detail: 'Mengirim request halaman ke server',
		icon: 'user',
		color: '#38bdf8',
		bg: '#e0f2fe',
		startFrame: 10,
	},
	{
		label: '2. SERVER',
		detail: 'Proses data & render konten di server',
		icon: 'server',
		color: PALETTE.ssrMain,
		bg: '#d1fae5',
		startFrame: 52,
	},
	{
		label: '3. HTML',
		detail: 'HTML sudah berisi konten lengkap!',
		icon: 'html',
		color: '#059669',
		bg: '#ecfdf5',
		startFrame: 112,
	},
	{
		label: '4. BROWSER',
		detail: 'Konten langsung tampil lebih awal',
		icon: 'browser',
		color: '#0284c7',
		bg: '#f0f9ff',
		startFrame: 175,
	},
	{
		label: '5. HYDRATION',
		detail: 'JS menghubungkan event & interaktivitas',
		icon: 'hydrate',
		color: '#ca8a04',
		bg: '#fef9c3',
		startFrame: 278,
	},
];

const Scene04SsrTechInner: React.FC = () => {
	const frame = useCurrentFrame();

	const camScale = interpolate(frame, [0, 275, 340, 450], [1, 1.02, 1.05, 1.02], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const presenterBeat = resolveCharacterBeats(frame, [
		{frame: 0, pose: 'pointUp', expression: 'focused'},
		{frame: 175, pose: 'present', expression: 'happy'},
		{frame: 280, pose: 'idea', expression: 'eureka'},
	]);

	const browserPop = popScale(frame, 170, 14, 11);
	const hydrateFlash =
		frame >= 285 && frame <= 325
			? interpolate(frame, [285, 298, 325], [0, 1, 0], {
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
				})
			: 0;

	return (
		<>
			<SceneBackground theme="tech-ssr" cameraScale={camScale} />

			<TopScenePill
				step="04"
				title="SSR SECARA TEKNIS"
				bg={PALETTE.ssrMain}
				icon={<FaServer size={24} color={PALETTE.white} />}
			/>

			<Track name="Diagram SSR">
				<Interactive.Div name="Pipeline SSR" style={{position: 'absolute', inset: 0}}>
					<VerticalFlowPipeline steps={SSR_STEPS} top={242} />
				</Interactive.Div>
			</Track>

			{/* Browser Preview Card & Hydration Wave */}
			<Track name="Browser Preview">
				<Interactive.Div
					name="Hydration Status Pill"
					style={{
						position: 'absolute',
						top: 856,
						left: 380,
						opacity: fadeIn(frame, 175, 10),
					}}
				>
					<div
						style={{
							display: 'inline-flex',
							alignItems: 'center',
							gap: 10,
							padding: '8px 20px',
							borderRadius: 999,
							backgroundColor: frame >= 295 ? '#fef08a' : '#d1fae5',
							border: `4px solid ${PALETTE.ink}`,
							boxShadow: `0 6px 0 ${PALETTE.ink}`,
							fontFamily: FONTS.display,
							fontSize: 24,
							fontWeight: 700,
							color: PALETTE.ink,
						}}
					>
						<FaBolt size={20} color={frame >= 295 ? '#ca8a04' : PALETTE.ssrDark} />
						<span>
							{frame >= 295 ? 'HYDRATED! Tombol Interaktif!' : 'HTML Sudah Terlihat Duluan!'}
						</span>
					</div>
				</Interactive.Div>

				<Interactive.Div
					name="Browser SSR Hydration"
					from={165}
					durationInFrames={285}
					style={{
						position: 'absolute',
						top: 925,
						left: 375,
						scale: browserPop,
					}}
				>
					<BrowserWindow
						title="Artikel SSR"
						url="next-app.id/blog"
						mode="ssr-hydrate"
						accentColor={PALETTE.ssrMain}
						statusText={frame >= 295 ? 'AKTIF' : 'HTML'}
						width={572}
						hydrateAtFrame={130}
					/>
					{/* Hydration electric glow overlay */}
					{hydrateFlash > 0 ? (
						<div
							style={{
								position: 'absolute',
								inset: -8,
								borderRadius: 34,
								border: '6px solid #facc15',
								backgroundColor: `rgba(250, 204, 21, ${hydrateFlash * 0.28})`,
								pointerEvents: 'none',
							}}
						/>
					) : null}
				</Interactive.Div>
			</Track>

			<Track name="Presenter">
				<ManCharacter
					name="Presenter Teknis SSR"
					from={0}
					durationInFrames={450}
					seed="presenter-04"
					pose={presenterBeat.pose}
					poseTo={presenterBeat.poseTo}
					poseBlend={presenterBeat.poseBlend}
					expression={presenterBeat.expression}
					expressionTo={presenterBeat.expressionTo}
					expressionBlend={presenterBeat.expressionBlend}
					talking
					yaw={24}
					lookX={0.5}
					lookY={frame < 175 ? -0.5 : 0}
					style={{
						position: 'absolute',
						left: 0,
						top: 0,
						translate: '-220px 575px',
						scale: 0.54,
					}}
				/>
			</Track>
		</>
	);
};

export const Scene04SsrTech = Interactive.create({
	Component: Scene04SsrTechInner,
	layout: 'absolute-fill',
	componentName: 'Scene04SsrTech',
});
