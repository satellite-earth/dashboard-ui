import React from 'react';
import { useSelector } from 'react-redux';

import Panel from '../Common/Panel';
import PanelItemString from '../Common/PanelItemString';

export default function Relay() {
	const config = useSelector((store) => store.config);

	return (
		<Panel name="relay" label="RELAY" open>
			<PanelItemString label="URL" value={`ws://127.0.0.1:${config.relayPort}`} />
		</Panel>
	);
}
