const INITIAL_STATE = {
	height: null,
	width: null,
	mobileMenu: false,
	dialog: 'dashboard',
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'layout/dialog':
			return {
				...state,
				dialog: action.data.key,
				mobileMenu: false,
			};

		case 'layout/mobile-menu-toggle':
			return {
				...state,
				mobileMenu: !state.mobileMenu,
			};

		case 'layout/resize':
			return {
				...state,
				...action.data,
				mobileMenu: false,
			};

		default:
			return state;
	}
};
