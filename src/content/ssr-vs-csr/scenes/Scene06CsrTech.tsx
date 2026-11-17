import React from 'react';
import {FaGear} from 'react-icons/fa6';
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

const CSR_STEPS: readonly FlowStepItem[] = [
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
		detail: 'Hanya kirim HTML kerangka kosong',
		icon: 'server',
		color: '#94a3b8',
		bg: '#f1f5f9',
		startFrame: 48,
	},
	{
		label: '3. HTML + JS',
		detail: '<div id="root"></div> + bundle.js',
		icon: 'html',
		color: PALETTE.csrMain,
		bg: '#ffedd5',
		startFrame: 100,
	},
	{
		label: '4. BROWSER',
		detail: 'Download & jalankan file JavaScript',
		icon: 'js',
		color: '#ea580c',
		bg: '#fef3c7',
		startFrame: 162,
	},
	{
		label: '5. RENDER UI',
		detail: 'JS merakit komponen halaman di browser',
		icon: 'render',
		color: '#ca8a04',
		bg: '#fef9c3',
		startFrame: 272,
	},
];

const Scene06CsrTechInner: React.FC = () => {
	const frame = useCurrentFrame();

	const camScale = interpolate(frame, [0, 275, 360, 450], [1, 1.03, 1.05, 1.02], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const presenterBeat = resolveCharacterBeats(frame, [
		{frame: 0, pose: 'pointUp', expression: 'focused'},
		{frame: 165, pose: 'think', expression: 'thinking'},
		{frame: 285, pose: 'present', expression: 'happy'},
	]);

	const browserPop = popScale(frame, 160, 14, 11);
	const gearSpin = (frame * 6) % 360;

	return (
		<>
			<SceneBackground theme="tech-csr" cameraScale={camScale} />

			<TopScenePill
				step="06"
				title="CSR SECARA TEKNIS"
				bg={PALETTE.csrMain}
				icon={<FaGear size={24} color={PALETTE.white} />}
			/>

			<Track name="Diagram CSR">
				<Interactive.Div name="Pipeline CSR" style={{position: 'absolute', inset: 0}}>
					<VerticalFlowPipeline steps={CSR_STEPS} top={242} />
				</Interactive.Div>
			</Track>

			{/* Browser Preview: Spinner during JS execution -> UI Components pop in one by one */}
			<Track name="Browser Preview CSR">
				<Interactive.Div
					name="JS Processing Pill"
					style={{
						position: 'absolute',
						top: 856,
						left: 380,
						opacity: fadeIn(frame, 165, 10),
					}}
				>
					<div
						style={{
							display: 'inline-flex',
							alignItems: 'center',
							gap: 10,
							padding: '8px 20px',
							borderRadius: 999,
							backgroundColor: frame >= 270 ? '#dcfce7' : '#ffedd5',
							border: `4px solid ${PALETTE.ink}`,
							boxShadow: `0 6px 0 ${PALETTE.ink}`,
							fontFamily: FONTS.display,
							fontSize: 24,
							fontWeight: 700,
							color: PALETTE.ink,
						}}
					>
						<div style={{transform: `rotate(${gearSpin}deg)`, display: 'flex'}}>
							<FaGear size={22} color={frame >= 270 ? PALETTE.ssrDark : PALETTE.csrDark} />
						</div>
						<span>
							{frame >= 270 ? 'JS Selesai -> Komponen Muncul!' : 'Proses JS -> Tampil Loading Dulu'}
						</span>
					</div>
				</Interactive.Div>

				<Interactive.Div
					name="Browser CSR Render"
					from={155}
					durationInFrames={295}
					style={{
						position: 'absolute',
						top: 925,
						left: 375,
						scale: browserPop,
					}}
				>
					<BrowserWindow
						title={frame < 285 ? 'Memproses JavaScript...' : 'UI Dirakit di Browser'}
						url="spa-app.id"
						mode="csr-assemble"
						accentColor={PALETTE.csrMain}
						statusText={frame < 285 ? 'LOADING' : 'CLIENT'}
						width={572}
						buildStartFrame={115}
					/>
				</Interactive.Div>
			</Track>

			<Track name="Presenter">
				<ManCharacter
					name="Presenter Teknis CSR"
					from={0}
					durationInFrames={450}
					seed="presenter-06"
					pose={presenterBeat.pose}
					poseTo={presenterBeat.poseTo}
					poseBlend={presenterBeat.poseBlend}
					expression={presenterBeat.expression}
					expressionTo={presenterBeat.expressionTo}
					expressionBlend={presenterBeat.expressionBlend}
					talking
					yaw={24}
					lookX={0.5}
					lookY={frame < 165 ? -0.5 : 0}
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

export const Scene06CsrTech = Interactive.create({
	Component: Scene06CsrTechInner,
	layout: 'absolute-fill',
	componentName: 'Scene06CsrTech',
});
