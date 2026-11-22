export * from '../shared/theme';

/**
 * A real HS256 token (secret: "rahasia-server-jwt-2026"), so anyone who pauses and decodes it gets the
 * same JSON shown on screen. Payload: {"sub":"123","name":"Budi","role":"user","exp":1798761600}.
 */
export const JWT = {
	header: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
	payload: 'eyJzdWIiOiIxMjMiLCJuYW1lIjoiQnVkaSIsInJvbGUiOiJ1c2VyIiwiZXhwIjoxNzk4NzYxNjAwfQ',
	signature: 'l-asB2-8YYjQxPbsKPrXdqNWALzWH6M5TMv1N91VPS4',
	/** Same payload with "sub":"124" — one character changed. */
	signature124: '5QhpQpMvJgwKCWH9CNtFSvyHGUQM273gP5fcXyZ9oqg',
	/** Hacker's payload with "role":"admin", and the signature the server computes for it. */
	adminPayload: 'eyJzdWIiOiIxMjMiLCJuYW1lIjoiQnVkaSIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTc5ODc2MTYwMH0',
	adminSignature: '_5ROWStzksfzd7nTVWsUenWz-KxNOPGlePoJPaubHEU',
} as const;
