import React from 'react';
import {FaCalendarCheck, FaCalendarDays, FaCircleCheck, FaGoogle, FaLink, FaServer} from 'react-icons/fa6';
import {SFX} from '../../shared/theme';
import {Arrow, Caption, Headline, Lane, LifeLine, Pill, Reveal, SceneShell, Sfx, Step} from '../../shared/ui';
import {OAUTH, ROLE} from '../parts';

const APP_X = 200;
const AUTH_X = 540;
const API_X = 880;
/** Labels for steps between the app and Google sit halfway between their lanes. */
const MID_X = (APP_X + AUTH_X) / 2;
const LANE_W = 310;

/** at = when the step number appears (matches the narration), y = label row. */
const S = {
	authorize: {at: 1.2, y: 620},
	consent: {at: 5, y: 760},
	redirect: {at: 8, y: 850},
	exchange: {at: 11, y: 990},
	token: {at: 15, y: 1130},
	api: {at: 17, y: 1260},
} as const;
const OK_AT = 19.2;

export const Flow: React.FC = () => (
	<SceneShell chapter="Alur lengkap" chapterIcon={FaLink}>
		<Headline text="Alur *lengkap*" top={300} size={92} />
		<Lane x={APP_X} icon={FaCalendarCheck} tone={ROLE.client} label="APLIKASI" width={LANE_W} />
		<Lane x={AUTH_X} icon={FaGoogle} tone={ROLE.auth} label="GOOGLE" width={LANE_W} />
		<Lane x={API_X} icon={FaCalendarDays} tone={ROLE.resource} label="CALENDAR" width={LANE_W} />
		<LifeLine x={APP_X} />
		<LifeLine x={AUTH_X} />
		<LifeLine x={API_X} />

		<Step n={1} at={S.authorize.at} x={MID_X} y={S.authorize.y} tone={ROLE.client}>
			<Pill size={28} mono>
				GET /authorize
			</Pill>
		</Step>
		<Arrow
			x1={APP_X + 10}
			y1={S.authorize.y + 50}
			x2={AUTH_X - 10}
			y2={S.authorize.y + 50}
			at={S.authorize.at + 0.3}
			tone={ROLE.client}
		/>
		<Caption at={3.6} x={MID_X} y={S.authorize.y + 64}>
			scope · state · code_challenge
		</Caption>

		<Step n={2} at={S.consent.at} x={AUTH_X} y={S.consent.y} tone={ROLE.owner}>
			<Pill icon={FaCircleCheck} tone={ROLE.owner} size={28}>
				kamu login + setuju
			</Pill>
		</Step>

		<Step n={3} at={S.redirect.at} x={MID_X} y={S.redirect.y} tone={ROLE.code}>
			<Pill size={28} mono>
				redirect /cb
			</Pill>
		</Step>
		<Arrow
			x1={AUTH_X - 10}
			y1={S.redirect.y + 50}
			x2={APP_X + 10}
			y2={S.redirect.y + 50}
			at={S.redirect.at + 0.3}
			tone={ROLE.code}
		/>
		<Caption at={8.7} x={MID_X} y={S.redirect.y + 64}>
			code={OAUTH.code.slice(0, 8)}…&amp;state={OAUTH.state}
		</Caption>

		<Step n={4} at={S.exchange.at} x={MID_X + 60} y={S.exchange.y} tone={ROLE.code}>
			<Pill size={28} mono>
				POST /token
			</Pill>
			<Pill icon={FaServer} tone="warning" size={24}>
				jalur belakang
			</Pill>
		</Step>
		<Arrow
			x1={APP_X + 10}
			y1={S.exchange.y + 50}
			x2={AUTH_X - 10}
			y2={S.exchange.y + 50}
			at={S.exchange.at + 0.3}
			tone={ROLE.code}
		/>
		<Caption at={13.6} x={MID_X} y={S.exchange.y + 64}>
			code + code_verifier
		</Caption>

		<Step n={5} at={S.token.at} x={MID_X} y={S.token.y} tone={ROLE.token}>
			<Pill tone={ROLE.token} solid size={28} mono>
				access_token
			</Pill>
		</Step>
		<Arrow
			x1={AUTH_X - 10}
			y1={S.token.y + 50}
			x2={APP_X + 10}
			y2={S.token.y + 50}
			at={S.token.at + 0.3}
			tone={ROLE.token}
		/>
		<Caption at={15.6} x={MID_X} y={S.token.y + 64}>
			{OAUTH.accessToken}
		</Caption>

		<Step n={6} at={S.api.at} x={AUTH_X} y={S.api.y} tone={ROLE.resource}>
			<Pill size={28} mono>
				GET /calendar
			</Pill>
		</Step>
		<Arrow
			x1={APP_X + 10}
			y1={S.api.y + 50}
			x2={API_X - 10}
			y2={S.api.y + 50}
			at={S.api.at + 0.3}
			tone={ROLE.resource}
		/>
		<Caption at={17.7} y={S.api.y + 64}>
			Authorization: Bearer {OAUTH.accessToken.slice(0, 6)}…
		</Caption>
		<Reveal
			at={OK_AT}
			damping={10}
			style={{left: 0, width: 1080, top: S.api.y + 122, display: 'flex', justifyContent: 'center'}}
		>
			<Pill tone="success" solid size={30}>
				200 OK · isi kalender
			</Pill>
		</Reveal>

		{Object.values(S).map((s) => (
			<Sfx key={s.at} name="Step" src={SFX.click} at={s.at} volume={0.5} />
		))}
		{[S.authorize, S.redirect, S.exchange, S.token, S.api].map((s) => (
			<Sfx key={s.at} name="Send" src={SFX.whoosh} at={s.at + 0.3} volume={0.25} />
		))}
		<Sfx name="Token" src={SFX.sparkle} at={S.token.at + 0.5} volume={0.4} />
		<Sfx name="200 OK" src={SFX.ding} at={OK_AT} volume={0.45} />
	</SceneShell>
);
