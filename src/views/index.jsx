import { Component } from 'react';
import { connect } from 'react-redux';
import { RouterProvider, createHashRouter } from 'react-router-dom';

import Model from '../model';
import RequireAuth from '../components/RequireAuth';
import node from '../services/node';

import DashboardLayout from './DashboardLayout';
import Dialog from './Dialog';
import LoginView from './Login';

const router = createHashRouter([
	{ path: 'login', element: <LoginView /> },
	{
		path: '',
		element: (
			<RequireAuth>
				<DashboardLayout />
			</RequireAuth>
		),
	},
]);

class App extends Component {
	componentDidMount = () => {
		window.addEventListener('resize', this.handleResize);

		this.handleResize();
	};

	componentWillUnmount = () => {
		node.close();

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

	render = () => {
		const { width } = this.props.layout;

		// Don't render layout until client width detected
		if (!width) {
			return null;
		}

		if (!this.props.conn.open) {
			return <div>CONNECTING . . .</div>;
		}

		return (
			<>
				<RouterProvider router={router} />
				<Dialog />
			</>
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
})(App);
