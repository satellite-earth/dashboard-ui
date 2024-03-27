import React, { Component, useState } from 'react';

import PanelItem from './PanelItem';
import TextButton from './TextButton.jsx';

function CopyButton({ value }) {
	const [copied, setCopied] = useState(false);

	const copy = () => {
		if (navigator.clipboard?.writeText) {
			navigator.clipboard.writeText(value);
			setCopied(true);
			setTimeout(() => setCopied(false), 500);
		}
	};

	return (
		<TextButton onClick={copy}>{copied ? '[copied]' : '[copy]'}</TextButton>
	);
}

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
						<CopyButton value={this.props.value} />
						<TextButton>[qr]</TextButton>
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
