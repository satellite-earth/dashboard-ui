import { EventTemplate, Relay, VerifiedEvent } from 'nostr-tools';

// @ts-expect-error
import Model from '../model';
import createDefer, { Deferred } from '../helpers/deferred';

// @ts-expect-error
export default class NodeInterface extends Relay {
	public override ws?: WebSocket;
	public override challenge?: string;

	authenticated = false;

	sentAuthId = '';
	authPromise: Deferred<string> | null = null;

	async connect(): Promise<void> {
		await super.connect();

		// listen for open and close events
		Model.dispatch({
			type: 'conn/status',
			data: { open: true },
		});

		this.ws?.addEventListener('close', () => {
			Model.dispatch({
				type: 'conn/status',
				data: { open: false },
			});
		});
	}

	// Send control message to node
	controlAction(type: string, data?: any) {
		return this.send(JSON.stringify(['CONTROL', type, data].filter(Boolean)));
	}

	async authenticate(auth: string | ((evt: EventTemplate) => Promise<VerifiedEvent>)) {
		if (!this.connected) throw new Error('Not connected');

		if (!this.authenticated && !this.authPromise) {
			this.authPromise = createDefer<string>();

			// CONTROL auth
			if (typeof auth === 'string') {
				this.controlAction('AUTH', auth);
				return;
			}

			// NIP-42 auth
			this.auth(auth)
				.then((response) => {
					this.authenticated = true;
					this.authPromise?.resolve(response);
					this.authPromise = null;
				})
				.catch((err) => this.authPromise?.reject(err));
		}

		return this.authPromise;
	}

	// Toggle node receiver on/off
	toggleListen() {
		const { status } = Model.getState();

		this.controlAction(status.listening ? 'RECEIVER_UNLISTEN' : 'RECEIVER_LISTEN');
	}

	clearDatabase() {
		this.controlAction('CLEAR_DATABASE');
	}

	exportDatabase() {
		this.controlAction('EXPORT_DATABASE');
	}

	_onmessage(message: MessageEvent<string>) {
		try {
			// Parse control message(s) received from node
			const data = JSON.parse(message.data);

			switch (data[0]) {
				case 'CONTROL':
					const payload = Array.isArray(data[1]) ? data[1] : [data[1]];
					this.handleControlMessage(payload);
					return;
			}
		} catch (err) {
			console.log(err);
		}

		// use default relay message handling
		super._onmessage(message);
	}

	handleControlMessage(actions: { type: string; data: any }[]) {
		for (let action of actions) {
			this.handleControlAction(action);
		}
	}

	handleControlAction(action: { data: any; type: string }) {
		switch (action.type) {
			case 'AUTH':
				// TODO: add message to CONTROL AUTH
				if (action.data) {
					this.authenticated = true;
					this.authPromise?.resolve('Success');
				} else {
					this.authPromise?.reject(new Error('Rejected'));
				}
				this.authPromise = null;
				break;
			default:
				// Pass control messages received from the
				// node directly to reduc store so the app
				// can update its local state to match node
				Model.dispatch(action);
				break;
		}
	}
}
