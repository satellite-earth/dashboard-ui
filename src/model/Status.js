
/* Model status of connected satellite node */

const INITIAL_STATE = {
  listening: false,
  relaysConnected: {}
};

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case 'status/set':
      return {
        ...state,
        ...action.data
      };

    default:
      return state;
  }
}
