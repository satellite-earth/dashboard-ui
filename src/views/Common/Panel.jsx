import React, { Component } from 'react';

import { COLORS } from '../../constants';


class Panel extends Component {

	handleToggleOpen = () => {

		console.log('toggle open clicked', this.props.name);
		// TODO should set config to keep
		// track of panel open state, this
		// will be more important when there
		// are many panels
	};

	render = () => {

		return (
			<div
				style={{
					padding: 18,
					borderRadius: 12,
					marginBottom: 12,
					background: COLORS.primary
				}}
			>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						marginBottom: 18
					}}
				>
					<div
						style={{
							display: 'flex'
						}}
					>
						{/*<div style={{ marginRight: 4 }}>[icon]</div>*/}
						<div>{this.props.label}</div>
					</div>
					<div
						onClick={this.handleToggleOpen}
						style={{
							display: 'flex'
						}}
					>
						<div>[-]</div>
					</div>
				</div>
				{this.props.children}
			</div>
		);
	};
}

export default Panel;
