import React, { Component } from 'react';
import { connect } from 'react-redux';

import Panel from '../Common/Panel';
import PanelItemString from '../Common/PanelItemString';

class Relay extends Component {
	render = () => {
		return (
			<Panel name="relay" label="RELAY" open>
				<PanelItemString
					label="URL"
					value={`ws://127.0.0.1:${this.props.config.relayPort}`}
				/>
			</Panel>
		);
	};
}

export default connect(({ config }) => {
	return {
		config,
	};
})(Relay);
