import React from 'react';
import {FaCode, FaFire, FaUtensils} from 'react-icons/fa6';
import {LuChefHat, LuScrollText} from 'react-icons/lu';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {FONTS, PALETTE, popScale} from '../theme';

/** Cartoon laptop vector prop for Hook scene. */
export const CartoonLaptop: React.FC<{
	readonly scale?: number;
	readonly screenGlow?: string;
	readonly style?: React.CSSProperties;
}> = ({scale = 1, screenGlow = '#38bdf8', style}) => (
	<svg
		width={420}
		height={270}
		viewBox="0 0 420 270"
		style={{transform: `scale(${scale})`, overflow: 'visible', ...style}}
	>
		{/* Soft drop shadow */}
		<ellipse cx={210} cy={254} rx={182} ry={14} fill="rgba(31,26,31,0.16)" />
		{/* Lid */}
		<rect
			x={52}
			y={16}
			width={316}
			height={196}
			rx={22}
			fill="#334155"
			stroke={PALETTE.ink}
			strokeWidth={8}
		/>
		{/* Screen */}
		<rect
			x={70}
			y={34}
			width={280}
			height={160}
			rx={12}
			fill="#0f172a"
			stroke={PALETTE.ink}
			strokeWidth={5}
		/>
		{/* Glowing code lines */}
		<rect x={92} y={62} width={120} height={14} rx={7} fill={screenGlow} />
		<rect x={92} y={90} width={215} height={14} rx={7} fill="#94a3b8" opacity={0.75} />
		<rect x={92} y={116} width={175} height={14} rx={7} fill="#94a3b8" opacity={0.55} />
		<rect x={92} y={142} width={96} height={22} rx={10} fill="#10b981" />
		{/* Base keyboard deck */}
		<path
			d="M 22 212 L 398 212 L 414 242 C 416 247 411 252 404 252 L 16 252 C 9 252 4 247 6 242 Z"
			fill="#cbd5e1"
			stroke={PALETTE.ink}
			strokeWidth={8}
			strokeLinejoin="round"
		/>
		<rect x={165} y={222} width={90} height={12} rx={6} fill="#64748b" />
	</svg>
);

/** Cute vector chef hat positioned cleanly above a character's head. */
export const ChefHatOverlay: React.FC<{
	readonly style?: React.CSSProperties;
}> = ({style}) => (
	<svg width={170} height={120} viewBox="0 0 170 120" style={{overflow: 'visible', ...style}}>
		<path
			d="M 38 92 C 18 82 14 48 36 34 C 46 12 76 6 88 18 C 106 4 138 14 142 38 C 160 52 154 84 132 92 Z"
			fill={PALETTE.white}
			stroke={PALETTE.ink}
			strokeWidth={7}
			strokeLinejoin="round"
		/>
		<rect
			x={38}
			y={86}
			width={94}
			height={26}
			rx={8}
			fill="#f8fafc"
			stroke={PALETTE.ink}
			strokeWidth={7}
		/>
		<line x1={68} y1={52} x2={68} y2={82} stroke="#cbd5e1" strokeWidth={5} strokeLinecap="round" />
		<line x1={85} y1={46} x2={85} y2={82} stroke="#cbd5e1" strokeWidth={5} strokeLinecap="round" />
		<line x1={102} y1={52} x2={102} y2={82} stroke="#cbd5e1" strokeWidth={5} strokeLinecap="round" />
	</svg>
);

/** Cartoon kitchen counter with sizzling wok, flames, and rising steam. */
export const KitchenStoveStage: React.FC<{
	readonly isCooking: boolean;
	readonly progress: number;
	readonly label?: string;
	readonly style?: React.CSSProperties;
}> = ({isCooking, progress, label = 'DAPUR KOKI', style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const t = frame / fps;

	const panShake = isCooking ? Math.sin(t * 18) * 5 : 0;
	const flameScale = isCooking ? 0.9 + Math.sin(t * 24) * 0.2 : 0;

	return (
		<div
			style={{
				width: 440,
				backgroundColor: PALETTE.white,
				border: `6px solid ${PALETTE.ink}`,
				boxShadow: `0 10px 0 ${PALETTE.ink}`,
				borderRadius: 28,
				padding: 18,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: 10,
				...style,
			}}
		>
			<div style={{display: 'flex', alignItems: 'center', gap: 10}}>
				<LuChefHat size={26} color="#ea580c" />
				<span style={{fontFamily: FONTS.display, fontSize: 25, fontWeight: 700, color: PALETTE.ink}}>
					{label}
				</span>
			</div>

			{/* Wok & animated steam */}
			<div style={{position: 'relative', width: 260, height: 120}}>
				{isCooking ? (
					<>
						{[0, 1, 2].map((i) => {
							const phase = ((t * 1.4 + i * 0.33) % 1);
							return (
								<div
									key={i}
									style={{
										position: 'absolute',
										left: 75 + i * 48 + Math.sin(phase * Math.PI * 2) * 8,
										top: 44 - phase * 42,
										width: 24,
										height: 24,
										borderRadius: '50%',
										backgroundColor: 'rgba(255,255,255,0.9)',
										border: `3px solid ${PALETTE.ink}`,
										opacity: 1 - phase,
									}}
								/>
							);
						})}
						{/* Flying veggies */}
						<div
							style={{
								position: 'absolute',
								left: 118 + Math.sin(t * 10) * 24,
								top: 32 - Math.abs(Math.sin(t * 8)) * 28,
								width: 18,
								height: 18,
								borderRadius: '50%',
								backgroundColor: '#ef4444',
								border: `3px solid ${PALETTE.ink}`,
							}}
						/>
						<div
							style={{
								position: 'absolute',
								left: 145 - Math.cos(t * 9) * 22,
								top: 36 - Math.abs(Math.cos(t * 7)) * 24,
								width: 16,
								height: 16,
								borderRadius: 5,
								backgroundColor: '#22c55e',
								border: `3px solid ${PALETTE.ink}`,
							}}
						/>
					</>
				) : null}

				{/* Pan SVG */}
				<svg
					width={260}
					height={110}
					viewBox="0 0 260 110"
					style={{position: 'absolute', bottom: 0, left: 0}}
				>
					{/* Stove burner */}
					<rect x={45} y={88} width={170} height={18} rx={8} fill="#475569" stroke={PALETTE.ink} strokeWidth={5} />
					{/* Flames */}
					{isCooking ? (
						<g transform={`translate(130, 88) scale(${flameScale})`}>
							<path
								d="M -45 0 C -40 -22 -22 -22 -18 0 C -12 -26 12 -26 18 0 C 24 -22 40 -22 45 0 Z"
								fill="#f97316"
								stroke={PALETTE.ink}
								strokeWidth={4}
							/>
						</g>
					) : null}
					{/* Wok */}
					<g transform={`translate(0, ${panShake})`}>
						<line x1={182} y1={56} x2={245} y2={42} stroke={PALETTE.ink} strokeWidth={12} strokeLinecap="round" />
						<path
							d="M 55 54 Q 130 98 205 54 Z"
							fill="#1e293b"
							stroke={PALETTE.ink}
							strokeWidth={6}
							strokeLinejoin="round"
						/>
						<ellipse cx={130} cy={54} rx={75} ry={12} fill="#fbbf24" stroke={PALETTE.ink} strokeWidth={5} />
					</g>
				</svg>
			</div>

			{/* Cooking Progress Bar */}
			<div
				style={{
					width: '100%',
					height: 18,
					borderRadius: 999,
					backgroundColor: '#e2e8f0',
					border: `4px solid ${PALETTE.ink}`,
					overflow: 'hidden',
				}}
			>
				<div
					style={{
						width: `${Math.round(Math.max(0, Math.min(1, progress)) * 100)}%`,
						height: '100%',
						backgroundColor: progress >= 1 ? PALETTE.ssrMain : '#f97316',
					}}
				/>
			</div>
		</div>
	);
};

/** Silver Cloche plate that can open with spring animation or morph into HTML card. */
export const ClochePlateProp: React.FC<{
	readonly lidOpenProgress: number; // 0 = closed, 1 = lifted open
	readonly morphToHtml?: number; // 0 = plate, 1 = HTML website card
	readonly label?: string;
	readonly style?: React.CSSProperties;
}> = ({lidOpenProgress, morphToHtml = 0, label = 'HTML Siap!', style}) => {
	const lidY = interpolate(lidOpenProgress, [0, 1], [0, -78], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const lidRot = interpolate(lidOpenProgress, [0, 1], [0, -18], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	if (morphToHtml > 0.5) {
		const cardScale = interpolate(morphToHtml, [0.5, 1], [0.75, 1.05], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		});
		return (
			<div
				style={{
					width: 290,
					backgroundColor: PALETTE.ssrLight,
					border: `6px solid ${PALETTE.ink}`,
					boxShadow: `0 10px 0 ${PALETTE.ink}`,
					borderRadius: 24,
					padding: 16,
					transform: `scale(${cardScale})`,
					display: 'flex',
					flexDirection: 'column',
					gap: 10,
					...style,
				}}
			>
				<div style={{display: 'flex', alignItems: 'center', gap: 10}}>
					<FaCode size={26} color={PALETTE.ssrDark} />
					<span style={{fontFamily: FONTS.mono, fontSize: 24, fontWeight: 700, color: PALETTE.ink}}>
						index.html
					</span>
				</div>
				<div style={{height: 14, width: '90%', borderRadius: 7, backgroundColor: PALETTE.ssrMain}} />
				<div style={{height: 14, width: '68%', borderRadius: 7, backgroundColor: '#6ee7b7'}} />
				<div
					style={{
						alignSelf: 'flex-start',
						padding: '4px 12px',
						borderRadius: 999,
						backgroundColor: PALETTE.ssrMain,
						border: `3px solid ${PALETTE.ink}`,
						fontFamily: FONTS.display,
						fontSize: 20,
						fontWeight: 700,
						color: PALETTE.white,
					}}
				>
					{label}
				</div>
			</div>
		);
	}

	return (
		<svg width={210} height={150} viewBox="0 0 210 150" style={{overflow: 'visible', ...style}}>
			{/* Plate base */}
			<ellipse cx={105} cy={126} rx={88} ry={20} fill={PALETTE.white} stroke={PALETTE.ink} strokeWidth={6} />
			<ellipse cx={105} cy={123} rx={64} ry={12} fill="#e2e8f0" />
			{/* Hot dish revealed when lid opens */}
			<ellipse cx={105} cy={112} rx={52} ry={18} fill="#f59e0b" stroke={PALETTE.ink} strokeWidth={5} />
			<circle cx={90} cy={104} r={10} fill="#ef4444" stroke={PALETTE.ink} strokeWidth={3} />
			<circle cx={120} cy={106} r={9} fill="#22c55e" stroke={PALETTE.ink} strokeWidth={3} />
			{/* Silver Cloche Lid */}
			<g transform={`translate(105, 114) rotate(${lidRot}) translate(-105, ${-114 + lidY})`}>
				<circle cx={105} cy={40} r={11} fill="#fbbf24" stroke={PALETTE.ink} strokeWidth={5} />
				<path
					d="M 30 112 C 30 56 180 56 180 112 Z"
					fill="#cbd5e1"
					stroke={PALETTE.ink}
					strokeWidth={6}
					strokeLinejoin="round"
				/>
				<path d="M 58 92 C 62 72 86 64 102 64" fill="none" stroke={PALETTE.white} strokeWidth={6} strokeLinecap="round" />
			</g>
		</svg>
	);
};

/** Dining table with checkered cloth for Restaurant scenes. */
export const DiningTableProp: React.FC<{
	readonly width?: number;
	readonly style?: React.CSSProperties;
}> = ({width = 430, style}) => (
	<div
		style={{
			width,
			height: 92,
			backgroundColor: '#fef3c7',
			border: `6px solid ${PALETTE.ink}`,
			boxShadow: `0 10px 0 ${PALETTE.ink}`,
			borderRadius: 24,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			padding: '0 26px',
			backgroundImage:
				'repeating-linear-gradient(90deg, rgba(239,68,68,0.16) 0px, rgba(239,68,68,0.16) 36px, transparent 36px, transparent 72px)',
			...style,
		}}
	>
		<FaUtensils size={28} color={PALETTE.ink} />
		<span style={{fontFamily: FONTS.display, fontSize: 26, fontWeight: 700, color: PALETTE.ink}}>
			MEJA PELANGGAN
		</span>
		<FaUtensils size={28} color={PALETTE.ink} />
	</div>
);

/** Raw ingredients crate + Recipe scroll for CSR analogy scene. */
export const RawIngredientsAndRecipe: React.FC<{
	readonly morphToUi?: number; // 0 = raw ingredients, 1 = UI blocks
	readonly style?: React.CSSProperties;
}> = ({morphToUi = 0, style}) => {
	const frame = useCurrentFrame();
	const s1 = popScale(frame, 8, 12);

	if (morphToUi > 0.5) {
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: 12,
					width: 340,
					backgroundColor: PALETTE.csrLight,
					border: `6px solid ${PALETTE.ink}`,
					boxShadow: `0 10px 0 ${PALETTE.ink}`,
					borderRadius: 28,
					padding: 18,
					transform: `scale(${interpolate(morphToUi, [0.5, 1], [0.82, 1])})`,
					...style,
				}}
			>
				<div
					style={{
						padding: '8px 14px',
						backgroundColor: PALETTE.white,
						border: `4px solid ${PALETTE.ink}`,
						borderRadius: 14,
						fontFamily: FONTS.mono,
						fontSize: 22,
						fontWeight: 700,
						color: PALETTE.ink,
					}}
				>
					&lt;Navbar /&gt;
				</div>
				<div
					style={{
						padding: '8px 14px',
						backgroundColor: '#fef08a',
						border: `4px solid ${PALETTE.ink}`,
						borderRadius: 14,
						fontFamily: FONTS.mono,
						fontSize: 22,
						fontWeight: 700,
						color: PALETTE.ink,
					}}
				>
					&lt;CardGrid /&gt;
				</div>
				<div
					style={{
						padding: '8px 14px',
						backgroundColor: PALETTE.csrMain,
						border: `4px solid ${PALETTE.ink}`,
						borderRadius: 14,
						fontFamily: FONTS.mono,
						fontSize: 22,
						fontWeight: 700,
						color: PALETTE.white,
					}}
				>
					&lt;Button /&gt;
				</div>
			</div>
		);
	}

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				gap: 18,
				transform: `scale(${s1})`,
				...style,
			}}
		>
			{/* Crate of raw ingredients */}
			<div
				style={{
					width: 220,
					backgroundColor: '#d97706',
					border: `6px solid ${PALETTE.ink}`,
					boxShadow: `0 8px 0 ${PALETTE.ink}`,
					borderRadius: 22,
					padding: 14,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 8,
				}}
			>
				<svg width={150} height={66} viewBox="0 0 150 66">
					<circle cx={34} cy={36} r={22} fill="#ef4444" stroke={PALETTE.ink} strokeWidth={5} />
					<path d="M 34 14 L 40 6" stroke="#16a34a" strokeWidth={5} strokeLinecap="round" />
					<ellipse cx={82} cy={38} rx={20} ry={24} fill="#fef3c7" stroke={PALETTE.ink} strokeWidth={5} />
					<path d="M 118 22 C 138 22 142 52 118 54 C 102 52 102 24 118 22 Z" fill="#22c55e" stroke={PALETTE.ink} strokeWidth={5} />
				</svg>
				<span style={{fontFamily: FONTS.display, fontSize: 22, fontWeight: 700, color: PALETTE.white}}>
					BAHAN MENTAH
				</span>
			</div>

			{/* Recipe Scroll */}
			<div
				style={{
					width: 210,
					backgroundColor: '#fef9c3',
					border: `6px solid ${PALETTE.ink}`,
					boxShadow: `0 8px 0 ${PALETTE.ink}`,
					borderRadius: 22,
					padding: 14,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 6,
				}}
			>
				<LuScrollText size={42} color="#b45309" />
				<span style={{fontFamily: FONTS.mono, fontSize: 22, fontWeight: 700, color: PALETTE.ink}}>
					RESEP.js
				</span>
				<span style={{fontFamily: FONTS.body, fontSize: 18, fontWeight: 700, color: '#92400e'}}>
					Masak Sendiri!
				</span>
			</div>
		</div>
	);
};

export const CookingFireIcon: React.FC = () => <FaFire size={26} color="#ea580c" />;
