import React, { Component } from 'react';
import { connect } from 'react-redux';

import Relay from './Relay';
import Receiver from './Receiver';
import Database from './Database';

class Dashboard extends Component {
	render = () => {
		const { status } = this.props;

		if (!status.synced) {
			return null;
		}

		return (
			<div>
				<Relay />
				<Receiver />
				<Database />
			</div>
		);
	};
}

export default connect(({ layout, status }) => {
	return {
		layout,
		status,
	};
})(Dashboard);
