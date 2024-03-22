/* Model connection to satellite node */

const INITIAL_STATE = {
	open: false,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'conn/status':
			return {
				...state,
				...action.data,
			};

		default:
			return state;
	}
};
