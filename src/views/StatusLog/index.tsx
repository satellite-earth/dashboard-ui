import { useSelector } from 'react-redux';

import { COLORS } from '../../constants';
import useClientSize from '../../hooks/use-client-size';

type LogType = { id: string; text: string };

export default function StatusLog() {
	const { height } = useClientSize();
	const logs = useSelector<{ logs: LogType[] }, LogType[]>((state) => state.logs);

	const renderLogs = () => {
		return logs.map((log) => {
			return (
				<div
					key={log.id}
					style={{
						height: 21,
						fontSize: 13,
						overflow: 'hidden',
						whiteSpace: 'nowrap',
						textOverflow: 'ellipsis',
						display: 'flex',
						alignItems: 'center',
					}}
				>
					{log.text}
				</div>
			);
		});
	};

	return (
		<div
			style={{
				height: height - 120,
				border: `6px solid ${COLORS.primary}`,
				borderRadius: 12,
				padding: 12,
				//overflow: 'hidden'
			}}
		>
			<div
				style={{
					marginBottom: 12,
				}}
			>
				STATUS LOGS
			</div>
			<div
				id="logs_container"
				style={{
					height: '100%',
				}}
			>
				{renderLogs()}
			</div>
		</div>
	);
}
