import Model from '../model';
import createDefer from '../helpers/deferred';

class NodeInterface {
	connected = false;
	authenticated = false;
	challenge = '';

	sentAuthId = '';
	authPromise = null;

	constructor(options = {}) {
		// this.config = config;
		// this.status = status;
		this.options = {
			reconnectInterval: 1500,
			...options,
		};
	}

	// Establish connection and reconnection logic
	initialize() {
		let params;

		// Try to parse control params from url
		if (window.location.search) {
			params = new URLSearchParams(window.location.search);
		} else {
			// TODO Otherwise check local storage for auth
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
				this.autoListen();
			});

			window.addEventListener('offline', () => {
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
	action(type, data) {
		if (!this.ws) {
			return;
		}

		this.ws.send(
			JSON.stringify(
				['CONTROL', type, data].filter((item) => {
					return item;
				}),
			),
		);
	}

	// Create websocket connection to node
	connect() {
		if (this.ws) {
			//console.log('already connected...');
			return;
		}

		try {
			this.ws = new WebSocket(this.url ?? '/');
		} catch (err) {
			console.log('Failed to connect', err);
		}

		if (!this.ws) {
			return;
		}

		// Attach events handlers on websocket
		this.ws.addEventListener('message', this.handleMessage);
		this.ws.addEventListener('close', this.onControlClose);
		this.ws.addEventListener('open', this.onControlOpen);
	}

	authenticate(auth) {
		if (!this.connected) throw new Error('Not connected');

		const p = (this.authPromise = createDefer());

		if (typeof auth === 'string') {
			// CONTROL auth
			this.action('AUTH', auth);
		} else {
			// NIP-42 auth
			this.sentAuthId = auth.id;
			this.ws.send(JSON.stringify(['AUTH', auth]));
		}

		// auth timeout
		const timeout = setTimeout(() => {
			p.reject(new Error('Timeout'));
			this.authPromise = null;
		}, 5_000);
		p.then(() => clearTimeout(timeout));

		return p;
	}

	// Close connection and stop trying to reconnect
	disconnect() {
		clearInterval(this._connect);

		if (this.ws) {
			this.ws.close();
		}
	}

	// In local mode, tell receiver to start listening
	// if autoListen enabled and not already active
	autoListen() {
		const { config, status } = Model.getState();

		if (this.env !== 'local' || status.listening || !config.autoListen) {
			return;
		}

		console.log('autolistening...');

		this.action('RECEIVER_LISTEN');
	}

	// Toggle node receiver on/off
	toggleListen() {
		const { status } = Model.getState();

		this.action(status.listening ? 'RECEIVER_UNLISTEN' : 'RECEIVER_LISTEN');
	}

	clearDatabase() {
		this.action('CLEAR_DATABASE');
	}

	exportDatabase() {
		this.action('EXPORT_DATABASE');
	}

	/* Handle connection events */

	onControlOpen = () => {
		console.log('gui connected to local relay');

		Model.dispatch({
			type: 'conn/status',
			data: { open: true },
		});

		this.connected = true;
	};

	onControlClose = () => {
		console.log('gui closed connection to local relay');

		if (this.ws) {
			// Cleanup listeners

			this.ws.removeEventListener('message', this.handleMessage);
			this.ws.removeEventListener('close', this.onControlClose);
			this.ws.removeEventListener('open', this.onControlOpen);

			this.ws = null;
		}

		Model.dispatch({
			type: 'conn/status',
			data: { open: false },
		});

		this.connected = false;
	};

	handleMessage = (message) => {
		try {
			// Parse control message(s) received from node
			const data = JSON.parse(message.data);

			switch (data[0]) {
				case 'CONTROL':
					const payload = Array.isArray(data[1]) ? data[1] : [data[1]];
					this.handleControlMessage(payload);
					break;
				case 'AUTH':
					this.handleAuthMessage(data);
					break;
				case 'OK':
					this.handleOkMessage(data);
					break;
			}
		} catch (err) {
			console.log(err);
		}
	};

	handleAuthMessage(message) {
		this.challenge = message[1] ?? '';
	}

	handleOkMessage(data) {
		const id = data[1];
		const success = data[2];
		const message = data[3];

		if (id === this.sentAuthId && this.authPromise) {
			if (success) {
				this.authenticated = true;
				this.authPromise.resolve(message);
			} else this.authPromise.reject(new Error(message ?? 'Rejected'));
			this.authPromise = null;
		}
	}

	handleControlMessage(payload) {
		for (let action of payload) {
			this.handleControlAction(action);
		}
	}

	handleControlAction(action) {
		switch (action.type) {
			case 'AUTH':
				if (action.data) {
					this.authenticated = true;
					// TODO: add message to CONTROL AUTH
					this.authPromise.resolve('');
				} else this.authPromise.reject(new Error('Rejected'));
				this.authPromise = null;
				break;
			default:
				// Pass control messages received from the
				// node directly to reduc store so the app
				// can update its local state to match node
				Model.dispatch(action);

				if (!action.data || this.env !== 'local') return;

				if (action.type === 'status/set') {
					// Special case: When connecting to local node for
					// the first time, (maybe) send autolisten message
					if (action.data.synced) {
						this.autoListen();
					}
				}
				break;
		}
	}
}

export default NodeInterface;
