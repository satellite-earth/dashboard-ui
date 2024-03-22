import React, { Component } from 'react';

class PanelItem extends Component {
	render = () => {
		return (
			<div
				style={{
					padding: 12,
					background: `rgb(17, 18, 19)`,
					borderRadius: 12,
					marginBottom: 12,
				}}
			>
				{this.props.children}
			</div>
		);
	};
}

export default PanelItem;
