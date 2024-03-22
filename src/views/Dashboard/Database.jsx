import React, { Component } from 'react';
import { connect } from 'react-redux';

import Panel from '../Common/Panel';
import PanelItem from '../Common/PanelItem';

import { formatDataSize } from '../../functions';

class Database extends Component {
	render = () => {
		return (
			<Panel name="database" label="DATABASE" open>
				<PanelItem>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<div>DATABASE SIZE</div>
						<div>
							{formatDataSize(
								this.props.status.dbCount > 0 ? this.props.status.dbSize : 0,
							)}
						</div>
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
						<div>{this.props.status.dbCount}</div>
					</div>
				</PanelItem>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						marginTop: 24,
						justifyContent: 'right',
					}}
				>
					<div
						onClick={() => {
							window.node.clearDatabase();
						}}
						style={{
							marginLeft: 12,
							cursor: 'pointer',
						}}
					>
						[CLEAR]
					</div>
					<div
						onClick={() => {
							window.node.exportDatabase();
						}}
						style={{
							marginLeft: 12,
							cursor: 'pointer',
						}}
					>
						[EXPORT]
					</div>
				</div>
			</Panel>
		);
	};
}

export default connect(({ config, status }) => {
	return {
		config,
		status,
	};
})(Database);
