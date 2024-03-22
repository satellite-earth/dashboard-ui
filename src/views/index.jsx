import { Component } from 'react';
import { connect } from 'react-redux';

import Model from '../model';
import NodeInterface from '../interfaces/Node';
import { COLORS, CONTENT_MAX_WIDTH, MOBILE_BREAKPOINT } from '../constants';

import Header from './Header';
import Dashboard from './Dashboard';
import StatusLog from './StatusLog';
import Dialog from './Dialog';
import Panel from './Common/Panel';

class GUI extends Component {
	componentDidMount = () => {
		if (!window.node) {
			window.node = new NodeInterface();
			window.node.initialize();
		}

		window.addEventListener('resize', this.handleResize);

		this.handleResize();
	};

	componentWillUnmount = () => {
		if (window.node) {
			window.node.disconnect();
			window.node = null;
		}

		window.removeEventListener('resize', this.handleResize);
	};

	handleResize = () => {
		Model.dispatch({
			type: 'layout/resize',
			data: {
				height: window.clientHeight || document.documentElement.clientHeight,
				width: window.clientWidth || document.documentElement.clientWidth,
			},
		});
	};

	renderLayoutWide = () => {
		const { width } = this.props.layout;

		return (
			<div>
				<div
					style={{
						background: '#000',
						paddingTop: 12,
						height: 60,
						position: 'fixed',
						width: Math.min(width, CONTENT_MAX_WIDTH) - 24,
						top: 0,
						left:
							(width > CONTENT_MAX_WIDTH
								? (width - CONTENT_MAX_WIDTH) / 2
								: 0) + 12,
						zIndex: 1,
					}}
				>
					<Header />
				</div>
				<div>
					<div
						style={{
							width: Math.min(width, CONTENT_MAX_WIDTH) / 2 - 6,
							paddingTop: 72,
							paddingLeft:
								width > CONTENT_MAX_WIDTH ? (width - CONTENT_MAX_WIDTH) / 2 : 0,
						}}
					>
						<div
							style={{
								paddingLeft: 12,
							}}
						>
							<Dashboard />
						</div>
					</div>
					<div
						style={{
							width: Math.min(width, CONTENT_MAX_WIDTH) / 2 - 18,
							position: 'fixed',
							top: 72,
							right:
								(width > CONTENT_MAX_WIDTH
									? (width - CONTENT_MAX_WIDTH) / 2
									: 0) + 12,
						}}
					>
						<StatusLog />
					</div>
				</div>
			</div>
		);
	};

	renderLayoutMobile = () => {
		const { width } = this.props.layout;

		return (
			<div>
				<div
					style={{
						background: '#000',
						paddingTop: 12,
						height: 60,
						position: 'fixed',
						width: width - 24,
						top: 0,
						left: 12,
						zIndex: 1,
					}}
				>
					<Header />
				</div>
				<div
					style={{
						paddingTop: 72,
						paddingLeft: 12,
						paddingRight: 12,
					}}
				>
					<Dashboard />
				</div>
			</div>
		);
	};

	render = () => {
		const { width } = this.props.layout;

		// Don't render layout until client width detected
		if (!width) {
			return null;
		}

		if (!this.props.conn.open) {
			// TODO make connecting page

			return <div>CONNECTING . . .</div>;
		}

		return (
			<div>
				{width < MOBILE_BREAKPOINT
					? this.renderLayoutMobile()
					: this.renderLayoutWide()}
				<Dialog />
			</div>
		);
	};
}

export default connect(({ conn, config, status, layout }) => {
	return {
		conn,
		config,
		status,
		layout,
	};
})(GUI);
