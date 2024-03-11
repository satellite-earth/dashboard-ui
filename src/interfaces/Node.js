import Model from '../model';


class NodeInterface {

	constructor (options = {}) {

		// this.config = config;
		// this.status = status;
		this.options = {
			reconnectInterval: 1500,
			...options
		};
	}

	// Establish connection and reconnection logic
	initialize () {

		let params;

		// Try to parse control params from url
		if (window.location.search) {

			params = new URLSearchParams(window.location.search);

		} else { // TODO Otherwise check local storage for auth

		}

		// Set control params
		if (params) {

			this.auth = params.get('auth');
			this.url = params.get('url');
			this.env = params.get('env');
		}

		// If gui is running on the same machine as
		// satellite node, tell the node to pause
		// its receiver when the device goes offline
		// and resume listening when internet available
		if (this.env === 'local') {

			window.addEventListener('online', () => {

				//console.log('called online handler');

				this.autoListen();
			});

			window.addEventListener('offline', () => {

				//console.log('called offline handler');

				// Tell node receiver to stop listening
				this.action('RECEIVER_UNLISTEN');
			});
		}

		// Establish websocket connection with satelite node
		this.connect();

		// Idempotency FTW
		clearInterval(this._connect);

		// Check connected state periodically
		// and reconnect only as necessary
		this._connect = setInterval(() => {
			this.connect();
		}, this.options.reconnectInterval);
	}

	// Send control message to node
	action (type, data) {

		if (!this.ws) { return; }

		this.ws.send(JSON.stringify(([
			'CONTROL',
			this.auth,
			type,
			data
		]).filter(item => {
			return item;
		})));
	}

	// Create websocket connection to node
	connect () {

		if (this.ws) {
			//console.log('already connected...');
			return;
		}

		try {

			this.ws = new WebSocket(this.url);

		} catch (err) {
			console.log('Failed to connect', err);
		}

		if (!this.ws) { return; }

		// Attach events handlers on websocket
		this.ws.addEventListener('message', this.onControlMessage);
		this.ws.addEventListener('close', this.onControlClose);
		this.ws.addEventListener('open', this.onControlOpen);
	}

	// Close connection and stop trying to reconnect
	disconnect () {

		clearInterval(this._connect);

		if (this.ws) {

			this.ws.close();
		}
	}

	// In local mode, tell receiver to start listening
	// if autoListen enabled and not already active
	autoListen () {

		const { config, status } = Model.getState();

		if (
			this.env !== 'local'
			|| status.listening
			|| !config.autoListen
		) { return; }

		console.log('autolistening...');

		this.action('RECEIVER_LISTEN');
	}

	// Toggle node receiver on/off
	toggleListen () {

		const { status } = Model.getState();

		this.action(status.listening ? 'RECEIVER_UNLISTEN' : 'RECEIVER_LISTEN');
	}

	clearDatabase () {

		this.action('CLEAR_DATABASE');
	}

	exportDatabase () {

		this.action('EXPORT_DATABASE');
	}


	/* Handle connection events */

	onControlOpen = () => {

		console.log('gui connected to local relay');

		// Ask node for its config and status on connect
		this.action('SYNC');

		Model.dispatch({
			type: 'conn/status',
			data: { open: true } 
		});
	};

	onControlClose = () => {

		console.log('gui closed connection to local relay');

		if (this.ws) { // Cleanup listeners

			this.ws.removeEventListener('message', this.onControlMessage);
			this.ws.removeEventListener('close', this.onControlClose);
			this.ws.removeEventListener('open', this.onControlOpen);

			this.ws = null;
		}

		Model.dispatch({
			type: 'conn/status',
			data: { open: false }
		});
	};

	onControlMessage = (message) => {

		let payload;

		try {

			// Parse control message(s) received from node
			const data = JSON.parse(message.data);

			if (data[0] !== 'CONTROL') { return; }

			payload = Array.isArray(data[1]) ? data[1] : [ data[1] ];

		} catch (err) {
			console.log(err);
		}

		for (let action of payload) {

			// Pass control messages received from the
			// node directly to reduc store so the app
			// can update its local state to match node
			Model.dispatch(action);

			if (!action.data || this.env !== 'local') { continue; }

			if (action.type === 'status/set') {

				// Special case: When connecting to local node for
				// the first time, (maybe) send autolisten message
				if (action.data.synced) {

					this.autoListen();
				}
			}
		}
	};
}

export default NodeInterface;

