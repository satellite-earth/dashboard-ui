import React, { Component } from 'react';

import PanelItem from './PanelItem';

class PanelItemString extends Component {
	render = () => {
		return (
			<PanelItem>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							width: '100%',
						}}
					>
						<div>{this.props.label}</div>
						<input
							value={this.props.value}
							readOnly
							style={{
								width: '100%',
								marginLeft: 12,
								paddingRight: 12,
								color: '#FFF',
								background: 'transparent',
								border: 'none',
								outline: 'none',
								fontFamily: 'monospace',
							}}
						/>
						<div>[copy]</div>
						<div>[qr]</div>
					</div>
					{this.props.onConfigClicked ? (
						<div onClick={this.props.onConfigClicked}>[config]</div>
					) : null}
				</div>
				{this.props.children}
			</PanelItem>
		);
	};
}

export default PanelItemString;
