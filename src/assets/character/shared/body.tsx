import React from 'react';
import {
	D2R,
	OW,
	capsulePath,
	rotY,
	smoothPath,
	v3,
	type HandShape,
	type P2,
	type RigDimensions,
} from './rig';

export type BodyPalette = {
	readonly outline: string;
	readonly skin: string;
	readonly shirt: string;
	readonly shirtShade: string;
	readonly pants: string;
	readonly cuff: string;
	readonly shoe: string;
	readonly shoeAccent?: string;
	readonly sole: string;
	readonly ground: string;
};

const pts = (p: readonly P2[]) => p.map((q) => `${q[0]},${q[1]}`).join(' ');

/** A limb drawn as an outlined tube. */
export const Tube: React.FC<{
	readonly p: readonly P2[];
	readonly w: number;
	readonly color: string;
	readonly outline: string;
}> = ({p, w, color, outline}) => (
	<>
		<polyline
			points={pts(p)}
			fill="none"
			stroke={outline}
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
export const Solid: React.FC<{
	readonly d: string;
	readonly fill: string;
	readonly outline: string;
	readonly ow?: number;
}> = ({d, fill, outline, ow = OW}) => (
	<>
		<path d={d} fill={outline} stroke={outline} strokeWidth={ow * 2} strokeLinejoin="round" />
		<path d={d} fill={fill} />
	</>
);

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

const renderHandPart = (
	p: HandPart,
	key: string,
	color: string,
	outline: string | null,
	handOw: number,
) =>
	'd' in p ? (
		<path
			key={key}
			d={p.d}
			fill={color}
			stroke={outline ?? 'none'}
			strokeWidth={outline ? handOw * 2 : 0}
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
			strokeWidth={p.w + (outline ? handOw * 2 : 0)}
			strokeLinecap="round"
		/>
	);

/** Articulated cartoon hand with 6 preset finger shapes. */
export const Hand: React.FC<{
	readonly at: P2;
	readonly angle: number;
	readonly mirror: number;
	readonly shape: HandShape;
	readonly skin: string;
	readonly outline: string;
	readonly scale?: number;
}> = ({at, angle, mirror, shape, skin, outline, scale = 1.38}) => {
	const def = HANDS[shape];
	const handOw = (OW * 0.85) / scale;
	return (
		<g transform={`translate(${at[0]} ${at[1]}) rotate(${angle}) scale(${mirror * scale} ${scale})`}>
			{def.base.map((p, i) => renderHandPart(p, `o${i}`, outline, outline, handOw))}
			{def.base.map((p, i) => renderHandPart(p, `f${i}`, skin, null, handOw))}
			{(def.over ?? []).map((p, i) => (
				<g key={`over${i}`}>
					{renderHandPart(p, 'o', outline, outline, handOw)}
					{renderHandPart(p, 'f', skin, null, handOw)}
				</g>
			))}
			{(def.lines ?? []).map((d, i) => (
				<path
					key={`line${i}`}
					d={d}
					fill="none"
					stroke={outline}
					strokeWidth={2.6}
					strokeLinecap="round"
				/>
			))}
		</g>
	);
};

export type ShoeSize = {
	readonly radius: number;
	readonly heel: number;
	readonly toe: number;
	readonly width: number;
};

const DEFAULT_SHOE_SIZE: ShoeSize = {radius: 22, heel: 18, toe: 60, width: 38};

/** 3D-foreshortened sneaker with optional accent stripe. */
export const Shoe: React.FC<{
	readonly at: P2;
	readonly yaw: number;
	readonly pitch: number;
	readonly side: 1 | -1;
	readonly uid: string;
	readonly rig: RigDimensions;
	readonly k: BodyPalette;
	readonly size?: ShoeSize;
	readonly dressShoe?: boolean;
}> = ({at, yaw, pitch, side, uid, rig, k, size = DEFAULT_SHOE_SIZE, dressShoe = false}) => {
	const fwd = rotY(v3(0, -Math.sin(pitch * D2R), Math.cos(pitch * D2R)), yaw + side * 6);
	const across = Math.abs(rotY(v3(1, 0, 0), yaw + side * 6).x);
	const drop = rig.ankleH - size.radius;
	const heel: P2 = [at[0] - fwd.x * size.heel, at[1] - fwd.y * size.heel + drop];
	const toe: P2 = [at[0] + fwd.x * size.toe, at[1] + fwd.y * size.toe + drop + 2];
	const mid: P2 = [(heel[0] + toe[0]) / 2, (heel[1] + toe[1]) / 2];
	const body = capsulePath(heel, toe, size.radius);
	const width = Math.max(size.width * across, 1);
	const bottom = Math.max(heel[1], toe[1]) + size.radius;
	const clip = `${uid}-shoe${side}`;
	return (
		<g>
			<clipPath id={clip}>
				<path d={body} />
				<ellipse cx={mid[0]} cy={mid[1]} rx={width} ry={size.radius} />
			</clipPath>
			<g fill={k.outline} stroke={k.outline} strokeWidth={OW * 2} strokeLinejoin="round">
				<path d={body} />
				<ellipse cx={mid[0]} cy={mid[1]} rx={width} ry={size.radius} />
			</g>
			<g fill={k.shoe}>
				<path d={body} />
				<ellipse cx={mid[0]} cy={mid[1]} rx={width} ry={size.radius} />
			</g>
			<g clipPath={`url(#${clip})`}>
				{dressShoe ? (
					<>
						{fwd.z > -0.35 && k.shoeAccent ? (
							<ellipse
								cx={toe[0] - fwd.x * 6}
								cy={toe[1] - 4}
								rx={12}
								ry={6}
								fill={k.shoeAccent}
								opacity={0.75}
							/>
						) : null}
						<rect x={mid[0] - 140} y={bottom - 9} width={280} height={24} fill={k.sole} />
					</>
				) : (
					<>
						{k.shoeAccent ? (
							<rect x={mid[0] - 140} y={bottom - 20} width={280} height={8} fill={k.shoeAccent} />
						) : null}
						{fwd.z > -0.35 ? (
							<ellipse
								cx={toe[0] + fwd.x * 5}
								cy={toe[1] + 5}
								rx={size.radius - 2}
								ry={size.radius - 7}
								fill={k.sole}
							/>
						) : null}
						<rect x={mid[0] - 140} y={bottom - 12} width={280} height={30} fill={k.sole} />
						<line
							x1={mid[0] - 140}
							y1={bottom - 12}
							x2={mid[0] + 140}
							y2={bottom - 12}
							stroke={k.outline}
							strokeWidth={3.5}
						/>
					</>
				)}
			</g>
		</g>
	);
};

/** Leg with cuffed pants (and optional cargo pocket seam) plus sneaker or dress shoe. */
export const Leg: React.FC<{
	readonly h: P2;
	readonly k: P2;
	readonly a: P2;
	readonly yaw: number;
	readonly pitch: number;
	readonly side: 1 | -1;
	readonly uid: string;
	readonly rig: RigDimensions;
	readonly palette: BodyPalette;
	readonly cargoSeam?: boolean;
	readonly shoeSize?: ShoeSize;
	readonly dressShoe?: boolean;
}> = ({h, k, a, yaw, pitch, side, uid, rig, palette, cargoSeam = false, shoeSize, dressShoe = false}) => {
	const dx = a[0] - k[0];
	const dy = a[1] - k[1];
	const l = Math.hypot(dx, dy) || 1;
	const top: P2 = [a[0] - (dx / l) * 20, a[1] - (dy / l) * 20];
	const nx = (-dy / l) * (rig.legW / 2 + 3);
	const ny = (dx / l) * (rig.legW / 2 + 3);

	const tdx = k[0] - h[0];
	const tdy = k[1] - h[1];
	const tl = Math.hypot(tdx, tdy) || 1;
	const midThigh: P2 = [(h[0] + k[0]) / 2, (h[1] + k[1]) / 2];
	const outerSign = side * (Math.cos(yaw * D2R) >= 0 ? 1 : -1);
	const pocketOff = (rig.legW / 2 - 4) * outerSign;

	return (
		<g>
			<Tube p={[h, k, a]} w={rig.legW} color={palette.pants} outline={palette.outline} />
			{cargoSeam ? (
				<line
					x1={midThigh[0] + (-tdy / tl) * pocketOff - (tdx / tl) * 14}
					y1={midThigh[1] + (tdx / tl) * pocketOff - (tdy / tl) * 14}
					x2={midThigh[0] + (-tdy / tl) * pocketOff + (tdx / tl) * 14}
					y2={midThigh[1] + (tdx / tl) * pocketOff + (tdy / tl) * 14}
					stroke={palette.cuff}
					strokeWidth={6}
					strokeLinecap="round"
				/>
			) : null}
			<polyline
				points={pts([top, a])}
				stroke={palette.outline}
				strokeWidth={rig.legW + 6 + OW * 2}
				strokeLinecap="butt"
			/>
			<polyline points={pts([top, a])} stroke={palette.cuff} strokeWidth={rig.legW + 6} strokeLinecap="butt" />
			<line
				x1={top[0] + nx}
				y1={top[1] + ny}
				x2={top[0] - nx}
				y2={top[1] - ny}
				stroke={palette.outline}
				strokeWidth={4}
			/>
			<Shoe
				at={a}
				yaw={yaw}
				pitch={pitch}
				side={side}
				uid={uid}
				rig={rig}
				k={palette}
				size={shoeSize}
				dressShoe={dressShoe}
			/>
		</g>
	);
};

export type TorsoSection = readonly [number, number, number, number];

/** Computes 3D-turned torso silhouette path and chest center coordinates. */
export const computeTorsoGeometry = (
	sections: readonly TorsoSection[],
	yaw: number,
	shrug: number,
) => {
	const c = Math.cos(yaw * D2R);
	const sn = Math.sin(yaw * D2R);
	const rows = sections.map(([y, w, d, zc], i) => ({
		y: i < 2 ? y - shrug : y,
		e: Math.sqrt((w * c) ** 2 + (d * sn) ** 2),
		cx: zc * sn,
		d,
	}));
	const hem = rows[rows.length - 1];
	const outline: P2[] = [[rows[0].cx, rows[0].y - 6]];
	rows.forEach((r) => outline.push([r.cx + r.e, r.y]));
	outline.push([hem.cx + hem.e * 0.45, hem.y + 6], [hem.cx - hem.e * 0.45, hem.y + 6]);
	for (let i = rows.length - 1; i >= 0; i--) {
		outline.push([rows[i].cx - rows[i].e, rows[i].y]);
	}
	const chest = rows[2] ?? rows[1];
	const chestFrontX = chest.cx + chest.d * 0.66 * sn;
	return {
		d: smoothPath(outline),
		rows,
		c,
		sn,
		chestFrontX,
	};
};

export const Neck: React.FC<{
	readonly fill: string;
	readonly outline: string;
	readonly halfW?: number;
}> = ({fill, outline, halfW = 26}) => (
	<Solid d={`M ${-halfW} -460 L ${halfW} -460 L ${halfW} -398 L ${-halfW} -398 Z`} fill={fill} outline={outline} />
);

export const GroundShadow: React.FC<{readonly lift: number; readonly color: string; readonly rx?: number}> = ({
	lift,
	color,
	rx = 165,
}) => {
	const k = Math.max(0.45, 1 - lift / 500);
	return <ellipse cx={0} cy={2} rx={rx * k} ry={22 * k} fill={color} />;
};

/** Parameterized sleeve arm supporting full sleeves, 3/4 rolled sleeves, under-cuffs, and wristwatches. */
export const SleeveArm: React.FC<{
	readonly s: P2;
	readonly e: P2;
	readonly w: P2;
	readonly hand: HandShape;
	readonly handRoll: number;
	readonly mirror: number;
	readonly handFront: boolean;
	readonly side: 1 | -1;
	readonly rig: RigDimensions;
	readonly outline: string;
	readonly skin: string;
	readonly sleeveColor: string;
	readonly cuffColor: string;
	/** 1 = full sleeve to wrist, ~0.42 = pushed-up 3/4 sleeve. */
	readonly sleeveRatio?: number;
	readonly underCuffColor?: string;
	readonly watchColor?: string;
	readonly watchFaceColor?: string;
	readonly watchDotColor?: string;
	readonly handScale?: number;
}> = ({
	s,
	e,
	w,
	hand,
	handRoll,
	mirror,
	handFront,
	side,
	rig,
	outline,
	skin,
	sleeveColor,
	cuffColor,
	sleeveRatio = 1,
	underCuffColor,
	watchColor,
	watchFaceColor,
	watchDotColor,
	handScale,
}) => {
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

	const isThreeQuarter = sleeveRatio < 0.95;
	const sleeveEnd: P2 = isThreeQuarter
		? [e[0] + fx * sleeveRatio, e[1] + fy * sleeveRatio]
		: [w[0] - fux * (underCuffColor ? 16 : 8), w[1] - fuy * (underCuffColor ? 16 : 8)];
	const cuffLineAt: P2 = isThreeQuarter
		? sleeveEnd
		: [w[0] - fux * (underCuffColor ? 22 : 20), w[1] - fuy * (underCuffColor ? 22 : 20)];
	const cw = rig.armW / 2 + 4;
	const angle =
		(fl > 4 ? Math.atan2(fy, fx) : Math.atan2(uy, ux)) / D2R - 90 + handRoll;

	const watchPos: P2 = [w[0] - fux * 14, w[1] - fuy * 14];
	const watchHalfW = rig.armW / 2 + 2;

	const handEl = (
		<Hand
			at={w}
			angle={angle}
			mirror={mirror}
			shape={hand}
			skin={skin}
			outline={outline}
			scale={handScale}
		/>
	);

	return (
		<g>
			{isThreeQuarter ? <Tube p={[s, e, w]} w={rig.armW} color={skin} outline={outline} /> : null}
			{handFront ? null : handEl}
			{underCuffColor ? (
				<Tube
					p={[sleeveEnd, [w[0] - fux * 6, w[1] - fuy * 6]]}
					w={rig.armW - 2}
					color={underCuffColor}
					outline={outline}
				/>
			) : null}
			{watchColor && side === 1 ? (
				<g>
					<line
						x1={watchPos[0] + fnx * watchHalfW}
						y1={watchPos[1] + fny * watchHalfW}
						x2={watchPos[0] - fnx * watchHalfW}
						y2={watchPos[1] - fny * watchHalfW}
						stroke={outline}
						strokeWidth={13}
						strokeLinecap="round"
					/>
					<line
						x1={watchPos[0] + fnx * watchHalfW}
						y1={watchPos[1] + fny * watchHalfW}
						x2={watchPos[0] - fnx * watchHalfW}
						y2={watchPos[1] - fny * watchHalfW}
						stroke={watchColor}
						strokeWidth={7}
						strokeLinecap="round"
					/>
					{watchFaceColor ? (
						<>
							<circle
								cx={watchPos[0]}
								cy={watchPos[1]}
								r={7.5}
								fill={watchFaceColor}
								stroke={outline}
								strokeWidth={3.5}
							/>
							{watchDotColor ? <circle cx={watchPos[0]} cy={watchPos[1]} r={2.4} fill={watchDotColor} /> : null}
						</>
					) : null}
				</g>
			) : null}
			<Tube p={[s, e, sleeveEnd]} w={rig.armW + 6} color={sleeveColor} outline={outline} />
			<line
				x1={cuffLineAt[0] + fnx * cw}
				y1={cuffLineAt[1] + fny * cw}
				x2={cuffLineAt[0] - fnx * cw}
				y2={cuffLineAt[1] - fny * cw}
				stroke={cuffColor}
				strokeWidth={7}
				strokeLinecap="round"
			/>
			<line
				x1={cuffLineAt[0] - fux * 5 + fnx * (cw - 2)}
				y1={cuffLineAt[1] - fuy * 5 + fny * (cw - 2)}
				x2={cuffLineAt[0] - fux * 5 - fnx * (cw - 2)}
				y2={cuffLineAt[1] - fuy * 5 - fny * (cw - 2)}
				stroke={outline}
				strokeWidth={3.5}
				strokeLinecap="round"
			/>
			{handFront ? handEl : null}
		</g>
	);
};
