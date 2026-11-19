import React from 'react';
import {Interactive, useCurrentFrame, useVideoConfig} from 'remotion';
import {PROP_COLORS, PROP_INK, PROP_OW, propVariants} from './shared';

export type CloudStatus = 'online' | 'upload' | 'download' | 'sync' | 'error';

export type CloudServiceProps = {
	readonly status?: CloudStatus;
	readonly label?: string;
	readonly animated?: boolean;
	readonly style?: React.CSSProperties;
};

const STATUSES: readonly CloudStatus[] = ['online', 'upload', 'download', 'sync', 'error'];
const CLOUD =
	'M 70 160 Q 30 160 32 126 Q 34 96 66 94 Q 70 52 112 46 Q 148 40 166 70 Q 186 56 210 68 Q 232 82 228 106 Q 252 114 250 136 Q 248 160 218 160 Z';
const ARROW = 'M 0 -26 L 22 -2 L 9 -2 L 9 24 L -9 24 L -9 -2 L -22 -2 Z';

/** One circular sync arrow (arc 180°→300° on r=24 plus a head); render twice rotated 180°. */
const SyncArrow: React.FC = () => (
	<g>
		<path d="M -24 0 A 24 24 0 0 1 12 -20.8" fill="none" stroke={PROP_INK} strokeWidth={13} strokeLinecap="round" />
		<path d="M -24 0 A 24 24 0 0 1 12 -20.8" fill="none" stroke={PROP_COLORS.cyan} strokeWidth={6} strokeLinecap="round" />
		<path d="M 22 -15 L 16 -31 L 5 -12 Z" fill={PROP_COLORS.cyan} stroke={PROP_INK} strokeWidth={3} strokeLinejoin="round" />
	</g>
);

const CloudServiceInner: React.FC<CloudServiceProps> = ({status = 'upload', label = 'CLOUD', animated = true, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const t = animated ? frame / fps : 0;
	const bob = Math.sin(t * 2) * 5;
	const hop = Math.abs(Math.sin(t * 4)) * 8;
	const iy = label ? 100 : 108;

	return (
		<svg viewBox="0 0 280 200" width={280} height={200} style={{overflow: 'visible', transformOrigin: '50% 50%', ...style}}>
			<g transform={`translate(0 ${bob})`}>
				<path d={CLOUD} fill={PROP_COLORS.white} stroke={PROP_INK} strokeWidth={PROP_OW} strokeLinejoin="round" />
				<path d="M 40 136 Q 60 150 100 150 L 220 150 Q 240 148 246 132 Q 248 156 218 157 L 70 157 Q 40 156 40 136 Z" fill={PROP_COLORS.slateLight} />
				<path d="M 82 76 Q 92 56 116 54" fill="none" stroke={PROP_COLORS.slateLight} strokeWidth={6} strokeLinecap="round" />

				<g transform={`translate(140 ${iy})`}>
					{status === 'upload' ? (
						<path d={ARROW} transform={`translate(0 ${-hop}) scale(0.9)`} fill={PROP_COLORS.indigo} stroke={PROP_INK} strokeWidth={5} strokeLinejoin="round" />
					) : null}
					{status === 'download' ? (
						<path d={ARROW} transform={`translate(0 ${hop}) rotate(180) scale(0.9)`} fill={PROP_COLORS.emerald} stroke={PROP_INK} strokeWidth={5} strokeLinejoin="round" />
					) : null}
					{status === 'sync' ? (
						<g transform={`rotate(${t * 140}) scale(0.9)`}>
							<SyncArrow />
							<g transform="rotate(180)">
								<SyncArrow />
							</g>
						</g>
					) : null}
					{status === 'online' ? (
						<g>
							<circle r={24} fill={PROP_COLORS.green} stroke={PROP_INK} strokeWidth={5} />
							<path d="M -11 0 L -3 8 L 12 -9" fill="none" stroke={PROP_COLORS.white} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
						</g>
					) : null}
					{status === 'error' ? (
						<g transform={`translate(${animated ? Math.sin(t * 30) * 2 : 0} 0)`}>
							<circle r={24} fill={PROP_COLORS.red} stroke={PROP_INK} strokeWidth={5} />
							<path d="M -9 -9 L 9 9 M 9 -9 L -9 9" stroke={PROP_COLORS.white} strokeWidth={6} strokeLinecap="round" />
						</g>
					) : null}
				</g>

				{label ? (
					<text x={140} y={146} textAnchor="middle" fill={PROP_INK} fontFamily="ui-monospace, monospace" fontWeight={800} fontSize={15}>
						{label}
					</text>
				) : null}
			</g>
		</svg>
	);
};

/** Reusable 2D cartoon cloud service (upload, download, sync, online, error). */
export const CloudService = Interactive.create({
	Component: CloudServiceInner,
	layout: 'none',
	componentName: 'CloudServiceProp',
	schema: {
		status: {type: 'enum', default: 'upload', description: 'Cloud status icon', variants: propVariants(STATUSES), keyframable: false},
		label: {type: 'string', default: 'CLOUD', description: 'Bottom label'},
		animated: {type: 'boolean', default: true, description: 'Float & animate icon'},
	},
});
