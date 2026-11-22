import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {MONO, TONES, type Tone} from '../shared/theme';
import {useLook} from '../shared/ui';

export * from '../shared/ui';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/** The three JWT parts in their colors. Parts stay neutral until their `colorAt` time. */
export const TokenText: React.FC<{
	readonly parts: readonly [string, string, string];
	readonly colorAt?: readonly [number, number, number];
	readonly size?: number;
	readonly typeAt?: number;
	readonly cps?: number;
	/** From this time the two separator dots grow and turn gold. */
	readonly dotAt?: number;
	readonly style?: React.CSSProperties;
}> = ({parts, colorAt = [0, 0, 0], size = 36, typeAt, cps = 70, dotAt = 999, style}) => {
	const look = useLook();
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const t = frame / fps;
	const shown = typeAt === undefined ? Infinity : Math.max(0, Math.floor((t - typeAt) * cps));
	const tones: readonly Tone[] = ['header', 'payload', 'signature'];
	let used = 0;
	return (
		<div style={{fontFamily: MONO, fontSize: size, fontWeight: 700, lineHeight: 1.4, wordBreak: 'break-all', ...style}}>
			{parts.map((part, i) => {
				const visible = part.slice(0, Math.max(0, shown - used));
				const dot = i < 2 && shown - used > part.length ? '.' : '';
				used += part.length + 1;
				const on = t >= colorAt[i];
				const glow = interpolate(t, [colorAt[i], colorAt[i] + 0.25, colorAt[i] + 0.9], [0, 1, 0.35], clamp);
				return (
					<React.Fragment key={tones[i]}>
						<span
							style={{
								color: on ? look.tone(tones[i]) : look.dim,
								backgroundColor: on ? `${TONES[tones[i]].fill}${Math.round(glow * 40).toString(16).padStart(2, '0')}` : undefined,
								borderRadius: 8,
							}}
						>
							{visible}
						</span>
						{dot ? (
							<span
								style={{
									color: t >= dotAt ? look.tone('gold') : look.text,
									fontWeight: 800,
									fontSize: size * (1.25 + 0.9 * interpolate(t, [dotAt, dotAt + 0.3, dotAt + 1.2], [0, 1, 0.45], clamp)),
									lineHeight: 0.8,
								}}
							>
								{dot}
							</span>
						) : null}
					</React.Fragment>
				);
			})}
		</div>
	);
};
