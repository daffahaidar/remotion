import React from 'react';
import {
	FaceBrows,
	FaceInnerFeatures,
	FaceNose,
	FaceSweat,
	HairHeadShell,
	JAW,
	buildTuftPath,
	createHeadProjection,
	type FaceConfig,
	type HairPuff,
	type HairTuft,
	type SkullShapeParams,
	type T3,
} from '../shared/face';
import {COLORS as K, D2R, OW, R, lerp, smoothPath, v3, type FaceSpec, type P2} from './rig';

const SX = 0.83;
const SZ = 0.94;

/** Sharp, narrow angular facial posture tapering to a pointed V-chin. */
const SKULL_SHAPE: SkullShapeParams = {
	jawTaper: 0.23,
	jawZ: 0.13,
	jawSquare: 0,
	chinReach: 1.05,
	crownScale: 0.98,
};

const FACE_CFG: FaceConfig = {
	sx: SX,
	sz: SZ,
	eyeA: 23.5,
	eyeY: 0.03,
	erx: 0.172 * R,
	ery: 0.19 * R,
	pupilRadius: 0.11,
	mouthY: 0.61,
	mouthScale: 0.94,
	blushOpacity: 0.25,
	browWidth: 0.09 * R,
};

const HAIRLINE: readonly P2[] = [
	[0, -0.58],
	[30, -0.56],
	[56, -0.42],
	[80, -0.15],
	[92, 0.02],
	[120, 0.34],
	[155, 0.62],
	[180, 0.76],
];

const PUFFS: readonly HairPuff[] = [
	{c: [-0.24, -0.84, 0.24], r: 0.33},
	{c: [0.26, -0.84, 0.22], r: 0.33},
	{c: [0, -0.82, -0.22], r: 0.38},
	{c: [0, -0.34, -0.62], r: 0.38},
];

const TUFTS: readonly HairTuft[] = [
	{b: [-0.34, -0.78, 0.58], t: [-0.56, -0.34, 0.78], w: 0.24, bend: 0.16},
	{b: [-0.04, -0.8, 0.62], t: [0.22, -0.32, 0.84], w: 0.26, bend: -0.18},
	{b: [0.28, -0.78, 0.58], t: [0.58, -0.36, 0.76], w: 0.22, bend: -0.14},
];

const SHINES: readonly (readonly T3[])[] = [
	[
		[-0.28, -0.72, -0.74],
		[0, -0.82, -0.72],
		[0.28, -0.72, -0.74],
	],
];

export type HeadProps = {
	readonly yaw: number;
	readonly nod: number;
	readonly face: FaceSpec;
	readonly blink: number;
	readonly uid: string;
	readonly hoodUp?: boolean;
	readonly showMask?: boolean;
};

/** Hacker head: sharp V-chin face posture, hoodie hood UP with matrix-green trim, and optional cyber mask. */
export const Head: React.FC<HeadProps> = ({
	yaw,
	nod,
	face,
	blink,
	uid,
	hoodUp = true,
	showMask = false,
}) => {
	const proj = createHeadProjection(yaw, nod, SX, SZ);
	const jaw = JAW[face.mouth] ?? 0;

	const renderMask = () => {
		if (!showMask || proj.cosYaw < -0.25) {
			return null;
		}
		const mTopL = proj.P(proj.sph(-48, 0.28, 1.02));
		const mTopM = proj.P(proj.sph(0, 0.22, 1.05));
		const mTopR = proj.P(proj.sph(48, 0.28, 1.02));
		const mBot = proj.P(proj.sph(0, 0.94 + jaw * 0.4, 0.98));
		const mBotL = proj.P(proj.sph(-44, 0.76, 0.98));
		const mBotR = proj.P(proj.sph(44, 0.76, 0.98));
		const maskD = smoothPath([
			[mTopL.x, mTopL.y],
			[mTopM.x, mTopM.y],
			[mTopR.x, mTopR.y],
			[mBotR.x, mBotR.y],
			[mBot.x, mBot.y],
			[mBotL.x, mBotL.y],
		]);
		const gC = proj.P(proj.sph(0, 0.58, 1.04));
		return (
			<g>
				<path d={maskD} fill={K.mask} stroke={K.outline} strokeWidth={4.5} strokeLinejoin="round" />
				{proj.cosYaw > 0.15 ? (
					<path
						d={`M ${gC.x - 22 * proj.cosYaw} ${gC.y - 6} L ${gC.x} ${gC.y + 8} L ${gC.x + 22 * proj.cosYaw} ${gC.y - 6}`}
						fill="none"
						stroke={K.matrix}
						strokeWidth={4.5}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				) : null}
			</g>
		);
	};

	if (!hoodUp) {
		return (
			<HairHeadShell
				yaw={yaw}
				nod={nod}
				face={face}
				blink={blink}
				uid={uid}
				faceCfg={FACE_CFG}
				skullShape={SKULL_SHAPE}
				k={K}
				hairline={HAIRLINE}
				puffs={PUFFS}
				tufts={TUFTS}
				shines={SHINES}
				browY={-0.34}
				extraFace={renderMask()}
			/>
		);
	}

	// --- Hoodie hood UP 3D projection ------------------------------------
	const {P, sinYaw, cosYaw, crx} = proj;
	const nodShift = Math.sin(-nod * D2R) * 0.12 * R;
	const id = (n: string) => `${uid}-${n}`;
	const url = (n: string) => `url(#${id(n)})`;

	const hoodPath = () => {
		const n = 48;
		const pts: P2[] = [];
		const hrx = crx * 1.15;
		const hryTop = R * 1.12;
		const yReach = lerp(0.98, 1.08 + jaw * 0.8, (cosYaw + 1) / 2);
		for (let i = 0; i < n; i++) {
			const th = (i / n) * Math.PI * 2;
			const s = Math.sin(th);
			const c = -Math.cos(th);
			if (c <= 0) {
				// Pointed mysterious hacker hood peak at crown
				const peak = Math.pow(Math.max(0, -c), 2.5) * 0.08 * R;
				pts.push([s * hrx, c * hryTop - peak + nodShift * 0.3]);
			} else {
				const taper = 1 - 0.06 * c * c;
				const hw = hrx * taper;
				const cz = 0.08 * c * (2 - c) * SZ * sinYaw * R;
				const y = c * yReach * R + c * nodShift;
				pts.push([cz + s * hw, y]);
			}
		}
		return smoothPath(pts);
	};
	const hoodD = hoodPath();
	// Slight pointed back hood tail visible in 3/4 and side views
	const tailTip = P(v3(0, -0.35, -1.06));
	const showTail = Math.abs(sinYaw) > 0.2;

	const showFace = cosYaw > -0.35;
	// Front face opening inside the hoodie hood (covers side/back skull cleanly in 3/4 and side views).
	const faceOpeningPath = () => {
		const n = 48;
		const pts: P2[] = [];
		const fcx = sinYaw * (0.28 + 0.44 * (1 - Math.max(0, cosYaw))) * R;
		const frx = (0.78 * Math.max(0, cosYaw) + 0.54 * (1 - Math.abs(cosYaw))) * R;
		const yTop = -0.68 * R + nodShift * 0.8;
		const yBot = (0.98 + jaw * 0.85) * R + nodShift;
		const yMid = (yTop + yBot) * 0.44;
		const ryU = yMid - yTop;
		const ryL = yBot - yMid;
		for (let i = 0; i < n; i++) {
			const th = (i / n) * Math.PI * 2;
			const s = Math.sin(th);
			const c = -Math.cos(th);
			if (c <= 0) {
				pts.push([fcx + s * frx, yMid + c * ryU]);
			} else {
				const taper = 1 - 0.22 * c * c;
				const cz = 0.08 * c * (2 - c) * sinYaw * R;
				pts.push([fcx + cz + s * frx * taper, yMid + c * ryL]);
			}
		}
		return smoothPath(pts);
	};
	const faceD = showFace ? faceOpeningPath() : '';
	const hoodBangs = TUFTS.map((t) => {
		const b = P(v3(t.b[0], t.b[1], t.b[2]));
		return buildTuftPath(b, P(v3(t.t[0], t.t[1], t.t[2])), t.w * R, t.bend);
	});
	const bangCapC = P(v3(0, -0.62, 0.82));

	return (
		<g>
			<defs>
				<clipPath id={id('hood')}>
					<path d={hoodD} />
				</clipPath>
				{showFace ? (
					<clipPath id={id('face')}>
						<path d={faceD} />
					</clipPath>
				) : null}
			</defs>

			{/* Outer hood silhouette */}
			{showTail ? (
				<path
					d={`M 0 ${-0.9 * R} Q ${tailTip.x * 1.12} ${tailTip.y - 30} ${tailTip.x} ${tailTip.y + 40} L 0 ${0.4 * R} Z`}
					fill={K.hoodShade}
					stroke={K.outline}
					strokeWidth={OW * 2}
					strokeLinejoin="round"
				/>
			) : null}
			<path d={hoodD} fill={K.hoodShade} stroke={K.outline} strokeWidth={OW * 2} strokeLinejoin="round" />
			<g clipPath={url('hood')}>
				<path d={hoodD} fill={K.hood} transform={`translate(${-0.06 * R} ${-0.05 * R})`} />
			</g>

			{/* Face inside the shadowed hacker hood */}
			{showFace ? (
				<g clipPath={url('hood')}>
					{/* Matrix-green inner hood rim gleam around face opening */}
					<path d={faceD} fill={K.hoodShade} stroke={K.matrix} strokeWidth={11} strokeLinejoin="round" opacity={0.85} />
					<path d={faceD} fill={K.skinShade} stroke={K.outline} strokeWidth={OW * 1.5} strokeLinejoin="round" />
					<g clipPath={url('face')}>
						<path d={faceD} fill={K.skin} transform={`translate(${-0.06 * R} ${-0.05 * R})`} />

						{/* Dark messy hair base + forehead hood shadow */}
						<ellipse
							cx={bangCapC.x}
							cy={bangCapC.y - 8}
							rx={0.78 * crx}
							ry={0.28 * R}
							fill={K.hair}
							stroke={K.outline}
							strokeWidth={4}
						/>
						<ellipse cx={sinYaw * 32} cy={-0.62 * R} rx={1.1 * crx} ry={0.38 * R} fill={K.skinShade} opacity={0.45} />

						<FaceInnerFeatures proj={proj} face={face} blink={blink} jaw={jaw} cfg={FACE_CFG} k={K} uid={uid} />
						{renderMask()}

						{/* Messy dark hair bangs peeking under hood */}
						{hoodBangs.map((bd, i) => (
							<path key={`hb${i}`} d={bd} fill={K.hair} stroke={K.outline} strokeWidth={4} strokeLinejoin="round" />
						))}

						<FaceBrows proj={proj} face={face} k={K} browWidth={FACE_CFG.browWidth} browY={-0.34} />
					</g>
					<path d={faceD} fill="none" stroke={K.outline} strokeWidth={OW * 1.1} strokeLinejoin="round" />
					<path d={hoodD} fill="none" stroke={K.outline} strokeWidth={OW} strokeLinejoin="round" />
				</g>
			) : null}

			<FaceNose proj={proj} k={K} delicate />
			<FaceSweat proj={proj} face={face} k={K} sweatPos={[48, -0.26]} />
		</g>
	);
};
