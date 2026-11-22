import React from 'react';
import type {IconType} from 'react-icons';
import {FaCalendarCheck, FaCalendarDays, FaPuzzlePiece, FaTicket, FaUser, FaUserShield} from 'react-icons/fa6';
import {MONO, SFX, type Tone} from '../../shared/theme';
import {Card, Headline, IconTile, Pill, Reveal, SceneShell, Sfx, useLook} from '../../shared/ui';
import {OAUTH, ROLE} from '../parts';

const ROLES: readonly {at: number; icon: IconType; tone: Tone; name: string; role: string; alias: string}[] = [
	{at: 3, icon: FaUser, tone: ROLE.owner, name: 'Kamu', role: 'Resource Owner', alias: 'pemilik'},
	{at: 5, icon: FaCalendarCheck, tone: ROLE.client, name: OAUTH.app, role: 'Client', alias: 'si kurir'},
	{
		at: 8,
		icon: FaUserShield,
		tone: ROLE.auth,
		name: 'Login Google',
		role: 'Authorization Server',
		alias: 'si satpam',
	},
	{
		at: 11,
		icon: FaCalendarDays,
		tone: ROLE.resource,
		name: 'Google Calendar',
		role: 'Resource Server',
		alias: 'apartemen',
	},
];
const TOKEN_AT = 14;
const SCOPE_AT = 16.8;

const RoleCard: React.FC<{readonly r: (typeof ROLES)[number]}> = ({r}) => {
	const look = useLook();
	return (
		<Card
			at={r.at}
			tone={r.tone}
			style={{width: 420, height: 300, padding: '26px 28px', display: 'flex', flexDirection: 'column', gap: 10}}
		>
			<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
				<IconTile icon={r.icon} tone={r.tone} size={84} />
				<Pill tone={r.tone} size={24}>
					= {r.alias}
				</Pill>
			</div>
			<div style={{fontSize: 40, fontWeight: 800, lineHeight: 1.1}}>{r.name}</div>
			<div style={{fontSize: 34, fontWeight: 800, lineHeight: 1.1, color: look.tone(r.tone)}}>{r.role}</div>
		</Card>
	);
};

const TokenCard: React.FC = () => {
	const look = useLook();
	return (
		<Card
			at={TOKEN_AT}
			tone={ROLE.token}
			style={{width: 860, padding: '24px 30px', display: 'flex', alignItems: 'center', gap: 24}}
		>
			<IconTile icon={FaTicket} tone={ROLE.token} size={92} />
			<div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 8}}>
				<div style={{display: 'flex', alignItems: 'center', gap: 16}}>
					<span style={{fontSize: 42, fontWeight: 800}}>Access token</span>
					<Pill tone={ROLE.token} size={24}>
						= kartu tamu
					</Pill>
				</div>
				<div style={{fontFamily: MONO, fontSize: 34, fontWeight: 700, color: look.tone(ROLE.token)}}>
					{OAUTH.accessToken}
				</div>
				<div style={{height: 56}}>
					<Reveal at={SCOPE_AT} damping={10} style={{position: 'relative'}}>
						<Pill tone={ROLE.scope} solid size={28} mono>
							scope: {OAUTH.scope}
						</Pill>
					</Reveal>
				</div>
			</div>
		</Card>
	);
};

export const Anatomy: React.FC = () => (
	<SceneShell chapter="Anatomi OAuth" chapterIcon={FaPuzzlePiece}>
		<Headline text="*4 peran* di OAuth" top={300} size={100} />
		{ROLES.map((r, i) => (
			<Reveal
				key={r.role}
				at={r.at}
				kind={i % 2 ? 'right' : 'left'}
				style={{left: i % 2 ? 540 : 100, top: i < 2 ? 470 : 800}}
			>
				<RoleCard r={r} />
			</Reveal>
		))}
		<Reveal at={TOKEN_AT} kind="rise" style={{left: 100, top: 1135}}>
			<TokenCard />
		</Reveal>

		{ROLES.map((r) => (
			<Sfx key={r.role} name="Role" src={SFX.pop} at={r.at} volume={0.5} />
		))}
		<Sfx name="Token" src={SFX.sparkle} at={TOKEN_AT} volume={0.5} />
		<Sfx name="Scope" src={SFX.ding} at={SCOPE_AT} volume={0.4} />
	</SceneShell>
);
