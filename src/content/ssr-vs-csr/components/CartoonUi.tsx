import React from 'react';
import {
	FaArrowDown,
	FaArrowPointer,
	FaBolt,
	FaCheck,
	FaCode,
	FaGear,
	FaGlobe,
	FaServer,
	FaSpinner,
	FaUser,
} from 'react-icons/fa6';
import {LuSparkles} from 'react-icons/lu';
import {AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {SUBTITLE_CUES} from '../subtitles';
import {FONTS, PALETTE, SAFE_AREA, fadeIn, popScale} from '../theme';

export type BgTheme =
	| 'sky'
	| 'restaurant'
	| 'tech-ssr'
	| 'tech-csr'
	| 'compare'
	| 'nextjs'
	| 'closing';

const BG_GRADIENTS: Record<BgTheme, string> = {
	sky: 'linear-gradient(180deg, #bde2ff 0%, #e4f3ff 62%, #f8fcff 100%)',
	restaurant: 'linear-gradient(180deg, #ffe5c4 0%, #fff4e6 60%, #fffbf5 100%)',
	'tech-ssr': 'linear-gradient(180deg, #071422 0%, #0d2336 62%, #133146 100%)',
	'tech-csr': 'linear-gradient(180deg, #171226 0%, #241935 62%, #2f1f3d 100%)',
	compare: 'linear-gradient(180deg, #f0f9ff 0%, #fffbeb 52%, #fef3c7 100%)',
	nextjs: 'linear-gradient(180deg, #060913 0%, #141738 58%, #1e1b4b 100%)',
	closing: 'linear-gradient(180deg, #dbeafe 0%, #ecfdf5 55%, #fef9c3 100%)',
};

const FLOOR_COLORS: Record<BgTheme, {readonly bg: string; readonly border: string}> = {
	sky: {bg: '#d7ebfc', border: '#a3cef1'},
	restaurant: {bg: '#f2cfa9', border: '#c9884f'},
	'tech-ssr': {bg: '#081b29', border: '#10b981'},
	'tech-csr': {bg: '#1c132a', border: '#f97316'},
	compare: {bg: '#fde68a', border: '#1f1a1f'},
	nextjs: {bg: '#0b0f26', border: '#6366f1'},
	closing: {bg: '#d1fae5', border: '#1f1a1f'},
};

const FLOATING_TOKENS = [
	{text: '</>', x: 110, y: 310, speed: 0.7, amp: 16},
	{text: 'SSR', x: 855, y: 390, speed: 0.9, amp: 20},
	{text: '{ }', x: 130, y: 780, speed: 0.6, amp: 14},
	{text: 'HTML', x: 840, y: 920, speed: 0.85, amp: 18},
	{text: 'JS', x: 160, y: 1220, speed: 0.75, amp: 15},
] as const;

export const SceneBackground: React.FC<{
	readonly theme: BgTheme;
	readonly cameraScale?: number;
	readonly cameraY?: number;
}> = ({theme, cameraScale = 1, cameraY = 0}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const t = frame / fps;
	const isDark = theme === 'tech-ssr' || theme === 'tech-csr' || theme === 'nextjs';
	const floor = FLOOR_COLORS[theme];

	return (
		<AbsoluteFill style={{background: BG_GRADIENTS[theme], overflow: 'hidden'}}>
			{/* Subtle parallax grid or awning */}
			<div
				style={{
					position: 'absolute',
					inset: -80,
					transform: `translateY(${cameraY * 0.25}px) scale(${cameraScale})`,
					opacity: isDark ? 0.16 : 0.22,
					backgroundImage: isDark
						? 'radial-gradient(rgba(148, 163, 184, 0.55) 2px, transparent 2px)'
						: 'radial-gradient(rgba(31, 26, 31, 0.2) 2px, transparent 2px)',
					backgroundSize: '44px 44px',
				}}
			/>

			{/* Ambient glow orb */}
			<div
				style={{
					position: 'absolute',
					left: 160,
					top: 260 + Math.sin(t * 0.8) * 18,
					width: 760,
					height: 760,
					borderRadius: '50%',
					background:
						theme === 'tech-ssr'
							? 'radial-gradient(circle, rgba(16,185,129,0.22) 0%, transparent 70%)'
							: theme === 'tech-csr'
								? 'radial-gradient(circle, rgba(249,115,22,0.22) 0%, transparent 70%)'
								: theme === 'nextjs'
									? 'radial-gradient(circle, rgba(99,102,241,0.32) 0%, transparent 70%)'
									: 'radial-gradient(circle, rgba(255,255,255,0.65) 0%, transparent 70%)',
					pointerEvents: 'none',
				}}
			/>

			{/* Restaurant top awning stripes */}
			{theme === 'restaurant' ? (
				<div
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						height: 112,
						display: 'flex',
						borderBottom: `6px solid ${PALETTE.ink}`,
						transform: `translateY(${cameraY * 0.15}px)`,
					}}
				>
					{Array.from({length: 12}).map((_, idx) => (
						<div
							key={idx}
							style={{
								flex: 1,
								backgroundColor: idx % 2 === 0 ? PALETTE.restoAwningRed : PALETTE.restoAwningCream,
								borderRight: idx < 11 ? `4px solid ${PALETTE.ink}` : 'none',
								borderBottomLeftRadius: 24,
								borderBottomRightRadius: 24,
							}}
						/>
					))}
				</div>
			) : null}

			{/* Floating parallax badges */}
			{theme !== 'restaurant'
				? FLOATING_TOKENS.map((tok, i) => (
						<div
							key={tok.text}
							style={{
								position: 'absolute',
								left: tok.x,
								top: tok.y + Math.sin(t * tok.speed + i) * tok.amp + cameraY * 0.35,
								fontFamily: FONTS.mono,
								fontSize: 30,
								fontWeight: 700,
								color: isDark ? 'rgba(226, 232, 240, 0.14)' : 'rgba(31, 26, 31, 0.08)',
								transform: `rotate(${(i % 2 === 0 ? 1 : -1) * 8}deg)`,
								userSelect: 'none',
							}}
						>
							{tok.text}
						</div>
					))
				: null}

			{/* Safe-area floor deck starting at y=1410 */}
			<div
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					top: SAFE_AREA.stageBottomY - 12,
					bottom: 0,
					backgroundColor: floor.bg,
					borderTop: `6px solid ${floor.border}`,
				}}
			/>
		</AbsoluteFill>
	);
};

export const TopScenePill: React.FC<{
	readonly step: string;
	readonly title: string;
	readonly bg: string;
	readonly color?: string;
	readonly icon?: React.ReactNode;
}> = ({step, title, bg, color = PALETTE.white, icon}) => {
	const frame = useCurrentFrame();
	const s = popScale(frame, 2, 14, 12);

	return (
		<div
			style={{
				position: 'absolute',
				top: SAFE_AREA.top,
				left: SAFE_AREA.left,
				width: SAFE_AREA.contentWidth,
				display: 'flex',
				justifyContent: 'center',
				pointerEvents: 'none',
			}}
		>
			<div
				style={{
					display: 'inline-flex',
					alignItems: 'center',
					gap: 14,
					padding: '12px 26px',
					borderRadius: 999,
					backgroundColor: bg,
					border: `5px solid ${PALETTE.ink}`,
					boxShadow: `0 7px 0 ${PALETTE.ink}`,
					transform: `scale(${s})`,
				}}
			>
				{icon}
				<span
					style={{
						fontFamily: FONTS.mono,
						fontSize: 25,
						fontWeight: 700,
						color,
						opacity: 0.9,
					}}
				>
					{step}
				</span>
				<span
					style={{
						fontFamily: FONTS.display,
						fontSize: 30,
						fontWeight: 700,
						color,
						letterSpacing: 0.4,
					}}
				>
					{title}
				</span>
			</div>
		</div>
	);
};

export const CartoonCard: React.FC<{
	readonly children: React.ReactNode;
	readonly bg?: string;
	readonly borderColor?: string;
	readonly shadowColor?: string;
	readonly style?: React.CSSProperties;
}> = ({
	children,
	bg = PALETTE.white,
	borderColor = PALETTE.ink,
	shadowColor = PALETTE.ink,
	style,
}) => (
	<div
		style={{
			backgroundColor: bg,
			border: `6px solid ${borderColor}`,
			boxShadow: `0 10px 0 ${shadowColor}`,
			borderRadius: 32,
			padding: 24,
			...style,
		}}
	>
		{children}
	</div>
);

export const SpeechBubble: React.FC<{
	readonly text: string;
	readonly bg?: string;
	readonly textColor?: string;
	readonly tailSide?: 'bottom-left' | 'bottom-right' | 'bottom-center';
	readonly style?: React.CSSProperties;
}> = ({text, bg = PALETTE.white, textColor = PALETTE.ink, tailSide = 'bottom-center', style}) => {
	const tailLeft = tailSide === 'bottom-left' ? 42 : tailSide === 'bottom-right' ? '78%' : '50%';
	return (
		<div
			style={{
				position: 'relative',
				backgroundColor: bg,
				border: `5px solid ${PALETTE.ink}`,
				boxShadow: `0 7px 0 ${PALETTE.ink}`,
				borderRadius: 28,
				padding: '16px 26px',
				fontFamily: FONTS.display,
				fontSize: 32,
				fontWeight: 700,
				color: textColor,
				lineHeight: 1.25,
				...style,
			}}
		>
			{text}
			<div
				style={{
					position: 'absolute',
					bottom: -18,
					left: tailLeft,
					width: 24,
					height: 24,
					backgroundColor: bg,
					borderRight: `5px solid ${PALETTE.ink}`,
					borderBottom: `5px solid ${PALETTE.ink}`,
					transform: 'translateX(-50%) rotate(45deg)',
				}}
			/>
		</div>
	);
};

export type BrowserMode = 'ssr-ready' | 'csr-loading' | 'ssr-hydrate' | 'csr-assemble';

export const BrowserWindow: React.FC<{
	readonly title: string;
	readonly url: string;
	readonly mode: BrowserMode;
	readonly accentColor: string;
	readonly statusText: string;
	readonly width?: number;
	readonly hydrateAtFrame?: number;
	readonly buildStartFrame?: number;
	readonly style?: React.CSSProperties;
}> = ({
	title,
	url,
	mode,
	accentColor,
	statusText,
	width = 820,
	hydrateAtFrame = 70,
	buildStartFrame = 60,
	style,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const spinnerRot = (frame * 11) % 360;
	const isHydrated = mode === 'ssr-hydrate' && frame >= hydrateAtFrame;
	const clickFrame = hydrateAtFrame + 28;
	const isClicked = mode === 'ssr-hydrate' && frame >= clickFrame;
	const clickCount =
		mode !== 'ssr-hydrate'
			? 0
			: frame >= clickFrame + 38
				? 2
				: frame >= clickFrame
					? 1
					: 0;

	const cursorX = interpolate(frame, [hydrateAtFrame, clickFrame - 4], [320, 175], {
		easing: Easing.bezier(0.16, 1, 0.3, 1),
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const cursorY = interpolate(frame, [hydrateAtFrame, clickFrame - 4], [240, 172], {
		easing: Easing.bezier(0.16, 1, 0.3, 1),
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const btnSquash =
		isClicked && frame < clickFrame + 10
			? interpolate(frame, [clickFrame, clickFrame + 4, clickFrame + 9], [1, 0.88, 1.04], {
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
				})
			: 1;

	const block1Scale =
		mode === 'csr-assemble' ? popScale(frame, buildStartFrame, 12) : 1;
	const block2Scale =
		mode === 'csr-assemble' ? popScale(frame, buildStartFrame + 18, 12) : 1;
	const block3Scale =
		mode === 'csr-assemble' ? popScale(frame, buildStartFrame + 36, 12) : 1;
	const showSpinnerInAssemble = mode === 'csr-assemble' && frame < buildStartFrame + 10;

	return (
		<div
			style={{
				width,
				backgroundColor: PALETTE.white,
				border: `6px solid ${PALETTE.ink}`,
				boxShadow: `0 12px 0 ${PALETTE.ink}`,
				borderRadius: 28,
				overflow: 'hidden',
				...style,
			}}
		>
			{/* Browser Chrome */}
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: 12,
					padding: '14px 20px',
					backgroundColor: '#f1f5f9',
					borderBottom: `5px solid ${PALETTE.ink}`,
				}}
			>
				<div style={{display: 'flex', gap: 8}}>
					<div
						style={{
							width: 18,
							height: 18,
							borderRadius: '50%',
							backgroundColor: '#ef4444',
							border: `3px solid ${PALETTE.ink}`,
						}}
					/>
					<div
						style={{
							width: 18,
							height: 18,
							borderRadius: '50%',
							backgroundColor: '#f59e0b',
							border: `3px solid ${PALETTE.ink}`,
						}}
					/>
					<div
						style={{
							width: 18,
							height: 18,
							borderRadius: '50%',
							backgroundColor: '#10b981',
							border: `3px solid ${PALETTE.ink}`,
						}}
					/>
				</div>

				<div
					style={{
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						gap: 10,
						backgroundColor: PALETTE.white,
						border: `4px solid ${PALETTE.ink}`,
						borderRadius: 14,
						padding: '6px 14px',
						fontFamily: FONTS.mono,
						fontSize: 21,
						fontWeight: 700,
						color: PALETTE.textDark,
						minWidth: 0,
						overflow: 'hidden',
						whiteSpace: 'nowrap',
					}}
				>
					<FaGlobe size={20} color={accentColor} style={{flexShrink: 0}} />
					<span style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>{url}</span>
				</div>

				<div
					style={{
						padding: '6px 14px',
						borderRadius: 999,
						backgroundColor: accentColor,
						border: `4px solid ${PALETTE.ink}`,
						fontFamily: FONTS.display,
						fontSize: 20,
						fontWeight: 700,
						color: PALETTE.white,
						flexShrink: 0,
					}}
				>
					{statusText}
				</div>
			</div>

			{/* Page Body */}
			<div style={{padding: 18, position: 'relative', minHeight: 168}}>
				{mode === 'csr-loading' || showSpinnerInAssemble ? (
					<div
						style={{
							height: 152,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 12,
							backgroundColor: '#fffbeb',
							borderRadius: 20,
							border: '4px dashed #f59e0b',
						}}
					>
						<div style={{transform: `rotate(${spinnerRot}deg)`, display: 'flex'}}>
							<FaSpinner size={56} color="#ea580c" />
						</div>
						<div
							style={{
								fontFamily: FONTS.display,
								fontSize: 30,
								fontWeight: 700,
								color: '#9a3412',
							}}
						>
							{title}
						</div>
						<div
							style={{
								width: 280,
								height: 14,
								borderRadius: 999,
								backgroundColor: '#fed7aa',
								overflow: 'hidden',
								border: `3px solid ${PALETTE.ink}`,
							}}
						>
							<div
								style={{
									width: `${Math.round(((Math.sin((frame / fps) * 3) + 1) / 2) * 75 + 20)}%`,
									height: '100%',
									backgroundColor: '#f97316',
								}}
							/>
						</div>
					</div>
				) : (
					<div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
						{/* Header block */}
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								backgroundColor: '#ecfdf5',
								border: `4px solid ${PALETTE.ink}`,
								borderRadius: 18,
								padding: '12px 18px',
								transform: `scale(${block1Scale})`,
							}}
						>
							<div style={{display: 'flex', alignItems: 'center', gap: 12}}>
								<div
									style={{
										width: 36,
										height: 36,
										borderRadius: 10,
										backgroundColor: accentColor,
										border: `3px solid ${PALETTE.ink}`,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<FaCheck size={20} color={PALETTE.white} />
								</div>
								<span
									style={{
										fontFamily: FONTS.display,
										fontSize: 28,
										fontWeight: 700,
										color: PALETTE.textDark,
									}}
								>
									{title}
								</span>
							</div>
							<span
								style={{
									fontFamily: FONTS.mono,
									fontSize: 20,
									fontWeight: 700,
									color: '#047857',
								}}
							>
								&lt;html&gt;
							</span>
						</div>

						{/* Content cards row */}
						<div
							style={{
								display: 'flex',
								gap: 14,
								transform: `scale(${block2Scale})`,
							}}
						>
							<div
								style={{
									flex: 1,
									backgroundColor: '#f8fafc',
									border: `4px solid ${PALETTE.ink}`,
									borderRadius: 16,
									padding: 14,
								}}
							>
								<div
									style={{
										height: 18,
										width: '82%',
										borderRadius: 8,
										backgroundColor: '#94a3b8',
										marginBottom: 10,
									}}
								/>
								<div
									style={{
										height: 14,
										width: '62%',
										borderRadius: 8,
										backgroundColor: '#cbd5e1',
									}}
								/>
							</div>

							<div
								style={{
									width: 195,
									backgroundColor: isHydrated
										? '#fef08a'
										: mode === 'ssr-hydrate'
											? '#e2e8f0'
											: '#dbeafe',
									border: `4px solid ${PALETTE.ink}`,
									borderRadius: 16,
									padding: '10px 14px',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 4,
									transform: `scale(${btnSquash * block3Scale})`,
									boxShadow: isHydrated ? `0 5px 0 ${PALETTE.ink}` : 'none',
								}}
							>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: 6,
										fontFamily: FONTS.display,
										fontSize: 23,
										fontWeight: 700,
										color: PALETTE.ink,
									}}
								>
									{isHydrated ? <FaBolt size={20} color="#ca8a04" /> : null}
									<span>
										{mode === 'ssr-hydrate'
											? isHydrated
												? `Klik! (${clickCount})`
												: 'Belum Aktif'
											: mode === 'csr-assemble'
												? 'UI Siap!'
												: 'Konten Siap'}
									</span>
								</div>
							</div>
						</div>

						{/* Hydration pointer wave */}
						{mode === 'ssr-hydrate' && frame >= hydrateAtFrame ? (
							<div
								style={{
									position: 'absolute',
									left: cursorX,
									top: cursorY,
									pointerEvents: 'none',
									filter: 'drop-shadow(0 4px 0 #1f1a1f)',
								}}
							>
								<FaArrowPointer size={40} color="#facc15" />
							</div>
						) : null}
					</div>
				)}
			</div>
		</div>
	);
};

export type FlowStepItem = {
	readonly label: string;
	readonly detail: string;
	readonly icon: 'user' | 'server' | 'html' | 'browser' | 'hydrate' | 'js' | 'render';
	readonly color: string;
	readonly bg: string;
	readonly startFrame: number;
};

const renderFlowIcon = (icon: FlowStepItem['icon'], color: string) => {
	switch (icon) {
		case 'user':
			return <FaUser size={28} color={color} />;
		case 'server':
			return <FaServer size={28} color={color} />;
		case 'html':
			return <FaCode size={28} color={color} />;
		case 'browser':
			return <FaGlobe size={28} color={color} />;
		case 'hydrate':
			return <FaBolt size={28} color={color} />;
		case 'js':
			return <FaGear size={28} color={color} />;
		case 'render':
			return <LuSparkles size={28} color={color} />;
	}
};

export const VerticalFlowPipeline: React.FC<{
	readonly steps: readonly FlowStepItem[];
	readonly top?: number;
}> = ({steps, top = 246}) => {
	const frame = useCurrentFrame();

	return (
		<div
			style={{
				position: 'absolute',
				top,
				left: SAFE_AREA.left,
				width: SAFE_AREA.contentWidth,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: 4,
			}}
		>
			{steps.map((step, idx) => {
				const scale = popScale(frame, step.startFrame, 12, 12);
				const opacity = fadeIn(frame, step.startFrame, 8);
				const isActive = frame >= step.startFrame && (idx === steps.length - 1 || frame < steps[idx + 1].startFrame + 18);
				const arrowProg =
					idx < steps.length - 1
						? interpolate(frame, [step.startFrame + 10, steps[idx + 1].startFrame], [0, 1], {
								extrapolateLeft: 'clamp',
								extrapolateRight: 'clamp',
							})
						: 0;

				return (
					<React.Fragment key={step.label}>
						<div
							style={{
								width: '100%',
								display: 'flex',
								alignItems: 'center',
								gap: 16,
								backgroundColor: step.bg,
								border: `5px solid ${isActive ? step.color : PALETTE.ink}`,
								boxShadow: `0 6px 0 ${PALETTE.ink}`,
								borderRadius: 22,
								padding: '10px 20px',
								transform: `scale(${scale})`,
								opacity,
							}}
						>
							<div
								style={{
									width: 48,
									height: 48,
									borderRadius: 14,
									backgroundColor: PALETTE.white,
									border: `4px solid ${PALETTE.ink}`,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									flexShrink: 0,
								}}
							>
								{renderFlowIcon(step.icon, step.color)}
							</div>

							<div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
								<div
									style={{
										fontFamily: FONTS.mono,
										fontSize: 26,
										fontWeight: 700,
										color: PALETTE.ink,
										lineHeight: 1.12,
									}}
								>
									{step.label}
								</div>
								<div
									style={{
										fontFamily: FONTS.body,
										fontSize: 22,
										fontWeight: 700,
										color: '#334155',
										lineHeight: 1.2,
									}}
								>
									{step.detail}
								</div>
							</div>

							<div
								style={{
									width: 32,
									height: 32,
									borderRadius: '50%',
									backgroundColor: step.color,
									border: `3px solid ${PALETTE.ink}`,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									flexShrink: 0,
								}}
							>
								<FaCheck size={15} color={PALETTE.white} />
							</div>
						</div>

						{idx < steps.length - 1 ? (
							<div
								style={{
									height: 22,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									position: 'relative',
									opacity: fadeIn(frame, step.startFrame + 8, 6),
								}}
							>
								<FaArrowDown
									size={20}
									color={arrowProg > 0.2 ? step.color : '#94a3b8'}
									style={{transform: `translateY(${Math.sin(arrowProg * Math.PI) * 4}px)`}}
								/>
							</div>
						) : null}
					</React.Fragment>
				);
			})}
		</div>
	);
};

export const SubtitleOverlay: React.FC<{
	readonly enabled: boolean;
}> = ({enabled}) => {
	const frame = useCurrentFrame();

	if (!enabled) {
		return null;
	}

	const activeCue = SUBTITLE_CUES.find(
		(cue) => frame >= cue.startFrame && frame <= cue.endFrame,
	);
	if (!activeCue) {
		return null;
	}

	const accentBg =
		activeCue.accent === 'ssr'
			? '#ecfdf5'
			: activeCue.accent === 'csr'
				? '#fff7ed'
				: activeCue.accent === 'nextjs'
					? '#eef2ff'
					: PALETTE.white;

	const accentBorder =
		activeCue.accent === 'ssr'
			? PALETTE.ssrMain
			: activeCue.accent === 'csr'
				? PALETTE.csrMain
				: activeCue.accent === 'nextjs'
					? PALETTE.nextIndigo
					: PALETTE.ink;

	const pop = popScale(frame, activeCue.startFrame, 8, 13);

	return (
		<Interactive.Div
			name="Subtitle Bar"
			style={{
				position: 'absolute',
				top: SAFE_AREA.subtitleTopY,
				left: SAFE_AREA.left,
				width: SAFE_AREA.contentWidth,
				display: 'flex',
				justifyContent: 'center',
				pointerEvents: 'none',
			}}
		>
			<div
				style={{
					maxWidth: SAFE_AREA.contentWidth,
					backgroundColor: accentBg,
					border: `5px solid ${PALETTE.ink}`,
					boxShadow: `0 7px 0 ${accentBorder}`,
					borderRadius: 24,
					padding: '14px 26px',
					textAlign: 'center',
					fontFamily: FONTS.body,
					fontSize: 32,
					fontWeight: 800,
					color: PALETTE.ink,
					lineHeight: 1.28,
					transform: `scale(${0.92 + pop * 0.08})`,
				}}
			>
				{activeCue.text}
			</div>
		</Interactive.Div>
	);
};

export const ObjectTransitionCurtain: React.FC<{
	readonly color: string;
	readonly label?: string;
}> = ({color, label}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const mid = durationInFrames / 2;

	const progress =
		frame <= mid
			? interpolate(frame, [0, mid], [0, 1], {
					easing: Easing.bezier(0.65, 0, 0.35, 1),
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
				})
			: interpolate(frame, [mid, durationInFrames], [1, 0], {
					easing: Easing.bezier(0.65, 0, 0.35, 1),
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
				});

	return (
		<AbsoluteFill
			style={{
				pointerEvents: 'none',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<div
				style={{
					width: 2400,
					height: 2400,
					borderRadius: '50%',
					backgroundColor: color,
					border: `16px solid ${PALETTE.ink}`,
					transform: `scale(${progress * 1.15})`,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{label && progress > 0.65 ? (
					<div
						style={{
							fontFamily: FONTS.display,
							fontSize: 72,
							fontWeight: 700,
							color: PALETTE.white,
							textShadow: `0 6px 0 ${PALETTE.ink}`,
						}}
					>
						{label}
					</div>
				) : null}
			</div>
		</AbsoluteFill>
	);
};
