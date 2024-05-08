import NodeInterface from '../interfaces/Node';

let params = new URLSearchParams(window.location.search);
const isLocal = params?.get('env') === 'local';

// If gui is running on the same machine as
// satellite node, tell the node to pause
// its receiver when the device goes offline
// and resume listening when internet available
if (isLocal) {
	window.addEventListener('online', () => {
		node.controlAction('RECEIVER_LISTEN');
	});

	window.addEventListener('offline', () => {
		// Tell node receiver to stop listening
		node.controlAction('RECEIVER_UNLISTEN');
	});
}

const node = new NodeInterface(
	params.get('url') || params.get('relay') || (location.protocol === 'https:' ? 'wss://' : 'ws://') + location.host,
);

await node.connect();

const auth = params.get('auth');
if (auth) {
	await node.authenticate(auth);
}

export default node;
