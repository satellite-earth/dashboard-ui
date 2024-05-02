import { Component } from 'react';
import { connect } from 'react-redux';

import Relay from './Relay';
// @ts-expect-error
import Receiver from './Receiver';
import Database from './Database';
import node from '../../services/node';

class Dashboard extends Component {
	componentDidMount() {
		node.controlAction('SYNC');
	}

	render = () => {
		const { status } = this.props as any;

		if (!status.synced) return null;

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
