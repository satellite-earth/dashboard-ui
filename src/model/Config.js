/* Model config of connected satellite node */

const INITIAL_STATE = {
	cacheLevel: 3,
	autoListen: false,
	logsEnabled: true,
	owner: '',
	pubkeys: [],
	relays: [],
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'config/set':
			return {
				...state,
				...action.data,
			};

		default:
			return state;
	}
};
