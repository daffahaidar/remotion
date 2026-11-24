import React from 'react';
import {FaCalendarCheck} from 'react-icons/fa6';
import {MONO, type Tone} from '../shared/theme';
import {Entity, useLook} from '../shared/ui';

// Generic pieces now live in the shared kit; re-exported so the scenes keep importing from here.
export {Entity, Window} from '../shared/ui';

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

/** The fictional third-party app used as the example client. */
export const AppEntity: React.FC<{readonly sub?: React.ReactNode}> = ({sub}) => (
	<Entity icon={FaCalendarCheck} tone={ROLE.client} name={OAUTH.app} sub={sub} />
);

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
