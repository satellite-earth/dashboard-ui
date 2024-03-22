import React, { Component } from 'react';

import PanelItem from './PanelItem';
import Toggle from './Toggle';

class PanelItemToggle extends Component {
	render = () => {
		return (
			<PanelItem>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						height: 18,
					}}
				>
					{this.props.label}
					<Toggle value={this.props.value} onClick={this.props.onClick} />
				</div>
			</PanelItem>
		);
	};
}

export default PanelItemToggle;
