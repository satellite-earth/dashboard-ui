import React, { Component } from 'react';
import { connect } from 'react-redux';

//import Model, { MenuSections } from '../../Model';
import { COLORS } from '../../constants';

class Dialog extends Component {
	handleSelectItem = (item) => {
		Model.dispatch({
			type: 'layout/dialog',
			data: item,
		});
	};

	render = () => {
		let view = null;

		// TODO render dialog panel conditionally

		return <div>{view}</div>;

		// return (
		// 	<div>
		// 		{MenuSections.map(item => {
		// 			return (
		// 				<div
		// 					key={item.key}
		// 					onClick={() => this.handleSelectItem(item)}
		// 					style={{
		// 						padding: 12,
		// 						border: '1px solid',
		// 						cursor: 'pointer',
		// 						color: item.key === this.props.layout.panel ? COLORS.satelliteGold : '#FFF'
		// 					}}
		// 				>
		// 					{item.label}
		// 				</div>
		// 			);
		// 		})}
		// 	</div>
		// );
	};
}

export default connect(({ layout }) => {
	return {
		layout,
	};
})(Dialog);
