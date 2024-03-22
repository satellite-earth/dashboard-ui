const INITIAL_STATE = [];

const Format = (logs, resize) => {
	if (resize || typeof window._logsMax === 'undefined') {
		const container = document.getElementById('logs_container');

		if (container) {
			window._logsMax = Math.floor(
				(container.getBoundingClientRect().height - 21) / 21,
			);
		}
	}

	if (window._logsMax) {
		const x = logs.length - window._logsMax;

		return x > 0 ? logs.slice(x) : logs;
	} else {
		return logs;
	}
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'logs/remote':
			return Format([...state, action.data]);

		case 'layout/resize':
			return Format(state, true);

		default:
			return state;
	}
};
