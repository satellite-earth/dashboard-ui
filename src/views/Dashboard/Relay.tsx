import Panel from '../Common/Panel';
// @ts-expect-error
import PanelItemString from '../Common/PanelItemString';
import node from '../../services/node';

export default function Relay() {
	return (
		<Panel label="RELAY">
			{/* TODO: show all the public URLs for the private node */}
			<PanelItemString label="URL" value={node.url} qr />
		</Panel>
	);
}
