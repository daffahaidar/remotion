import React from 'react';
import type {IconType} from 'react-icons';
import {FaCalendarCheck, FaLock} from 'react-icons/fa6';
import {MONO, type Tone} from '../shared/theme';
import {Card, IconTile, useLook} from '../shared/ui';

/** One color per OAuth role, used the same way in every scene (the analogy uses them too). */
export const ROLE = {
	owner: 'payload', // Kamu — Resource Owner
	client: 'warning', // JadwalKu / kurir — Client
	auth: 'primary', // Google login / satpam — Authorization Server
	resource: 'success', // Google Calendar / apartemen — Resource Server
	token: 'gold', // access token / kartu tamu
	scope: 'header', // batas izin
	code: 'signature', // authorization code + PKCE
} as const satisfies Record<string, Tone>;

/**
 * Real example values from the specs, so anyone who pauses can look them up:
 * code, state and access_token from RFC 6749 §4.1.2 / §4.1.4; the PKCE pair from RFC 7636 Appendix B
 * (BASE64URL(SHA256(verifier)) === challenge). Google's full scope is https://www.googleapis.com/auth/calendar.readonly.
 */
export const OAUTH = {
	app: 'JadwalKu',
	scope: 'calendar.readonly',
	state: 'xyz',
	code: 'SplxlOBeZQQYbYS6WxSbIA',
	accessToken: '2YotnFZFEjr1zCsicMWpAA',
	verifier: 'dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk',
	challenge: 'E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM',
} as const;

/** Icon tile + bold name + dim caption, the building block for "who is who" cards. */
export const Entity: React.FC<{
	readonly icon: IconType;
	readonly tone: Tone;
	readonly name: React.ReactNode;
	readonly sub?: React.ReactNode;
	readonly size?: number;
}> = ({icon, tone, name, sub, size = 80}) => {
	const look = useLook();
	return (
		<div style={{display: 'flex', alignItems: 'center', gap: 20}}>
			<IconTile icon={icon} tone={tone} size={size} />
			<div>
				<div style={{fontSize: 40, fontWeight: 800, lineHeight: 1.15}}>{name}</div>
				{sub ? <div style={{fontSize: 30, fontWeight: 700, color: look.dim}}>{sub}</div> : null}
			</div>
		</div>
	);
};

/** The fictional third-party app used as the example client. */
export const AppEntity: React.FC<{readonly sub?: React.ReactNode}> = ({sub}) => (
	<Entity icon={FaCalendarCheck} tone={ROLE.client} name={OAUTH.app} sub={sub} />
);

/** Browser / app window: traffic lights + address bar. */
export const Window: React.FC<{
	readonly at?: number;
	readonly url: React.ReactNode;
	readonly width: number;
	readonly children: React.ReactNode;
}> = ({at = 0, url, width, children}) => {
	const look = useLook();
	return (
		<Card at={at} style={{width, overflow: 'hidden'}}>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: 12,
					padding: '18px 26px',
					borderBottom: `1px solid ${look.edge}`,
				}}
			>
				{['#f87171', '#facc15', '#4ade80'].map((c) => (
					<div key={c} style={{width: 18, height: 18, borderRadius: 9, backgroundColor: c}} />
				))}
				<div
					style={{
						marginLeft: 12,
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						padding: '8px 20px',
						borderRadius: 999,
						boxShadow: look.inset,
						fontFamily: MONO,
						fontSize: 30,
						fontWeight: 700,
						whiteSpace: 'nowrap',
						overflow: 'hidden',
					}}
				>
					<FaLock size={24} color={look.tone('success')} />
					{url}
				</div>
			</div>
			{children}
		</Card>
	);
};

/** Recessed input field (label above, value inside). */
export const Field: React.FC<{readonly label: string; readonly children?: React.ReactNode}> = ({label, children}) => {
	const look = useLook();
	return (
		<div>
			<div style={{fontSize: 28, fontWeight: 700, color: look.dim, marginBottom: 8}}>{label}</div>
			<div
				style={{
					height: 70,
					borderRadius: 18,
					boxShadow: look.inset,
					display: 'flex',
					alignItems: 'center',
					padding: '0 24px',
					fontFamily: MONO,
					fontSize: 34,
					fontWeight: 700,
				}}
			>
				{children}
			</div>
		</div>
	);
};
