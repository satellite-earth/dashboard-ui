import React, { Component } from 'react';
import { connect } from 'react-redux';

import { COLORS } from '../../constants';

class Header extends Component {
	render = () => {
		return (
			<div
				style={{
					background: COLORS.primary,
					display: 'flex',
					alignItems: 'center',
					height: 48,
					paddingLeft: 18,
					paddingRight: 18,
					borderRadius: 12,
				}}
			>
				SATELLITE NODE
			</div>
		);
	};
}

export default connect(({ layout }) => {
	return {
		layout,
	};
})(Header);
