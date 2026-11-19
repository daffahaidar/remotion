import React from 'react';
import {
	FaceBrows,
	FaceInnerFeatures,
	FaceNose,
	FaceSweat,
	JAW,
	createHeadProjection,
	type FaceConfig,
} from '../shared/face';
import {COLORS as K, D2R, OW, R, lerp, smoothPath, v3, type FaceSpec, type P2} from './rig';

const SX = 0.84;
const SZ = 0.92;
const FACE_CFG: FaceConfig = {
	sx: SX,
	sz: SZ,
	eyeA: 23.5,
	eyeY: 0.05,
	erx: 0.185 * R,
	ery: 0.23 * R,
	pupilRadius: 0.122,
	mouthScale: 0.94,
	blushA: 36,
	blushY: 0.36,
	blushRx: 0.125,
	blushRy: 0.065,
	blushOpacity: 0.6,
	eyelashes: 'feminine',
};

export type HeadProps = {
	/** Total head turn in degrees (body yaw + head yaw). */
	readonly yaw: number;
	/** Degrees, + = looking down. */
	readonly nod: number;
	readonly face: FaceSpec;
	/** Eye openness multiplier from blinking, 0..1. */
	readonly blink: number;
	readonly uid: string;
};

/** The hijabi head, drawn around its center (0, 0). */
export const Head: React.FC<HeadProps> = ({yaw, nod, face, blink, uid}) => {
	const proj = createHeadProjection(yaw, nod, SX, SZ);
	const jaw = face.mouth === 'jawDrop' ? 0.28 : (JAW[face.mouth] ?? 0);
	const nodShift = Math.sin(-nod * D2R) * 0.12 * R;
	const {P, sinYaw, cosYaw, crx} = proj;
	const id = (n: string) => `${uid}-${n}`;
	const url = (n: string) => `url(#${id(n)})`;

	// --- outer hijab hood + back bun (cepol) -----------------------------
	const hoodPath = () => {
		const n = 48;
		const pts: P2[] = [];
		const hrx = crx * 1.1;
		const hryTop = R * 1.07;
		const yReach = lerp(0.95, 1.06 + jaw * 0.9, (cosYaw + 1) / 2);
		for (let i = 0; i < n; i++) {
			const th = (i / n) * Math.PI * 2;
			const s = Math.sin(th);
			const c = -Math.cos(th);
			if (c <= 0) {
				const arch = Math.pow(Math.max(0, -c), 3) * 0.04 * R;
				pts.push([s * hrx, c * hryTop - arch + nodShift * 0.3]);
			} else {
				const taper = 1 - 0.08 * c * c;
				const hw = hrx * taper;
				const cz = 0.08 * c * (2 - c) * SZ * sinYaw * R;
				const y = c * yReach * R + c * nodShift;
				pts.push([cz + s * hw, y]);
			}
		}
		return smoothPath(pts);
	};
	const hoodD = hoodPath();
	const bunC = P(v3(0, -0.14, -0.68));
	const bunR = 0.46 * R * Math.pow(Math.abs(sinYaw), 0.7);
	const showBun = Math.abs(sinYaw) > 0.18;

	const hoodShapes = () => (
		<>
			{showBun ? <circle cx={bunC.x} cy={bunC.y} r={bunR} /> : null}
			<path d={hoodD} />
		</>
	);

	// --- front face opening inside the hijab -----------------------------
	const showFace = cosYaw > -0.35;
	const faceOpeningPath = () => {
		const n = 48;
		const pts: P2[] = [];
		const fcx = sinYaw * (0.28 + 0.42 * (1 - Math.max(0, cosYaw))) * R;
		const frx = (0.76 * Math.max(0, cosYaw) + 0.6 * (1 - Math.abs(cosYaw))) * R;
		const yTop = -0.66 * R + nodShift * 0.8;
		const yBot = (0.97 + jaw * 0.9) * R + nodShift;
		const yMid = (yTop + yBot) * 0.44;
		const ryU = yMid - yTop;
		const ryL = yBot - yMid;
		for (let i = 0; i < n; i++) {
			const th = (i / n) * Math.PI * 2;
			const s = Math.sin(th);
			const c = -Math.cos(th);
			if (c <= 0) {
				const peak = Math.pow(Math.max(0, -c), 2.2) * 0.05 * R * Math.max(0, cosYaw);
				pts.push([fcx + s * frx, yMid + c * ryU - peak]);
			} else {
				const taper = 1 - 0.14 * c * c;
				const cz = 0.08 * c * (2 - c) * sinYaw * R;
				pts.push([fcx + cz + s * frx * taper, yMid + c * ryL]);
			}
		}
		return smoothPath(pts);
	};
	const faceD = showFace ? faceOpeningPath() : '';
	const ciputC = P(v3(0, -0.58, 0.85));

	return (
		<g>
			<defs>
				<clipPath id={id('hood')}>{hoodShapes()}</clipPath>
				{showFace ? (
					<clipPath id={id('face')}>
						<path d={faceD} />
					</clipPath>
				) : null}
			</defs>

			{/* Outer hijab hood outline + fill */}
			<g fill={K.outline} stroke={K.outline} strokeWidth={OW * 2} strokeLinejoin="round">
				{hoodShapes()}
			</g>
			<g fill={K.hijabShade}>{hoodShapes()}</g>
			<g clipPath={url('hood')}>
				<g fill={K.hijab} transform={`translate(${-0.06 * R} ${-0.05 * R})`}>
					{hoodShapes()}
				</g>
				<path
					d={`M ${-0.42 * crx} ${-0.84 * R} Q 0 ${-0.98 * R} ${0.42 * crx} ${-0.84 * R}`}
					fill="none"
					stroke={K.hairShine}
					strokeWidth={0.055 * R}
					strokeLinecap="round"
					opacity={0.75}
				/>
				{showBun ? (
					<path
						d={`M ${bunC.x - sinYaw * 0.12 * R} ${bunC.y - 0.28 * R} Q ${bunC.x - sinYaw * 0.25 * R} ${bunC.y} ${bunC.x - sinYaw * 0.1 * R} ${bunC.y + 0.28 * R}`}
						fill="none"
						stroke={K.hijabShade}
						strokeWidth={5}
						strokeLinecap="round"
					/>
				) : null}
			</g>

			{/* Face inside the hijab opening */}
			{showFace ? (
				<g clipPath={url('hood')}>
					<path d={faceD} fill={K.hijabShade} transform="translate(0 12)" />
					<path d={faceD} fill={K.skinShade} stroke={K.outline} strokeWidth={OW * 1.7} strokeLinejoin="round" />
					<g clipPath={url('face')}>
						<path d={faceD} fill={K.skin} transform={`translate(${-0.06 * R} ${-0.05 * R})`} />

						{cosYaw > 0.15 ? (
							<ellipse
								cx={ciputC.x}
								cy={ciputC.y - 10}
								rx={0.68 * crx}
								ry={0.22 * R}
								fill={K.hijabInner}
								stroke={K.outline}
								strokeWidth={4.5}
							/>
						) : null}

						<path
							d={faceD}
							fill="none"
							stroke={K.skinShade}
							strokeWidth={14}
							transform="translate(0 6)"
						/>

						<FaceInnerFeatures proj={proj} face={face} blink={blink} jaw={jaw} cfg={FACE_CFG} k={K} uid={uid} />
						<FaceBrows
							proj={proj}
							face={face}
							k={K}
							browWidth={0.075 * R}
							browY={-0.35}
							browTiltFactor={0.09}
							browCurveFactor={0.055}
							browAngles={[9, 21, 33]}
						/>
					</g>
					<path d={faceD} fill="none" stroke={K.outline} strokeWidth={OW * 1.15} strokeLinejoin="round" />
					<path d={hoodD} fill="none" stroke={K.outline} strokeWidth={OW} strokeLinejoin="round" />
				</g>
			) : null}

			<FaceNose proj={proj} k={K} delicate />
			<FaceSweat proj={proj} face={face} k={K} sweatPos={[52, -0.26]} />
		</g>
	);
};
