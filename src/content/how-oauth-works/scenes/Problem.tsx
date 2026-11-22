import React from 'react';
import {FaCalendarDays, FaCircleQuestion} from 'react-icons/fa6';
import {ManCharacter} from '../../../assets/character';
import {MONO, SFX} from '../../shared/theme';
import {
	Actor,
	Arrow,
	Bubble,
	Card,
	Headline,
	Pill,
	Reveal,
	SceneShell,
	Sfx,
	useLook,
	useRamp,
	useSec,
} from '../../shared/ui';
import {AppEntity, Entity, ROLE} from '../parts';

const APP_AT = 1.2;
const CAL_AT = 4.2;
const ASK_AT = 6.2;
const NO_PASS_AT = 8.2;
const EVENTS = ['09:00  Rapat tim', '17:00  Gym'];

const Calendar: React.FC = () => {
	const look = useLook();
	return (
		<Card
			at={CAL_AT}
			tone={ROLE.resource}
			style={{width: 420, padding: '26px 28px', display: 'flex', flexDirection: 'column', gap: 14}}
		>
			<Entity icon={FaCalendarDays} tone={ROLE.resource} name="Google Calendar" sub="data kamu" size={72} />
			{EVENTS.map((e) => (
				<div
					key={e}
					style={{fontFamily: MONO, fontSize: 30, fontWeight: 700, color: look.tone(ROLE.resource), whiteSpace: 'pre'}}
				>
					{e}
				</div>
			))}
		</Card>
	);
};

const Stage: React.FC = () => {
	const t = useSec();
	const think = useRamp(ASK_AT, 0.35);
	return (
		<>
			<Headline text="Aplikasi butuh *data kamu*" top={300} size={96} tone={ROLE.owner} />

			<Reveal at={APP_AT} kind="left" style={{left: 70, top: 600}}>
				<Card at={APP_AT} tone={ROLE.client} style={{width: 420, padding: '26px 28px'}}>
					<AppEntity sub="aplikasi jadwal" />
				</Card>
			</Reveal>
			<Arrow x1={498} y1={666} x2={586} y2={666} at={4.8} dur={0.35} tone={ROLE.client} />
			<Reveal at={5} kind="fade" style={{left: 300, top: 756}}>
				<Pill tone={ROLE.client} size={28}>
					butuh akses
				</Pill>
			</Reveal>
			<Reveal at={CAL_AT} kind="right" style={{left: 590, top: 540}}>
				<Calendar />
			</Reveal>

			<Actor x={260} floor={1450}>
				<ManCharacter
					expression={t < ASK_AT ? 'happy' : t < NO_PASS_AT ? 'thinking' : 'worried'}
					pose="idle"
					poseTo="think"
					poseBlend={think}
					yaw={18}
					talking={t > ASK_AT && t < 9.6}
					style={{scale: 0.55}}
				/>
			</Actor>
			<Reveal at={ASK_AT} out={NO_PASS_AT - 0.1} damping={10} style={{left: 440, top: 1030}}>
				<Bubble tail="left" size={40}>
					Kasih akses...
				</Bubble>
			</Reveal>
			<Reveal at={NO_PASS_AT} damping={10} style={{left: 440, top: 1030}}>
				<Bubble tail="left" tone="danger" size={44}>
					tanpa password?
				</Bubble>
			</Reveal>
		</>
	);
};

export const Problem: React.FC = () => (
	<SceneShell chapter="Masalahnya" chapterIcon={FaCircleQuestion}>
		<Stage />
		<Sfx name="Lights on" src={SFX.switch} at={0} volume={0.5} />
		<Sfx name="App card" src={SFX.pop} at={APP_AT} volume={0.5} />
		<Sfx name="Calendar card" src={SFX.pop} at={CAL_AT} volume={0.5} />
		<Sfx name="Needs access" src={SFX.whoosh} at={4.8} volume={0.3} />
		<Sfx name="Bubble" src={SFX.pop} at={ASK_AT} volume={0.5} />
		<Sfx name="No password" src={SFX.boom} at={NO_PASS_AT} volume={0.3} />
	</SceneShell>
);
