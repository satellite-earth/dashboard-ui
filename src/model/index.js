import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';

import { PROD } from '../constants';

import config from './Config';
import conn from './Conn';
import layout from './Layout';
import logs from './Logs';
import status from './Status';

const middleware = [thunk];

if (!PROD) {
	middleware.push(logger);
}

const Model = (initialState = {}) => {
	return createStore(
		combineReducers({
			config,
			conn,
			layout,
			logs,
			status,
		}),
		applyMiddleware(...middleware),
	);
};

export default Model();
