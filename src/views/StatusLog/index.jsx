import React, { Component } from 'react';
import { connect } from 'react-redux';

import Panel from '../Common/Panel';
import { COLORS } from '../../constants';

class StatusLog extends Component {
	renderLogs = () => {
		return this.props.logs.map((log) => {
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

	render = () => {
		return (
			<div
				style={{
					height: this.props.layout.height - 120,
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
					{this.renderLogs()}
				</div>
			</div>
		);
	};
}

export default connect(({ layout, logs }) => {
	return {
		layout,
		logs,
	};
})(StatusLog);
