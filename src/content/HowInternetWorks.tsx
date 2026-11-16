import {loadFont} from '@remotion/google-fonts/Fredoka';
import React from 'react';
import {
	FaArrowRight,
	FaBolt,
	FaBookAtlas,
	FaBoxesPacking,
	FaCircleCheck,
	FaCircleXmark,
	FaGlobe,
	FaLaptopCode,
	FaLock,
	FaMagnifyingGlass,
	FaNetworkWired,
	FaRoute,
	FaServer,
	FaThumbsUp,
	FaTowerBroadcast,
	FaWater,
} from 'react-icons/fa6';
import {AbsoluteFill, Easing, Img, Interactive, Track, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {ManCharacter} from '../../character';

loadFont('normal', {weights: ['500', '600', '700'], subsets: ['latin']});

const iconBadgeStyle = (bg: string): React.CSSProperties => ({
	width: 58,
	height: 58,
	borderRadius: 18,
	backgroundColor: bg,
	border: '4px solid #1f1a1f',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexShrink: 0,
	boxShadow: '0 4px 0 #1f1a1f',
});

/**
 * Scene 1: Global Internet Network Bento Card (react-icons + UI/UX Pro Max Neo-Brutalist Bento)
 */
const IntroNetworkIllustration: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const pulse = interpolate(Math.sin(frame * 0.2), [-1, 1], [0.95, 1.05]);
	const dashOffset = -(frame * 3);

	const cardPop = interpolate(frame, [0.2 * fps, 0.7 * fps], [0, 1], {
		easing: Easing.spring({damping: 12}),
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				boxSizing: 'border-box',
			}}
		>
			{/* Hero Header inside Card */}
			<div
				style={{
					backgroundColor: '#1e3a8a',
					border: '6px solid #1f1a1f',
					borderRadius: 28,
					padding: '18px 30px',
					color: '#ffffff',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					boxShadow: '0 8px 0 #1f1a1f',
				}}
			>
				<div>
					<div style={{fontSize: 22, color: '#93c5fd', fontWeight: 700, letterSpacing: 2}}>
						ARSITEKTUR JARINGAN MODERN
					</div>
					<div style={{fontSize: 48, fontWeight: 700, lineHeight: 1.15, marginTop: 4}}>
						Bagaimana Internet Bekerja?
					</div>
				</div>
				<div style={iconBadgeStyle('#38bdf8')}>
					<FaGlobe size={32} color="#1f1a1f" />
				</div>
			</div>

			{/* Network Flow Diagram with react-icons */}
			<div
				style={{
					position: 'relative',
					height: 315,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '0 16px',
				}}
			>
				{/* Animated SVG Connector Lines Behind Nodes */}
				<svg
					width="960"
					height="280"
					viewBox="0 0 960 280"
					style={{position: 'absolute', left: 20, top: 18, pointerEvents: 'none'}}
				>
					<line
						x1="190"
						y1="140"
						x2="480"
						y2="140"
						stroke="#2563eb"
						strokeWidth="10"
						strokeDasharray="18 14"
						strokeDashoffset={dashOffset}
						strokeLinecap="round"
					/>
					<line
						x1="480"
						y1="140"
						x2="770"
						y2="140"
						stroke="#16a34a"
						strokeWidth="10"
						strokeDasharray="18 14"
						strokeDashoffset={dashOffset}
						strokeLinecap="round"
					/>
				</svg>

				{/* Node 1: Client Device */}
				<div
					style={{
						width: 255,
						backgroundColor: '#dbeafe',
						border: '6px solid #1f1a1f',
						borderRadius: 28,
						padding: '22px 18px',
						textAlign: 'center',
						boxShadow: '0 8px 0 #1f1a1f',
						transform: `scale(${cardPop})`,
						zIndex: 1,
					}}
				>
					<div style={{display: 'flex', justifyContent: 'center', marginBottom: 12}}>
						<div style={iconBadgeStyle('#ffffff')}>
							<FaLaptopCode size={30} color="#1d4ed8" />
						</div>
					</div>
					<div style={{fontSize: 30, fontWeight: 700, color: '#1f1a1f'}}>Perangkatmu</div>
					<div
						style={{
							marginTop: 10,
							backgroundColor: '#ffffff',
							border: '4px solid #1f1a1f',
							borderRadius: 14,
							padding: '6px 12px',
							fontFamily: 'monospace',
							fontSize: 22,
							fontWeight: 700,
							color: '#1e3a8a',
						}}
					>
						www.belajar.id
					</div>
				</div>

				{/* Node 2: Global Infrastructure */}
				<div
					style={{
						width: 265,
						backgroundColor: '#e0f2fe',
						border: '6px solid #1f1a1f',
						borderRadius: 999,
						padding: '26px 20px',
						textAlign: 'center',
						boxShadow: '0 8px 0 #1f1a1f',
						transform: `scale(${pulse})`,
						zIndex: 1,
					}}
				>
					<div style={{display: 'flex', justifyContent: 'center', marginBottom: 10}}>
						<div style={iconBadgeStyle('#38bdf8')}>
							<FaNetworkWired size={30} color="#1f1a1f" />
						</div>
					</div>
					<div style={{fontSize: 30, fontWeight: 700, color: '#0369a1'}}>Jaringan Global</div>
					<div style={{fontSize: 22, fontWeight: 600, color: '#1f1a1f', marginTop: 4}}>
						DNS • Router • Fiber
					</div>
				</div>

				{/* Node 3: Data Center Server (with Unsplash thumbnail) */}
				<div
					style={{
						width: 255,
						backgroundColor: '#fef08a',
						border: '6px solid #1f1a1f',
						borderRadius: 28,
						padding: '16px 18px',
						textAlign: 'center',
						boxShadow: '0 8px 0 #1f1a1f',
						transform: `scale(${cardPop})`,
						zIndex: 1,
					}}
				>
					<div
						style={{
							height: 92,
							borderRadius: 16,
							overflow: 'hidden',
							border: '4px solid #1f1a1f',
							marginBottom: 10,
							position: 'relative',
						}}
					>
						<Img
							src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80"
							style={{width: '100%', height: '100%', objectFit: 'cover'}}
						/>
					</div>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 8,
							fontSize: 28,
							fontWeight: 700,
							color: '#1f1a1f',
						}}
					>
						<FaServer size={24} color="#854d0e" />
						<span>Server Web</span>
					</div>
				</div>
			</div>

			{/* Bottom 4-Step Pipeline Pill Bar */}
			<div
				style={{
					backgroundColor: '#fef9c3',
					border: '6px solid #1f1a1f',
					borderRadius: 24,
					padding: '14px 24px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					fontSize: 26,
					fontWeight: 700,
					color: '#1f1a1f',
				}}
			>
				<span style={{display: 'flex', alignItems: 'center', gap: 10}}>
					<FaBookAtlas size={24} color="#1d4ed8" /> 1. Cek DNS
				</span>
				<FaArrowRight size={22} color="#64748b" />
				<span style={{display: 'flex', alignItems: 'center', gap: 10}}>
					<FaBoxesPacking size={24} color="#ea580c" /> 2. Paket Data
				</span>
				<FaArrowRight size={22} color="#64748b" />
				<span style={{display: 'flex', alignItems: 'center', gap: 10}}>
					<FaWater size={24} color="#0284c7" /> 3. Kabel Laut
				</span>
				<FaArrowRight size={22} color="#64748b" />
				<span style={{display: 'flex', alignItems: 'center', gap: 10}}>
					<FaCircleCheck size={24} color="#16a34a" /> 4. Tampil!
				</span>
			</div>
		</div>
	);
};

/**
 * Scene 2: DNS (Domain Name System) Bento Diagram
 */
const DnsDiagramIllustration: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const arrowProgress = interpolate(frame, [0.4 * fps, 1.3 * fps], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const ipPop = interpolate(frame, [1.4 * fps, 2.0 * fps], [0, 1], {
		easing: Easing.spring({damping: 12}),
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				boxSizing: 'border-box',
			}}
		>
			{/* Browser URL Search Bar */}
			<div
				style={{
					backgroundColor: '#eff6ff',
					border: '6px solid #1f1a1f',
					borderRadius: 26,
					padding: '16px 26px',
					display: 'flex',
					alignItems: 'center',
					gap: 18,
					boxShadow: '0 6px 0 #1f1a1f',
				}}
			>
				<div style={iconBadgeStyle('#3b82f6')}>
					<FaMagnifyingGlass size={26} color="#ffffff" />
				</div>
				<div>
					<div style={{fontSize: 20, fontWeight: 700, color: '#2563eb', letterSpacing: 1.5}}>
						ALAMAT YANG DIKETIK PENGGUNA
					</div>
					<div style={{fontSize: 38, fontWeight: 700, color: '#1e3a8a', fontFamily: 'monospace'}}>
						https://www.belajar.id
					</div>
				</div>
			</div>

			{/* 3-Column Bento Comparison: Domain -> DNS Server -> IP Address */}
			<div
				style={{
					display: 'flex',
					alignItems: 'stretch',
					justifyContent: 'space-between',
					gap: 20,
				}}
			>
				{/* Left Card: Human Domain */}
				<div
					style={{
						flex: 1,
						backgroundColor: '#dbeafe',
						border: '6px solid #1f1a1f',
						borderRadius: 28,
						padding: '22px 20px',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						boxShadow: '0 8px 0 #1f1a1f',
					}}
				>
					<div style={{display: 'flex', alignItems: 'center', gap: 12}}>
						<div style={iconBadgeStyle('#ffffff')}>
							<FaGlobe size={28} color="#2563eb" />
						</div>
						<div>
							<div style={{fontSize: 20, fontWeight: 700, color: '#1e40af'}}>BAHASA MANUSIA</div>
							<div style={{fontSize: 32, fontWeight: 700, color: '#1f1a1f'}}>Nama Domain</div>
						</div>
					</div>
					<div
						style={{
							marginTop: 16,
							backgroundColor: '#ffffff',
							border: '5px solid #1f1a1f',
							borderRadius: 18,
							padding: '14px 16px',
							fontSize: 32,
							fontWeight: 700,
							fontFamily: 'monospace',
							color: '#2563eb',
							textAlign: 'center',
						}}
					>
						belajar.id
					</div>
				</div>

				{/* Center Card: DNS Phonebook */}
				<div
					style={{
						width: 265,
						backgroundColor: '#fef08a',
						border: '6px solid #1f1a1f',
						borderRadius: 28,
						padding: '22px 18px',
						textAlign: 'center',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						boxShadow: '0 8px 0 #1f1a1f',
						transform: `scale(${0.92 + 0.08 * arrowProgress})`,
					}}
				>
					<div style={iconBadgeStyle('#ffffff')}>
						<FaBookAtlas size={30} color="#ca8a04" />
					</div>
					<div style={{fontSize: 34, fontWeight: 700, color: '#1f1a1f', marginTop: 12}}>Server DNS</div>
					<div style={{fontSize: 23, fontWeight: 600, color: '#854d0e', marginTop: 4}}>
						Buku Telepon Internet
					</div>
				</div>

				{/* Right Card: IP Address */}
				<div
					style={{
						flex: 1,
						backgroundColor: '#dcfce7',
						border: '6px solid #1f1a1f',
						borderRadius: 28,
						padding: '22px 20px',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						boxShadow: '0 8px 0 #1f1a1f',
						transform: `scale(${ipPop})`,
					}}
				>
					<div style={{display: 'flex', alignItems: 'center', gap: 12}}>
						<div style={iconBadgeStyle('#ffffff')}>
							<FaServer size={28} color="#16a34a" />
						</div>
						<div>
							<div style={{fontSize: 20, fontWeight: 700, color: '#166534'}}>BAHASA KOMPUTER</div>
							<div style={{fontSize: 32, fontWeight: 700, color: '#1f1a1f'}}>Alamat IP</div>
						</div>
					</div>
					<div
						style={{
							marginTop: 16,
							backgroundColor: '#ffffff',
							border: '5px solid #1f1a1f',
							borderRadius: 18,
							padding: '14px 16px',
							fontSize: 30,
							fontWeight: 700,
							fontFamily: 'monospace',
							color: '#15803d',
							textAlign: 'center',
						}}
					>
						142.250.190.46
					</div>
				</div>
			</div>

			{/* Bottom Explanation Strip */}
			<div
				style={{
					backgroundColor: '#f8fafc',
					border: '6px solid #1f1a1f',
					borderRadius: 22,
					padding: '16px 26px',
					fontSize: 27,
					fontWeight: 600,
					color: '#1e293b',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					gap: 14,
				}}
			>
				<FaBolt size={26} color="#eab308" />
				<span>
					Komputer berkomunikasi dengan angka — DNS mencarikan nomor{' '}
					<strong style={{color: '#15803d'}}>Alamat IP</strong> server tujuan!
				</span>
			</div>
		</div>
	);
};

/**
 * Scene 3: Data Packets & Router Bento Illustration
 */
const PacketsRouterIllustration: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const packet1X = interpolate(frame, [0.2 * fps, 2.2 * fps], [0, 32], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const packet2X = interpolate(frame, [0.5 * fps, 2.5 * fps], [0, 32], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const packet3X = interpolate(frame, [0.8 * fps, 2.8 * fps], [0, 32], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				boxSizing: 'border-box',
			}}
		>
			{/* Top Protocol Header */}
			<div
				style={{
					backgroundColor: '#ffedd5',
					border: '6px solid #1f1a1f',
					borderRadius: 24,
					padding: '16px 26px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					boxShadow: '0 6px 0 #1f1a1f',
				}}
			>
				<div style={{display: 'flex', alignItems: 'center', gap: 16}}>
					<div style={iconBadgeStyle('#fdba74')}>
						<FaBoxesPacking size={28} color="#1f1a1f" />
					</div>
					<span style={{fontSize: 34, fontWeight: 700, color: '#9a3412'}}>
						Data Dipecah Menjadi Paket Kecil
					</span>
				</div>
				<span
					style={{
						backgroundColor: '#ea580c',
						color: '#ffffff',
						padding: '8px 20px',
						borderRadius: 16,
						border: '4px solid #1f1a1f',
						fontFamily: 'monospace',
						fontSize: 26,
						fontWeight: 700,
					}}
				>
					PROTOKOL TCP/IP
				</span>
			</div>

			{/* Middle Flow: 3 Colored Packets -> Smart Router */}
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					gap: 28,
					padding: '6px 4px',
				}}
			>
				{/* 3 Packets Stack */}
				<div style={{display: 'flex', flexDirection: 'column', gap: 16, flex: 1}}>
					<div
						style={{
							transform: `translateX(${packet1X}px)`,
							backgroundColor: '#fecdd3',
							border: '5px solid #1f1a1f',
							borderRadius: 20,
							padding: '14px 20px',
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							boxShadow: '0 5px 0 #1f1a1f',
						}}
					>
						<span style={{display: 'flex', alignItems: 'center', gap: 12, fontSize: 28, fontWeight: 700, color: '#1f1a1f'}}>
							<FaBoxesPacking size={24} color="#be123c" /> Paket #1 (Header)
						</span>
						<span style={{fontFamily: 'monospace', fontSize: 22, fontWeight: 700, color: '#9f1239'}}>
							IP: 142.250.190.46
						</span>
					</div>

					<div
						style={{
							transform: `translateX(${packet2X}px)`,
							backgroundColor: '#bae6fd',
							border: '5px solid #1f1a1f',
							borderRadius: 20,
							padding: '14px 20px',
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							boxShadow: '0 5px 0 #1f1a1f',
						}}
					>
						<span style={{display: 'flex', alignItems: 'center', gap: 12, fontSize: 28, fontWeight: 700, color: '#1f1a1f'}}>
							<FaBoxesPacking size={24} color="#0369a1" /> Paket #2 (Payload)
						</span>
						<span style={{fontFamily: 'monospace', fontSize: 22, fontWeight: 700, color: '#075985'}}>
							IP: 142.250.190.46
						</span>
					</div>

					<div
						style={{
							transform: `translateX(${packet3X}px)`,
							backgroundColor: '#bbf7d0',
							border: '5px solid #1f1a1f',
							borderRadius: 20,
							padding: '14px 20px',
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							boxShadow: '0 5px 0 #1f1a1f',
						}}
					>
						<span style={{display: 'flex', alignItems: 'center', gap: 12, fontSize: 28, fontWeight: 700, color: '#1f1a1f'}}>
							<FaBoxesPacking size={24} color="#15803d" /> Paket #3 (Urutan 3/3)
						</span>
						<span style={{fontFamily: 'monospace', fontSize: 22, fontWeight: 700, color: '#166534'}}>
							IP: 142.250.190.46
						</span>
					</div>
				</div>

				{/* Smart Router Bento Card */}
				<div
					style={{
						width: 315,
						backgroundColor: '#e0e7ff',
						border: '6px solid #1f1a1f',
						borderRadius: 28,
						padding: '22px 20px',
						textAlign: 'center',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						boxShadow: '0 8px 0 #1f1a1f',
					}}
				>
					<div style={iconBadgeStyle('#818cf8')}>
						<FaTowerBroadcast size={30} color="#ffffff" />
					</div>
					<div style={{fontSize: 34, fontWeight: 700, color: '#1e1b4b', marginTop: 10}}>ROUTER</div>
					<div style={{fontSize: 23, fontWeight: 600, color: '#3730a3', marginTop: 4}}>
						Pengatur Lalu Lintas Data
					</div>
					<div
						style={{
							marginTop: 14,
							backgroundColor: '#ffffff',
							border: '4px solid #1f1a1f',
							borderRadius: 14,
							padding: '8px 14px',
							fontSize: 22,
							fontWeight: 700,
							color: '#15803d',
							display: 'flex',
							alignItems: 'center',
							gap: 8,
						}}
					>
						<FaRoute size={20} color="#16a34a" />
						<span>Jalur Tercepat!</span>
					</div>
				</div>
			</div>

			{/* Bottom Explanation */}
			<div
				style={{
					backgroundColor: '#f8fafc',
					border: '6px solid #1f1a1f',
					borderRadius: 22,
					padding: '16px 24px',
					fontSize: 27,
					fontWeight: 600,
					color: '#334155',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					gap: 12,
				}}
			>
				<FaRoute size={26} color="#ea580c" />
				<span>Setiap paket diberi label nomor urut & diarahkan menghindari jalur jaringan yang padat!</span>
			</div>
		</div>
	);
};

/**
 * Scene 4: Submarine Fiber Optic Cables & Data Center (with Unsplash Photo & react-icons)
 */
const SubmarineCableIllustration: React.FC = () => {
	const frame = useCurrentFrame();
	const lightOffset = -(frame * 8);

	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				boxSizing: 'border-box',
			}}
		>
			{/* Myth vs Fact Bento Row */}
			<div style={{display: 'flex', gap: 20}}>
				<div
					style={{
						flex: 1,
						backgroundColor: '#fee2e2',
						border: '5px solid #1f1a1f',
						borderRadius: 22,
						padding: '12px 20px',
						display: 'flex',
						alignItems: 'center',
						gap: 14,
						boxShadow: '0 6px 0 #1f1a1f',
					}}
				>
					<FaCircleXmark size={38} color="#dc2626" />
					<div>
						<div style={{fontSize: 20, fontWeight: 700, color: '#991b1b'}}>MITOS UMUM</div>
						<div style={{fontSize: 27, fontWeight: 700, color: '#1f1a1f'}}>Melayang di Awan</div>
					</div>
				</div>

				<div
					style={{
						flex: 1.35,
						backgroundColor: '#dcfce7',
						border: '5px solid #1f1a1f',
						borderRadius: 22,
						padding: '12px 20px',
						display: 'flex',
						alignItems: 'center',
						gap: 14,
						boxShadow: '0 6px 0 #1f1a1f',
					}}
				>
					<FaCircleCheck size={38} color="#16a34a" />
					<div>
						<div style={{fontSize: 20, fontWeight: 700, color: '#166534'}}>FAKTA (99% DATA DUNIA)</div>
						<div style={{fontSize: 27, fontWeight: 700, color: '#1f1a1f'}}>Kabel Fiber Optik Dasar Laut!</div>
					</div>
				</div>
			</div>

			{/* Ocean Cross-Section SVG + Unsplash Ocean/Cable Card */}
			<div style={{display: 'flex', gap: 20, height: 340}}>
				<div
					style={{
						flex: 1.65,
						border: '6px solid #1f1a1f',
						borderRadius: 28,
						overflow: 'hidden',
						position: 'relative',
						backgroundColor: '#0284c7',
						boxShadow: '0 8px 0 #1f1a1f',
					}}
				>
					<svg width="620" height="340" viewBox="0 0 620 340" style={{width: '100%', height: '100%'}}>
						<rect x="0" y="0" width="620" height="80" fill="#e0f2fe" />
						<rect x="0" y="80" width="620" height="200" fill="#0369a1" />
						<rect x="0" y="280" width="620" height="60" fill="#d97706" stroke="#1f1a1f" strokeWidth="5" />

						{/* Left Continent */}
						<path d="M 0 50 L 125 50 L 155 280 L 0 280 Z" fill="#22c55e" stroke="#1f1a1f" strokeWidth="6" />
						<text x="60" y="110" textAnchor="middle" fontFamily="Fredoka" fontSize="22" fontWeight="700" fill="#1f1a1f">
							Benua A
						</text>

						{/* Right Continent */}
						<path d="M 465 280 L 495 50 L 620 50 L 620 280 Z" fill="#22c55e" stroke="#1f1a1f" strokeWidth="6" />
						<text x="555" y="110" textAnchor="middle" fontFamily="Fredoka" fontSize="22" fontWeight="700" fill="#1f1a1f">
							Server B
						</text>

						{/* Submarine Fiber Cable */}
						<path
							d="M 105 160 Q 170 260, 240 260 L 380 260 Q 450 260, 515 160"
							fill="none"
							stroke="#1f1a1f"
							strokeWidth="24"
							strokeLinecap="round"
						/>
						<path
							d="M 105 160 Q 170 260, 240 260 L 380 260 Q 450 260, 515 160"
							fill="none"
							stroke="#fde047"
							strokeWidth="10"
							strokeDasharray="24 20"
							strokeDashoffset={lightOffset}
							strokeLinecap="round"
						/>

						<rect x="145" y="125" width="330" height="52" rx="16" fill="#ffffff" stroke="#1f1a1f" strokeWidth="5" />
						<text x="310" y="159" textAnchor="middle" fontFamily="Fredoka" fontSize="24" fontWeight="700" fill="#0369a1">
							Pulsa Cahaya Laser
						</text>
					</svg>
				</div>

				{/* Right Bento Photo Card: Unsplash Fiber / Ocean Infrastructure */}
				<div
					style={{
						flex: 1,
						backgroundColor: '#f8fafc',
						border: '6px solid #1f1a1f',
						borderRadius: 28,
						padding: 16,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						boxShadow: '0 8px 0 #1f1a1f',
					}}
				>
					<div
						style={{
							height: 205,
							borderRadius: 18,
							overflow: 'hidden',
							border: '4px solid #1f1a1f',
							position: 'relative',
						}}
					>
						<Img
							src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=700&q=80"
							style={{width: '100%', height: '100%', objectFit: 'cover'}}
						/>
					</div>
					<div style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 8}}>
						<div style={iconBadgeStyle('#bae6fd')}>
							<FaWater size={26} color="#0369a1" />
						</div>
						<div>
							<div style={{fontSize: 24, fontWeight: 700, color: '#1f1a1f'}}>Serat Optik Kaca</div>
							<div style={{fontSize: 20, fontWeight: 600, color: '#475569'}}>200.000 km/detik</div>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Explanation */}
			<div
				style={{
					backgroundColor: '#fef9c3',
					border: '6px solid #1f1a1f',
					borderRadius: 22,
					padding: '14px 24px',
					fontSize: 27,
					fontWeight: 700,
					color: '#1f1a1f',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					gap: 12,
				}}
			>
				<FaBolt size={26} color="#ca8a04" />
				<span>Kabel bawah samudra menyalurkan sinyal cahaya antarbenua menuju Server Data Center!</span>
			</div>
		</div>
	);
};

/**
 * Scene 5: Reassembly & Bento Grid 4-Step Summary
 */
const SummaryReassemblyIllustration: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const popBrowser = interpolate(frame, [0.2 * fps, 0.8 * fps], [0.88, 1], {
		easing: Easing.spring({damping: 12}),
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				boxSizing: 'border-box',
			}}
		>
			{/* Complete Browser Window Mockup */}
			<div
				style={{
					transform: `scale(${popBrowser})`,
					backgroundColor: '#ffffff',
					border: '6px solid #1f1a1f',
					borderRadius: 28,
					overflow: 'hidden',
					boxShadow: '0 8px 0 #1f1a1f',
				}}
			>
				{/* Browser Top Bar */}
				<div
					style={{
						backgroundColor: '#e2e8f0',
						borderBottom: '5px solid #1f1a1f',
						padding: '12px 22px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
					}}
				>
					<div style={{width: 18, height: 18, borderRadius: 9, backgroundColor: '#ef4444', border: '3px solid #1f1a1f'}} />
					<div style={{width: 18, height: 18, borderRadius: 9, backgroundColor: '#eab308', border: '3px solid #1f1a1f'}} />
					<div style={{width: 18, height: 18, borderRadius: 9, backgroundColor: '#22c55e', border: '3px solid #1f1a1f'}} />
					<div
						style={{
							marginLeft: 10,
							backgroundColor: '#ffffff',
							border: '4px solid #1f1a1f',
							borderRadius: 12,
							padding: '5px 18px',
							fontSize: 22,
							fontWeight: 700,
							fontFamily: 'monospace',
							color: '#15803d',
							flex: 1,
							display: 'flex',
							alignItems: 'center',
							gap: 10,
						}}
					>
						<FaLock size={18} color="#16a34a" />
						<span>https://www.belajar.id — Tersusun Utuh (50 ms)</span>
					</div>
				</div>

				{/* Browser Body */}
				<div
					style={{
						padding: '20px 26px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						backgroundColor: '#f0fdf4',
					}}
				>
					<div style={{display: 'flex', alignItems: 'center', gap: 16}}>
						<div style={iconBadgeStyle('#bbf7d0')}>
							<FaCircleCheck size={30} color="#15803d" />
						</div>
						<div>
							<div style={{fontSize: 34, fontWeight: 700, color: '#166534'}}>Website Berhasil Dimuat!</div>
							<div style={{fontSize: 24, fontWeight: 600, color: '#1f1a1f', marginTop: 4}}>
								Paket #1 + Paket #2 + Paket #3 telah disatukan kembali di layarmu.
							</div>
						</div>
					</div>
					<div
						style={{
							backgroundColor: '#22c55e',
							color: '#ffffff',
							border: '5px solid #1f1a1f',
							borderRadius: 18,
							padding: '10px 22px',
							fontSize: 28,
							fontWeight: 700,
						}}
					>
						100% Siap
					</div>
				</div>
			</div>

			{/* 4-Step Bento Summary Grid with react-icons */}
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: '1fr 1fr',
					gap: 18,
				}}
			>
				<div
					style={{
						backgroundColor: '#dbeafe',
						border: '5px solid #1f1a1f',
						borderRadius: 22,
						padding: '16px 20px',
						display: 'flex',
						alignItems: 'center',
						gap: 16,
						boxShadow: '0 6px 0 #1f1a1f',
					}}
				>
					<div style={iconBadgeStyle('#ffffff')}>
						<FaBookAtlas size={26} color="#1d4ed8" />
					</div>
					<div>
						<div style={{fontSize: 26, fontWeight: 700, color: '#1e3a8a'}}>1. DNS (Buku Telepon)</div>
						<div style={{fontSize: 22, fontWeight: 600, color: '#1f1a1f', marginTop: 2}}>
							Ubah domain jadi Alamat IP
						</div>
					</div>
				</div>

				<div
					style={{
						backgroundColor: '#ffedd5',
						border: '5px solid #1f1a1f',
						borderRadius: 22,
						padding: '16px 20px',
						display: 'flex',
						alignItems: 'center',
						gap: 16,
						boxShadow: '0 6px 0 #1f1a1f',
					}}
				>
					<div style={iconBadgeStyle('#ffffff')}>
						<FaBoxesPacking size={26} color="#ea580c" />
					</div>
					<div>
						<div style={{fontSize: 26, fontWeight: 700, color: '#9a3412'}}>2. Paket Data & Router</div>
						<div style={{fontSize: 22, fontWeight: 600, color: '#1f1a1f', marginTop: 2}}>
							Dipecah & diarahkan cepat
						</div>
					</div>
				</div>

				<div
					style={{
						backgroundColor: '#e0f2fe',
						border: '5px solid #1f1a1f',
						borderRadius: 22,
						padding: '16px 20px',
						display: 'flex',
						alignItems: 'center',
						gap: 16,
						boxShadow: '0 6px 0 #1f1a1f',
					}}
				>
					<div style={iconBadgeStyle('#ffffff')}>
						<FaWater size={26} color="#0284c7" />
					</div>
					<div>
						<div style={{fontSize: 26, fontWeight: 700, color: '#075985'}}>3. Kabel Bawah Laut</div>
						<div style={{fontSize: 22, fontWeight: 600, color: '#1f1a1f', marginTop: 2}}>
							Melesat via fiber optik
						</div>
					</div>
				</div>

				<div
					style={{
						backgroundColor: '#dcfce7',
						border: '5px solid #1f1a1f',
						borderRadius: 22,
						padding: '16px 20px',
						display: 'flex',
						alignItems: 'center',
						gap: 16,
						boxShadow: '0 6px 0 #1f1a1f',
					}}
				>
					<div style={iconBadgeStyle('#ffffff')}>
						<FaThumbsUp size={26} color="#16a34a" />
					</div>
					<div>
						<div style={{fontSize: 26, fontWeight: 700, color: '#166534'}}>4. Tersusun di Layar</div>
						<div style={{fontSize: 22, fontWeight: 600, color: '#1f1a1f', marginTop: 2}}>
							Disatukan dalam milidetik!
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

/**
 * Main Educational Video Composition: "Bagaimana Internet Bekerja?" (How the Internet Works)
 * Starring the Male 2D Cartoon Character Rig (`ManCharacter`), styled with `ui-ux-pro-max`,
 * `react-icons`, and Unsplash visual assets.
 */
export const HowInternetWorks: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	return (
		<AbsoluteFill style={{backgroundColor: '#e8f4ff', fontFamily: 'Fredoka, sans-serif'}}>
			{/* ================================================================= */}
			{/* TRACK 1: SCENE BACKGROUNDS                                        */}
			{/* ================================================================= */}
			<Track name="Backgrounds">
				<Interactive.Div
					name="Bg Scene 1 Intro"
					durationInFrames={4.5 * fps}
					style={{
						position: 'absolute',
						left: 0,
						top: 0,
						width: 1920,
						height: 1080,
						background: 'linear-gradient(180deg, #bae6fd 0%, #f0f9ff 100%)',
					}}
				/>
				<Interactive.Div
					name="Bg Scene 2 DNS"
					from={4.5 * fps}
					durationInFrames={5 * fps}
					style={{
						position: 'absolute',
						left: 0,
						top: 0,
						width: 1920,
						height: 1080,
						background: 'linear-gradient(180deg, #dbeafe 0%, #eff6ff 100%)',
					}}
				/>
				<Interactive.Div
					name="Bg Scene 3 Packets"
					from={9.5 * fps}
					durationInFrames={5 * fps}
					style={{
						position: 'absolute',
						left: 0,
						top: 0,
						width: 1920,
						height: 1080,
						background: 'linear-gradient(180deg, #ffedd5 0%, #fff7ed 100%)',
					}}
				/>
				<Interactive.Div
					name="Bg Scene 4 Submarine Cable"
					from={14.5 * fps}
					durationInFrames={5 * fps}
					style={{
						position: 'absolute',
						left: 0,
						top: 0,
						width: 1920,
						height: 1080,
						background: 'linear-gradient(180deg, #bae6fd 0%, #e0f2fe 100%)',
					}}
				/>
				<Interactive.Div
					name="Bg Scene 5 Summary"
					from={19.5 * fps}
					durationInFrames={4.5 * fps}
					style={{
						position: 'absolute',
						left: 0,
						top: 0,
						width: 1920,
						height: 1080,
						background: 'linear-gradient(180deg, #dcfce7 0%, #f0fdf4 100%)',
					}}
				/>
			</Track>

			{/* Stage Floor */}
			<Interactive.Div
				name="Stage Floor"
				style={{
					position: 'absolute',
					left: 0,
					top: 905,
					width: 1920,
					height: 175,
					backgroundColor: '#cbd5e1',
					borderTop: '8px solid #1f1a1f',
				}}
			/>

			{/* ================================================================= */}
			{/* TRACK 2: TOP STEP HEADERS                                         */}
			{/* ================================================================= */}
			<Track name="Step Headers">
				<Interactive.Div
					name="Header Intro"
					durationInFrames={4.5 * fps}
					style={{
						position: 'absolute',
						left: 80,
						top: 36,
						padding: '14px 38px',
						backgroundColor: '#2563eb',
						color: '#ffffff',
						border: '6px solid #1f1a1f',
						borderRadius: 50,
						fontFamily: 'Fredoka',
						fontSize: 40,
						fontWeight: 700,
						boxShadow: '0 6px 0 #1f1a1f',
						scale: interpolate(frame, [0, 0.4 * fps], [0, 1], {
							easing: Easing.spring({damping: 12}),
							output: 'perceptual-scale',
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						}),
					}}
				>
					Mengenal Cara Kerja Internet
				</Interactive.Div>

				<Interactive.Div
					name="Header Step 1 DNS"
					from={4.5 * fps}
					durationInFrames={5 * fps}
					style={{
						position: 'absolute',
						left: 80,
						top: 36,
						padding: '14px 38px',
						backgroundColor: '#1d4ed8',
						color: '#ffffff',
						border: '6px solid #1f1a1f',
						borderRadius: 50,
						fontFamily: 'Fredoka',
						fontSize: 40,
						fontWeight: 700,
						boxShadow: '0 6px 0 #1f1a1f',
						scale: interpolate(frame, [4.5 * fps, 4.9 * fps], [0, 1], {
							easing: Easing.spring({damping: 12}),
							output: 'perceptual-scale',
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						}),
					}}
				>
					Langkah 1: Mencari Alamat IP di Server DNS
				</Interactive.Div>

				<Interactive.Div
					name="Header Step 2 Packets"
					from={9.5 * fps}
					durationInFrames={5 * fps}
					style={{
						position: 'absolute',
						left: 80,
						top: 36,
						padding: '14px 38px',
						backgroundColor: '#ea580c',
						color: '#ffffff',
						border: '6px solid #1f1a1f',
						borderRadius: 50,
						fontFamily: 'Fredoka',
						fontSize: 40,
						fontWeight: 700,
						boxShadow: '0 6px 0 #1f1a1f',
						scale: interpolate(frame, [9.5 * fps, 9.9 * fps], [0, 1], {
							easing: Easing.spring({damping: 12}),
							output: 'perceptual-scale',
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						}),
					}}
				>
					Langkah 2: Dipecah Jadi Paket Data & Router
				</Interactive.Div>

				<Interactive.Div
					name="Header Step 3 Submarine"
					from={14.5 * fps}
					durationInFrames={5 * fps}
					style={{
						position: 'absolute',
						left: 80,
						top: 36,
						padding: '14px 38px',
						backgroundColor: '#0284c7',
						color: '#ffffff',
						border: '6px solid #1f1a1f',
						borderRadius: 50,
						fontFamily: 'Fredoka',
						fontSize: 40,
						fontWeight: 700,
						boxShadow: '0 6px 0 #1f1a1f',
						scale: interpolate(frame, [14.5 * fps, 14.9 * fps], [0, 1], {
							easing: Easing.spring({damping: 12}),
							output: 'perceptual-scale',
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						}),
					}}
				>
					Langkah 3: Kabel Fiber Optik Bawah Laut & Server
				</Interactive.Div>

				<Interactive.Div
					name="Header Step 4 Summary"
					from={19.5 * fps}
					durationInFrames={4.5 * fps}
					style={{
						position: 'absolute',
						left: 80,
						top: 36,
						padding: '14px 38px',
						backgroundColor: '#16a34a',
						color: '#ffffff',
						border: '6px solid #1f1a1f',
						borderRadius: 50,
						fontFamily: 'Fredoka',
						fontSize: 40,
						fontWeight: 700,
						boxShadow: '0 6px 0 #1f1a1f',
						scale: interpolate(frame, [19.5 * fps, 19.9 * fps], [0, 1], {
							easing: Easing.spring({damping: 12}),
							output: 'perceptual-scale',
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						}),
					}}
				>
					Langkah 4: Tersusun Utuh di Layarmu!
				</Interactive.Div>
			</Track>

			{/* ================================================================= */}
			{/* TRACK 3: EDUCATIONAL VISUAL CARDS                                 */}
			{/* ================================================================= */}
			<Track name="Visual Diagrams">
				<Interactive.Div
					name="Card Scene 1 Intro"
					from={0.2 * fps}
					durationInFrames={4.3 * fps}
					style={{
						position: 'absolute',
						left: 770,
						top: 145,
						width: 1070,
						height: 710,
						backgroundColor: '#ffffff',
						border: '8px solid #1f1a1f',
						borderRadius: 40,
						padding: 32,
						boxSizing: 'border-box',
						boxShadow: '0 14px 0 #1f1a1f',
						scale: interpolate(frame, [0.2 * fps, 0.7 * fps], [0, 1], {
							easing: Easing.spring({damping: 13}),
							output: 'perceptual-scale',
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						}),
					}}
				>
					<IntroNetworkIllustration />
				</Interactive.Div>

				<Interactive.Div
					name="Card Scene 2 DNS"
					from={4.5 * fps}
					durationInFrames={5 * fps}
					style={{
						position: 'absolute',
						left: 770,
						top: 145,
						width: 1070,
						height: 710,
						backgroundColor: '#ffffff',
						border: '8px solid #1f1a1f',
						borderRadius: 40,
						padding: 32,
						boxSizing: 'border-box',
						boxShadow: '0 14px 0 #1f1a1f',
						scale: interpolate(frame, [4.5 * fps, 5.0 * fps], [0, 1], {
							easing: Easing.spring({damping: 13}),
							output: 'perceptual-scale',
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						}),
					}}
				>
					<DnsDiagramIllustration />
				</Interactive.Div>

				<Interactive.Div
					name="Card Scene 3 Packets"
					from={9.5 * fps}
					durationInFrames={5 * fps}
					style={{
						position: 'absolute',
						left: 80,
						top: 145,
						width: 1070,
						height: 710,
						backgroundColor: '#ffffff',
						border: '8px solid #1f1a1f',
						borderRadius: 40,
						padding: 32,
						boxSizing: 'border-box',
						boxShadow: '0 14px 0 #1f1a1f',
						scale: interpolate(frame, [9.5 * fps, 10.0 * fps], [0, 1], {
							easing: Easing.spring({damping: 13}),
							output: 'perceptual-scale',
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						}),
					}}
				>
					<PacketsRouterIllustration />
				</Interactive.Div>

				<Interactive.Div
					name="Card Scene 4 Submarine"
					from={14.5 * fps}
					durationInFrames={5 * fps}
					style={{
						position: 'absolute',
						left: 770,
						top: 145,
						width: 1070,
						height: 710,
						backgroundColor: '#ffffff',
						border: '8px solid #1f1a1f',
						borderRadius: 40,
						padding: 32,
						boxSizing: 'border-box',
						boxShadow: '0 14px 0 #1f1a1f',
						scale: interpolate(frame, [14.5 * fps, 15.0 * fps], [0, 1], {
							easing: Easing.spring({damping: 13}),
							output: 'perceptual-scale',
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						}),
					}}
				>
					<SubmarineCableIllustration />
				</Interactive.Div>

				<Interactive.Div
					name="Card Scene 5 Summary"
					from={19.5 * fps}
					durationInFrames={4.5 * fps}
					style={{
						position: 'absolute',
						left: 770,
						top: 145,
						width: 1070,
						height: 710,
						backgroundColor: '#ffffff',
						border: '8px solid #1f1a1f',
						borderRadius: 40,
						padding: 32,
						boxSizing: 'border-box',
						boxShadow: '0 14px 0 #1f1a1f',
						scale: interpolate(frame, [19.5 * fps, 20.0 * fps], [0, 1], {
							easing: Easing.spring({damping: 13}),
							output: 'perceptual-scale',
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						}),
					}}
				>
					<SummaryReassemblyIllustration />
				</Interactive.Div>
			</Track>

			{/* ================================================================= */}
			{/* TRACK 4: MALE MASCOT CHARACTER ("Host Pria")                      */}
			{/* ================================================================= */}
			<Track name="Mascot">
				<ManCharacter
					name="Pria Masuk Jalan"
					durationInFrames={1.2 * fps}
					motion="walk"
					speed={1.3}
					yaw={90}
					expression="happy"
					style={{
						translate: interpolate(frame, [0, 1.2 * fps], ['-260px 25px', '10px 25px'], {
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						}),
						scale: 0.82,
					}}
				/>

				<ManCharacter
					name="Pria Sapa Pembuka"
					from={1.2 * fps}
					durationInFrames={3.3 * fps}
					yaw={15}
					pose="wave"
					poseTo="idea"
					poseBlend={interpolate(frame, [2.3 * fps, 2.7 * fps], [0, 1], {
						easing: Easing.bezier(0.16, 1, 0.3, 1),
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					})}
					expression="happy"
					expressionTo="excited"
					expressionBlend={interpolate(frame, [2.3 * fps, 2.7 * fps], [0, 1], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					})}
					talking
					style={{translate: '10px 25px', scale: 0.82}}
				/>

				<ManCharacter
					name="Pria Jelaskan DNS"
					from={4.5 * fps}
					durationInFrames={5 * fps}
					yaw={20}
					pose="typing"
					poseTo="pointRight"
					poseBlend={interpolate(frame, [6.0 * fps, 6.4 * fps], [0, 1], {
						easing: Easing.bezier(0.16, 1, 0.3, 1),
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					})}
					expression="focused"
					expressionTo="eureka"
					expressionBlend={interpolate(frame, [6.0 * fps, 6.4 * fps], [0, 1], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					})}
					talking
					style={{translate: '10px 25px', scale: 0.82}}
				/>

				<ManCharacter
					name="Pria Jelaskan Paket Data"
					from={9.5 * fps}
					durationInFrames={5 * fps}
					yaw={-20}
					pose="present"
					poseTo="point"
					poseBlend={interpolate(frame, [11.2 * fps, 11.6 * fps], [0, 1], {
						easing: Easing.bezier(0.16, 1, 0.3, 1),
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					})}
					expression="happy"
					expressionTo="excited"
					expressionBlend={interpolate(frame, [11.2 * fps, 11.6 * fps], [0, 1], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					})}
					talking
					style={{translate: '1100px 25px', scale: 0.82}}
				/>

				<ManCharacter
					name="Pria Jelaskan Kabel Laut"
					from={14.5 * fps}
					durationInFrames={5 * fps}
					yaw={20}
					pose="surprised"
					poseTo="pointRight"
					poseBlend={interpolate(frame, [16.0 * fps, 16.4 * fps], [0, 1], {
						easing: Easing.bezier(0.16, 1, 0.3, 1),
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					})}
					expression="jawDrop"
					expressionTo="proud"
					expressionBlend={interpolate(frame, [16.0 * fps, 16.4 * fps], [0, 1], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					})}
					talking
					style={{translate: '10px 25px', scale: 0.82}}
				/>

				<ManCharacter
					name="Pria Penutup Jempol"
					from={19.5 * fps}
					durationInFrames={4.5 * fps}
					yaw={12}
					pose="cheer"
					poseTo="thumbsUp"
					poseBlend={interpolate(frame, [21.0 * fps, 21.4 * fps], [0, 1], {
						easing: Easing.bezier(0.16, 1, 0.3, 1),
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					})}
					expression="happy"
					expressionTo="wink"
					expressionBlend={interpolate(frame, [21.2 * fps, 21.6 * fps], [0, 1], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					})}
					talking
					style={{translate: '10px 25px', scale: 0.82}}
				/>
			</Track>

			{/* ================================================================= */}
			{/* TRACK 5: SPEECH BUBBLES & CALLOUTS                                */}
			{/* ================================================================= */}
			<Track name="Callouts">
				<Interactive.Div
					name="Bubble Scene 1"
					from={1.4 * fps}
					durationInFrames={3.1 * fps}
					style={{
						position: 'absolute',
						left: 460,
						top: 150,
						padding: '14px 28px',
						backgroundColor: '#fef08a',
						border: '6px solid #1f1a1f',
						borderRadius: 40,
						fontFamily: 'Fredoka',
						fontSize: 32,
						fontWeight: 700,
						color: '#1f1a1f',
						boxShadow: '0 6px 0 #1f1a1f',
						scale: interpolate(frame, [1.4 * fps, 1.8 * fps], [0, 1], {
							easing: Easing.spring({damping: 12}),
							output: 'perceptual-scale',
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						}),
					}}
				>
					Kok bisa secepat kilat?!
				</Interactive.Div>

				<Interactive.Div
					name="Bubble Scene 2"
					from={6.1 * fps}
					durationInFrames={3.4 * fps}
					style={{
						position: 'absolute',
						left: 470,
						top: 150,
						padding: '14px 28px',
						backgroundColor: '#dcfce7',
						border: '6px solid #1f1a1f',
						borderRadius: 40,
						fontFamily: 'Fredoka',
						fontSize: 32,
						fontWeight: 700,
						color: '#166534',
						boxShadow: '0 6px 0 #1f1a1f',
						scale: interpolate(frame, [6.1 * fps, 6.5 * fps], [0, 1], {
							easing: Easing.spring({damping: 12}),
							output: 'perceptual-scale',
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						}),
					}}
				>
					Ketemu Alamat IP-nya!
				</Interactive.Div>

				<Interactive.Div
					name="Bubble Scene 3"
					from={11.2 * fps}
					durationInFrames={3.3 * fps}
					style={{
						position: 'absolute',
						left: 1120,
						top: 145,
						padding: '14px 28px',
						backgroundColor: '#ffedd5',
						border: '6px solid #1f1a1f',
						borderRadius: 40,
						fontFamily: 'Fredoka',
						fontSize: 32,
						fontWeight: 700,
						color: '#9a3412',
						boxShadow: '0 6px 0 #1f1a1f',
						scale: interpolate(frame, [11.2 * fps, 11.6 * fps], [0, 1], {
							easing: Easing.spring({damping: 12}),
							output: 'perceptual-scale',
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						}),
					}}
				>
					Lewat jalur tercepat!
				</Interactive.Div>

				<Interactive.Div
					name="Bubble Scene 4"
					from={15.8 * fps}
					durationInFrames={3.7 * fps}
					style={{
						position: 'absolute',
						left: 450,
						top: 150,
						padding: '14px 28px',
						backgroundColor: '#e0f2fe',
						border: '6px solid #1f1a1f',
						borderRadius: 40,
						fontFamily: 'Fredoka',
						fontSize: 32,
						fontWeight: 700,
						color: '#0369a1',
						boxShadow: '0 6px 0 #1f1a1f',
						scale: interpolate(frame, [15.8 * fps, 16.2 * fps], [0, 1], {
							easing: Easing.spring({damping: 12}),
							output: 'perceptual-scale',
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						}),
					}}
				>
					99% lewat dasar laut!
				</Interactive.Div>

				<Interactive.Div
					name="Bubble Scene 5"
					from={20.8 * fps}
					durationInFrames={3.2 * fps}
					style={{
						position: 'absolute',
						left: 460,
						top: 150,
						padding: '14px 28px',
						backgroundColor: '#fef08a',
						border: '6px solid #1f1a1f',
						borderRadius: 40,
						fontFamily: 'Fredoka',
						fontSize: 32,
						fontWeight: 700,
						color: '#1f1a1f',
						boxShadow: '0 6px 0 #1f1a1f',
						scale: interpolate(frame, [20.8 * fps, 21.2 * fps], [0, 1], {
							easing: Easing.spring({damping: 12}),
							output: 'perceptual-scale',
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						}),
					}}
				>
					Hanya dalam milidetik!
				</Interactive.Div>
			</Track>

			{/* ================================================================= */}
			{/* TRACK 6: SUBTITLES / CAPTIONS AT BOTTOM                           */}
			{/* ================================================================= */}
			<Track name="Captions">
				<Interactive.Div
					name="Caption Scene 1"
					durationInFrames={4.5 * fps}
					style={{
						position: 'absolute',
						left: 110,
						top: 936,
						width: 1700,
						padding: '18px 36px',
						boxSizing: 'border-box',
						backgroundColor: '#1f1a1f',
						color: '#ffffff',
						borderRadius: 28,
						fontFamily: 'Fredoka',
						fontSize: 36,
						fontWeight: 600,
						textAlign: 'center',
					}}
				>
					Pernahkah kamu bertanya, bagaimana website muncul begitu cepat saat kita klik?
				</Interactive.Div>

				<Interactive.Div
					name="Caption Scene 2"
					from={4.5 * fps}
					durationInFrames={5 * fps}
					style={{
						position: 'absolute',
						left: 110,
						top: 936,
						width: 1700,
						padding: '18px 36px',
						boxSizing: 'border-box',
						backgroundColor: '#1f1a1f',
						color: '#ffffff',
						borderRadius: 28,
						fontFamily: 'Fredoka',
						fontSize: 36,
						fontWeight: 600,
						textAlign: 'center',
					}}
				>
					Pertama, browser bertanya ke Server DNS untuk mengubah nama domain menjadi Alamat IP angka.
				</Interactive.Div>

				<Interactive.Div
					name="Caption Scene 3"
					from={9.5 * fps}
					durationInFrames={5 * fps}
					style={{
						position: 'absolute',
						left: 110,
						top: 936,
						width: 1700,
						padding: '18px 36px',
						boxSizing: 'border-box',
						backgroundColor: '#1f1a1f',
						color: '#ffffff',
						borderRadius: 28,
						fontFamily: 'Fredoka',
						fontSize: 36,
						fontWeight: 600,
						textAlign: 'center',
					}}
				>
					Kedua, data dipecah menjadi paket-paket kecil dan diarahkan oleh Router melewati jalur tercepat.
				</Interactive.Div>

				<Interactive.Div
					name="Caption Scene 4"
					from={14.5 * fps}
					durationInFrames={5 * fps}
					style={{
						position: 'absolute',
						left: 110,
						top: 936,
						width: 1700,
						padding: '18px 36px',
						boxSizing: 'border-box',
						backgroundColor: '#1f1a1f',
						color: '#ffffff',
						borderRadius: 28,
						fontFamily: 'Fredoka',
						fontSize: 36,
						fontWeight: 600,
						textAlign: 'center',
					}}
				>
					Ketiga, paket data melesat lewat kabel fiber optik bawah laut menuju Server pusat data!
				</Interactive.Div>

				<Interactive.Div
					name="Caption Scene 5"
					from={19.5 * fps}
					durationInFrames={4.5 * fps}
					style={{
						position: 'absolute',
						left: 110,
						top: 936,
						width: 1700,
						padding: '18px 36px',
						boxSizing: 'border-box',
						backgroundColor: '#1f1a1f',
						color: '#ffffff',
						borderRadius: 28,
						fontFamily: 'Fredoka',
						fontSize: 36,
						fontWeight: 600,
						textAlign: 'center',
					}}
				>
					Keempat, seluruh paket disusun kembali menjadi website utuh di layarmu dalam sekejap!
				</Interactive.Div>
			</Track>
		</AbsoluteFill>
	);
};

