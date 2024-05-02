import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { NostrEvent } from 'nostr-tools';

import Panel from '../../Common/Panel';
import PanelItem from '../../Common/PanelItem';
import TextButton from '../../../components/TextButton';

import { formatDataSize } from '../../../functions';
import ImportEventsButton from './import-events-button';
import node from '../../../services/node';

export default function Database() {
	const status = useSelector((s: any) => s.status);

	const importEvent = useCallback((event: NostrEvent) => node.publish(event), []);

	return (
		<Panel label="DATABASE">
			<PanelItem>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					<div>DATABASE SIZE</div>
					<div>{formatDataSize(status.dbCount > 0 ? status.dbSize : 0)}</div>
				</div>
			</PanelItem>
			<PanelItem>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					<div>EVENTS COUNT</div>
					<div>{status.dbCount}</div>
				</div>
			</PanelItem>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					marginTop: 24,
					justifyContent: 'right',
					gap: '12px',
				}}
			>
				<TextButton onClick={() => node.clearDatabase()}>[CLEAR]</TextButton>
				<ImportEventsButton onEvent={importEvent} />
				<TextButton onClick={() => node.exportDatabase()}>[EXPORT]</TextButton>
			</div>
		</Panel>
	);
}
