import React from 'react';
import {
	COLORS as K,
	D2R,
	OW,
	RIG,
	capsulePath,
	rotY,
	smoothPath,
	v3,
	type HandShape,
	type P2,
} from './rig';

const pts = (p: readonly P2[]) => p.map((q) => `${q[0]},${q[1]}`).join(' ');

/** A limb drawn as an outlined tube. */
export const Tube: React.FC<{
	readonly p: readonly P2[];
	readonly w: number;
	readonly color: string;
}> = ({p, w, color}) => (
	<>
		<polyline
			points={pts(p)}
			fill="none"
			stroke={K.outline}
			strokeWidth={w + OW * 2}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<polyline
			points={pts(p)}
			fill="none"
			stroke={color}
			strokeWidth={w}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</>
);

/** A filled shape with an outline that sits outside the fill. */
const Solid: React.FC<{readonly d: string; readonly fill: string; readonly ow?: number}> = ({
	d,
	fill,
	ow = OW,
}) => (
	<>
		<path d={d} fill={K.outline} stroke={K.outline} strokeWidth={ow * 2} strokeLinejoin="round" />
		<path d={d} fill={fill} />
	</>
);

// ---------------------------------------------------------------------------
// Hands. Local space: wrist at (0, 0), the hand extends towards +y.
// ---------------------------------------------------------------------------

type HandPart = {readonly d: string} | {readonly a: P2; readonly b: P2; readonly w: number};
type HandDef = {
	readonly base: readonly HandPart[];
	readonly over?: readonly HandPart[];
	readonly lines?: readonly string[];
};

const FIST = 'M -18 1 C -26 8 -26 36 -18 44 C -10 52 12 52 19 43 C 26 33 25 9 16 1 Z';
const KNUCKLES = ['M -8 46 L -8 39', 'M 3 47 L 3 40', 'M 12 44 L 12 38'];

const HANDS: Record<HandShape, HandDef> = {
	relaxed: {
		base: [
			{a: [-12, 12], b: [-24, 28], w: 11},
			{d: 'M -16 1 C -24 13 -24 36 -15 47 C -7 56 10 56 17 46 C 24 35 23 12 15 1 Z'},
		],
		lines: ['M 5 35 L 6 49', 'M -4 36 L -4 50'],
	},
	fist: {
		base: [{d: FIST}],
		over: [{a: [-15, 18], b: [4, 22], w: 11}],
		lines: KNUCKLES,
	},
	point: {
		base: [
			{d: 'M -18 1 C -26 8 -26 32 -18 39 C -10 46 10 46 17 38 C 24 29 23 8 15 1 Z'},
			{a: [6, 30], b: [8, 74], w: 13},
		],
		over: [{a: [-15, 16], b: [2, 20], w: 11}],
		lines: ['M -11 40 L -11 34', 'M -3 42 L -3 36'],
	},
	open: {
		base: [
			{d: 'M -16 1 C -24 9 -24 30 -15 37 C -5 44 12 42 18 33 C 24 23 22 8 14 1 Z'},
			{a: [-12, 32], b: [-21, 57], w: 11},
			{a: [-3, 36], b: [-5, 64], w: 11},
			{a: [6, 36], b: [9, 63], w: 11},
			{a: [14, 30], b: [22, 53], w: 10},
			{a: [-14, 12], b: [-31, 22], w: 12},
		],
	},
	thumbsUp: {
		base: [{d: FIST}, {a: [-8, 40], b: [-10, 70], w: 15}],
		lines: ['M 0 20 L 14 20', 'M 2 30 L 15 30'],
	},
	peace: {
		base: [
			{d: 'M -18 1 C -26 8 -26 32 -18 39 C -10 46 10 46 17 38 C 24 29 23 8 15 1 Z'},
			{a: [-4, 30], b: [-14, 70], w: 12},
			{a: [7, 30], b: [18, 69], w: 12},
		],
		over: [{a: [-15, 16], b: [2, 20], w: 11}],
		lines: ['M -11 40 L -11 34'],
	},
};

const HAND_SCALE = 1.32;
const HAND_OW = (OW * 0.85) / HAND_SCALE;

const part = (p: HandPart, key: string, color: string, outline: boolean) =>
	'd' in p ? (
		<path
			key={key}
			d={p.d}
			fill={color}
			stroke={outline ? K.outline : 'none'}
			strokeWidth={outline ? HAND_OW * 2 : 0}
			strokeLinejoin="round"
		/>
	) : (
		<line
			key={key}
			x1={p.a[0]}
			y1={p.a[1]}
			x2={p.b[0]}
			y2={p.b[1]}
			stroke={color}
			strokeWidth={p.w + (outline ? HAND_OW * 2 : 0)}
			strokeLinecap="round"
		/>
	);

export const Hand: React.FC<{
	readonly at: P2;
	readonly angle: number;
	readonly mirror: number;
	readonly shape: HandShape;
}> = ({at, angle, mirror, shape}) => {
	const def = HANDS[shape];
	return (
		<g
			transform={`translate(${at[0]} ${at[1]}) rotate(${angle}) scale(${mirror * HAND_SCALE} ${HAND_SCALE})`}
		>
			{def.base.map((p, i) => part(p, `o${i}`, K.outline, true))}
			{def.base.map((p, i) => part(p, `f${i}`, K.skin, false))}
			{(def.over ?? []).map((p, i) => (
				<g key={`over${i}`}>
					{part(p, 'o', K.outline, true)}
					{part(p, 'f', K.skin, false)}
				</g>
			))}
			{(def.lines ?? []).map((d, i) => (
				<path
					key={`line${i}`}
					d={d}
					fill="none"
					stroke={K.outline}
					strokeWidth={2.6}
					strokeLinecap="round"
				/>
			))}
		</g>
	);
};

// ---------------------------------------------------------------------------
// Arm with a full-length modest tunic sleeve and wrist cuff
// ---------------------------------------------------------------------------

export const Arm: React.FC<{
	readonly s: P2;
	readonly e: P2;
	readonly w: P2;
	readonly hand: HandShape;
	readonly handRoll: number;
	readonly mirror: number;
	/** Draw the hand above the sleeve (arm pointing at the camera). */
	readonly handFront: boolean;
}> = ({s, e, w, hand, handRoll, mirror, handFront}) => {
	const dx = e[0] - s[0];
	const dy = e[1] - s[1];
	const l = Math.hypot(dx, dy);
	const ux = l > 0.5 ? dx / l : 0;
	const uy = l > 0.5 ? dy / l : 1;
	const fx = w[0] - e[0];
	const fy = w[1] - e[1];
	const fl = Math.hypot(fx, fy);
	const fux = fl > 0.5 ? fx / fl : ux;
	const fuy = fl > 0.5 ? fy / fl : uy;
	const fnx = -fuy;
	const fny = fux;
	const sleeveEnd: P2 = [w[0] - fux * 6, w[1] - fuy * 6];
	const cuffStart: P2 = [w[0] - fux * 18, w[1] - fuy * 18];
	const cw = RIG.armW / 2 + 2;
	const angle =
		(fl > 4 ? Math.atan2(fy, fx) : Math.atan2(uy, ux)) / D2R - 90 + handRoll;
	const handEl = <Hand at={w} angle={angle} mirror={mirror} shape={hand} />;
	return (
		<g>
			{handFront ? null : handEl}
			<Tube p={[s, e, sleeveEnd]} w={RIG.armW + 4} color={K.shirt} />
			<line
				x1={cuffStart[0] + fnx * cw}
				y1={cuffStart[1] + fny * cw}
				x2={cuffStart[0] - fnx * cw}
				y2={cuffStart[1] - fny * cw}
				stroke={K.shirtShade}
				strokeWidth={5}
				strokeLinecap="round"
			/>
			{handFront ? handEl : null}
		</g>
	);
};

// ---------------------------------------------------------------------------
// Leg: modest trousers with cuff and rose sneakers
// ---------------------------------------------------------------------------

const Shoe: React.FC<{
	readonly at: P2;
	readonly yaw: number;
	readonly pitch: number;
	readonly side: 1 | -1;
	readonly uid: string;
}> = ({at, yaw, pitch, side, uid}) => {
	const fwd = rotY(v3(0, -Math.sin(pitch * D2R), Math.cos(pitch * D2R)), yaw + side * 6);
	const across = Math.abs(rotY(v3(1, 0, 0), yaw + side * 6).x);
	const hr = 21;
	const drop = RIG.ankleH - hr;
	const heel: P2 = [at[0] - fwd.x * 17, at[1] - fwd.y * 17 + drop];
	const toe: P2 = [at[0] + fwd.x * 56, at[1] + fwd.y * 56 + drop + 2];
	const mid: P2 = [(heel[0] + toe[0]) / 2, (heel[1] + toe[1]) / 2];
	const body = capsulePath(heel, toe, hr);
	const width = Math.max(36 * across, 1);
	const bottom = Math.max(heel[1], toe[1]) + hr;
	const clip = `${uid}-shoe${side}`;
	return (
		<g>
			<clipPath id={clip}>
				<path d={body} />
				<ellipse cx={mid[0]} cy={mid[1]} rx={width} ry={hr} />
			</clipPath>
			<g fill={K.outline} stroke={K.outline} strokeWidth={OW * 2} strokeLinejoin="round">
				<path d={body} />
				<ellipse cx={mid[0]} cy={mid[1]} rx={width} ry={hr} />
			</g>
			<g fill={K.shoe}>
				<path d={body} />
				<ellipse cx={mid[0]} cy={mid[1]} rx={width} ry={hr} />
			</g>
			<g clipPath={`url(#${clip})`}>
				{fwd.z > -0.35 ? (
					<ellipse cx={toe[0] + fwd.x * 5} cy={toe[1] + 5} rx={19} ry={14} fill={K.sole} />
				) : null}
				<rect x={mid[0] - 140} y={bottom - 12} width={280} height={30} fill={K.sole} />
				<line
					x1={mid[0] - 140}
					y1={bottom - 12}
					x2={mid[0] + 140}
					y2={bottom - 12}
					stroke={K.outline}
					strokeWidth={3.5}
				/>
			</g>
		</g>
	);
};

export const Leg: React.FC<{
	readonly h: P2;
	readonly k: P2;
	readonly a: P2;
	readonly yaw: number;
	readonly pitch: number;
	readonly side: 1 | -1;
	readonly uid: string;
}> = ({h, k, a, yaw, pitch, side, uid}) => {
	const dx = a[0] - k[0];
	const dy = a[1] - k[1];
	const l = Math.hypot(dx, dy) || 1;
	const top: P2 = [a[0] - (dx / l) * 20, a[1] - (dy / l) * 20];
	const nx = (-dy / l) * (RIG.legW / 2 + 3);
	const ny = (dx / l) * (RIG.legW / 2 + 3);
	return (
		<g>
			<Tube p={[h, k, a]} w={RIG.legW} color={K.pants} />
			<polyline
				points={pts([top, a])}
				stroke={K.outline}
				strokeWidth={RIG.legW + 6 + OW * 2}
				strokeLinecap="butt"
			/>
			<polyline points={pts([top, a])} stroke={K.cuff} strokeWidth={RIG.legW + 6} strokeLinecap="butt" />
			<line
				x1={top[0] + nx}
				y1={top[1] + ny}
				x2={top[0] - nx}
				y2={top[1] - ny}
				stroke={K.outline}
				strokeWidth={4}
			/>
			<Shoe at={a} yaw={yaw} pitch={pitch} side={side} uid={uid} />
		</g>
	);
};

// ---------------------------------------------------------------------------
// Torso (modest A-line tunic) + Hijab chest drape
// ---------------------------------------------------------------------------

/** [y, half width, half depth, forward offset] */
const TORSO: readonly (readonly [number, number, number, number])[] = [
	[-410, 66, 54, 0],
	[-386, 102, 74, 2],
	[-335, 98, 80, 6],
	[-262, 98, 78, 4],
	[-174, 114, 84, 0],
];

export const Torso: React.FC<{
	readonly yaw: number;
	readonly shrug: number;
	readonly uid: string;
}> = ({yaw, shrug, uid}) => {
	const c = Math.cos(yaw * D2R);
	const sn = Math.sin(yaw * D2R);
	const rows = TORSO.map(([y, w, d, zc], i) => ({
		y: i < 2 ? y - shrug : y,
		e: Math.sqrt((w * c) ** 2 + (d * sn) ** 2),
		cx: zc * sn,
	}));
	const hem = rows[rows.length - 1];
	const outline: P2[] = [[rows[0].cx, rows[0].y - 6]];
	rows.forEach((r) => outline.push([r.cx + r.e, r.y]));
	outline.push([hem.cx + hem.e * 0.45, hem.y + 8], [hem.cx - hem.e * 0.45, hem.y + 8]);
	for (let i = rows.length - 1; i >= 0; i--) {
		outline.push([rows[i].cx - rows[i].e, rows[i].y]);
	}
	const d = smoothPath(outline);
	const clip = `${uid}-torso`;

	// Hijab chest/shoulder drape sitting over the top of the tunic
	const dw = Math.sqrt((108 * c) ** 2 + (84 * sn) ** 2);
	const dcx = 6 * sn;
	const dy0 = -418 - shrug;
	const dyMid = -362 - shrug * 0.8;
	const dyBot = -304 - shrug * 0.5 + (c > 0 ? 10 * c : -8);
	const drapePts: P2[] = [
		[dcx, dy0 - 8],
		[dcx + dw * 0.72, dy0 + 6],
		[dcx + dw, dyMid],
		[dcx + dw * 0.58, dyBot - 10],
		[dcx, dyBot],
		[dcx - dw * 0.58, dyBot - 10],
		[dcx - dw, dyMid],
		[dcx - dw * 0.72, dy0 + 6],
	];
	const drapeD = smoothPath(drapePts);
	const drapeClip = `${uid}-drape`;

	return (
		<g>
			<clipPath id={clip}>
				<path d={d} />
			</clipPath>
			<path d={d} fill={K.shirtShade} stroke={K.outline} strokeWidth={OW * 2} strokeLinejoin="round" />
			<g clipPath={`url(#${clip})`}>
				<path d={d} fill={K.shirt} transform="translate(-16 -10)" />
				<ellipse cx={0} cy={-385 - shrug} rx={115} ry={42} fill={K.shirtShade} />
			</g>

			{/* Hijab shoulder & chest drape */}
			<clipPath id={drapeClip}>
				<path d={drapeD} />
			</clipPath>
			<path
				d={drapeD}
				fill={K.hijabShade}
				stroke={K.outline}
				strokeWidth={OW * 2}
				strokeLinejoin="round"
			/>
			<g clipPath={`url(#${drapeClip})`}>
				<path d={drapeD} fill={K.hijab} transform="translate(-12 -8)" />
				{/* Soft fabric drape fold curves */}
				<path
					d={`M ${dcx - dw * 0.65} ${dyMid - 8} Q ${dcx + 6 * c} ${dyBot - 18} ${dcx + dw * 0.72} ${dyMid - 14}`}
					fill="none"
					stroke={K.hijabShade}
					strokeWidth={5.5}
					strokeLinecap="round"
				/>
				<path
					d={`M ${dcx - dw * 0.42} ${dy0 + 18} Q ${dcx + 12 * c} ${dyMid + 14} ${dcx + dw * 0.52} ${dy0 + 22}`}
					fill="none"
					stroke={K.hijabShade}
					strokeWidth={4.5}
					strokeLinecap="round"
				/>
				{c > 0.15 ? (
					<circle
						cx={dcx + 42 * c}
						cy={dyMid + 8}
						r={8}
						fill={K.brooch}
						stroke={K.outline}
						strokeWidth={3.5}
					/>
				) : null}
			</g>
		</g>
	);
};

export const Neck: React.FC = () => (
	<Solid d="M -38 -465 L 38 -465 L 44 -395 L -44 -395 Z" fill={K.hijabShade} />
);

export const GroundShadow: React.FC<{readonly lift: number}> = ({lift}) => {
	const k = Math.max(0.45, 1 - lift / 500);
	return <ellipse cx={0} cy={2} rx={160 * k} ry={22 * k} fill={K.ground} />;
};

