import { useSelector } from 'react-redux';

import Panel from '../Common/Panel';
// @ts-expect-error
import PanelItemString from '../Common/PanelItemString';

export default function Relay() {
	const config = useSelector((store: any) => store.config);

	return (
		<Panel label="RELAY">
			<PanelItemString label="URL" value={`ws://127.0.0.1:${config.relayPort}`} />
		</Panel>
	);
}
